import { Box, Typography, Grid, Button } from '@mui/material';
import React from 'react';
import '../Inauth/Admin/Strategy/Strategyalert/Strategyalert.scss'

const AdminStrategyComponent = (props) => {
    const { optionvalue, handleActive, selected } = props

    const trade = (
        <svg
            width="20"
            height="11"
            viewBox="0 0 20 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M20 0L16.2161 1.03536L17.2464 2.0873L12.077 7.36536L7.47139 2.6626L0 10.2909L0.694474 11L7.47118 4.08139L12.0768 8.78371L17.9405 2.79636L18.9863 3.86405L20 0Z"
                fill="#008F75"
            />
        </svg>
    );

    return (
        <>
            <Box className="option-data">
                {
                    optionvalue.map((e) => {
                        return (
                            <Box className={`option-box ${selected === e.id ? "active-border" : ""}`} onClick={() => handleActive(e.id)}>
                                <Box className="data-value">
                                    <Box className="option-value">
                                        {e.name}
                                    </Box>
                                </Box>
                                <Box className="labels">{e.label}</Box>
                            </Box>
                        )
                    })
                }
            </Box>
            <Box className='activeTrade-box' sx={{ marginBottom: '2.4rem' }}>
                <Typography className='dataProcess-date'>
                    Data processed till
                    <Typography component='span'>Thu 18/05/2023 12:42</Typography>
                </Typography>


                <Box className='tradeStatus' >
                    <Box className='tradeStatus-item'>
                        <Typography component={'p'}>Position Status</Typography>
                        <Typography component={'h3'}>Open</Typography>
                    </Box>
                    <Box className='tradeStatus-item'>
                        <Typography component={'p'}>Trade Type</Typography>
                        <Typography component={'h3'}>Short</Typography>
                    </Box>
                    <Box className='tradeStatus-item'>
                        <Typography component={'p'}>Entry Price</Typography>
                        <Typography component={'h3'}>43564.60</Typography>
                    </Box>
                    <Box className='tradeStatus-item'>
                        <Typography component={'p'}>Target Status</Typography>
                        <Typography component={'h3'}>Not Achieved</Typography>
                    </Box>
                    <Box className='tradeStatus-item'>
                        <Typography component={'p'}>Current Qty</Typography>
                        <Typography component={'h3'}>-3 x 25</Typography>
                    </Box>
                </Box>

                <Grid container spacing={2} className='highlow-day' sx={{
                    padding: { xs: '1rem', md: '1.4rem 2.4rem' }
                }}>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box className='highlow-day-item'>
                            <Typography component={'span'}>Day</Typography>
                            <Box className='high-rate'>
                                <Typography component={'p'} className='high'>H</Typography>
                                <Typography component={'h4'}>44049.15</Typography>
                            </Box>
                            <Box className='low-rate'>
                                <Typography component={'p'} className='low'>H</Typography>
                                <Typography component={'h4'}>44049.15</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box className='highlow-day-item'>
                            <Typography component={'span'}>2 Day</Typography>
                            <Box className='high-rate'>
                                <Typography component={'p'} className='high'>H</Typography>
                                <Typography component={'h4'}>44049.15</Typography>
                            </Box>
                            <Box className='low-rate'>
                                <Typography component={'p'} className='low'>H</Typography>
                                <Typography component={'h4'}>44049.15</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box className='highlow-day-item'>
                            <Typography component={'span'}>9:20 PM</Typography>
                            <Box className='high-rate'>
                                <Typography component={'p'} className='high'>H</Typography>
                                <Typography component={'h4'}>44049.15</Typography>
                            </Box>
                            <Box className='low-rate'>
                                <Typography component={'p'} className='low'>H</Typography>
                                <Typography component={'h4'}>44049.15</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                        <Box className='highlow-day-item'>
                            <Typography component={'span'}>9:30 AM</Typography>
                            <Box className='high-rate'>
                                <Typography component={'p'} className='high'>H</Typography>
                                <Typography component={'h4'}>44049.15</Typography>
                            </Box>
                            <Box className='low-rate'>
                                <Typography component={'p'} className='low'>H</Typography>
                                <Typography component={'h4'}>44049.15</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box className='activeTrade-box'>
                <Typography className='title'>Active Trade</Typography>

                <Box className='tradeStatus'>
                    <Box className='activetrade-item'>
                        <Typography component={'p'} className='lenght'>Long</Typography>
                        <Typography component={'h3'} className='status'>Closed</Typography>
                    </Box>
                    <Box className='activetrade-item'>
                        <Box className='order'>
                            <Typography component={'span'} className='entry'>Trade</Typography>
                            <Typography component={'span'} className='buy'>Type</Typography>
                        </Box>
                        <Typography component={'h3'} className='price'>3 @ 44180.85</Typography>
                        <Button className='placeOrder'>Place Order</Button>
                        <Typography component={'p'} className='dateTime'>18/05/2023 09:19</Typography>
                    </Box>
                    <Box className='activetrade-item'>
                        <Box className='order'>
                            <Typography component={'span'} className='entry'>Target 1</Typography>
                            <Typography component={'span'} className='sell'>Sell</Typography>
                        </Box>
                        <Typography component={'h3'} className='price'>3 @ 44180.85</Typography>
                        <Button className='placeOrder waiting'>Awaiting Entry</Button>
                    </Box>
                    <Box className='activetrade-item'>
                        <Box className='order'>
                            <Typography component={'span'} className='entry'>Target 2</Typography>
                            <Typography component={'span'} className='sell'>Sell</Typography>
                        </Box>
                        <Typography component={'h3'} className='price'>3 @ 44180.85</Typography>
                        <Button className='placeOrder waiting'>Awaiting Etry</Button>
                    </Box>
                    <Box className='activetrade-item'>
                        <Box className='order'>
                            <Typography component={'span'} className='entry'>SL</Typography>
                            <Typography component={'span'} className='sell'>Sell</Typography>
                        </Box>
                        <Typography component={'h3'} className='price'>3 @ 44180.85</Typography>
                        <Button className='placeOrder waiting'>Awaiting Etry</Button>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default AdminStrategyComponent