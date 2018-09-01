import { EasingFunction } from './easing';

export type ScrollSmothCallback = (interpolatedValue: number) => void;

export const scrollSmooth = (startValue: number, targetValue: number, interpolation: EasingFunction, animationTime: number,
	callbackUpdate: ScrollSmothCallback, callbackFinish?: () => void) => {

	const diff = targetValue - startValue;

	let lastTime = Date.now();
	let timeSum = 0;

	const internalInterpolate = () => {
		const p = Math.min(timeSum / animationTime, 1);
		const newValue = diff * interpolation(p);

		callbackUpdate(diff > 0 ? Math.min(startValue + newValue, targetValue) : Math.max(startValue + newValue, targetValue));

		timeSum += (Date.now() - lastTime);
		lastTime = Date.now();

		if (p < 1) {
			window.requestAnimationFrame(internalInterpolate);
		} else {
			if (callbackFinish) {
				callbackFinish();
			}
		}
	};

	window.requestAnimationFrame(internalInterpolate);
};