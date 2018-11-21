export interface ICategory {
	catId: number;
	name: string;
}

export interface IIdeaSummaryState {
	categories: ICategory[];
}