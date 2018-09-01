import * as React from 'react';
import { IPropsChildable, IPropsStyledComponents } from '../../types/common-proptypes';
import styled, { keyframes } from 'styled-components';
import { IThemeSchema } from '../../theme/ThemeSchema';

export enum FloatingButtonPosition {
	BottomLeftCorner,
	BottomRightCorner,
	BottomCenter
}

interface IPositionCssProperties {
	left: string;
	right: string;
	bottom: string;
	transform: string;
}

const mapPositionToCssProperties = (position: FloatingButtonPosition, theme: IThemeSchema): IPositionCssProperties => {
	if (theme.ui.floatingButton.position !== undefined) {
		return {
			left: undefined,
			right: theme.ui.floatingButton.position.right + 'px',
			bottom: theme.ui.floatingButton.position.bottom + 'px',
			transform: undefined
		};
	} else {
		switch (position) {
			case FloatingButtonPosition.BottomLeftCorner:
				return { left: '20px', right: undefined, bottom: '40px', transform: undefined };
			case FloatingButtonPosition.BottomRightCorner:
				return { left: undefined, right: '20px', bottom: '40px', transform: undefined };
			case FloatingButtonPosition.BottomCenter:
				return { left: '50%', right: undefined, bottom: '40px', transform: 'translateX(50%)' };
			default:
				return { left: undefined, right: undefined, bottom: undefined, transform: undefined };
		}
	}
};

export interface IFloatingButtonProps extends IPropsChildable, IPropsStyledComponents {
	width: number;
	height: number;
	position: FloatingButtonPosition;
	onClick: () => void;
	visible: boolean;
}

const FloatingButtonComponent: React.StatelessComponent<IFloatingButtonProps> = ({ className, onClick, children }) => (
	<div className={className} onClick={onClick}>{children}</div>
);

const bouncingAnimation = keyframes`
	0%{
		transform: scale(1);
	}
	50%{
		transform: scale(1.02);
	}
	100%{
		transform: scale(1);
	}
`;

const FloatingButtonStyled = styled(FloatingButtonComponent)`
	position: fixed;
	width: ${props => props.width}px;
	height: ${props => props.height}px;
	left: ${props => mapPositionToCssProperties(props.position, props.theme).left};
	right: ${props => mapPositionToCssProperties(props.position, props.theme).right};
	bottom: ${props => mapPositionToCssProperties(props.position, props.theme).bottom};
	transform: ${props => mapPositionToCssProperties(props.position, props.theme).transform}
		${props => props.visible ? 'scale(1)' : 'scale(0)'};
	cursor: pointer;
	transition: all 0.25s;
	animation: ${props => !props.visible ? 'none' : bouncingAnimation} 0.5s ease-in-out;
	transform-origin: (right bottom 0);
	animation-delay: 0.1s;


	@media only screen  {
		opacity: 0.75;

	}
`;

export const FloatingButton = FloatingButtonStyled;