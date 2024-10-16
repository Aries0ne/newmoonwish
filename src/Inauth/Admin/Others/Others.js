import React, { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Addexchange from "./Addexchange/Addexchange";
import Addinstrument from "./Addinstrument/Addinstrument";
import Addsegment from "./Addsegment/Addsegment";
import AdminMarketWatch from "../../Marketwatch/admiwatchlist/AdminMarketWatch";

export default function Others() {
  // admin tab
  const [value, setValue] = React.useState("others1");
  const handleChange = (e, newValue = "string") => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="tabs">
        <TabContext value={value}>
          <TabList className="main-tab" onChange={handleChange}>
            <Tab label="Add Exchange" value={"others1"} />
            <Tab label="Add Segment" value={"others2"} />
            <Tab label="Add Instrument" value={"others3"} />
            <Tab label="Add Admin Watchlist" value={"others4"} />
          </TabList>

          <Box className="tabBox" border={"none !important"}>
            <TabPanel value={"others1"} sx={{ padding: 0 }}>
              <Addexchange />
            </TabPanel>
            <TabPanel value={"others2"} sx={{ padding: 0 }}>
              <Addsegment />
            </TabPanel>
            <TabPanel value={"others3"} sx={{ padding: 0 }}>
              <Addinstrument />
            </TabPanel>
            <TabPanel value={"others4"} sx={{ padding: 0 }}>
              <AdminMarketWatch />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  );
}
