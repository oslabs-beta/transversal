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
	cache;

	constructor(MongoModels) {
		this.cache = new TransversalCache();
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

		this.transversalQuery = async (gql, variables, cacheOption = false) => {
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
		});
	}

	generateCustomFieldSchema(customGQL, customName) {
		const fields = {};

		Object.keys(customGQL).forEach((customField) => {
			if (typeof customGQL[customField] !== 'object') {
				fields[customField] = {
					type: this.#type[customGQL[customField]],
				};
			} else {
				fields[customField] = {};
				//loop through field anf assign types to subfield
				Object.keys(customGQL[customField]).forEach((subfield) => {
					fields[customField][subfield] = {
						type: this.#type[customGQL[customField][subfield]],
					};
				});
			}
		});

		this.#FieldSchema[customName] = new GraphQLObjectType({
			name: customName,
			fields: () => fields,
		});
		console.log(Object.keys(this.#FieldSchema.User._fields))
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
			// mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
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
	}

	createGQLString(name, type, fieldSchema, args) {
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

		const fieldString = Object.keys(fieldSchema._fields).reduce(
			(str, field, idx) => {
				str += `${field} \n`;
				return str;
			},
			''
		);

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
