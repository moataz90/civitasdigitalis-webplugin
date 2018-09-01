import * as React from 'react';
import { connect } from 'react-redux';
import { UIWindowMode } from '../../redux-store/ui/ui.schema';
import { IStoreSchema } from '../../redux-store/store-schema';
import { OverlayWrapper } from '../mode-wrapper/overlay/OverlayWrapper';
import { IConfig } from '../../config/config-schema';
import { FullscreenWrapper } from '../mode-wrapper/fullscreen/FullscreenWrapper';

export interface IPluginModeSwitchProps {
	mode: UIWindowMode;
	config: IConfig;
}

class PluginModeSwitchComponent extends React.Component<IPluginModeSwitchProps> {
	public render() {
		const { mode, config } = this.props;

		switch (mode) {
			case UIWindowMode.Overlay:
				return <OverlayWrapper config={config} />;
			case UIWindowMode.Fullscreen:
				return <FullscreenWrapper config={config} />;
			default:
				return null;
		}
	}
}

const mapStateToProps = (storeState: IStoreSchema) => {
	return {
		mode: storeState.ui.mode
	};
};

export const PluginModeSwitch = connect(mapStateToProps)(PluginModeSwitchComponent);