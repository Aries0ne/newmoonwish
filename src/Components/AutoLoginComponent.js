import React, { useState } from 'react';
import Table from '../Inauth/Table/Table'
import { Box, Grid, MenuItem, Select, Button, FormControl, InputBase, Typography, Tooltip } from '@mui/material';

const AutoLoginComponent = (props) => {
    const { col, rows } = props
    const [allcustomer, setallcustomer] = useState('');
    const allcustomerdrp = (event) => {
        setallcustomer(event.target.value);
    };
    const csv = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Sample CSV File</Typography >

    return (
        <>
            <Box className='formBox border-ap'>
                <Grid container spacing={2} sx={{
                    padding: { xs: '1rem', md: '3rem' }
                }}>
                    <Grid item xs={12} md={4}>
                        <Box className='formItems'>
                            <Typography component={'label'} className='label' >Broker</Typography>
                            <FormControl className='dropdown-ap'>
                                <Select value={allcustomer} onChange={allcustomerdrp} displayEmpty className='dropdown'>
                                    <MenuItem value="" >Customer ID</MenuItem>
                                    <MenuItem value={2} >Customer ID 1</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className='formItems' sx={{ display: 'flex !important', alignItems: 'center' }}>
                            <Typography component={'label'} sx={{ marginBottom: '0 !important' }} className='label' >Sample .CSV File</Typography>
                            <Tooltip title={csv} arrow>
                                <Button className='download-btn solidButton'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM200 352h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40zm133.1 0H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H333.1c-7.2 0-13.1 5.9-13.1 13.1c0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2c0 24.9-20.2 45.1-45.1 45.1H304c-8.8 0-16-7.2-16-16s7.2-16 16-16h42.9c7.2 0 13.1-5.9 13.1-13.1c0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2c0-24.9 20.2-45.1 45.1-45.1zm98.9 0c8.8 0 16 7.2 16 16v31.6c0 23 5.5 45.6 16 66c10.5-20.3 16-42.9 16-66V368c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V368c0-8.8 7.2-16 16-16z" fill='white' /></svg>
                                </Button>
                            </Tooltip>
                        </Box>
                        <Box className='formItems'>
                            <Typography component={'label'} className='label' >Upload your CVS file</Typography>
                            <Typography className='fileUpload' component={'label'}>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 8.3335V12.3335C1 13.0699 1.59695 13.6668 2.33333 13.6668H11.6667C12.4031 13.6668 13 13.0699 13 12.3335V8.3335" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.33333 10.3333V1M7.33333 1L4 4.62964M7.33333 1L10.6667 4.62963" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Upload CSV FIle
                                <InputBase type='file' sx={{ marginRight: '2.5rem' }} />
                            </Typography>
                        </Box>
                        <Button className='formSolid-btn'>Broker Login</Button>
                    </Grid>
                </Grid>
                <Table col={col} rows={rows} />
            </Box>
        </>
    )
}

export default AutoLoginComponent