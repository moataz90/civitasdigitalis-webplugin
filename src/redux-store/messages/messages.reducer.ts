import { MessagesAction } from './messages.actions';
import { IMessagesState, Section } from './messages.schema';
import * as constants from './messages.constants';

export const messagesDefaultState: IMessagesState = {
	messages: [],
	typing: false
};

export const messagesReducer = (state: IMessagesState = messagesDefaultState, action: MessagesAction) => {
	switch (action.type) {
		case constants.MESSAGES_OWN_ADD:

			const newOwnMessagesState = Object.assign({}, state);
			let sectionOfNewOwnMessage: Section = Section.single;

			for (let i = newOwnMessagesState.messages.length - 1; i >= 0; i--) {
				if (newOwnMessagesState.messages[i].isOwnMessage === true) {
					newOwnMessagesState.messages[i].section = Section.middle;
					sectionOfNewOwnMessage = Section.end;
				} else if (newOwnMessagesState.messages[i].isOwnMessage === false) {
					sectionOfNewOwnMessage = Section.end;
					break;
				}
			}

			newOwnMessagesState.messages = newOwnMessagesState.messages
				.concat([{ ...action.payload, isOwnMessage: true, section: sectionOfNewOwnMessage }]);
			return {
				...state,
				messages: newOwnMessagesState.messages

			};

		case constants.MESSAGES_BOT_ADD:

			const newBOTMessagesState = Object.assign({}, state);
			let sectionOfNewBOTMessage: Section = Section.single;

			for (let i = newBOTMessagesState.messages.length - 1; i >= 0; i--) {
				if (newBOTMessagesState.messages[i].isOwnMessage === false) {
					newBOTMessagesState.messages[i].section = Section.middle;
					sectionOfNewBOTMessage = Section.end;
				} else if (newBOTMessagesState.messages[i].isOwnMessage === true) {
					sectionOfNewBOTMessage = Section.end;
					break;
				}
			}

			newBOTMessagesState.messages = newBOTMessagesState.messages
				.concat([{ ...action.payload, isOwnMessage: false, section: sectionOfNewBOTMessage }]);
			return {
				...state,
				messages: newBOTMessagesState.messages

			};

		case constants.MESSAGES_OWN_UPDATE_RECEIVED:
			return {
				...state,
				messages: state.messages.map(
					message => message.id === action.payload.messageID
						? { ...message, received: action.payload.received }
						: message
				)
			};

		case constants.MESSAGES_OWN_UPDATE_SEEN:
			return {
				...state,
				messages: state.messages.map(
					message => message.id === action.payload.messageID
						? { ...message, seen: action.payload.seen }
						: message
				)
			};

		case constants.MESSAGES_OWN_UPDATE_SEND_STATUS:
			return {
				...state,
				messages: state.messages.map(
					message => message.id === action.payload.messageID
						? {
							...message,
							sent: action.payload.sendStatus,
							timestamp: action.payload.timeSent !== undefined
								? action.payload.timeSent
								: null
						}
						: message
				)
			};

		// case constants.MESSAGES_TYPING_SET_ON:
		// 	return {
		// 		...state, typing: true
		// 	};

		// case constants.MESSAGES_TYPING_SET_OFF:
		// 	return {
		// 		...state, typing: false
		// 	};

		default: return state;
	}
};