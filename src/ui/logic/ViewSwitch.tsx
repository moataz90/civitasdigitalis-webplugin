import * as React from 'react';
import { SocketState } from '../../redux-store/socket/socket.schema';
import { connect } from 'react-redux';
import { IStoreSchema } from '../../redux-store/store-schema';
import { WelcomeView } from '../views/welcome/WelcomeView';
import { ConnectingView } from '../views/connecting/ConnectingView';
import { ChatView } from '../views/chat/ChatView';
import { ReconnectingView } from '../views/reconnecting/ReconnectingView';
import { ConnectionFailedView } from '../views/connection-failed/ConnectionFailedView';
import { ChatViewHeader } from '../views/chat/header/ChatViewHeader';
import { ConfigContext } from '../../config/ConfigProvider';
import { IThemeSchema } from '../../theme/ThemeSchema';
import { withTheme } from 'styled-components';
import { UIWindowMode, OverlayVisibility } from '../../redux-store/ui/ui.schema';
import { Dispatch } from 'redux';
import { uiOverlayVisibilitySet } from '../../redux-store/ui/ui.actions';

export interface IViewSwitchProps {
	socketState: SocketState;
	nextReconnectTime: number;
	theme: IThemeSchema;
	dispatch: Dispatch<any>;
	overlayVisibility: OverlayVisibility;
	mode: UIWindowMode;
}

class ViewSwitchComponents extends React.Component<IViewSwitchProps> {
	constructor(props: IViewSwitchProps) {
		super(props);

		this.onClickHeader = this.onClickHeader.bind(this);
	}

	public render() {
		const { socketState, nextReconnectTime, theme, mode } = this.props;

		let componentToRender: any = null;

		switch (socketState) {
			case SocketState.Disconnected:
				componentToRender = <WelcomeView />; break;
			case SocketState.Connecting:
				componentToRender = <ConnectingView />; break;
			case SocketState.Connected:
				componentToRender = <ChatView />; break;
			case SocketState.Reconnecting:
				componentToRender = <ReconnectingView />; break;
			case SocketState.WaitingForReconnect:
				componentToRender = <ReconnectingView nextReconnectTime={nextReconnectTime} />; break;
			case SocketState.Failed:
				componentToRender = <ConnectionFailedView />; break;
			default:
				componentToRender = null;
		}

		return (
			<ConfigContext.Consumer>
				{config => [
					<ChatViewHeader
						title={config.bot.displayName}
						backgroundColor={theme.ui.header.backgroundColor}
						fontColor={theme.ui.header.fontColor}
						fontFamily={theme.fontFamily}
						iconUrl={config.ui.header.iconUrl}
						closeButtonUrl={config.ui.header.closeButtonUrl}
						onClick={this.onClickHeader}
						roundCorners={mode === UIWindowMode.Overlay}
						disclaimerUrl={config.bot.disclaimerUrl}
						key="chatviewheader"

					/>
				].concat(componentToRender)}
			</ConfigContext.Consumer>
		);
	}

	private onClickHeader() {
		const { dispatch, overlayVisibility } = this.props;

		dispatch(uiOverlayVisibilitySet(
			overlayVisibility === OverlayVisibility.Visible
				? OverlayVisibility.Hidden
				: OverlayVisibility.Visible
		));
	}
}

const mapStateToProps = (storeState: IStoreSchema) => {
	return {
		socketState: storeState.socket.state,
		nextReconnectTime: storeState.socket.nextReconnect,
		overlayVisibility: storeState.ui.overlayVisibility,
		mode: storeState.ui.mode
	};
};

export const ViewSwitch = withTheme(connect(mapStateToProps)(ViewSwitchComponents));