import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFund } from "../../redux/actions/authActions";
import { BrokerStatus } from "../../redux/actions/brokerAction";

export default function Funview() {
  const [fundInfo, setFundInfo] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFund());
  }, []);

  useEffect(() => {
    dispatch(BrokerStatus());
  }, []);

  const fundData = useSelector((state) => state?.Auth?.fundData);
  const userData = useSelector((state) => state?.Auth?.authProfile?.[0]);
  const brokerData = useSelector((state) => state.Broker.brokerstatus?.[0]);

  console.log("userData, brokerData", userData, brokerData);

  return (
    <>
      <Box className="fundview_box">
        <List className="profile-content">
          <ListItem sx={{ textAlign: "center" }}>
            <Typography component="p">Available Margin</Typography>
            <Typography component="h5" className="fund_margin">
              INR {fundData?.remain}
            </Typography>
          </ListItem>
        </List>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className="fund_view_status">
              <Typography component="p">Opening Balance</Typography>
              <Typography component="h5">INR {fundData?.available}</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="fund_view_status">
              <Typography component="p">Margin Used</Typography>
              <Typography component="h5">INR {fundData?.used}</Typography>
            </Box>
          </Grid>
        </Grid>

        <List className="profile-details">
          <ListItem>
            <Typography component="p">Client ID</Typography>
            <Typography component="p">{brokerData?.uid}</Typography>
          </ListItem>
          <ListItem>
            <Typography component="p">Broker</Typography>
            <Typography component="p">{brokerData?.brokername}</Typography>
          </ListItem>
          <ListItem>
            <Typography component="p">User Name</Typography>
            <Typography component="p">{userData?.firstname}</Typography>
          </ListItem>
          <ListItem>
            <Typography component="p">Mobile No.</Typography>
            <Typography component="p">{userData?.phone}</Typography>
          </ListItem>
        </List>

        <Box className="fundView_note">
          <Typography component={"p"}>Notes:</Typography>
          <Typography component={"span"}>
            This is only for view, for deposit & withdraw your funds use your
            broker account.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
