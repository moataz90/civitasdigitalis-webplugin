import { uiDeviceSet, uiWindowModeSet, uiOverlayVisibilitySet } from './../redux-store/ui/ui.actions';
import { IStoreSchema } from './../redux-store/store-schema';
import { Device, UIWindowMode, OverlayVisibility } from './../redux-store/ui/ui.schema';
import { IConfig } from './../config/config-schema';
import { Store } from 'redux';

export const initStore = (store: Store<IStoreSchema>, config: IConfig, device: Device) => {
	store.dispatch(uiDeviceSet(device));

	if (device === Device.Smartphone) {
		store.dispatch(uiWindowModeSet(UIWindowMode.Fullscreen));
	} else {
		store.dispatch(uiWindowModeSet(config.ui.mode));
	}

	if (config.ui.mode === UIWindowMode.Overlay && config.behaviour.openOnStart[device] !== -1) {
		setTimeout(() => {
			store.dispatch(uiOverlayVisibilitySet(OverlayVisibility.Visible));
		}, config.behaviour.openOnStart[device]);
	}
};