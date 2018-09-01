import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';

export interface ICarouselCardSubtitleProps extends IPropsStyledComponents {
	subtitle: string;
	fontFamily: string;
	fontColor: string;
}

const CarouselCardSubtitleComponent: React.StatelessComponent<ICarouselCardSubtitleProps> =
	({ subtitle, fontFamily, className }) => (
		<div className={className}>{subtitle}</div>
	);

export const CarouselCardSubtitle = styled(CarouselCardSubtitleComponent)`
	&&& {
		font-size: 12px;
		font-family: ${props => props.fontFamily};
		color: ${props => props.fontColor};
	}
`;