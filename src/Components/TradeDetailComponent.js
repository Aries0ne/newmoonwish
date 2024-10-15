import { useState } from "react";
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

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Triggered");

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleToggleDropdown1 = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowDropdown(false); // Close the dropdown after selecting
  }
  const handleSelectOption1 = (option) => {
    setSelectedOption(option);
    setShowDropdown(false); // Close the dropdown after selecting
  }

  return (
    <Box className="tabelBox">
      <div className="divinner1">
      <div className="div4">
          <p className="text3">Search for Symbol</p>
          <div className="input-container">
            <img src={search} className="ree" />
            <input placeholder="Search your Symbol" />
          </div>
        </div>
        {/* <div className="div4">
          <p className="text3">Select Order Type</p>
          <div className="dropdown-container">
       <button onClick={handleToggleDropdown} className="dropdown-trigger">
        {selectedOption}
        <span className={`arrow ${showDropdown ? "up" : "down"}`}>▾</span>
       </button>
       {showDropdown && (
        <div className="dropdown-menu">
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption("Option 1")}
          >
            Option 1
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption("Option 2")}
          >
            Option 2
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption("Option 3")}
          >
            Option 3
          </div>
        </div>
        )}
        </div>
        </div> */}
        <button className="deletbut">Cancel</button>
        <button className="deletbut">Square Off All</button>

        </div>
      {/* <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12}>
          <Box className="selectiondiv-box">
         
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
      </Grid> */}

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
