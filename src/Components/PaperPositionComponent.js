import React from 'react';
import { Box, Grid, Button, Typography, Tooltip, Dialog, DialogContent, DialogContentText, } from '@mui/material';
import Tablesearch from '../Inauth/Tablesearch/Tablesearch';
import Table from '../Inauth/Table/Table';
import close from '../images/close.png';
import Dropdown from '../Inauth/Dropdown/Dropdown';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const PaperPositionComponent = (props) => {
    const { title, drpValue, title2, drpValue2, title3, drpValue3, col, rows, handelStratergy, handelPnl, handelSubmit, adminpepardata } = props
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const sqyuareoff = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Square Off</Typography >
    const download = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Download</Typography >
    const csv = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Download CSV</Typography >

    return (
        <>
            <Box className='tabelBox'>
                <Grid container spacing={2} alignItems={'center'} padding={'1rem 0'}>
                    <Grid item xs={12}>
                        <Box className='selectiondiv-box'>
                            <Box className='selectionDiv bn searchFlex'>
                                < Tablesearch />
                            </Box>
                            {/* <Dropdown title={title} val={drpValue} /> */}
                            <Dropdown title={title2} val={drpValue2} handleChange={handelStratergy} />
                            <Dropdown title={title3} val={drpValue3} handleChange={handelPnl} />
                            <Box className='selectionDiv bn searchFlex'>
                                <Tooltip arrow>
                                    <Button className='download-btn solidButton' sx={{ marginRight: 1 }} onClick={() => handelSubmit()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='#FFFFFF' />
                                        </svg>
                                    </Button>
                                </Tooltip>
                                <Tooltip title={download} arrow>
                                    <Button className='download-btn solidButton' sx={{ marginRight: 1 }}>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 11.6669V15.2224C17 15.6939 16.8127 16.1461 16.4793 16.4795C16.1459 16.8129 15.6937 17.0002 15.2222 17.0002H2.77778C2.30628 17.0002 1.8541 16.8129 1.5207 16.4795C1.1873 16.1461 1 15.6939 1 15.2224V11.6669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 11.6667V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Button>
                                </Tooltip>
                                <Tooltip title={csv} arrow>
                                    <Button className='download-btn solidButton' sx={{ marginRight: 1 }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM200 352h16c22.1 0 40 17.9 40 40v8c0 8.8-7.2 16-16 16s-16-7.2-16-16v-8c0-4.4-3.6-8-8-8H200c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-8c0-8.8 7.2-16 16-16s16 7.2 16 16v8c0 22.1-17.9 40-40 40H200c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40zm133.1 0H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H333.1c-7.2 0-13.1 5.9-13.1 13.1c0 5.2 3 9.9 7.8 12l37.4 16.6c16.3 7.2 26.8 23.4 26.8 41.2c0 24.9-20.2 45.1-45.1 45.1H304c-8.8 0-16-7.2-16-16s7.2-16 16-16h42.9c7.2 0 13.1-5.9 13.1-13.1c0-5.2-3-9.9-7.8-12l-37.4-16.6c-16.3-7.2-26.8-23.4-26.8-41.2c0-24.9 20.2-45.1 45.1-45.1zm98.9 0c8.8 0 16 7.2 16 16v31.6c0 23 5.5 45.6 16 66c10.5-20.3 16-42.9 16-66V368c0-8.8 7.2-16 16-16s16 7.2 16 16v31.6c0 34.7-10.3 68.7-29.6 97.6l-5.1 7.7c-3 4.5-8 7.1-13.3 7.1s-10.3-2.7-13.3-7.1l-5.1-7.7c-19.3-28.9-29.6-62.9-29.6-97.6V368c0-8.8 7.2-16 16-16z" fill='white' /></svg>
                                    </Button>
                                </Tooltip>
                                <Tooltip title={sqyuareoff} arrow>
                                    <Button className='squareOff-btn solidButton' onClick={handleClickOpen}> <CloseIcon /></Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Grid >
                </Grid >

                <Table col={col} rows={adminpepardata} />
            </Box >

            <Dialog
                open={open}
                onClose={handleClose}
                className='commonModal squareOff'
            >
                <Box className='modalHeader' sx={{ justifyContent: 'end' }}>
                    <Typography component={'h4'}>Square Off</Typography>
                    <Button onClick={handleClose} className='closeModal'><img src={close} /></Button>
                </Box>
                <DialogContent sx={{ padding: '0' }} className='modalBody'>
                    <DialogContentText sx={{ padding: '0' }}>

                        <Box className='alertIcons'>
                            <svg width="1052" height="1052" viewBox="0 0 1052 1052" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M558 334C558 316.3 543.7 302 526 302C508.3 302 494 316.3 494 334V590C494 607.7 508.3 622 526 622C543.7 622 558 607.7 558 590V334ZM526 750C536.609 750 546.783 745.786 554.284 738.284C561.786 730.783 566 720.609 566 710C566 699.391 561.786 689.217 554.284 681.716C546.783 674.214 536.609 670 526 670C515.391 670 505.217 674.214 497.716 681.716C490.214 689.217 486 699.391 486 710C486 720.609 490.214 730.783 497.716 738.284C505.217 745.786 515.391 750 526 750Z" fill="#4987FE" />
                                <circle cx="526" cy="526" r="507" stroke="#5086EE" stroke-width="38" />
                            </svg>
                        </Box>
                        <Typography component={'h4'} sx={{ fontSize: "1.8rem", textAlign: 'center', marginTop: '2rem' }} className='alertText'>Are You Sure You Want to Close Position !</Typography>

                        <Box sx={{ display: { xs: 'flex' }, marginTop: 2 }}>
                            <Button onClick={handleClose} className='modal-btn btn-danger' sx={{ marginRight: '0.5rem' }}>Discard</Button>
                            <Button onClick={handleClose} className='modal-btn btn-primary' sx={{ marginLeft: '0.5rem' }}>Confirm</Button>
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default PaperPositionComponent