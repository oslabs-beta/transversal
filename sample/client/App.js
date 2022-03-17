import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransversalSocket from '../TransversalSocket';
import Child from './Child';

const App = () => {
	const [trans, setTrans] = useState({ data: null });

	const transSocket = new TransversalSocket('http://localhost:3000');

	useEffect(() => {
		transSocket.getTransversalInstance().then((data) => setTrans(data));
	}, []);

	console.log('trans', trans);

	return (
		
		<Router>
			<div className='container'>
				<Routes>
					<Route exact path='/' element={<Child trans={trans} />} />
					<Route exact path='/transv' element={<Child trans={trans} />} />
				</Routes>
			</div>
		</Router>
		
	);
};

export default App;
