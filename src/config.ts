import io from 'socket.io-client';

export const config = {
	localServer: 'ws://localhost:3000/',
	localServerIp: 'ws://192.168.1.136:3000',
	stagingServer: 'ws://pokerkit-backend.herokuapp.com'
}

export const PLAYER_ID_KEY = 'pockerkit-player-id';

export const socket = io(config.localServer);