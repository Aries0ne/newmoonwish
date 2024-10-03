import React, { useEffect } from "react";
import "../Inauth/Orderhistory/Orderhistory.scss";
import {
  Box,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Tooltip,
} from "@mui/material";
import Tablesearch from "../Inauth/Tablesearch/Tablesearch";
import Table from "../Inauth/Table/Table";
import Dropdown from "../Inauth/Dropdown/Dropdown";

const TradeDetailComponent = (props) => {
  const {
    col,
    rows,
    tradeType,
    handleTradeType,
    handleSearch,
    search,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
    handleClickOpen3,
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
            {/* <Dropdown
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
            /> */}
            <Box className="selectionDiv bn searchFlex">
              <Tablesearch
                placeholder="Enter symol"
                handleChange={handleSearch}
                value={search}
              />
            </Box>
            {}
            <Button
              className="squareOff-btn solidButton"
              // disabled={selected.length < 1}
              sx={{
                width: "auto !important",
                fontSize: "1.2rem",
                marginRight: 1,
              }}
              onClick={handleClickOpen3}
            >
              Cancel All
            </Button>
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
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TradeDetailComponent;
