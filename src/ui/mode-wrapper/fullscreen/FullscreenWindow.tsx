import * as React from 'react';
import styled from 'styled-components';
import { IPropsStyledComponents } from '../../../types/common-proptypes';
import { IConfig } from '../../../config/config-schema';
import { ViewSwitch } from '../../logic/ViewSwitch';
import { OverlayVisibility } from '../../../redux-store/ui/ui.schema';
// @ts-ignore
import withAnimation from 'styled-animate';

interface IFullscreenWindowComponentProps extends IPropsStyledComponents {
	config: IConfig;
	overlayVisibility: OverlayVisibility;
	realFullscreen: boolean;
	in: boolean;
}

const FullscreenWindowComponent: React.StatelessComponent<IFullscreenWindowComponentProps> = (props) => {
	const { className } = props;

	return (
		<div className={className}>
			<ViewSwitch />
		</div>
	);
};

const FullscreenWindowComponentStyled = styled(FullscreenWindowComponent) `
	width: ${props => props.realFullscreen ? 100 : 60}%;
	max-width: ${props => props.realFullscreen ? 100 : 60}%;
	height: ${props => props.realFullscreen ? 100 : 80}%;
	max-height: ${props => props.realFullscreen ? 100 : 80}%;
	left: ${props => props.realFullscreen ? 0 : '50%'};
	top: ${props => props.realFullscreen ? 0 : '50%'};
	right: ${props => props.realFullscreen ? 0 : 'auto'};
	bottom: ${props => props.realFullscreen ? 0 : 'auto'};
	transform: ${props => props.realFullscreen ? 'none' : 'translateX(-50%) translateY(-50%)'};
	position: fixed;
	z-index: 110;
`;

const FullscreenWindowComponentStyledAnimated = withAnimation(FullscreenWindowComponentStyled, {
	transition: '300ms linear',
	animate: {
		opacity: [0, 1]
	}
});

export const FullscreenWindow = FullscreenWindowComponentStyledAnimated;