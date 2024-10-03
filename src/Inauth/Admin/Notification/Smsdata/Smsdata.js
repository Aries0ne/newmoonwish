import React from 'react'
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Table from '../../../Table/Table';

const dates = <Box sx={{ width: '20rem', margin: 'auto' }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker className='datePicker' />
    </LocalizationProvider>
</Box>

const col = ['Template Name	', 'Template Id', 'Flow Id', 'Sender Code', 'UserName', 'Webinar Link', 'Website Link', 'Day', 'Discount', 'Topic', 'Date', 'Time', 'MeetId', 'Passcode']
const rows = [
    { temname: 'PE', temid: 'BNPW', flowid: 'OPTIDX', sendercode: 'nse_fo', username: 'bankniftyoption', webinarlink: 'dates', weblink: '13213212', day: 5, discount: '50%', topic: '452', date: '17/02/2023', time: '06:50AM', meetid: 'KBFHFJ65432', passcode: '15312' },
];

const Smsdata = () => {
    return (
        <>
            <Box className='tabelBox'>
                <Table col={col} rows={rows} />
            </Box>
        </>
    )
}

export default Smsdata