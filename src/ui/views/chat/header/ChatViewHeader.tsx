import * as React from 'react';
import { IPropsStyledComponents } from '../../../../types/common-proptypes';
import styled from 'styled-components';
import { ChatViewHeaderIcon } from './ChatViewHeaderIcon';
import { ChatViewHeaderTitle } from './ChatViewHeaderTitle';
import { ChatViewHeaderCloseButton } from './ChatViewHeaderCloseButton';
import { ChatViewHeaderDisclaimer } from './ChatViewHeaderDisclaimer';

export interface IChatViewHeaderProps extends IPropsStyledComponents {
	title: string;
	iconUrl: string;
	closeButtonUrl: string;
	backgroundColor: string;
	fontColor: string;
	fontFamily: string;
	roundCorners: boolean;
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	disclaimerUrl?: string;
}

const ChatViewHeaderComponent: React.StatelessComponent<IChatViewHeaderProps> = (props) => {
	const { className, onClick, iconUrl, title, fontFamily, closeButtonUrl, disclaimerUrl } = props;

	return (
		<div className={className} onClick={onClick}>
			<ChatViewHeaderIcon src={iconUrl} alt="Chat Icon" />
			<div>
				<ChatViewHeaderTitle title={title} fontSize={18} fontColor="white" fontFamily={fontFamily} />
				<ChatViewHeaderDisclaimer title="Haftungsausschluss" fontFamily={fontFamily} url={disclaimerUrl} />
			</div>
			<ChatViewHeaderCloseButton src={closeButtonUrl} alt="Close chat window" />
		</div>
	);
};

const ChatViewHeaderStyled = styled(ChatViewHeaderComponent)`
	&&& {
		width: 100%;
		height: 56px;
		background-color: ${props => props.backgroundColor};
		color: ${props => props.fontColor};
		cursor: pointer;
		padding: 8px;
		box-sizing: border-box;
		border-top-left-radius: ${props => props.roundCorners ? 16 : 0}px;
		border-top-right-radius: ${props => props.roundCorners ? 16 : 0}px;
		display: flex;
		align-items: center;
	}

	&&&:before {
		content: "";
		display: inline-block;
		vertical-align: middle;
		height: 100%;
	}
`;

export const ChatViewHeader = ChatViewHeaderStyled;