import { MessageID, Timestamp } from './../../types/common-types';
import { IMessage, MessageSendStatus } from './messages.schema';
import * as constants from './messages.constants';

// Add own message
export interface IMessagesOwnAdd {
	type: constants.MESSAGES_OWN_ADD;
	payload: IMessage<any>;
}

export const messagesOwnAdd = (message: IMessage<any>): IMessagesOwnAdd => ({
	type: constants.MESSAGES_OWN_ADD,
	payload: message
});

// Add bot message
export interface IMessagesBotAdd {
	type: constants.MESSAGES_BOT_ADD;
	payload: IMessage<any>;
}

export const messagesBotAdd = (message: IMessage<any>): IMessagesBotAdd => ({
	type: constants.MESSAGES_BOT_ADD,
	payload: message
});

// Update own message received
export interface IMessageOwnUpdateReceived {
	type: constants.MESSAGES_OWN_UPDATE_RECEIVED;
	payload: {
		messageID: MessageID;
		received: Timestamp;
	};
}

export const messagesOwnUpdateReceived = (messageID: MessageID, received: Timestamp): IMessageOwnUpdateReceived => ({
	type: constants.MESSAGES_OWN_UPDATE_RECEIVED,
	payload: {
		messageID,
		received
	}
});

// Update own message seen
export interface IMessageOwnUpdateSeen {
	type: constants.MESSAGES_OWN_UPDATE_SEEN;
	payload: {
		messageID: MessageID;
		seen: Timestamp;
	};
}

export const messagesOwnUpdateSeen = (messageID: MessageID, seen: Timestamp): IMessageOwnUpdateSeen => ({
	type: constants.MESSAGES_OWN_UPDATE_SEEN,
	payload: {
		messageID,
		seen
	}
});

// Update own message send failed
export interface IMessageOwnUpdateSendStatus {
	type: constants.MESSAGES_OWN_UPDATE_SEND_STATUS;
	payload: {
		messageID: MessageID;
		sendStatus: MessageSendStatus;
		timeSent?: Timestamp;
	};
}

export const messagesOwnSendFailed = (messageID: MessageID, sendStatus: MessageSendStatus,
	timeSent?: Timestamp): IMessageOwnUpdateSendStatus => ({
		type: constants.MESSAGES_OWN_UPDATE_SEND_STATUS,
		payload: {
			messageID,
			sendStatus,
			timeSent
		}
	});

export interface IPluginAPISentSenderActions {
		recipient: {
			id: string
		};
		sender_action: string;
	}

// Update typing status
export interface IMessageAction {
	type: constants.MESSAGES_TYPING_SET_ON | constants.MESSAGES_TYPING_SET_OFF;
	payload: IPluginAPISentSenderActions;
}

// export const messageAction = (message:IMessageAction): IMessageAction => ({
// 	type: constants.MESSAGES_TYPING_SET_ON,
// 	payload: message
// });

// Update typing status
export interface IMessageActionTypingOff {
	type: constants.MESSAGES_TYPING_SET_OFF;
}

export const messageActionTypingOff = (): IMessageActionTypingOff => ({
	type: constants.MESSAGES_TYPING_SET_OFF
});

// Export all possible actions as a combined type
export type MessagesAction = IMessagesOwnAdd | IMessagesBotAdd | IMessageOwnUpdateReceived | IMessageOwnUpdateSeen |
	IMessageOwnUpdateSendStatus | IMessageAction | IMessageActionTypingOff;