import React, { useEffect } from "react";
import "../Inauth/Orderhistory/Orderhistory.scss";
import {
  Box,
  Grid,
  Button,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Tablesearch from "../Inauth/Tablesearch/Tablesearch";
import Table from "../Inauth/Table/Table";
import MessageIcon from "@mui/icons-material/Message";
import Dropdown from "../Inauth/Dropdown/Dropdown";
import { useState } from "react";

const OrderComponent = (props) => {
  const {
    col,
    liveOrderData,
    paperOrderData,
    tradeType,
    handleTradeType,
    handleSearch,
    search,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
    trend,
    handleTrend,
    trendOptions,
    orderType,
    handleOrderType,
    orderTypeOptions,
  } = props;

  return (
    <Box className="tabelBox">
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12}>
          <Box className="selectiondiv-box">
            <Dropdown
              value={trend}
              val={trendOptions}
              title={"Select Trend"}
              handleChange={(e) => {
                handleTrend(e);
              }}
            />
            <Dropdown
              value={orderType}
              val={orderTypeOptions}
              title={"Select Order Type"}
              handleChange={(e) => {
                handleOrderType(e);
              }}
            />
            <Box className="selectionDiv bn searchFlex">
              <Tablesearch
                placeholder="Enter symbol"
                handleChange={handleSearch}
                value={search}
              />
            </Box>
            <Box className="selectionDiv bn searchFlex">
              <Typography className="label" component={"label"}>
                Select Trade Type
              </Typography>
              <ToggleButtonGroup
                value={tradeType}
                exclusive
                onChange={handleTradeType}
                className="tradeType-toggle"
              >
                <ToggleButton value="paper">Paper</ToggleButton>
                <ToggleButton value="live">Live</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Table
        col={col}
        rows={tradeType == "paper" ? paperOrderData : liveOrderData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default OrderComponent;
