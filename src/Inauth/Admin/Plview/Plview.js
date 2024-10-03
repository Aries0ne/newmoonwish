import React from 'react';
import { Box, Grid, Button, Tooltip, Typography } from '@mui/material';
import Tablesearch from '../../Tablesearch/Tablesearch';
import Table from '../../Table/Table';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dropdown from '../../Dropdown/Dropdown';
import PlviewComponent from '../../../Components/PlviewComponent';

const col = ['Customer ID', 'P&L', 'Total Buy Oty', 'Total Sell Oty']
const rows = [
  { Customerid: 'BANKNIFTY2310542900PE', pl: 100, buyqut: 120, totalsell: 200, },
  { Customerid: 'MOTILAL OSWAL', pl: 'Paper Trade', buyqut: 'BANKNIFTY2310542900PE', totalsell: 200, },
  { Customerid: 'MOTILAL OSWAL', pl: 'Paper Trade', buyqut: 'BANKNIFTY2310542900PE', totalsell: 200, },
  { Customerid: 'MOTILAL OSWAL', pl: 'Paper Trade', buyqut: 'BANKNIFTY2310542900PE', totalsell: 200, },
  { Customerid: 'MOTILAL OSWAL', pl: 'Paper Trade', buyqut: 'BANKNIFTY2310542900PE', totalsell: 200, },
  { Customerid: 'MOTILAL OSWAL', pl: 'Paper Trade', buyqut: 'BANKNIFTY2310542900PE', totalsell: 200, },
  { Customerid: 'MOTILAL OSWAL', pl: 'Paper Trade', buyqut: 'BANKNIFTY2310542900PE', totalsell: 200, },
  { Customerid: 'MOTILAL OSWAL', pl: 'Paper Trade', buyqut: 'BANKNIFTY2310542900PE', totalsell: 200, },
];

export default function Plview() {
  // drop down
  const title = ' ';
  const drpValue = ['Customer ID', 'HGHJG53', 'NJKNK2']

  // drop down
  const title2 = '  ';
  const drpValue2 = ['Live Trade Orders', 'Tarde 1']

  // drop down
  const title4 = ' All';
  const drpValue4 = ['nifty Option', 'nifty Option 1']

  // drop down
  const title5 = ' All Strategy';
  const drpValue5 = ['Dcash', 'Dcash 2', 'NJKNK2']

  return (
    <>
      <PlviewComponent
        col={col}
        rows={rows}
        title={title}
        drpValue={drpValue}
        title2={title2}
        drpValue2={drpValue2}
        title4={title4}
        drpValue4={drpValue4}
        title5={title5}
        drpValue5={drpValue5}
      />
    </>
  )
}
