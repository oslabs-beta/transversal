const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLString,
	GraphQLBoolean,
	GraphQLID,
	GraphQLSchema,
} = require('graphql');

class Transversal {
	private MongoModels: any[];

	constructor(MongoModels: any[]) {
		this.MongoModels = MongoModels;
	}
}
