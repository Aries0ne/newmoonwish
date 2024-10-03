import * as React from "react";
import "./Dropdown.scss";
import { MenuItem, Select, FormControl, Box, Typography } from "@mui/material";

export default function Tableaction(props) {
  return (
    <>
      <Box
        className="selectionDiv   scroll"
        sx={{
          display: { xs: "flex" },
          marginLeft: { xs: "0 !important" },
        }}
      >
        <Typography component={"p"}>{props.title} &nbsp;</Typography>
        <FormControl className="dropdown-ap">
          <Select
            value={props.value}
            onChange={props.handleChange}
            className="dropdown"
            displayEmpty
            renderValue={
              props.value !== ""
                ? undefined
                : () => <Typography sx={{ opacity: 0.5 }}>Select</Typography>
            }
            disabled={props?.disabled}
          >
            {props?.val?.map((vals, index) => (
              <MenuItem value={vals} key={index}>
                {vals}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
