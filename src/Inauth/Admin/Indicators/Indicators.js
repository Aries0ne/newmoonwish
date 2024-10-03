import React from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { TabContext } from "@mui/lab";
import Tablesearch from "../../Tablesearch/Tablesearch";
import Dropdown from "../../Dropdown/Dropdown";
import "../../Table/Table.scss";
import "../Indicators/Indicators.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getIndicatorsData,
  getSingleIndicatorData,
} from "../../../redux/actions/adminActions";
import moment from "moment";

const down = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L5 5L9 1"
      stroke="#FF231F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const up = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L5 1L9 5"
      stroke="#008F75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Indicators(props) {
  const dispatch = useDispatch();
  const [collapsed, setcollapsed] = useState(" ");
  const [exchange, setExchange] = useState("NSE");
  const [indicatorsList, setIndicatorsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [singleIndicatorList, setSingleIndicatorList] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const indicatorData = useSelector((state) => state.Admin.indicatorData);
  const singleIndicatorData = useSelector(
    (state) => state.Admin.singleIndicatorData
  );

  const col = ["Symbol", "Date", "PMH", "PML", "PWH", "PWL", "CWH", "CWL"];
  const trade = (
    <svg
      width="20"
      height="11"
      viewBox="0 0 20 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 0L16.2161 1.03536L17.2464 2.0873L12.077 7.36536L7.47139 2.6626L0 10.2909L0.694474 11L7.47118 4.08139L12.0768 8.78371L17.9405 2.79636L18.9863 3.86405L20 0Z"
        fill="#008F75"
      />
    </svg>
  );
  // Dropdwon
  const title = "Select Segment";
  const drpValue = ["NSE", "NFO", "CDS", "MCX"];

  // Dropdwon
  const title1 = "Status";
  const drpValue1 = ["All", "On", "Off"];

  // Dropdwon
  const title2 = "Trade Status";
  const drpValue2 = ["Target 5 Trigger", "Target 1 Trigger"];

  // Dropdwon
  const title3 = "Sort By";
  const drpValue3 = ["None", "Tarde 1"];

  const openDetails = (symbol) => {
    dispatch(getSingleIndicatorData({ symbol: symbol }));

    if (collapsed === " ") {
      setcollapsed("collpase");
    } else {
      setcollapsed(" ");
    }
  };

  useEffect(() => {
    if (singleIndicatorData?.length > 0) {
      setSingleIndicatorList(singleIndicatorData);
    } else {
      setSingleIndicatorList([]);
    }
  }, [singleIndicatorData]);

  useEffect(() => {
    dispatch(getIndicatorsData({ exchange: exchange }));
  }, [exchange]);

  useEffect(() => {
    if (indicatorData?.length > 0) {
      setIndicatorsList(indicatorData);
    } else {
      setIndicatorsList([]);
    }
  }, [indicatorData]);

  const handleChangeExchange = (e) => {
    setExchange(e.target.value);
  };

  const handleSearch = (event) => {
    setPage(0);
    setRowsPerPage(10);
    if (event.target.value.length > 0) {
      let filterData = indicatorsList?.filter((d) => {
        return d?.symbol
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setIndicatorsList(filterData);
    } else {
      setIndicatorsList(indicatorData);
    }
  };

  return (
    <>
      <Box className="border-ap">
        <Box className="tabs">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className="selectiondiv-box" sx={{ marginBottom: 2 }}>
                <Dropdown
                  title={title}
                  val={drpValue}
                  value={exchange}
                  handleChange={handleChangeExchange}
                />
                <Box className="selectionDiv bn searchFlex">
                  <Tablesearch
                    handleChange={handleSearch}
                    placeholder="Enter Symbol"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <TableContainer sx={{ MarginTop: 16, maxHeight: 440 }}>
          <Table
            sx={{ minWidth: "100%" }}
            className={`table tableData ${props.small}`}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                {col.map((colum, index) => (
                  <TableCell key={index}>{colum}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? indicatorsList?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : indicatorsList
              )?.map((data, index) => {
                const date = new Date();
                return (
                  <TableRow
                    onClick={() => openDetails(data?.symbol)}
                    key={index}
                  >
                    <TableCell>
                      <span>
                        {page === 0
                          ? index + 1
                          : page * rowsPerPage + index + 1}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="symbolName"
                      >
                        <Typography component={"p"} style={{ color: "black" }}>
                          {data?.symbol}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="symbolStatus"
                      >
                        <Typography
                          component={"label"}
                          style={{
                            backgroundColor:
                              data?.status?.split(" ")[0] == "Bearish"
                                ? "red"
                                : "green",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {data?.status?.split(" ")[0]}{" "}
                          {data?.status?.split(" ")[0] == "Bearish" ? down : up}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className="tdp">
                      {moment(date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="tdp">{data?.pmh}</TableCell>
                    <TableCell className="tdp">{data?.pml}</TableCell>
                    <TableCell className="tdp">{data?.pwh}</TableCell>
                    <TableCell className="tdp">{data?.pwl}</TableCell>
                    <TableCell className="tdp">{data?.cwh}</TableCell>
                    <TableCell className="tdp">{data?.cwl}</TableCell>
                  </TableRow>
                );
              })}
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
            count={indicatorData?.length}
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
      <Box className={`indicator_details `}>
        {singleIndicatorList?.length > 0 &&
          singleIndicatorList?.map((d) => {
            return (
              <Box className={`indicator_item collpase`}>
                <Typography component={"p"}>Date - {d?.date}</Typography>
                <Typography
                  component={"p"}
                  style={{
                    color:
                      d?.status?.split(" ")[0] == "Bearish" ? "red" : "green",
                  }}
                >
                  Status - {d?.status}
                </Typography>
              </Box>
            );
          })}
      </Box>
    </>
  );
}
