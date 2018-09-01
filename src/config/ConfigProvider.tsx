import * as React from 'react';
import { IConfig } from './config-schema';

export const ConfigContext = React.createContext<IConfig>({} as any);