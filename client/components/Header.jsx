import React from 'react';
import '../styles/components/header.component.css';

const Header = () => {



	return (
		<div>
			<nav className='header'>
				<div className='button-display'>
					<button id='play-button'>Play</button>
					<button id='history-button'>History</button>
				</div>
				<div className='logo'>
					<h1> Transversal</h1>
				</div>
				<div className='drawer'>
					<button id='document'>Document</button>
				</div>
			</nav>
		</div>
	);
};

export default Header;
