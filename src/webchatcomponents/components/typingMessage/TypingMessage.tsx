import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { IPropsStyledComponents } from '../../types/common-proptypes';

export interface ITypingMessageProps extends IPropsStyledComponents {
	isTyping: boolean;
}

export const TypingMessageComponent: React.StatelessComponent<ITypingMessageProps> = (props) => {
	const { className, isTyping } = props;

	return (
		<React.Fragment>
			{isTyping
				? (
					<div className={className}>
						<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 32 32" >
							<circle transform="translate(8 0)" cx="0" cy="16" r="0">
								<animate
									attributeName="r"
									values="0; 4; 0; 0"
									dur="1.2s"
									repeatCount="indefinite"
									begin="0"
									keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
									calcMode="spline"
								/>
							</circle>
							<circle transform="translate(16 0)" cx="0" cy="16" r="0">
								<animate
									attributeName="r"
									values="0; 4; 0; 0"
									dur="1.2s"
									repeatCount="indefinite"
									begin="0.3"
									keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
									calcMode="spline"
								/>
							</circle>
							<circle transform="translate(24 0)" cx="0" cy="16" r="0">
								<animate
									attributeName="r"
									values="0; 4; 0; 0"
									dur="1.2s"
									repeatCount="indefinite"
									begin="0.6"
									keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
									calcMode="spline"
								/>
							</circle>
						</svg>
					</div>
				) : null
			}
		</React.Fragment>
	);

};

const TypingMessageComponentStyled = styled(TypingMessageComponent)`
	position: sticky;
	bottom: 19;
	fill: gray;
	width: 40px;
	height: 24px;
`;

export const TypingMessage = TypingMessageComponentStyled;
