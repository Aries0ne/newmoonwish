import React from 'react';
import Table from '../../Table/Table'
import { Box, Grid, Button, TextField, Typography, Tooltip } from '@mui/material';
import TradeViewComponent from '../../../Components/TradeViewComponent';

const col = ['Broker Id', 'Client Id', 'Mobile Number', 'Customer Id', 'Trade Type ', 'Trade Type', 'Trade Status', 'Qty', 'Loss Limit', 'Profit Limit', 'Set Trail', 'Count Of Stock', 'Strategy Name']
const rows = [
  {
    brokderid: 'MOTILAL OSWAL',
    clientid: 'EHYD226042',
    number: '9321446611',
    customerid: '3451',
    t_type: 'Paper Trade',
    t_type2: 'Bankniftyoption',
    t_status: '1',
    qty: '12',
    ll: '200',
    pl: '1000',
    selltrail: '100',
    cos: '1',
    cossn: 'HLNATGASMINI',
  }
];
export default function Tradeview() {
  return (
    <>
      <TradeViewComponent col={col} rows={rows}/>
    </>
  )
}
