import RefreshIcon from "@mui/icons-material/Refresh";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import Orderhistory from "../Orderhistory/Orderhistory";
import Position from "../Position/Position";

import TradeDetails from "../TradeDetails/TradeDetails";

const Portfolio = () => {
  const [value, setValue] = useState("openPosition");

  const handleChange = (e, newValue = "string") => {
    setValue(newValue);
  };

  return (
    <Box className="tabs">
      <TabContext value={value}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TabList className="main-tab" onChange={handleChange}>
            <Tab label="Open Position" value="openPosition" />
            <Tab label="Close Position" value="closePosition" />
            <Tab label="Order Book" value="orderBook" />
          </TabList>

          <Tooltip
            arrow
            placement="top"
            title={
              <Typography sx={{ fontSize: "1.4rem" }}>Refresh </Typography>
            }
          >
            <Button className="collapse-btn">
              <RefreshIcon />
            </Button>
          </Tooltip>
        </Box>

        <Box
          sx={{
            // height: "80vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <TabPanel value="openPosition" sx={{ padding: 0 }}>
            <Position />
          </TabPanel>

          <TabPanel
            value="closePosition"
            sx={{ padding: 0, marginTop: "1.5rem" }}
          >
            <Orderhistory />
          </TabPanel>
          <TabPanel value="orderBook" sx={{ padding: 0, marginTop: "1.5rem" }}>
            <TradeDetails />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default Portfolio;
