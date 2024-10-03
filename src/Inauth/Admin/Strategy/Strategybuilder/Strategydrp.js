import React, { useState } from 'react';
import { Box, Tab, Grid, Typography, MenuItem, TextField, Select, FormControl, Button, Checkbox, Dialog, DialogContent, DialogContentText } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function Strategydrp(props) {
  const [drpValue, setdrpValue] = useState(" ");

  // Dropdown tab
  const drpValueChange = (event) => {
    setdrpValue(event.target.value);
  };
  return (
    <>
      <Box className="formBox">
        <Box className="formItems" sx={{ marginBottom: '0 !important' }}>
          <Typography component={'label'} className='label'>{props.drpTitle}</Typography>
          <Box className="selectionDiv">
            <FormControl className="dropdown-ap" sx={{ width: "100%" }}>
              <Select
                value={drpValue}
                onChange={drpValueChange}
                className="dropdown"
              >
                {props.drpvals.map((vals, index) => (
                  <MenuItem value={index === 0 ? ' ' : index} key={index}>
                    {vals}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  )
}
