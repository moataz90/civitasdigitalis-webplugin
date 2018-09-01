import { Device } from './../redux-store/ui/ui.schema';
import { UIWindowMode } from '../redux-store/ui/ui.schema';
import { IThemeSchema } from '../theme/ThemeSchema';

export interface ItoolbarConfig {
	enableTextInput: boolean;
	enablePersistentMenu: boolean;
}

export interface IConfig {
	version: string;
	bot: {
		id: string;
		backendUrl: string;
		displayName: string;
		disclaimerUrl?: string;
	};
	ui: {
		mode: UIWindowMode;
		targetDOMElement: string;
		overlay?: {
			width: number;
			height: number;
		},
		header: {
			iconUrl: string;
			closeButtonUrl: string;
		},
		floatingButton: {
			iconUrl: string;
		}
	};
	session: {
		allowSessions: boolean;
		expire?: number;  // expirey duration in miliseconds
	};
	behaviour: {
		openOnStart: {
			[key in Device]: number; // Number indicating the delay, -1 means no open on start

		},
		startMessage: {
			delay: number;
			type: 'text' | 'postback';
			payload: {
				title: string,
				payload?: string
			}
		},
		toolbar: ItoolbarConfig;
	};
	theme: IThemeSchema;
}