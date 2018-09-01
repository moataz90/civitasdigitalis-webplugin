import { waitUntil } from './../utils/other/wait-until';
import { getReferralPayload } from './../utils/other/referral-link';
import {
	makeOutgoingTextMessage, makeOutgoingPostbackMessage, makeOutgoingReferralMessage,
	makeInternalMessageFromOutgoing
} from './../utils/messages/outgoing-message-factory';
import { messagesBotAdd, messagesOwnAdd } from './../redux-store/messages/messages.actions';
import { makeInternalMessageFromIncomingMessage } from './../utils/messages/incoming-message-factory';
import { userIDSet } from './../redux-store/user/user.actions';
import { IConfig } from './../config/config-schema';
import { Store } from 'redux';
import { IStoreSchema } from '../redux-store/store-schema';
import { IWebsocketMessageEvent, WSMessageEvent } from '../types/common-types';
import { IMessageOutgoing } from '../types/messages-engine-outgoing';
import { IMessageIncoming } from '../types/messages-engine-incoming';
import { socketStateSet, socketNextReconnectTimeSet } from '../redux-store/socket/socket.actions';
import { SocketState } from '../redux-store/socket/socket.schema';
import { urlHasReferralPayload } from '../utils/other/referral-link';
import { getQueryParams } from '../utils/other/query-parameters';
import { isDevEnv } from '../utils/other/environment';

import { setWsHeartbeat } from 'ws-heartbeat/client';

interface IReconnectCredentials {
	host: string;
	botID: string;
	verfiyToken: string;
	currentUserID: string;
	config: IConfig;
	store: Store<IStoreSchema>;
}

// tslint:disable-next-line
let _reconnectCredentials: IReconnectCredentials = null;
// tslint:disable-next-line
let _websocketConnection: WebSocket = null;
// tslint:disable-next-line
let _shouldTryReconnect: boolean = true;
// tslint:disable-next-line
let _shouldTryReconnectWithNewUser: boolean = false;
// tslint:disable-next-line
let _hasBeenConnectedBefore: boolean = false;
// tslint:disable-next-line
let _config: IConfig = null;
// tslint:disable-next-line
let _store: Store<IStoreSchema>;

const createURL = (host: string, botID: string, verfiyToken: string, userID?: string): string => {
	let url = `${host}/webplugin?pageID=${botID}&verify_token=${verfiyToken}`;

	if (userID !== undefined && userID !== null) {
		url += `&puid=${userID}`;
	}

	return url;
};

const parseMessageEvent = (message: string): IWebsocketMessageEvent => {
	try {
		return JSON.parse(message) as IWebsocketMessageEvent;
	} catch (err) {
		console.log(`Error at SocketHandler.parseMessageEvent(${message}): ${err}`);

		return null;
	}
};

const connect = (host: string, botID: string, verfiyToken: string, userID?: string): Promise<WebSocket> => {
	return new Promise<WebSocket>((resolve, reject) => {
		const webSocket = new WebSocket(createURL(host, botID, verfiyToken, userID));
		const timeout = setTimeout(() => {
			reject(new Error('Timeout'));
		}, 10000);

		setWsHeartbeat(webSocket, '{"kind":"ping"}', {
			pingTimeout: 60000, // in 60 seconds, if no message accepted from server, close the connection.
			pingInterval: 25000, // every 25 seconds, send a ping message to the server.
		});

		webSocket.addEventListener('open', (event: Event) => {
			if (timeout) {
				clearTimeout(timeout);
			}

			resolve(webSocket);
		});
		webSocket.addEventListener('error', (event: Event) => {
			if (timeout) {
				clearTimeout(timeout);
			}

			reject(event);
		});
	});
};

const getCurrentUserID = (config: IConfig): string => {
	if (config.session.allowSessions) {
		return _store.getState().user.sessionID;

	} else {
		return null;
	}
};

const userRegisteredEventHandler = (userID: string, store: Store<IStoreSchema>) => {
	store.dispatch(userIDSet(userID));

	// tslint:disable:no-use-before-declare
	handleReferral(store);
};

const newMessageEventHandler = (message: IMessageIncoming, config: IConfig, store: Store<IStoreSchema>) => {
	const internalMessage = makeInternalMessageFromIncomingMessage(message, config);

	store.dispatch(messagesBotAdd(internalMessage));
};

