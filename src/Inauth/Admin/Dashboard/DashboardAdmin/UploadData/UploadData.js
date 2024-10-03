import { Box, Grid, MenuItem, Select, Button, FormControl, Typography, FormControlLabel, Radio, RadioGroup, TextField, InputBase } from '@mui/material';
import React from 'react';
import { useState } from 'react';

export default function UploadData() {
  // Dropdown tab
  const [allcustomer, setallcustomer] = useState('');
  const allcustomerdrp = (event) => {
    setallcustomer(event.target.value);
  };

  return (
    <>
      <Box className='formBox' sx={{ padding: { xs: '1em', md: '3rem' }, border: 'none !important ' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Box className='formItems inputFields'>
              <Typography component={'label'} className='label' >Exchange</Typography>
              <FormControl sx={{ display: 'block' }}>
                <RadioGroup row >
                  <FormControlLabel value="Web" sx={{ marginRight: '2.5rem' }} control={<Radio />} label="NSE" />
                  <FormControlLabel value="App" sx={{ marginRight: '2.5rem' }} control={<Radio />} label="BSE" />
                </RadioGroup>
              </FormControl>
            </Box>

            <Box className='formItems' sx={{ display: { xs: 'block', md: 'flex !important' }, alignItems: 'center' }}>
              <Typography component={'label'} className='label' >Exchange Symbol *</Typography>
              <FormControl className='dropdown-ap' sx={{ maxWidth: '35rem' }}>
                <Select
                  value={allcustomer}
                  onChange={allcustomerdrp}
                  displayEmpty
                  className='dropdown'
                >
                  <MenuItem value='' >All Symbol</MenuItem>
                  <MenuItem value={1} >Symbol 1</MenuItem>
                  <MenuItem value={2} >Symbol 2</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: { xs: 'block', md: 'flex' }, justifyContent: 'left' }}>
              <Box className='formItems' sx={{ paddingRight: '0.5rem' }}>
                <Typography component={'label'} className='label' >1 Min Original Data</Typography>
                <Typography className='fileUpload' component={'label'} sx={{ maxWidth: '100%' }}>
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8.3335V12.3335C1 13.0699 1.59695 13.6668 2.33333 13.6668H11.6667C12.4031 13.6668 13 13.0699 13 12.3335V8.3335" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.33333 10.3333V1M7.33333 1L4 4.62964M7.33333 1L10.6667 4.62963" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Upload CSV / Excel File
                  <InputBase type='file' />
                </Typography>
              </Box>

              <Box className='formItems' sx={{ paddingRight: '0.5rem' }}>
                <Typography component={'label'} className='label' >Daily Data</Typography>
                <Typography className='fileUpload' component={'label'} sx={{ maxWidth: '100%' }}>
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8.3335V12.3335C1 13.0699 1.59695 13.6668 2.33333 13.6668H11.6667C12.4031 13.6668 13 13.0699 13 12.3335V8.3335" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.33333 10.3333V1M7.33333 1L4 4.62964M7.33333 1L10.6667 4.62963" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Upload CSV / Excel File
                  <InputBase type='file' />
                </Typography>
              </Box>
            </Box>
            <Button className='formSolid-btn'>Submit Data</Button>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}
