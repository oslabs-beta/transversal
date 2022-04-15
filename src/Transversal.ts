export {};

const TransversalCache = require('./cache/TransversalCache');

class Transversal extends require('./utilities/GQLStringGenerator') {
  public cache: any;

  constructor(MongoModels: any[], redisClient: any) {
    super(MongoModels);
    this.cache = new TransversalCache(redisClient);
  }
}

module.exports = Transversal;
