/**
 * Custom class to generate GraphQL Schema, Query, and Mutation object
 */

class Transversal {
	constructor(MongoSchema) {
		this.MongoSchema = [];
		this.GqlSchema = {};
		this.query = {};
		this.mutation = {};
		this.subscription = {};
	}

	generateGqlSchema() {
		this.MongoSchema.forEach((schema) => {
			/**
			 * Generate GraphQL schema and save to this.GqlSchema
			 */
		});
	}

	generateQuery(resolver, isCache) {
		/**
		 * Generate GraphQL query and save to query object
		 */
		if (isCache) {
			this.cacheMiddleware();
		}
	}

	generateMutation(resolver, isCache) {
		/**
		 * Generate GraphQL mutation and save to mutation object
		 */
		if (isCache) {
			this.cacheMiddleware();
		}
	}

	generateSubscription(resolver, isCache) {
		/**
		 * Generate GraphQL subscription and save to subscription object
		 */
		if (isCache) {
			this.cacheMiddleware();
		}
	}

	cacheMiddleware() {
		/**
		 * check cache using Redis for example
		 */
	}
}

const gqlObject = new Transversal([schema1, schema2]);

/**
 * Build websocket connection to frontend
 */
socket.emit(gqlObject);
