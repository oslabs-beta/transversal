const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
} = require('graphql');
const TransversalCache = require('./TransversalCache');

class Transversal {
	#type;
	#MongoModels;
	#FieldSchema;
	#ResolverSchema;

	constructor(MongoModels, redisClient) {
		this.cache = new TransversalCache(redisClient);
		this.#MongoModels = MongoModels;
		this.#FieldSchema = {};
		this.#ResolverSchema = {
			query: {
				name: 'RootQuery',
				fields: {},
			},
			mutation: {
				name: 'RootMutation',
				fields: {},
			},
			subscription: {
				name: 'RootSubscription',
				fields: {},
			},
		};
		this.RootSchema = new GraphQLSchema({
			query: new GraphQLObjectType(this.#ResolverSchema.query),
			// mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
			// subscription: new GraphQLObjectType(this.ResolverSchema.subscription),
		});

		this.gql = {};

		this.transversalQuery = async (
			gql,
			variables,
			cacheOption = false,
			custom
		) => {
			if (custom) {
				const pattern = /^.+{$/gm;

				const queryString = pattern.exec(gql);
				const queryString2 = pattern.exec(gql);

				gql =
					queryString +
					'\n' +
					queryString2 +
					'\n' +
					custom +
					'\n' +
					'}' +
					'\n' +
					'}';
			}

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

			if (!cacheOption) {
				console.log('caching option not selected');
				const res = await request('/graphql', gql, variables);
				return res;
			} else {
				console.log('caching option selected!');

				const res = await fetch('/transversal', {
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
			}
		};

		// To map Mongo data type to GraphQL data type
		this.#type = {
			String: GraphQLString,
			Number: GraphQLInt,
			ObjectID: GraphQLID,
		};
	}

	/**
	 * Generate GraphQL field schema and save to this.FieldSchema
	 */
	generateFieldSchema() {
		this.#MongoModels.forEach((model) => {
			const fields = {};

			Object.keys(model.schema.paths).forEach((field) => {
				if (field !== '__v') {
					fields[field] = {
						type: this.#type[model.schema.paths[field].instance],
					};
				}
			});

			this.#FieldSchema[model.modelName] = new GraphQLObjectType({
				name: model.modelName,
				fields: () => fields,
			});

			console.log(
				'Default Field Added =>',
				this.#FieldSchema[model.modelName]._fields()
			);
		});
	}

	/**
	 *
	 * @param {object} customSchema Custom schema object
	 * @param {string} customSchemaName Name of custom schema
	 */
	generateCustomFieldSchema(customSchema, customSchemaName) {
		// Helper function to traverse schema and convert data type to GraphQL types
		const traverse = (schema) => {
			const fields = {};

			Object.keys(schema).forEach((field) => {
				// If primitive, conver to GraphQL type immediately
				if (typeof schema[field] !== 'object') {
					fields[field] = {
						type: this.#type[schema[field]],
					};
				} else if (Array.isArray(schema[field])) {
					// If array, check if array include ONE valid type object
					if (schema[field].length === 0 || schema[field].length > 1) {
						throw new Error(
							`Only one schema must be passed into array for ${field}`
						);
					} else if (typeof schema[field][0] !== 'object') {
						throw new Error(
							`Invalid schema type passed into array for ${field}`
						);
					} else {
						// When valid type object, make recursive call to convert nested data types
						const result = traverse(schema[field][0]);
						const type = new GraphQLObjectType({
							name: field,
							fields: () => result,
						});
						// Assign converted GraphQL type object to List type
						fields[field] = { type: new GraphQLList(type) };
						// Register schema in this.#FieldSchema
						this.#FieldSchema[field] = type;
					}
				} else {
					// If object, make recurvie call to conver nested data types
					const result = travers	e(schema[field]);
					const type = new GraphQLObjectType({
						name: field,
						fields: () => result,
					});
					// Assign converted GraphQL type object
					fields[field] = { type: type };
					// Register schema in this.#FieldSchema
					this.#FieldSchema[field] = type;
				}
			});
			return fields;
		};
		const customFields = traverse(customSchema);

		// Assign final GraphQL type object to FieldSchema
		this.#FieldSchema[customSchemaName] = new GraphQLObjectType({
			name: customSchemaName,
			fields: () => customFields,
		});
		console.log(
			'Custom Field Added =>',
			this.#FieldSchema[customSchemaName]._fields()
		);
	}

	/**
	 * Generate GraphQL query and save to this.RootSchema
	 */
	generateQuery(queryName, fieldSchemaName, resolver, args) {
		// Generate Resolver
		this.#ResolverSchema.query.fields[queryName] = {
			type: new GraphQLList(this.#FieldSchema[fieldSchemaName]),
			args: args ? args : null,
			resolve: resolver,
		};

		// Generate RootSchema
		this.RootSchema = new GraphQLSchema({
			query: new GraphQLObjectType(this.#ResolverSchema.query),
			mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
			// subscription: new GraphQLObjectType(this.ResolverSchema.subscription),
		});
		// Generate gql query string
		const gql = this.createGQLString(
			queryName,
			'query',
			this.#FieldSchema[fieldSchemaName],
			args
		);

		this.gql[queryName] = gql;

		console.log('Registered gql query', this.gql);
	}
	

	generateMutation(mutationName, fieldSchemaName, resolver, args ) {
		this.#ResolverSchema.mutation = new GraphQLObjectType({
		});
	};




	createGQLString(name, type, fieldSchema, args) {
		// Conver arguments into gql argument strings
		const argStrings = !args
			? null
			: Object.keys(args).reduce(
					(res, arg, idx) => {
						res[0] += `$${arg}: ${args[arg].type}`;
						res[1] += `${arg}: $${arg}`;

						if (Object.keys(args).length - 1 !== idx) {
							res[0] += ', ';
							res[1] += ', ';
						}
						return res;
					},
					['', '']
			  );

		// Helper function to convert fields to gql field strings
		const getFieldString = (fields) => {
			return Object.keys(fields).reduce((str, field) => {
				if (Object.values(this.#type).includes(fields[field].type)) {
					str += `${field} \n`;
				} else if (field in this.#FieldSchema) {
					str += `${field} {${getFieldString(
						this.#FieldSchema[field]._fields
					)}}`;
				} else {
					throw new Error(`Failed to identify the schema for field, ${field}`);
				}
				return str;
			}, '');
		};

		const fieldString = getFieldString(fieldSchema._fields);

		const gqlQuery = args
			? `
      query ${name}(${argStrings[0]}) {
        ${name}(${argStrings[1]}) {
					${fieldString}
				}
      }
      `
			: `
      query ${name} {
        ${name} {
					${fieldString}
				}
      }
      `;

		return gqlQuery;
	}

	findGqlKey(gql) {
		return Object.keys(this.gql).find((key) => this.gql[key] === gql);
	}
}

module.exports = Transversal;
