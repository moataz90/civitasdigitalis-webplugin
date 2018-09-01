export interface IMessageOutgoing {
	sender: {
		id: string;
	};
	recipient: {
		id: string;
	};
	timestamp: number;
	message?: IMessageOutgoingPayload;
	postback?: IMessageOutgoingPostback;
	referral?: IMessageOutgoingPostbackReferral;
}

export interface IMessageOutgoingPayload {
	mid: string;
	text: string;
	quick_reply?: {
		payload: string;
	};
}

export interface IMessageOutgoingPostback {
	title: string;
	payload: string;
	mid: string; // This property is just for internal purposes, and not necessary for the engine
	referral?: IMessageOutgoingPostbackReferral;
}

export interface IMessageOutgoingPostbackReferral {
	ref: string;
	referer_uri?: string;
}