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
import "../Inauth/Portfolio/portfolio.scss";

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

  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState("Triggered");
  const [selectedOption2, setSelectedOption2] = useState("Triggered");

  // Toggle handlers for each dropdown
  const handleToggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
    if (showDropdown2) setShowDropdown2(false); // Close the other dropdown if open
  };

  const handleToggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
    if (showDropdown1) setShowDropdown1(false); // Close the other dropdown if open
  };

  // Select option handlers for each dropdown
  const handleSelectOption1 = (option) => {
    setSelectedOption1(option);
    setShowDropdown1(false); // Close dropdown1 after selecting
  };

  const handleSelectOption2 = (option) => {
    setSelectedOption2(option);
    setShowDropdown2(false); // Close dropdown2 after selecting
  };

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
        <div className="div4">
          <p className="text3">Select Order Type</p>
          <div className="dropdown-container">
       <button onClick={handleToggleDropdown1} className="dropdown-trigger">
        {selectedOption1}
        <span className={`arrow ${showDropdown1 ? "up" : "down"}`}>▾</span>
       </button>
       {showDropdown1 && (
        <div className="dropdown-menu">
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption1("Option 1")}
          >
            Option 1
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption1("Option 2")}
          >
            Option 2
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption1("Option 3")}
          >
            Option 3
          </div>
        </div>
        )}
        </div>
        </div>
        <div className="div4">
          <p className="text3">Select Trend</p>
          <div className="dropdown-container">
       <button onClick={handleToggleDropdown2} className="dropdown-trigger">
        {selectedOption2}
        <span className={`arrow ${showDropdown2 ? "up" : "down"}`}>▾</span>
       </button>
       {showDropdown2 && (
        <div className="dropdown-menu">
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption2("Option 1")}
          >
            Option 1
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption2("Option 2")}
          >
            Option 2
          </div>
          <div
            className="dropdown-item"
            onClick={() => handleSelectOption2("Option 3")}
          >
            Option 3
          </div>
        </div>
        )}
        </div>
        </div>
        <button className="deletbut">Square Off All</button>

        </div>
      {/* 
       */}

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
