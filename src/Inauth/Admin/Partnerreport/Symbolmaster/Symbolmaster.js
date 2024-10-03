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
const col = ['Exchange', 'Symbol Name', 'Actual Symbol Name', 'Instrument Type', 'Exchange Code', 'Trade Type', 'Expiry Date']
const rows = [
    { exchange: 'PE', symbolname: 'BNPW', actualsymbol: 'BANKNIFTY', instrument: 'OPTIDX', exvchangecode: 'nse_fo', tradetype: 'bankniftyoption', expiry: dates },
];

const Symbolmaster = () => {
    return (
        <>
            <Box className='tabelBox'>
                <Table col={col} rows={rows} />
            </Box>
        </>
    )
}

export default Symbolmaster