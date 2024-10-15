import React, { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../hooks/useNewSocket";
import { addWatchList } from "../../../redux/actions/commonActions";
import "./addalert.scss";
import close1 from "../../../images/Close1.png";

const Addalert = ({ onClose }) => {
  const dispatch = useDispatch();
  const [datasymbol, setDatasymbol] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const addsymbol = useSocket("watchlist");
  const [selectedOption, setSelectedOption] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [selectedValue, setSelectedValue] = useState(""); // Added state for radio button
  const [alertValue, setAlertValue] = useState(); // State for alert value

  const addsymboldata = useSelector(
    (state) => state?.CommonReducer?.addsymboldata
  );

  useEffect(() => {
    if (addsymboldata && addsymboldata.length > 0) {
      setDatasymbol(addsymboldata.slice(0, 50));
    }
  }, [addsymboldata]);

  const handleSendMessage = () => {
    if (inputValue) {
      if (!selectedOption) setSelectedOption("all");
      addsymbol.sendMessage({
        exchange: selectedOption,
        symbol: inputValue,
      });
    }
  };

  const handleInputChange = (event) => setInputValue(event.target.value);

  useEffect(() => {
    if (inputValue) handleSendMessage();
  }, [inputValue]);

  const handleButtonClick = (option) => setSelectedOption(option);

  const handleSymbolClick = (symbol) => {
    setSelectedSymbol(symbol);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => setShowDetailsModal(false);

  const handleRadioChange = (event) => setSelectedValue(event.target.value); // Radio button change handler

  // Increment function for alert value
  const handleIncrement = () => {
    if (alertValue === undefined || alertValue === "") {
      setAlertValue(1); // Start from 1 if there’s no value
    } else {
      setAlertValue((prevValue) => parseFloat((prevValue + 0.10).toFixed(2)));
    }
  };

  // Decrement function for alert value
  const handleDecrement = () => {
    setAlertValue((prevValue) => {
      if (prevValue === undefined || prevValue === "") return 0; // Do not decrement below 0
      return Math.max(0, parseFloat((prevValue - 0.10).toFixed(2)));
    });
  };

  // Handle manual input change
  const handleManualInputChange = (event) => {
    const value = event.target.value; // Keep it as a string
    setAlertValue(value); // Update the input field directly

    // Check if the value is a valid number
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setAlertValue(parsedValue.toFixed(2)); // Set alert value if it's valid
    } else if (value === "") {
      setAlertValue(""); // Allow empty input
    }
  };

  return (
    <>
      {/* Main Modal */}
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <div className="modal-body">
            <div className="border">
              <h6 className="texth6">Add Alert</h6>
              <div className="horizontal-line"></div>
              <p className="text16">Select symbol</p>
              <Box className="inputFields">
                <InputBase
                  placeholder="Search your symbol .."
                  className="tabledataFind"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Box>
              <div className="button-group">
                {["All", "NSE", "NFO", "Currency", "Commodity"].map(
                  (option) => (
                    <button
                      key={option}
                      className={`button ${
                        selectedOption === option ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick(option)}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
              <p className="text16">Search Result</p>
              {datasymbol.map((item, index) => (
                <div key={index}>
                  <div className="box15">
                    <div className="box16">
                      <div className="text45">{item.tradingsymbol}</div>
                      <div className="text46">{item.exchange}</div>
                    </div>
                    <div className="box17">
                      <button
                        className="button45"
                        onClick={() => handleSymbolClick(item)}
                      >
                        + Select
                      </button>
                    </div>
                  </div>
                  {index < datasymbol.length - 1 && (
                    <div className="horizontal-line1"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <div className="border">
                <div className="divh6">
                  <h6 className="texth6">Add Alert</h6>
                  <button
                    className="close-button1"
                    onClick={handleCloseDetailsModal}
                  >
                    X
                  </button>
                </div>
                <div className="boxing">
                  <p className="text161">
                    {selectedSymbol?.tradingsymbol}
                    <img src={close1} className="close1" alt="Close" />
                  </p>

                  <div className="additional-content">
                    <p className="text444">Alert when LTP is</p>

                    <RadioGroup
                      value={selectedValue}
                      onChange={handleRadioChange}
                      className="above"
                    >
                      <FormControlLabel
                        value="above"
                        control={
                          <Radio
                            sx={{
                              color: "#888686", // Color when unchecked
                              "&.Mui-checked": {
                                color: "#00ff9192", // Color when checked
                              },
                            }}
                          />
                        }
                        label={<span style={{ fontSize: '12px' }}>Above</span>}
                      />
                      <FormControlLabel
                        value="below"
                        control={
                          <Radio
                            sx={{
                              color: "#888686",
                              "&.Mui-checked": {
                                color: "#00ff9192",
                              },
                            }}
                          />
                        }
                        label={<span style={{ fontSize: '12px' }}>Below</span>}
                      />
                    </RadioGroup>

                    {/* Increment/Decrement Input */}
                    <Paper
                      elevation={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "4px 8px",
                        marginTop: "20px", // Space between elements
                        border: "1px solid #C9C9C9",
                        borderRadius: "10px",
                        boxShadow: "none",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={handleDecrement}
                        disabled={alertValue <= 0}
                        sx={{
                          backgroundColor: "#067026",
                          color: "white",
                          "&:hover": { backgroundColor: "#b0b0b0" },
                          height: "20px",
                          width: "20px",
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>

                      <InputBase
                        className="input1"
                        value={alertValue}
                        onChange={handleManualInputChange} // Handle manual input change
                        sx={{
                          mx: 2,
                          width: "50px",
                        }}
                        inputProps={{
                          className: "input1", // This applies your custom class to the input element
                        }}
                      />

                      <IconButton
                        size="small"
                        onClick={handleIncrement}
                        sx={{
                          backgroundColor: "#067026",
                          color: "white",
                          height: "20px",
                          width: "20px",
                          "&:hover": { backgroundColor: "#b0b0b0" },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Paper>
                  </div>
                  <input className="typeinp" placeholder="Type the message you want to send..." />
                  <div className="butdiv">
                    <button className="button48" >Create Alert</button>
                    <button className="button49">Clear Values</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Addalert;
