import React from 'react';
import '../styles/transv.page.css';
import Header from '../components/Header';
import Operation from '../components/Operation';
import Response from '../components/Response';

const TransV = () => {
	return (
		<div>
			<div>
				<Header />
			</div>
			<div className='display-container'>
				<div className='operation'>
					<Operation />
				</div>
				<div className='bar'></div>
				<div className='response'>
					<Response />
				</div>
			</div>
		</div>
	);
};

export default TransV;
