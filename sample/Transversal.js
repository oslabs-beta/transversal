const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
} = require('graphql');


class Transversal {
  #type;
  #MongoModels;

  constructor(MongoModels) {
    this.#MongoModels = MongoModels;
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
      subscription: {
        name: 'RootSubscription',
        fields: {},
      },
    };
    this.RootSchema = new GraphQLSchema({
      query: new GraphQLObjectType(this.ResolverSchema.query),
      // mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
      // subscription: new GraphQLObjectType(this.ResolverSchema.subscription),
    });
    // Private property to map Mongo data type to GraphQL data type
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

      this.FieldSchema[model.modelName] = new GraphQLObjectType({
        name: model.modelName,
        fields: () => fields,
      });
    });
  }

  /**
   * Generate GraphQL query and save to this.RootSchema
   */
  generateQuery(queryName, fieldSchemaName, resolver, isCache) {
    this.ResolverSchema.query.fields[queryName] = {
      type: new GraphQLList(this.FieldSchema[fieldSchemaName]),
      resolve: resolver,
    };

    this.RootSchema = new GraphQLSchema({
      query: new GraphQLObjectType(this.ResolverSchema.query),
      // mutation: new GraphQLObjectType(this.ResolverSchema.mutation),
      // subscription: new GraphQLObjectType(this.ResolverSchema.subscription),
    });
  }
}

module.exports = Transversal;
