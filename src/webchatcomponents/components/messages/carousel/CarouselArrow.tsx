import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';

export interface ICarouselArrowProps extends IPropsStyledComponents {
	onClick: (arrowLeft: boolean) => void;
	isLeftArrow: boolean;
}

const CarouselArrowComponent: React.StatelessComponent<ICarouselArrowProps> = (props) => (
	<div className={props.className} onClick={props.onClick.bind(undefined, props.isLeftArrow)} />
);

const CarouselArrow = styled(CarouselArrowComponent)`
	&&& {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: white;
		box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.3);
		background-repeat: no-repeat;
		background-position: calc(50% + 2px) center;
		background-size: 50%;
		position: absolute;
		left: 5px;
		z-index: 50;
		cursor: pointer;
		margin-top: 85px; /*Just a temporary solution*/
	}

	&&&:hover{
		transform: scale(1.05);
	}
`;

export const CarouselArrowLeft = CarouselArrow.extend`
	&&& {
		background-image: url("https://parrotchatpluginv2.blob.core.windows.net/static/img/right-arrow.png");
		transform: scaleX(-1);
	}

	&&&:hover{
		transform: scaleX(-1) scale(1.05);
	}
`;

export const CarouselArrowRight = CarouselArrow.extend`
	&&& {
		background-image: url("https://parrotchatpluginv2.blob.core.windows.net/static/img/right-arrow.png");
		left: auto;
		right: 5px;
	}
`;