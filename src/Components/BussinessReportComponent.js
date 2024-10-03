import React from 'react';
import { Box, Grid, Button, Tooltip, Typography } from '@mui/material';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Table from '../Inauth/Table/Table'
import Dropdown from '../Inauth/Dropdown/Dropdown';

const BussinessReportComponent = (props) => {
    const { title, col, rows, drpValue, title2, drpValue2 } = props

    const download = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Download</Typography >
    const fetchreport = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Fetch Report</Typography >
    return (
        <>
            <Box className='tabelBox'>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={12}>
                        <Box className='selectiondiv-box'>
                            <Box className='selectionDiv bn'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className='datePicker' />
                                </LocalizationProvider>
                            </Box>
                            <Box className='selectionDiv bn'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className='datePicker' />
                                </LocalizationProvider>
                            </Box>

                            <Dropdown title={title} val={drpValue} />
                            <Dropdown title={title2} val={drpValue2} />

                            <Box className='selectionDiv bn searchFlex'>

                                <Tooltip title={fetchreport} arrow>
                                    <Button className='fetchReport-btn solidButton' ><CloudSyncIcon /></Button>
                                </Tooltip>

                                <Tooltip title={download} arrow>
                                    <Button className='download-btn solidButton' sx={{ marginLeft: 1 }}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 11.6669V15.2224C17 15.6939 16.8127 16.1461 16.4793 16.4795C16.1459 16.8129 15.6937 17.0002 15.2222 17.0002H2.77778C2.30628 17.0002 1.8541 16.8129 1.5207 16.4795C1.1873 16.1461 1 15.6939 1 15.2224V11.6669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 11.6667V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Table col={col} rows={rows} />
            </Box>
        </>
    )
}

export default BussinessReportComponent