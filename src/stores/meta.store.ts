import { observable, action } from 'mobx';
import ServicesStore from './services.store';

export default class MetaStore {

	@observable
	public onlineCount: number = 0;
	public services: ServicesStore;

	public constructor(services: ServicesStore) {
		this.services = services;
		this.startListening();
	}

	public startListening(): void {
		this.services.socket.on('onlineCount', (onlineCount: number) => {
			this.setOnlineCount(onlineCount);
		});
	}

	@action
	public setOnlineCount(count: number): void {
		this.onlineCount = count;
	}

}