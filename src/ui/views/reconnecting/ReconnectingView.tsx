import * as React from 'react';
import { View } from '../View';
import { ConfigContext } from '../../../config/ConfigProvider';
import { TransitionText } from '../../common/text/TransitionText';

export interface IReconnectingViewProps {
	nextReconnectTime?: number;
}

export const ReconnectingView: React.StatelessComponent<IReconnectingViewProps> = ({ nextReconnectTime }) => (
	<ConfigContext.Consumer>
		{
			config => (
				<View centerHorizontal={true} centerVertical={true} backgroundColor={config.theme.ui.view.backgroundColor}>
					<TransitionText
						fontColor="#e67e22"
						fontSize={config.theme.ui.transitionText.fontSize}
						fontFamily={config.theme.fontFamily}
					>
						{
							nextReconnectTime !== undefined
								? `Erneut verbinden in ${Math.round((nextReconnectTime - Date.now()) / 1000)} Sekunden`
								: 'Erneut verbinden'
						}
					</TransitionText>
				</View>
			)
		}
	</ConfigContext.Consumer>
);