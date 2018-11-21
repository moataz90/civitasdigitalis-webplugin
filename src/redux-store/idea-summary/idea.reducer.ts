import { IdeaSummaryAction } from './idea.actions';
import { IIdeaSummaryState } from './idea.schema';
import * as constants from './idea.constants';

const ideaSummaryDefaultState: IIdeaSummaryState = {
	categories: null
};

export const IdeaSummaryReducer = (state: IIdeaSummaryState = ideaSummaryDefaultState, action: IdeaSummaryAction): IIdeaSummaryState => {
	switch (action.type) {
		case constants.CATEGORY_LIST_SET:
			return { ...state, categories: action.payload };

		default:
			return state;
	}
};