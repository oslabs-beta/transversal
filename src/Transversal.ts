export {};

const TransversalCache = require('./cache/TransversalCache');
const jsonStringify = require('./utilities/jsonStringify');
const InstantiateSocket = require('./utilities/InstantiateSocket');

class Transversal extends require('./utilities/GQLStringGenerator') {
  public cache: any;

  constructor(MongoModels: any[], redisClient: any) {
    super(MongoModels);
    this.cache = new TransversalCache(redisClient);
  }
  jsonStringify(transversal) {
    return JSON.stringify({ gql: transversal.gql, transversalQuery: transversal.transversalQuery }, jsonStringify);
  }

  instantiateSocket(server, origin) {
    const socket = new InstantiateSocket(server, origin);
    return socket;
  }
}

module.exports = Transversal;
