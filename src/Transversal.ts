export {};

const TransversalCache = require('./cache/TransversalCache');
const InstantiateSocket = require('./utilities/InstantiateSocket');

class Transversal extends require('./utilities/GQLStringGenerator') {
  public cache: any;

  constructor(MongoModels: any[], redisClient: any, origin: string) {
    super(MongoModels);
    this.cache = new TransversalCache(redisClient, origin);
  }

  jsonStringify(transversal) {
    const data = { gql: transversal.gql };
    return JSON.stringify(data);
  }

  instantiateSocket(server, origin) {
    const socket = new InstantiateSocket(server, origin);
    return socket;
  }
}

module.exports = Transversal;
