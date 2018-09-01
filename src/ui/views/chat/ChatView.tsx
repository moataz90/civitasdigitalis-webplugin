import * as React from 'react';
import { View } from '../View';
import { OverlayVisibility, UIWindowMode } from '../../../redux-store/ui/ui.schema';
import { connect, Dispatch } from 'react-redux';
import { IStoreSchema } from '../../../redux-store/store-schema';
import { MessageView } from './message-view/MessageView';
import { IThemeSchema } from '../../../theme/ThemeSchema';
import { withTheme } from 'styled-components';
import { getPersistentMenu } from '../../../redux-store/toolbar/toolbar.actions';
export interface IChatViewProps {
	overlayVisibility: OverlayVisibility;
	dispatch: Dispatch<any>;
	mode: UIWindowMode;
	theme: IThemeSchema;
}

class ChatViewComponent extends React.Component<IChatViewProps> {
	constructor(props: IChatViewProps) {
		super(props);
		props.dispatch(getPersistentMenu());
	}

	public render() {
		const { theme } = this.props;

		return (
			<View backgroundColor={theme.ui.chat.backgroundColor}>
				<MessageView />
			</View>
		);
	}
}

const mapStateToProps = (storeState: IStoreSchema) => {
	return {
		overlayVisibility: storeState.ui.overlayVisibility,
		mode: storeState.ui.mode
	};
};

export const ChatView = withTheme(connect(mapStateToProps)(ChatViewComponent));