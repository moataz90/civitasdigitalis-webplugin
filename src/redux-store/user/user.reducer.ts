import { IUserState } from './user.schema';
import { UserAction } from './user.actions';
import * as constants from './user.constants';

export const userDefaultState: IUserState = {
	sessionID: null
};

export const userReducer = (state: IUserState = userDefaultState, action: UserAction): IUserState => {
	switch (action.type) {
		case constants.USER_ID_SET:
			return {
				...state,
				sessionID: action.payload.userID
			};
		default:
			return state;
	}
};