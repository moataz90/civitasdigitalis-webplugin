import * as React from 'react';
/* tslint:disable:no-unused-variable */
import styled, { StyledComponentClass } from 'styled-components';
import { IPropsStyledComponents, IPropsChildable, IPropsCustomStyleable } from '../../types/common-proptypes';

export enum Section {
	start,
	middle,
	end,
	single
}

export interface IMessageBaseProps {
	isOwnMessage: boolean;
	isLastMessage: boolean;
	section?: Section;
}

export interface IMessageProps extends
	IMessageBaseProps, IPropsStyledComponents, IPropsChildable, IPropsCustomStyleable {

}

const MessageComponent: React.StatelessComponent<IMessageProps> = ({ className, children, css }) => (
<div className={className} style={css}>{children}</div>
);

const evaluatePadding = (section: Section): string => {
	switch (section) {
		case Section.start: return '8px 10px 3px';
		case Section.middle: return '3px 10px';
		case Section.end: return '3px 10px 6px';
		case Section.single: return '8px 10px 6px';
		default: return undefined;

	}
};

const MessageStyled = styled(MessageComponent)`
	&&& {
		width: 100%;
		position: relative;
		padding: ${props => evaluatePadding(props.section)};
		box-sizing: border-box;
		display: flex;
		align-items: flex-end;
		flex-flow: column nowrap;
		justify-content: flex-end;
		padding-right: 10px;
	}
`;

export const Message = MessageStyled;
