import React from 'react';
import './drawer.css';
import TransV from '../tester/TransV';

const Drawer = ({ drawerOpen, trans }) => {
	//{drawerOpen ? 'side-drawer.open' : 'side-drawer'}
	return (
		<div className={drawerOpen ? 'side-drawer open' : 'side-drawer'}>
			<div className='side-drawer-contents'>
				<TransV trans={trans} />
			</div>
		</div>
	);
};

export default Drawer;
