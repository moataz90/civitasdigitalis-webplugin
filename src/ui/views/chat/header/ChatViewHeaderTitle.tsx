import * as React from 'react';
import styled from 'styled-components';
import { IPropsStyledComponents } from '../../../../types/common-proptypes';

export interface IChatViewHeaderTitleProps extends IPropsStyledComponents {
	title: string;
	fontSize: number;
	fontColor: string;
	fontFamily: string;
}

const ChatViewHeaderTitleComponent: React.StatelessComponent<IChatViewHeaderTitleProps> = ({ title, className }) => (
	<div className={className}>{title}</div>
);

const ChatViewHeaderTitleStyled = styled(ChatViewHeaderTitleComponent)`
&&&{
	padding-left: 8px;
	font-size: ${props => props.fontSize}px;
	color: ${props => props.fontColor};
	font-family: ${props => props.fontFamily} ;
	line-height: initial;

}
`;

export const ChatViewHeaderTitle = ChatViewHeaderTitleStyled;