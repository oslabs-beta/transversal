export {};

const TransversalCache = require('./cache/TransversalCache');
const jsonStringify = require('./utilities/jsonStringify');

class Transversal extends require('./utilities/GQLStringGenerator') {
  public cache: any;

  constructor(MongoModels: any[], redisClient: any) {
    super(MongoModels);
    this.cache = new TransversalCache(redisClient);
  }
  jsonStringify(transversal) {
    return JSON.stringify({ gql: transversal.gql, transversalQuery: transversal.transversalQuery }, jsonStringify);
  }
}

module.exports = Transversal;
