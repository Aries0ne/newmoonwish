import React from 'react';
import { Box, Grid, Button, Typography, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Tablesearch from '../../Tablesearch/Tablesearch';
import Dropdown from '../../Dropdown/Dropdown';

import '../../Table/Table.scss';
import { useState } from 'react';

const col = ['Symbol', 'Market CAP/AGE', 'RH', 'CC', 'Entry', 'targets', 'sl']
// const rows = [
//   { symbol: 'INFIBEAM', pr: '5178.66 Cr', mcc: 'mcc', on: 'on', nil: 'nil' },
// ];

export default function None1(props) {
  // Main tab
  const [value, setValue] = useState('maintab1');
  const handleChange = (e, newValue = 'string') => {
    setValue(newValue);
  };

  // Dropdwon
  const title = '  ';
  const drpValue = ['MCC', 'MCC 1']

  // Dropdwon
  const title1 = 'Status';
  const drpValue1 = ['All', 'Tarde 1']

  // Dropdwon
  const title2 = 'Trade Status';
  const drpValue2 = ['All', 'On', 'Off']

  // Dropdwon
  const title3 = 'Sort By';
  const drpValue3 = ['None', 'Tarde 1']


  return (
    <>
      <Box className='border-ap'>
        <Box className='tabs'>
          <TabContext value={value}>
            <TabList className='main-tab' onChange={handleChange} sx={{ padding: { xs: '2rem' } }}>
              <Tab label="Analysis" value={"maintab1"} />
              <Tab label="My Portfolio" value={"maintab2"} />
            </TabList>

            <TabPanel value={"maintab1"} sx={{ padding: 0, marginTop: '2rem' }}>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className='selectiondiv-box' sx={{ marginBottom: 2 }}>
                    <Box className='selectionDiv bn'>
                      <Button className='solidButton download-btn' sx={{ marginLeft: '0 !important' }}>
                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="2.28571" rx="1.14286" fill="#D9D9D9" />
                          <rect x="2.48242" y="6.85718" width="19.0345" height="2.28571" rx="1.14286" fill="#D9D9D9" />
                          <rect x="4.96582" y="13.7144" width="14.069" height="2.28571" rx="1.14286" fill="#D9D9D9" />
                        </svg>
                      </Button>
                    </Box>
                    <Dropdown title={title} val={drpValue} />
                    <Box className='selectionDiv bn searchFlex'>
                      <Tablesearch />
                    </Box>
                    <Dropdown title={title1} val={drpValue1} />
                    <Dropdown title={title2} val={drpValue2} />
                    <Dropdown title={title3} val={drpValue3} />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={"maintab2"} sx={{ padding: 0, marginTop: '2rem' }}>
            </TabPanel>
          </TabContext>
        </Box>

        <TableContainer sx={{ MarginTop: 16 }}>
          <Table sx={{ minWidth: '100%' }} className={`table tableData ${props.small}`}>
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                {col.map((colum, index) => (
                  <TableCell key={index}>{colum}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell><span>1</span></TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='symbolName'>
                    <Typography component={'p'}>INFIBEAM</Typography>
                    <Box component={'div'} sx={{ margin: '0 0.5rem' }}>
                      <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0L16.2161 1.03536L17.2464 2.0873L12.077 7.36536L7.47139 2.6626L0 10.2909L0.694474 11L7.47118 4.08139L12.0768 8.78371L17.9405 2.79636L18.9863 3.86405L20 0Z" fill="#008F75" />
                      </svg>
                    </Box>
                    <Typography component={'p'}>14.35</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='symbolStatus'>
                    <Typography component={'label'}>MCC</Typography>
                    <Typography component={'label'}>ON</Typography>
                    <Typography component={'label'}>NILL</Typography>
                  </Box>
                </TableCell>

                <TableCell className='tdp'>
                  <span>5178.66 Cr</span>
                  <span>7y 1m</span>
                </TableCell>
                <TableCell className='tdp'>
                  <span>5178.66 Cr</span>
                  <span>7y 1m</span>
                </TableCell>
                <TableCell className='tdp'>
                  <span>5178.66 Cr</span>
                  <span>7y 1m</span>
                </TableCell>
                <TableCell className='tdp'>
                  --
                </TableCell>
                <TableCell className='tdp'>
                  <span>5178.66 Cr</span>
                  <span>7y 1m</span>
                </TableCell>
                <TableCell className='tdp'>
                  <span>5178.66 Cr</span>
                  <span>7y 1m</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer >
      </Box >
    </>
  )
}
