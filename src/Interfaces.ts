interface IGQLSchemaProperty {
	name: string;
	fields: any;
}
interface IResolverSchema {
	query: IGQLSchemaProperty;
	mutation: IGQLSchemaProperty;
}

interface IRootSchema {
	query: any;
	mutation: any;
}

module.exports;
