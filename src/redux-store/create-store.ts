import { uiReducer } from './ui/ui.reducer';
import { toolbarReducer } from './toolbar/toolbar.reducer';
import { socketReducer } from './socket/socket.reducer';
import { SocketState } from '../redux-store/socket/socket.schema';
import { messagesReducer } from './messages/messages.reducer';
import { userReducer } from './user/user.reducer';
import { createStore as createReduxStore, compose, combineReducers, applyMiddleware, Store } from 'redux';
import { IStoreSchema } from './store-schema';
import thunk from 'redux-thunk';
import { loadStoreFromLocalStorage } from './store-persist';
import { IConfig } from '../config/config-schema';

const buildRootReducer = (allReducers: any) => {
	return combineReducers<IStoreSchema>(Object.assign({}, allReducers));
};

const windowIfDefined = typeof window === 'undefined' ? null : window as any;

const rootReducer = buildRootReducer({
	user: userReducer,
	messages: messagesReducer,
	socket: socketReducer,
	ui: uiReducer,
	toolbar: toolbarReducer

});

const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStore = (config: IConfig): Store<IStoreSchema> => {
	let loadedStoreFromLocalStorage;

	if (config.session.allowSessions) {
		loadedStoreFromLocalStorage = loadStoreFromLocalStorage(config.bot.id);

		if (loadedStoreFromLocalStorage !== undefined && loadedStoreFromLocalStorage.storedOn !== undefined
			&& config.session.expire !== undefined
			&& Date.now() - loadedStoreFromLocalStorage.storedOn > config.session.expire) {
			loadedStoreFromLocalStorage = undefined;
		}

		if (loadedStoreFromLocalStorage !== undefined) {
			loadedStoreFromLocalStorage.socket.state = SocketState.Disconnected;
		}
	}

	return createReduxStore<IStoreSchema>(
		rootReducer,
		loadedStoreFromLocalStorage,
		composeEnhancers(applyMiddleware(thunk))
	);
};
