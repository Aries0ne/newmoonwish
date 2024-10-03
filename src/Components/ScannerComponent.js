import React, { useEffect } from "react";
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import Tablesearch from "../Inauth/Tablesearch/Tablesearch";
import Dropdown from "../Inauth/Dropdown/Dropdown";
import Table from "../Inauth/Table/Table";
import "../Inauth/Scanner/Scanner.scss";
import { useDispatch, useSelector } from "react-redux";
import { signalDetails } from "../redux/actions/positionAction";

const ScannerComponent = (props) => {
  const {
    down,
    up,
    col,
    rows,
    title,
    drpValue,
    title2,
    drpValue2,
    title3,
    drpValue3,
    signaldetails,
    handleSubmit,
    handleType,
    handleStrategy,
    handleSegment,
    type,
    strategy,
    segment,
    handleSearch,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
  } = props;

  return (
    <Box className="tabelBox">
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12}>
          <Box className="selectiondiv-box">
            <Dropdown
              value={segment}
              val={drpValue}
              title={title}
              handleChange={handleSegment}
            />

            <Dropdown
              value={strategy}
              val={drpValue2}
              title={title2}
              handleChange={handleStrategy}
            />

            <Dropdown
              value={type}
              val={drpValue3}
              title={title3}
              handleChange={handleType}
            />
            <Box className="selectionDiv bn searchFlex">
              <Tablesearch
                placeholder="Enter symbol"
                handleChange={handleSearch}
              />
              <Tooltip arrow>
                <Button
                  className="download-btn solidButton"
                  sx={{ margin: "0 0 0 1rem !important" }}
                  onClick={() => handleSubmit()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Table
        col={col}
        rows={signaldetails}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ScannerComponent;
