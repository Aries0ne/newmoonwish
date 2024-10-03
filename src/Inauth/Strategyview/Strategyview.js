import React, { useEffect } from "react";
import Entrytarget from "./Entrytarget";
import Stoploss from "./Stoploss";
import Info from "./Info";
import Update from "./Update";
import Highlow from "./Highlow";
import Exerderbook from "./Exerderbook";
import Turnover from "./Turnover";
import { Box, Grid, Typography } from "@mui/material";
import "./Strategyview.scss";
import {
  getBankNiftyDetails,
  getUserBankNifty,
} from "../../redux/actions/adminActions";
import { generatePopup } from "../../utils/popup";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

export default function Strategyview() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankNiftyDetails());
  }, []);

  useEffect(() => {
    dispatch(getUserBankNifty()).then((res) => {
      console.log("res", res);
      if (res?.length === 0) {
        generatePopup("error", "Your Strategy is Not activated");
      }
    });
  }, []);

  const data = useSelector((state) => state?.Admin?.bankniftyDetails?.[0]);
  const userBanknifty = useSelector(
    (state) => state?.Admin?.userBankNifty?.[0]
  );
  console.log("data", data, userBanknifty);

  return (
    <>
      <Box component={"div"} className="strategy_view_date">
        <Box component={"div"} className="strategy_view_dateItem">
          <Typography component={"p"}>Calculation For</Typography>
        </Box>
        <Box component={"div"} className="strategy_view_dateItem">
          <Typography component={"p"}>
            {dayjs().format("DD-MMM-YYYY")}
          </Typography>
        </Box>
        <Box component={"div"} className="strategy_view_dateItem">
          <Typography component={"p"}>Wed</Typography>
        </Box>
        <Box component={"div"} className="strategy_view_dateItem">
          <Typography component={"p"}>04:00 PM</Typography>
        </Box>
      </Box>
      <Update data={data} userBanknifty={userBanknifty} />
      <Entrytarget data={data} userBanknifty={userBanknifty} />
      <Grid container spacing={1.5}>
        <Grid item xs={12} md={8}>
          <Stoploss data={data} userBanknifty={userBanknifty} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Info />
        </Grid>
      </Grid>
      <Highlow data={data} userBanknifty={userBanknifty} />
      <Exerderbook />
      <Turnover />
    </>
  );
}
