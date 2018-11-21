import * as constants from './idea.constants';
import { ICategory } from './idea.schema';
import { Timestamp } from '../../types/common-types';

// Set socket state
export interface ICategoryListStateSet {
	type: constants.CATEGORY_LIST_SET;
	payload: ICategory[];
}

export const categoryListSet = (categoryList: ICategory[]): ICategoryListStateSet => ({
	type: constants.CATEGORY_LIST_SET,
	payload: categoryList
});

// Export socket actions
export type IdeaSummaryAction = ICategoryListStateSet;
