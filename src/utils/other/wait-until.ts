export type WaitUntilCondition = () => boolean;

export const waitUntil = (cond: WaitUntilCondition, timeout: number = 5000): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const timeoutRef = window.setTimeout(() => {
			reject();
		}, timeout);

		const waitForCond = () => {
			if (cond() === true) {
				if (timeoutRef) {
					window.clearTimeout(timeoutRef);
				}

				resolve();

				return;
			}

			setTimeout(waitForCond, 20);
		};

		waitForCond();
	});
};