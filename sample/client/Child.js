import React, { useState, useEffect } from 'react';
import TransV from './components/tester/TransV';

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

	// const pingPong = async (e, transObject) => {
	// 		e.preventDefault()

	// 		const {name, args, cache, custom, poll} = transObject
	// 		const queryName = name
	// 		const properties = args.split(', ')
	// 		const argsObject = {}

	// 		if (poll === 1){
	// 		properties.forEach(prop => {
	// 			const arr = prop.split(': ')
	// 			return Number(arr[1]) ? argsObject[arr[0]] = Number(arr[1]) : argsObject[arr[0]] = arr[1]
	// 		});

	// 		const startTime = (new Date()).getTime();
    // 		let endTime = null

	// 		const answer = await trans.transversalQuery(trans.gql[name], argsObject, cache, custom);
			
	// 		endTime = (new Date()).getTime();
	// 		setTimes({queryName: queryName,  reponseTime: endTime - startTime, answer: answer})
	// 	}
	// 	else{
	// 		const time = [];
	// 		let answer = null
	// 		for(let i=0; i<poll; i++){
	// 			properties.forEach(prop => {
	// 			const arr = prop.split(': ')
	// 			return Number(arr[1]) ? argsObject[arr[0]] = Number(arr[1]) : argsObject[arr[0]] = arr[1]
	// 		});

	// 		const startTime = (new Date()).getTime();
    // 		let endTime = null

	// 		answer = await trans.transversalQuery(trans.gql[name], argsObject, cache, custom);
			
	// 		endTime = (new Date()).getTime();
	// 		time.push(endTime-startTime)
	// 		}
	// 		setTimes({query: queryName, responseTimes: time, answer: answer})
	// 	}
	// 	};
	// 	console.log(times)
	return (
	<>
	<h1>Hello World!</h1>
	<TransV trans={trans}/>
	
	</>
	)
};

export default Child;
