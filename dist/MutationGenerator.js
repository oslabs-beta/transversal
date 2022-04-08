"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
class MutationGenerator extends require('./QueryGenerator') {
    constructor(MongoModels) {
        super(MongoModels);
    }
    generateMutation(mutationName, fieldSchemaName, resolver, args) {
        //Generate Resolver
        this.ResolverSchema.mutation.fields[mutationName] = {
            type: this.FieldSchema[fieldSchemaName],
            args: args ? args : null,
            resolve: resolver,
        };
        // Generate RootSchema
        this.RootSchema = new GraphQLSchema({
            query: new GraphQLObjectType(this.ResolverSchema.query),
            // mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
        });
        // Generate GQL Query String
        const gql = this.createGQLString(mutationName, 'mutation', this.FieldSchema[fieldSchemaName], args);
        this.gql[mutationName] = gql;
        console.log('Registered gql mutation', this.gql);
    }
}
module.exports = MutationGenerator;
