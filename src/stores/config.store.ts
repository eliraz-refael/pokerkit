import { observable } from 'mobx';

interface IServer {
	localServer: string;
	localServerIp: string;
	stagingServer: string;
}

class ConfigStore {

	public server: IServer = {
		localServer: 'http://localhost:3000',
		localServerIp: 'http://192.168.1.136:3000',
		stagingServer: 'https://pokerkit-backend.herokuapp.com'
	};
}