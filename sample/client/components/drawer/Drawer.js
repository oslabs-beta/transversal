import React from 'react';
import './drawer.css';

const Drawer = ({ drawerOpen }) => {
	//{drawerOpen ? 'side-drawer.open' : 'side-drawer'}
	return (
		<div className={drawerOpen ? 'side-drawer.open' : 'side-drawer'}>
			Opened
		</div>
	);
};

export default Drawer;
