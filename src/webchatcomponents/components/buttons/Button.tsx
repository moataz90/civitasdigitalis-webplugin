import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass, keyframes } from 'styled-components';
import { IPropsStyledComponents } from '../../types/common-proptypes';
import { ButtonCallback } from '../../types/button-types';

export interface IButtonProps extends IPropsStyledComponents {
	title: string;
	payload: any;
	type: number;
	onClick: ButtonCallback;
	backgroundColor: string;
	fontColor: string;
	fontSize: number;
	fontFamily: string;
	idx: number;
	firstButtonMarginTop: number;
	delay?: number;
}

const ButtonComponent: React.StatelessComponent<IButtonProps> = (props) => {
	const { className, onClick } = props;
	return (

		<div
			className={className}
			onClick={onClick.bind(undefined, props.type, props.title, props.payload)}
		>
			{props.title}
		</div>
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

const ButtonStyled = styled(ButtonComponent)`
	&&& {
		width: fit-content;
		padding: 11px 18px 11px 18px;
		background-color: ${props => props.backgroundColor};
		font-size: ${props => props.fontSize}px;
		color: ${props => props.fontColor};
		border-radius: 20px;
		margin-top: ${props => props.idx === 0 ? props.firstButtonMarginTop : 6}px;
		font-family: ${props => props.fontFamily};
		align-self: flex-end;
		cursor: pointer;
		z-index: 10;
		
		position: relative;




	}

	&&&:hover{
		opacity: 0.8;
	}
`;

export const Button = ButtonStyled;

// animation-delay: ${props => props.delay}s;
// animation: ${FadeIn} ease 10  s;
// animation-iteration-count: 1;
// transform-origin: 10% 10%;

// opacity:0;
// opacity: 1\9;

		// animation-fill-mode:backwards; /*when the spec is finished*/
		// -webkit-animation: ${FadeIn} ease 1s;
		// -webkit-animation-iteration-count: 1;
		// -webkit-transform-origin: 10% 10%;
		// -webkit-animation-fill-mode:backwards; /*Chrome 16+, Safari 4+*/ 
		// -moz-animation: ${FadeIn} ease 1s;
		// -moz-animation-iteration-count: 1;
		// -moz-transform-origin: 10% 10%;
		// -moz-animation-fill-mode:backwards; /*FF 5+*/
		// -o-animation: ${FadeIn} ease 1s;
		// -o-animation-iteration-count: 1;
		// -o-transform-origin: 10% 10%;
		// -o-animation-fill-mode:backwards; /*Not implemented yet*/
		// -ms-animation: ${FadeIn} ease 1s;
		// -ms-animation-iteration-count: 1;
		// -ms-transform-origin: 10% 10%;
		// -ms-animation-fill-mode:backwards; /*IE 10+*/
