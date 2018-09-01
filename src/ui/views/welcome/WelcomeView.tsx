import * as React from 'react';
import { View } from '../View';
import { ConfigContext } from '../../../config/ConfigProvider';
import { TransitionText } from '../../common/text/TransitionText';

export const WelcomeView: React.StatelessComponent = () => (
	<ConfigContext.Consumer>
		{
			config => (
				<View centerHorizontal={true} centerVertical={true} backgroundColor={config.theme.ui.view.backgroundColor}>
					<TransitionText
						fontColor={config.theme.ui.transitionText.fontColor}
						fontSize={config.theme.ui.transitionText.fontSize}
						fontFamily={config.theme.fontFamily}
					>
						Welcome
					</TransitionText>
				</View>
			)
		}
	</ConfigContext.Consumer>
);