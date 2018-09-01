import * as React from 'react';
import { IPropsStyledComponents, IPropsChildable } from '../../types/common-proptypes';
import styled from 'styled-components';

export interface IViewProps extends IPropsStyledComponents, IPropsChildable {
	centerHorizontal?: boolean;
	centerVertical?: boolean;
	backgroundColor: string;
}

const ViewComponent: React.StatelessComponent<IViewProps> = ({ children, className }) => (
	<div className={className}>{children}</div>
);

const ViewComponentStyled = styled(ViewComponent) `
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	text-align: left;
	overflow: hidden;
	align-items: ${props => props.centerHorizontal === true ? 'center' : 'stretch'};
	justify-content: ${props => props.centerHorizontal === true ? 'center' : 'flex-start'};
	background-color: ${props => props.backgroundColor};
`;

export const View = ViewComponentStyled;
