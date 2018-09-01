export { }; // file needs to be a module

declare global {
	interface Window {
		isTestingMode: boolean;
	}
}