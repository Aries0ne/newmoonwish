import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Box, InputBase, Button, Tooltip } from '@mui/material';
import '../../Table/Table.scss'

export default function DownloadData() {
  const download = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Download File</Typography >
  const downloadAll = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Download All File</Typography>
  const upload = <Typography component={'p'} sx={{ fontSize: '1.4rem' }}>Upload File</Typography >

  const downloadsvg = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 11.6669V15.2224C17 15.6939 16.8127 16.1461 16.4793 16.4795C16.1459 16.8129 15.6937 17.0002 15.2222 17.0002H2.77778C2.30628 17.0002 1.8541 16.8129 1.5207 16.4795C1.1873 16.1461 1 15.6939 1 15.2224V11.6669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 11.6667V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

  const uploadsvg = <svg width="18" height="18" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 8.3335V12.3335C1 13.0699 1.59695 13.6668 2.33333 13.6668H11.6667C12.4031 13.6668 13 13.0699 13 12.3335V8.3335" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.33333 10.3333V1M7.33333 1L4 4.62964M7.33333 1L10.6667 4.62963" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: '100%', marginTop: 1 }} className='table tableData'>
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2}>Sr No.</TableCell>
              <TableCell rowSpan={2}>Symbol Name</TableCell>
              <TableCell rowSpan={1} colSpan={3} sx={{ fontWeight: '600 !important' }}>1 Min Data</TableCell>
              <TableCell rowSpan={1} colSpan={3} sx={{ fontWeight: '600 !important' }}>Daily Data</TableCell>
              <TableCell rowSpan={1} colSpan={7} sx={{ fontWeight: '600 !important' }}>Output Data</TableCell>
            </TableRow>
            <TableRow>
              {/* 1 min Data */}
              <TableCell>Start Date</TableCell>
              <TableCell>Last Update Date</TableCell>
              <TableCell>Download / Upload File</TableCell>
              {/* Daily data */}
              <TableCell>Start Date</TableCell>
              <TableCell>Last Update Date</TableCell>
              <TableCell>Download / Upload File</TableCell>
              {/* Output Data */}
              <TableCell>Mismatch Data</TableCell>
              <TableCell>Revised 1 Min Data</TableCell>
              <TableCell>Consecutive 1 Min Data</TableCell>
              <TableCell>Revised 1 Min To Daily Data</TableCell>
              <TableCell>Final Multiple Time Frame Data : EOD</TableCell>
              <TableCell>Final Multiple Time Frame Data : EOD & Intraday</TableCell>
              <TableCell>Download All Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              <TableCell >1</TableCell>
              <TableCell>NSE : ACC</TableCell>
              <TableCell>05-30-2023</TableCell>
              <TableCell>05-30-2023</TableCell>
              <TableCell>
                <Tooltip title={download} arrow placement="top">
                  <Button className='downloadData'>{downloadsvg}</Button>
                </Tooltip>
              </TableCell>
              <TableCell>NA</TableCell>
              <TableCell>NA</TableCell>
              <TableCell>
                <Tooltip title={upload} arrow placement="top">
                  <Typography className='fileUpload' component={'label'} margin={'0 !important'} >{uploadsvg}
                    <InputBase type='file' sx={{ marginRight: '2.5rem' }} />
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>NA</TableCell>
              <TableCell>NA</TableCell>
              <TableCell>
                <Tooltip title={download} arrow placement="top">
                  <Button className='downloadData'>{downloadsvg}</Button>
                </Tooltip>
              </TableCell>
              <TableCell>05-30-2023</TableCell>
              <TableCell>NA</TableCell>
              <TableCell>
                <Tooltip title={download} arrow placement="top">
                  <Button className='downloadData'>{downloadsvg}</Button>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={download} arrow placement="top">
                  <Button className='downloadData'>{downloadsvg}</Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer >
    </>
  )
}
