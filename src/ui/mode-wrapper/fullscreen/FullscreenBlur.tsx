// @ts-ignore
import * as React from 'react';
import styled from 'styled-components';
// @ts-ignore
import withAnimation from 'styled-animate';

const FullscreenBlurStyled = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 100;
	background-color: grey;
`;

const FullscreenBlurStyledAnimated = withAnimation(FullscreenBlurStyled, {
	transition: '300ms linear',
	animate: {
		opacity: [0, 0.8]
	}
});

export const FullscreenBlur = FullscreenBlurStyledAnimated;
