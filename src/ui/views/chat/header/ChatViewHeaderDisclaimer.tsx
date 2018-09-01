import * as React from 'react';
import styled from 'styled-components';
import { IPropsStyledComponents } from '../../../../types/common-proptypes';
import { LinkTarget, openLink } from '../../../../utils/other/open-link';

export interface IChatViewHeaderDisclaimerProps extends IPropsStyledComponents {
	title: string;
	// fontSize: number;
	// fontColor: string;
	fontFamily: string;
	url: string;

}

class ChatViewHeaderDisclaimerComponent extends React.Component<IChatViewHeaderDisclaimerProps> {

	constructor(props: IChatViewHeaderDisclaimerProps) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	public render() {
		const { title, className } = this.props;

		return (
			<div className={className} onClick={this.onClick}>{title}</div>
		);
	}

	private onClick(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		const { url } = this.props;
		openLink(url, LinkTarget.PopUp);
	}

}

const ChatViewHeaderDisclaimerStyled = styled(ChatViewHeaderDisclaimerComponent)`
&&&{
	padding-left: 8px;
	font-size: x-small;
	color: rgb(4, 65, 133);
	font-family: ${props => props.fontFamily} ;
	padding-top: 0px;
	cursor: pointer;
	line-height: initial;
}
&&&:hover {
    text-decoration: underline;
}
`;

export const ChatViewHeaderDisclaimer = ChatViewHeaderDisclaimerStyled;