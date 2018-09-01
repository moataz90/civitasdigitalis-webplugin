import { messagesReducer } from './messages.reducer';
import {
	IMessagesOwnAdd, IMessagesBotAdd, IMessageOwnUpdateReceived, IMessageOwnUpdateSeen,
	IMessageOwnUpdateSendStatus
} from './messages.actions';
import * as constants from './messages.constants';
import { IMessage, MessageButtonType, IMessagesState, IMessagePayloadText, MessageSendStatus, Section } from './messages.schema';

const ownMessageTemplate: IMessage<IMessagePayloadText> = {
	id: 'abcd',
	sender: 'me',
	recipient: 'bot',
	isOwnMessage: true,
	timestamp: 123456,
	received: null,
	seen: null,
	sent: null,
	payload: {
		text: 'Yolo',
		buttons: [
			{
				type: MessageButtonType.Url,
				title: 'A link',
				payload: 'https://google.de'
			}
		]
	}
};

describe('Messages Redux Store', () => {
	test('Add own message', () => {
		const message: IMessage<IMessagePayloadText> = {
			...ownMessageTemplate,
			section: Section.single
		};

		const addOwnMessageAction: IMessagesOwnAdd = {
			type: constants.MESSAGES_OWN_ADD,
			payload: message
		};

		let expectedState: IMessagesState = {
			messages: [{
				...message
			}],
			typing: false
		};

		let newState = messagesReducer(undefined, addOwnMessageAction);

		expect(newState).toEqual(expectedState);

		expectedState = {
			messages: [{ ...message, section: Section.middle }, { ...message, section: Section.end }],
			typing: false
		};

		newState = messagesReducer(newState, addOwnMessageAction);

		expect(newState).toEqual(expectedState);
	});

	test('Add bot message', () => {
		const message: IMessage<IMessagePayloadText> = {
			...ownMessageTemplate,
			sender: 'bot',
			recipient: 'me',
			isOwnMessage: false,
			section: Section.single
		};

		const addBotMessageAction: IMessagesBotAdd = {
			type: constants.MESSAGES_BOT_ADD,
			payload: message
		};

		let expectedState: IMessagesState = {
			messages: [{
				...message
			}],
			typing: false
		};

		let newState = messagesReducer(undefined, addBotMessageAction);

		expect(newState).toEqual(expectedState);

		expectedState = {
			messages: [{ ...message, section: Section.middle }, { ...message, section: Section.end }],
			typing: false
		};

		newState = messagesReducer(newState, addBotMessageAction);

		expect(newState).toEqual(expectedState);
	});

	test('Update own message received', () => {
		const message: IMessage<IMessagePayloadText> = {
			...ownMessageTemplate,
		};

		const ownMessageUpdateReceived: IMessageOwnUpdateReceived = {
			type: constants.MESSAGES_OWN_UPDATE_RECEIVED,
			payload: {
				messageID: message.id,
				received: 1234
			}
		};

		const initialState: IMessagesState = {
			messages: [{
				...message
			}],
			typing: false
		};

		const expectedState: IMessagesState = {
			messages: [{
				...message,
				received: 1234
			}],
			typing: false
		};

		const newState = messagesReducer(initialState, ownMessageUpdateReceived);

		expect(newState).toEqual(expectedState);
	});

	test('Update own message seen', () => {
		const message: IMessage<IMessagePayloadText> = {
			...ownMessageTemplate,
		};

		const ownMessageUpdateSeen: IMessageOwnUpdateSeen = {
			type: constants.MESSAGES_OWN_UPDATE_SEEN,
			payload: {
				messageID: message.id,
				seen: 1234
			}
		};

		const initialState: IMessagesState = {
			messages: [{
				...message
			}],
			typing: false
		};

		const expectedState: IMessagesState = {
			messages: [{
				...message,
				seen: 1234
			}],
			typing: false
		};

		const newState = messagesReducer(initialState, ownMessageUpdateSeen);

		expect(newState).toEqual(expectedState);
	});

	test('Update own message send status', () => {
		const message: IMessage<IMessagePayloadText> = {
			...ownMessageTemplate,
		};

		const ownMessageUpdateSendStatus: IMessageOwnUpdateSendStatus = {
			type: constants.MESSAGES_OWN_UPDATE_SEND_STATUS,
			payload: {
				messageID: message.id,
				sendStatus: MessageSendStatus.Sent,
				timeSent: 1234
			}
		};

		const initialState: IMessagesState = {
			messages: [{
				...message
			}],
			typing: false
		};

		const expectedState: IMessagesState = {
			messages: [{
				...message,
				sent: MessageSendStatus.Sent,
				timestamp: 1234
			}],
			typing: false
		};

		const newState = messagesReducer(initialState, ownMessageUpdateSendStatus);

		expect(newState).toEqual(expectedState);
	});
});