import { ToolbarAction } from './toolbar.actions';
import { IToolbarState } from './toolbar.schema';
import * as constants from './toolbar.constants';
import { persistentMenuMock } from '../../mocks/persistent-menu';

export const toolbarDefaultState: IToolbarState = {
	persistantMenu: { show: false, data: { persistent_menu: [{ locale: '', composer_input_disabled: false, call_to_actions: [] }] } },
	textbox: { show: true }
};

export const toolbarReducer = (state: IToolbarState = toolbarDefaultState, action: ToolbarAction) => {

	switch (action.type) {
		case constants.TOGGLE_PERSISTENT_MENU:
			return {
				...state,
				persistantMenu: { ...state.persistantMenu, show: !state.persistantMenu.show }
			};
		case constants.FETCH_PERSISTENT_MENU:
			return {
				...state,
				persistantMenu: { ...state.persistantMenu, data: persistentMenuMock }
			};
		default: return state;
	}
};