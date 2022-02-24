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
	#ReusableFieldSchema;
	#ResolverSchema;
	cache;

	constructor(MongoModels) {
		this.cache = new TransversalCache();
		this.#MongoModels = MongoModels;
		this.#FieldSchema = {};
		this.#ReusableFieldSchema = {};
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
			//saving fields to be used later or elsewhere
			this.#ReusableFieldSchema[model.modelName] = { ...fields };

			this.#FieldSchema[model.modelName] = new GraphQLObjectType({
				name: model.modelName,
				fields: () => fields,
			});
		});
	}

	generateRelationalField(
		fieldSchemaName,
		fieldName,
		relation,
		resolver,
		args
	) {
		//find fieldSchema
		const newType = this.#ReusableFieldSchema[fieldSchemaName];
		newType[fieldName] = {
			type: new GraphQLList(this.#FieldSchema[relation]),
			args: args ? args : null,
			resolve: resolver,
		};

		this.#FieldSchema[fieldSchemaName] = new GraphQLObjectType({
			name: fieldSchemaName,
			fields: () => newType,
		});
	}

	generateCustomFieldSchema(customGQL, customName) {
		const traverse = (gqlObj) => {
			const fields = {};
			//useto hold non graphql types representing arrays and objects for string generation
			const reusableFields = {};
			Object.keys(gqlObj).forEach((customField) => {
				if (typeof gqlObj[customField] !== 'object') {
					fields[customField] = {
						type: this.#type[gqlObj[customField]],
					};
					return fields;
				} else if (Array.isArray(gqlObj[customField])) {
					if (typeof gqlObj[customField][0] !== 'object') {
						fields[customField] = {
							type: new GraphQLList(this.#FieldSchema[gqlObj[customField][0]]),
						};
					} else {
						const result = traverse(gqlObj[customField][0]);
						const obj = new GraphQLObjectType({
							name: customField,
							fields: () => result,
						});
						fields[customField] = { type: new GraphQLList(obj) };
					}
				} else {
					// 	//new graphlQLObjectType
					const result = traverse(gqlObj[customField]);
					const obj = new GraphQLObjectType({
						name: customField,
						fields: () => result,
					});
				}
				return fields;
			});
			return fields;
		};
		const customFields = traverse(customGQL);
		//saving fields to be used later or elsewhere
		this.#ReusableFieldSchema[customName] = { ...customFields };

		this.#FieldSchema[customName] = new GraphQLObjectType({
			name: customName,
			fields: () => customFields,
		});
		// console.log(this.#FieldSchema[customName]._fields());
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
