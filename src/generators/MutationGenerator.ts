export {};

const { GraphQLObjectType, GraphQLSchema } = require('graphql');

class MutationGenerator extends require('./QueryGenerator') {
  constructor(MongoModels: any[]) {
    super(MongoModels);
  }

  generateMutation(mutationName, fieldSchemaName, resolver, args) {
    // Generate Resolver
    this.ResolverSchema.mutation.fields[mutationName] = {
      type: this.FieldSchema[fieldSchemaName],
      args: args ? args : null,
      resolve: resolver,
    };

    // Generate RootSchema
    const schema = new GraphQLSchema({
      mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
    });
    this.RootSchema = { ...this.RootSchema, ...schema };

    // Generate GQL Query String
    const gql = this.createGQLString(mutationName, 'mutation', this.FieldSchema[fieldSchemaName], args);

    this.gql[mutationName] = gql;
  }
}

module.exports = MutationGenerator;
