export {};

const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { IResolverSchema, IRootSchema } = require('../types/Interfaces');

class TransversalSchema {
  protected FieldSchema: any;
  protected ResolverSchema: IResolverSchema;
  public RootSchema: IRootSchema;

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
      mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
    });
  }
}

module.exports = TransversalSchema;
