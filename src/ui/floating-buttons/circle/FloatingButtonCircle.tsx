import * as React from 'react';
import { IFloatingButtonProps, FloatingButton } from '../FloatingButton';
import { IPropsStyledComponents } from '../../../types/common-proptypes';
import styled from 'styled-components';

export interface ICircleComponentProps extends IPropsStyledComponents {
	iconUrl: string;
	iconDimension: number | string;
	backgroundColor: string;
}

export interface IFloatingButtonCircleProps extends IFloatingButtonProps, ICircleComponentProps {
	iconUrl: string;
}

const CircleComponent: React.StatelessComponent<ICircleComponentProps> = ({ className, iconUrl }) => (
	<div className={className} />
);

const CircleComponentStyled = styled(CircleComponent)`
	width: 100%;
	height: 100%;
	background-color: ${props => props.backgroundColor};
	border-radius: 50%;
	background-image: url(${props => props.iconUrl});
	background-repeat: no-repeat;
	background-position: center;
	background-size: ${props => typeof props.iconDimension === 'string'
		? props.iconDimension : `${props.iconDimension}px`};
`;

const FloatingButtonCircleComponent: React.StatelessComponent<IFloatingButtonCircleProps> = (props) => {
	return (
		<FloatingButton {...props}>
			<CircleComponentStyled
				iconUrl={props.iconUrl}
				iconDimension={props.iconDimension}
				backgroundColor={props.backgroundColor}
			/>
		</FloatingButton>
	);
};

export const FloatingButtonCircle = FloatingButtonCircleComponent;
