import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Tab,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  Tooltip,
} from "@mui/material";
import Dropdown from "../../Dropdown/Dropdown";
import Tablesearch from "../../Tablesearch/Tablesearch";
import { useState } from "react";
import "../../Ath/Ath.scss";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { messageEvent, socket } from "../../../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import {
  addIndicatorsData,
  removeIndicatorsData,
} from "../../../redux/actions/adminActions";
import { RemoveOutlined } from "@mui/icons-material";
export default function Indicators2() {
  const [Status, setStatus] = useState("All");
  const [TradeStatus, setTradeStatus] = useState("All");
  const [SortBy, setSortBy] = useState("Name");
  const [alignment, setAlignment] = useState("analysis");
  const [exchange, setExchange] = useState("NSE");
  const [socketState, setSocketState] = useState();
  const [socketPortfolio, setSocketPortfolio] = useState();
  const [indicatorsList, setIndicatorsList] = useState();
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indicatorsData = useSelector(
    (State) => State.Admin.indicatorDataSocket
  );

  const indicatorsPortfolioData = useSelector(
    (State) => State.Admin.indicatorPortfolioDataSocket
  );

  const dispatch = useDispatch();

  const addPortfolio = (
    <Typography sx={{ fontSize: "1.4rem" }}>Add Portfolio</Typography>
  );

  const removePortfolio = (
    <Typography sx={{ fontSize: "1.4rem" }}>Remove Portfolio</Typography>
  );

  const addAlert = (
    <Typography sx={{ fontSize: "1.4rem" }}>Add Alert</Typography>
  );

  const openGraph = (
    <Typography sx={{ fontSize: "1.4rem" }}>Open Graph</Typography>
  );

  const socketCallFunPortfolio = async () => {
    let ws1 = await socket("indicator1");
    setSocketPortfolio(ws1);
    messageEvent(ws1, "indicator1", dispatch, {
      exchange: "NSE",
      symbol: "NA",
      trendstatus: TradeStatus === "All" || !TradeStatus ? "NA" : TradeStatus,
      pagination: 1,
      status: TradeStatus ? "select" : "NA",
    });
  };
  const socketCallFun = async () => {
    let ws = await socket("indicator");
    setSocketState(ws);
    messageEvent(ws, "indicator", dispatch, {
      exchange: "NSE",
      symbol: "NA",
      trendstatus: TradeStatus === "All" || !TradeStatus ? "NA" : TradeStatus,
      pagination: 1,
      status: TradeStatus === "All" || !TradeStatus ? "select" : "NA",
    });
  };
  useEffect(() => {
    socketCallFun();
    return () => {
      if (socketState) {
        socketState.close();
      }
      if (socketPortfolio) {
        socketPortfolio.close();
      }
    };
  }, []);
  useEffect(() => {
    if (alignment == "analysis") {
      if (indicatorsData?.result) {
        setIndicatorsList(indicatorsData?.result);
        setCount(indicatorsData.count);
      }
    } else if (alignment == "myportfolio") {
      if (indicatorsPortfolioData?.result) {
        setIndicatorsList(indicatorsPortfolioData?.result);
        setCount(indicatorsPortfolioData.count);
      }
    }
  }, [indicatorsData, indicatorsPortfolioData]);
  useEffect(() => {
    if (alignment == "analysis") {
      if (socketState) {
        messageEvent(socketState, "indicator", dispatch, {
          exchange: exchange,
          symbol: search.length == 0 ? "NA" : search.toUpperCase(),
          trendstatus:
            TradeStatus == "All" || !TradeStatus ? "NA" : TradeStatus,
          pagination: page + 1,
          status: "NA",
        });
      }
    }
    if (alignment == "myportfolio") {
      if (socketPortfolio) {
        messageEvent(socketPortfolio, "indicator1", dispatch, {
          exchange: exchange,
          symbol: search.length == 0 ? "NA" : search.toUpperCase(),
          trendstatus: TradeStatus == "All" ? "NA" : TradeStatus,
          pagination: page + 1,
          status: "NA",
        });
      }
    }
  }, [search, exchange, TradeStatus, page]);
  const handleSearch = async (event) => {
    setSearch(event.target.value);
  };
  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
    setPage(0);

    if (newAlignment == "analysis") {
      socketCallFun();
      if (socketPortfolio) {
        socketPortfolio.close();
      }
    }

    if (newAlignment == "myportfolio") {
      socketCallFunPortfolio();
      if (socketState) {
        socketState.close();
      }
    }
  };

  const addToPortfolio = (d) => {
    console.log("===", d.id);
    dispatch(addIndicatorsData({ id: d.id }));
  };

  const removeDataPortfolio = (d) => {
    dispatch(removeIndicatorsData({ id: d?.id }));
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleTradeStatus = (e) => {
    setTradeStatus(e.target.value);
  };

  const handleChangeExchange = (e) => {
    setExchange(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    console.log("===called");
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let title = "Exchange";
  let drpValue = ["NSE", "NFO", "CDS", "MCX"];
  let title3 = "Trade Status";
  let drpValue3 = [
    "All",
    "Bullish",
    "Bearish",
    "Bullish Confirmed",
    "Bearish Confirmed",
  ];
  let title4 = "Sort By";
  let drpValue4 = ["None", "Tarde 1"];
  const col = [
    "Symbol",
    "Trend Status",
    "Next Move",
    "Bull/Bear",
    "Bull CF/Bear CF",
    "Trend Status info",
    "Trend Reversal info",
    "Previous Month",
    "Previous Week",
    "Current Week",
    "Action",
  ];
  return (
    <Box className="border-ap">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box className="selectiondiv-box">
            <Dropdown
              title={title}
              val={drpValue}
              value={exchange}
              handleChange={handleChangeExchange}
            />
            <Box className="selectionDiv bn searchFlex">
              <Tablesearch
                placeholder="Search Symbol"
                handleChange={handleSearch}
              />
            </Box>
            <Dropdown
              title={title3}
              val={drpValue3}
              value={TradeStatus}
              handleChange={handleTradeStatus}
            />
            {/* <Dropdown title={title4} val={drpValue4} value={SortBy} /> */}
            <Box className="selectionDiv bn">
              <Typography className="label" component={"label"}>
                Select Type
              </Typography>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleChange}
                className="tradeType-toggle"
              >
                <ToggleButton value="analysis">ANALYSIS</ToggleButton>
                <ToggleButton value="myportfolio">MY PORTFOLIO</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Table sx={{ minWidth: 650 }} className="table tableData">
            <TableHead>
              <TableRow>
                {col.map((items, index) => (
                  <TableCell key={index}>{items}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {indicatorsList?.length > 0 &&
                indicatorsList.map((d) => {
                  return (
                    <TableRow>
                      <TableCell>
                        {d?.symbol}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography component={"span"}>
                            {d?.exhange}
                          </Typography>
                          <Typography component={"span"}>
                            {d?.liveprice}
                          </Typography>
                          <Typography
                            component={"span"}
                            className={d?.pc > 0 ? "open" : "close"}
                          >
                            {d?.pc}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{d?.trendstatus}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography component={"span"}>{d?.fmove}</Typography>
                          <Typography component={"span"}>
                            {Number(d?.fmoveprice).toFixed(2)}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography component={"span"}>{d?.smove}</Typography>
                          <Typography component={"span"}>
                            {d?.smoveprice}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography component={"span"}>{d?.value1}</Typography>
                        <Typography component={"span"}>
                          {d?.value1date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography component={"span"}>{d?.value2}</Typography>
                        <Typography component={"span"}>
                          {d?.value2date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography component={"span"}>{d?.tr_st}</Typography>
                          <Typography component={"span"}>
                            {d?.tr_st_value}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Typography component={"span"}>
                            {d?.tr_re_st}
                          </Typography>
                          <Typography component={"span"}>
                            {d?.tr_re_st_value}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography component={"span"}>H</Typography>
                          <Typography
                            component={"span"}
                            className="up"
                            sx={{
                              display: "inline-block !important",
                              margin: 0.5,
                            }}
                          >
                            {d?.pmh}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography component={"span"}>L</Typography>
                          <Typography
                            component={"span"}
                            className="down"
                            sx={{
                              display: "inline-block !important",
                              margin: 0.5,
                            }}
                          >
                            {d?.pml}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography component={"span"}>H</Typography>
                          <Typography
                            component={"span"}
                            className="up"
                            sx={{
                              display: "inline-block !important",
                              margin: 0.5,
                            }}
                          >
                            {d?.pwh}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography component={"span"}>L</Typography>
                          <Typography
                            component={"span"}
                            className="down"
                            sx={{
                              display: "inline-block !important",
                              margin: 0.5,
                            }}
                          >
                            {d?.pwl}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography component={"span"}>H</Typography>
                          <Typography
                            component={"span"}
                            className="up"
                            sx={{
                              display: "inline-block !important",
                              margin: 0.5,
                            }}
                          >
                            {d?.cwh}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography component={"span"}>L</Typography>
                          <Typography
                            component={"span"}
                            className="down"
                            sx={{
                              display: "inline-block !important",
                              margin: 0.5,
                            }}
                          >
                            {d?.cwl}
                          </Typography>
                        </Box>
                      </TableCell>
                      {alignment == "analysis" ? (
                        <TableCell>
                          <Box className="tableActions">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              className="actionButton"
                            >
                              <Tooltip
                                title={addPortfolio}
                                arrow
                                placement="top"
                              >
                                <Button
                                  className="edit"
                                  variant="text"
                                  onClick={() => addToPortfolio(d)}
                                >
                                  <AddOutlinedIcon />
                                </Button>
                              </Tooltip>
                              <Tooltip title={addAlert} arrow placement="top">
                                <Button className="buy" variant="text">
                                  <ControlPointOutlinedIcon />
                                </Button>
                              </Tooltip>
                              <Tooltip title={openGraph} arrow placement="top">
                                <Button className="del" variant="text">
                                  <BarChartOutlinedIcon />
                                </Button>
                              </Tooltip>
                            </Box>
                          </Box>
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Box className="tableActions">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                              className="actionButton"
                            >
                              <Tooltip
                                title={removePortfolio}
                                arrow
                                placement="top"
                              >
                                <Button
                                  className="edit"
                                  variant="text"
                                  onClick={() => removeDataPortfolio(d)}
                                >
                                  <RemoveOutlined />
                                </Button>
                              </Tooltip>
                            </Box>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <Box
            className="tablePagination"
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "end" },
              padding: "0 1rem",
            }}
          >
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              count={count}
              rowsPerPage={rowsPerPage}
              SelectProps={{
                fontSize: "1.6rem",
                native: false,
              }}
              page={page}
              className="tablePagination"
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
