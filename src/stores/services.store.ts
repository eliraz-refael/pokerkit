import io from 'socket.io-client';
import config from '../config';

export default class ServicesStore {
	public socket = io(config.localServer);
}