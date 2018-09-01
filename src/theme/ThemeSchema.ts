export interface IThemeSchema {
	fontFamily: string;
	message: {
		textMessage: {
			fontColor: string;
			fontSize: number;
			backgroundColorOwn: string;
			backgroundColorBot: string;
			maxWidth: string | number;
		},
		mediaMessage: {
			maxWidth: string | number;
		},
		button: {
			fontColor: string;
			fontSize: number;
			backgroundColor: string;
		}
	};
	ui: {
		header: {
			backgroundColor: string;
			fontColor: string;
			fontSize: number;
		},
		chat: {
			backgroundColor: string;
		},
		floatingButton: {
			backgroundColor: string;
			position?: { // Not provided by the config service right now
				right: number | string;
				bottom: number | string;
			}
		},
		overlay?: {
			position?: { // Not provided by the config service right now
				right: number | string;
				bottom: number | string;
			}
		}
		transitionText: {
			fontColor: string;
			fontSize: number;
		},
		view: {
			backgroundColor: string;
		}
	};
}