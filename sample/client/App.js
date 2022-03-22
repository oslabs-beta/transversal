import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransversalSocket from '../TransversalSocket';
import Child from './Child';
import Navbar from './components/nav/Navbar';
import './app.css';

const App = () => {
	const [trans, setTrans] = useState({ data: null });

	const transSocket = new TransversalSocket('http://localhost:3000');

	useEffect(() => {
		transSocket.getTransversalInstance().then((data) => setTrans(data));
	}, []);

	console.log('trans', trans);

	return (
		<Router>
			<div>
				<Navbar />
				<Routes>
					<Route exact path='/' element={<Child trans={trans} />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
