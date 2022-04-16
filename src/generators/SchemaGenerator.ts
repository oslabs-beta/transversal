export {};

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');

class SchemaGenerator extends require('../schemas/TransversalSchema') {
  private type: any;
  private MongoModels: any[];

  constructor(MongoModels: any[]) {
    super();
    this.type = {
      String: GraphQLString,
      Number: GraphQLInt,
      Decimal128: GraphQLFloat,
      Boolean: GraphQLBoolean,
      ObjectID: GraphQLID,
    };
    this.MongoModels = MongoModels;
  }

  /**
   * Generate basic GraphQL schema that mirrors MongoDB models
   */
  generateFieldSchema() {
    this.MongoModels.forEach((model) => {
      const fields = {};

      Object.keys(model.schema.paths).forEach((field) => {
        if (field !== '__v') {
          fields[field] = {
            type: this.type[model.schema.paths[field].instance],
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
   * Generate custom GraphQL schema
   */
  generateCustomFieldSchema(customSchema, customSchemaName) {
    // Helper function to traverse schema and convert data type to GraphQL types
    const traverse = (schema) => {
      const fields = {};

      Object.keys(schema).forEach((field) => {
        // If primitive, conver to GraphQL type immediately
        if (typeof schema[field] !== 'object') {
          fields[field] = {
            type: this.type[schema[field]],
          };
        } else if (Array.isArray(schema[field])) {
          // If array, check if array include ONE valid type object
          if (schema[field].length === 0 || schema[field].length > 1) {
            throw new Error(`Only one schema must be passed into array for ${field}`);
          } else if (typeof schema[field][0] !== 'object') {
            throw new Error(`Invalid schema type passed into array for ${field}`);
          } else {
            // When valid type object, make recursive call to convert nested data types
            const result = traverse(schema[field][0]);
            const type = new GraphQLObjectType({
              name: field,
              fields: () => result,
            });
            // Assign converted GraphQL type object to List type
            fields[field] = { type: new GraphQLList(type) };
            // Register schema in this.FieldSchema
            this.FieldSchema[field] = type;
          }
        } else {
          // If object, make recurvie call to conver nested data types
          const result = traverse(schema[field]);
          const type = new GraphQLObjectType({
            name: field,
            fields: () => result,
          });
          // Assign converted GraphQL type object
          fields[field] = { type: type };
          // Register schema in this.FieldSchema
          this.FieldSchema[field] = type;
        }
      });
      return fields;
    };
    const customFields = traverse(customSchema);

    // Assign final GraphQL type object to FieldSchema
    this.FieldSchema[customSchemaName] = new GraphQLObjectType({
      name: customSchemaName,
      fields: () => customFields,
    });
  }
}

module.exports = SchemaGenerator;
