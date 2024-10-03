import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PositionComponent from "../../Components/PositionComponent";
import {
  closePosition,
  squareOffAllLive,
  squareOffLivePosition,
} from "../../redux/actions/positionAction";
import Dropdown from "../Dropdown/Dropdown";
import "./Position.scss";
import "./Position.scss";
import { generatePopup } from "../../utils/popup";

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

export default function Position() {
  const edit = <Typography sx={{ fontSize: "1.4rem" }}>Edit</Typography>;
  const close = <Typography sx={{ fontSize: "1.4rem" }}>SquareOff</Typography>;
  const drpValue = ["MIS", "NRML"];
  const orderTypValues = ["Market", "Limit", "SL", "SL-M"];
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [alignment, setAlignment] = useState("live");
  const [liveposition, setLiveposition] = useState([]);
  const [paperposition, setPaperposition] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState();
  const [bsopen, setbsopen] = useState(false);
  const [sell, setbuy] = useState("buy");
  const [buysell, setbuysell] = useState("Buy");
  const [qty, setQty] = useState(0);
  const [prdType, setPrdType] = useState("MIS");
  const [orderType, setOrderType] = useState("Market");
  const [prc, setPrc] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [selectedStock, setSelectedStock] = useState();
  const [id, setId] = useState();
  const [tradetypeshand, settradetypeshand] = useState("Live");
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  const livePositions = useSelector((State) => State?.Position?.livePositions);

  const match = Array.isArray(livePositions)
    ? livePositions.filter((e) => e.id === id)
    : [];

  const col = [
    <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 24 }, padding: 0 }} />,
    "Exchange",
    "Trend",
    "Symbol Name",
    "QTY",
    "Product",
    // "Previous Close",
    "Executed Price",
    // "Today's MTM",
    // "Settled MTM",
    // "Total MTM",
    "Strategy Name",
    // "Order Type ",
    "LTP",
    "P&L",
    "Actions",
  ];

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const commonArr = (positions) => {
    let tempArr = [];
    for (let i = 0; i < positions.length; i++) {
      let data = positions[i];

      tempArr.push({
        Checkbox: (
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 24 }, padding: 0 }}
          />
        ),
        Exchange: data.exchange,
        Trend: (
          <span
            className={
              data?.side?.toLowerCase() === "buy" ||
              data.side?.toLowerCase() === "b"
                ? "up"
                : "down"
            }
          >
            {data?.side?.toLowerCase() === "buy" ||
            data.side?.toLowerCase() === "b"
              ? "BUY"
              : "SELL"}
          </span>
        ),
        symbolName: data.symbol,
        qty: data.quantity,
        product: data.product,
        // PreviousClose: "0.00",
        price: data?.price,
        // TodayMTM: "0",
        // SettledMTM: "0",
        // TotalMTM: "0",
        strategy: data.stratergy,
        // OrderType: data.product_type,
        LTP: (
          <span
            className={
              data?.price < Number(data.liveprice).toFixed(2) ? "open" : "close"
            }
          >
            {Number(data.liveprice).toFixed(2)}
            {data.price < Number(data.liveprice).toFixed(2) ? up : down}
          </span>
        ),
        PL: (
          <span className={data.profit < 0 ? "close" : "open"}>
            {Number(data.profit).toFixed(2)}
            {data.profit < 0 ? down : up}
          </span>
        ),
        squer: (
          <Box className="button">
            <Tooltip title={close} arrow placement="top">
              <Button
                onClick={() => handleClickOpen(data.id)}
                className="button squerOff"
              >
                <CloseIcon />
              </Button>
            </Tooltip>
            <Tooltip title={edit} arrow placement="top">
              <Button
                className="button edit"
                variant="text"
                onClick={() =>
                  buysellOpen(
                    data,
                    data?.side?.toUpperCase() == "BUY" ? "sell" : "buy",
                    data.id
                  )
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.26 3.59997L5.04997 12.29C4.73997 12.62 4.43997 13.27 4.37997 13.72L4.00997 16.96C3.87997 18.13 4.71997 18.93 5.87997 18.73L9.09997 18.18C9.54997 18.1 10.18 17.77 10.49 17.43L18.7 8.73997C20.12 7.23997 20.76 5.52997 18.55 3.43997C16.35 1.36997 14.68 2.09997 13.26 3.59997Z"
                    stroke="CurrentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.89 5.05005C12.32 7.81005 14.56 9.92005 17.34 10.2"
                    stroke="CurrentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 22H21"
                    stroke="CurrentColor"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </Tooltip>
          </Box>
        ),
      });
    }
    return tempArr;
  };

  console.log("livePositions :>> ", livePositions);
  useEffect(() => {
    let arr = commonArr(livePositions);

    setLiveposition(arr);
  }, [livePositions]);

  const closeLivePosition = () => {
    dispatch(squareOffLivePosition({ id: selectedId }));
    handleClose();
  };

  // Dropdown tab
  const tradetypesdrp = (event) => {
    settradetypeshand(event.target.value);
  };

  //buy/sell modal
  const buysellOpen = (data, value, id) => {
    console.log("data :>> ", data, value);
    setSelectedStock(data);
    setId(id);
    setbuy(value);
    setbuysell(value);
    setbsopen(true);
  };
  const buysellClose = () => {
    setbsopen(false);
    setId(0);
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

  const handleOrderTypChange = (e) => {
    setOrderType(e.target.value);
  };
  const handlePrdChange = (e) => {
    setPrdType(e.target.value);
  };

  const closePositionLimit = () => {
    console.log("selectedStock :>> ", selectedStock, buysell);
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
      id: id,
      prctyp: orderType.toUpperCase(),
      prc: orderType?.toUpperCase() === "SL-M" ? Number(trigger) : Number(prc),
      trp: orderType?.toUpperCase() === "LIMIT" ? Number(prc) : Number(trigger),
    };
    dispatch(closePosition(obj));
    setTrigger(0);
    setPrc(0);
    setId(0);
    setbsopen(false);
  };

  const closeAllPosition = () => {
    if (tradetypeshand == "Live") {
      dispatch(squareOffAllLive());
      handleClose();
      setOpen3(false);
    }
  };
  const closeSelected = () => {
    if (tradetypeshand == "Live") {
      // dispatch(squareOffAllLive());
      // handleClose();
      // setOpen3(false);
    }
  };

  return (
    <>
      <PositionComponent
        col={col}
        rows={alignment == "live" ? liveposition : paperposition}
        handleClose={handleClose}
        handleChange={handleChange}
        alignment={alignment}
        open={open}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
        closeLivePosition={closeLivePosition}
        tradetypesdrp={tradetypesdrp}
        tradetypeshand={tradetypeshand}
        closeAllPosition={closeAllPosition}
        closeSelected={closeSelected}
        open3={open3}
        setOpen3={setOpen3}
        open4={open4}
        setOpen4={setOpen4}
      />
      <Dialog
        open={bsopen}
        onClose={buysellClose}
        className={`commonModal buysellModal ${
          buysell?.toLowerCase() === "buy" || buysell?.toLowerCase() === "b"
            ? "buy"
            : "sell"
        }`}
      >
        <DialogContent sx={{ padding: "0 !important" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Box
              className={`buySell_box ${
                buysell?.toLowerCase() === "buy" ||
                buysell?.toLowerCase() === "b"
                  ? "buy"
                  : "sell"
              }`}
              sx={{ backgroundColor: buysell }}
            >
              <Box className="buysell_header">
                <Typography component={"h4"} className="symbol">
                  {match[0]?.symbol}
                  <Typography component={"small"} className="symbol_type">
                    {match[0]?.price}
                  </Typography>
                </Typography>
              </Box>
              {/* <Switch onChange={buysellpopup} />   */}
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
                    flexWrap: { xs: "wrap", md: "nowrap" },
                    marginTop: 1,
                  }}
                >
                  {/* <Box className="formItems">
                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "1.4rem !important" }}
                    >
                      Quantity
                    </Typography>
                    <Box className="inputFields space">
                      <InputBase
                        placeholder="Quantity"
                        type="number"
                        onChange={(e) => setQty(Number(e.target.value))}
                      />
                    </Box>
                  </Box> */}
                  <Box className="formItems" sx={{ padding: "0 0.8rem" }}>
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
                        val={drpValue}
                        value={prdType}
                        handleChange={handlePrdChange}
                      />
                    </Box>
                  </Box>
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
                  marginLeft: 10,
                }}
              >
                <Box
                  className="formBox"
                  sx={{
                    border: "none",
                    display: "flex",
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
                        disabled={orderType == "Market" || orderType == "SL-M"}
                        onChange={(e) => setPrc(Number(e.target.value))}
                        fullWidth
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
                        type="number"
                        disabled={orderType == "Market" || orderType == "Limit"}
                        onChange={(e) => setTrigger(Number(e.target.value))}
                        fullWidth
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box className="buysell-footer">
              <Box className="margin">
                {/* <Typography component={'p'}>Margin ₹ 493.70 Charges ₹ 2.17</Typography> */}
                {/* <Button><RefreshIcon /></Button> */}
              </Box>

              <Box className="footer-btn" sx={{ display: "flex" }}>
                <Button
                  style={{
                    backgroundColor:
                      buysell?.toLowerCase() === "buy" ? "#f75723" : "#2992ec",
                  }}
                  onClick={() => closePositionLimit()}
                >
                  {buysell?.toUpperCase()}
                </Button>
                <Button
                  className="footer-btns footer-cancel"
                  onClick={buysellClose}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
