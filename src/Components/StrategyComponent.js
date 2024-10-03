import React, { useEffect, useState } from "react";
import {
  Pagination,
  Box,
  Tab,
  Grid,
  Typography,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  InputBase,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Dropdown from "../Inauth/Dropdown/Dropdown";
import "../Inauth/Strategy/Strategy.scss";
import close from "../images/close.png";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { squareOffAllLive } from "../redux/actions/positionAction";
import { useDispatch, useSelector } from "react-redux";
import {
  addStrategy,
  deleteStrategyMarketplace,
  getStrategyMarketplace,
  strategyMarketplace,
} from "../redux/actions/strategyAction";
import PaginationComponent from "./PaginationComponent";
import { confirm } from "../redux/actions/confirmActions";

export default function Strategy(props) {
  const dispatch = useDispatch();

  const [value, setValue] = useState("maintab1");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [tradetypeshand, settradetypeshand] = useState("Live");
  const [segments, setsegments] = useState("");
  const [order, setorder] = useState(" ");
  const [tardingtype, settardingtype] = useState(" ");

  const [strategyArray, setStrategyArray] = useState([]);
  const [ourStrategyArray, setOurStrategyArray] = useState([]);

  const [id, setId] = useState();

  const strategyData = useSelector((state) => state.Strategy.strategyData);
  const ourStrategyData = useSelector((state) => state.Strategy.ourStrategy);

  // Dropdown
  const tradetypes = ["Paper", "Live"];
  const segment = [
    "Select Segment",
    "Select All",
    "Future",
    "Nifty Fut",
    "BANKNIFTY OPTION",
    "NIFTY OPTION",
    "MCX FUT",
    "CURRENCY FUT",
    "NSE CASH",
    "STOCK FUT",
    "BANKNIFTY OPTION SELLI...",
    "NIFTY OPTION SELLING",
    "MCX OPTION",
    "FINNIFTY FUT",
    "FINNIFTY OPTION",
  ];
  const ordertype = ["Select Order Type", "MIS", "NRML", "LIMIT", "BO", "CO"];
  const tradingype = ["Select Trading Type", "Intraday", "Positional"];
  const exchange = ["Index Futures"];
  const tradetype = ["Favour", "Our", "Both"];

  useEffect(() => {
    dispatch(strategyMarketplace());
  }, []);

  // useEffect(() => {
  // 	console.log('=====sds', strategyData, ourStrategyData);
  // 	setOurStrategyArray(ourStrategyData);
  // }, [ourStrategyData]);

  // useEffect(() => {
  // 	console.log('=====sds', strategyData, ourStrategyData);
  //  setStrategyArray(strategyData);
  // }, [strategyData]);

  const handleChange = (e, newValue = "string") => {
    setValue(newValue);

    if (newValue == "maintab2") {
      getOurStartegy();
    }
  };

  const getOurStartegy = () => {
    dispatch(getStrategyMarketplace());
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => {
    //deploy
    setOpen(false);
  };

  const deployModal = () => {
    dispatch(addStrategy({ id: id, type: tradetypeshand }));
    handleClose();
  };

  const handleSquareOff = () => {
    if (tradetypeshand == "Live") {
      dispatch(squareOffAllLive());
      setOpen3(false);
    }
  };

  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingStrategyId, setDeletingStrategyId] = useState(null);
  const openDeleteConfirmation = (strategyId) => {
    setDeletingStrategyId(strategyId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setDeletingStrategyId(null);
    setDeleteConfirmationOpen(false);
  };

  // Dropdown tab
  const tradetypesdrp = (event) => {
    settradetypeshand(event.target.value);
  };
  const segmentdrp = (event) => {
    setsegments(event.target.value);
  };
  const ordertypedrp = (event) => {
    setorder(event.target.value);
  };
  const tradingtypedrp = (event) => {
    settardingtype(event.target.value);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const getMarketPlace = () => {
    const marketplace = [];
    if (strategyArray?.length !== 0) {
      for (let i = 0; i < strategyArray.length; i++) {
        marketplace.push(
          <Grid item xs={12} sm={10} lg={6} xl={6}>
            <Box className="strategyCard">
              <Box className="strategyCard-header">
                <Box className="strategyCard-title">
                  <Typography
                    component={"p"}
                    className="title"
                    style={{ color: "#24a959" }}
                  >
                    {strategyArray[i].stratergyname}
                  </Typography>
                  <Typography component={"p"} className="short">
                    {" "}
                    Stratergy Code : {strategyArray[i].shortcode}
                  </Typography>

                  <Typography component={"p"} className="days">
                    Created by
                    <Typography component={"span"}>
                      {strategyArray[i].created_by}
                    </Typography>
                  </Typography>
                </Box>
                {/* <Button className="copyShare-link">
									<ShareIcon />
								</Button> */}
              </Box>
              <Box className="strategyCard-body">
                <Box
                  className="selectiondiv-box m-rb fullWidth"
                  sx={{ flexWrap: "nowrap", alignItems: "center" }}
                >
                  <Grid container spacing={2} className="title-label">
                    <Grid item xs={6} md={4}>
                      <label component={"p"} className="drop">
                        Segment
                      </label>
                      <Dropdown
                        val={segment}
                        disabled={true}
                        value={strategyArray[i].segment}
                      />
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <label component={"p"} className="title-label">
                        {" "}
                        Type
                      </label>
                      <Dropdown
                        val={exchange}
                        value={strategyArray[i].type}
                        disabled={true}
                      />
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <label component={"p"} className="title-label">
                        Trend Signal
                      </label>
                      <Dropdown
                        val={tradetype}
                        value={strategyArray[i].trend_signal}
                        disabled={true}
                      />
                    </Grid>

                    <Grid item xs={6} md={4}>
                      <Box className="formBox">
                        <Box
                          className="formItems"
                          sx={{
                            maxWidth: "100%",
                            marginBottom: "0 !important",
                          }}
                        >
                          {/* <Box className="inputFields space fullWidth">
														<InputBase placeholder="Total QTY" />
													</Box> */}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box className="strategyCard-footer">
                <Button
                  className="strategyCard-btn bg-solid"
                  onClick={() => handleClickOpen(strategyArray[i].id)}
                >
                  Deploy
                </Button>
              </Box>
              <Box className="strategyCard-footer sc_fb">
                <Typography component={"p"}>
                  <Typography component={"span"}>Note :-</Typography> Before
                  deploy strategy for live trade do first paper trade and build
                  your trading confidance. There is no responsibility profit and
                  loss our trading product.
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      }
    }
    return marketplace;
  };

  const getStrategies = () => {
    const myStrategy = [];
    if (ourStrategyArray.length !== 0) {
      for (let i = 0; i < ourStrategyArray?.length; i++) {
        myStrategy.push(
          <Grid item xs={12} sm={10} lg={6} xl={6}>
            <Box className="strategyCard">
              <Box className="strategyCard-header">
                <Box className="strategyCard-title">
                  <Typography component={"p"} className="title">
                    {ourStrategyArray[i].stratergyname}
                  </Typography>
                  <Typography component={"p"} className="days">
                    Created by
                    <Typography component={"span"}>
                      {ourStrategyArray[i].created_by}
                    </Typography>
                  </Typography>
                </Box>
              </Box>
              <Box className="strategyCard-body">
                <Box
                  className="selectiondiv-box m-rb fullWidth"
                  sx={{ flexWrap: "nowrap", alignItems: "center" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                      <label component={"p"} className="title">
                        {" "}
                        Segment
                      </label>
                      <Dropdown
                        val={segment}
                        disabled={true}
                        value={ourStrategyArray[i].segment}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <label component={"p"} className="title">
                        {" "}
                        Type
                      </label>
                      <Dropdown
                        val={exchange}
                        disabled={true}
                        value={ourStrategyArray[i].type}
                      />
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <label component={"p"} className="title">
                        {" "}
                        Trend Signal
                      </label>
                      <Dropdown
                        val={tradetype}
                        disabled={true}
                        value={ourStrategyArray[i].trend_signal}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  className="selectiondiv-box m-rb fullWidth"
                  sx={{ flexWrap: "nowrap", alignItems: "center" }}
                ></Box>
              </Box>
              <Box className="strategyCard-footer">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <div class="on-off-switch">
                    <input
                      type="checkbox"
                      id="toggle-switch"
                      class="toggle-input"
                    />
                    <Button
                      className="squareOff-btn solidButton"
                      sx={{ width: "auto !important", fontSize: "1.2rem" }}
                      onClick={() => {
                        confirm("Are you sure you want to delete strategy?")
                          .then(async (e) => {
                            dispatch(
                              deleteStrategyMarketplace({
                                id: ourStrategyArray[i].id,
                              })
                            );
                          })
                          .catch((err) => {});
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Box>
              </Box>
            </Box>
          </Grid>
        );
      }
    }
    return myStrategy;
  };

  return (
    <>
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
              <Tab label="Marketplace" value="maintab1" />
              <Tab label="My Strategies" value="maintab2" />
            </TabList>

            {/* {value == "maintab2" && (
              <Button
                className="squareOff-btn solidButton"
                sx={{ width: "auto !important", fontSize: "1.2rem" }}
                onClick={handleClickOpen3}
              >
                SquareOff All
              </Button>
            )} */}
          </Box>

          <Box
            sx={{
              height: "80vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <TabPanel value="maintab1" sx={{ padding: 0 }}>
              <Box sx={{ maxWidth: 1300, margin: "0 auto" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: { xs: "center", lg: "left" } }}
                >
                  {getMarketPlace()}
                </Grid>
              </Box>
              <PaginationComponent
                key={"1"}
                data={strategyData}
                setData={setStrategyArray}
              />
            </TabPanel>

            <TabPanel value="maintab2" sx={{ padding: 0, marginTop: "1.5rem" }}>
              <Box sx={{ maxWidth: 1300, margin: "0 auto" }}>
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: { xs: "center", lg: "left" } }}
                >
                  {getStrategies()}
                </Grid>
              </Box>
              <PaginationComponent
                key="2"
                data={ourStrategyData}
                setData={setOurStrategyArray}
              />
              {/* <Pagination count={10} /> */}
            </TabPanel>
          </Box>
        </TabContext>
      </Box>

      {/* Deploy Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        className="commonModal deployModal"
        fullWidth
      >
        <Box className="modalHeader">
          <Typography component={"h4"}>Passive Income Earner</Typography>
          <Button onClick={handleClose} className="closeModal">
            <img src={close} />
          </Button>
        </Box>
        <DialogContent
          className="modalBody"
          sx={{ paddingTop: "6rem !important" }}
        >
          <DialogContentText>
            <Box className="formBox">
              <Grid container spacing={1} justifyContent="center">
                <Grid item xs={12} md={6} xl={12}>
                  <Box className="formItems">
                    <Typography component={"label"} className="label important">
                      Select Trade Type:
                    </Typography>
                    <Box className="selectionDiv">
                      <FormControl
                        className="dropdown-ap"
                        sx={{ width: "100%" }}
                      >
                        <Select
                          value={tradetypeshand}
                          onChange={tradetypesdrp}
                          className="dropdown"
                        >
                          {tradetypes.map((vals, index) => (
                            <MenuItem value={vals} key={index}>
                              {vals}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={12} md={6}>
                      <Box className="formItems">
                        <Button
                          onClick={deployModal}
                          className="modal-btn btn-primary"
                        >
                          Deploy
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Sqaure Off */}
      <Dialog
        open={open2}
        onClose={handleClose2}
        className="commonModal squareOff"
        fullWidth
      >
        <Box className="modalHeader">
          <Typography component={"h4"}>Square Off</Typography>
          <Button onClick={handleClose2} className="closeModal">
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
              Are You Sure You Want to Close Position !
            </Typography>

            <Box sx={{ display: { xs: "flex" }, marginTop: 2 }}>
              <Button
                onClick={handleClose2}
                className="modal-btn btn-danger"
                sx={{ marginRight: "0.5rem" }}
              >
                Discard
              </Button>
              <Button
                onClick={handleClose2}
                className="modal-btn btn-primary"
                sx={{ marginLeft: "0.5rem" }}
              >
                Confirm
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Sqaure Off with Dropdown */}
      <Dialog
        open={open3}
        onClose={handleClose3}
        className="commonModal squareOff"
        fullWidth
      >
        <Box className="modalHeader">
          <Typography component={"h4"}>Square Off</Typography>
          <Button onClick={handleClose3} className="closeModal">
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
              Are You Sure You Want to Close Position !
            </Typography>
            <Box className="formBox">
              <Box className="formItems" sx={{ marginTop: 2 }}>
                {/* <Typography component={'label'} className='label important'>Select Trade Type:</Typography> */}
                <Box className="selectionDiv">
                  <FormControl className="dropdown-ap" sx={{ width: "100%" }}>
                    <Select
                      value={tradetypeshand}
                      onChange={tradetypesdrp}
                      className="dropdown"
                    >
                      {tradetypes.map((vals, index) => (
                        <MenuItem value={vals} key={index}>
                          {vals}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex" }, marginTop: 2 }}>
              <Button
                onClick={handleClose3}
                className="modal-btn btn-danger"
                sx={{ marginRight: "0.5rem" }}
              >
                Discard
              </Button>
              <Button
                onClick={handleSquareOff}
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
}
