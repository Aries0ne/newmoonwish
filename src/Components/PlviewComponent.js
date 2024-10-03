import React from 'react';
import { Box, Grid, Button, Tooltip, Typography } from '@mui/material';
import Tablesearch from '../Inauth/Tablesearch/Tablesearch';
import Table from '../Inauth/Table/Table'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dropdown from '../Inauth/Dropdown/Dropdown';

const PlviewComponent = (props) => {
    const { col, rows, title, drpValue, title2, drpValue2, title4, drpValue4, title5, drpValue5 } = props
    const refresh = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Refresh</Typography >
    const download = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Download</Typography >

    return (
        <>
            <Box className='tabelBox'>
                <Grid container spacing={2} alignItems={'top'}>
                    <Grid item xs={12}>
                        <Box className='selectiondiv-box'>
                            <Dropdown title={title} val={drpValue} />
                            <Box className='selectionDiv bn searchFlex'>
                                <Tablesearch />
                            </Box>
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

                            <Dropdown title={title2} val={drpValue2} />
                            <Dropdown title={title4} val={drpValue4} />
                            <Dropdown title={title5} val={drpValue5} />
                            <Box className='selectionDiv bn searchFlex'>
                                <Tooltip title={refresh} arrow>
                                    <Button className='refresh-btn solidButton' >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.2 7.2C14.72 7.2 14.4 7.52 14.4 8C14.4 10.32 13.2 12.4 11.2 13.52C8.16 15.28 4.24 14.24 2.48 11.2C0.72 8.16 1.76 4.24 4.8 2.48C7.44 0.96 10.64 1.52 12.64 3.6H10.72C10.24 3.6 9.92 3.92 9.92 4.4C9.92 4.88 10.24 5.2 10.72 5.2H14.32C14.8 5.2 15.12 4.88 15.12 4.4V0.8C15.12 0.32 14.8 0 14.32 0C13.84 0 13.52 0.32 13.52 0.8V2.24C12 0.8 10.08 0 8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 7.52 15.68 7.2 15.2 7.2Z" fill="#FEFFFF" />
                                        </svg>
                                    </Button>
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

export default PlviewComponent