import * as React from 'react';
import { IPropsChildable } from '../../types/common-proptypes';
import { Message } from '../messages/Message';
import styled, { keyframes } from 'styled-components';
import { detect, BrowserInfo } from 'detect-browser';
import { Fragment } from 'react';

export interface IQuickReplyListProps extends IPropsChildable {
	children: React.ReactNode[];
	detectBrowser?: () => BrowserInfo;
}

const Animate = require('react-reveal/Zoom');

const FadeIn = keyframes`
0%   {opacity:0; transform:  translate(0px,15px); }
100% {opacity:1; transform:  translate(0px,0px);}

0%   {opacity:0; -moz-transform:  translate(0px,15px);}
100% {opacity:1; -moz-transform:  translate(0px,0px);}
0%   {opacity:0; -webkit-transform:  translate(0px,15px);}
100% {opacity:1; -webkit-transform:  translate(0px,0px);}
0%   {opacity:0; -o-transform:  translate(0px,15px)}
100% {opacity:1; -o-transform:  translate(0px,0px);}
0%   {opacity:0; -ms-transform:  translate(0px,15px);}
100% {opacity:1; -ms-transform:  translate(0px,0px);}
`;

const QuickReplyListAnimation = styled.div`
direction: rtl;
animation: ${FadeIn} ease 1s;
animation-iteration-count: 1;
transform-origin: 10% 10%;
animation-fill-mode:backwards; /*when the spec is finished*/
-webkit-animation: ${FadeIn} ease 1s;
-webkit-animation-iteration-count: 1;
-webkit-transform-origin: 10% 10%;
-webkit-animation-fill-mode:backwards; /*Chrome 16+, Safari 4+*/
-moz-animation: ${FadeIn} ease 1s;
-moz-animation-iteration-count: 1;
-moz-transform-origin: 10% 10%;
-moz-animation-fill-mode:backwards; /*FF 5+*/
-o-animation: ${FadeIn} ease 1s;
-o-animation-iteration-count: 1;
-o-transform-origin: 10% 10%;
-o-animation-fill-mode:backwards; /*Not implemented yet*/
-ms-animation: ${FadeIn} ease 1s;
-ms-animation-iteration-count: 1;
-ms-transform-origin: 10% 10%;
-ms-animation-fill-mode:backwards; /*IE 10+*/

opacity:0;
opacity: 1\9;
`;

const QuickReplyListComponent: React.StatelessComponent<IQuickReplyListProps> = (props) => {
	/* istanbul ignore next */
	const browser = (props.detectBrowser) ? props.detectBrowser() : detect();

	return (
		<Message isOwnMessage={true} isLastMessage={false}>
		{console.log(props.children.length)}
			{(browser.name === 'ie' || browser.name === 'safari' || browser.name === 'ios') ?
				<QuickReplyListAnimation >{props.children}</QuickReplyListAnimation> :
				/* istanbul ignore next */
				(props.children.length <= 1) ? <Animate bottom={true} ><Fragment >{props.children}</Fragment></Animate> :
					<Animate bottom={true} >{props.children}</Animate>

			}
		</Message>
	);
};

export const QuickReplyList = QuickReplyListComponent;