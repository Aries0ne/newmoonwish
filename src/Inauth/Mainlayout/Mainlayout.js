import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../Components/ConfirmDialog';
import Header from '../../Inauth/Header/Header';
import Liveprice from '../../Inauth/Liveprice/Liveprice';
import Sidebar from '../../Inauth/Sidebar/Sidebar';
import PublicRoutes from '../../PublicRoutes/PublicRoutes';
import wp from '../../images/wp.png';
import { BrokerStatus } from '../../redux/actions/brokerAction';
import Alertbox from '../Alertbox/Alertbox';
import { useSocket } from '../../hooks/useNewSocket';
export default function Mainlayout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [opensidebar, setopensidebar] = useState(' ');
	const [layer, setlayer] = useState('-100%');
	const LivePriceSocket = useSocket('liveprice');
	const ProfitSocket = useSocket('profit');
	const LivePositionSocket = useSocket('liveposition');

	const liveFeedData = useSelector(
		(State) => State?.CommonReducer?.liveFeedData
	);

	// Sidebar open/close
	const openMenu = () => {
		if (opensidebar === ' ') {
			setopensidebar('open');
			setlayer('0');
		} else {
			setopensidebar(' ');
			setlayer('-100%');
		}
	};

	useEffect(() => {
		dispatch(BrokerStatus({}, navigate));
	}, []);

	return (
		<>
			<Header openMenu={openMenu} layer={layer} />
			<Box sx={{ display: { xs: 'block', md: 'flex' } }}>
				<Box component={'nav'}>
					<Sidebar openbar={opensidebar} />
				</Box>
				<Box
					component={'section'}
					sx={{
						padding: { xs: '1.5rem', md: '2rem 2rem 5rem 2rem' },
						marginBottom: '6rem',
						overflowY: 'auto',
						width: { xs: 'calc(100% - 3rem)', md: 'calc(100% - 11rem)' }
					}}
				>
					<Liveprice liveFeedData={liveFeedData} />
					<Box sx={{ marginTop: '2rem' }}>
						<Routes>
							{PublicRoutes.map(({ path, Component, index }) => {
								return <Route key={index} path={path} element={Component} />;
							})}
						</Routes>
					</Box>
				</Box>
			</Box >
			<Box className='footer'>
				<Typography component={'p'}>
					Copyright ©2021 All rights reserved by @ Mooonwish Technology
				</Typography>
			</Box>
			<Typography
				component={'a'}
				href={'https://wa.me/+91132465781?text=Hello Tade Arth'}
				target={'blank'}
				className='wp_button'
			>
				<img src={wp} />
			</Typography>
			<Alertbox />
			<ConfirmDialog />
		</>
	);
}
