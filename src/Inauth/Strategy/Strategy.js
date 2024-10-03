import React from 'react';
import { Box, Tab, Grid, Typography, MenuItem, TextField, Select, FormControl, Button, Checkbox, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import './Strategy.scss';
import close from '../../images/close.png';
import StrategyComponenet from '../../Components/StrategyComponent';

export default function Strategy(props) {

  const info = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18C4.03535 18 0 13.9647 0 9C0 4.03535 4.03535 0 9 0C13.9647 0 18 4.03535 18 9C18 13.9647 13.9647 18 9 18ZM9 1.25581C4.73023 1.25581 1.25581 4.73023 1.25581 9C1.25581 13.2698 4.73023 16.7442 9 16.7442C13.2698 16.7442 16.7442 13.2698 16.7442 9C16.7442 4.73023 13.2698 1.25581 9 1.25581Z" fill="currentColor" />
    <path d="M8.99998 10.4651C8.65672 10.4651 8.37207 10.1805 8.37207 9.83721V5.65116C8.37207 5.30791 8.65672 5.02325 8.99998 5.02325C9.34323 5.02325 9.62788 5.30791 9.62788 5.65116V9.83721C9.62788 10.1805 9.34323 10.4651 8.99998 10.4651Z" fill="currentColor" />
    <path d="M8.99981 13.186C8.89097 13.186 8.78213 13.1608 8.68167 13.119C8.5812 13.0771 8.48911 13.0185 8.40539 12.9432C8.33004 12.8594 8.27143 12.7757 8.22957 12.6669C8.18771 12.5664 8.1626 12.4576 8.1626 12.3488C8.1626 12.2399 8.18771 12.1311 8.22957 12.0306C8.27143 11.9301 8.33004 11.8381 8.40539 11.7543C8.48911 11.679 8.5812 11.6204 8.68167 11.5785C8.8826 11.4948 9.11702 11.4948 9.31795 11.5785C9.41841 11.6204 9.5105 11.679 9.59423 11.7543C9.66957 11.8381 9.72818 11.9301 9.77004 12.0306C9.8119 12.1311 9.83702 12.2399 9.83702 12.3488C9.83702 12.4576 9.8119 12.5664 9.77004 12.6669C9.72818 12.7757 9.66957 12.8594 9.59423 12.9432C9.5105 13.0185 9.41841 13.0771 9.31795 13.119C9.21748 13.1608 9.10864 13.186 8.99981 13.186Z" fill="currentColor" />
  </svg>

  const label = { inputProps: { 'aria-label': 'Favourite' } };
  const shares = ['NFO', 'intraday', 'EarnTheta', 'Directional', 'Bullish', 'Bearish', 'TrendFollowing', 'Momentum', 'EventBased', 'Directional', 'Pairs', 'Bullish', 'Bearish', 'Momentum'];
  return (
    <>
      <StrategyComponenet info={info} label={label} shares={shares} cols={props.card} />
    </>
  )
}

