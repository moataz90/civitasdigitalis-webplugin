import { IMessageOutgoing } from './../../types/messages-engine-outgoing';
import { IConfig } from './../../config/config-schema';
import { v4 as uuid } from 'uuid';
import { sha256 } from 'js-sha256';
import { IMessage, IMessagePayloadText } from '../../redux-store/messages/messages.schema';

export const generateMessageID = (timestamp: number): string => {
	const id = uuid();
	const hash = sha256(timestamp + id);

	return `mid.${timestamp}:${hash}`;
};

export const makeOutgoingTextMessage = (text: string, userID: string, config: IConfig): IMessageOutgoing => {
	const timestamp = Date.now();

	const outgoingMessage: IMessageOutgoing = {
		sender: {
			id: userID
		},
		recipient: {
			id: config.bot.id
		},
		timestamp,
		message: {
			mid: generateMessageID(timestamp),
			text
		}
	};

	return outgoingMessage;
};

export const makeOutgoingPostbackMessage = <T extends string | object>(text: string, userID: string,
	payload: T, config: IConfig): IMessageOutgoing => {

	const timestamp = Date.now();

	const outgoingMessage: IMessageOutgoing = {
		sender: {
			id: userID
		},
		recipient: {
			id: config.bot.id
		},
		timestamp,
		postback: {
			title: text,
			payload: typeof payload === 'object' ? JSON.stringify(payload) : (payload as string),
			mid: generateMessageID(timestamp)
		}
	};

	return outgoingMessage;
};

export const makeOutgoingReferralMessage = (userID: string, payload: string, referralUrl: string, config: IConfig): IMessageOutgoing => {
	const timestamp = Date.now();

	const outgoingMessage: IMessageOutgoing = {
		sender: {
			id: userID
		},
		recipient: {
			id: config.bot.id
		},
		timestamp,
		referral: {
			ref: payload,
			referer_uri: referralUrl
		}
	};

	return outgoingMessage;
};

export const makeInternalMessageFromOutgoing = (outgoingMessage: IMessageOutgoing): IMessage<any> => {
	const internalMessage: IMessage<any> = {
		id: (outgoingMessage.message || outgoingMessage.postback).mid,
		sender: outgoingMessage.sender.id,
		recipient: outgoingMessage.recipient.id,
		isOwnMessage: true,
		timestamp: outgoingMessage.timestamp,
		received: null,
		seen: null,
		sent: outgoingMessage.timestamp,
		payload: {}
	};

	if (outgoingMessage.message) {
		(internalMessage as IMessage<IMessagePayloadText>).payload.text = outgoingMessage.message.text;
	} else if (outgoingMessage.postback) {
		(internalMessage as IMessage<IMessagePayloadText>).payload.text = outgoingMessage.postback.title;
	} else {
		(internalMessage as IMessage<IMessagePayloadText>).payload.text = '<No text available>';
	}

	return internalMessage;
};