import React, { useState, useEffect } from 'react';

const Child = ({ trans }) => {
	// const [defaultUsers, setDefaultUsers] = useState();
	// const [customUsers, setCustomUsers] = useState();
	const [times, setTimes] = useState([]);

	// useEffect(() => {
	// 	const query = async () => {
	// 		const startTime = (new Date()).getTime();
    // 		let endTime = null
	// 		let time = null;

	// 		const users = await trans.transversalQuery(
	// 			trans.gql.getUsers,
	// 			{
	// 				age: 10,
	// 				height: 10,
	// 			},
	// 			false
	// 		);
	// 		setDefaultUsers(users);
	// 		endTime = (new Date()).getTime();
	// 		time = endTime - startTime
	// 		setTime(time)
			

	// 		const customUsers = await trans.transversalQuery(
	// 			trans.gql.getCustom,
	// 			{
	// 				age: 10,
	// 				height: 10,
	// 			},
	// 			false,
	// 			`firstName 
	// 		lastName 
	// 		age 
	// 		height`
	// 		);
	// 		setCustomUsers(customUsers);
	// 		endTime = (new Date()).getTime();
	// 		time = endTime - startTime
	// 		setTime(time)
	// 	};
	// 	query();
	// }, [trans]);

	const transObj = [trans.gql.getUsers,
				{
					age: 10,
					height: 10,
				},
				false]

	const pingPong = async (transObject) => {
			const startTime = (new Date()).getTime();
    		let endTime = null
			let time = [];

			const answer = await trans.transversalQuery(...transObject);
			// setDefaultUsers(answer);
			endTime = (new Date()).getTime();
			time.push(endTime - startTime)
			setTimes(time)
		

			// const customUsers = await trans.transversalQuery(
			// 	trans.gql.getCustom,
			// 	{
			// 		age: 10,
			// 		height: 10,
			// 	},
			// 	false,
			// 	`firstName 
			// lastName 
			// age 
			// height`
			// );
			// setCustomUsers(customUsers);
			// endTime = (new Date()).getTime();
			// time.push(endTime - startTime)
			// setTimes(time)
		};

	// console.log('Default User Response: ', defaultUsers);
	// console.log('Custom User Response: ', customUsers);
	// console.log('Took ' + (times) + 'ms')

	return <h1>Hello World!</h1>;
};

export default Child;
