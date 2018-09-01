import { IStoreSchema } from './store-schema';
// import * as moment from 'moment';

export const loadStoreFromLocalStorage = (botID: string): IStoreSchema => {
	try {
		const serializedState = window.localStorage.getItem(botID);

		if (serializedState === null) {
			return undefined;
		} else {
			const storeState = JSON.parse(serializedState) as IStoreSchema;
			storeState.ui.chatShouldScrollDown = true;
			return storeState;
		}
	} catch (err) {
		console.error(err);

		return undefined;
	}
};

export const saveStoreToLocalStorage = (botID: string , store: IStoreSchema): void => {
	try {
		
		store.storedOn = Date.now();
		window.localStorage.setItem(botID, JSON.stringify(store));
	} catch (err) {
		console.error(err);
	}
};