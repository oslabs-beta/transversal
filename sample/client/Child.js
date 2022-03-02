import React, { useState, useEffect } from 'react';

const Child = ({ trans }) => {
	const [defaultUsers, setDefaultUsers] = useState();
	const [customUsers, setCustomUsers] = useState();

	useEffect(() => {
		const query = async () => {
			const users = await trans.transversalQuery(
				trans.gql.getUsers,
				{
					age: 10,
					height: 10,
				},
				false
			);
			setDefaultUsers(users);

			const customUsers = await trans.transversalQuery(
				trans.gql.getCustom,
				{
					age: 10,
					height: 10,
				},
				false,
				`firstName 
			lastName 
			age 
			height`
			);
			setCustomUsers(customUsers);
		};
		query();
	}, [trans]);

	console.log('Default User Response: ', defaultUsers);
	console.log('Custom User Response: ', customUsers);

	return <h1>Hello World!</h1>;
};

export default Child;
