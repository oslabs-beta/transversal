export {};

class Transversal extends require('./utilities/GQLStringGenerator') {
	constructor(MongoModels: any[]) {
		super(MongoModels);
	}
}

module.exports = Transversal;
