import 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

export interface ITransitionTextProps {
	fontColor: string;
	fontSize: number;
	fontFamily: string;
}

export const TransitionText = styledTS<ITransitionTextProps>(styled.div)`
	font-size: ${props => props.fontSize}px;
	color: ${props => props.fontColor};
	font-family: ${props => props.fontFamily};
	text-align: center;
`;