class StorageService {

	private driver: Storage;

	constructor(driver: Storage) {
		this.driver = driver;
	}

	get length(): number {
		return this.driver.length;
	}

	setItem(key: string, value: any): void {
		this.driver.setItem(key, value);
	}

	getItem(key: string): string | null {
		return this.driver.getItem(key);
	}

	removeItem(key: string): void {
		this.driver.removeItem(key);
	}

	clear(): void {
		this.driver.clear();
	}

	key(index: number): string | null {
		return this.driver.key(index);
	}
}