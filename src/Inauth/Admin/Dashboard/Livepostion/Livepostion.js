import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Tooltip,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Tablesearch from "../../../Tablesearch/Tablesearch";
import Table from "../../../Table/Table";
// import close from "../../../images/close.png";
import Dropdown from "../../../Dropdown/Dropdown";
import CloseIcon from "@mui/icons-material/Close";
import LivePositionComponent from "../../../../Components/LivePositionComponent";
import { useDispatch, useSelector } from "react-redux";
import { adminLivePosition } from "../../../../redux/actions/adminActions";
import { useState } from "react";

const down = (
  <svg
    width="10"
    height="5"
    viewBox="0 0 10 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.93119 1.20379L6.83498 3.30389L5.55506 4.59274C5.01304 5.13575 4.13146 5.13575 3.58945 4.59274L0.206783 1.20379C-0.237274 0.758914 0.0827077 0 0.703081 0H4.36655H8.43489C9.0618 0 9.37525 0.758914 8.93119 1.20379Z"
      fill="#FF231F"
    />
  </svg>
);

const up = (
  <svg
    width="10"
    height="5"
    viewBox="0 0 10 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.93119 3.79621L6.83498 1.69611L5.55506 0.407262C5.01304 -0.135754 4.13146 -0.135754 3.58945 0.407262L0.206783 3.79621C-0.237274 4.24109 0.0827077 5 0.703081 5H4.36655H8.43489C9.0618 5 9.37525 4.24109 8.93119 3.79621Z"
      fill="#008F75"
    />
  </svg>
);

export default function Livepostion() {
  // drop down
  const title = "All Trade Type";
  const drpValue = ["Dail", "Weekly", "Yearly"];

  // drop down
  const title2 = "All Strategy";
  const drpValue2 = ["select", "RSI", "Dcash"];

  // drop down
  const title3 = "All P&L";
  const drpValue3 = ["BOTH", "Loss", "Profit"];

  const col = [
    "Broker Id",
    "Trade Type",
    "Symbol Name",
    "Price",
    "Buy Qty",
    // "Sell Qty",
    // "Enter Price",
    // "Exit Price",
    // "Buy ID",
    // "Sell ID",
    "Strategy Name",
    "LTP",
    "P&L"
  ];
  const rows = [
    {
      brokerid: "MOTILAL OSWAL",
      TradeType: "Paper Trade",
      SymbolName: "BANKNIFTY2310542900PE",
      BuyQty: 200,
      SellQty: 100,
      EnterPrice: 15103,
      ExitPrice: 17513,
      BuyID: 1504,
      SellID: 1504,
      sn: "HLNATGASMINI",
      LTP: 100,
    },
  ];

  const [stratergy, setStratergy] = useState("select");
  const [pnl, setPnl] = useState("BOTH");
  const [adminlivedata, setAdminLivedata] = useState();
  const dispatch = useDispatch();

  const handelStratergy = (event) => {
    setStratergy(event.target.value)
  }

  const handelPnl = (event) => {
    setPnl(event.target.value)
  }

  const handelSubmit = () => {
    dispatch(adminLivePosition({ stratergy, pnl }));
  }

  useEffect(() => {
    handelSubmit();
  }, [])

  const AdminLivePosition = useSelector((state) => state.Admin.adminliveposition);
  useEffect(() => {
    let newArr = [];

    for (let index = 0; index < AdminLivePosition.length; index++) {
      const element = AdminLivePosition[index];
      newArr.push({
        brokerid: "MOTILAL OSWAL",
        TradeType: element.tradetype,
        SymbolName: element.symbol,
        Price: element.price,
        BuyQty: element.quantity,
        // SellQty: 100,
        // EnterPrice: 15103,
        // ExitPrice: 17513,
        // BuyID: 1504,
        // SellID: 1504,
        sn: element.strategy,
        LTP: element.liveprice,
        PNL: <span className={element.profit < 0 ? "close" : "open"}>{element.profit}{element.profit < 0 ? down : up}</span>,
      })

    }

    setAdminLivedata(newArr);
  }, [AdminLivePosition])

  return (
    <>
      <LivePositionComponent
        col={col}
        rows={rows}
        title={title}
        drpValue={drpValue}
        title2={title2}
        drpValue2={drpValue2}
        title3={title3}
        drpValue3={drpValue3}
        handelStratergy={handelStratergy}
        handelPnl={handelPnl}
        handelSubmit={handelSubmit}
        adminlivedata={adminlivedata}
      />
    </>
  );
}
