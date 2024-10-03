import React, { useEffect, useState } from "react";
import OrderHistoryComponent from "../../../Components/OrderHistoryComponent";
import { adminLiveOrderData } from "../../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import MessageIcon from "@mui/icons-material/Message";
import { Button, Tooltip, Typography } from "@mui/material";

export default function Orderhistory() {
  const dispatch = useDispatch();
  const [liveOrderData, setLiveOrderData] = useState([]);
  const [clientId, setClientId] = useState("");

  const liveOrderDetails = useSelector((State) => State.Admin.liveOrderData);

  useEffect(() => {
    handleSearch();
  }, []);

  const message = (message) => {
    return (
      <Typography component={"p"} sx={{ fontSize: "1.4rem" }}>
        {message}
      </Typography>
    );
  };

  const handleSearch = () => {
    let obj = {};

    if (clientId.length > 0) {
      obj["client"] = clientId;
    }
    dispatch(adminLiveOrderData(obj));
  };

  const handleClientId = (event) => {
    setClientId(event.target.value);
  };

  useEffect(() => {
    let liveOrders = [];
    if (liveOrderDetails && liveOrderDetails.length > 0) {
      for (let i = 0; i < liveOrderDetails.length; i++) {
        const data = liveOrderDetails[i];

        let obj = {
          symbolName: data?.symbol,
          trend: (
            <span className={data?.side == "BUY" ? "up" : "down"}>
              {data?.side}
            </span>
          ),
          orderId: data?.orderid,
          qty: data?.sellquantity,
          exitPrice: data?.sellprice,
          time: "15-05-2023 / 14:21:11:8",
          status: (
            <span className={data?.status == "COMPLETE" ? "open" : "close"}>
              {data?.status}
            </span>
          ),
          orderType: data?.product,
          remark: (
            <Tooltip title={message("testing")} arrow placement="left">
              <Button className="rejectMessage">
                {" "}
                <MessageIcon sx={{ color: "#fff !important" }} />
              </Button>
            </Tooltip>
          ),
        };

        liveOrders.push(obj);
      }
    }
    setLiveOrderData(liveOrders);
  }, [liveOrderDetails]);

  const col = [
    "Symbol Name",
    "Trend",
    "Order ID",
    "Qty",
    "Exit Price",
    "Date/Time",
    "Status",
    "Order Type",
    "Rejection Reason",
  ];

  const rows = [
    {
      brokerid: "BANKNIFTY2310542900PE",
      TradeType: <span className="down">Sell</span>,
      SymbolName: "230104000209323",
      BuyQty: 150,
      SellQty: 118.8,
      EnterPrice: "15-05-2023 / 14:21:11:8",
      ExitPrice: <span className="open">Complete</span>,
      BuyID: "MIS",
      SellID: (
        <Tooltip title={message} arrow placement="left">
          <Button className="rejectMessage">
            {" "}
            <MessageIcon sx={{ color: "#fff !important" }} />
          </Button>
        </Tooltip>
      ),
    },
    {
      brokerid: "BANKNIFTY2310542900PE",
      TradeType: <span className="up">Buy</span>,
      SymbolName: "230104000209323",
      BuyQty: 150,
      SellQty: 118.8,
      EnterPrice: "15-05-2023 / 14:21:11:8",
      ExitPrice: <span className="open">Complete</span>,
      BuyID: "MIS",
      SellID: (
        <Tooltip title={message} arrow placement="left">
          <Button className="rejectMessage">
            <MessageIcon sx={{ color: "#fff !important" }} />
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <OrderHistoryComponent
        col={col}
        rows={liveOrderData}
        handleSearch={handleSearch}
        handleClientId={handleClientId}
      />
    </>
  );
}
