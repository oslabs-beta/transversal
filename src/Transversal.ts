export {};

class Transversal extends require('./GQLStringGenerator') {
	constructor(MongoModels: any[]) {
		super(MongoModels);
	}
}

module.exports = Transversal;
