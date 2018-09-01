export enum MessageType {
	Text,
	Media,
	Carousel
}

export enum MessageMediaType {
	Audio,
	Video,
	Image,
	File
}

export enum MessageButtonType {
	Url,
	Postback,
	Call,
	Share
}

export interface IMessagePayloadButton {
	type: MessageButtonType;
	title: string;
	payload?: string;
}

export enum IMessageQuickreplyType {
	Postback,
	Location
}

export interface IMessagePayloadQuickreply {
	type: IMessageQuickreplyType;
	title: string;
	payload?: string;
	icon?: string;
}

export interface IMessagePayloadBase {
	quickreplies?: IMessagePayloadQuickreply[];
}

export interface IMessagePayloadText extends IMessagePayloadBase {
	text: string;
	buttons?: IMessagePayloadButton[];
}

export interface IMessagePayloadMedia extends IMessagePayloadBase {
	type: MessageMediaType;
	url: string;
}

export interface IMessagePayloadCarouselCard {
	title: string;
	subtitle: string;
	imageUrl: string;
	buttons: IMessagePayloadButton[];
}

export interface IMessagePayloadCarousel extends IMessagePayloadBase {
	cards: IMessagePayloadCarouselCard[];
}

export interface IMessagePayloadTemplateButton extends IMessagePayloadBase {
	text: string;
	buttons: IMessagePayloadButton[];
}

export enum MessageSendStatus {
	Pending,
	Sent,
	Failed
}

export enum Section {
	start,
	middle,
	end,
	single
}

export interface IMessage<T extends IMessagePayloadText | IMessagePayloadMedia | IMessagePayloadCarousel | IMessagePayloadTemplateButton> {
	id: string;
	sender: string;
	recipient: string;
	isOwnMessage: boolean;
	timestamp: number;
	received: number; // stored as timestamp or null
	seen: number; // stored as timestamp or null
	sent: MessageSendStatus; // only stored for own messages
	payload: T;
	section?: Section;
}

export interface IAction {
	sender: string;
	recipient: string;
	payload: any;

}

export interface IMessagesState {
	messages: Array<IMessage<any>>;
	typing: boolean;
}