import * as React from "react";
import "../../Dropdown/Dropdown.scss";
import {
  MenuItem,
  Select,
  FormControl,
  Box,
  OutlinedInput,
  Typography,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function Autoselect(props) {
  const drpchnage = (event) => {
    props.handleExpiryChange(event.target.value);
  };

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "100%",
    padding: "0 2.5rem 0 0",
    "& svg": { marginRight: 1.5 },
    "& p": { fontSize: "1.4rem" },
    "& p.up": {
      color: "#0071F3 !important",
      display: "flex",
      alignItems: "center",
    },
    "&  p.down": {
      color: "#FF231F !important",
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <>
      <Box className="selectiondiv-box" sx={{ width: "100%" }}>
        <Box className="selectionDiv border fullWidth scroll Mui-select2">
          <FormControl className="dropdown-ap" sx={{ width: "100%" }}>
            <Select
              value={props.futureExpiryData}
              onChange={(e) => drpchnage(e)}
              displayEmpty
              className="dropdown"
              renderValue={
                props.futureExpiryData !== ""
                  ? undefined
                  : () => <Typography sx={{ opacity: 0.5 }}>Select</Typography>
              }
            >
              {props.val.map((items, index) => (
                <MenuItem
                  className="MuiMenu-item2"
                  value={items.token}
                  key={index}
                >
                  <Box sx={style}>
                    <Typography component={"p"}>{items.expiry}</Typography>
                    <Typography component={"p"} className={"up"}>
                      <TrendingUpIcon />
                      {parseFloat(items.price).toFixed(2)}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
