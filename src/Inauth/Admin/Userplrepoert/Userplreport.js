import React, { useState } from "react";
import { Box, Grid, Button, Typography, Tooltip } from "@mui/material";
import CloudSyncIcon from "@mui/icons-material/CloudSync";
import Tablesearch from "../../Tablesearch/Tablesearch";
import Table from "../../Table/Table";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dropdown from "../../Dropdown/Dropdown";
import UserplReportComponent from "../../../Components/UserplReportComponent";
import { useDispatch } from "react-redux";
import { segmentList } from "../../../Components/segmentList";

const col = ["Customer ID", "P&L", "Total Buy Oty", "Total Sell Oty"];

const rows = [
  { Customerid: "BANKNIFTY2310542900PE", pl: 100, buyqut: 120, totalsell: 200 },
  {
    Customerid: "MOTILAL OSWAL",
    pl: "Paper Trade",
    buyqut: "BANKNIFTY2310542900PE",
    totalsell: 200,
  },
  {
    Customerid: "MOTILAL OSWAL",
    pl: "Paper Trade",
    buyqut: "BANKNIFTY2310542900PE",
    totalsell: 200,
  },
  {
    Customerid: "MOTILAL OSWAL",
    pl: "Paper Trade",
    buyqut: "BANKNIFTY2310542900PE",
    totalsell: 200,
  },
  {
    Customerid: "MOTILAL OSWAL",
    pl: "Paper Trade",
    buyqut: "BANKNIFTY2310542900PE",
    totalsell: 200,
  },
  {
    Customerid: "MOTILAL OSWAL",
    pl: "Paper Trade",
    buyqut: "BANKNIFTY2310542900PE",
    totalsell: 200,
  },
  {
    Customerid: "MOTILAL OSWAL",
    pl: "Paper Trade",
    buyqut: "BANKNIFTY2310542900PE",
    totalsell: 200,
  },
  {
    Customerid: "MOTILAL OSWAL",
    pl: "Paper Trade",
    buyqut: "BANKNIFTY2310542900PE",
    totalsell: 200,
  },
];

export default function Userplreport() {
  const dispatch = useDispatch();

  const [tradeType, setTradeType] = useState("Live Trade");
  const [segment, setSegment] = useState("select");
  const [strategy, setStrategy] = useState("select");
  const [referalCode, setReferalCode] = useState("All");
  const [profitLoss, setProfitLoss] = useState("Both");

  // drop down
  const tradeTypeTitle = "Type";
  const tradeTypeValues = ["Live Trade", "Paper Trade"];

  // drop down
  const plType = "P&L";
  const plTypeValues = ["Both", "Loss", "High"];

  // drop down
  const segmentType = "Segment";
  const segmentTypeValues = ["select"].concat(segmentList);

  // drop down
  const strategyType = "All Strategy";
  const strategyTypeValues = ["RSI", "Dcash", "Mooonwish"];

  // drop down
  const referType = "ReferCode";
  const referTypeValues = ["All", "HGHJG53", "NJKNK2"];

  const handleSegment = (event) => {
    setSegment(event.target.value);
  };

  const handleReferalCode = (event) => {
    setReferalCode(event.target.value);
  };

  const handleStrategy = (event) => {
    setStrategy(event.target.value);
  };

  const handleType = (event) => {
    setTradeType(event.target.value);
  };

  const handleProfitLoss = (event) => {
    setProfitLoss(event.target.value);
  };

  return (
    <>
      <UserplReportComponent
        col={col}
        rows={rows}
        tradeTypeTitle={tradeTypeTitle}
        tradeTypeValues={tradeTypeValues}
        plType={plType}
        plTypeValues={plTypeValues}
        segmentType={segmentType}
        segmentTypeValues={segmentTypeValues}
        strategyType={strategyType}
        strategyTypeValues={strategyTypeValues}
        referType={referType}
        referTypeValues={referTypeValues}
        tradeType={tradeType}
        segment={segment}
        strategy={strategy}
        referalCode={referalCode}
        profitLoss={profitLoss}
        handleStrategy={handleStrategy}
        handleSegment={handleSegment}
        handleType={handleType}
        handleReferalCode={handleReferalCode}
        handleProfitLoss={handleProfitLoss}
      />
    </>
  );
}
