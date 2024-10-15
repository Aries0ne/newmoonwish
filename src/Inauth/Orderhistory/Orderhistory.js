import React, { useEffect, useState } from "react";
import OrderComponent from "../../Components/OrderComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  liveOrderDetails,
  paperOrderDetails,
} from "../../redux/actions/positionAction";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import moment from "moment";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortIcon from "@mui/icons-material/Sort";

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

export default function Orderhistory() {
  const [liveOrderData, setLiveOrderData] = useState();
  const [paperOrderData, setPaperOrderData] = useState();
  const [tradeType, setTradeType] = useState("live");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortentryprice, setSortentryprice] = useState("none"); // asc, desc, none
  const [sortexitprice, setSortexitprice] = useState("none"); // asc, desc, none
  const [sortprofit, setSortprofit] = useState("none"); // asc, desc, none
  const [sortsymbolname, setSortSymbolName] = useState("none"); // asc, desc, none
  const [sorttrend, setSortTrend] = useState("none"); // asc, desc, none
  const [sortBuyQty, setSortBuyQty] = useState("none"); // asc, desc, none
  const [sortSellQty, setSortSellQty] = useState("none"); // asc, desc, none
  const [sortOrderId, setSortOrderId] = useState("none"); // asc, desc, none
  const [sortOrdType, setSortOrdType] = useState("none"); // asc, desc, none
  const [trend, setTrend] = useState("Select");
  const [filterOrderType, setFilterOrderType] = useState("Select");

  const trendOptions = ["Select", "Buy", "Sell"];
  const orderTypeOptions = ["Select", "Market", "Limit", "SL", "SL-M"];

  const dispatch = useDispatch();

  useEffect(() => {
    if (tradeType == "paper") {
      dispatch(paperOrderDetails());
    } else {
      dispatch(liveOrderDetails());
    }
  }, [tradeType]);

  const liveOrder = useSelector((state) => state.Position.liveorderdetails);
  const paperOrder = useSelector((state) => state.Position.paperorderdetails);

  // Toggle sorting order
  const toggleSortentryprice = () => {
    if (sortentryprice === "asc") {
      setSortentryprice("desc");
    } else if (sortentryprice === "desc") {
      setSortentryprice("none");
    } else {
      setSortentryprice("asc");
    }
  };

  const toggleSortexitprice = () => {
    if (sortexitprice === "asc") {
      setSortexitprice("desc");
    } else if (sortexitprice === "desc") {
      setSortexitprice("none");
    } else {
      setSortexitprice("asc");
    }
  };

  const toggleSortprofit = () => {
    if (sortOrdType === "asc") {
      setSortprofit("desc");
    } else if (sortOrdType === "desc") {
      setSortprofit("none");
    } else {
      setSortprofit("asc");
    }
  };

  const toggleSortsymbolname = () => {
    if (sortsymbolname === "asc") {
      setSortSymbolName("desc");
    } else if (sortsymbolname === "desc") {
      setSortSymbolName("none");
    } else {
      setSortSymbolName("asc");
    }
  };

  const toggleSorttrend = () => {
    if (sorttrend === "asc") {
      setSortTrend("desc");
    } else if (sorttrend === "desc") {
      setSortTrend("none");
    } else {
      setSortTrend("asc");
    }
  };

  const toggleSortBuyQty = () => {
    if (sortBuyQty === "asc") {
      setSortBuyQty("desc");
    } else if (sortBuyQty === "desc") {
      setSortBuyQty("none");
    } else {
      setSortBuyQty("asc");
    }
  };

  const toggleSortSellQty = () => {
    if (sortSellQty === "asc") {
      setSortSellQty("desc");
    } else if (sortSellQty === "desc") {
      setSortSellQty("none");
    } else {
      setSortSellQty("asc");
    }
  };

  const toggleSortOrderId = () => {
    if (sortOrderId === "asc") {
      setSortOrderId("desc");
    } else if (sortOrderId === "desc") {
      setSortOrderId("none");
    } else {
      setSortOrderId("asc");
    }
  };

  const toggleSortOrdType = () => {
    if (sortOrdType === "asc") {
      setSortOrdType("desc");
    } else if (sortOrdType === "desc") {
      setSortOrdType("none");
    } else {
      setSortOrdType("asc");
    }
  };

  const col = [
    
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Symbol Name
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSortsymbolname}>
          {sortsymbolname === "none" && <SortIcon />}
          {sortsymbolname === "desc" && <ArrowDownwardIcon />}
          {sortsymbolname === "asc" && <ArrowUpwardIcon />}
        </Button>
      </Tooltip>
    </Box>,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Trend
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSorttrend}>
          {sorttrend === "none" && <SortIcon />}
          {sorttrend === "desc" && <ArrowDownwardIcon />}
          {sorttrend === "asc" && <ArrowUpwardIcon />}
        </Button>
      </Tooltip>
    </Box>,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      EntryPrice
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSortentryprice}>
          {sortentryprice === "none" && <SortIcon />}
          {sortentryprice === "desc" && <ArrowDownwardIcon />}
          {sortentryprice === "asc" && <ArrowUpwardIcon />}
        </Button>
      </Tooltip>
    </Box>,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      BuyQty
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSortBuyQty}>
          {sortBuyQty === "none" && <SortIcon />}
          {sortBuyQty === "desc" && <ArrowDownwardIcon />}
          {sortBuyQty === "asc" && <ArrowUpwardIcon />}
        </Button>
      </Tooltip>
    </Box>,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      ExitPrice
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSortexitprice}>
          {sortexitprice === "none" && <SortIcon />}
          {sortexitprice === "desc" && <ArrowDownwardIcon />}
          {sortexitprice === "asc" && <ArrowUpwardIcon />}
        </Button>
      </Tooltip>
    </Box>,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      SellQty
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSortSellQty}>
          {sortSellQty === "none" && <SortIcon />}
          {sortSellQty === "desc" && <ArrowDownwardIcon />}
          {sortSellQty === "asc" && <ArrowUpwardIcon />}
        </Button>
      </Tooltip>
    </Box>,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Profit
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSortprofit}>
          {sortprofit === "none" && <SortIcon />}
          {sortprofit === "desc" && <ArrowDownwardIcon />}
          {sortprofit === "asc" && <ArrowUpwardIcon />}
        </Button>
      </Tooltip>
    </Box>,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      OrderId
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSortOrderId}>
          {sortOrderId === "none" && <SortIcon />}
          {sortOrderId === "desc" && <ArrowDownwardIcon />}
          {sortOrderId === "asc" && <ArrowUpwardIcon />}
        </Button>
      </Tooltip>
    </Box>,
    // <Box
    //   sx={{
    //     display: "flex",
    //     gap: "0.5rem",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   OrdType
    //   <Tooltip
    //     placement="top"
    //     title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
    //   >
    //     <Button sx={{ padding: 0, minWidth: 0 }} onClick={toggleSortOrdType}>
    //       {sortOrdType === "none" && <SortIcon />}
    //       {sortOrdType === "desc" && <ArrowDownwardIcon />}
    //       {sortOrdType === "asc" && <ArrowUpwardIcon />}
    //     </Button>
    //   </Tooltip>
    // </Box>,
    "Date",
    "Status",
  ];
  const message = (
    <Typography component={"p"} sx={{ fontSize: "1.4rem" }}>
      Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est,
      vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper
      arcu. Nullam eget est sed sem iaculis gravida eget vitae justo.
    </Typography>
  );

  const commonLiveArr = (data) => {
    let newData = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      newData.push({
        symbol: element.symbol,
        Trend: (
          <span
            className={
              element?.side?.toLowerCase() === "buy" ||
              element.side?.toLowerCase() === "b"
                ? "up"
                : "down"
            }
          >
            {element?.side?.toLowerCase() === "buy" ||
            element.side?.toLowerCase() === "b"
              ? "BUY"
              : "SELL"}
          </span>
        ),
        entryPrice: element.buyprice,
        buyQty: element.buyquantity,
        exitPrice: element.sellprice,
        sellQty: element.sellquantity,
        profit: (
          <span className={element.profit < 0 ? "close" : "open"}>
            {Number(element.profit).toFixed(2)}
            {element.profit < 0 ? down : up}
          </span>
        ),
        orderId: element.orderid,
        // ordType: element.prctyp,
        date: moment(element.date).format("DD-MM-YYYY HH:mm"),
        status: (
          <span
            style={{
              color: `${
                element.status === "pending" ? "var(--color-danger)" : "#24a959"
              }`,
            }}
          >
            {element.status}
          </span>
        ),
      });
    }

    return newData;
  };

  const commonPaperArr = (data) => {
    let newData = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      newData.push({
        symbol: element.symbol,
        Trend: (
          <span className={element.side === "BUY" ? "up" : "down"}>
            {element.side}
          </span>
        ),
        OrderID: element.orderid,
        QTY: element.buyprice,
        ExitPrice: element.sellprice,
        DateTime: element.date,
        Status: (
          <span className={element.status === "COMPLETE" ? "open" : "close"}>
            {element.status}
          </span>
        ),
        OrderType: element.product,
        RejectionReason: (
          <Tooltip title={message} arrow placement="left">
            <Button className="rejectMessage">
              <MessageIcon sx={{ color: "#fff !important" }} />
            </Button>
          </Tooltip>
        ),
      });
    }

    return newData;
  };

  useEffect(() => {
    let newData = commonLiveArr(liveOrder);

    setLiveOrderData(newData);
  }, [liveOrder]);

  useEffect(() => {
    let newData = commonPaperArr(paperOrder);

    setPaperOrderData(newData);
  }, [paperOrder]);

  //sort data
  useEffect(() => {
    const clonedLiveTrades = [...liveOrder];

    clonedLiveTrades.sort((a, b) => {
      // console.log('a, b :>> ', a, b);
      if (sortentryprice === "asc") {
        return a.buyprice - b.buyprice;
      } else if (sortentryprice === "desc") {
        return b.buyprice - a.buyprice;
      } else if (sortexitprice === "asc") {
        return a.sellprice - b.sellprice;
      } else if (sortexitprice === "desc") {
        return b.sellprice - a.sellprice;
      } else if (sortprofit === "asc") {
        return a.profit - b.profit;
      } else if (sortprofit === "desc") {
        return b.profit - a.profit;
      } else if (sortsymbolname === "asc") {
        return a.symbol.localeCompare(b.symbol);
      } else if (sortsymbolname === "desc") {
        return b.symbol.localeCompare(a.symbol);
      } else if (sorttrend === "asc") {
        return a.side.localeCompare(b.side);
      } else if (sorttrend === "desc") {
        return b.side.localeCompare(a.side);
      } else if (sortBuyQty === "asc") {
        return a.buyquantity - b.buyquantity;
      } else if (sortBuyQty === "desc") {
        return b.buyquantity - a.buyquantity;
      } else if (sortSellQty === "asc") {
        return a.sellquantity - b.sellquantity;
      } else if (sortSellQty === "desc") {
        return b.sellquantity - a.sellquantity;
      } else if (sortOrderId === "asc") {
        return a.orderid - b.orderid;
      } else if (sortOrderId === "desc") {
        return b.orderid - a.orderid;
      } else if (sortOrdType === "asc") {
        return a.prctyp.localeCompare(b.prctyp);
      } else if (sortOrdType === "desc") {
        return b.prctyp.localeCompare(a.prctyp);
      }

      return a.id - b.id;
    });

    const newData = commonLiveArr(clonedLiveTrades);
    setLiveOrderData(newData);
  }, [
    liveOrder,
    sortprofit,
    sortexitprice,
    sortentryprice,
    sortsymbolname,
    sorttrend,
    sortBuyQty,
    sortSellQty,
    sortOrderId,
    sortOrdType,
  ]);

  const handleTradeType = (e, newValue) => {
    setTradeType(newValue);
    setSearch("");
  };

  useEffect(() => {
    const trendData = !trend || trend?.toLowerCase() === "select" ? "" : trend;
    const orderTypeData =
      !filterOrderType || filterOrderType?.toLowerCase() === "select"
        ? ""
        : filterOrderType;

    let filterData;
    if (trendData === "Buy")
      filterData = liveOrder?.filter(
        (item) =>
          (item?.side?.toLowerCase() === "b" ||
            item?.side?.toLowerCase() === "buy") &&
          item.symbol.toLowerCase().includes(search.toLowerCase()) &&
          item?.prctyp?.toLowerCase().includes(orderTypeData?.toLowerCase())
      );
    else if (trendData === "Sell") {
      filterData = liveOrder.filter(
        (item) =>
          (item?.side?.toLowerCase() === "s" ||
            item?.side?.toLowerCase() === "sell") &&
          item.symbol.toLowerCase().includes(search.toLowerCase()) &&
          item?.prctyp?.toLowerCase().includes(orderTypeData?.toLowerCase())
      );
    } else {
      filterData = liveOrder.filter(
        (item) =>
          item?.prctyp?.toLowerCase().includes(orderTypeData?.toLowerCase()) &&
          item.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    let newData = commonLiveArr(filterData);
    setLiveOrderData(newData);
  }, [trend, filterOrderType, search]);

  const handlePaperSearch = (event) => {
    if (event.target.value.length > 0) {
      let filterData = paperOrder.filter((item) =>
        item.symbol.toLowerCase().includes(search.toLowerCase())
      );
      let newData = commonPaperArr(filterData);

      setPaperOrderData(newData);
    } else {
      let newData = commonPaperArr(paperOrder);

      setPaperOrderData(newData);
    }
  };

  const handleLiveSearch = (event) => {
    if (event.target.value.length > 0) {
      let filterData = liveOrder.filter((item) =>
        item.symbol.toLowerCase().includes(search.toLowerCase())
      );
      let newData = commonLiveArr(filterData);

      setLiveOrderData(newData);
    } else {
      let newData = commonLiveArr(liveOrder);

      setLiveOrderData(newData);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    if (tradeType == "paper") {
      handlePaperSearch(event);
    }
    if (tradeType == "live") {
      handleLiveSearch(event);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTrend = (e) => {
    setTrend(e?.target?.value);
  };

  const handleOrderType = (e) => {
    setFilterOrderType(e?.target?.value);
  };

  return (
    <>
      <OrderComponent
        trendOptions={trendOptions}
        handleTrend={handleTrend}
        trend={trend}
        orderType={filterOrderType}
        handleOrderType={handleOrderType}
        orderTypeOptions={orderTypeOptions}
        col={col}
        liveOrderData={liveOrderData}
        paperOrderData={paperOrderData}
        handleTradeType={handleTradeType}
        tradeType={tradeType}
        handleSearch={handleSearch}
        search={search}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
