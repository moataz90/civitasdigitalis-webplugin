import * as React from 'react';
import { View } from '../View';
import { ConfigContext } from '../../../config/ConfigProvider';
import { TransitionText } from '../../common/text/TransitionText';

export const ConnectionFailedView: React.StatelessComponent = () => (
	<ConfigContext.Consumer>
		{
			config => (
				<View centerHorizontal={true} centerVertical={true} backgroundColor={config.theme.ui.view.backgroundColor}>
					<TransitionText
						fontColor="#e74c3c"
						fontSize={config.theme.ui.transitionText.fontSize}
						fontFamily={config.theme.fontFamily}
					>
						Verbindung fehlgeschlagen
					</TransitionText>
				</View>
			)
		}
	</ConfigContext.Consumer>
);