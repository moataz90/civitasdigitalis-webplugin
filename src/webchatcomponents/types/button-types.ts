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

export type ButtonCallback = (type: number, title: string, payload: any) => void;