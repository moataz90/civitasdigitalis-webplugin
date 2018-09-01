import * as constants from './socket.constants';
import { SocketState } from './socket.schema';
import { Timestamp } from '../../types/common-types';

// Set socket state
export interface ISocketStateSet {
	type: constants.SOCKET_STATE_SET;
	payload: SocketState;
}

export const socketStateSet = (newState: SocketState): ISocketStateSet => ({
	type: constants.SOCKET_STATE_SET,
	payload: newState
});

// Set time of next reconnect
export interface ISocketNextReconnectTimeSet {
	type: constants.SOCKET_NEXT_RECONNECT_TIME_SET;
	payload: Timestamp;
}

export const socketNextReconnectTimeSet = (nextTime: Timestamp): ISocketNextReconnectTimeSet => ({
	type: constants.SOCKET_NEXT_RECONNECT_TIME_SET,
	payload: nextTime
});

// Set socket has already been connected
export interface ISocketHasAleadyBeenConnectedSet {
	type: constants.SOCKET_HAS_ALREADY_BEEN_CONNECTED_SET;
	payload: boolean;
}

export const socketHasAlreadyBeenConnectedSet = (): ISocketHasAleadyBeenConnectedSet => ({
	type: constants.SOCKET_HAS_ALREADY_BEEN_CONNECTED_SET,
	payload: true
});

// Export socket actions
export type SocketAction = ISocketStateSet | ISocketNextReconnectTimeSet | ISocketHasAleadyBeenConnectedSet;
