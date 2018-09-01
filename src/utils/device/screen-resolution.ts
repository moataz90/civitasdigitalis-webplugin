export interface IScreenResolution {
	screenWidth: number;
	screenHeight: number;
}

export const getScreenResolution = (): IScreenResolution => ({
	screenHeight: window.screen.height,
	screenWidth: window.screen.width
});

export const deviceShouldFullscreen = (screenResolution: IScreenResolution): boolean =>
	screenResolution.screenWidth <= 480 || screenResolution.screenHeight <= 480;