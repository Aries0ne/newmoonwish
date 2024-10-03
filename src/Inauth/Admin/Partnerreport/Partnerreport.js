import React from 'react'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Bussinesreport from './Bussinesreport/Bussinesreport';
import Userplreport from './Userplrepoert/Userplreport';
import Cronview from './Cronview/Cronview';
import Symbolmaster from './Symbolmaster/Symbolmaster';

const Partnerreport = () => {
    // admin tab
    const [value, setValue] = React.useState('admintab3');
    const handleChange = (e, newValue = 'string') => {
        setValue(newValue);
    }
    return (
        <Box className='tabs'>
            <TabContext value={value}>
                <TabList className='main-tab' onChange={handleChange}>
                    {/* <Tab label="Bussiness report" value={"admintab1"} /> */}
                    {/* <Tab label="Symbol Master" value={"admintab2"} /> */}
                    <Tab label="P&L View" value={"admintab3"} />
                    {/* <Tab label="Crone View" value={"admintab4"} /> */}
                </TabList>

                <Box className='tabBox' border={'none !important'}>
                    {/* <TabPanel value={"admintab1"} sx={{ padding: 0 }}><Bussinesreport /></TabPanel> */}
                    {/* <TabPanel value={"admintab2"} sx={{ padding: 0 }}><Symbolmaster /></TabPanel> */}
                    <TabPanel value={"admintab3"} sx={{ padding: 0 }}><Userplreport /></TabPanel>
                    {/* <TabPanel value={"admintab4"} sx={{ padding: 0 }}><Cronview /></TabPanel> */}
                    {/* <TabPanel value={"admintab5"} sx={{ padding: 0 }}><Vendorbroker /></TabPanel> */}
                    {/* <TabPanel value={"admintab6"} sx={{ padding: 0 }}><Vedorview /></TabPanel> */}
                    {/* <TabPanel value={"admintab7"} sx={{ padding: 0 }}><Paymentreport /></TabPanel> */}
                </Box>
            </TabContext>
        </Box>
    )
}

export default Partnerreport