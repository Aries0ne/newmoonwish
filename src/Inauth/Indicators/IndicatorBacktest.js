import React, { useState } from "react";
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
import Tablesearch from "../Tablesearch/Tablesearch";
import Dropdown from "../Dropdown/Dropdown";
import "../Table/Table.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

export default function IndicatorBacktest(props) {
  const [exchange, setExchange] = useState("NSE");
  const [indicatorsList, setIndicatorsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const col = [
    "Sr.No",
    "Symbol",
    "Date",
    "Time",
    "Trend Status",
    "Time Frame",
    "Data",
    "Final Value",
    "HH/LL",
    "PMH",
    "CMH",
    "PWH",
    "PWL",
    "CDH",
    "CDL",
    "HH",
  ];
  // Dropdwon
  const title = "Exchange";
  const drpValue = ["NSE", "NFO", "CDS", "MCX"];

  // Dropdwon
  const title2 = "Symbol";
  const drpValue2 = ["Target 5 Trigger", "Target 1 Trigger"];

  // Dropdwon
  const title3 = "Sort By";
  const drpValue3 = ["None", "NSE", "BSE"];

  const handleChangeExchange = (e) => {
    setExchange(e.target.value);
  };

  return (
    <>
      <Box className="border-ap">
        <Box className="tabs">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                className="selectiondiv-box"
                sx={{ marginBottom: 2, display: "flex !important" }}
              >
                <Dropdown
                  title={title}
                  val={drpValue}
                  value={exchange}
                  handleChange={handleChangeExchange}
                />
                <Dropdown title={title2} val={drpValue2} />
                <Box className="selectionDiv bn">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className="datePicker" />
                  </LocalizationProvider>
                </Box>

                <Box className="selectionDiv bn">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className="datePicker" />
                  </LocalizationProvider>
                </Box>
                <Dropdown title={title3} val={drpValue3} />
                <Box className="selectionDiv bn searchFlex">
                  <Tablesearch placeholder="Enter Symbol" />
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
                  <TableRow key={index}>
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
    </>
  );
}
