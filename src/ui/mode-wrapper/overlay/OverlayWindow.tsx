import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';
import { IConfig } from '../../../config/config-schema';
import { ViewSwitch } from '../../logic/ViewSwitch';
import { OverlayVisibility } from '../../../redux-store/ui/ui.schema';

export interface IOverlayWindowComponentProps extends IPropsStyledComponents {
	config: IConfig;
	overlayVisibility: OverlayVisibility;
}

class OverviewWindowComponent extends React.Component<IOverlayWindowComponentProps> {
	public render() {
		const { className } = this.props;

		return (
			<div className={className}>
				<ViewSwitch />
			</div>
		);
	}
}

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

const OverviewWindowComponentStyled = styled(OverviewWindowComponent)`
    height: ${props => props.overlayVisibility === OverlayVisibility.Hidden
		? '0px'
		: 'calc((100% - 44px) - 20px)'};
	width: ${props => props.overlayVisibility === OverlayVisibility.Hidden
		? 0
		: props.config.ui.overlay.width}px;
	max-height: ${props => props.overlayVisibility === OverlayVisibility.Hidden
		? 0
		: props.config.ui.overlay.height}px;
	opacity: ${props => props.overlayVisibility === OverlayVisibility.Hidden
		? 0
		: 1};
	border-radius: 16px;
	position: fixed;
	right: 33px;
	bottom: 97px;
	box-shadow: 10px 10px 100px -2px rgba(0,0,0,.41);
	z-index: 10000;
	transition: all 0.25s;
	animation: ${props => props.overlayVisibility === OverlayVisibility.Hidden
		? 'none'
		: bouncingAnimation} 0.5s ease-in-out;
	transform-origin: (right bottom 0);
	animation-delay: 0.1s;
	overflow: hidden;
`;

export const OverlayWindow = OverviewWindowComponentStyled;