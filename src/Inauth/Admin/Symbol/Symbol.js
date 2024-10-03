import React, { useState } from 'react';
import Table from '../../Table/Table';
import close from '../../../images/close.png';
import './Symbol.scss';
import Dropdown from '../../Dropdown/Dropdown'
import { Button, Tooltip, Box, Typography, Dialog, DialogContent, TextField, Grid, MenuItem, Select, FormControl } from '@mui/material';

export default function Symbol() {
  const [open, setOpen] = React.useState(false);
  const [contract, setcontract] = useState('');
  const [indicatorsc, setindicatorsc] = useState('');
  const [Calculationsc, setCalculationsc] = useState('');

  // Add Symbol Modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const edit = <Typography sx={{ fontSize: '1.4rem' }}>Edit</Typography>
  const col = ['Sr No.', 'Symbol', 'Short Name', 'Contract', 'Data For Indicator Specific/Continuous', 'Data For Calculations Specific/Continuous', 'Expiry To Be Traded Near/Next/Far', 'Rollover Date', 'Rollover Time', 'Start Of Next Expiry', 'Entry ORPI', 'SL ORPT', 'Entry Recalculation & Wait Time', 'Sl Recalculation & Wait Time', 'Actions']
  const rows = [
    {
      srno: 1,
      symbol: 'BANKNIFTY',
      shortName: 'BNF',
      contract: 'Monthly',
      disc: 'Continuous',
      scsc: 'Specific',
      etnf: 'Near',
      rolloverTime: '0 Day',
      startNex: '10.00 am',
      expiry: '2 Day',
      entryORPT: '5 min',
      slORPT: '5 min',
      ercwt: '15 min',
      srcwt: '15 min',
      action: <Tooltip title={edit} arrow placement='top'>
        <Button className='edit' variant="text" onClick={handleClickOpen}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z" stroke="CurrentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2" stroke="CurrentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 22H21" stroke="CurrentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </Button>
      </Tooltip>
    },
  ];

  // Dropdown tab
  const contractdrp = (event) => {
    setcontract(event.target.value);
  };

  // Dropdown tab
  const indicatorscdrp = (event) => {
    setindicatorsc(event.target.value);
  };

  // Dropdown tab
  const Calculationdrp = (event) => {
    setCalculationsc(event.target.value);
  };

  const val = ['Continuous 1', 'Continuous 2', 'Continuous 3', 'Continuous 4']
  return (
    <>
      <Box className='border-ap' sx={{ borderTop: 'none' }}>
        <Table col={col} rows={rows} />
      </Box>


      < Dialog open={open} onClose={handleClose} className='commonModal symbolModal' >
        <Box className='modalHeader' sx={{ justifyContent: 'space-between' }}>
          <Typography component={'h5'}>Create New Strategy</Typography>
          <Button onClick={handleClose} className='closeModal'><img src={close} /></Button>
        </Box>
        <DialogContent className='modalBody'>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>Symbol</Typography>
                <TextField type='text' placeholder="Symbol" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>Short Name</Typography>
                <TextField type='text' placeholder="Short Name" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>Contract</Typography>
                <TextField type='text' placeholder="Contract" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='formBox inputFields' >
                <Typography component={'label'} className='label'>Contract</Typography>
                <Box className='formItems'>
                  <FormControl className='dropdown-ap'>
                    <Select
                      value={contract}
                      onChange={contractdrp}
                      displayEmpty
                      className='dropdown'
                    >
                      <MenuItem value='' >All Symbol</MenuItem>
                      <MenuItem value={1} >Symbol 1</MenuItem>
                      <MenuItem value={2} >Symbol 2</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='formBox inputFields' >
                <Typography component={'label'} className='label'>Data For Indicator Specific/Continuous</Typography>
                <Box className='formItems'>
                  <FormControl className='dropdown-ap'>
                    <Select
                      value={indicatorsc}
                      onChange={indicatorscdrp}
                      displayEmpty
                      className='dropdown'
                    >
                      <MenuItem value='' >Continuous</MenuItem>
                      <MenuItem value={1} >Specific</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='formBox inputFields' >
                <Typography component={'label'} className='label'>Data For Indicator Specific/Continuous</Typography>
                <Box className='formItems'>
                  <FormControl className='dropdown-ap'>
                    <Select
                      value={Calculationsc}
                      onChange={Calculationdrp}
                      displayEmpty
                      className='dropdown'
                    >
                      <MenuItem value='' >Continuous</MenuItem>
                      <MenuItem value={1} >Specific</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>Rollover Date</Typography>
                <TextField type='text' placeholder="Rollover Date" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>Rollover Time</Typography>
                <TextField type='text' placeholder="Rollover Time" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>Start of Next Expiry</Typography>
                <TextField type='text' placeholder="Start of Next Expiry" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>Entry ORPT</Typography>
                <TextField type='text' placeholder="Entry ORPT" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>SL ORPT</Typography>
                <TextField type='text' placeholder="SL ORPT" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>Entry Recalculation & Wait Time</Typography>
                <TextField type='text' placeholder="Entry Recalculation & Wait Time" />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className='inputFields space space-y fullWidth' >
                <Typography component={'label'} className='label'>SL Recalculation & Wait Time</Typography>
                <TextField type='text' placeholder="SL Recalculation & Wait Time" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button className='formSolid-btn' sx={{ marginTop: '2rem !important' }}>Save & Submit</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog >
    </>
  )
}
