export enum SocketState {
	Disconnected = 'disconnected',
	Connecting = 'connecting',
	Reconnecting = 'reconnecting',
	WaitingForReconnect = 'waiting_for_reconnect',
	Connected = 'connected',
	Failed = 'failed'
}

export interface ISocketState {
	state: SocketState;
	nextReconnect: number;
	alreadyBeenConnected: boolean;
}