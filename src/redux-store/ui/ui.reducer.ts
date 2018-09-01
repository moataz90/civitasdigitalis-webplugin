import { IUIState, UIWindowMode, OverlayVisibility, Device } from './ui.schema';
import * as constants from './ui.constants';
import { UIAction } from './ui.actions';

const defaultUIState: IUIState = {
	pluginEnabled: true,
	mode: UIWindowMode.Fullscreen,
	overlayVisibility: OverlayVisibility.Hidden,
	device: Device.Desktop,
	chatShouldScrollDown: false
};

export const uiReducer = (state: IUIState = defaultUIState, action: UIAction): IUIState => {
	switch (action.type) {
		case constants.UI_PLUGIN_ENABLED_SET:
			return { ...state, pluginEnabled: action.payload };

		case constants.UI_OVERLAY_VISIBILITY_SET:
			return { ...state, overlayVisibility: action.payload };

		case constants.UI_WINDOW_MODE_SET:
			return { ...state, mode: action.payload };

		case constants.UI_CHAT_SHOULD_SCROLL_DOWN:
			return { ...state, chatShouldScrollDown: action.payload };

		default:
			return state;
	}
};