import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  Switch,
  Tab,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import close from "../../images/close.png";
import {
  getAlertFutureData,
  getAlertOptionData,
  getAlertOptionStrikeData,
} from "../../redux/actions/alertActions";
import { BrokerStatus } from "../../redux/actions/brokerAction";
import {
  addWatchList,
  deleteWatchList,
} from "../../redux/actions/commonActions";
import { createPosition } from "../../redux/actions/positionAction";
import { generatePopup } from "../../utils/popup";
import Autoselect from "../Admin/Alert/Autoselect";
import Autoselectsrp from "../Admin/Alert/Autoselectsrp";
import Dropdown from "../Dropdown/Dropdown";
import "../Home/Home.scss";
import "../Table/Table.scss";
import "./Marketwatch.scss";
import Marketwatchview from "./Marketwatchview/Marketwatchview";
import { useSocket } from "../../hooks/useNewSocket";

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

export default function Marketwatch() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const [exchange, setexchange] = useState("NSE");
  const [bsopen, setbsopen] = useState(false);
  const [sell, setbuy] = useState("buy");
  const [buysell, setbuysell] = useState("Buy");
  const [prdType, setPrdType] = useState("NRML");
  const [orderType, setOrderType] = useState("Market");
  const [removeSymbol, setremoveSymbol] = useState("none");
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const drpValue = ["MIS", "NRML"];
  const sharekhanOrderType = ["INVESTMENT", "BIGTRADE", "BIGTRADE+"];
  const orderTypValues = ["Market", "Limit", "SL", "SL-M"];
  const instruments = {
    FS: "Future Stocks(FS)",
    FI: "Future Index(FI)",
    OI: " Option Index(OI)",
    OS: "Option Stocks(OS)",
    FUTCUR: "Future Currency(FUTCUR)",
    OPTCUR: "Option Currency(OPTCUR)",
  };
  const [prc, setPrc] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [qty, setQty] = useState(0);
  const [selectedStock, setSelectedStock] = useState();
  const [collapse, setcollapse] = useState("close");
  const [exchange, setExchange] = useState("NSE");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedAlert, setSelectedAlert] = useState();
  const [options, setOptions] = useState("future");
  const [futureExpiryData, setFutureExpiryData] = useState("");
  const [cpExpiry, setCpExpiry] = useState("");
  const [cpStrike, setCpStrike] = useState("");
  const [compVal, setCompVal] = useState(0);
  const [values, setValues] = React.useState("MarketWatch1");
  const [error, setError] = useState("");
  const [instType, setInstType] = useState("");
  const [brokerData, setBrokerData] = useState();
  const [isAddEnabled, setIsAddEnabled] = useState(false);
  const [table1Data, setTable1Data] = useState();
  const [table2Data, setTable2Data] = useState();
  const [table3Data, setTable3Data] = useState();
  const [table4Data, setTable4Data] = useState();
  const [table5Data, setTable5Data] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const alertSocket = useSocket("alert");
  const brokerStatus = useSelector((state) => state.Broker.brokerstatus);
  const watchListUpdateSocket = useSocket("watchlistupdate");
  const watchListSocket = useSocket("watchlist");

  useEffect(() => {
    dispatch(BrokerStatus());
  }, []);

  useEffect(() => {
    if (brokerData?.brokername === "sharekhan") {
      setPrdType("INVESTMENT");
    } else {
      setPrdType("NRML");
    }
  }, [brokerData?.brokername]);

  useEffect(() => {
    if (brokerStatus) {
      setBrokerData(brokerStatus[0]);
    }
  }, [brokerStatus]);

  useEffect(() => {
    if (selectedAlert) {
      setIsAddEnabled(true);
    } else {
      setIsAddEnabled(false);
    }
  }, [selectedAlert]);

  const collapsePortfolio = () => {
    if (collapse === "close") {
      setcollapse(" ");
    } else {
      setcollapse("close");
    }
  };

  //market view
  const futureData = useSelector((State) => State.Alert.futureData);
  const optionExpiryData = useSelector((State) => State.Alert.optionExpiryData);
  const optionStrikeData = useSelector((State) => State.Alert.optionStrikeData);
  const alertSymbols = useSelector((State) => State.Alert.alertSymbols);

  const watchListData = useSelector(
    (state) => state?.CommonReducer?.watchListData
  );

  const watchListLive = useSelector(
    (state) => state?.CommonReducer?.watchListLive
  );

  useEffect(() => {
    setTable1Data(watchListLive?.slice(0, 50));
    setTable2Data(watchListLive?.slice(51, 100));
    setTable3Data(watchListLive?.slice(101, 150));
    setTable4Data(watchListLive?.slice(151, 200));
    setTable5Data(watchListLive?.slice(201, 250));
  }, [watchListLive]);

  const addSymbol = () => {
    setremoveSymbol("flex");
  };

  // Add Symbol Modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    handleClear();
  };

  // Buy/Sell Modal
  const buysellOpen = (value, data) => {
    const stock = data?.original;
    console.log("stock :>> ", stock);
    if (stock?.exchange === "NSE" && value?.toLowerCase() === "sell") {
      return generatePopup(
        "error",
        "Short Selling is not allowed in this segment."
      );
    }
    dispatch(
      getAlertFutureData({
        exchange: stock?.exchange,
        symbol: stock?.symbol,
      })
    ).then((res) => {
      if (stock?.token) {
        if (stock?.exchange === "NSE") {
          setQty(1);
        } else {
          setSelectedQuantity(res?.[0]?.lot);
          setQty(res?.[0]?.lot);
        }
      }
    });

    setSelectedStock(stock);
    setbuy(value);
    setbuysell(value);
    setbsopen(true);
    // if (stock?.token) {
    //   if (stock?.exchange === "NSE") {
    //     setQty(1);
    //   } else {
    //     setQty(stock?.SQ);
    //   }
    // }
  };

  const buysellClose = () => {
    setbsopen(false);
  };

  const buysellpopup = () => {
    if (sell === "buy") {
      setbuy("sell");
      setbuysell("sell");
    } else {
      setbuy("buy");
      setbuysell("buy");
    }
  };

  const [value, setValue] = React.useState("MarketWatch1");
  const handleChange = (e, newValue = "string") => {
    setValue(newValue);
  };

  const handlePrdChange = (e) => {
    setPrdType(e.target.value);
  };

  const handleInstChange = (e) => {
    setInstType(e.target.value);
  };

  useEffect(() => {
    setWatchlist(watchListData);
  }, [watchListData]);

  const addWatchListData = (obj) => {
    dispatch(addWatchList(obj));
  };

  const removeWatchList = (obj) => {
    dispatch(deleteWatchList(obj));
  };

  const sendWatchListMsg = (value = search, exchangeName = exchange) => {
    if (alertSocket?.isConnected) {
      alertSocket.sendMessage({
        exchange: exchangeName,
        symbol: value?.length === 0 ? "NA" : value.toUpperCase(),
      });
    }
  };

  const handleOrderTypChange = (e) => {
    setOrderType(e.target.value);
  };

  const handleSearch = (value) => {
    setSearch(value);
    sendWatchListMsg(value, exchange);
  };

  const createTrade = () => {
    console.log("selectedStock :>> ", selectedStock);
    if (qty === 0) {
      return generatePopup("error", "Please enter quantity.");
    }
    if (
      selectedStock?.exchange === "NSE" ||
      selectedStock?.exchange === "NFO"
    ) {
      const price = prc / 0.05;
      const diff = price - Math.trunc(price);

      if (diff !== 0) {
        return generatePopup("error", "please enter valid tick size.");
      }
    }
    if (selectedStock?.exchange === "CDS") {
      const price = prc / 0.0025;
      const diff = price - Math.trunc(price);
      console.log("diff :>> ", diff);

      if (diff !== 0) {
        return generatePopup("error", "please enter valid tick size.");
      }
    }
    if (selectedStock?.exchange === "MCX") {
      const price = prc / 1;
      const diff = price - Math.trunc(price);
      console.log("diff :>> ", diff);

      if (diff !== 0) {
        return generatePopup("error", "please enter valid tick size.");
      }
    }

    if (orderType === "SL") {
      if (!prc) {
        return generatePopup("error", "Please enter Price.");
      }
      if (!trigger) {
        return generatePopup("error", "Please enter Trigger Price.");
      }
      if (buysell?.toLowerCase() === "buy") {
        if (trigger < selectedStock?.liveprice) {
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
        if (trigger > selectedStock?.liveprice) {
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
      if (!prc) {
        return generatePopup("error", "Enter Price Should be below CMP");
      }
      if (buysell?.toLowerCase() === "buy") {
        if (prc > selectedStock?.liveprice) {
          return generatePopup("error", "Enter Price Should be below CMP");
        }
      }
      if (buysell?.toLowerCase() === "sell") {
        if (prc < selectedStock?.liveprice) {
          return generatePopup("error", "Enter Price Should be Above CMP");
        }
      }
    }
    if (orderType?.toLowerCase() === "sl-m") {
      if (buysell?.toLowerCase() === "buy") {
        if (trigger < selectedStock?.liveprice) {
          return generatePopup(
            "error",
            "Trigger Price should be above than CMP"
          );
        }
      }
      if (buysell?.toLowerCase() === "sell") {
        if (trigger > selectedStock?.liveprice) {
          return generatePopup(
            "error",
            "Trigger Price should be below than CMP"
          );
        }
      }
    }

    let obj = {
      symbol: selectedStock?.symbol,
      product: prdType,
      exchange: selectedStock?.exchange,
      prctyp: orderType.toUpperCase(),
      quantity: qty,
      side: buysell.toUpperCase(),
      complexty: "REGULAR",
      signaltype: "Entry",
      strikeprice: Number(selectedStock?.strikeprice),
      prc: orderType?.toUpperCase() === "SL-M" ? Number(trigger) : Number(prc),
      trp: orderType?.toUpperCase() === "LIMIT" ? Number(prc) : Number(trigger),
      expiry: selectedStock?.expiry,
      type:
        selectedStock?.option == "AA"
          ? "CASH"
          : selectedStock?.option == "XX"
          ? "FUTURE"
          : "OPTION",
      tag:
        selectedStock?.option == "CE"
          ? "CE"
          : selectedStock?.option == "PE"
          ? "PE"
          : "XX",
      instrumenttype:
        selectedStock.exchange == "NSE" || instType == "" ? "NA" : instType,
    };

    dispatch(createPosition(obj)).then((res) => {
      if (res) {
        setPrdType("NRML");
        setQty(0);
        setOrderType("Market");
        setTrigger(0);
        setPrc(0);
      }
    });

    setPrdType("");
    setQty(0);
    setOrderType("Market");
    setTrigger(0);
    setPrc(0);
    buysellClose();
  };

  const [opens, setOpens] = useState(false);
  // const { setLtpValue } = props;
  const handleCloses = () => {
    // setLtpValue(0)
    setOpen(false);
  };

  const handleExchange = (event, newValue) => {
    setExchange(newValue);
    sendWatchListMsg("", newValue);
    setSelectedValue("");
    setValues(0);
    setCpStrike("");
    setCpExpiry("");
    setFutureExpiryData("");
    setOptions("future");
    setError("");
  };

  const handleSelectAlert = (value) => {
    setSelectedAlert(value);
    setOptions("future");
    if (exchange == "NFO" || exchange == "MCX" || exchange == "CDS") {
      if (value != null) {
        dispatch(
          getAlertFutureData({ exchange: exchange, symbol: value?.symbol })
        ).then((res) => {
          if (res?.length > 0) {
            setFutureExpiryData(res[0]?.token);

            setSelectedAlert({
              ...value,
              token: res[0]?.token,
              expiry: res[0]?.expiry,
            });
            setValues(parseFloat(res[0]?.price).toFixed(2));
            setCompVal(parseFloat(res[0]?.price).toFixed(2));
          }
        });
      } else {
        setValues(0);
      }
    } else {
      if (value != null) {
        setValues(parseFloat(value.price).toFixed(2));
        setCompVal(parseFloat(value.price).toFixed(2));
      } else {
        setValues(0);
      }
    }
  };

  const handleChangeOptions = (e, newValue = "string") => {
    setOptions(newValue);

    if (exchange == "NFO" || exchange == "MCX" || exchange == "CDS") {
      if (newValue == "future") {
        dispatch(
          getAlertFutureData({
            exchange: exchange,
            symbol: selectedAlert?.symbol,
          })
        ).then((res) => {
          if (res?.length > 0) {
            setFutureExpiryData(res[0]?.token);
            setSelectedAlert({ ...selectedAlert, token: res[0]?.token });
            setValues(parseFloat(res[0]?.price).toFixed(2));
            setCompVal(parseFloat(res[0]?.price).toFixed(2));
          }
        });
      } else if (newValue == "call") {
        dispatch(
          getAlertOptionData(
            {
              exchange: exchange,
              symbol: selectedAlert?.symbol,
            },
            "optionce"
          )
        ).then((res) => {
          if (res.length > 0) {
            setCpExpiry(res[0]);
            getOptionStrikeDataFun(
              {
                exchange: exchange,
                symbol: selectedAlert?.symbol,
                expiry: res[0],
              },
              "optioncestrike"
            );
          }
        });
      } else if (newValue == "put") {
        dispatch(
          getAlertOptionData(
            {
              exchange: exchange,
              symbol: selectedAlert?.symbol,
            },
            "optionpe"
          )
        ).then((res) => {
          if (res.length > 0) {
            setCpExpiry(res[0]);
            getOptionStrikeDataFun(
              {
                exchange: exchange,
                symbol: selectedAlert?.symbol,
                expiry: res[0],
              },
              "optionpestrike"
            );
          }
        });
      }
    }
  };

  const getOptionStrikeDataFun = (payload, optionType) => {
    dispatch(getAlertOptionStrikeData(payload, optionType)).then((res) => {
      setCpStrike(res[0]?.token);
      setSelectedAlert({ ...selectedAlert, token: res[0]?.token });
      setValues(parseFloat(res[0]?.price).toFixed(2));
      setCompVal(parseFloat(res[0]?.price).toFixed(2));
    });
  };

  const handleExpiryChange = (newValue) => {
    let selectedData = futureData.filter((d) => d.token == newValue);
    setFutureExpiryData(newValue);
    setSelectedAlert({
      ...selectedAlert,
      token: newValue,
      expiry: selectedData[0]?.expiry,
    });
    setValues(parseFloat(selectedData[0]?.price).toFixed(2));
    setCompVal(parseFloat(selectedData[0]?.price).toFixed(2));
  };

  const handleCPExpiryChange = (event) => {
    setCpExpiry(event.target.value);
    getOptionStrikeDataFun(
      {
        exchange: exchange,
        symbol: selectedAlert?.symbol,
        expiry: event.target.value,
      },
      options == "call" ? "optioncestrike" : "optionpestrike"
    );
  };

  const handleCPStrikeChange = (value) => {
    let selectedData = optionStrikeData.filter((d) => d.token == value);
    setCpStrike(value);
    setSelectedAlert({
      ...selectedAlert,
      token: value,
      price: selectedData?.[0]?.expiry,
    });
    setValues(parseFloat(selectedData[0]?.price).toFixed(2));
    setCompVal(parseFloat(selectedData[0]?.price).toFixed(2));
  };

  const handleClear = () => {
    setExchange("NSE");
    setSearch("");
    setSelectedAlert("");
    setFutureExpiryData("");
    setCpExpiry("");
    setCpStrike("");
    setSelectedValue("");
    setError("");
    setInstType("");
    setPrdType("");
  };

  //ADD NFO FUTURE
  const addNfoFuture = () => {
    let obj = {
      exchange: "NFO",
      expiry: selectedAlert.expiry,
      // instrument: selectedAlert.instrument,
      option: "XX",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: futureExpiryData,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  //ADD NFO CALL
  const addNfoCall = () => {
    let obj = {
      exchange: "NFO",
      expiry: cpExpiry,
      // instrument: selectedAlert.instrument,
      option: "CE",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: cpStrike,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  //ADD NFO PUT
  const addNfoPut = () => {
    let obj = {
      exchange: "NFO",
      expiry: cpExpiry,
      // instrument: selectedAlert.instrument,
      option: "PE",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: cpStrike,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  //ADD NSE STOCK
  const addNse = () => {
    if (selectedAlert) {
      let obj = {
        exchange: "NSE",
        expiry: "2023-01-01",
        // instrument: selectedAlert.instrument,
        option: "AA",
        strikeprice: "0",
        symbol: selectedAlert.symbol,
        token: selectedAlert.token.toString(),
        tradingsymbol: selectedAlert.symbol,
      };
      dispatch(addWatchList(obj));
      handleClear();
      handleClose();
    }
  };

  //ADD CDS FUTURE
  const addCdsFuture = () => {
    let obj = {
      exchange: "CDS",
      expiry: selectedAlert.expiry,
      // instrument: selectedAlert.instrument,
      option: "XX",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: futureExpiryData,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  //ADD CDS CALL
  const addCdsCall = () => {
    let obj = {
      exchange: "CDS",
      expiry: cpExpiry,
      // instrument: selectedAlert.instrument,
      option: "CE",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: cpStrike,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  //ADD CDS PUT
  const addCdsPut = () => {
    let obj = {
      exchange: "CDS",
      expiry: cpExpiry,
      // instrument: selectedAlert.instrument,
      option: "PE",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: cpStrike,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  //ADD MCX FUTURE
  const addMcxFuture = () => {
    let obj = {
      exchange: "MCX",
      expiry: selectedAlert.expiry,
      // instrument: selectedAlert.instrument,
      option: "XX",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: futureExpiryData,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  //ADD MCX CALL
  const addMcxCall = () => {
    let obj = {
      exchange: "MCX",
      expiry: cpExpiry,
      // instrument: selectedAlert.instrument,
      option: "CE",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: cpStrike,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  //ADD MCX PUT
  const addMcxPut = () => {
    let obj = {
      exchange: "MCX",
      expiry: cpExpiry,
      // instrument: selectedAlert.instrument,
      option: "PE",
      strikeprice: selectedAlert.price.toString(),
      symbol: selectedAlert.symbol,
      token: cpStrike,
      tradingsymbol: selectedAlert.symbol,
    };
    dispatch(addWatchList(obj));
    handleClear();
    handleClose();
  };

  const handleKeyPress = (event) => {
    let increment = selectedQuantity; // Increment value

    if (event.key === "ArrowUp") {
      event.preventDefault(); // Prevent the default behavior of the arrow key
      setQty((prevValue) => prevValue + increment); // Increase the value by the increment
    } else if (event.key === "ArrowDown") {
      event.preventDefault(); // Prevent the default behavior of the arrow key
      setQty((prevValue) => Math.max(prevValue - increment, 0)); // Decrease the value by the increment, with a minimum of 0
    }
  };

  return (
    <>
      <Box
        sx={{ display: "grid", alignContent: "space-between", height: "75vh",width:"100%",overflowX:"scroll" }}
      >
        {/* MarketWatch tabs */}
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
                <Tab label="MW1" value="MarketWatch1" className="tabbut" />
                <Tab label="MW2" value="MarketWatch2" />
                <Tab label="MW3" value="MarketWatch3" />
                <Tab label="MW4" value="MarketWatch4" />
                <Tab label="MW5" value="MarketWatch5" />
              </TabList>

              {/* <Tooltip arrow placement='top' title={<Typography sx={{ fontSize: '1.4rem' }}>Refresh </Typography>}>
            <Button className="collapse-btn">
              <RefreshIcon />
            </Button>
          </Tooltip> */}
            </Box>

            <Box
              sx={{
                // height: "80vh",
                overflowY: "auto",
                overflowX: "scroll",
                width: "100%"
              }}
            >
              <TabPanel
                value="MarketWatch1"
                sx={{ padding:0, marginTop: "1.5rem", color: "white" }}
              >
                <Marketwatchview
                  data={table1Data}
                  buysellOpen={buysellOpen}
                  handleClickOpen={handleClickOpen}
                  removeWatchList={removeWatchList}
                  MarketWatch={"Market Watch 1"}
                />
              </TabPanel>

              <TabPanel
                value="MarketWatch2"
                sx={{ padding: 0, marginTop: "1.5rem", color: "white" }}
              >
                <Marketwatchview
                  data={table2Data}
                  buysellOpen={buysellOpen}
                  handleClickOpen={handleClickOpen}
                  removeWatchList={removeWatchList}
                  MarketWatch={"Market Watch 2"}
                />
              </TabPanel>

              <TabPanel
                value="MarketWatch3"
                sx={{ padding: 0, marginTop: "1.5rem", color: "white" }}
              >
                <Marketwatchview
                  data={table3Data}
                  buysellOpen={buysellOpen}
                  handleClickOpen={handleClickOpen}
                  removeWatchList={removeWatchList}
                  MarketWatch={"Market Watch 3"}
                />
              </TabPanel>

              <TabPanel
                value="MarketWatch4"
                sx={{ padding: 0, marginTop: "1.5rem", color: "white" }}
              >
                <Marketwatchview
                  data={table4Data}
                  buysellOpen={buysellOpen}
                  handleClickOpen={handleClickOpen}
                  removeWatchList={removeWatchList}
                  MarketWatch={"Market Watch 4"}
                />
              </TabPanel>

              <TabPanel
                value="MarketWatch5"
                sx={{ padding: 0, marginTop: "1.5rem", color: "white" }}
              >
                <Marketwatchview
                  data={table5Data}
                  buysellOpen={buysellOpen}
                  handleClickOpen={handleClickOpen}
                  removeWatchList={removeWatchList}
                  MarketWatch={"Market Watch 5"}
                />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Box>

      {/* Add Symbol Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        className="commonModal addSymbol-marketwatch"
        fullWidth
      >
        <Box className="modalHeader" sx={{ justifyContent: "space-between" }}>
          <Typography component={"h4"}>Add Symbol</Typography>
          <Button onClick={handleClose} className="closeModal">
            <img src={close} />
          </Button>
        </Box>
        <DialogContent sx={{ padding: "0" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            {/* <ToggleButtonGroup
              value={exchange}
              exclusive
              onChange={handleAlignment}
              className="toggleButton"
            >
              <ToggleButton value="NSE">NSE</ToggleButton>
              <ToggleButton value="NFO">NFO</ToggleButton>
              <ToggleButton value="CDS">CDS</ToggleButton>
              <ToggleButton value="MCX">MCX</ToggleButton>
            </ToggleButtonGroup> */}

            <Box className="tabs">
              <TabContext value={exchange}>
                {/* <Typography component={"label"} className="label">
                  Exchange
                </Typography> */}
                <TabList className="main-tab" onChange={handleExchange}>
                  <Tab label="NSE" value="NSE" />
                  {/* <Tab label="BSE" value="BSE" /> */}
                  <Tab label="NFO" value="NFO" />
                  <Tab label="CDS" value="CDS" />
                  <Tab label="MCX" value="MCX" />
                </TabList>

                {/* NSE */}
                <TabPanel value={"NSE"} sx={{ padding: 0 }}>
                  <Box className="inputFields fullWidth">
                    <Box className="selectionDiv bn searchFlex">
                      <Autoselectsrp
                        exchanges={alertSymbols}
                        selectedValue={search}
                        handleAlertSearch={handleSearch}
                        handleSelectAlert={handleSelectAlert}
                        selectedAlert={selectedAlert}
                      />
                    </Box>
                    <Box className="searchIcon">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.85722 14.7144C11.6444 14.7144 14.7144 11.6444 14.7144 7.85722C14.7144 4.07008 11.6444 1 7.85722 1C4.07008 1 1 4.07008 1 7.85722C1 11.6444 4.07008 14.7144 7.85722 14.7144Z"
                          stroke="#6A6D78"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 13.0001L17 17.0002"
                          stroke="#6A6D78"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  </Box>
                  <Button
                    className="formSolid-btn"
                    sx={{ marginBottom: 2 }}
                    disabled={!isAddEnabled}
                    onClick={addNse}
                  >
                    ADD
                  </Button>
                </TabPanel>

                {/* NFO */}
                <TabPanel value={"NFO"} sx={{ padding: 0 }}>
                  <Box className="selectionDiv bn searchFlex">
                    <Box
                      className="inputFields space fullWidth"
                      sx={{ "& > .MuiInputBase-root": { width: "100%" } }}
                    >
                      <Autoselectsrp
                        exchanges={alertSymbols}
                        selectedValue={search}
                        handleAlertSearch={handleSearch}
                        handleSelectAlert={handleSelectAlert}
                        selectedAlert={selectedAlert}
                      />
                    </Box>
                  </Box>

                  <Box className="tabBox" sx={{ border: "none !important" }}>
                    <Box className="sub-tabBox">
                      <TabContext value={options}>
                        <TabList
                          className="main-tab"
                          onChange={handleChangeOptions}
                        >
                          <Tab
                            sx={{ width: "33.33%" }}
                            label="FUTURE"
                            value="future"
                          />
                          <Tab
                            sx={{ width: "33.33%" }}
                            label="CALL"
                            value="call"
                          />
                          <Tab
                            sx={{ width: "33.33%" }}
                            label="PUT"
                            value="put"
                          />
                        </TabList>
                        <TabPanel value="future" sx={{ padding: 0 }}>
                          <Box className="selectiondiv-box fullWidth">
                            <Autoselect
                              val={futureData}
                              handleExpiryChange={handleExpiryChange}
                              futureExpiryData={futureExpiryData}
                            />
                          </Box>
                          <Button
                            className="formSolid-btn"
                            sx={{ marginBottom: 2 }}
                            disabled={!isAddEnabled}
                            onClick={addNfoFuture}
                          >
                            ADD
                          </Button>
                        </TabPanel>
                        <TabPanel value="call" sx={{ padding: 0 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: "50%" }}>
                              <Typography component={"label"} className="label">
                                Expiry
                              </Typography>
                              <Box class="selectiondiv-box fullWidth">
                                <Dropdown
                                  val={optionExpiryData}
                                  value={cpExpiry}
                                  handleChange={handleCPExpiryChange}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ width: "50%" }}>
                              <Typography component={"label"} className="label">
                                Strike
                              </Typography>
                              <Autoselect
                                val={optionStrikeData}
                                futureExpiryData={cpStrike}
                                handleExpiryChange={handleCPStrikeChange}
                              />
                            </Box>
                          </Box>
                          <Button
                            className="formSolid-btn"
                            disabled={!isAddEnabled}
                            sx={{ marginBottom: 2 }}
                            onClick={addNfoCall}
                          >
                            ADD
                          </Button>
                        </TabPanel>
                        <TabPanel value="put" sx={{ padding: 0 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ width: "50%" }}>
                              <Typography component={"label"} className="label">
                                Expiry
                              </Typography>
                              <Box class="selectiondiv-box fullWidth">
                                <Dropdown
                                  val={optionExpiryData}
                                  value={cpExpiry}
                                  handleChange={handleCPExpiryChange}
                                />
                              </Box>
                            </Box>
                            <Box sx={{ width: "50%" }}>
                              <Typography component={"label"} className="label">
                                Strike
                              </Typography>
                              <Autoselect
                                val={optionStrikeData}
                                futureExpiryData={cpStrike}
                                handleExpiryChange={handleCPStrikeChange}
                              />
                            </Box>
                          </Box>
                          <Button
                            className="formSolid-btn"
                            sx={{ marginBottom: 2 }}
                            onClick={addNfoPut}
                            disabled={!isAddEnabled}
                          >
                            ADD
                          </Button>
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </Box>
                </TabPanel>

                {/* CDS Tab */}
                <TabPanel value={"CDS"} sx={{ padding: 0 }}>
                  <Box className="selectionDiv bn searchFlex">
                    <Box
                      className="inputFields space fullWidth"
                      sx={{ "& > .MuiInputBase-root": { width: "100%" } }}
                    >
                      <Autoselectsrp
                        exchanges={alertSymbols}
                        selectedValue={search}
                        handleAlertSearch={handleSearch}
                        handleSelectAlert={handleSelectAlert}
                        selectedAlert={selectedAlert}
                      />
                    </Box>
                  </Box>

                  <Box className="tabs" sx={{ marginTop: 2 }}>
                    <Box className="tabBox" sx={{ border: "none !important" }}>
                      <Box className="sub-tabBox">
                        <TabContext value={options}>
                          <TabList
                            className="main-tab"
                            onChange={handleChangeOptions}
                          >
                            <Tab
                              sx={{ width: "33.33%" }}
                              label="FUTURE"
                              value="future"
                            />
                            <Tab
                              sx={{ width: "33.33%" }}
                              label="CALL"
                              value="call"
                            />
                            <Tab
                              sx={{ width: "33.33%" }}
                              label="PUT"
                              value="put"
                            />
                          </TabList>
                          <TabPanel value="future" sx={{ padding: 0 }}>
                            <Box className="selectiondiv-box fullWidth">
                              <Autoselect
                                val={futureData}
                                handleExpiryChange={handleExpiryChange}
                                futureExpiryData={futureExpiryData}
                              />
                            </Box>
                            <Button
                              className="formSolid-btn"
                              sx={{ marginBottom: 2 }}
                              disabled={!isAddEnabled}
                              onClick={addCdsFuture}
                            >
                              ADD
                            </Button>
                          </TabPanel>
                          <TabPanel value="call" sx={{ padding: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ width: "50%" }}>
                                <Box class="selectiondiv-box fullWidth">
                                  <Dropdown
                                    val={optionExpiryData}
                                    value={cpExpiry}
                                    handleChange={handleCPExpiryChange}
                                  />
                                </Box>
                              </Box>
                              <Box sx={{ width: "50%" }}>
                                <Autoselect
                                  val={optionStrikeData}
                                  futureExpiryData={cpStrike}
                                  handleExpiryChange={handleCPStrikeChange}
                                />
                              </Box>
                            </Box>
                            <Button
                              className="formSolid-btn"
                              sx={{ marginBottom: 2 }}
                              disabled={!isAddEnabled}
                              onClick={addCdsCall}
                            >
                              ADD
                            </Button>
                          </TabPanel>
                          <TabPanel value="put" sx={{ padding: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ width: "50%" }}>
                                <Box class="selectiondiv-box fullWidth">
                                  <Dropdown
                                    val={optionExpiryData}
                                    value={cpExpiry}
                                    handleChange={handleCPExpiryChange}
                                  />
                                </Box>
                              </Box>
                              <Box sx={{ width: "50%" }}>
                                <Autoselect
                                  val={optionStrikeData}
                                  futureExpiryData={cpStrike}
                                  handleExpiryChange={handleCPStrikeChange}
                                />
                              </Box>
                            </Box>
                            <Button
                              className="formSolid-btn"
                              sx={{ marginBottom: 2 }}
                              disabled={!isAddEnabled}
                              onClick={addCdsPut}
                            >
                              ADD
                            </Button>
                          </TabPanel>
                        </TabContext>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>

                {/* MCX Tab */}
                <TabPanel value={"MCX"} sx={{ padding: 0 }}>
                  <Box className="selectionDiv bn searchFlex">
                    <Box
                      className="inputFields space fullWidth"
                      sx={{ "& > .MuiInputBase-root": { width: "100%" } }}
                    >
                      <Autoselectsrp
                        exchanges={alertSymbols}
                        selectedValue={search}
                        handleAlertSearch={handleSearch}
                        handleSelectAlert={handleSelectAlert}
                        selectedAlert={selectedAlert}
                      />
                    </Box>
                  </Box>
                  <Box className="tabs" sx={{ marginTop: 2 }}>
                    <Box className="tabBox" sx={{ border: "none !important" }}>
                      <Box className="sub-tabBox">
                        <TabContext value={options}>
                          <TabList
                            className="main-tab"
                            onChange={handleChangeOptions}
                          >
                            <Tab
                              sx={{ width: "33.33%" }}
                              label="FUTURE"
                              value="future"
                            />
                            <Tab
                              sx={{ width: "33.33%" }}
                              label="CALL"
                              value="call"
                            />
                            <Tab
                              sx={{ width: "33.33%" }}
                              label="PUT"
                              value="put"
                            />
                          </TabList>
                          <TabPanel value="future" sx={{ padding: 0 }}>
                            <Box className="selectiondiv-box fullWidth">
                              <Autoselect
                                val={futureData}
                                handleExpiryChange={handleExpiryChange}
                                futureExpiryData={futureExpiryData}
                              />
                            </Box>
                            <Button
                              className="formSolid-btn"
                              sx={{ marginBottom: 2 }}
                              disabled={!isAddEnabled}
                              onClick={addMcxFuture}
                            >
                              ADD
                            </Button>
                          </TabPanel>
                          <TabPanel value="call" sx={{ padding: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ width: "50%" }}>
                                <Box class="selectiondiv-box fullWidth">
                                  <Dropdown
                                    val={optionExpiryData}
                                    value={cpExpiry}
                                    handleChange={handleCPExpiryChange}
                                  />
                                </Box>
                              </Box>
                              <Box sx={{ width: "50%" }}>
                                <Autoselect
                                  val={optionStrikeData}
                                  futureExpiryData={cpStrike}
                                  handleExpiryChange={handleCPStrikeChange}
                                />
                              </Box>
                            </Box>
                            <Button
                              className="formSolid-btn"
                              sx={{ marginBottom: 2 }}
                              disabled={!isAddEnabled}
                              onClick={addMcxCall}
                            >
                              ADD
                            </Button>
                          </TabPanel>
                          <TabPanel value="put" sx={{ padding: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Box sx={{ width: "50%" }}>
                                <Box class="selectiondiv-box fullWidth">
                                  <Dropdown
                                    val={optionExpiryData}
                                    value={cpExpiry}
                                    handleChange={handleCPExpiryChange}
                                  />
                                </Box>
                              </Box>
                              <Box sx={{ width: "50%" }}>
                                <Autoselect
                                  val={optionStrikeData}
                                  futureExpiryData={cpStrike}
                                  handleExpiryChange={handleCPStrikeChange}
                                />
                              </Box>
                            </Box>
                            <Button
                              className="formSolid-btn"
                              sx={{ marginBottom: 2 }}
                              disabled={!isAddEnabled}
                              onClick={addMcxPut}
                            >
                              ADD
                            </Button>
                          </TabPanel>
                        </TabContext>
                      </Box>
                    </Box>
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Buy/Sell */}
      <Dialog
        open={bsopen}
        onClose={buysellClose}
        className={`commonModal buysellModal ${sell}`}
      >
        <DialogContent sx={{ padding: "0 !important" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Box className="buysell-box" sx={{ backgroundColor: sell }}>
              <Box className="buysell_header">
                <Typography component={"h4"} className="symbol">
                  {selectedStock?.tradingsymbol}
                  <Typography component={"small"} className="symbol_type">
                    {selectedStock?.exchange}
                  </Typography>
                </Typography>
              </Box>
              {selectedStock?.exchange === "NSE" && buysell === "buy" ? (
                <></>
              ) : (
                <Switch onChange={buysellpopup} />
              )}
            </Box>
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
                    alignItems: "flex-start",
                    flexWrap: { xs: "wrap", md: "wrap" },
                    marginTop: 1,
                  }}
                >
                  <Box
                    className="formItems"
                    sx={{
                      padding: "0 0.8rem",
                      width: {
                        xs: "100%",
                        md: "calc(50% - 1.6rem) !important",
                      },
                    }}
                  >
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.4rem !important" }}
                    >
                      Quantity
                    </Typography>
                    <Box className="inputFields fullWidth space">
                      <InputBase
                        placeholder="Quantity"
                        type="number"
                        value={qty}
                        fullWidth
                        onKeyDown={handleKeyPress}
                        onChange={(e) => {
                          if (e.target.value) {
                            setQty(Number(e.target.value));
                          } else {
                            setQty(null);
                          }
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    className="formItems"
                    sx={{
                      padding: "0 0.8rem",
                      width: {
                        xs: "100%",
                        md: "calc(50% - 1.6rem) !important",
                      },
                    }}
                  >
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.4rem !important" }}
                    >
                      Product Type
                    </Typography>
                    <Box
                      className="inputFields space fullWidth"
                      sx={{
                        "& > .selectionDiv": {
                          padding: "0 !important",
                          marginTop: "0 !important",
                          border: "none !important",
                        },
                      }}
                    >
                      <Dropdown
                        val={
                          brokerData?.brokername === "sharekhan"
                            ? sharekhanOrderType
                            : drpValue
                        }
                        value={prdType}
                        handleChange={handlePrdChange}
                      />
                    </Box>
                  </Box>
                  {brokerData?.brokername === "sharekhan" && (
                    <Box
                      className="formItems"
                      sx={{
                        padding: "0 0.8rem",
                        width: {
                          xs: "100%",
                          md: "calc(50% - 1.6rem) !important",
                        },
                      }}
                    >
                      <Typography
                        component={"label"}
                        className="label"
                        sx={{ fontSize: "1.4rem !important" }}
                      >
                        Instrument Type
                      </Typography>
                      <Box
                        className="inputFields space fullWidth"
                        sx={{
                          "& > .selectionDiv": {
                            padding: "0 !important",
                            marginTop: "0 !important",
                            border: "none !important",
                          },
                        }}
                      >
                        <Box
                          className="selectionDiv border scroll"
                          sx={{
                            display: { xs: "flex" },
                            marginLeft: { xs: "0 !important" },
                          }}
                        >
                          <FormControl className="dropdown-ap">
                            <Select
                              value={instType}
                              onChange={handleInstChange}
                              className="dropdown"
                              displayEmpty
                              renderValue={
                                instType !== ""
                                  ? undefined
                                  : () => (
                                      <Typography sx={{ opacity: 0.5 }}>
                                        Select
                                      </Typography>
                                    )
                              }
                            >
                              {Object.keys(instruments).map((vals, index) => (
                                <MenuItem value={vals} key={index}>
                                  {instruments[vals]}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>

                        {/* <Dropdown
                        val={Object.values(instruments)}
                        value={instType}
                        handleChange={handleInstChange}
                      /> */}
                      </Box>
                    </Box>
                  )}

                  <Box
                    className="formItems"
                    sx={{
                      padding: "0 0.8rem",
                      width: {
                        xs: "100%",
                        md: "calc(50% - 1.6rem) !important",
                      },
                    }}
                  >
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
                          border: "none !important",
                        },
                      }}
                    >
                      <Dropdown
                        val={orderTypValues}
                        value={orderType}
                        handleChange={handleOrderTypChange}
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
                }}
              >
                <Box
                  className="formBox"
                  sx={{
                    border: "none",
                    display: "flex",
                    alignItems: "flex-start",
                    flexWrap: { xs: "wrap", md: "wrap" },
                  }}
                >
                  <Box
                    className="formItems"
                    sx={{
                      padding: "0 0.8rem",
                      width: {
                        xs: "100%",
                        md: "calc(50% - 1.6rem) !important",
                      },
                    }}
                  >
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.4rem !important" }}
                    >
                      Price
                    </Typography>
                    <Box className="inputFields fullWidth space">
                      <InputBase
                        placeholder="Price"
                        type="number"
                        disabled={orderType == "Market" || orderType == "SL-M"}
                        onChange={(e) => setPrc(Number(e.target.value))}
                      />
                    </Box>
                  </Box>
                  <Box
                    className="formItems"
                    sx={{
                      padding: "0 0.8rem",
                      width: {
                        xs: "100%",
                        md: "calc(50% - 1.6rem) !important",
                      },
                    }}
                  >
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.4rem !important" }}
                    >
                      Trigger
                    </Typography>
                    <Box className="inputFields fullWidth space">
                      <InputBase
                        placeholder="Trigger"
                        type="number"
                        disabled={orderType == "Market" || orderType == "Limit"}
                        onChange={(e) => setTrigger(Number(e.target.value))}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="buysell-footer">
              {selectedStock && (
                <Box
                  className="margin"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    component={"span"}
                    className={
                      Math.sign(selectedStock?.PC) === 1
                        ? "margin up"
                        : "margin down"
                    }
                    sx={{ padding: "0.5rem", gap: "0.5rem" }}
                  >
                    {selectedStock?.liveprice}{" "}
                    {Math.sign(selectedStock?.PC) === 1 ? up : down}
                  </Typography>
                  <Typography style={{ marginTop: 3, fontSize: 12 }}>
                    {Number(
                      selectedStock?.liveprice - selectedStock?.C
                    )?.toFixed(2)}{" "}
                    ({selectedStock?.PC}%) {/* Corrected this line */}
                  </Typography>
                </Box>
              )}

              <Box className="footer-btn">
                <Button onClick={() => createTrade()}>{buysell}</Button>
                <Button onClick={buysellClose}>Cancel</Button>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
