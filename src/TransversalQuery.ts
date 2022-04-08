export {};

class TransversalQuery extends require('./SchemaGenerator') {
	public gql: any;
	public transversalQuery: any;

	constructor(MongoModels: any[]) {
		super(MongoModels);
		this.gql = {};
		this.transversalQuery = async (
			gql,
			variables,
			cacheOption = false,
			custom
		) => {
			if (custom) {
				const pattern = /^.+{$/gm;

				const queryString = pattern.exec(gql);
				const queryString2 = pattern.exec(gql);

				gql =
					queryString +
					'\n' +
					queryString2 +
					'\n' +
					custom +
					'\n' +
					'}' +
					'\n' +
					'}';
			}

			const request = async (endpoint, gql, variables) => {
				const res = await fetch(endpoint, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						query: gql,
						variables: variables,
					}),
				})
					.then((res) => res.json())
					.then((data) => data);
				return res;
			};

			if (!cacheOption) {
				console.log('caching option not selected');
				const res = await request('/graphql', gql, variables);
				return res;
			} else {
				console.log('caching option selected!');

				const res = await fetch('/transversal', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify({
						query: gql,
						variables: variables,
					}),
				})
					.then((res) => res.json())
					.then((data) => data);
				return res;
			}
		};
	}
}

module.exports = TransversalQuery;
