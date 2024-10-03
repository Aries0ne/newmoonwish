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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Dropdown from "../Dropdown/Dropdown";
import Tablesearch from "../Tablesearch/Tablesearch";
import React, { useEffect } from "react";
import { useState } from "react";
import "./Ath.scss";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAthPortfolio,
  postAddPortfolio,
  postAth,
  postAthAddPortfolio,
} from "../../redux/actions/athActions";
import { useTheme } from "@emotion/react";
import moment from "moment";

const Ath = () => {
  let title = "Segment";
  let drpValue = ["MCC", "WCC", "DCC"];
  let title2 = "Status";
  let drpValue2 = ["All", "CC", "ON", "NIL"];
  let title3 = "Trade Status";
  let drpValue3 = [
    "All",
    "NIL",
    "Entry",
    "Target 1",
    "Target 2",
    "Target 3",
    "Target 4",
    "Target 5",
  ];
  let title4 = "Sort By";
  let drpValue4 = ["Name", "Market Cap", "Company Age"];
  const col = [
    "SYMBOL",
    "MARKET CAP/AGE",
    "RH",
    "CC",
    "ENTRY",
    "TARGETS",
    "SL",
    "ACTION",
  ];
  const analysis = [
    {
      Symbol: (
        <Box className="AthData">
          <Box className="TableData">
            RECLTD
            <Typography component="h5" className="rate up">
              <Box className="up">
                <TrendingUpIcon />
              </Box>
              <Box className="up">198.95</Box>
            </Typography>
          </Box>
          <Box className="MarketData">
            <Box className="MarketData up">MCC</Box>
            <Box className="MarketData down">NIL</Box>
          </Box>
        </Box>
      ),
      MARKET: (
        <Box className="Market">
          <Box>65550.95 cr</Box>
          <Box>20y 6m</Box>
        </Box>
      ),
      RH: (
        <Box className="Market">
          <Box>1019.95</Box>
          <Box>Nom 9th 2021</Box>
        </Box>
      ),
      CC: (
        <Box className="Market">
          <Box>1019.95</Box>
          <Box>Nom 9th 2021</Box>
        </Box>
      ),
      ENTRY: (
        <Box className="Market">
          <Box>1019.95</Box>
          <Box>Nom 9th 2021</Box>
        </Box>
      ),
      TARGETS: (
        <Box className="Market">
          <Box>1019.95</Box>
          <Box>Targets 1</Box>
        </Box>
      ),
      SL: <Box className="Market">1019.95</Box>,
      ACTION: (
        <Box>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <title>edit / plus_circle</title>
            <defs>
              <rect id="path-1" x="0" y="0" width="24" height="24"></rect>
            </defs>
            <g
              id="Symbols"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="edit-/-plus_circle">
                <mask id="mask-2" fill="white">
                  <use href="#path-1"></use>
                </mask>
                <g id="edit-/-plus_circle-(Background/Mask)"></g>
                <path
                  d="M2,12 C2,6.48000002 6.48000002,2 12,2 C17.5200005,2 22,6.48000002 22,12 C22,17.5200005 17.5200005,22 12,22 C6.48000002,22 2,17.5200005 2,12 C2,8.32000001 2,8.32000001 2,12 Z M13,13 L17,13 L17,11 L13,11 L13,7 L11,7 L11,11 L7,11 L7,13 L11,13 L11,17 L13,17 L13,13 L13,13 Z"
                  fill="currentColor"
                  mask="url(#mask-2)"
                ></path>
              </g>
            </g>
          </svg>
        </Box>
      ),
    },
  ];

  const myportfolio = [
    {
      Symbol: (
        <Box className="AthData">
          <Box className="TableData">
            RECLTD
            <Typography component="h5" className="rate down">
              <Box className="up">
                <TrendingDownIcon />
              </Box>
              <Box className="up">200.95</Box>
            </Typography>
          </Box>
          <Box className="MarketData">
            <Box className="MarketData up">MCC</Box>
            <Box className="MarketData down">NIL</Box>
          </Box>
        </Box>
      ),
      MARKET: (
        <Box className="Market">
          <Box>850.95 cr</Box>
          <Box>20y 6m</Box>
        </Box>
      ),
      RH: (
        <Box className="Market">
          <Box>250.95</Box>
          <Box>Nom 9th 2021</Box>
        </Box>
      ),
      CC: (
        <Box className="Market">
          <Box>550.95</Box>
          <Box>Nom 9th 2021</Box>
        </Box>
      ),
      ENTRY: (
        <Box className="Market">
          <Box>630.95</Box>
          <Box>Nom 9th 2021</Box>
        </Box>
      ),
      TARGETS: (
        <Box className="Market">
          <Box>1020.95</Box>
          <Box>Targets 1</Box>
        </Box>
      ),
      SL: <Box className="Market">500.95</Box>,
      ACTION: (
        <Box>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
          >
            <title>edit / plus_circle</title>
            <defs>
              <rect id="path-1" x="0" y="0" width="24" height="24"></rect>
            </defs>
            <g
              id="Symbols"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="edit-/-plus_circle">
                <mask id="mask-2" fill="white">
                  <use href="#path-1"></use>
                </mask>
                <g id="edit-/-plus_circle-(Background/Mask)"></g>
                <path
                  d="M2,12 C2,6.48000002 6.48000002,2 12,2 C17.5200005,2 22,6.48000002 22,12 C22,17.5200005 17.5200005,22 12,22 C6.48000002,22 2,17.5200005 2,12 C2,8.32000001 2,8.32000001 2,12 Z M13,13 L17,13 L17,11 L13,11 L13,7 L11,7 L11,11 L7,11 L7,13 L11,13 L11,17 L13,17 L13,13 L13,13 Z"
                  fill="currentColor"
                  mask="url(#mask-2)"
                ></path>
              </g>
            </g>
          </svg>
        </Box>
      ),
    },
  ];

  const [Segment, setSegment] = useState(["DCC"]);
  const [Status, setStatus] = useState("All");
  const [TradeStatus, setTradeStatus] = useState("All");
  const [SortBy, setSortBy] = useState("Name");
  const [alignment, setAlignment] = useState("analysis");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [athviewdata, setAthviewData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

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

  const handleSegment = (event) => {
    // setSegment(e.target.value);
    const {
      target: { value },
    } = event;
    setSegment(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleTradeStatus = (e) => {
    setTradeStatus(e.target.value);
  };
  useEffect(() => {
    handleSubmit();
  }, [TradeStatus, Status, Segment]);

  const handleSubmit = () => {
    dispatch(
      postAth({ version: Segment, status: Status, tradestatus: TradeStatus })
    );
  };

  const handleClickId = (id) => {
    navigate("/athdetails", {
      state: {
        id,
      },
    });
  };

  const handleAddPortfolio = (id) => {
    dispatch(postAthAddPortfolio({ id: id }));
    dispatch(getAthPortfolio());
    handleSubmit();
  };

  useEffect(() => {
    dispatch(getAthPortfolio());
  }, [alignment]);

  const PortfolioData = useSelector((state) => state.Ath.PortfolioData);
  const AthData = useSelector((state) => state.Ath.athData);

  const PortfolioId = portfolioData.map(function (item) {
    return item["id"];
  });

  //AthData
  useEffect(() => {
    let newArr = [];

    for (let index = 0; index < AthData.length; index++) {
      const element = AthData[index];
      newArr.push({
        id: element?.id,
        Symbol: (
          <Box className="AthData">
            <Box sx={{ display: "flex !important", alignItems: "center" }}>
              <Box className="TableData">
                <Typography component="p" className="symbol">
                  {element?.symbol}
                </Typography>
              </Box>
              <Box className="MarketData">
                <Box className="MarketData up">{element?.version}</Box>
                <Box className="MarketData down">{element?.status}</Box>
              </Box>
            </Box>
            {Math.sign(element?.ath) === 1 ? (
              <Typography component="h5" className="rate up">
                <Box className="up">
                  <TrendingUpIcon />
                </Box>
                <Box className="up">{element?.ath}</Box>
              </Typography>
            ) : (
              <Typography component="h5" className="rate down">
                <Box className="down">
                  <TrendingDownIcon />
                </Box>
                <Box className="down">{element?.ath}</Box>
              </Typography>
            )}
          </Box>
        ),
        MARKET:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">
              <Box>{Number(element?.marketcap / 10000000).toFixed(2)} cr</Box>
              <Box>
                {/* 20y 6m */}
                {moment().diff(element?.inceptiondate, "years")}y{" "}
                {moment().diff(element?.inceptiondate, "months") % 12}m
              </Box>
            </Box>
          ),
        RH:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">
              <Box className="first">{element?.ath}</Box>
              <Box className="second">{element?.ath_date}</Box>
            </Box>
          ),
        CC:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">
              <Box className="first">{element?.cc}</Box>
              <Box className="second">{element?.cc_date}</Box>
            </Box>
          ),
        ENTRY:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">
              <Box>{element?.entry}</Box>
              {/* <Box>
              Nom 9th 2021
            </Box> */}
            </Box>
          ),
        TARGETS:
          element?.status == "NIL" ? (
            ""
          ) : element?.trade_status == "nan" ? (
            ""
          ) : (
            <Box className="Market">
              {/* <Box>
              1019.95
            </Box> */}
              <Box>{element?.trade_status}</Box>
            </Box>
          ),
        SL:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">{element?.sl}</Box>
          ),
        ACTION: PortfolioId.includes(element.id) ? (
          <Tooltip
            placement="top"
            title={
              <Typography sx={{ fontSize: "1.3rem" }}>
                edit / plus_circle
              </Typography>
            }
          >
            <Button
              className="solidButton fetchReport-btn add"
              // onClick={() => handleAddPortfolio(element?.id)}
            >
              <RemoveCircleIcon />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            placement="top"
            title={
              <Typography sx={{ fontSize: "1.3rem" }}>
                edit / plus_circle
              </Typography>
            }
          >
            <Button
              className="solidButton fetchReport-btn remove"
              onClick={() => handleAddPortfolio(element?.id)}
            >
              <AddCircleIcon />
            </Button>
          </Tooltip>
        ),
      });
    }

    setAthviewData(newArr);
  }, [AthData, PortfolioData, athviewdata]);

  //PortfolioData
  useEffect(() => {
    let newArr = [];

    for (let index = 0; index < PortfolioData.length; index++) {
      const element = PortfolioData[index];
      newArr.push({
        id: element?.id,
        Symbol: (
          <Box className="AthData">
            <Box sx={{ display: "flex !important", alignItems: "center" }}>
              <Box className="TableData">
                <Typography component="p" className="symbol">
                  {element?.symbol}
                </Typography>
              </Box>
              <Box className="MarketData">
                <Box className="MarketData up">{element?.version}</Box>
                <Box className="MarketData down">{element?.status}</Box>
              </Box>
            </Box>
            {Math.sign(element?.ath) === 1 ? (
              <Typography component="h5" className="rate up">
                <Box className="up">
                  <TrendingUpIcon />
                </Box>
                <Box className="up">{element?.ath}</Box>
              </Typography>
            ) : (
              <Typography component="h5" className="rate down">
                <Box className="down">
                  <TrendingDownIcon />
                </Box>
                <Box className="down">{element?.ath}</Box>
              </Typography>
            )}
          </Box>
        ),
        MARKET:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">
              <Box>{Number(element?.marketcap / 10000000).toFixed(2)} cr</Box>
              {/* <Box>
            20y 6m
          </Box> */}
            </Box>
          ),
        RH:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">
              <Box className="first">{element?.ath}</Box>
              <Box className="second">{element?.ath_date}</Box>
            </Box>
          ),
        CC:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">
              <Box className="first">{element?.cc}</Box>
              <Box className="second">{element?.cc_date}</Box>
            </Box>
          ),
        ENTRY:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">
              <Box>{element?.entry}</Box>
              {/* <Box>
            Nom 9th 2021
          </Box> */}
            </Box>
          ),
        TARGETS:
          element?.status == "NIL" ? (
            ""
          ) : element?.trade_status == "nan" ? (
            ""
          ) : (
            <Box className="Market">
              {/* <Box>
            1019.95
          </Box> */}
              <Box>{element?.trade_status}</Box>
            </Box>
          ),
        SL:
          element?.status == "NIL" ? (
            ""
          ) : (
            <Box className="Market">{element?.sl}</Box>
          ),
        ACTION: (
          <Tooltip
            placement="top"
            title={
              <Typography sx={{ fontSize: "1.3rem" }}>
                edit / plus_circle
              </Typography>
            }
          >
            <Button
              className="solidButton fetchReport-btn"
              onClick={() => handleAddPortfolio(element?.id)}
            >
              <RemoveCircleIcon />
            </Button>
          </Tooltip>
        ),
      });
    }

    setPortfolioData(newArr);
  }, [PortfolioData]);

  return (
    <>
      <Box className="border-ap">
        <Box className="tabs">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className="selectiondiv-box" sx={{ marginBottom: 2 }}>
                <Box className="selectionDiv border scroll">
                  <FormControl className="dropdown-ap">
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      value={Segment}
                      onChange={handleSegment}
                      input={<OutlinedInput label="Name" />}
                      className="dropdown"
                    >
                      {drpValue.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box className="selectionDiv bn searchFlex">
                  <Tablesearch
                    // handleChange={handleSearch}
                    placeholder="Search"
                  />
                </Box>
                <Dropdown
                  title={title2}
                  val={drpValue2}
                  value={Status}
                  handleChange={handleStatus}
                />
                <Dropdown
                  title={title3}
                  val={drpValue3}
                  value={TradeStatus}
                  handleChange={handleTradeStatus}
                />
                <Dropdown title={title4} val={drpValue4} value={SortBy} />
                <Box className="selectionDiv bn searchFlex">
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
                    <ToggleButton value="myportfolio">
                      MY PORTFOLIO
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <TableContainer sx={{ MarginTop: 16, maxHeight: 560 }}>
            <Table
              stickyHeader
              sx={{ minWidth: "100%" }}
              className={`table tableData`}
            >
              <TableHead>
                <TableRow>
                  {/* <TableCell>Sr No.</TableCell> */}
                  {col.map((colum, index) => (
                    <TableCell key={index}>{colum}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? (alignment == "analysis"
                      ? athviewdata
                      : portfolioData
                    )?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : alignment == "analysis"
                  ? athviewdata
                  : portfolioData
                )?.map((row, index) => (
                  <TableRow key={index}>
                    {/* <TableCell>
                  <span>
                    {page === 0 ? index + 1 : page * rowsPerPage + index + 1}
                  </span>
                </TableCell> */}
                    {Object.keys(row).map((element, index) =>
                      element !== "id" ? (
                        <TableCell
                          onClick={() =>
                            element === "Symbol" && handleClickId(row?.id)
                          }
                          style={
                            element === "Symbol" ? { cursor: "pointer" } : null
                          }
                          key={index}
                        >
                          {row[element]}
                        </TableCell>
                      ) : null
                    )}
                  </TableRow>
                ))}
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
            <TablePagination
              rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
              count={
                alignment == "analysis"
                  ? athviewdata.length
                  : portfolioData.length
              }
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
        </Box>
      </Box>
    </>
  );
};

export default Ath;
