import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WebPlugin } from '../ui/WebPlugin';
import { start, sendTextMessage, sendPostbackMessage } from '../socket-handler/socket-handler';
import { createStore } from '../redux-store/create-store';
import { UIWindowMode, OverlayVisibility } from '../redux-store/ui/ui.schema';
import { IConfig } from '../config/config-schema';
import { injectGlobal } from 'styled-components';
import { injectScript } from '../utils/dom/inject-script';
import { initStore } from './init-store';
import { detectDevice } from '../utils/device/detect-device';
import { socketHasAlreadyBeenConnectedSet } from '../redux-store/socket/socket.actions';
import { SocketState } from '../redux-store/socket/socket.schema';
import { waitUntil } from '../utils/other/wait-until';
import { isDevEnv } from '../utils/other/environment';
import { saveStoreToLocalStorage } from '../redux-store/store-persist';

export const initPlugin = async (config: IConfig) => {
	// Create redux store

	const store = createStore(config);

	// Inject WURFL.js
	injectScript('//wurfl.io/wurfl.js');

	// Prepare rendering
	if (config.ui.mode !== UIWindowMode.Embedded) {
		// Create dom target overlay
		const domTarget = document.createElement('div');
		domTarget.id = 'parrot-webplugin-dom-target';
		document.body.appendChild(domTarget);

		config.ui.targetDOMElement = 'parrot-webplugin-dom-target';
	}

	// Inject global styles
	// tslint:disable-next-line:no-unused-expression
	injectGlobal`
		#parrot-webplugin-dom-target{
			padding: 0px;
			margin: 0px;
			width: 100%;
			height: 100%;
			position: fixed;
			z-index:10000;
		}
	`;

	const unsubscribe = store.subscribe(() => {
		const storeState = store.getState();

		store.subscribe(() => {
			saveStoreToLocalStorage(config.bot.id, store.getState());
		});

		let oldVisibility: OverlayVisibility = OverlayVisibility.Hidden;

		const cond = storeState.socket.state === SocketState.Disconnected
			&& storeState.ui.overlayVisibility === OverlayVisibility.Visible && oldVisibility === OverlayVisibility.Hidden;

		if (cond) {
			unsubscribe();

			start(config.bot.backendUrl, config.bot.id, 'ndadibsdkjdski21923iud98298jk', config, store).then(() => {
				if (isDevEnv()) { console.log('Connected'); }

				if (!store.getState().socket.alreadyBeenConnected) {
					// Send start message if stated in the config
					if (config.behaviour.startMessage) {
						if (store.getState().messages.messages.length === 0) {
							const startTime = Date.now();

							waitUntil(() => store.getState().user.sessionID !== null, 60000)
								.then(() => {
									setTimeout(() => {
										if (config.behaviour.startMessage.type === 'text') {
											sendTextMessage(config.behaviour.startMessage.payload.title, store.getState().user.sessionID);
										} else {
											sendPostbackMessage(
												config.behaviour.startMessage.payload.title,
												config.behaviour.startMessage.payload.payload,
												store.getState().user.sessionID
											);
										}
									}, Math.max(config.behaviour.startMessage.delay - (Date.now() - startTime), 0));
								})
								.catch(() => {
									console.error('Cannot send start message, because no sessionID is provided after 60s');
								});
						}
					}

					store.dispatch(socketHasAlreadyBeenConnectedSet());
				}
			});

		}

		oldVisibility = storeState.ui.overlayVisibility;
	});

	// Get device
	const device = await detectDevice();

	// Init store
	initStore(store, config, device);

	// Render
	ReactDOM.render(
		<WebPlugin reduxStore={store} config={config} />,
		document.getElementById(config.ui.targetDOMElement) as HTMLElement
	);
};