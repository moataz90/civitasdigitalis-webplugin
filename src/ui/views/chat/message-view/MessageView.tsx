import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styled, { withTheme } from 'styled-components';
import { connect, Dispatch } from 'react-redux';
import { IMessage, MessageButtonType } from '../../../../redux-store/messages/messages.schema';
import { IStoreSchema } from '../../../../redux-store/store-schema';
import { mapMessageToComponent } from './map-message-to-component';
import { IThemeSchema } from '../../../../theme/ThemeSchema';
import { sendPostbackMessage } from '../../../../socket-handler/socket-handler';
import { LinkTarget, openLink } from '../../../../utils/other/open-link';
import { uiChatShouldScrollDown } from '../../../../redux-store/ui/ui.actions';
import { waitUntil } from '../../../../utils/other/wait-until';
import { TypingMessage } from '../../../../webchatcomponents';
import { ChatToolBar } from '../tool-bar/ChatToolBar';
import { ConfigContext } from '../../../../config/ConfigProvider';

const MessageViewWrapper = styled.div`
	flex: 1 0 0;
	display: flex;
	background: white;
`;

const MessageViewInnerWrapper = styled.div`
	padding: 10px 0px;
`;

export interface IMessageViewProps {
	messages: Array<IMessage<any>>;
	dispatch: Dispatch<any>;
	theme: IThemeSchema;
	userID: string;
	shouldScrollDown: boolean;
	typing: boolean;
}

export interface IMessageViewState {
	paddingTop: number;
}

class MessageViewComponent extends React.Component<IMessageViewProps, IMessageViewState> {
	private customScrollBar: Scrollbars;
	private lastMessageCount: number = 0;

	constructor(props: IMessageViewProps) {
		super(props);

		this.state = { paddingTop: 0 };

		if (props.shouldScrollDown) {
			waitUntil(() => this.customScrollBar !== undefined && this.customScrollBar !== null, 1000)
				.then(() => {
					this.customScrollBar.scrollToBottom();
					props.dispatch(uiChatShouldScrollDown(false));

				});
		}

		this.onClickButton = this.onClickButton.bind(this);
		this.onLoadMedia = this.onLoadMedia.bind(this);
	}

	public componentDidMount() {
		this.lastMessageCount = this.props.messages.length;
	}

	public componentDidUpdate() {
		if (this.props.messages.length > this.lastMessageCount) {
			// this.adjustMessageViewPadding();
			this.customScrollBar.scrollToBottom();
			this.lastMessageCount = this.props.messages.length;

		}
	}

	// public adjustMessageViewPadding() {
	// 	if (this.customScrollBar.getScrollTop() > this.customScrollBar.getClientHeight()) {
	// 		this.setState({ paddingTop: 0 });
	// 		// setTimeout(() => this.setState({ paddingTop: 5 }), 400);
	// 	} else {
	// 		this.setState({ paddingTop: 400 - this.customScrollBar.getScrollTop() });
	// 	}
	// }

	public UNSAFE_componentWillReceiveProps(nextProps: IMessageViewProps) {
		const { shouldScrollDown } = this.props;

		if (shouldScrollDown === false && nextProps.shouldScrollDown === true) {
			this.customScrollBar.scrollToBottom();

		}
	}

	public onClickButton(type: MessageButtonType, title: string, payload: string) {
		if (type === MessageButtonType.Postback) {
			sendPostbackMessage<string>(title, payload, this.props.userID);
		} else if (type === MessageButtonType.Url) {
			openLink(payload, LinkTarget.SameWindow);
		}
	}

	public onLoadMedia(success: boolean, width: number, height: number) {
		if (success) {
			this.customScrollBar.scrollToBottom();
		}
	}

	public render() {
		const { messages, typing, theme } = this.props;

		return (
			<MessageViewWrapper>
				<div style={{ width: '100%', height: 'calc(100% - 60px)', position: 'absolute' }}>
					<div style={{ overflow: 'hidden', width: '100%', height: '87%' }}>
						<Scrollbars
							hideTracksWhenNotNeeded={true}
							autoHide={true}
							ref={(instance) => this.customScrollBar = instance}
							style={{ paddingTop: 5 }}
						>
							<MessageViewInnerWrapper style={{ paddingTop: this.state.paddingTop }}>
								{
									messages.map((message, idx) =>
										mapMessageToComponent(message, message.id, theme, this.onClickButton, this.onLoadMedia, idx === messages.length - 1))

								}
							</MessageViewInnerWrapper  >

						</Scrollbars>

					</div>
					<TypingMessage isTyping={typing} />
					<ConfigContext.Consumer>
						{
							config => (
								<ChatToolBar fontFamily={theme.fontFamily} toolbarConfig={config.behaviour.toolbar} />
							)
						}
					</ConfigContext.Consumer>
				</div >
			</MessageViewWrapper >
		);
	}
}

const mapStateToProps = (storeState: IStoreSchema) => {
	return {
		messages: storeState.messages.messages,
		userID: storeState.user.sessionID,
		shouldScrollDown: storeState.ui.chatShouldScrollDown,
		typing: storeState.messages.typing
	};
};

export const MessageView = connect(mapStateToProps)(withTheme(MessageViewComponent));