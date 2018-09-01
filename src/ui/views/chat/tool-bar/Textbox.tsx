import * as React from 'react';
// import { IPropsChildable } from '../../types/common-proptypes';
import styled from 'styled-components';

export interface ITextboxProps /*  extends IPropsChildable  */{
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	placeholder: string;
	value: string;
	css?: React.CSSProperties;
	className?: string;
}

const TextboxComponent: React.StatelessComponent<ITextboxProps> = ({ value , onChange, onKeyUp, placeholder, css, className }) => (
	<input value={value} placeholder={placeholder} onChange={onChange} className={className} style={css} onKeyUp={onKeyUp} />
);

const TextboxComponentStyled = styled(TextboxComponent) `
	&&&{
		width: 100%;
		height: 24px;
		border: none;
		margin: auto;
		margin-left: 12px;
		resize: none;
		outline: none;
		-webkit-box-shadow: none;
		-moz-box-shadow: none;
		box-shadow: none;
		overflow: auto;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
	}

	&&&:focus{
		border-color: white;
	}

	::-webkit-input-placeholder {
		font-style: italic;
	 }
	 :-moz-placeholder {
		font-style: italic;
	 }
	 ::-moz-placeholder {
		font-style: italic;
	 }
	 :-ms-input-placeholder {
		font-style: italic;
	 }
`;

export const Textbox = TextboxComponentStyled;