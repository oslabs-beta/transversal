export {};

const { GraphQLObjectType, GraphQLList, GraphQLSchema } = require('graphql');

class QueryGenerator extends require('./SchemaGenerator') {
  constructor(MongoModels: any[]) {
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
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType(this.ResolverSchema.query),
    });
    this.RootSchema = { ...this.RootSchema, ...schema };

    // Generate gql query string
    const gql = this.createGQLString(queryName, 'query', this.FieldSchema[fieldSchemaName], args);

    this.gql[queryName] = gql;
  }
}

module.exports = QueryGenerator;
