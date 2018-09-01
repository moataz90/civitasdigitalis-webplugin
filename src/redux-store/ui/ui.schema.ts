export enum UIWindowMode {
	Overlay = 'overlay',
	Embedded = 'embedded',
	Hybrid = 'hybrid',
	Fullscreen = 'fullscreen'
}

export enum OverlayVisibility {
	Hidden,
	Transitioning,
	Visible
}

export enum Device {
	Desktop = 'desktop',
	Smartphone = 'smartphone',
	Tablet = 'tablet',
	Other = 'other'
}

export interface IUIState {
	pluginEnabled: boolean;
	mode: UIWindowMode;
	overlayVisibility: OverlayVisibility;
	device: Device;
	chatShouldScrollDown: boolean;
}