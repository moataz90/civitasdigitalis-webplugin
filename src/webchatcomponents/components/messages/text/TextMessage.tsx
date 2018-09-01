import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass, keyframes } from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';
import { Message, IMessageBaseProps } from '../Message';
import { IButtonProps } from '../../buttons/Button';

export enum Section {
	start,
	middle,
	end,
	single
}

export interface ITextMessageProps extends IMessageBaseProps, IPropsStyledComponents {
	text: string;
	fontColor: string;
	backgroundColor: string;
	maxWidth: number | string;
	fontFamily: string;
	isOwnMessage: boolean;
	buttons?: React.ReactElement<IButtonProps>[];
	section?: Section;
}

const TextMessageComponent: React.StatelessComponent<ITextMessageProps> = (props) => {
	const { className, text, isOwnMessage, children, isLastMessage, section } = props;

	const customStyle = {
		justifyContent: isOwnMessage ? 'flex-end' : undefined
	};

	return (
		<Message isOwnMessage={isOwnMessage} css={customStyle} isLastMessage={isLastMessage} section={section}>
			<div className={className}>{text}</div>
			{children}
		</Message>
	);
};

const FadeIn = keyframes`
0%   {opacity:0; transform:  translate(0px,15px); }
100% {opacity:1; transform:  translate(0px,0px);}

0%   {opacity:0; -moz-transform:  translate(0px,15px);}
100% {opacity:1; -moz-transform:  translate(0px,0px);}
0%   {opacity:0; -webkit-transform:  translate(0px,15px);}
100% {opacity:1; -webkit-transform:  translate(0px,0px);}
0%   {opacity:0; -o-transform:  translate(0px,15px)}
100% {opacity:1; -o-transform:  translate(0px,0px);}
0%   {opacity:0; -ms-transform:  translate(0px,15px);}
100% {opacity:1; -ms-transform:  translate(0px,0px);}
`;

const TextMessageStyled = styled(TextMessageComponent) `
	&&&{
		max-width: ${props => typeof props.maxWidth === 'string' ? props.maxWidth : `${props.maxWidth}px`};
		font-size: 16px;
		line-height: normal;
		background-color: ${props => props.backgroundColor};
		color: ${props => props.fontColor};
		border-radius: 20px;
		border-bottom-right-radius: ${props => props.isOwnMessage === true
		&& (props.section === Section.end || props.section === Section.single) ? '0px' : '20px'};
		border-bottom-left-radius: ${ props => props.isOwnMessage === false
		&& (props.section === Section.end || props.section === Section.single) ? '0px' : '20px'};
		padding: 11px 18px 11px 18px;
		font-family: ${ props => props.fontFamily};
		align-self: ${ props => props.isOwnMessage ? 'flex-end' : 'flex-start'};
		word-wrap: break-word;


		animation: ${FadeIn} ease 1s;
		animation-iteration-count: 1;
		transform-origin: 10% 10%;
		animation-fill-mode:backwards; /*when the spec is finished*/
		-webkit-animation: ${FadeIn} ease 1s;
		-webkit-animation-iteration-count: 1;
		-webkit-transform-origin: 10% 10%;
		-webkit-animation-fill-mode:backwards; /*Chrome 16+, Safari 4+*/ 
		-moz-animation: ${FadeIn} ease 1s;
		-moz-animation-iteration-count: 1;
		-moz-transform-origin: 10% 10%;
		-moz-animation-fill-mode:backwards; /*FF 5+*/
		-o-animation: ${FadeIn} ease 1s;
		-o-animation-iteration-count: 1;
		-o-transform-origin: 10% 10%;
		-o-animation-fill-mode:backwards; /*Not implemented yet*/
		-ms-animation: ${FadeIn} ease 1s;
		-ms-animation-iteration-count: 1;
		-ms-transform-origin: 10% 10%;
		-ms-animation-fill-mode:backwards; /*IE 10+*/
	
		opacity:0;
		opacity: 1\9;
	
	}
`;

export const TextMessage = TextMessageStyled;