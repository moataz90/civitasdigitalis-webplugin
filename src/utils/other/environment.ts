export const isDevEnv = (): boolean => process.env.NODE_ENV === 'development';

export const isProdEnv = (): boolean => process.env.NODE_ENV === 'production';

export const isTestEnv = (): boolean => process.env.NODE_ENV === 'testing';