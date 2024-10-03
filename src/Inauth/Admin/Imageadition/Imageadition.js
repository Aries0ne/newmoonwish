import React from 'react';
import { Box, Grid, Button, TextField, Typography, InputBase } from '@mui/material';
import Table from '../../Table/Table';
import Dropdown from '../../Dropdown/Dropdown';

export default function Imageadition() {
  const col = ['Title', 'URL', 'Media Type', 'Type']
  const rows = [{
    title: 'Make Your Strategy	',
    url: 'https://dematade-storage.s3.ap-south-1.amazonaws.com/files/how%20to%20automate%20your%20own%20strategy%202.png	',
    mediatype: 'image',
    type: 'offer'
  }];

  //  Dropdown
  const drpValue = ['Upload', 'URL'];
  const drpValue1 = ['Image', 'Video'];
  const drpValue2 = ['All', 'Artarde', 'Dematade', 'Klpt500'];

  return (
    <>
      <Box className='tabelBox'>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={12}>
            <Box className='selectiondiv-box'>
              <Dropdown val={drpValue2} />
              <Dropdown val={drpValue1} />
              <Dropdown val={drpValue} />

              <Box className='selectionDiv bn'>
                <Box className='searchData space' sx={{ '& > .MuiInputBase-root': { width: '100%' }, margin: '0 !important' }}>
                  <InputBase placeholder="Enter Title" className='tabledataFind' />
                </Box>
              </Box>
              <Box className='selectionDiv bn'>
                <Box className='searchData space' sx={{ '& > .MuiInputBase-root': { width: '100%' }, margin: '0 !important' }}>
                  <InputBase placeholder="Enter URL" className='tabledataFind' />
                </Box>
              </Box>
              <Box className='selectionDiv bn formBox'>
                <Box className='formItems' sx={{ margin: '0 !important', display: 'flex !important', alignItems: 'center' }}>
                  <Typography className='fileUpload' sx={{
                    margin: '0 1rem 0 0 !important',
                    maxWidth: { xs: '100% !important', md: '20rem !important' },
                    width: '100%'
                  }} component={'label'}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 8.3335V12.3335C1 13.0699 1.59695 13.6668 2.33333 13.6668H11.6667C12.4031 13.6668 13 13.0699 13 12.3335V8.3335" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.33333 10.3333V1M7.33333 1L4 4.62964M7.33333 1L10.6667 4.62963" stroke="#8D8D8D" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Upload File
                    <InputBase type='file' sx={{ marginRight: '2.5rem' }} />
                  </Typography>
                  <Button className='formSolid-btn'>Submit  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Table col={col} rows={rows} />
      </Box >
    </>
  )
}
