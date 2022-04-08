const {
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
} = require('graphql');

const User = GraphQLString();

console.log(User);
