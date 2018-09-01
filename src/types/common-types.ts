export type MessageID = string;
export type Timestamp = number;

export enum WSMessageEvent {
	UserNotFound = 'user_not_found',
	UserFound = 'user_found',
	UserCreated = 'user_created',
	PUIDInvalid = 'puid_invalid',
	PageIDNotFound = 'pageid_not_found',
	PageIDMissing = 'pageid_missing',
	VerfiyTokenMissing = 'verifytoken_missing',
	ConnectionRejected = 'connection_rejected',
	NewMessage = 'new_message',
	NewAction = 'new_action'
}

export interface IWebsocketMessageEvent<PayloadTyp = string> {
	statusCode: number;
	connected: boolean;
	type: WSMessageEvent;
	payload?: PayloadTyp;
}