import React from 'react'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Strategybuilder from './Strategybuilder/Strategybuilder';
import IndexFuture from './Strategyalert/Strategyalert';
import DashboardData from './DashboardData/DashboardData';

const Strategy = () => {
    // admin tab
    const [value, setValue] = React.useState('admintab1');
    const handleChange = (e, newValue = 'string') => {
        setValue(newValue);
    };
    return (
        <Box className='tabs'>
            <TabContext value={value}>
                <TabList className='main-tab' onChange={handleChange}>
                    <Tab label="Strategy Builder" value={"admintab1"} />
                    {/* <Tab label="Index Future" value={"admintab2"} /> */}
                    {/* <Tab label="Upload Data" value={"admintab3"} /> */}
                </TabList>

                <Box className='tabBox' border={'none !important'}>
                    <TabPanel value={"admintab1"} sx={{ padding: 0 }}><Strategybuilder /></TabPanel>
                    {/* <TabPanel value={"admintab2"} sx={{ padding: 0 }}><IndexFuture /></TabPanel> */}
                    {/* <TabPanel value={"admintab3"} sx={{ padding: 0 }}><DashboardData /></TabPanel> */}
                </Box>
            </TabContext>
        </Box>
    )
}

export default Strategy