import * as constants from './ui.constants';
import { UIWindowMode, OverlayVisibility, Device } from './ui.schema';

// Set plugin enabled/disabled
export interface IPluginEnabledSet {
	type: constants.UI_PLUGIN_ENABLED_SET;
	payload: boolean;
}

export const uiPluginEnabledSet = (enabled: boolean): IPluginEnabledSet => ({
	type: constants.UI_PLUGIN_ENABLED_SET,
	payload: enabled
});

// Set plugin mode
export interface IWindowModeSet {
	type: constants.UI_WINDOW_MODE_SET;
	payload: UIWindowMode;
}

export const uiWindowModeSet = (windowMode: UIWindowMode): IWindowModeSet => ({
	type: constants.UI_WINDOW_MODE_SET,
	payload: windowMode
});

// Set overlay visibility
export interface IOverlayVisibilitySet {
	type: constants.UI_OVERLAY_VISIBILITY_SET;
	payload: OverlayVisibility;
}

export const uiOverlayVisibilitySet = (newVisibility: OverlayVisibility): IOverlayVisibilitySet => ({
	type: constants.UI_OVERLAY_VISIBILITY_SET,
	payload: newVisibility
});

// Set device
export interface IDeviceSet {
	type: constants.UI_DEVICE_SET;
	payload: Device;
}

export const uiDeviceSet = (device: Device): IDeviceSet => ({
	type: constants.UI_DEVICE_SET,
	payload: device
});

// Set should scroll down
export interface IChatShouldScrollDown {
	type: constants.UI_CHAT_SHOULD_SCROLL_DOWN;
	payload: boolean;
}

export const uiChatShouldScrollDown = (shouldScrollDown: boolean): IChatShouldScrollDown => ({
	type: constants.UI_CHAT_SHOULD_SCROLL_DOWN,
	payload: shouldScrollDown,
});

// Export all actions
export type UIAction = IPluginEnabledSet | IWindowModeSet | IOverlayVisibilitySet | IChatShouldScrollDown;