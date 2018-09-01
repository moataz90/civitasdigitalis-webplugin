import * as constants from './toolbar.constants';

import { persistentMenuMock } from '../../mocks/persistent-menu';

// Add persistentMenu message
export interface IPersistentMenu {
	type: constants.FETCH_PERSISTENT_MENU;
	payload: object;
}

export const getPersistentMenu = (persistentMenu = persistentMenuMock): IPersistentMenu => ({
	type: constants.FETCH_PERSISTENT_MENU,
	payload: persistentMenu,
});

// Add persistentMenu message
export interface ITogglePersistentMenu {
	type: constants.TOGGLE_PERSISTENT_MENU;
}

export const togglePersistentMenu = (): ITogglePersistentMenu => ({
	type: constants.TOGGLE_PERSISTENT_MENU
});

// Export all possible actions as a combined type
export type ToolbarAction = IPersistentMenu | ITogglePersistentMenu;