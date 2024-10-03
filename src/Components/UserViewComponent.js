import React from 'react';
import { Box, Typography, Button, Grid, TextField, InputBase, Tooltip } from '@mui/material';
import '../Inauth/Admin/Dashboard/Userview/Userview.scss'
import Tablesearch from '../Inauth/Tablesearch/Tablesearch'
import Dropdown from '../Inauth/Dropdown/Dropdown';
import { useState } from 'react';

const UserViewComponent = (props) => {
  const { drpValue } = props
  const edit = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Edit </Typography >
  const search = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>search </Typography >
  const [hidden, sethidden] = useState('none');
  const submitForm = () => {
    sethidden('flex')
  }
  return (
    <>
      <Box className='userview'>
        <Box className='userviewActions'>
          <Box className='selectiondiv-box'>
            <Dropdown val={drpValue} />
            <Box className='selectionDiv bn searchFlex'>
              <Tablesearch />
              <Tooltip title={edit} arrow sx={{ display: hidden, marginLeft: 1 }}>
                <Button className='download-btn solidButton'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"> <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" fill='white' /></svg>
                </Button>
              </Tooltip>
              <Tooltip title={search} arrow>
                <Button className='download-btn solidButton' sx={{ marginLeft: 1 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill='#FFFFFF' />
                  </svg>
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Customer ID</Typography>
              <InputBase placeholder='Enter Customer ID' className='userInput' fullWidth />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Broker ID</Typography>
              <InputBase placeholder='Enter Broker ID' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Client ID</Typography>
              <InputBase placeholder='Enter Client ID' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Name</Typography>
              <InputBase placeholder='Enter Name' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Email</Typography>
              <InputBase placeholder='Enter Email' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Mobile</Typography>
              <InputBase placeholder='Enter Mobile Number' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Plan Status</Typography>
              <InputBase placeholder='Enter Plan Status' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Coupon Code</Typography>
              <InputBase placeholder='Enter Coupon Code' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Plan Start Date</Typography>
              <InputBase placeholder='Start Date' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Referral Code</Typography>
              <InputBase placeholder='Enter Referral Code' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Charting ID</Typography>
              <InputBase placeholder='Enter Charting ID' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Plan End Date</Typography>
              <InputBase placeholder='Select Date' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>OTP</Typography>
              <InputBase placeholder='Enter otp' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Charting ID</Typography>
              <InputBase placeholder='Enter Charting ID' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Charting Password</Typography>
              <InputBase placeholder='Enter Charting Password' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Is Deleted</Typography>
              <InputBase placeholder='Is Deleted' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Is Loggedin</Typography>
              <InputBase placeholder='Is Loggedin' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Broker Login</Typography>
              <InputBase placeholder='Broker Portal Login' className='userInput' fullWidth />
            </Box>
          </Grid >

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box className='inputFields space fullWidth'>
              <Typography component={'label'} className='label'>Token</Typography>
              <InputBase placeholder='Enter Token' className='userInput' fullWidth />
            </Box>
          </Grid >

        </Grid >
      </Box>
      <Box className='formBox' sx={{ marginTop: '2rem', border: 'none !important' }}>
        <Button className='formSolid-btn' onClick={submitForm}>Submit  </Button>
      </Box>
    </>
  )
}

export default UserViewComponent