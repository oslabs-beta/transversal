export {};

class GQLStringGenerator extends require('../generators/MutationGenerator') {
	constructor(MongoModels: any[]) {
		super(MongoModels);
	}

	createGQLString(name, type, fieldSchema, args) {
		// Convert arguments into gql argument strings
		const argStrings = !args
			? null
			: Object.keys(args).reduce(
					(res, arg, idx) => {
						res[0] += `$${arg}: ${args[arg].type}`;
						res[1] += `${arg}: $${arg}`;

						if (Object.keys(args).length - 1 !== idx) {
							res[0] += ', ';
							res[1] += ', ';
						}
						return res;
					},
					['', '']
			  );

		// Helper function to convert fields to gql field strings
		const getFieldString = (fields) => {
			return Object.keys(fields).reduce((str, field) => {
				if (Object.values(this.type).includes(fields[field].type)) {
					str += `${field} \n`;
				} else if (field in this.FieldSchema) {
					str += `${field} {${getFieldString(
						this.FieldSchema[field]._fields
					)}}`;
				} else {
					throw new Error(`Failed to identify the schema for field, ${field}`);
				}
				return str;
			}, '');
		};

		const fieldString = getFieldString(fieldSchema._fields);
		if (type === 'query') {
			const gqlQuery = argStrings
				? `
      query ${name}(${argStrings[0]}) {
        ${name}(${argStrings[1]}) {
					${fieldString}
				}
      }
      `
				: `
      query ${name} {
        ${name} {
					${fieldString}
				}
      }
      `;

			return gqlQuery;
		} else {
			const gqlMutation = argStrings
				? `
		mutation ${name}(${argStrings[1]}) {
				${fieldString}
			}
		}
		`
				: `
		mutation ${name} {
			${name} {
				${fieldString}
			}
		}
		`;

			return gqlMutation;
		}
	}
}

module.exports = GQLStringGenerator;
