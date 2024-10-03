import React from 'react';
import { Box, Grid } from '@mui/material';
import { MenuItem, Select, Switch, FormControl, Tooltip, InputBase, Button, Typography } from '@mui/material';
import Tablesearch from '../Inauth/Tablesearch/Tablesearch';
import Table from '../Inauth/Table/Table'
import '../Inauth/Admin/Dashboard/Tradedetails/Tradedetails.scss'
import Dropdown from '../Inauth/Dropdown/Dropdown';

const search = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>search </Typography>
const tradeon = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Select All the Data! </Typography>
const tradeoff = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Select Specific Strategy And Segment Both</Typography>

const TradeComponent = (props) => {

    const { rows, col, title, drpValue, title2, drpValue2, title3, drpValue3, title4, drpValue4, } = props
    return (
        <>
            <Box className='tabelBox'>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={12} >
                        <Box className='selectiondiv-box'>
                            <Dropdown title={title} val={drpValue} />
                            <Box className='selectionDiv bn searchFlex'>
                                <Tablesearch />
                                <Tooltip title={search} arrow>
                                    <Button className='download-btn solidButton' sx={{ margin: '0 0 0 1rem !important' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='#FFFFFF' />
                                        </svg>
                                    </Button>
                                </Tooltip>
                            </Box>
                            <Dropdown title={title4} val={drpValue4} />
                            <Dropdown title={title3} val={drpValue3} />
                            <Dropdown title={title2} val={drpValue2} />
                            <Box className='selectionDiv bn'>
                                <Tooltip title={tradeon} arrow placement='top'>
                                    <Button className='autoTrade-btn on'>Auto Trade ON</Button>
                                </Tooltip>
                                <Tooltip title={tradeoff} arrow placement='top'>
                                    <Button className='autoTrade-btn off'>Auto Trade Off</Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Table col={col} rows={rows} />
            </Box >
        </>
    )
}

export default TradeComponent