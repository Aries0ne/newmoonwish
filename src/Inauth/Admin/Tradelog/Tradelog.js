import React from 'react';
import { Box, Grid, Tooltip, Button, Typography } from '@mui/material';
import Tablesearch from '../../Tablesearch/Tablesearch';
import Table from '../../Table/Table';
import Dropdown from '../../Dropdown/Dropdown';
import TradelogComponent from '../../../Components/TradelogComponent';

export default function Tradelog() {
  // drop down
  const title = ' ';
  const drpValue = ['Customer ID', 'HGHJG53', 'NJKNK2']

  // drop down
  const title2 = '  ';
  const drpValue2 = ['Suucess', 'Failer']

  // drop down
  const title3 = 'All Strategy';
  const drpValue3 = ['Dcash', 'Tarde 1']

  return (
    <>
      <TradelogComponent 
        title={title}
        drpValue={drpValue}
        title2={title2}
        drpValue2={drpValue2}
        title3={title3}
        drpValue3={drpValue3}
      />
    </>
  )
}
