export type EasingFunction = (t: number) => number;

export type ScrollSmothCallback = (interpolatedValue: number) => void;

export type SmoothScrolling = (
	startValue: number,
	targetValue: number,
	interpolation: EasingFunction,
	animationTime: number,
	callbackUpdate: ScrollSmothCallback,
	callbackFinish?: () => void
) => void;