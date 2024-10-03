import * as React from 'react';
import { Box, Tab, Button, Tooltip, Typography, InputBase } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UploadData from '../Inauth/Dashboard/UploadData/UploadData';
import DownloadData from '../Inauth/Dashboard/DownloadData/DownloadData'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';


export default function DashboardComponent(props) {
  // Main tab
  const [value, setValue] = useState('maintab1');
  const handleChange = (e, newValue = 'string') => {
    setValue(newValue);
  };

  // Equity Sub tab
  // old state 
  // const [subequityvalue, setequitysubValue] = useState('equitysubtab1');

  // new state
  const [subequityvalue, setequitysubValue] = useState('Equitysubtab1');
  const handleChangesubequity = (e, newValue = 'string') => {
    setequitysubValue(newValue);
  };

  // NFO Sub tab
  const [nfosubvalue, setnfosubValue] = useState('nfosubtab1');
  const handleChangesubnfo = (e, newValue = 'string') => {
    setnfosubValue(newValue);
  };

  // NFO Sub tab
  const [mcxsubvalue, setmcxsubValue] = useState('mcxsubtab1');
  const handleChangesubmcx = (e, newValue = 'string') => {
    setmcxsubValue(newValue);
  };

  const download = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Download</Typography >
  const stop = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Stop</Typography >

  return (
    <>
      <Box className='tabs'>
        <TabContext value={value}>
          <TabList className='main-tab' onChange={handleChange}>
            <Tab label="Upload Row Data" value={"maintab1"} />
            <Tab label="Download Row Data" value={"maintab2"} />
            <Tab label="Customize Row Data" value={"maintab3"} />
          </TabList>

          <Box className='tabBox'>
            <TabPanel value={"maintab1"} className='sub-tabs' sx={{ padding: 0 }}>
              <Box className='sub-tabBox'>
                <TabContext value={subequityvalue}>
                  <TabList className='sub-tabs' onChange={handleChangesubequity}>
                    <Tab label="Equity" value={"Equitysubtab1"} />
                    <Tab label="Futures" value={"Equitysubtab2"} />
                    <Tab label="Options" value={"Equitysubtab3"} />
                  </TabList>

                  <TabPanel value={"Equitysubtab1"}>
                    <UploadData />
                  </TabPanel>

                  <TabPanel value={"Equitysubtab2"}>
                    <DownloadData />
                  </TabPanel>

                  <TabPanel value={"Equitysubtab3"}>
                    <Box className='selectiondiv-box'>
                      <Box className='selectionDiv bn space'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker className='datePicker' />
                        </LocalizationProvider>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker className='datePicker' />
                        </LocalizationProvider>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <Button className='customize-btn' variant="text">Validate</Button>
                        <Button className='customize-btn' variant="text" sx={{ marginLeft: 2 }}>Generate Report</Button>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <Tooltip title={download} arrow>
                          <Button className='download-btn solidButton'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 11.6669V15.2224C17 15.6939 16.8127 16.1461 16.4793 16.4795C16.1459 16.8129 15.6937 17.0002 15.2222 17.0002H2.77778C2.30628 17.0002 1.8541 16.8129 1.5207 16.4795C1.1873 16.1461 1 15.6939 1 15.2224V11.6669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M9 11.6667V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Button>
                        </Tooltip >
                        <Tooltip title={stop} arrow>
                          <Button className='download-btn solidButton' sx={{ marginLeft: 2 }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.66667 0H13.3333C14.8 0 16 1.2 16 2.66667V13.3333C16 14.8 14.8 16 13.3333 16H2.66667C1.2 16 0 14.8 0 13.3333V2.66667C0 1.2 1.2 0 2.66667 0Z" fill="white" />
                            </svg>
                          </Button>
                        </Tooltip >
                      </Box>
                    </Box>
                    <DownloadData />
                  </TabPanel>
                </TabContext>
              </Box>
            </TabPanel>
            <TabPanel value={"maintab2"} className='sub-tabs' sx={{ padding: 0 }}>
              <Box className='sub-tabBox'>
                <TabContext value={nfosubvalue}>
                  <TabList className='sub-tabs' onChange={handleChangesubnfo}>
                    <Tab label="Equity" value={"nfosubtab1"} />
                    <Tab label="Futures" value={"nfosubtab2"} />
                    <Tab label="Options" value={"nfosubtab3"} />
                  </TabList>

                  <TabPanel value={"nfosubtab1"}>
                    <UploadData />
                  </TabPanel>

                  <TabPanel value={"nfosubtab2"}>
                    <DownloadData />
                  </TabPanel>

                  <TabPanel value={"nfosubtab3"}>
                    <Box className='selectiondiv-box'>
                      <Box className='selectionDiv bn space'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker className='datePicker' />
                        </LocalizationProvider>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker className='datePicker' />
                        </LocalizationProvider>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <Button className='customize-btn' variant="text">Validate</Button>
                        <Button className='customize-btn' variant="text" sx={{ marginLeft: 2 }}>Generate Report</Button>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <Tooltip title={download} arrow>
                          <Button className='download-btn solidButton'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 11.6669V15.2224C17 15.6939 16.8127 16.1461 16.4793 16.4795C16.1459 16.8129 15.6937 17.0002 15.2222 17.0002H2.77778C2.30628 17.0002 1.8541 16.8129 1.5207 16.4795C1.1873 16.1461 1 15.6939 1 15.2224V11.6669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M9 11.6667V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Button>
                        </Tooltip >
                        <Tooltip title={stop} arrow>
                          <Button className='download-btn solidButton' sx={{ marginLeft: 2 }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.66667 0H13.3333C14.8 0 16 1.2 16 2.66667V13.3333C16 14.8 14.8 16 13.3333 16H2.66667C1.2 16 0 14.8 0 13.3333V2.66667C0 1.2 1.2 0 2.66667 0Z" fill="white" />
                            </svg>
                          </Button>
                        </Tooltip >
                      </Box>
                    </Box>
                    <DownloadData />
                  </TabPanel>
                </TabContext>
              </Box>
            </TabPanel>
            <TabPanel value={"maintab3"} className='sub-tabs' sx={{ padding: 0 }}>
              <Box className='sub-tabBox'>
                <TabContext value={mcxsubvalue}>
                  <TabList className='sub-tabs' onChange={handleChangesubmcx}>
                    <Tab label="Equity " value={"mcxsubtab1"} />
                    <Tab label="Futures" value={"mcxsubtab2"} />
                    <Tab label="Options" value={"mcxsubtab3"} />
                  </TabList>

                  <TabPanel value={"mcxsubtab1"}>
                    <UploadData />
                  </TabPanel>

                  <TabPanel value={"mcxsubtab2"}>
                    <DownloadData />
                  </TabPanel>

                  <TabPanel value={"mcxsubtab3"}>
                    <Box className='selectiondiv-box'>
                      <Box className='selectionDiv bn space'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker className='datePicker' />
                        </LocalizationProvider>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker className='datePicker' />
                        </LocalizationProvider>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <Button className='customize-btn' variant="text">Validate</Button>
                        <Button className='customize-btn' variant="text" sx={{ marginLeft: 2 }}>Generate Report</Button>
                      </Box>
                      <Box className='selectionDiv bn space'>
                        <Tooltip title={download} arrow>
                          <Button className='download-btn solidButton'>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 11.6669V15.2224C17 15.6939 16.8127 16.1461 16.4793 16.4795C16.1459 16.8129 15.6937 17.0002 15.2222 17.0002H2.77778C2.30628 17.0002 1.8541 16.8129 1.5207 16.4795C1.1873 16.1461 1 15.6939 1 15.2224V11.6669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M9 11.6667V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Button>
                        </Tooltip >
                        <Tooltip title={stop} arrow>
                          <Button className='download-btn solidButton' sx={{ marginLeft: 2 }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.66667 0H13.3333C14.8 0 16 1.2 16 2.66667V13.3333C16 14.8 14.8 16 13.3333 16H2.66667C1.2 16 0 14.8 0 13.3333V2.66667C0 1.2 1.2 0 2.66667 0Z" fill="white" />
                            </svg>
                          </Button>
                        </Tooltip >
                      </Box>
                    </Box>
                    <DownloadData />
                  </TabPanel>
                </TabContext>
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  )
}
