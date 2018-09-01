export interface IMessageIncoming {
	recipient: {
		id: string;
	};
	timestamp: number;
	message?: IMessageIncomingPayload;
	sender_action?: IMessageSenderAction;
}

export enum IMessageSenderAction {
	TypingOn = 'typing_on',
	TypingOff = 'typing_off',
	MarkSeen = 'mark_seen'
}

export interface IMessageIncomingPayload {
	text?: string;
	attachment?: IMessageIncomingPayloadAttachment;
	quick_replies?: IMessageIncomingPayloadQuickReply[];
	buttons?: IMessageIncomingButton[];
}

export enum IMessageIncomingAttachmentType {
	Image = 'image',
	Audio = 'audio',
	Video = 'video',
	File = 'file',
	Template = 'template'
}

export interface IMessageIncomingPayloadAttachment {
	type: IMessageIncomingAttachmentType;
	payload: IMessageIncomingPayloadAttachmentMedia | IMessageIncomingPayloadAttachmentTemplate;
}

export interface IMessageIncomingPayloadAttachmentMedia {
	url: string;
	is_reusable?: boolean;
}

export enum MessageIncomingPayloadAttachmentTemplateType {
	Generic = 'generic',
	Button = 'button'
}

export interface IMessageIncomingPayloadAttachmentTemplate {
	template_type: MessageIncomingPayloadAttachmentTemplateType;
	elements?: IMessageIncomingPayloadAttachmentTemplateCarousel[];
	text?: string;
	buttons?: IMessageIncomingButton[];
}

export interface IMessageIncomingPayloadAttachmentTemplateCarousel {
	title: string;
	image_url: string;
	subtitle: string;
	buttons: IMessageIncomingButton[];
}

export enum MessageButtonType {
	Url = 'web_url',
	Postback = 'postback',
	Call = 'phone_number',
	Share = 'element_share'
}

export interface IMessageIncomingButton {
	type: MessageButtonType;
	url?: string;
	title?: string;
	payload: string;
}

export enum IMessageIncomingQuickReplyType {
	Postback = 'text',
	Location = 'location',
}

export interface IMessageIncomingPayloadQuickReply {
	content_type: IMessageIncomingQuickReplyType;
	title?: string;
	image_url?: string;
	payload?: string;
}