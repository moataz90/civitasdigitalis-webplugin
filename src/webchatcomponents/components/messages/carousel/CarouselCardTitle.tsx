import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';

export interface ICarouselCardTitleProps extends IPropsStyledComponents {
	title: string;
	fontFamily: string;
	fontColor: string;
}

const CarouselCardTitleComponent: React.StatelessComponent<ICarouselCardTitleProps> =
	({ title, fontFamily, className }) => (
		<div className={className}>{title}</div>
	);

export const CarouselCardTitle = styled(CarouselCardTitleComponent)`
	&&& {
		font-size: 14px;
		font-family: ${props => props.fontFamily};
		font-weight: bold;
		overflow: hidden;
		color: ${props => props.fontColor};
	}
`;