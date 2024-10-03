import React from 'react';

import HomeComponent from '../../Components/HomeComponent';
import Signalalert from './Signalealert';
import Dash from './dash';
import './Home.scss';
import DashboardComponent from '../../Components/DashboardComponent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Home(props) {

	const col = [
		'One',
		'Two',
		'Three',
		'Four',
		'Five',
		'Six',
		'Seven',
		'Eight',
		'Nine',
		'Ten',
	];
	const rows = [
		{
			one: 'One',
			two: 'Two',
			three: 'Three',
			four: 'Four',
			five: 'Five',
			six: 'Six',
			seven: 'Seven',
			eight: 'Eight',
			nine: 'Nine',
			ten: 'Ten',
		},
	];

	// First
	const title = 'title';
	const drpValue = ['MIS', 'NRML'];

	return (
		<>
			{/* <HomeComponent col={col} rows={rows} title={title} drpValue={drpValue} />
			<Signalalert /> */}

		<Dash />
		</>
	);
}
