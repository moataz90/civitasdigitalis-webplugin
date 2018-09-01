import * as React from 'react';
import { IConfig } from '../../../config/config-schema';
import { FullscreenWindow } from './FullscreenWindow';
import { FloatingButtonCircle } from '../../floating-buttons/circle/FloatingButtonCircle';
import { FloatingButtonPosition } from '../../floating-buttons/FloatingButton';
import { connect, Dispatch } from 'react-redux';
import { uiOverlayVisibilitySet, uiChatShouldScrollDown } from '../../../redux-store/ui/ui.actions';
import { OverlayVisibility, Device } from '../../../redux-store/ui/ui.schema';
import { IStoreSchema } from '../../../redux-store/store-schema';
import { deviceShouldFullscreen, getScreenResolution } from '../../../utils/device/screen-resolution';
import { FullscreenBlur } from './FullscreenBlur';

export interface IFullscreenWrapperProps {
	config: IConfig;
	dispatch: Dispatch<any>;
	overlayVisibility: OverlayVisibility;
	device: Device;
}

class FullscreenWrapperComponent extends React.Component<IFullscreenWrapperProps> {
	private deviceShouldDisplayFullscreen: boolean;
	private oldElementValues: (Map<string, string>)[];

	constructor(props: IFullscreenWrapperProps) {
		super(props);

		this.deviceShouldDisplayFullscreen = deviceShouldFullscreen(getScreenResolution());

		this.oldElementValues = [];

		this.onClickFloatingButton = this.onClickFloatingButton.bind(this);
	}

	public componentDidMount() {
		const { overlayVisibility } = this.props;

		setTimeout(() => this.checkFixBody(true), overlayVisibility === OverlayVisibility.Visible ? 400 : 0);
	}

	public componentDidUpdate() {
		const { overlayVisibility } = this.props;

		setTimeout(() => this.checkFixBody(false), overlayVisibility === OverlayVisibility.Visible ? 400 : 0);
	}

	public render() {
		const { config, overlayVisibility, device } = this.props;

		const displayRealFullscreen = device === Device.Smartphone || this.deviceShouldDisplayFullscreen;

		return [
			<FullscreenBlur key="fullscreen-blur" in={overlayVisibility === OverlayVisibility.Visible} />,
			<FullscreenWindow
				key="fullscreen-window"
				config={config}
				overlayVisibility={overlayVisibility}
				realFullscreen={displayRealFullscreen}
				in={overlayVisibility === OverlayVisibility.Visible}
			/>,
			<FloatingButtonCircle
				key="overlay-floatingbutton"
				onClick={this.onClickFloatingButton}
				position={FloatingButtonPosition.BottomRightCorner}
				width={60}
				height={60}
				visible={overlayVisibility === OverlayVisibility.Hidden}
				iconUrl={config.ui.floatingButton.iconUrl}
				iconDimension="50%"
				backgroundColor={config.theme.ui.floatingButton.backgroundColor}
			/>
		];
	}

	private onClickFloatingButton() {
		const { dispatch } = this.props;

		dispatch(uiOverlayVisibilitySet(OverlayVisibility.Visible));
		dispatch(uiChatShouldScrollDown(true));
	}

	private checkFixBody(saveOldValues: boolean) {
		const { overlayVisibility, device } = this.props;
		const displayRealFullscreen = device === Device.Smartphone || this.deviceShouldDisplayFullscreen;

		const elements = [document.querySelector('body'), document.querySelector('html')];
		const cssAttributes = ['height', 'width', 'margin', 'padding', 'overflow'];
		const cssValues = ['100%', '100%', '0px', '0px', 'hidden'];

		if (saveOldValues) {
			elements.forEach((el, idx) => {
				this.oldElementValues.push(new Map<string, string>());
				cssAttributes.forEach((cssAttribute, aidx) => {
					this.oldElementValues[idx].set(cssAttribute, el.style[cssAttribute]);
				});
			});
		}

		if (displayRealFullscreen) {
			if (overlayVisibility === OverlayVisibility.Visible) {
				elements.forEach((el, idx) => {
					cssAttributes.forEach((cssAttribute, aidx) => {
						el.style[cssAttribute] = cssValues[aidx];
					});
				});
			} else if (overlayVisibility === OverlayVisibility.Hidden) {
				elements.forEach((el, idx) => {
					cssAttributes.forEach((cssAttribute, aidx) => {
						el.style[cssAttribute] = this.oldElementValues[idx].get(cssAttribute);
					});
				});
			}
		}
	}
}

const mapStateToProps = (storeState: IStoreSchema) => {
	return {
		overlayVisibility: storeState.ui.overlayVisibility,
		device: storeState.ui.device
	};
};

export const FullscreenWrapper = connect(mapStateToProps)(FullscreenWrapperComponent);