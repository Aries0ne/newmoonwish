import React, { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Dashboard from "../Inauth/Admin/Dashboard/Dashboard";
import Userview from "../Inauth/Admin/Dashboard/Userview/Userview";
import Tradedetails from "../Inauth/Admin/Dashboard/Tradedetails/Tradedetails";
import Livepostion from "../Inauth/Admin/Dashboard/Livepostion/Livepostion";
import Paperpostion from "../Inauth/Admin/Dashboard/Paperpostion/Paperpostion";
import Orderhistory from "../Inauth/Admin/Orderhistory/Orderhistory";
import Userplreport from "../Inauth/Admin/Partnerreport/Userplrepoert/Userplreport";
import Plview from "../Inauth/Admin/Plview/Plview";
import Bussinesreport from "../Inauth/Admin/Partnerreport/Bussinesreport/Bussinesreport";
import Vendorreferal from "../Inauth/Admin/Vendorreferal/Vendorreferal";
import Pushalert from "../Inauth/Admin/Notification/Pushalert/Pushalert";
import Tradelog from "../Inauth/Admin/Tradelog/Tradelog";
import Autologin from "../Inauth/Admin/Autologin/Autologin";
import Tradeview from "../Inauth/Admin/Tradeview/Tradeview";
import Alert from "../Inauth/Admin/Alert/Alert";
import None1 from "../Inauth/Admin/None1/None1";
import Strategyalert from "../Inauth/Admin/Strategy/Strategyalert/Strategyalert";
import None3 from "../Inauth/Admin/None3/None3";
import Strategybuilder from "../Inauth/Admin/Strategy/Strategybuilder/Strategybuilder";
import { useLocation, useNavigate } from "react-router-dom";
import Indicators from "../Inauth/Admin/Indicators/Indicators";
import Symbol from "../Inauth/Admin/Symbol/Symbol";
import Partnerreport from "../Inauth/Admin/Partnerreport/Partnerreport";
import Notification from "../Inauth/Admin/Notification/Notification";
import Strategy from "../Inauth/Admin/Strategy/Strategy";
import CreateStrategy from "../Inauth/Admin/CreateStrategy";
import Others from "../Inauth/Admin/Others/Others";


const AdminComponent = () => {
  // admin tab
  const location = useLocation();
  const [value, setValue] = React.useState('admintab1');
  const handleChange = (e, newValue = 'string') => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="tabs">
        <TabContext value={value}>
          <TabList className='main-tab' onChange={handleChange}>
            <Tab label="Dashboard" value={"admintab1"} />
            <Tab label="Report" value={"admintab2"} />
            <Tab label="Notification" value={"admintab3"} />
            <Tab label="Strategy " value={"admintab4"} />
            <Tab label="Create Strategy " value={"admintab5"} />
            <Tab label="Others" value={"admintab6"} />
          </TabList>

          <Box className='tabBox' border={'none !important'}>
            <TabPanel value={"admintab1"} sx={{ padding: 0 }}><Dashboard /></TabPanel>
            <TabPanel value={"admintab2"} sx={{ padding: 0 }}><Partnerreport /></TabPanel>
            <TabPanel value={"admintab3"} sx={{ padding: 0 }}><Notification /></TabPanel>
            <TabPanel value={"admintab4"} sx={{ padding: 0 }}><Strategy /></TabPanel>
            <TabPanel value={"admintab5"} sx={{ padding: 0 }}><CreateStrategy /></TabPanel>
            <TabPanel value={"admintab6"} sx={{ padding: 0 }}><Others /></TabPanel>
          </Box>
        </TabContext>
      </Box>

      {/* <Box className="tabs"> */}
      {/* <TabContext value={value}> */}
      {/* <TabList className="main-tab" onChange={handleChange}> */}
      {/* <Tab label="Dashboard" value={"dashboard"} /> */}
      {/* <Tab label="User view" value={"userView"} />
            <Tab label="Trade Details" value={"tradeDetails"} /> */}
      {/* <Tab label="Live Position" value={"livePosition"} />
            <Tab label="Paper Position" value={"paperPosition"} /> */}
      {/* <Tab label="Order History" value={"orderHistory"} />
            <Tab label="User P&L Report" value={"plReport"} /> */}
      {/* <Tab label="User P&L View" value={"plView"} /> */}
      {/* <Tab label="Business Report" value={"buisnessReport"} /> */}
      {/* <Tab label="Vendor Referral" value={"vendorReferal"} />
            <Tab label="App Push Alert" value={"pushAlert"} />
            <Tab label="Trade Logs" value={"tradeLogs"} />
            <Tab label="Auto Login" value={"autoLogin"} />
            <Tab label="Trade View" value={"admintab14"} /> */}
      {/* <Tab label="None 1" value={"admintab16"} /> */}
      {/* <Tab label="Strategy Alert" value={"strategyAlert"} /> */}
      {/* <Tab label="None 3" value={"admintab18"} /> */}
      {/* <Tab label="Strategy Builder" value={"strategyBuilder"} /> */}
      {/* <Tab label="Indicators" value={"indicators"} /> */}
      {/* <Tab label="Upload & Download Row Data " value={"UploadRowData"} /> */}
      {/* <Tab label="Symbol" value={"Symbol"} />
          </TabList> */}

      {/* <Box className="tabBox" border={"none !important"}> */}
      {/* <TabPanel value={"dashboard"} sx={{ padding: 0 }}>
              <Dashboard />
            </TabPanel> */}
      {/* <TabPanel value={"userView"} sx={{ padding: 0 }}>
              <Userview />
            </TabPanel> */}
      {/* <TabPanel value={"tradeDetails"} sx={{ padding: 0 }}>
              <Tradedetails />
            </TabPanel> */}
      {/* <TabPanel value={"livePosition"} sx={{ padding: 0 }}>
              <Livepostion />
            </TabPanel>
            <TabPanel value={"paperPosition"} sx={{ padding: 0 }}>
              <Paperpostion />
            </TabPanel> */}
      {/* <TabPanel value={"orderHistory"} sx={{ padding: 0 }}>
              <Orderhistory />
            </TabPanel>
            <TabPanel value={"plReport"} sx={{ padding: 0 }}>
              <Userplreport />
            </TabPanel> */}
      {/* <TabPanel value={"plView"} sx={{ padding: 0 }}>
              <Plview />
            </TabPanel> */}
      {/* <TabPanel value={"buisnessReport"} sx={{ padding: 0 }}>
              <Bussinesreport />
            </TabPanel> */}
      {/* <TabPanel value={"vendorReferal"} sx={{ padding: 0 }}>
              <Vendorreferal />
            </TabPanel>
            <TabPanel value={"pushAlert"} sx={{ padding: 0 }}>
              <Pushalert />
            </TabPanel>
            <TabPanel value={"tradeLogs"} sx={{ padding: 0 }}>
              <Tradelog />
            </TabPanel>
            <TabPanel value={"autoLogin"} sx={{ padding: 0 }}>
              <Autologin />
            </TabPanel>
            <TabPanel value={"admintab14"} sx={{ padding: 0 }}>
              <Tradeview />
            </TabPanel> */}
      {/* <TabPanel value={"admintab16"} sx={{ padding: 0 }}>
            <None1 />
          </TabPanel> */}
      {/* <TabPanel value={"strategyAlert"} sx={{ padding: 0 }}>
            <Strategyalert />
          </TabPanel> */}
      {/* <TabPanel value={"admintab18"} sx={{ padding: 0 }}>
            <None3 />
          </TabPanel> */}
      {/* <TabPanel value={"strategyBuilder"} sx={{ padding: 0 }}>
              <Strategybuilder />
            </TabPanel> */}
      {/* <TabPanel value={"indicators"} sx={{ padding: 0 }}>
            <Indicators />
          </TabPanel> */}
      {/* <TabPanel value={"UploadRowData"} sx={{ padding: 0 }}>
              <UploadData />
            </TabPanel> */}
      {/* <TabPanel value={"Symbol"} sx={{ padding: 0 }}>
              <Symbol />
            </TabPanel>
          </Box>
        </TabContext>
      </Box> */}
    </>
  );
};

export default AdminComponent;
