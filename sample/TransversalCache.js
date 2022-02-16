const redis = require('redis');

class TransversalCache {
	constructor() {
		this.client = (() => {
			const client = redis.createClient();
			client.connect();
			return client;
		})();
	}

	async set(name, data) {
		try {
			await this.client.set(name, data);
			console.log('Data saved in redis...');
		} catch (err) {
			console.log('Data save failed in redis...');
		}
	}

	async get(name) {
		try {
			const data = await this.client.get(name);
			console.log('Successfully retrieved data from redis...');
			return data;
		} catch (err) {
			console.log('Failed to retrieve data from redis...');
		}
	}
}

module.exports = TransversalCache;
