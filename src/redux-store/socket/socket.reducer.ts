import { SocketAction } from './socket.actions';
import { ISocketState, SocketState } from './socket.schema';
import * as constants from './socket.constants';

const socketDefaultState: ISocketState = {
	state: SocketState.Disconnected,
	nextReconnect: null,
	alreadyBeenConnected: false
};

export const socketReducer = (state: ISocketState = socketDefaultState, action: SocketAction): ISocketState => {
	switch (action.type) {
		case constants.SOCKET_STATE_SET:
			return { ...state, state: action.payload };

		case constants.SOCKET_NEXT_RECONNECT_TIME_SET:
			return { ...state, nextReconnect: action.payload };

		case constants.SOCKET_HAS_ALREADY_BEEN_CONNECTED_SET:
			return { ...state, alreadyBeenConnected: action.payload };

		default:
			return state;
	}
};