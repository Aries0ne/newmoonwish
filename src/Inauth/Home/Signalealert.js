import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
  Dialog,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import close from "../../images/close.png";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./Signalealert.scss";
import { strategyMarketplace } from "../../redux/actions/strategyAction";
import { PutStrstegydata } from "../../redux/actions/adminActions";

const exclamination = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18C4.03535 18 0 13.9647 0 9C0 4.03535 4.03535 0 9 0C13.9647 0 18 4.03535 18 9C18 13.9647 13.9647 18 9 18ZM9 1.25581C4.73023 1.25581 1.25581 4.73023 1.25581 9C1.25581 13.2698 4.73023 16.7442 9 16.7442C13.2698 16.7442 16.7442 13.2698 16.7442 9C16.7442 4.73023 13.2698 1.25581 9 1.25581Z"
      fill="currentColor"
    />
    <path
      d="M8.99998 10.4651C8.65672 10.4651 8.37207 10.1805 8.37207 9.83721V5.65116C8.37207 5.30791 8.65672 5.02325 8.99998 5.02325C9.34323 5.02325 9.62788 5.30791 9.62788 5.65116V9.83721C9.62788 10.1805 9.34323 10.4651 8.99998 10.4651Z"
      fill="currentColor"
    />
    <path
      d="M8.99981 13.186C8.89097 13.186 8.78213 13.1608 8.68167 13.119C8.5812 13.0771 8.48911 13.0185 8.40539 12.9432C8.33004 12.8595 8.27143 12.7757 8.22957 12.6669C8.18771 12.5664 8.1626 12.4576 8.1626 12.3488C8.1626 12.2399 8.18771 12.1311 8.22957 12.0306C8.27143 11.9302 8.33004 11.8381 8.40539 11.7543C8.48911 11.679 8.5812 11.6204 8.68167 11.5785C8.8826 11.4948 9.11702 11.4948 9.31795 11.5785C9.41841 11.6204 9.5105 11.679 9.59423 11.7543C9.66957 11.8381 9.72818 11.9302 9.77004 12.0306C9.8119 12.1311 9.83702 12.2399 9.83702 12.3488C9.83702 12.4576 9.8119 12.5664 9.77004 12.6669C9.72818 12.7757 9.66957 12.8595 9.59423 12.9432C9.5105 13.0185 9.41841 13.0771 9.31795 13.119C9.21748 13.1608 9.10864 13.186 8.99981 13.186Z"
      fill="currentColor"
    />
  </svg>
);

const symbolsItem = [
  "Symbol 1",
  "Symbol 2",
  "Symbol 3",
  "Symbol 4",
  "Symbol 5",
];

