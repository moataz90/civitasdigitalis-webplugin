import * as React from 'react';
import { Provider } from 'react-redux';
import { IStoreSchema } from '../redux-store/store-schema';
import { Store } from 'redux';
import { IConfig } from '../config/config-schema';
import { PluginModeSwitch } from './logic/ModeSwitch';
import { ThemeProvider } from '../theme/ThemeProvider';
import { ConfigContext } from '../config/ConfigProvider';

export interface IWebpluginProps {
	reduxStore: Store<IStoreSchema>;
	config: IConfig;
}

export class WebPlugin extends React.Component<IWebpluginProps> {
	constructor(props: IWebpluginProps) {
		super(props);
	}

	public render() {
		const { reduxStore, config } = this.props;

		return (
			<Provider store={reduxStore}>
				<ThemeProvider theme={config.theme}>
					<ConfigContext.Provider value={config}>
						<PluginModeSwitch config={config} />
					</ConfigContext.Provider>
				</ThemeProvider>
			</Provider>
		);
	}
}
