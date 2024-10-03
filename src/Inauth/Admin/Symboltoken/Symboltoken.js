import React from 'react';
import { Box, Grid, Button, Tooltip, Typography, InputBase } from '@mui/material';
import Table from '../../Table/Table';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const col = ['id', 'Markte Name', 'Token']
const rows = [
  { id: 1, name: 'NIFTY50', deleted: 26000 },
  { id: 2, name: 'BANKNIFTY', deleted: 26009 },
  { id: 3, name: 'INDIAVIX', deleted: 26017 },
  { id: 4, name: 'SENSEX', deleted: 1 },
];

export default function Symboltoken() {
  const add = <Typography component={'p'} sx={{ fontSize: '1.2rem' }}>Add Data</Typography >

  return (
    <>
      <Box className='tabelBox'>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={12}>
            <Box className='selectiondiv-box'>
              <Box className='selectionDiv searchFlex bn'>
                <Box className='searchData space' sx={{ '& > .MuiInputBase-root': { width: '100%' }, margin: '0' }}>
                  <InputBase placeholder="Enter Name" className='tabledataFind' />
                </Box>
              </Box>
              <Box className='selectionDiv searchFlex bn'>
                <Box className='searchData space' sx={{ '& > .MuiInputBase-root': { width: '100%' }, margin: '0' }}>
                  <InputBase placeholder="Enter Token" className='tabledataFind' />
                </Box>
                <Tooltip title={add} arrow>
                  <Button className='download-btn solidButton' sx={{ marginLeft: '1rem' }}><AddCircleIcon /></Button>
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