export default function Signalalert(props) {
  const [value, setValue] = useState("maintab2");
  const [bsopen, setbsopen] = useState(false);
  const [symbols, setSymbols] = useState(0);
  const [state, setState] = useState("");

  const dispatch = useDispatch();
  const handleChange = (e, newValue = "string") => {
    setValue(newValue);
  };

  console.log("state", state);

  const handleChangeField = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const data = {
    buy_entry_lot: state?.buy,
    sell_entry_lot: state?.sell,
    target1b: state?.target1b,
    target2b: state?.target2b,
    target3b: state?.target3b,
    target4b: state?.target4b,
    target5b: state?.target5b,
    target6b: state?.target6b,
    target7b: state?.target7b,
    target1s: state?.target1s,
    target2s: state?.target2s,
    target3s: state?.target3s,
    target4s: state?.target4s,
    target5s: state?.target5s,
    target6s: state?.target6s,
    target7s: state?.target7s,
    slb: state?.slb,
    sls: state?.sls,
  };

  const buysellpopup = () => {
    setbsopen(true);
  };

  const buysellClose = () => {
    setbsopen(false);
  };

  const buysellSave = () => {
    dispatch(PutStrstegydata(data)).then(() => {
      buysellClose();
    });
  };

  const symbolsdrp = (event) => {
    setSymbols(event.target.value);
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
              {/* <Tab label="Marketplace" value="maintab1" /> */}
              <Tab label="Marketplace" value="maintab2" />
              <Tab label="Deployed" value="maintab3" />
            </TabList>
          </Box>

          <Box
            sx={{
              height: "80vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <TabPanel value="maintab1" sx={{ padding: 0 }}>
              <Box className="signal_alertcard">
                <Typography component={"p"}>
                  Created : 1 year ago | live deployment: 370
                </Typography>

                <Box className="alertcard_box">
                  <Box className="strategy_name">
                    <Typography component={"h2"}>
                      Passive Income Earner
                    </Typography>
                    <Typography component={"a"} href="#">
                      Read More...
                    </Typography>
                  </Box>
                  <Box className="alertcard_action">
                    <Button className="subscribe">Subscribe</Button>
                    <Button className="like">
                      <FavoriteBorderIcon />
                    </Button>
                  </Box>
                </Box>
                <Box className="strategy_details">
                  <Box className="by_box">
                    <Typography component={"span"}>by :</Typography>
                    <Typography component={"p"}>Algo Edge Capital</Typography>
                    <Box className="status inactive"></Box>
                  </Box>

                  <Box className="strategy_badge">
                    <Typography component={"span"}>NFO</Typography>
                    <Typography component={"span"}>intraday</Typography>
                    <Typography component={"span"}>EarnTheta</Typography>
                    <Typography component={"span"}>Directional</Typography>
                    <Typography component={"span"}>Bullish</Typography>
                    <Typography component={"span"}>Bearish</Typography>
                    <Typography component={"span"}>TrendFollowing</Typography>
                    <Typography component={"span"}>Momentum</Typography>
                    <Typography component={"span"}>EventBased</Typography>
                  </Box>

                  <Box className="strategy_countbox">
                    <Box className="strategy_countboxItem">
                      <Box className="strategy_header">
                        <Typography component={"h4"}>Trades/~Costs</Typography>
                        <Typography component={"span"}>
                          {exclamination}
                        </Typography>
                      </Box>
                      <Typography component={"h3"}>
                        188
                        <Typography component={"sub"}>₹ 3.8 K</Typography>
                      </Typography>
                    </Box>
                    <Box className="strategy_countboxItem">
                      <Box className="strategy_header">
                        <Typography component={"h4"}>Drawdown</Typography>
                        <Typography component={"span"}>
                          {exclamination}
                        </Typography>
                      </Box>
                      <Typography component={"h3"}>
                        188
                        <Typography component={"sub"}>6%</Typography>
                      </Typography>
                    </Box>
                    <Box className="strategy_countboxItem">
                      <Box className="strategy_header">
                        <Typography component={"h4"}>Min Capital</Typography>
                        <Typography component={"span"}>
                          {exclamination}
                        </Typography>
                      </Box>
                      <Typography component={"h3"}>
                        188
                        <Typography component={"sub"}>₹ 310 K</Typography>
                      </Typography>
                    </Box>
                    <Box className="strategy_countboxItem">
                      <Box className="strategy_header">
                        <Typography component={"h4"}>Monthly Fee</Typography>
                        <Typography component={"span"}>
                          {exclamination}
                        </Typography>
                      </Box>
                      <Typography component={"h3"}>
                        <Typography component={"sub"}>Free</Typography>
                        +5%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value="maintab2" sx={{ padding: 0 }}>
              <Box className="signal_alertcard">
                <Typography component={"p"}>
                  Created : 1 year ago | live deployment: 370
                </Typography>

                <Box className="alertcard_box">
                  <Box className="strategy_name">
                    <Typography component={"h2"}>
                      Passive Income Earner
                    </Typography>
                    <Typography component={"a"} href="#">
                      Read More...
                    </Typography>
                  </Box>
                  <Box className="alertcard_action">
                    <Button className="subscribe" onClick={buysellpopup}>
                      Deploy
                    </Button>
                    <Button className="subscribe unsubscribe">
                      Unsubscribe
                    </Button>
                  </Box>
                </Box>
                <Box className="strategy_details">
                  <Box className="by_box">
                    <Typography component={"span"}>by :</Typography>
                    <Typography component={"p"}>Algo Edge Capital</Typography>
                    <Box className="status inactive"></Box>
                  </Box>

                  <Box className="strategy_badge">
                    <Typography component={"span"}>NFO</Typography>
                    <Typography component={"span"}>intraday</Typography>
                    <Typography component={"span"}>EarnTheta</Typography>
                    <Typography component={"span"}>Directional</Typography>
                    <Typography component={"span"}>Bullish</Typography>
                    <Typography component={"span"}>Bearish</Typography>
                    <Typography component={"span"}>TrendFollowing</Typography>
                    <Typography component={"span"}>Momentum</Typography>
                    <Typography component={"span"}>EventBased</Typography>
                  </Box>

                  <Box className="strategy_countbox">
                    <Box className="strategy_countboxItem">
                      <Box className="strategy_header">
                        <Typography component={"h4"}>Drawdown</Typography>
                        <Typography component={"span"}>
                          {exclamination}
                        </Typography>
                      </Box>
                      <Typography component={"h3"}>
                        ₹ 19.2 K<Typography component={"sub"}>6%</Typography>
                      </Typography>
                    </Box>
                    <Box className="strategy_countboxItem">
                      <Box className="strategy_header">
                        <Typography component={"h4"}>Min Capital</Typography>
                        <Typography component={"span"}>
                          {exclamination}
                        </Typography>
                      </Box>
                      <Typography component={"h3"}>₹ 310000</Typography>
                    </Box>
                    <Box className="strategy_countboxItem">
                      <Box className="strategy_header">
                        <Typography component={"h4"}>Monthly Fee</Typography>
                        <Typography component={"span"}>
                          {exclamination}
                        </Typography>
                      </Box>
                      <Typography component={"h3"}>
                        <Typography component={"sub"}>Free</Typography>
                        +5%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="maintab3" sx={{ padding: "0 !important" }}>
              <Box
                component={"div"}
                className="border-ap"
                sx={{ padding: "0 !important", borderTop: "none !important" }}
              >
                <TableContainer sx={{ MarginTop: 16, maxHeight: 550 }}>
                  <Table
                    stickyHeader
                    sx={{ minWidth: "100%", maxHeight: 550 }}
                    className={`table tableData`}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Scrip Name</TableCell>
                        <TableCell>Trade</TableCell>
                        <TableCell>Trading Expiry</TableCell>
                        <TableCell>System Expiry</TableCell>
                        <TableCell>Our Entry</TableCell>
                        <TableCell>TGT-0</TableCell>
                        <TableCell>TGT-1</TableCell>
                        <TableCell>TGT-2</TableCell>
                        <TableCell>TGT-3</TableCell>
                        <TableCell>TGT-4</TableCell>
                        <TableCell>TGT-5</TableCell>
                        <TableCell>TGT-6</TableCell>
                        <TableCell>TGT-7</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>BANKNIFTY</TableCell>
                        <TableCell>
                          <Typography component={"p"} className="buy">
                            Lots
                          </Typography>
                          <Typography component={"p"} className="buy">
                            Buy
                          </Typography>
                        </TableCell>
                        <TableCell>C</TableCell>
                        <TableCell>
                          <Typography component={"p"}>66</Typography>
                          <Typography component={"p"}>48337.4</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>--</Typography>
                          <Typography component={"p"}>--</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>--</Typography>
                          <Typography component={"p"}>--</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>15</Typography>
                          <Typography component={"p"}>49183.3</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>12</Typography>
                          <Typography component={"p"}>49183.3</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>12</Typography>
                          <Typography component={"p"}>49304.3</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>9</Typography>
                          <Typography component={"p"}>49425</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>6</Typography>
                          <Typography component={"p"}>49545.85</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>3</Typography>
                          <Typography component={"p"}>49666.7</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>3</Typography>
                          <Typography component={"p"}>49787.5</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bull CF</TableCell>
                        <TableCell>
                          <Typography component={"p"} className="sell">
                            Lots
                          </Typography>
                          <Typography component={"p"} className="sell">
                            Sell
                          </Typography>
                        </TableCell>
                        <TableCell>C</TableCell>
                        <TableCell>
                          <Typography component={"p"}>66</Typography>
                          <Typography component={"p"}>48337.4</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"} className="sell">
                            47700
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>--</Typography>
                          <Typography component={"p"}>--</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>15</Typography>
                          <Typography component={"p"}>49183.3</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>12</Typography>
                          <Typography component={"p"}>49183.3</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>12</Typography>
                          <Typography component={"p"}>49304.3</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>9</Typography>
                          <Typography component={"p"}>49425</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>6</Typography>
                          <Typography component={"p"}>49545.85</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>3</Typography>
                          <Typography component={"p"}>49666.7</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography component={"p"}>3</Typography>
                          <Typography component={"p"}>49787.5</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  className="tablePagination"
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "end" },
                    padding: "0 1rem",
                  }}
                >
                  {/* <TablePagination
          rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          SelectProps={{
            fontSize: "1.6rem",
            native: false,
          }}
          page={page}
          className="tablePagination"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
                </Box>
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>

      <Dialog
        open={bsopen}
        onClose={buysellClose}
        className={`commonModal`}
        fullWidth
      >
        <Box className="modalHeader">
          <Typography component={"h4"}>Deploy</Typography>
          <Button onClick={buysellClose} className="closeModal">
            <img src={close} />
          </Button>
        </Box>

        <DialogContent className="modalBody">
          <DialogContentText>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <Box className="formBox">
                  <Box className="formItems" sx={{ marginTop: 2 }}>
                    <Typography component={"label"} className="label important">
                      Select Symbol
                    </Typography>
                    <Box className="selectionDiv">
                      <FormControl
                        className="dropdown-ap"
                        sx={{ width: "100%" }}
                      >
                        <Select
                          value={symbols}
                          onChange={symbolsdrp}
                          className="dropdown"
                        >
                          {symbolsItem.map((vals, index) => (
                            <MenuItem value={vals} key={index}>
                              {vals}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component={"label"}
                  className="label"
                  sx={{ fontWeight: 600 }}
                >
                  Entry Lots
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Buy
                  </Typography>
                  <InputBase
                    placeholder="TGT0"
                    className="userInput"
                    fullWidth
                    name="buy"
                    onChange={handleChangeField}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Sell
                  </Typography>
                  <InputBase
                    placeholder="TGT0"
                    className="userInput"
                    fullWidth
                    name="sell"
                    onChange={handleChangeField}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Buy Targets
                  </Typography>
                  <Box
                    component={"div"}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(4, 1fr)",
                        md: "repeat(8, 1fr)",
                      },
                      gap: 0.5,
                    }}
                  >
                    <InputBase
                      placeholder="TGT0"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target1b"
                    />
                    <InputBase
                      placeholder="TGT1"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target2b"
                    />
                    <InputBase
                      placeholder="TGT2"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target3b"
                    />
                    <InputBase
                      placeholder="TGT3"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target4b"
                    />
                    <InputBase
                      placeholder="TGT4"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target5b"
                    />
                    <InputBase
                      placeholder="TGT5"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target6b"
                    />
                    <InputBase
                      placeholder="TGT6"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target7b"
                    />
                    <InputBase
                      placeholder="TGT7"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target8b"
                    />
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Sell Targets
                  </Typography>
                  <Box
                    component={"div"}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(4, 1fr)",
                        md: "repeat(8, 1fr)",
                      },
                      gap: 0.5,
                    }}
                  >
                    <InputBase
                      placeholder="TGT0"
                      className="userInput"
                      fullWidths
                      onChange={handleChangeField}
                      name="target1s"
                    />
                    <InputBase
                      placeholder="TGT1"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target2s"
                    />
                    <InputBase
                      placeholder="TGT2"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target3s"
                    />
                    <InputBase
                      placeholder="TGT3"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target4s"
                    />
                    <InputBase
                      placeholder="TGT4"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target5s"
                    />
                    <InputBase
                      placeholder="TGT5"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target6s"
                    />
                    <InputBase
                      placeholder="TGT6"
                      className="userInput"
                      fullWidth
                      onChange={handleChangeField}
                      name="target7s"
                    />
                    {/* <InputBase
                      placeholder="TGT7"
                      className="userInput"
                      fullWidth
                      name="target8s"
                    /> */}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Buy Stoploss
                  </Typography>
                  <InputBase
                    placeholder="buy stoploss"
                    className="userInput"
                    fullWidth
                    onChange={handleChangeField}
                    name="slb"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Sell Stoploss
                  </Typography>
                  <InputBase
                    placeholder="sell stoploss"
                    className="userInput"
                    fullWidth
                    onChange={handleChangeField}
                    name="sls"
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 0.5,
                    marginTop: 2,
                  }}
                  className="border-top"
                >
                  <Button
                    className="modal-btn btn-danger"
                    onClick={() => buysellClose()}
                    fullWidth
                  >
                    close
                  </Button>
                  <Button
                    className="modal-btn btn-primary"
                    onClick={() => buysellSave()}
                    fullWidth
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
