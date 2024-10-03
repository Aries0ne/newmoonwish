import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import "../AthDetails/AthDetails.scss"
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { postAthOrder } from '../../../redux/actions/athActions';
import moment from 'moment';

const AthDetails = () => {

    const TargetDetails = [
        {
            target: "Target 1",
            date: "16th Nov, 2021",
            oty: "Qty 2 @ 1725.80"
        },
        {
            target: "Target 2",
            date: "16th Nov, 2021",
            oty: "Qty 2 @ 1725.80"
        },
        {
            target: "Target 3",
            date: "16th Nov, 2021",
            oty: "Qty 2 @ 1725.80"
        },
        {
            target: "Target 4",
            date: "16th Nov, 2021",
            oty: "Qty 2 @ 1725.80"
        },
        {
            target: "Target 5",
            date: "16th Nov, 2021",
            oty: "Qty 2 @ 1725.80"
        },
        {
            target: "Target 6",
            date: "16th Nov, 2021",
            oty: "Qty 2 @ 1725.80"
        },
    ]

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [cardData, setCardData] = useState()

    useEffect(() => {
        handleSubmit();
    }, [])

    const handleSubmit = () => {
        dispatch(postAthOrder({ id: location.state.id }))
    }

    const athOrderData = useSelector((state) => state.Ath.athOrderData);
    
    useEffect(() => {
        if (Object.keys(athOrderData).length > 0) {
            setCardData(athOrderData)
        }
    }, [athOrderData])

    return (
        <>
            <Box className='AthDetails-box' sx={{ marginBottom: '2.4rem' }}>
                <Box className='AthDetails-head' >
                    <Box className='dataProcess-date'>
                        <Button onClick={() => navigate("/ath")}>
                            <ArrowBackIosIcon />
                        </Button>
                        <Box className='AthDetails-box-title' >
                            {cardData?.tradingsymbol}
                        </Box>
                    </Box>
                    <Box className='portfolio'>
                        <AddIcon />
                        <Box className='add-portfolio' >
                            ADD TO PORTFOLIO
                        </Box>
                    </Box>
                </Box>
                <Box className='AthDetails-body'>
                    <Box className='AthDetails-body-box'>
                        {cardData?.name}
                    </Box>
                    <Box className='AthDetails-body-icons'>
                        <Box className='up-down'>
                            <TrendingUpIcon />
                            <Box className='up-down-text'>
                                50.56
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className='AthDetails-Data-body'>
                    <Box>
                        <Box className='market-data'>Market Cap</Box>
                        <Box className='market-cap'>{cardData?.marketcap / 10000000} cr</Box>
                    </Box>
                    <Box>
                        <Box className='market-data'>Date of Inception</Box>
                        <Box className='market-cap'>12th March, 2008</Box>
                    </Box>
                    <Box>
                        <Box className='market-data'>Company Age</Box>
                        <Box className='market-cap'>15y 4m</Box>
                    </Box>
                </Box>
            </Box>

            <Box className='AthDetails-box-data'>
                <Box className='box-data' sx={{ marginBottom: '2.4rem' }}>
                    <Box className='box-button'>
                        <Box className="button-box MCC">MCC</Box>
                        <Box className="button-box NIL">NIL</Box>
                        <Box className="button-box Target">Target 3</Box>
                    </Box>
                    <Box className='body-data'>
                        <Box>
                            <Box className='body-data-one'>RH</Box>
                            <Box>{cardData?.MCC_DATA[0]?.mcc_ath}</Box>
                            <Box className='body-data-date'>30th Jun, 2023</Box>
                        </Box>
                        <Box>
                            <Box className='body-data-one'>CC</Box>
                            <Box>{cardData?.MCC_DATA[0]?.mcc_cc}</Box>
                            {/* <Box className='body-data-date'>Invalid date</Box> */}
                        </Box>
                    </Box>
                    <Box className="data-market">
                        <Box>
                            <Box className="market-datas">PMSMA10</Box>
                            <Box>{cardData?.MCC_DATA[0]?.mcc_moving_avg_10}</Box>
                        </Box>
                        <Box>
                            <Box className="market-datas">PMSMA20</Box>
                            <Box>{cardData?.MCC_DATA[0]?.mcc_moving_avg_20}</Box>
                        </Box>
                    </Box>
                    <Box className="data-entry">
                        <Box>ENTRY DETAILS</Box>
                        <Box className="data-AthDetails">
                            <Box className="Mui-icon">
                                {
                                    cardData?.MCC[0]?.status === "TRIGGERED" ? (
                                        <Box className="Mui-icon com">
                                            <CheckCircleIcon />
                                        </Box>
                                    ) : (
                                        <Box className="Mui-icon incom">
                                            <CheckCircleIcon />
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box>
                                <Box>{cardData?.MCC[0]?.ordertype}</Box>
                                <Box className='market-data'>{moment(new Date(cardData?.MCC[0]?.triggered_at)).format("DD-MM-YYYY")}</Box>
                                <Box className='market-data-second'>Qty {cardData?.MCC[0]?.quantity} @ {cardData?.MCC[0]?.trigger}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="Target-Details">
                        <Box>TARGET DETAILS</Box>
                        <Box>
                            {
                                cardData?.MCC?.slice(1, -1).map((data, index) => {
                                    return (
                                        <>
                                            <Box className="Target-Details-Data">
                                                <Box className="Mui-icons">
                                                    {
                                                        data?.status === "TRIGGERED" ? (
                                                            <Box className="Mui-icons com">
                                                                <CheckCircleIcon />
                                                            </Box>
                                                        ) : (
                                                            <Box className="Mui-icons incom">
                                                                <CheckCircleIcon />
                                                            </Box>
                                                        )
                                                    }
                                                </Box>
                                                <Box>
                                                    <Box>{data?.ordertype} {index + 1}</Box>
                                                    {data?.status === "TRIGGERED" ? (
                                                        <Box className='market-data'>{moment(new Date(data?.triggered_at)).format("DD-MM-YYYY")}</Box>
                                                    ) : ("")}
                                                    <Box className='market-data-second'>Qty {data?.quantity} @ {data?.trigger}</Box>
                                                </Box>
                                            </Box>
                                        </>
                                    )
                                })
                            }
                        </Box>
                        <Box>SL DETAILS</Box>
                        <Box className="Target-Details-Data">
                            <Box className="Mui-icons">
                                {
                                    cardData?.MCC?.slice(-1)[0]?.status === "TRIGGERED" ? (
                                        <Box className="Mui-icons com">
                                            <CheckCircleIcon />
                                        </Box>
                                    ) : (
                                        <Box className="Mui-icons incom">
                                            <CheckCircleIcon />
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box>
                                <Box>{cardData?.MCC?.slice(-1)[0]?.ordertype}</Box>
                                <Box className='market-data-second'>Qty {cardData?.MCC?.slice(-1)[0]?.quantity} @ {cardData?.MCC?.slice(-1)[0]?.trigger}</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className='box-data' sx={{ marginBottom: '2.4rem' }}>
                    <Box className='box-button'>
                        <Box className="button-box MCC">WCC</Box>
                        <Box className="button-box NIL">NIL</Box>
                        <Box className="button-box Target">Target 3</Box>
                    </Box>
                    <Box className='body-data'>
                        <Box>
                            <Box className='body-data-one'>RH</Box>
                            <Box>{cardData?.WCC_DATA[0]?.wcc_ath}</Box>
                            <Box className='body-data-date'>30th Jun, 2023</Box>
                        </Box>
                        <Box>
                            <Box className='body-data-one'>CC</Box>
                            <Box>{cardData?.WCC_DATA[0]?.wcc_cc}</Box>
                            {/* <Box className='body-data-date'>Invalid date</Box> */}
                        </Box>
                    </Box>
                    <Box className="data-market">
                        <Box>
                            <Box className="market-datas">PMSMA10</Box>
                            <Box>{cardData?.WCC_DATA[0]?.wcc_moving_avg_10}</Box>
                        </Box>
                        <Box>
                            <Box className="market-datas">PMSMA20</Box>
                            <Box>{cardData?.WCC_DATA[0]?.wcc_moving_avg_20}</Box>
                        </Box>
                    </Box>
                    <Box className="data-entry">
                        <Box>ENTRY DETAILS</Box>
                        <Box className="data-AthDetails">
                            <Box className="Mui-icon">
                                {
                                    cardData?.WCC[0]?.status === "TRIGGERED" ? (
                                        <Box className="Mui-icon com">
                                            <CheckCircleIcon />
                                        </Box>
                                    ) : (
                                        <Box className="Mui-icon incom">
                                            <CheckCircleIcon />
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box>
                                <Box>{cardData?.WCC[0]?.ordertype}</Box>
                                <Box className='market-data'>{moment(new Date(cardData?.WCC[0]?.triggered_at)).format("DD-MM-YYYY")}</Box>
                                <Box className='market-data-second'>Qty {cardData?.WCC[0]?.quantity} @ {cardData?.WCC[0]?.trigger}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="Target-Details">
                        <Box>TARGET DETAILS</Box>
                        <Box>
                            {
                                cardData?.WCC?.slice(1, -1).map((data, index) => {
                                    return (
                                        <>
                                            <Box className="Target-Details-Data">
                                                <Box className="Mui-icons">
                                                    {
                                                        data?.status === "TRIGGERED" ? (
                                                            <Box className="Mui-icons com">
                                                                <CheckCircleIcon />
                                                            </Box>
                                                        ) : (
                                                            <Box className="Mui-icons incom">
                                                                <CheckCircleIcon />
                                                            </Box>
                                                        )
                                                    }
                                                </Box>
                                                <Box>
                                                    <Box>{data?.ordertype} {index + 1}</Box>
                                                    {data?.status === "TRIGGERED" ? (
                                                        <Box className='market-data'>{moment(new Date(data?.triggered_at)).format("DD-MM-YYYY")}</Box>
                                                    ) : ("")}
                                                    <Box className='market-data-second'>Qty {data?.quantity} @ {data?.trigger}</Box>
                                                </Box>
                                            </Box>
                                        </>
                                    )
                                })
                            }
                        </Box>
                        <Box>SL DETAILS</Box>
                        <Box className="Target-Details-Data">
                            <Box className="Mui-icons">
                                {
                                    cardData?.WCC?.slice(-1)[0]?.status === "TRIGGERED" ? (
                                        <Box className="Mui-icons com">
                                            <CheckCircleIcon />
                                        </Box>
                                    ) : (
                                        <Box className="Mui-icons incom">
                                            <CheckCircleIcon />
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box>
                                <Box>{cardData?.WCC?.slice(-1)[0]?.ordertype}</Box>
                                <Box className='market-data-second'>Qty {cardData?.WCC?.slice(-1)[0]?.quantity} @ {cardData?.WCC?.slice(-1)[0]?.trigger}</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box className='box-data' sx={{ marginBottom: '2.4rem' }}>
                    <Box className='box-button'>
                        <Box className="button-box MCC">DCC</Box>
                        <Box className="button-box NIL">NIL</Box>
                        <Box className="button-box Target">Target 3</Box>
                    </Box>
                    <Box className='body-data'>
                        <Box>
                            <Box className='body-data-one'>RH</Box>
                            <Box>{cardData?.DCC_DATA[0]?.dcc_ath}</Box>
                            <Box className='body-data-date'>30th Jun, 2023</Box>
                        </Box>
                        <Box>
                            <Box className='body-data-one'>CC</Box>
                            <Box>{cardData?.DCC_DATA[0]?.dcc_cc}</Box>
                            {/* <Box className='body-data-date'>Invalid date</Box> */}
                        </Box>
                    </Box>
                    <Box className="data-market">
                        <Box>
                            <Box className="market-datas">PMSMA10</Box>
                            <Box>{cardData?.DCC_DATA[0]?.dcc_moving_avg_10}</Box>
                        </Box>
                        <Box>
                            <Box className="market-datas">PMSMA20</Box>
                            <Box>{cardData?.DCC_DATA[0]?.dcc_moving_avg_20}</Box>
                        </Box>
                    </Box>
                    <Box className="data-entry">
                        <Box>ENTRY DETAILS</Box>
                        <Box className="data-AthDetails">
                            <Box className="Mui-icon">
                                {
                                    cardData?.DCC[0]?.status === "TRIGGERED" ? (
                                        <Box className="Mui-icon com">
                                            <CheckCircleIcon />
                                        </Box>
                                    ) : (
                                        <Box className="Mui-icon incom">
                                            <CheckCircleIcon />
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box>
                                <Box>{cardData?.DCC[0]?.ordertype}</Box>
                                <Box className='market-data'>{moment(new Date(cardData?.DCC[0]?.triggered_at)).format("DD-MM-YYYY")}</Box>
                                <Box className='market-data-second'>Qty {cardData?.DCC[0]?.quantity} @ {cardData?.DCC[0]?.trigger}</Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="Target-Details">
                        <Box>TARGET DETAILS</Box>
                        <Box>
                            {
                                cardData?.DCC?.slice(1, -1).map((data, index) => {
                                    return (
                                        <>
                                            <Box className="Target-Details-Data">
                                                <Box className="Mui-icons">
                                                    {
                                                        data?.status === "TRIGGERED" ? (
                                                            <Box className="Mui-icons com">
                                                                <CheckCircleIcon />
                                                            </Box>
                                                        ) : (
                                                            <Box className="Mui-icons incom">
                                                                <CheckCircleIcon />
                                                            </Box>
                                                        )
                                                    }
                                                </Box>
                                                <Box>
                                                    <Box>{data?.ordertype} {index + 1}</Box>
                                                    {data?.status === "TRIGGERED" ? (
                                                        <Box className='market-data'>{moment(new Date(data?.triggered_at)).format("DD-MM-YYYY")}</Box>
                                                    ) : ("")}
                                                    <Box className='market-data-second'>Qty {data?.quantity} @ {data?.trigger}</Box>
                                                </Box>
                                            </Box>
                                        </>
                                    )
                                })
                            }
                        </Box>
                        <Box>SL DETAILS</Box>
                        <Box className="Target-Details-Data">
                            <Box className="Mui-icons">
                                {
                                    cardData?.DCC?.slice(-1)[0]?.status === "TRIGGERED" ? (
                                        <Box className="Mui-icons com">
                                            <CheckCircleIcon />
                                        </Box>
                                    ) : (
                                        <Box className="Mui-icons incom">
                                            <CheckCircleIcon />
                                        </Box>
                                    )
                                }
                            </Box>
                            <Box>
                                <Box>{cardData?.DCC?.slice(-1)[0]?.ordertype}</Box>
                                <Box className='market-data-second'>Qty {cardData?.DCC?.slice(-1)[0]?.quantity} @ {cardData?.DCC?.slice(-1)[0]?.trigger}</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default AthDetails