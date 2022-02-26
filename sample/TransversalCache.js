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
			console.log('===========================');
			// Set Query string key for Redis
			const query = `Query: ${JSON.stringify(req.body.query)}, Variables: ${JSON.stringify(req.body.variables)}`;
			// Handle if req.body.query or req.body.variables is undefined

			let cache = await this.get(query);
			cache = JSON.parse(cache);

			// If Cache turned off
			if (!cache) {
				const data = await request(
					'http://localhost:3000/graphql',
					req.body.query,
					req.body.variables
				);
				/**
				 * TODO: Parse gql and grab schema name
				 */
				await this.set(query, JSON.stringify(data));

				return res.status(200).json(data);
			} else {
				// If Cache turned On
				return res.status(200).json({ Query : query, Cached_Result: cache });
			}
		};
	}

	// Set key & vale in Redis
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
