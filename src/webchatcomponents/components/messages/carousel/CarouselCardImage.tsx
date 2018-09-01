import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';

const CardImageWrapper = styled.div`
    &&& {
        width: 100%;
        border-bottom: 0px;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
    }

    &&&:after{
        padding-top: 52%;
        /* 500/260 fb ratio */
        display: block;
        content: '';
    }
`;

export interface ICarouselCardImageProps extends IPropsStyledComponents {
	imageUrl: string;
}

const CarouselCardImageComponent: React.StatelessComponent<ICarouselCardImageProps> = (props) => (
	<CardImageWrapper>
		<div className={props.className} />
	</CardImageWrapper>
);

const CarouselCardImageStyled = styled(CarouselCardImageComponent)`
	&&& {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: cover;
        background-image: url(${props => props.imageUrl});
	}
`;

export const CarouselCardImage = CarouselCardImageStyled;