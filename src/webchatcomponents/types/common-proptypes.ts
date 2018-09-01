import * as React from 'react';

export interface IPropsChildable {
	children?: any;
}

export interface IPropsStyledComponents {
	className?: string;
}

export interface IPropsCustomStyleable {
	css?: React.CSSProperties;
}