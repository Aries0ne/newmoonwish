import React, { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  FormControl,
  Button,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../hooks/useNewSocket";
import { addWatchList } from "../../../redux/actions/commonActions";
import "./addalert.scss";
import close1 from "../../../images/Close1.png";
import { generatePopup } from '../../../utils/popup';
import {
	deleteAlertData,
	deleteBulkAlertData,
	getAlertData,
	getAlertFutureData,
	getAlertOptionData,
	getAlertOptionStrikeData,
	getAlertPrice,
	sendAlertData,
	updateAlertData,
	uploadBulkAlertData,
} from '../../../redux/actions/alertActions';

	const minus = { left: '8px' };
	const plus = { right: '8px' };

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
  const [message, setMessage] = useState('');
  const [selectedAlert, setSelectedAlert] = useState();
  const [value, setValue] = useState(0);
  const [condition, setCondition] = useState('Above');
  const [compVal, setCompVal] = useState(0);
  const [error, setError] = useState('');
  const [exchange, setExchange] = useState('NSE');
  const [editOpen, setEditOpen] = useState(false);
  const [futureExpiryData, setFutureExpiryData] = useState('');
  const [cpExpiry, setCpExpiry] = useState('');
	const [cpStrike, setCpStrike] = useState('');
  const [open, setOpen] = useState(false);
  const [script, setScript] = useState('');
  const [options, setOptions] = useState('future');
  const [editElement, setEditElement] = useState();
  const [isSendMessage,setIsSendMessage] = useState(false);
  const [editElementPrice, setEditElementPrice] = useState(0);

  const [search, setSearch] = useState('');


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


  const handleExchange = (event, newValue) => {
		setExchange(newValue);
		// sendWatchListMsg('', newValue);
		setSelectedValue('');
		setValue(0);
		setCpStrike('');
		setCpExpiry('');
		setFutureExpiryData('');
		setOptions('future');
		setError('');
	};
	const handleScript = (event) => {
		setScript(event.target.value);
	};
	const handleValue = (event) => {
		setValue(parseFloat(event.target.value));
	};
	const handleMessage = (event) => {
		setMessage(event.target.value);
	};
	const handleCondition = (event) => {
		setCondition(event.target.value);
		setValue(parseFloat(compVal).toFixed(2));
	};

  // Increment function for alert value
  const handleIncrement = () => {
		setValue((oldValue) => {
			if (condition == 'Below' && oldValue >= compVal) {
				return parseFloat(oldValue).toFixed(2);
			}
			return parseFloat(parseFloat(oldValue) + 1).toFixed(2);
		});
	};
	const handleDecrement = () => {
		setValue((oldValue) => {
			if (condition == 'Above' && oldValue <= compVal) {
				return parseFloat(oldValue).toFixed(2);
			}
			return parseFloat(parseFloat(oldValue) - 1).toFixed(2);
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

 
  const createAlert = () => {
		if (selectedAlert?.symbol?.length > 0 && value !== 0) {
      console.log(selectedAlert);
			if (condition == 'Above' && parseFloat(value) < parseFloat(compVal)) {
				setError(`Value should greater than or equal to ${compVal}`);
				return;
			} else if (
				condition == 'Below' &&
				parseFloat(value) > parseFloat(compVal)
			) {
				setError(`Value should less than or equal to ${compVal}`);
				return;
			} else if (message.length > 32) {
				setError('message should be less than 32 letters');
				return;
			}

			dispatch(
				sendAlertData({
					symbol: selectedAlert?.symbol,
					exchange: exchange,
					type: condition,
					value: value,
					message: message,
					token: selectedAlert?.token,
				})
			);
			handleClear();
			handleClose();
		} else {
			return generatePopup('error', 'Please enter proper details.');
		}
	};

  const handleEditClose = () => {
		setEditOpen(false);
		handleClear();
	};

  const handleClear = () => {
		setSelectedAlert('');
		setValue(0);
		// setExchange("NSE");
		setMessage('');
		setScript('');
		setCondition('Above');
		setCompVal(0);
		setFutureExpiryData('');
		setCpExpiry('');
		setCpStrike('');
		setSelectedValue('');
		setError('');
	};

  const handleUpdateData = () => {
		dispatch(
			updateAlertData({
				id: editElement.id,
				value: value,
				message: message,
				condition: condition,
			})
		);
		setEditOpen(false);
		handleClear();
	};
  const handleClickOpen = (element) => {
		setExchange(element.exchange);
		dispatch(getAlertPrice({ token: element.token })).then((res) => {
			if (res.status) {
				setEditElementPrice(res.price);
				setCompVal(parseFloat(res.price).toFixed(2));
				setValue(parseFloat(res.price).toFixed(2));
				setSelectedAlert(element);
			}
		});
		setOpen(true);
		setEditElement(element);
	};
  const handleClose = () => {
		setOpen(false);
		handleClear();
	};
  const handleCPExpiryChange = (event) => {
		setCpExpiry(event.target.value);
		getOptionStrikeDataFun(
			{
				exchange: exchange,
				symbol: selectedAlert?.symbol,
				expiry: event.target.value,
			},
			options == 'call' ? 'optioncestrike' : 'optionpestrike'
		);
	};

  const getOptionStrikeDataFun = (payload, optionType) => {
		dispatch(getAlertOptionStrikeData(payload, optionType)).then((res) => {
			setCpStrike(res[0]?.token);
			setSelectedAlert({ ...selectedAlert, token: res[0]?.token });
			setValue(parseFloat(res[0]?.price).toFixed(2));
			setCompVal(parseFloat(res[0]?.price).toFixed(2));
		});
	};

  const minus = { left: '8px' };
	const plus = { right: '8px' };
  
  useEffect(() => {
		setSelectedAlert('');
	}, [exchange]);

  const handleSelectAlert = (value) => {
		setSelectedAlert(value);
		setOptions('future');
		if (exchange == 'NFO' || exchange == 'MCX' || exchange == 'CDS') {
			if (value != null) {
				dispatch(
					getAlertFutureData({ exchange: exchange, symbol: value?.symbol })
				).then((res) => {
					if (res?.length > 0) {
						setFutureExpiryData(res[0]?.token);
						setSelectedAlert({ ...value, token: res[0]?.token });
						setValue(parseFloat(res[0]?.price).toFixed(2));
						setCompVal(parseFloat(res[0]?.price).toFixed(2));
					}
				});
			} else {
				setValue(0);
			}
		} else {
			if (value != null) {
				setValue(parseFloat(value.price).toFixed(2));
				setCompVal(parseFloat(value.price).toFixed(2));
			} else {
				setValue(0);
			}
		}
	};

  const handleChangeOptions = (e, newValue = 'string') => {
		setOptions(newValue);

		if (exchange == 'NFO' || exchange == 'MCX' || exchange == 'CDS') {
			if (newValue == 'future') {
				dispatch(
					getAlertFutureData({
						exchange: exchange,
						symbol: selectedAlert?.symbol,
					})
				).then((res) => {
					if (res?.length > 0) {
						setFutureExpiryData(res[0]?.token);
						setSelectedAlert({ ...selectedAlert, token: res[0]?.token });
						setValue(parseFloat(res[0]?.price).toFixed(2));
						setCompVal(parseFloat(res[0]?.price).toFixed(2));
					}
				});
			} else if (newValue == 'call') {
				dispatch(
					getAlertOptionData(
						{
							exchange: exchange,
							symbol: selectedAlert?.symbol,
						},
						'optionce'
					)
				).then((res) => {
					if (res.length > 0) {
						setCpExpiry(res[0]);
						getOptionStrikeDataFun(
							{
								exchange: exchange,
								symbol: selectedAlert?.symbol,
								expiry: res[0],
							},
							'optioncestrike'
						);
					}
				});
			} else if (newValue == 'put') {
				dispatch(
					getAlertOptionData(
						{
							exchange: exchange,
							symbol: selectedAlert?.symbol,
						},
						'optionpe'
					)
				).then((res) => {
					if (res.length > 0) {
						setCpExpiry(res[0]);
						getOptionStrikeDataFun(
							{
								exchange: exchange,
								symbol: selectedAlert?.symbol,
								expiry: res[0],
							},
							'optionpestrike'
						);
					}
				});
			}
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
                    <FormControl className='inputFields ' sx={{ display: 'block' }}>
                    <RadioGroup
                     raw value={condition}
                      onChange={handleCondition}
                      className="above"
                      
                    >
                      <FormControlLabel
                        value="above"
                        control={
                          <Radio
                            sx={{
                              color: "#888686", // Color when unchecked
                              "&.Mui-checked": {
                                color: "#067026", // Color when checked
                              },
                            }}
                          />
                        }
                        label={<span style={{ fontSize: '14px' }}>Above</span>}
                      />
                      <FormControlLabel
                        value="below"
                        control={
                          <Radio
                            sx={{
                              color: "#888686",
                              "&.Mui-checked": {
                                color: "#067026",
                              },
                            }}
                          />
                        }
                        label={<span style={{ fontSize: '14px' }}>Below</span>}
                      />
                    </RadioGroup>
                    </FormControl>

                    {/* Increment/Decrement Input */}
                    {/* <Paper
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
                        value={value}
                        onChange={handleValue} 
                        type="number"
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
                    </Paper> */}
                    <Box className='formItems'>
								{/* <Typography component={"label"} className="label">
                                Value
                                </Typography> */}
								<Box
									sx={{ position: 'relative', marginTop: 1, marginBottom: 2 }}
								>
									<Box className='selectionDiv bn searchFlex'>
										<Box className='inputFields fullWidth'>
											<InputBase
												placeholder='Value'
												value={value}
												onChange={handleValue}
												type='number'
											/>
										</Box>
									</Box>
									<Button
										className='solidButton counterBtn'
										sx={minus}
										onClick={handleDecrement}
									>
										-
									</Button>
									<Button
										className='solidButton counterBtn'
										sx={plus}
										onClick={handleIncrement}
									>
										+
									</Button>
								</Box>
							</Box>
                  </div>
                  {/* <textarea className="typeinp" placeholder="Type the message you want to send..."></textarea> */}
                  <label>  
                    <textarea
                      name="postContent"
                      placeholder="Type the message you want to send..."
                      rows={4}
                      cols={40}
                      className="typeinp"
                      alertList={4}
                      onChange={handleMessage}
                      value={message}
                    />
                  </label>
                  <div className="butdiv">
                    <button className="button48" onClick={createAlert} >Create Alert</button>
                    <button className="button49" onClick={handleClear}>Clear Values</button>
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
