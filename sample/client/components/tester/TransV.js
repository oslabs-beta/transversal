import React, { useState, useEffect } from 'react';
import Query from './components/Query';
import './transV.css';

const TransV = ({ trans }) => {
	const [times, setTimes] = useState([]);
	const [isQuery, setIsQuery] = useState(true);

	const toggleQuery = () => {
		setIsQuery(!isQuery);
	};

	const pingPong = async (e, transObject) => {
		e.preventDefault();

		const { name, args, cache, custom, poll } = transObject;
		const queryName = name;
		const properties = args.split(', ');
		const argsObject = {};

		if (poll === 1) {
			properties.forEach((prop) => {
				const arr = prop.split(': ');
				return Number(arr[1])
					? (argsObject[arr[0]] = Number(arr[1]))
					: (argsObject[arr[0]] = arr[1]);
			});

			const startTime = new Date().getTime();
			let endTime = null;

			const answer = await trans.transversalQuery(
				trans.gql[name],
				argsObject,
				cache,
				custom
			);

			endTime = new Date().getTime();
			setTimes({
				queryName: queryName,
				reponseTime: endTime - startTime,
				answer: answer,
			});
		} else {
			const time = [];
			let payload = null;
			for (let i = 0; i < poll; i++) {
				properties.forEach((prop) => {
					const arr = prop.split(': ');
					return Number(arr[1])
						? (argsObject[arr[0]] = Number(arr[1]))
						: (argsObject[arr[0]] = arr[1]);
				});

				const startTime = new Date().getTime();
				let endTime = null;

				payload = await trans.transversalQuery(
					trans.gql[name],
					argsObject,
					cache,
					custom
				);

				endTime = new Date().getTime();
				time.push(endTime - startTime);
			}
			setTimes({ query: queryName, responseTimes: time, payload: payload });
		}
	};
	console.log(times);
	return (
		<div className='trans'>
			<div className='trans-header'>
				<h1>TransV</h1>
				<button onClick={toggleQuery}>{isQuery ? 'Mutation' : 'Query'}</button>
			</div>

			<Query pingPong={pingPong} isQuery={isQuery} trans={trans} />
		</div>
	);
};

export default TransV;
