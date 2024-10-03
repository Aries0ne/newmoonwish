import { Box, Grid, InputBase, Button } from '@mui/material';
import React from 'react';
import Dropdown from '../../Dropdown/Dropdown';
import dummy from '../../../images/dummy.png';
import AdminChart from '../../../Components/AdminChart';

export default function None4() {
  const title = 'Customer';
  const drpValue = ['NSE', 'NSE 1']

  return (
    <>
      <AdminChart title={title} drpValue={drpValue} />
    </>
  )
}
