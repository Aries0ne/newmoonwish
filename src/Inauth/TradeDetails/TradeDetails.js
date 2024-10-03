import React from "react";
import TradeDetailComponent from "../../Components/TradeDetailComponent";
import { useState } from "react";
import {
  deletePositionOrder,
  liveTradeDetails,
  modifyOrder,
  squareOffLivePosition,
} from "../../redux/actions/positionAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import close from "../../images/close.png";
import {
  Box,
  Button,
  Tooltip,
  Typography,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  InputBase,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import moment from "moment";
import Tableaction from "../Tableaction/Tableaction";
import "./TradeDetails.scss";
import Dropdown from "../Dropdown/Dropdown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortIcon from "@mui/icons-material/Sort";
import { generatePopup } from "../../utils/popup";
import Popover from "@mui/material/Popover";
import "./TradeDetails.scss";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const TradeDetails = () => {
  const edit = <Typography sx={{ fontSize: "1.4rem" }}>Edit</Typography>;
  const save = <Typography sx={{ fontSize: "1.4rem" }}>Save</Typography>;
  const del = <Typography sx={{ fontSize: "1.4rem" }}>Delete</Typography>;
  const orderTypValues = ["LIMIT", "SL", "SL-M"];
  const trendOptions = ["Select", "Buy", "Sell"];
  const orderTypeOptions = ["Select", "Market", "Limit", "SL", "SL-M"];
  const exchangeList = ["ALL", "NSE", "NFO", "CDS", "MCX"];
  const trendList = ["BOTH", "BUY", "SELL"];
  const OrderTypeList = ["ALL", "MARKET", "LIMIT", "SL", "SL-M"];
  const statusList = ["ALL", "COMPLETED", "PENDING", "CANCELLED", "REJECTED"];

  const dispatch = useDispatch();
  const [tradeType, setTradeType] = useState("live");
  const [trend, setTrend] = useState("Select");
  const [filterOrderType, setFilterOrderType] = useState("Select");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [liveTradeData, setLiveTradeData] = useState([]);
  const [paperTradeData, setPaperTradeData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteopen, setDeleteopen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [prc, setPrc] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [orderType, setOrderType] = useState("MARKET");
  const [orderid, setOrderId] = useState();
  const [buysell, setBuysell] = useState("");
  const [stock, setStock] = useState();
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("none");
  const [sortExchange, setSortExchange] = useState("none");
  const [sortsymbolname, setSortSymbolName] = useState("none");
  const [sorttrend, setSortTrend] = useState("none");
  const [sortOrdType, setSortOrdType] = useState("none");
  const [sortTriggerPrice, setSortTriggerPrice] = useState("none");
  const [sortQty, setSortQty] = useState("none");
  const [sortExecutedPrice, setExecutedPrice] = useState("none");
  const [sortOrderId, setOrderIds] = useState("none");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const [menu, setMenu] = useState({});

  const liveTrades = useSelector((state) => state.Position.liveTradeDetails);

  // const match = liveTrades.filter((e) => e.id === orderid)
  const match = Array.isArray(liveTrades)
    ? liveTrades.filter((e) => e.id === orderid)
    : [];

  // select all checkbox function
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelected = liveTradeData.map((row) => row.id);
      setSelected(newSelected);
      setSelectAll(true);
    } else {
      setSelected([]);
      setSelectAll(false);
    }
  };

  const handleSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    setSelectAll(newSelected.length === liveTradeData.length);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Toggle sorting order
  const toggleSortOrder = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("none");
    } else {
      setSortOrder("asc");
    }
  };

  const toggleSortExchange = () => {
    if (sortExchange === "asc") {
      setSortExchange("desc");
    } else if (sortExchange === "desc") {
      setSortExchange("none");
    } else {
      setSortExchange("asc");
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClosefilter = () => {
    setAnchorEl(null);
  };
  const handleClosefilter2 = () => {
    setAnchorEl2(null);
  };
  const handleClosefilter3 = () => {
    setAnchorEl3(null);
  };
  const handleClosefilter4 = () => {
    setAnchorEl4(null);
  };

  // const toggleSorttrend = () => {
  //   if (sorttrend === "asc") {
  //     setSortTrend("desc");
  //   } else if (sorttrend === "desc") {
  //     setSortTrend("none");
  //   } else {
  //     setSortTrend("asc");
  //   }
  // };

  // const toggleSortOrdType = () => {
  //   if (sortOrdType === "asc") {
  //     setSortOrdType("desc");
  //   } else if (sortOrdType === "desc") {
  //     setSortOrdType("none");
  //   } else {
  //     setSortOrdType("asc");
  //   }
  // };

  // const toggleSortTriggerPrice = () => {
  //   if (sortTriggerPrice === "asc") {
  //     setSortTriggerPrice("desc");
  //   } else if (sortTriggerPrice === "desc") {
  //     setSortTriggerPrice("none");
  //   } else {
  //     setSortTriggerPrice("asc");
  //   }
  // };

  // const toggleSortQty = () => {
  //   if (sortQty === "asc") {
  //     setSortQty("desc");
  //   } else if (sortQty === "desc") {
  //     setSortQty("none");
  //   } else {
  //     setSortQty("asc");
  //   }
  // };

  const handleClose = () => {
    setOpen(false);
  };

  // const toggleSortExecutedPrice = () => {
  //   if (sortExecutedPrice === "asc") {
  //     setExecutedPrice("desc");
  //   } else if (sortExecutedPrice === "desc") {
  //     setExecutedPrice("none");
  //   } else {
  //     setExecutedPrice("asc");
  //   }
  // };

  // const toggleSortOrderId = () => {
  //   if (sortOrderId === "asc") {
  //     setOrderIds("desc");
  //   } else if (sortOrderId === "desc") {
  //     setOrderIds("none");
  //   } else {
  //     setOrderIds("asc");
  //   }
  // };

  const handleMenuChange = (name, e) => {
    setMenu((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const openEl = Boolean(anchorEl);
  const openEl2 = Boolean(anchorEl2);
  const openEl3 = Boolean(anchorEl3);
  const openEl4 = Boolean(anchorEl4);
  const col = [
    <Checkbox
      checked={selectAll}
      onChange={handleSelectAll}
      sx={{ "& .MuiSvgIcon-root": { fontSize: 24 }, padding: 0 }}
    />,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Exchange
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={handleClick}>
          <SortIcon />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openEl}
        value={menu?.exchange}
        onClose={handleClosefilter}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {exchangeList?.map((e) => (
          <MenuItem
            onClick={() => {
              handleMenuChange("exchange", e);
            }}
            selected={menu?.exchange === e}
            value={e}
          >
            {e}
          </MenuItem>
        ))}
      </Menu>
    </Box>,
    "Symbol",
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
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={handleClick2}>
          <SortIcon />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu2"
        anchorEl={anchorEl2}
        open={openEl2}
        onClose={handleClosefilter2}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {trendList?.map((e) => (
          <MenuItem
            onClick={() => {
              handleMenuChange("trend", e);
            }}
            selected={menu?.trend === e}
            value={e}
          >
            {e}
          </MenuItem>
        ))}
      </Menu>
    </Box>,
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Order Type
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={handleClick3}>
          <SortIcon />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu3"
        anchorEl={anchorEl3}
        open={openEl3}
        onClose={handleClosefilter3}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {OrderTypeList?.map((e) => (
          <MenuItem
            onClick={() => {
              handleMenuChange("orderType", e);
            }}
            selected={menu?.orderType === e}
            value={e}
          >
            {e}
          </MenuItem>
        ))}
      </Menu>
    </Box>,
    "Product Type",
    "Price",
    "Trigger Price",
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Status
      <Tooltip
        placement="top"
        title={<Typography sx={{ fontSize: "1.3rem" }}>Sort Data</Typography>}
      >
        <Button sx={{ padding: 0, minWidth: 0 }} onClick={handleClick4}>
          <SortIcon />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu4"
        anchorEl={anchorEl4}
        open={openEl4}
        onClose={handleClosefilter4}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {statusList?.map((e) => (
          <MenuItem
            onClick={() => {
              handleMenuChange("status", e);
            }}
            selected={menu?.status === e}
            value={e}
          >
            {e}
          </MenuItem>
        ))}
      </Menu>
    </Box>,
    "Reason",
    "Quantity",
    "Executed Price",
    "OrderId",
    "Date & Time",
    // "PrdType",
    // "Strategy",
    "Actions",
  ];

  useEffect(() => {
    const trendData = !trend || trend?.toLowerCase() === "select" ? "" : trend;
    const orderTypeData =
      !filterOrderType || filterOrderType?.toLowerCase() === "select"
        ? ""
        : filterOrderType;

    let filterData;
    if (trendData === "Buy")
      filterData = liveTrades?.filter(
        (item) =>
          (item?.side?.toLowerCase() === "b" ||
            item?.side?.toLowerCase() === "buy") &&
          item.symbol.toLowerCase().includes(search.toLowerCase()) &&
          item?.prctyp?.toLowerCase().includes(orderTypeData?.toLowerCase())
      );
    else if (trendData === "Sell") {
      filterData = liveTrades.filter(
        (item) =>
          (item?.side?.toLowerCase() === "s" ||
            item?.side?.toLowerCase() === "sell") &&
          item.symbol.toLowerCase().includes(search.toLowerCase()) &&
          item?.prctyp?.toLowerCase().includes(orderTypeData?.toLowerCase())
      );
    } else {
      filterData = liveTrades.filter(
        (item) =>
          item?.prctyp?.toLowerCase().includes(orderTypeData?.toLowerCase()) &&
          item.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
    let newData = commonLiveArr(filterData);
    setLiveTradeData(newData);
  }, [trend, filterOrderType, search]);

  const handleTrend = (e) => {
    // if (e?.target?.value?.length > 0) {
    //   const { value } = e?.target;
    //   let filterData;
    //   if (value === "Buy")
    //     filterData = liveTrades?.filter(
    //       (item) =>
    //         item?.side?.toLowerCase() === "b" ||
    //         item?.side?.toLowerCase() === "buy"
    //     );
    //   else if (value === "Sell") {
    //     filterData = liveTrades.filter(
    //       (item) =>
    //         item?.side?.toLowerCase() === "s" ||
    //         item?.side?.toLowerCase() === "sell"
    //     );
    //   } else {
    //     filterData = liveTrades;
    //   }
    //   let newData = commonLiveArr(filterData);
    //   setLiveTradeData(newData);
    // } else {
    //   let newData = commonLiveArr(liveTrades);
    //   setLiveTradeData(newData);
    // }
    setTrend(e?.target?.value);
  };

  const handleOrderType = (e) => {
    setFilterOrderType(e?.target?.value);
  };
  const rows = [];

  const handleSubmit = () => {
    if (orderType?.toUpperCase() === "SL") {
      if (!prc) {
        return generatePopup("error", "Please enter Price.");
      }
      if (!trigger) {
        return generatePopup("error", "Please enter Trigger Price.");
      }
      if (buysell?.toLowerCase() === "buy") {
        if (trigger < stock?.limitprice) {
          return generatePopup(
            "error",
            "Trigger Price should be above than CMP."
          );
        }
        if (prc < trigger) {
          return generatePopup(
            "error",
            "Price Should be Equal or Above than Trigger Price."
          );
        }
      }
      if (buysell?.toLowerCase() === "sell") {
        if (trigger > stock?.limitprice) {
          return generatePopup(
            "error",
            "Trigger Price should be below than CMP."
          );
        }
        if (trigger < prc) {
          return generatePopup(
            "error",
            "Price Should be Equal or Less than Trigger Price."
          );
        }
      }
    }
    if (orderType?.toLowerCase() === "limit") {
      if (buysell?.toLowerCase() === "buy") {
        if (prc > stock?.limitprice) {
          return generatePopup("error", "Enter Price Should be below CMP");
        }
      }
      if (buysell?.toLowerCase() === "sell") {
        if (prc < stock?.limitprice) {
          return generatePopup("error", "Enter Price Should be Above CMP");
        }
      }
    }
    if (orderType?.toLowerCase() === "sl-m") {
      if (buysell?.toLowerCase() === "buy") {
        if (trigger < stock?.limitprice) {
          return generatePopup(
            "error",
            "Trigger Price should be above than CMP"
          );
        }
      }
      if (buysell?.toLowerCase() === "sell") {
        if (trigger > stock?.limitprice) {
          return generatePopup(
            "error",
            "Trigger Price should be below than CMP"
          );
        }
      }
    }
    let obj = {
      id: orderid,
      prctyp: orderType.toUpperCase(),
      prc: Number(prc),
      trp: orderType?.toUpperCase() === "LIMIT" ? Number(prc) : Number(trigger),
      qty: quantity,
    };
    dispatch(modifyOrder(obj)).then((res) => {
      if (res?.status === 200) {
        dispatch(liveTradeDetails());
        if (orderType === "MARKET" && stock?.type1 === "Exit") {
          dispatch(squareOffLivePosition({ id: stock?.id }));
        }
      }
    });
    setOpen(false);
    setOrderId("");
    setPrc(0);
    setQuantity(0);
    setTrigger(0);
  };

  const handleDelete = () => {
    dispatch(deletePositionOrder({ id: orderid })).then((res) => {
      if (res?.status === 200) {
        dispatch(liveTradeDetails());
      }
    });
    setDeleteopen(false);
    setOrderId("");
  };

  const handleTradeType = (e, newValue) => {
    if (newValue === "paper" || newValue === "live") {
      setTradeType(newValue);
    }
    setSearch("");
  };

  //   const handlePaperSearch = (event) => {
  //     if (event.target.value.length > 0) {
  //       let filterData = paperOrder.filter((item) =>
  //         item.symbol.toLowerCase().includes(search.toLowerCase())
  //       );
  //       let newData = commonPaperArr(filterData);

  //       setPaperOrderData(newData);
  //     } else {
  //       let newData = commonPaperArr(paperOrder);

  //       setPaperOrderData(newData);
  //     }
  //   };

  const handleLiveSearch = (event) => {
    if (event.target.value.length > 0) {
      let filterData = liveTrades.filter((item) =>
        item.symbol.toLowerCase().includes(search.toLowerCase())
      );
      let newData = commonLiveArr(filterData);

      setLiveTradeData(newData);
    } else {
      let newData = commonLiveArr(liveTrades);

      setLiveTradeData(newData);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    // if (tradeType == "paper") {
    //   handlePaperSearch(event);
    // }
    // if (tradeType == "live") {
    //   handleLiveSearch(event);
    // }
  };

  const message = (data) => (
    <Typography component={"p"} sx={{ fontSize: "1.4rem" }}>
      {data}
    </Typography>
  );

  const price = (element) => {
    if (
      element?.status?.toLowerCase() === "complete" ||
      element?.status?.toLowerCase() === "completed" ||
      element?.status?.toLowerCase() === "fully executed"
    ) {
      return element?.limitprice;
    } else if (
      element?.status?.toLowerCase() === "pending" ||
      element?.status?.toLowerCase() === "cancelled"
    ) {
      if (
        element?.prctyp?.toUpperCase() === "SL" ||
        element?.prctyp?.toUpperCase() === "LIMIT"
      ) {
        return element?.price;
      } else if (element?.prctyp?.toUpperCase() === "SL-M") {
        return element?.trp;
      }
    }
  };

  const commonLiveArr = (data) => {
    let newData = [];

    data = data.reverse();

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      newData.push({
        id: element?.id,
        checkbox: (
          <Checkbox
            onChange={() => handleSelect(element?.id)}
            checked={isSelected(element?.id)}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 24 }, padding: 0 }}
          />
        ),
        exchange: element.exchange,
        symbol: element.symbol,
        trend: (
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
        OrderType: element?.prctyp,
        ProductType: element?.product,
        price: price(element),
        // element?.status?.toLowerCase() === "complete" ||
        // element?.status?.toLowerCase() === "completed" ||
        // element?.status?.toLowerCase() === "fullyexecuted"
        //   ? element.limitprice
        //   : element?.price,
        TriggerPrice:
          element?.prctyp === "SL"
            ? element?.trp
            : element?.prctyp === "SL-M"
            ? element?.price
            : "0",
        status: (
          <span className={element.status == "COMPLETE" ? "up" : "down"}>
            {element.status}
          </span>
        ),
        message: (
          <Tooltip title={message(element.remark)} arrow placement="left">
            <Button
              className="rejectMessage"
              sx={{ height: "3rem", width: "3rem" }}
            >
              <MessageIcon sx={{ color: "#fff !important" }} />
            </Button>
          </Tooltip>
        ),
        qty: element.quantity,
        Executed_Price:
          element?.status?.toLowerCase() === "complete" ||
          element?.status?.toLowerCase() === "completed" ||
          element?.status?.toLowerCase() === "fully executed" ||
          element?.status?.toLowerCase() === "fullyexecuted"
            ? element?.price
            : "-",
        orderId: element.orderid,
        date: moment(element.date).format("DD-MM-YYYY HH:mm"),
        // prdType: element.prctyp,
        // strategy: element.stratergy,
        action: (
          <Tableaction
            status={element.status}
            handleClickOpen={() => handleClickOpen(element)}
            handleDeleteClickOpen={() => handleDeleteClickOpen(element?.id)}
          />
        ),
      });
    }
    return newData;
  };

  useEffect(() => {
    let newData = commonLiveArr(liveTrades);

    setLiveTradeData(newData);
  }, [liveTrades, selected]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (tradeType == "live") {
      dispatch(liveTradeDetails());
    } else {
      //   dispatch(liveOrderDetails());
    }
  }, [tradeType]);

  //modal open/close
  const handleClickOpen = (e) => {
    setBuysell(e?.side);
    setOrderType(e?.prctyp);
    setOrderId(e?.id);
    setOpen(true);
    setPrc(Number(e?.price));
    setQuantity(Number(e?.quantity));
    setTrigger(Number(e?.trp));
    setStock(e);
  };

  const handleDeleteClickOpen = (id) => {
    setOrderId(id);
    setDeleteopen(true);
  };
  const handleDeleteClose = () => {
    setDeleteopen(false);
  };
  const handleCancelClose = () => {
    setCancelOpen(false);
  };
  const handleClickOpen3 = () => {
    setCancelOpen(true);
  };

  const handleCancel = () => {
    console.log("cancelled :>> ");
  };

  const handleOrderTypChange = (e) => {
    setOrderType(e.target.value);
  };

  useEffect(() => {
    const clonedLiveTrades = [...liveTrades];

    clonedLiveTrades.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "desc") {
        return b.price - a.price;
      } else if (sortExchange === "asc") {
        return a.exchange.localeCompare(b.exchange);
      } else if (sortExchange === "desc") {
        return b.exchange.localeCompare(a.exchange);
      } else if (sortsymbolname === "asc") {
        return a.symbol.localeCompare(b.symbol);
      } else if (sortsymbolname === "desc") {
        return b.symbol.localeCompare(a.symbol);
      }
      // else if (sortOrdType === 'asc') {
      //   return a.side.localeCompare(b.side);
      // } else if (sortOrdType === 'desc') {
      //   return b.side.localeCompare(a.side);
      // }
      else if (sorttrend === "asc") {
        return a.side.localeCompare(b.side);
      } else if (sorttrend === "desc") {
        return b.side.localeCompare(a.side);
      }
      // else if (sortTriggerPrice === 'asc') {
      //   return a.buyquantity - b.buyquantity;
      // } else if (sortTriggerPrice === 'desc') {
      //   return b.buyquantity - a.buyquantity;
      // }
      else if (sortQty === "asc") {
        return a.quantity - b.quantity;
      } else if (sortQty === "desc") {
        return b.quantity - a.quantity;
      }
      // else if (sortExecutedPrice === 'asc') {
      //   return a.orderid - b.orderid;
      // } else if (sortExecutedPrice === 'desc') {
      //   return b.orderid - a.orderid;
      // }
      else if (sortOrderId === "asc") {
        return a.orderid - b.orderid;
      } else if (sortOrderId === "desc") {
        return b.orderid - a.orderid;
      }

      return a.id - b.id;
    });

    const newData = commonLiveArr(clonedLiveTrades);
    setLiveTradeData(newData);
  }, [
    liveTrades,
    sortOrder,
    sortExchange,
    sortsymbolname,
    sorttrend,
    sortOrdType,
    sortTriggerPrice,
    sortQty,
    sortExecutedPrice,
    sortOrderId,
  ]);

  return (
    <>
      <TradeDetailComponent
        trendOptions={trendOptions}
        handleTrend={handleTrend}
        trend={trend}
        orderType={filterOrderType}
        handleOrderType={handleOrderType}
        orderTypeOptions={orderTypeOptions}
        col={col}
        rows={tradeType == "live" ? liveTradeData : paperTradeData}
        handleTradeType={handleTradeType}
        tradeType={tradeType}
        handleSearch={handleSearch}
        search={search}
        handleClickOpen3={handleClickOpen3}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
        selected={selected}
      />
      {/* delete modal */}
      <Dialog
        open={deleteopen}
        onClose={handleDeleteClose}
        className="commonModal squareOff"
      >
        <Box className="modalHeader" sx={{ justifyContent: "end" }}>
          <Typography component={"h4"}>Cancel</Typography>
          <Button onClick={handleDeleteClose} className="closeModal">
            <img src={close} />
          </Button>
        </Box>
        <DialogContent sx={{ padding: "0" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Box className="alertIcons">
              <svg
                width="1052"
                height="1052"
                viewBox="0 0 1052 1052"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M558 334C558 316.3 543.7 302 526 302C508.3 302 494 316.3 494 334V590C494 607.7 508.3 622 526 622C543.7 622 558 607.7 558 590V334ZM526 750C536.609 750 546.783 745.786 554.284 738.284C561.786 730.783 566 720.609 566 710C566 699.391 561.786 689.217 554.284 681.716C546.783 674.214 536.609 670 526 670C515.391 670 505.217 674.214 497.716 681.716C490.214 689.217 486 699.391 486 710C486 720.609 490.214 730.783 497.716 738.284C505.217 745.786 515.391 750 526 750Z"
                  fill="#4987FE"
                />
                <circle
                  cx="526"
                  cy="526"
                  r="507"
                  stroke="#5086EE"
                  stroke-width="38"
                />
              </svg>
            </Box>
            <Typography
              component={"h4"}
              sx={{
                fontSize: "1.8rem",
                textAlign: "center",
                marginTop: "2rem",
              }}
              className="alertText"
            >
              Are You Sure You Want to Cancel !
            </Typography>

            <Box sx={{ display: { xs: "flex" }, marginTop: 2 }}>
              <Button
                onClick={handleDeleteClose}
                className="modal-btn btn-danger"
                sx={{ marginRight: "0.5rem" }}
              >
                Discard
              </Button>
              <Button
                onClick={handleDelete}
                className="modal-btn btn-primary"
                sx={{ marginLeft: "0.5rem" }}
              >
                Confirm
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* edit modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        className="commonModal squareOff"
      >
        <Box
          className="modalHeader buySell_box buy"
          sx={{ justifyContent: "end" }}
        >
          <Typography component={"h4"} sx={{ display: "flex" }}>
            {match[0]?.symbol}
            <Typography>{match[0]?.price}</Typography>
          </Typography>
          {/* <Button onClick={handleClose} className="closeModal">
            <img src={close} />
          </Button> */}
        </Box>
        <DialogContent sx={{ padding: "0" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Box className="tabs buysellModal-tabs">
              <Box
                className="tabBox"
                sx={{
                  border: "none !important",
                  padding: 1,
                  width: "auto !important",
                }}
              >
                <Box
                  className="formBox"
                  sx={{
                    border: "none",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    flexWrap: { xs: "wrap", md: "nowrap" },
                    marginTop: 1,
                  }}
                >
                  <Box className="formItems">
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.4rem !important" }}
                    >
                      Order Type
                    </Typography>
                    <Box
                      className="inputFields space fullWidth"
                      sx={{
                        "& > .selectionDiv": {
                          padding: "0 !important",
                          marginTop: "0 !important",
                          border: "none",
                        },
                      }}
                    >
                      <Dropdown
                        // disabled={true}
                        val={orderTypValues}
                        value={orderType}
                        handleChange={handleOrderTypChange}
                      />
                    </Box>
                  </Box>
                  <Box className="formItems">
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.4rem !important" }}
                    >
                      Quantity
                    </Typography>
                    <Box className="inputFields space">
                      <InputBase
                        // disabled={true}
                        placeholder="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                className="tabBox"
                sx={{
                  border: "none !important",
                  padding: 1,
                  width: "auto !important",
                }}
                style={{
                  marginTop: 0,
                  paddingTop: 0,
                  marginLeft: 10,
                }}
              >
                <Box
                  className="formBox"
                  sx={{
                    border: "none",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    flexWrap: { xs: "wrap", md: "nowrap" },
                  }}
                >
                  <Box className="formItems">
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{
                        fontSize: "1.4rem !important",
                      }}
                    >
                      Price
                    </Typography>
                    <Box className="inputFields space">
                      <InputBase
                        placeholder="Price"
                        type="number"
                        value={prc}
                        disabled={orderType == "MARKET" || orderType == "SL-M"}
                        onChange={(e) => setPrc(e.target.value)}
                      />
                    </Box>
                  </Box>
                  <Box className="formItems">
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.4rem !important" }}
                    >
                      Trigger
                    </Typography>
                    <Box className="inputFields space">
                      <InputBase
                        placeholder="Trigger"
                        value={trigger}
                        disabled={orderType == "MARKET" || orderType == "LIMIT"}
                        onChange={(e) => setTrigger(e.target.value)}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", gap: "1rem" }, marginTop: 2 }}>
              <Button
                onClick={handleSubmit}
                className="modal-btn btn-primary"
                sx={{ marginLeft: "0.5rem" }}
              >
                Confirm
              </Button>
              <Button
                onClick={handleClose}
                className="modal-btn btn-danger"
                sx={{ marginRight: "0.5rem" }}
              >
                Discard
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* cancel all */}
      <Dialog
        open={cancelOpen}
        onClose={handleCancelClose}
        className="commonModal squareOff"
      >
        <Box className="modalHeader" sx={{ justifyContent: "end" }}>
          <Typography component={"h4"}>Cancel</Typography>
          <Button onClick={handleCancelClose} className="closeModal">
            <img src={close} />
          </Button>
        </Box>
        <DialogContent sx={{ padding: "0" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Box className="alertIcons">
              <svg
                width="1052"
                height="1052"
                viewBox="0 0 1052 1052"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M558 334C558 316.3 543.7 302 526 302C508.3 302 494 316.3 494 334V590C494 607.7 508.3 622 526 622C543.7 622 558 607.7 558 590V334ZM526 750C536.609 750 546.783 745.786 554.284 738.284C561.786 730.783 566 720.609 566 710C566 699.391 561.786 689.217 554.284 681.716C546.783 674.214 536.609 670 526 670C515.391 670 505.217 674.214 497.716 681.716C490.214 689.217 486 699.391 486 710C486 720.609 490.214 730.783 497.716 738.284C505.217 745.786 515.391 750 526 750Z"
                  fill="#4987FE"
                />
                <circle
                  cx="526"
                  cy="526"
                  r="507"
                  stroke="#5086EE"
                  stroke-width="38"
                />
              </svg>
            </Box>
            <Typography
              component={"h4"}
              sx={{
                fontSize: "1.8rem",
                textAlign: "center",
                marginTop: "2rem",
              }}
              className="alertText"
            >
              Are You Sure You Want to Cancel All Position!
            </Typography>

            <Box sx={{ display: { xs: "flex" }, marginTop: 2 }}>
              <Button
                onClick={handleCancelClose}
                className="modal-btn btn-danger"
                sx={{ marginRight: "0.5rem" }}
              >
                Discard
              </Button>
              <Button
                onClick={handleCancel}
                className="modal-btn btn-primary"
                sx={{ marginLeft: "0.5rem" }}
              >
                Confirm
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TradeDetails;
