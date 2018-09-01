import {
	MessageIncomingPayloadAttachmentTemplateType, IMessageIncomingButton, MessageButtonType,
	IMessageIncomingPayloadQuickReply, IMessageIncomingQuickReplyType, IMessageSenderAction
} from './../../types/messages-engine-incoming';
import { IConfig } from './../../config/config-schema';
import {
	IMessage, IMessagePayloadText, IMessagePayloadMedia, MessageMediaType, IMessagePayloadCarousel,
	IMessagePayloadButton, IMessagePayloadQuickreply, IMessageQuickreplyType, IMessagePayloadTemplateButton, IAction
} from '../../redux-store/messages/messages.schema';
import {
	IMessageIncoming, IMessageIncomingAttachmentType, IMessageIncomingPayloadAttachmentMedia,
	IMessageIncomingPayloadAttachmentTemplate
} from '../../types/messages-engine-incoming';
import { generateMessageID } from './outgoing-message-factory';
import { MessageButtonType as InternalMessageButtonType } from '../../redux-store/messages/messages.schema';

const makeIncomingButton = (button: IMessageIncomingButton): IMessagePayloadButton => {
	if (button.type === MessageButtonType.Url) {
		return { title: button.title, payload: button.url, type: InternalMessageButtonType.Url };
	} else if (button.type === MessageButtonType.Share) {
		return { title: 'Teilen', type: InternalMessageButtonType.Share };
	} else if (button.type === MessageButtonType.Postback) {
		return { title: button.title, payload: button.payload, type: InternalMessageButtonType.Postback };
	} else if (button.type === MessageButtonType.Call) {
		return { title: button.title, payload: button.payload, type: InternalMessageButtonType.Call };
	} else {
		return null;
	}
};

const makeIncomingQuickreply = (quickreply: IMessageIncomingPayloadQuickReply): IMessagePayloadQuickreply => {
	if (quickreply.content_type === IMessageIncomingQuickReplyType.Postback) {
		return { type: IMessageQuickreplyType.Postback, title: quickreply.title, payload: quickreply.payload };
	} else if (quickreply.content_type === IMessageIncomingQuickReplyType.Location) {
		return { type: IMessageQuickreplyType.Location, title: 'Standort' };
	} else {
		return null;
	}
};

export const makeInternalActionFromIncomingMessage = (message: IMessageIncoming, config: IConfig): IAction => {
	const internalMessage: IAction = {
		sender: config.bot.id,
		recipient: message.recipient.id,
		payload: {}
	};

	if (message.sender_action === IMessageSenderAction.TypingOn) {
		internalMessage.payload = message.sender_action;
	}

	return internalMessage;
};

export const makeInternalMessageFromIncomingMessage = (message: IMessageIncoming, config: IConfig): IMessage<any> => {
	const internalMessage: IMessage<any> = {
		id: generateMessageID(message.timestamp),
		sender: config.bot.id,
		recipient: message.recipient.id,
		isOwnMessage: false,
		timestamp: message.timestamp,
		received: Date.now(),
		seen: null,
		sent: null,
		payload: {}
	};

	if (message.message) {
		if (message.message.text) {
			// It's a text message
			(internalMessage as IMessage<IMessagePayloadText>).payload.text = message.message.text;

			if (message.message.buttons) {
				(internalMessage as IMessage<IMessagePayloadText>).payload.buttons =
					message.message.buttons.map(button => makeIncomingButton(button));
			}
		} else if (message.message.attachment) {
			// It's a media or generic template message (carousel)
			if (message.message.attachment.type === IMessageIncomingAttachmentType.Image) {
				(internalMessage as IMessage<IMessagePayloadMedia>).payload.type = MessageMediaType.Image;
				(internalMessage as IMessage<IMessagePayloadMedia>).payload.url =
					(message.message.attachment.payload as IMessageIncomingPayloadAttachmentMedia).url;
			} else if (message.message.attachment.type === IMessageIncomingAttachmentType.Video) {
				(internalMessage as IMessage<IMessagePayloadMedia>).payload.type = MessageMediaType.Video;
				(internalMessage as IMessage<IMessagePayloadMedia>).payload.url =
					(message.message.attachment.payload as IMessageIncomingPayloadAttachmentMedia).url;
			} else if (message.message.attachment.type === IMessageIncomingAttachmentType.Template) {
				const payload = message.message.attachment.payload as IMessageIncomingPayloadAttachmentTemplate;

				if (payload.template_type === MessageIncomingPayloadAttachmentTemplateType.Generic) {
					(internalMessage as IMessage<IMessagePayloadCarousel>).payload.cards =
						payload.elements.map(el => {
							return {
								title: el.title,
								subtitle: el.subtitle,
								imageUrl: el.image_url,
								buttons: el.buttons.map(button => makeIncomingButton(button))
							};
						});
				} else if (payload.template_type === MessageIncomingPayloadAttachmentTemplateType.Button) {
					(internalMessage as IMessage<IMessagePayloadTemplateButton>).payload.text = payload.text;
					(internalMessage as IMessage<IMessagePayloadTemplateButton>).payload.buttons =
						payload.buttons.map(button => makeIncomingButton(button));
				}
			}
		}

		if (message.message.quick_replies) {
			(internalMessage as IMessage<IMessagePayloadText>).payload.quickreplies =
				message.message.quick_replies.map(qr => makeIncomingQuickreply(qr));
		}

	}

	return internalMessage;
};