import React, { useEffect } from 'react';

const GraphQL = () => {
	useEffect(() => {
		window.location.href = 'http://localhost:8080/graphql';
	}, []);

	return <div>GraphQL</div>;
};

export default GraphQL;
