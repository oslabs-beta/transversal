const redis = require('redis');
const fetch = require('node-fetch');

class TransversalCache {
	constructor(redisClient) {
		/**
		 * Connect Redis Client
		 */
		this.client = redisClient;
		this.client.connect();
		this.client.on('error', (err) => console.log('Redis Client Error', err));

		/**
		 * Middleware
		 * @param {*} req
		 * @param {*} res
		 * @returns
		 */
		this.cacheMiddleware = async (req, res) => {

			// Fetch Request to return response from /transversal endpoint
			const request = async (endpoint, gql, variables) => {
				const res = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						query: gql,
						variables: variables,
					}),
				})
					.then((res) => res.json())
					.then((data) => data);
				return res;
			};

			console.log('###cache request from frontend###');
			console.log('===========================');
			console.log('Req.body.query:', req.body.query);
			console.log('===========================');
			console.log('Req.body.variables:', req.body.variables);
			console.log('___________________________');

			// Throw error is req.body.query is undefined
			if (req.body.query === '' || req.body.query === 'undefined' || req.body.query === null) return res.status(400).json({ Error: 'GraphQL query is empty. Please use an appropriate query string.'});

			// Set Query string key for Redis
			const query = `"query": ${JSON.stringify(req.body.query)}, "variables": ${JSON.stringify(req.body.variables)}`;

			// Get cached data & checking if key/value exists
			const cache = JSON.parse(await this.get(query));

			// If Cache does not exist
			if (!cache) {
				const data = await request(
					'http://localhost:3000/graphql',
					req.body.query,
					req.body.variables
				);
				await this.set(query, JSON.stringify(data));
				return res.status(200).json(data);
			} else {
				// If Cache exists
				// TODO: For production change this return to only 'cache'
				return res.status(200).json({ cache: cache });
			}
		};
	}

	// Set key & value in Redis
	async set(name, data) {
		try {
			await this.client.set(name, data);
			console.log('Data saved in redis...');
		} catch (err) {
			console.log('Data save failed in redis...');
		}
	}

	// Get key & value in Redis
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
