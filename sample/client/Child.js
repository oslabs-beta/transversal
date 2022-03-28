import React, { useState, useEffect } from 'react';
import TransV from './components/tester/TransV';
import Chart from './components/hero/Chart';

const Child = ({ trans }) => {
	// // const [defaultUsers, setDefaultUsers] = useState();
	// // const [customUsers, setCustomUsers] = useState();
	// const [times, setTimes] = useState([]);

	// // useEffect(() => {
	// // 	const query = async () => {
	// // 		const startTime = (new Date()).getTime();
	// // 		let endTime = null
	// // 		let time = null;

	// // 		const users = await trans.transversalQuery(
	// // 			trans.gql.getUsers,
	// // 			{
	// // 				age: 10,
	// // 				height: 10,
	// // 			},
	// // 			false
	// // 		);
	// // 		setDefaultUsers(users);
	// // 		endTime = (new Date()).getTime();
	// // 		time = endTime - startTime
	// // 		setTime(time)

	// // 		const customUsers = await trans.transversalQuery(
	// // 			trans.gql.getCustom,
	// // 			{
	// // 				age: 10,
	// // 				height: 10,
	// // 			},
	// // 			false,
	// // 			`firstName
	// // 		lastName
	// // 		age
	// // 		height`
	// // 		);
	// // 		setCustomUsers(customUsers);
	// // 		endTime = (new Date()).getTime();
	// // 		time = endTime - startTime
	// // 		setTime(time)
	// // 	};
	// // 	query();
	// // }, [trans]);

	// // const transObj = [trans.gql.getUsers,
	// // 			{
	// // 				age: 10,
	// // 				height: 10,
	// // 			},
	// // 			false]

	return (
		<>
			<h1>Hello World!</h1>
			{/* <TransV trans={trans} /> */}
			<Chart />
		</>
	);
};

export default Child;