// const newActionEventHandler = (message: IMessageIncoming, config: IConfig, store: Store<IStoreSchema>) => {
// 	const internalAction = makeInternalActionFromIncomingMessage(message, config);

// 	store.dispatch(messageAction(internalAction));
// }

const disconnectEventHandler = (event: CloseEvent, store: Store<IStoreSchema>) => {
	if (isDevEnv()) { console.log(event); }

	// Something went wrong, try to reconnect
	console.warn(`[Socket] Unexpected disconnect, trying to reconnect...`);

	// tslint:disable:no-use-before-declare
	start(_reconnectCredentials.host, _reconnectCredentials.botID, _reconnectCredentials.verfiyToken,
		_reconnectCredentials.config, _reconnectCredentials.store);
};

const errorEventHandler = (error: Event) => {
	if ((error as any).code === 'ECONNREFUSED') {
		// Try to reconnect
		console.warn(`[Socket] ECONNREFUSED, trying to reconnect...`);

		// tslint:disable:no-use-before-declare
		start(_reconnectCredentials.host, _reconnectCredentials.botID, _reconnectCredentials.verfiyToken,
			_reconnectCredentials.config, _reconnectCredentials.store);
	} else {
		console.error(error);
	}
};

export const establishConnection = async (host: string, botID: string, userID: string, verfiyToken: string): Promise<WebSocket> => {
	try {
		const webSocket = await connect(host, botID, verfiyToken, userID);

		return webSocket;
	} catch (err) {
		throw err;
	}
};

// tslint:disable-next-line
const _sendMessage = (message: IMessageOutgoing, socket: WebSocket, store: Store<IStoreSchema>) => {
	if (message.message || message.postback) {
		store.dispatch(messagesOwnAdd(makeInternalMessageFromOutgoing(message)));
	}

	if (isDevEnv()) { console.log(`Send message`, message); }

	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(message));
	} else {
		console.error(`Tried to send message via closed socket`);
	}
};

export const sendTextMessage = (text: string, userID: string) => {
	_sendMessage(makeOutgoingTextMessage(text, userID, _config), _websocketConnection, _store);
};

export const sendPostbackMessage = <T extends string | object>(text: string, payload: T, userID: string) => {
	_sendMessage(makeOutgoingPostbackMessage<T>(text, userID, payload, _config), _websocketConnection, _store);
};

export const sendReferralMessage = (userID: string, payload: string, referralUrl: string) => {
	_sendMessage(makeOutgoingReferralMessage(userID, payload, referralUrl, _config), _websocketConnection, _store);
};

const reconnect = async (host: string, botID: string, verfiyToken: string, currentUserID: string,
	store: Store<IStoreSchema>, firstConnect: boolean, attempts: number = 4, timeout: number = 0): Promise<WebSocket> => {

	if (attempts > 0) {
		if (timeout > 0) {
			store.dispatch(socketStateSet(SocketState.WaitingForReconnect));
			store.dispatch(socketNextReconnectTimeSet(Date.now() + timeout));

			await new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
		}

		store.dispatch(socketStateSet(firstConnect ? SocketState.Connecting : SocketState.Reconnecting));

		try {
			const webSocket = await establishConnection(host, botID, currentUserID, verfiyToken);

			return webSocket;
		} catch (err) {
			if (err.message === 'Timeout') {
				return reconnect(host, botID, verfiyToken, currentUserID, store, firstConnect, attempts - 1);
			} else {
				return reconnect(host, botID, verfiyToken, currentUserID, store, firstConnect, attempts - 1, timeout + 10000);
			}
		}
	} else {
		console.error(`Tried to reconnect 10 times, no success`);

		return null;
	}
};

// const reconnectBackGround = async (host: string, botID: string, verfiyToken: string, currentUserID: string,
// 	store: Store<IStoreSchema>, firstConnect: boolean, attempts: number = 4, timeout: number = 0): Promise<WebSocket> => {

// 	if (attempts > 0) {
// 		if (timeout > 0) {
// 			store.dispatch(socketStateSet(SocketState.WaitingForReconnect));
// 			store.dispatch(socketNextReconnectTimeSet(Date.now()));

// 			await new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
// 		}

// 		store.dispatch(socketStateSet(firstConnect ? SocketState.Connecting : SocketState.Reconnecting));

