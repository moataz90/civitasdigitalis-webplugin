import * as React from 'react';
import styled from 'styled-components';

export interface ISendButtonProps {
	onClick: () => void;
	css?: React.CSSProperties;
	className?: string;
}

const SendButtonComponent: React.StatelessComponent<ISendButtonProps> = ({ onClick, css, className }) => (
	<div onClick={onClick} className={className} style={css} >
	Senden
	</div>

);

const SendButtonComponentStyled = styled(SendButtonComponent) `
&&&{	color: #006E96;
	margin: auto;
	cursor: pointer;
	margin-right: 8px;
	font-size: inherit;
}
`;

export const SendButton = SendButtonComponentStyled;