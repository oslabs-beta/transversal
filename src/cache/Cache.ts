import { Request, Response } from 'express'
import { createClient } from 'redis'

const fetch = require('node-fetch')

class TransversalCache {
	constructor(createClient: {}) {
		/**
		 * Connect Redis Client
		 */
		this.client: createClient = createClient
		this.client.connect()
		this.client.on('error', (err: any) => console.log('Redis Client Error', err))
  
		/**
		 * Caching Function Middleware
		 * @param {Object} req Request
		 * @param {Object} res Response
		 * @returns Response status 200 and cache data on success, and status 200 and original data from request
		 */
		this.cacheMiddleware = async (req: Request, res: Response): Promise<any> => {

			// Fetch Request to return response from /transversal endpoint
			const request = async (endpoint: string, gql: any, variables: any) => {
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
					.then((res: Response) => res.json())
					.then((data: {}) => data)
				return res
			}

			// Throw error is req.body.query is undefined
			if (req.body.query === '' || req.body.query === 'undefined' || req.body.query === null) return res.status(400).json({ Error: 'GraphQL query is empty. Please use an appropriate query string.'})

			// Set Query string key for Redis
			const query: string = `"query": ${JSON.stringify(req.body.query)}, "variables": ${JSON.stringify(req.body.variables)}`

			// Get cached data & checking if key/value exists
			const cache: any = JSON.parse(await this.get(query))

			// Cache Miss
			if (!cache) {
				const data: any = await request(
					'http://localhost:3000/graphql',
					req.body.query,
					req.body.variables
				)
				await this.set(query, JSON.stringify(data))
				return res.status(200).json(data)
			} else {
			// Cache Hit
				return res.status(200).json({ cache: cache })
			}
		}
	}

	// Set key & value in Redis
	async set(name: string, data: string): Promise<void>  {
		try {
			await this.client.set(name, data)
		} catch (err) {
			throw new Error(`Data save failed in redis. Error: ${err}`)
		}
	}

	// Get key & value in Redis
	async get(name: string): Promise<string> {
		try {
			const data = await this.client.get(name)
			return data
		} catch (err) {
			throw new Error(`Failed to retrieve data from redis. Error: ${err}`)
		}
	}
}

module.exports = TransversalCache
