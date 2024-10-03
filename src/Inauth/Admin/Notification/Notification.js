import React, { useEffect } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Pushalert from './Pushalert/Pushalert';
import Smsdata from './Smsdata/Smsdata';
import { useDispatch } from 'react-redux';
import Uploads from './Uploads/uploads';
import { Tutorials } from './Tutorials/tutorials';

const Notification = () => {
	// admin tab
	const [value, setValue] = React.useState('admintab1');
	const dispatch = useDispatch();
	const handleChange = (e, newValue = 'string') => {
		setValue(newValue);
	};

	return (
		<Box className='tabs'>
			<TabContext value={value}>
				<TabList className='main-tab' onChange={handleChange}>
					<Tab label='App Push' value={'admintab1'} />
					{/* <Tab label='Text SMS' value={'admintab2'} /> */}
					<Tab label='Tutorials & Uploads' value={'admintab3'} />
				</TabList>

				<Box className='tabBox' border={'none !important'}>
					<TabPanel value={'admintab1'} sx={{ padding: 0 }}>
						<Pushalert />
					</TabPanel>
					{/* <TabPanel value={'admintab2'} sx={{ padding: 0 }}>
						<Smsdata />
					</TabPanel> */}
					<TabPanel value={'admintab3'}>
						<Tutorials/>
					</TabPanel>
					{/* <TabPanel value={"admintab3"} sx={{ padding: 0 }}><Ctradeexpiry /></TabPanel> */}
					{/* <TabPanel value={"admintab4"} sx={{ padding: 0 }}><Tsymexpiry /></TabPanel> */}
					{/* <TabPanel value={"admintab5"} sx={{ padding: 0 }}><Optsellexpiry /></TabPanel> */}
				</Box>
			</TabContext>
		</Box>
	);
};

export default Notification;
