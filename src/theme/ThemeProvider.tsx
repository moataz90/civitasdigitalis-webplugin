import * as React from 'react';
import { ThemeProvider as ThemeProviderStyledComponents } from 'styled-components';
import { IPropsChildable } from '../types/common-proptypes';
import { IThemeSchema } from './ThemeSchema';

export interface IThemeProviderProps extends IPropsChildable {
	theme: IThemeSchema;
}

export const ThemeProvider: React.StatelessComponent<IThemeProviderProps> = ({ children, theme }) => (
	<ThemeProviderStyledComponents theme={theme}>{children}</ThemeProviderStyledComponents>
);