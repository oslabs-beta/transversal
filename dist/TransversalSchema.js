"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { IResolverSchema, IRootSchema } = require('./Interfaces');
class TransversalSchema {
    constructor() {
        this.FieldSchema = {};
        this.ResolverSchema = {
            query: {
                name: 'RootQuery',
                fields: {},
            },
            mutation: {
                name: 'RootMutation',
                fields: {},
            },
        };
        this.RootSchema = new GraphQLSchema({
            query: new GraphQLObjectType(this.ResolverSchema.query),
            // mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
        });
    }
}
module.exports = TransversalSchema;
