"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLObjectType, GraphQLList, GraphQLSchema } = require('graphql');
class QueryGenerator extends require('./TransversalQuery') {
    constructor(MongoModels) {
        super(MongoModels);
    }
    generateQuery(queryName, fieldSchemaName, resolver, args) {
        // Generate Resolver
        this.ResolverSchema.query.fields[queryName] = {
            type: new GraphQLList(this.FieldSchema[fieldSchemaName]),
            args: args ? args : null,
            resolve: resolver,
        };
        // Generate RootSchema
        this.RootSchema = new GraphQLSchema({
            query: new GraphQLObjectType(this.ResolverSchema.query),
            // mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
        });
        // Generate gql query string
        const gql = this.createGQLString(queryName, 'query', this.FieldSchema[fieldSchemaName], args);
        this.gql[queryName] = gql;
        console.log('Registered gql query', this.gql);
    }
}
module.exports = QueryGenerator;
