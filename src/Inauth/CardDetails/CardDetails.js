import React from "react";
import {
  Box,
  Tab,
  Grid,
  Typography,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  TextField,
  Button,
  InputBase,
  ToggleButtonGroup,
  ToggleButton,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Dropdown from "../Dropdown/Dropdown";
import "./CardDetail.scss";
import close from "../../images/close.png";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";

const CardDetails = () => {
  const [value, setValue] = React.useState("maintab1");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [tradetypeshand, settradetypeshand] = React.useState(" ");
  const [segments, setsegments] = React.useState(" ");
  const [order, setorder] = React.useState(" ");
  const [tardingtype, settardingtype] = React.useState(" ");
  // Dropdown
  const tradetypes = ["Select Tradetype", "Paper", "Live"];
  const segment = [
    "Select Segment",
    "Select All",
    "Banknifty Fut",
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
  const exchange = ["Exchange", "NFO"];
  const tradetype = ["Trade Type", "Indtraday"];

  const handleChange = (e, newValue = "string") => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  const marketplace = [];
  const myStrategy = [];
  for (let i = 0; i < 5; i++) {
    marketplace.push(
      <Grid item xs={12} sm={10} lg={6} xl={4}>
        <Box className="strategyCard">
          <Box className="strategyCard-header">
            <Box className="strategyCard-title">
              <Typography component={"p"} className="title">
                BNF Money Plant
              </Typography>
              <Typography component={"p"} className="days">
                Created 11 days ago
                <Typography component={"span"}>by Uday Doshi</Typography>
              </Typography>
            </Box>
            <Button className="copyShare-link">
              <ShareIcon />
            </Button>
          </Box>
          <Box className="strategyCard-body">
            <Box
              className="selectiondiv-box m-rb fullWidth"
              sx={{ flexWrap: "nowrap", alignItems: "center" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={6} md={4}>
                  <Dropdown val={segment} />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Dropdown val={exchange} />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Dropdown val={tradetype} />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Box className="formBox">
                    <Box
                      className="formItems"
                      sx={{ maxWidth: "100%", marginBottom: "0 !important" }}
                    >
                      <Box className="inputFields space fullWidth">
                        <InputBase placeholder="Total QTY Strategy" />
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6} md={4}>
                  <Box className="profilt_loss">
                    <Typography component={"label"}>total Profit</Typography>
                    <Typography component={"p"} className="profit">
                      3,25,000
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Box className="profilt_loss">
                    <Typography component={"label"}>total Loss</Typography>
                    <Typography component={"p"} className="loss">
                      -3,25,000
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Box className="All_total">
                    <Typography component={"h6"}>Total Trade</Typography>
                    <Typography component={"p"} className="loss">
                      200
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={6} md={3}>
                  <Box className="All_total">
                    <Typography component={"h6"}>Total Target Hit</Typography>
                    <Typography component={"p"} className="loss">
                      1500
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box className="All_total">
                    <Typography component={"h6"}>
                      Total Stop-Loss Hit
                    </Typography>
                    <Typography component={"p"} className="loss">
                      1200
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box className="All_total">
                    <Typography component={"h6"}>Cover</Typography>
                    <Typography component={"p"} className="loss">
                      800
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="strategyCard-footer">
            <Button
              className="strategyCard-btn bg-solid"
              onClick={handleClickOpen}
            >
              Deploy
            </Button>
            <Tooltip
              title={
                <Typography sx={{ fontSize: "1.2rem" }}>
                  Click her to download Strategy Back-test Report
                </Typography>
              }
              placement="top"
              arrow
            >
              <Button className="download-btn solidButton">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 11.6669V15.2224C17 15.6939 16.8127 16.1461 16.4793 16.4795C16.1459 16.8129 15.6937 17.0002 15.2222 17.0002H2.77778C2.30628 17.0002 1.8541 16.8129 1.5207 16.4795C1.1873 16.1461 1 15.6939 1 15.2224V11.6669"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11.6667V1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Tooltip>
          </Box>
          <Box className="strategyCard-footer sc_fb">
            <Typography component={"p"}>
              <Typography component={"span"}>Note :-</Typography> Before deploy
              strategy for live trade do first paper trade and build your
              trading confidance. There is no responsibility profit and loss our
              trading product.
            </Typography>
          </Box>
        </Box>
      </Grid>
    );
  }

  for (let i = 0; i < 4; i++) {
    myStrategy.push(
      <Grid item xs={12} sm={10} lg={6} xl={4}>
        <Box className="strategyCard">
          <Box className="strategyCard-header">
            <Box className="strategyCard-title">
              <Typography component={"p"} className="title">
                BNF Money Plant
              </Typography>
              <Typography component={"p"} className="days">
                Created 11 days ago
                <Typography component={"span"}>by Uday Doshi</Typography>
              </Typography>
            </Box>

            <Box className="dayGainLoss" sx={{ textAlign: "center" }}>
              <Box sx={{ display: "block", textAlign: "left", marginRight: 1 }}>
                <Typography component={"span"}>P&L</Typography>
                <Box className="status up"> Live 0.00 </Box>
              </Box>
              <Button
                onClick={handleClickOpen2}
                className="squareOff-btn solidButton"
              >
                <CloseIcon />
              </Button>
            </Box>
          </Box>
          <Box className="strategyCard-body">
            <Box
              className="selectiondiv-box m-rb fullWidth"
              sx={{ flexWrap: "nowrap", alignItems: "center" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={6} md={4}>
                  <Dropdown val={segment} />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Dropdown val={tradetype} />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Box className="formBox">
                    <Box
                      className="formItems"
                      sx={{ maxWidth: "100%", marginBottom: "0 !important" }}
                    >
                      <Box className="inputFields space fullWidth">
                        <InputBase placeholder="Total QY Traded" />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Dropdown val={ordertype} />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Dropdown val={tradingype} />
                </Grid>
              </Grid>
            </Box>
            <Box
              className="selectiondiv-box m-rb fullWidth"
              sx={{ flexWrap: "nowrap", alignItems: "center" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={6} md={4}>
                  <Box className="inputFields space fullWidth">
                    <InputBase type="number" placeholder="Set Target in RS" />
                  </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Box className="inputFields space fullWidth">
                    <TextField
                      type="number"
                      placeholder="Set Loss Limit in RS"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Box className="inputFields space fullWidth">
                    <TextField
                      type="number"
                      placeholder="Set Trailing Stop-Loss in RS"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className="strategyCard-footer">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button className="strategyCard-btn profit">Active</Button>
              <Button className="strategyCard-btn loss">Inactive</Button>
              <Button className="strategyCard-btn bg-solid">Subscribe</Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip
                title={
                  <Typography sx={{ fontSize: "1.2rem" }}>
                    Edit Strategy
                  </Typography>
                }
                placement="top"
                arrow
              >
                <Button className="download-btn solidButton">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    {" "}
                    <path
                      d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                      fill="white"
                    />
                  </svg>
                </Button>
              </Tooltip>
              <Button className="strategyCard-btn bg-solid" disabled>
                Submit
              </Button>
            </Box>
          </Box>
          <Box className="strategyCard-footer sc_fb">
            <Typography component={"p"}>
              <Typography component={"span"}>Note :-</Typography>Start Trading
              in Rs <Typography component={"span"}>400/-</Typography> One
              Segment with One Strategy.
            </Typography>
          </Box>
        </Box>
      </Grid>
    );
  }
  return (
    <>
      <Box className="tabs">
        <TabContext value={value}>
          <TabList className="main-tab" onChange={handleChange}>
            <Tab label="Marketplace" value="maintab1" />
            <Tab label="My Strategies" value="maintab2" />
          </TabList>

          <TabPanel value="maintab1" sx={{ padding: 0, marginTop: "2.4rem" }}>
            <Grid
              container
              spacing={2}
              sx={{ justifyContent: { xs: "center", lg: "left" } }}
            >
              {marketplace}
            </Grid>
          </TabPanel>

          <TabPanel value="maintab2" sx={{ padding: 0, marginTop: "2.4rem" }}>
            <Grid
              container
              spacing={2}
              sx={{ justifyContent: { xs: "center", lg: "left" } }}
            >
              {myStrategy}
            </Grid>
          </TabPanel>
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
              <Grid container spacing={1} justifyContent="right">
                <Grid item xs={12} md={6}>
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
                            <MenuItem
                              value={index === 0 ? " " : index}
                              key={index}
                            >
                              {vals}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="formItems">
                    <Typography component={"label"} className="label important">
                      Select Segment:
                    </Typography>
                    <Box className="selectionDiv">
                      <FormControl
                        className="dropdown-ap"
                        sx={{ width: "100%" }}
                      >
                        <Select
                          value={segments}
                          onChange={segmentdrp}
                          className="dropdown"
                        >
                          {segment.map((vals, index) => (
                            <MenuItem
                              value={index === 0 ? " " : index}
                              key={index}
                            >
                              {vals}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="inputFields space fullWidth">
                    <Typography component={"label"} className="label important">
                      Select Lot Size :
                    </Typography>
                    <TextField
                      value={120}
                      placeholder="Script"
                      className="inputFiled"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="formItems">
                    <Typography component={"label"} className="label important">
                      Select Order Type:
                    </Typography>
                    <Box className="selectionDiv">
                      <FormControl
                        className="dropdown-ap"
                        sx={{ width: "100%" }}
                      >
                        <Select
                          value={order}
                          onChange={ordertypedrp}
                          className="dropdown"
                        >
                          {ordertype.map((vals, index) => (
                            <MenuItem
                              value={index === 0 ? " " : index}
                              key={index}
                            >
                              {vals}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="formItems">
                    <Typography component={"label"} className="label important">
                      Select Trading Type:
                    </Typography>
                    <Box className="selectionDiv">
                      <FormControl
                        className="dropdown-ap"
                        sx={{ width: "100%" }}
                      >
                        <Select
                          value={tardingtype}
                          onChange={tradingtypedrp}
                          className="dropdown"
                        >
                          {tradingype.map((vals, index) => (
                            <MenuItem
                              value={index === 0 ? " " : index}
                              key={index}
                            >
                              {vals}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="inputFields space fullWidth">
                    <Typography component={"label"} className="label">
                      Set Target in Rs:
                    </Typography>
                    <TextField
                      value={30000}
                      placeholder="Script"
                      className="inputFiled"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="inputFields space fullWidth">
                    <Typography component={"label"} className="label">
                      Set Loss Limit is Rs:
                    </Typography>
                    <TextField
                      value={2000}
                      placeholder="Script"
                      className="inputFiled"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className="inputFields space fullWidth">
                    <Typography component={"label"} className="label">
                      Set Trailing Stop Loss in Rs:
                    </Typography>
                    <TextField
                      value={600}
                      placeholder="Script"
                      className="inputFiled"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button
                    onClick={handleClose}
                    className="modal-btn btn-primary"
                  >
                    Deploy
                  </Button>
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
    </>
  );
};

export default CardDetails;
