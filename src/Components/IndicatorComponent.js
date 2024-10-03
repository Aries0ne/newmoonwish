import React from "react";
import { Box, Grid, Button, Typography, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import Dropdown from "../Inauth/Dropdown/Dropdown";

const IndicatorComponent = (props) => {
  const {
    handleExchange,
    exchange,
    statusValues,
    title,
    index,
    handleIndex,
    handleSubmit,
    indicatorData,
  } = props;

  return (
    <>
      <Grid item xs={12} lg={4}>
        <Box
          className="boxBorder"
          sx={{ padding: { xs: "1rem ", md: "2rem" } }}
        >
          <Box className="tabs">
            <TabContext value={exchange}>
              <Typography component={"label"} className="label">
                Exchange
              </Typography>
              <TabList className="main-tab" onChange={handleExchange}>
                <Tab label="NFO" value="NFO" />
                <Tab label="CDS" value="CDS" />
                <Tab label="MCX" value="MCX" />
              </TabList>
              <Box
                className="selectiondiv-box"
                style={{ width: "fit-content" }}
              >
                <Dropdown
                  title={title}
                  val={statusValues}
                  value={index}
                  handleChange={handleIndex}
                />
              </Box>

              <Box
                className="formItems"
                sx={{
                  display: { xs: "block", md: "flex" },
                  justifyContent: { md: "space-between" },
                }}
              >
                <Button
                  className="formSolid-btn"
                  sx={{ marginBottom: 2 }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </TabContext>
          </Box>
        </Box>
      </Grid>

      {Object.keys(indicatorData).length > 0 && (
        <Grid item xs={12} lg={4} mt={2}>
          <Box
            className="boxBorder"
            sx={{ padding: { xs: "1rem ", md: "2rem" } }}
          >
            <Box className="tabs">
              <Typography component={"label"} className="label">
                Results
              </Typography>
              <Typography component={"label"} className="label">
                Symbol - {indicatorData["symbol"]}
              </Typography>
              <Typography component={"label"} className="label">
                Status - {indicatorData["status"]}
              </Typography>
              <Typography component={"label"} className="label">
                PMH - {indicatorData["pmh"]}
              </Typography>
              <Typography component={"label"} className="label">
                PML - {indicatorData["pml"]}
              </Typography>
              <Typography component={"label"} className="label">
                PWH - {indicatorData["pwh"]}
              </Typography>
              <Typography component={"label"} className="label">
                PWL - {indicatorData["pwl"]}
              </Typography>{" "}
              <Typography component={"label"} className="label">
                CWH - {indicatorData["cwh"]}
              </Typography>
              <Typography component={"label"} className="label">
                CWL - {indicatorData["cwl"]}
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default IndicatorComponent;
