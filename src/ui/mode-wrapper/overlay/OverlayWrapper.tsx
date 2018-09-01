import * as React from 'react';
import { IConfig } from '../../../config/config-schema';
import { OverlayWindow } from './OverlayWindow';
import { FloatingButtonCircle } from '../../floating-buttons/circle/FloatingButtonCircle';
import { FloatingButtonPosition } from '../../floating-buttons/FloatingButton';
import { connect, Dispatch } from 'react-redux';
import { uiOverlayVisibilitySet, uiChatShouldScrollDown } from '../../../redux-store/ui/ui.actions';
import { OverlayVisibility } from '../../../redux-store/ui/ui.schema';
import { IStoreSchema } from '../../../redux-store/store-schema';

export interface IOverlayWrapperProps {
	config: IConfig;
	dispatch: Dispatch<any>;
	overlayVisibility: OverlayVisibility;
}

class OverlayWrapperComponent extends React.Component<IOverlayWrapperProps> {
	constructor(props: IOverlayWrapperProps) {
		super(props);

		this.onClickFloatingButton = this.onClickFloatingButton.bind(this);
	}

	public render() {
		const { config, overlayVisibility } = this.props;

		return [
			<OverlayWindow key="overlay-window" config={config} overlayVisibility={overlayVisibility} />,
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
}

const mapStateToProps = (storeState: IStoreSchema) => {
	return {
		overlayVisibility: storeState.ui.overlayVisibility
	};
};

export const OverlayWrapper = connect(mapStateToProps)(OverlayWrapperComponent);