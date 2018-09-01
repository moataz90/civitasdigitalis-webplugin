import { IConfig } from './config/config-schema';
import { initPlugin } from './init-logic/init-plugin';

(async () => {
	// Try to get config from global space
	let config: IConfig = null;

	if ((window as any).pwp_config) {
		config = (window as any).pwp_config;
	} else {
		console.error('No config found!');

		return;
	}

	await initPlugin(config);
})();