// 		try {
// 			const webSocket = await establishConnection(host, botID, currentUserID, verfiyToken);

// 			return webSocket;
// 		} catch (err) {
// 			if (err.message === 'Timeout') {
// 				return reconnect(host, botID, verfiyToken, currentUserID, store, firstConnect, attempts - 1);
// 			} else {
// 				return reconnect(host, botID, verfiyToken, currentUserID, store, firstConnect, attempts - 1, timeout + 10000);
// 			}
// 		}
// 	} else {
// 		console.error(`Tried to reconnect 10 times, no success`);

// 		return null;
// 	}
// }

const handleReferral = (store: Store<IStoreSchema>) => {
	// Handle referral
	const url = window.location.href;

	if (urlHasReferralPayload(url)) {
		const queryParams = getQueryParams(url);
		const referralPayload = getReferralPayload(queryParams);

		waitUntil(() => store.getState().user.sessionID !== null, 10000)
			.then(() => {
				const userID = store.getState().user.sessionID;

				sendReferralMessage(userID, referralPayload, url);

				window.history.replaceState(
					{},
					document.title,
					url.split(`pwp_ref=${referralPayload}`).join('')
				);
			})
			.catch((err) => {
				console.error(err);
				console.warn(`Cannot handle referral link due to mising user id`);
			});
	}
};

export const start = async (host: string, botID: string, verfiyToken: string, config: IConfig,
	store: Store<IStoreSchema>): Promise<void> => {

	if (!_shouldTryReconnect) {
		console.warn(`Previous event permitted another reconnect, aborting...`);

		return;
	}

	_config = config;
	_store = store;

	const currentUserID = (_shouldTryReconnectWithNewUser) ? null : getCurrentUserID(config);

	if (_websocketConnection) {
		_websocketConnection.removeEventListener('close', (e: CloseEvent) => disconnectEventHandler(e, store));
		_websocketConnection.removeEventListener('error', errorEventHandler);
	}

	_reconnectCredentials = { host, botID, verfiyToken, currentUserID, config, store };

	_websocketConnection = await reconnect(host, botID, verfiyToken, currentUserID, store, !_hasBeenConnectedBefore);

	_hasBeenConnectedBefore = true;

	if (_websocketConnection) {
		_websocketConnection.addEventListener('message', (event: MessageEvent) => {
			if (isDevEnv()) { console.log(event); }

			const message = parseMessageEvent(event.data);

			if (message) {
				if (message.type === WSMessageEvent.UserCreated || message.type === WSMessageEvent.UserFound) {
					userRegisteredEventHandler(message.payload, store);

					store.dispatch(socketStateSet(SocketState.Connected));
				} else if (message.type === WSMessageEvent.NewMessage) {
					newMessageEventHandler((message as any as IWebsocketMessageEvent<IMessageOutgoing>).payload, config, store);
				} else if (message.type === WSMessageEvent.VerfiyTokenMissing) {
					console.error(`[Socket] VerfiyToken is missing or wrong`);

					_shouldTryReconnect = false;
				} else if (message.type === WSMessageEvent.ConnectionRejected) {
					console.error(`[Socket] Connection rejected`);

					_shouldTryReconnect = false;
				} else if (message.type === WSMessageEvent.PageIDMissing) {
					console.error(`[Socket] PageID is missing`);

					_shouldTryReconnect = false;
				} else if (message.type === WSMessageEvent.PageIDNotFound) {
					console.error(`[Socket] PageID not found`);

					_shouldTryReconnect = false;
				} else if (message.type === WSMessageEvent.PUIDInvalid) {
					console.error(`[Socket] PUID invalid`);

					_shouldTryReconnect = false;
				} else if (message.type === WSMessageEvent.UserNotFound) {

					console.error(`[Socket] User not found`);
					_shouldTryReconnectWithNewUser = true;
					_shouldTryReconnect = true;

					start(host, botID, verfiyToken, config, store);
				}
			}
		});

		_websocketConnection.addEventListener('close', (e: CloseEvent) => disconnectEventHandler(e, store));
		_websocketConnection.addEventListener('error', errorEventHandler);
	} else {
		console.error(`[Socket] Cannot connect to server ${host}`);

		store.dispatch(socketStateSet(SocketState.Failed));
	}
};