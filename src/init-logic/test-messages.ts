import {
	IMessagePayloadMedia, MessageMediaType, MessageButtonType, IMessagePayloadCarousel,
	IMessagePayloadTemplateButton
} from './../redux-store/messages/messages.schema';
import { IMessage, IMessagePayloadText } from '../redux-store/messages/messages.schema';
import { v4 as uuid } from 'uuid';

export const ownTextMessage: IMessage<IMessagePayloadText> = {
	id: uuid(),
	timestamp: Date.now() - 5000,
	sender: 'me',
	recipient: '1',
	isOwnMessage: true,
	sent: Date.now() - 5000,
	seen: null,
	received: null,
	payload: {
		text: 'Hello World'
	}
};

export const botTextMessage: IMessage<IMessagePayloadText> = {
	...ownTextMessage,
	id: uuid(),
	sender: '1',
	recipient: 'me',
	isOwnMessage: false,
	timestamp: Date.now(),
	received: Date.now(),
	payload: {
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt'
			+ ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco '
			+ 'laboris nisi ut aliquip ex ea commodo consequat.',
		buttons: [
			{
				type: MessageButtonType.Postback,
				title: 'A postback button',
				payload: JSON.stringify({ data: 'some payload' })
			},
			{
				type: MessageButtonType.Url,
				title: 'A Url',
				payload: 'https://google.de'
			},
			{
				type: MessageButtonType.Call,
				title: 'Call mee',
				payload: '089 1234'
			}
		]
	}
};

export const ownImageMessage: IMessage<IMessagePayloadMedia> = {
	id: uuid(),
	timestamp: Date.now() - 4000,
	sender: '1',
	recipient: 'me',
	isOwnMessage: true,
	sent: Date.now() - 4000,
	seen: null,
	received: null,
	payload: {
		url: 'https://planethome.blob.core.windows.net/blobstorage/fino2.png',
		type: MessageMediaType.Image
	}
};

export const botImageMessage: IMessage<IMessagePayloadMedia> = {
	id: uuid(),
	timestamp: Date.now() + 10,
	sender: '1',
	recipient: 'me',
	isOwnMessage: false,
	sent: null,
	seen: null,
	received: Date.now() + 10,
	payload: {
		url: 'https://planethome.blob.core.windows.net/blobstorage/fino2.png',
		type: MessageMediaType.Image
	}
};

export const botCarouselMessage: IMessage<IMessagePayloadCarousel> = {
	id: uuid(),
	timestamp: Date.now() + 12,
	sender: '1',
	recipient: 'me',
	isOwnMessage: false,
	sent: null,
	seen: null,
	received: Date.now() + 12,
	payload: {
		cards: [
			{
				title: 'First Card',
				subtitle: 'First card subtitle',
				imageUrl: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
				buttons: [
					{
						type: MessageButtonType.Postback,
						title: 'A postback button',
						payload: JSON.stringify({ data: 'some payload' })
					},
					{
						type: MessageButtonType.Url,
						title: 'A Url',
						payload: 'https://google.de'
					},
					{
						type: MessageButtonType.Call,
						title: 'Call me',
						payload: '089 1234'
					}
				]
			},
			{
				title: 'Second Card',
				subtitle: 'Second card subtitle',
				imageUrl: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
				buttons: [
					{
						type: MessageButtonType.Postback,
						title: 'A postback button',
						payload: JSON.stringify({ data: 'some payload' })
					},
					{
						type: MessageButtonType.Url,
						title: 'A Url',
						payload: 'https://google.de'
					},
					{
						type: MessageButtonType.Call,
						title: 'Call me',
						payload: '089 1234'
					}
				]
			},
			{
				title: 'Third Card',
				subtitle: 'Third card subtitle',
				imageUrl: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
				buttons: [
					{
						type: MessageButtonType.Postback,
						title: 'A postback button',
						payload: JSON.stringify({ data: 'some payload' })
					},
					{
						type: MessageButtonType.Url,
						title: 'A Url',
						payload: 'https://google.de'
					},
					{
						type: MessageButtonType.Call,
						title: 'Call me',
						payload: '089 1234'
					}
				]
			}
		]
	}
};

export const botTextWithButtons: IMessage<IMessagePayloadTemplateButton> = {
	id: uuid(),
	timestamp: Date.now() + 12,
	sender: '1',
	recipient: 'me',
	isOwnMessage: false,
	sent: null,
	seen: null,
	received: Date.now() + 12,
	payload: {
		text: 'Hier ein paar Buttons',
		buttons: [
			{
				type: MessageButtonType.Url,
				title: 'Ein Link',
				payload: 'https://google.de'
			}
		]
	}
};