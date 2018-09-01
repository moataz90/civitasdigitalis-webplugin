import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';
import { CarouselCardImage } from './CarouselCardImage';
import { CarouselCardContent } from './CarouselCardContent';
import { CarouselCardTitle } from './CarouselCardTitle';
import { CarouselCardSubtitle } from './CarouselCardSubtitle';
import { detect, BrowserInfo } from 'detect-browser';

const browser: BrowserInfo =  {
	name: 'ios',
	version: '1.0',
	os: 'windows'
};

/* istanbul ignore next */
const detectBrowser: BrowserInfo = detect() === null ? browser : detect() ;
/* istanbul ignore next */
const roundBorders = (detectBrowser.name === 'ios') ? true : false;

const CarouselCardWrapper = styled.div`
	&&& {
		margin-left: 10px;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		padding-bottom: 8px;
	}

	&&&:first-child{
		margin-left: 0px;
	}

	&&&:last-child{
		border-right: 10px solid transparent;
	}
`;

export interface ICarouselCardProps extends IPropsStyledComponents {
	children: React.ReactNode[];
	title: string;
	subtitle: string;
	imgUrl: string;
	fontFamily: string;
	fontColorTitle: string;
	fontColorSubtitle: string;
	isFirst?: boolean;
	isLast?: boolean;
}

const CarouselCardComponent: React.StatelessComponent<ICarouselCardProps> = (props) => (
	<CarouselCardWrapper>
		<div className={props.className}>
			<CarouselCardImage imageUrl={props.imgUrl} />
			<CarouselCardContent>
				<CarouselCardTitle title={props.title} fontFamily={props.fontFamily} fontColor={props.fontColorTitle} />
				<CarouselCardSubtitle subtitle={props.subtitle} fontFamily={props.fontFamily} fontColor={props.fontColorSubtitle} />
			</CarouselCardContent>
		</div>
		{props.children}
	</CarouselCardWrapper>
);
/* istanbul ignore next */
const CarouselCardStyled = styled(CarouselCardComponent)`
	&&& {
		width: 260px;
	
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		border-bottom-left-radius: ${props => (props.isFirst) ? roundBorders ? '16px' : '0px' : '16px'};
		border-bottom-right-radius: ${props => (props.isLast) ? roundBorders ? '16px' : '0px' : '16px'};
		background-color: white;
		box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.3);
		margin: 15px 10px;
		margin-right: 0px;
		overflow: hidden;
	}
`;

export const CarouselCard = CarouselCardStyled;