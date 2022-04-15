export {};

const Cache = require('../cache/Cache');

class Transversal extends require('./utilities/GQLStringGenerator') {
  public cache: any;

  constructor(MongoModels: any[], redisClient: any) {
    super(MongoModels);
    this.cache = new Cache(redisClient);
  }
}

module.exports = Transversal;
