import '@fontsource/poppins';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Mainlayout from './Inauth/Mainlayout/Mainlayout';
import Signform from './Outauth/Signform/Signform';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState();
	const [isLoading, setIsLoading] = useState(true);
	let token = localStorage.getItem('token');

	useEffect(() => {
		if (token && token !== null && token !== 'undefined') {
			setIsLoggedIn(true);
			setIsLoading(false);
		} else {
			setIsLoggedIn(false);
			setIsLoading(false);
		}
	}, [token]);

	if (isLoading) {
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress disableShrink />
			</div>
		);
	}

	return (
		<>
			<ToastContainer position='bottom-center' />
			<Routes>
				{isLoggedIn ? (
					<Route path='/*' element={<Mainlayout />}></Route>
				) : (
					<Route path='/' element={<Signform />}></Route>
				)}
			</Routes>
		</>
	);
}

export default App;
