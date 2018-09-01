import { IUserState } from './user/user.schema';
import { IMessagesState } from './messages/messages.schema';
import { ISocketState } from './socket/socket.schema';
import { IUIState } from './ui/ui.schema';
import { IToolbarState } from './toolbar/toolbar.schema';
import { Timestamp } from '../types/common-types';

export interface IStoreSchema {
	storedOn?: Timestamp;
	user: IUserState;
	messages: IMessagesState;
	socket: ISocketState;
	ui: IUIState;
	toolbar: IToolbarState;
}