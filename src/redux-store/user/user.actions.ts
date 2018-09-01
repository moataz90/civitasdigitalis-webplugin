import * as constants from './user.constants';

export interface IUserIDSet {
	type: constants.USER_ID_SET;
	payload: {
		userID: string;
	};
}

export const userIDSet = (userID: string): IUserIDSet => {
	return {
		type: constants.USER_ID_SET,
		payload: {
			userID
		}
	};
};

export type UserAction = IUserIDSet;