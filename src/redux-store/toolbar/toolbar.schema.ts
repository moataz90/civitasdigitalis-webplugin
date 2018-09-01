export enum PersistentMenuItemType {
	WebUrl = 'web_url',
	Postback = 'postback',
	Nested = 'nested'
}

export interface IPersistentMenuItem {
	title: string;
	type: PersistentMenuItemType;
	call_to_actions?: Array<IPersistentMenuItem>;
	payload?: string;
	url?: string;
	webview_height_ratio?: string;
}

export interface IPersistentMenuLocale {
	locale: string;
	composer_input_disabled: boolean;
	call_to_actions: Array<IPersistentMenuItem>;

}

export interface IPersistentMenuJSON {
	persistent_menu: Array<IPersistentMenuLocale>;

}

export interface IPersistentMenu {
	show: boolean;
	data: IPersistentMenuJSON;
}

export interface ITextbox {
	show: boolean;
}

export interface IToolbarState {
	persistantMenu: IPersistentMenu;
	textbox: ITextbox;
}
