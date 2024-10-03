import React from 'react'
import { Box, Button, Tooltip, Dialog, DialogContent, DialogContentText, Typography } from '@mui/material';
import RecommendIcon from '@mui/icons-material/Recommend';
import close from "../../../../images/close.png"
import Table from '../../../Table/Table';

const Cronview = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const col = ['Cron Name', 'Last Runtime', 'Status', 'Cron Action']
    const rows = [
        {
            cn: 'autoLogin', lrt: '10-12-2022 09:00:00', status: <Typography component='span' className='open'>SUCCESS</Typography>, ca: <Tooltip title={<Typography sx={{ fontSize: 12 }}>Actions</Typography>} arrow placement="left">
                <Button className="rejectMessage" onClick={handleClickOpen}> < RecommendIcon /></Button >
            </Tooltip >
        },
    ];
    return (
        <>
            <Box className='tabelBox' sx={{ paddingTop: 2 }}>
                <Table col={col} rows={rows} />
            </Box>


            <Dialog
                open={open}
                onClose={handleClose}
                className='commonModal squareOff'
                fullWidth
            >
                <Box className='modalHeader'>
                    <Typography component={'h4'}>Cron Action</Typography>
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
                        <Typography component={'h4'} sx={{ fontSize: "1.8rem", textAlign: 'center', marginTop: '2rem' }} className='alertText'>Do you Want to continue?</Typography>

                        <Box sx={{ display: { xs: 'flex' }, marginTop: 3 }}>
                            <Button onClick={handleClose} className='modal-btn btn-danger' sx={{ marginRight: '0.5rem' }}>Close</Button>
                            <Button onClick={handleClose} className='modal-btn btn-primary' sx={{ marginLeft: '0.5rem' }}>OK</Button>
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog >
        </>
    )
}

export default Cronview