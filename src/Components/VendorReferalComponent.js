import React from 'react';
import { Box, Grid, Button, Typography, Tooltip } from '@mui/material';
import Tablesearch from '../Inauth/Tablesearch/Tablesearch'
import Table from '../Inauth/Table/Table';
import Dropdown from '../Inauth/Dropdown/Dropdown';

const VendorReferalComponent = (props) => {
    // drop down
    const { title, drpValue, col, rows } = props
    const search = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Search</Typography >
    return (
        <>
            <Box sx={{
                display: { xs: 'flex' },
                alignItems: { xs: 'center' },
                justifyContent: { xs: 'end' },
                marginBottom: { xs: '1.4rem' }
            }}>

            </Box>
            <Box className='tabelBox'>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={12}>
                        <Box className='selectiondiv-box'>
                            <Dropdown title={title} val={drpValue} />
                            <Box className='selectionDiv bn searchFlex'>
                                <Tablesearch />
                                <Tooltip title={search} arrow>
                                    <Button className='download-btn solidButton ' sx={{ marginLeft: 1 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='#FFFFFF' />
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

export default VendorReferalComponent