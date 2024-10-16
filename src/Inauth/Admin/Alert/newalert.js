import React, {useEffect, useState } from "react";
import "./newalert.scss";
import rebot from "../../../images/Reboot.png";
import search from "../../../images/search1.png";
import Addalert from "./addalert";
import { useDispatch, useSelector } from 'react-redux';

import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import close1 from "../../../images/Close1.png";
import { generatePopup } from '../../../utils/popup';

import {
	deleteAlertData,
	deleteBulkAlertData,
	getAlertData,
	getAlertPrice,
	sendAlertData,
	updateAlertData,
	uploadBulkAlertData,
} from '../../../redux/actions/alertActions';

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

const minus = { left: '8px' };
	const plus = { right: '8px' };



export default function AlertComponent() {
  const[ editmodal , setEditModal] = useState(false);
  const[ copymodal , setCopyModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Triggered");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedRows, setSelectedRows] = useState([]); // Selected rows state
  const [value, setValue] = useState(0);
  const [compVal, setCompVal] = useState(0);
  const [selectedSymbol1, setSelectedSymbol1] = useState(null);
  const [condition, setCondition] = useState('Above');
  const [idupdate,setIdupdate] = useState();
  const [message, setMessage] = useState('');
  const [exchange, setExchange] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleedit = (row) => {
    setEditModal(true);
    setSelectedSymbol1(row.symbol);
    setValue(row.value);
    setMessage(row.message);
    setCondition(row.type);
    setIdupdate(row.id);
  }

  const handlecopy = (row) => {
    setCopyModal(true);
    setSelectedSymbol1(row.symbol);
    setValue(row.value);
    setMessage(row.message);
    setCondition(row.type);
    setIdupdate(row.id);
    setExchange(row.exchange);
    setToken(row.token);

  }

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setShowDropdown(false); // Close the dropdown after selecting
  };

  useEffect(() => {
		getAlertList();
	}, []);


  const handleValue = (event) => {
    console.log(event.target.value);
		setValue(parseFloat(event.target.value));
	};

  const handleMessage = (event) => {
		setMessage(event.target.value);
	};

  const handledelete = (id1) => {
    dispatch(deleteAlertData({ id: id1 }));
  }
  const getAlertList = () => {
		dispatch(getAlertData());
	};

  const handleCloseDetailsModal = () => {
    setEditModal(false);
  }


  const handleUpdateData = () => {
		dispatch(
			updateAlertData({
				id:idupdate ,
				value: value,
				message: message,
				condition: condition,
			})
		);
		setEditModal(false);
		handleClear();
	};

  const handleUpdateData1 = () => {
		if (selectedSymbol1.length > 0 && value > 0) {
      
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
					symbol: selectedSymbol1,
					exchange: exchange,
					type: condition,
					value: value,
					message: message,
					token: token,
				})
			);
      setCopyModal(false);
		handleClear();
			
		} else {
			return generatePopup('error', 'Please enter proper details.');
		}
		
	};

  const handleClear = () => {
		setSelectedSymbol1('');
    setValue('');
    setMessage('');
    setCondition('');
    setIdupdate('');
	};

  const handleCondition = (event) => {
		setCondition(event.target.value);
		setValue(parseFloat(compVal).toFixed(2));
	};

  const handleDecrement = () => {
		setValue((oldValue) => {
			if (condition == 'Above' && oldValue <= compVal) {
       
        return parseFloat(oldValue).toFixed(2);
			}
     
			return parseFloat(parseFloat(oldValue) - 1).toFixed(2);
		});
	};


  const handleIncrement = () => {
		setValue((oldValue) => {
			if (condition == 'Below' && oldValue >= compVal) {
       
				return parseFloat(oldValue).toFixed(2);
        
			}
      
			return parseFloat(parseFloat(oldValue) + 1).toFixed(2);
		});
    
	};



  const alertData = useSelector((State) => State.Alert.adminAlertData);

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === tableData.length) {
      setSelectedRows([]); // Deselect all if all are selected
    } else {
      setSelectedRows(tableData.map((_, index) => index)); // Select all
    }
  };

  const handleClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const tableData = [
    {
      status: 'Completed',
      time: '20.34',
      scrip: '7230.34',
      value: '7230.34',
      condition: '23453',
      message: '23453',
    },
    {
      status: 'Completed',
      time: '20.34',
      scrip: '7230.34',
      value: '7230.34',
      condition: '23453',
      message: '23453',
    },
    {
      status: 'Completed',
      time: '20.34',
      scrip: '7230.34',
      value: '7230.34',
      condition: '23453',
      message: '23453',
    },
  ];

  return (
    <>
      {isModalOpen && (
        <div>
          <Addalert onClose={closeModal} />
        </div>
      )}

      <div className="divbox">
        <div className="div1001">
          <div className="div2">
            <div className="div3">
              <h6 className="text1">Alert</h6>
              <img src={rebot} className="ree" />
            </div>
            <p className="text2">Total 52 alerts</p>
          </div>
          <button className="alertbut" onClick={handleClick}>+ Add Alert</button>
        </div>

        <div className="divinner">
          <div className="div4">
            <p className="text3">Search For Alert</p>
            <div className="input-container">
              <img src={search} className="ree" />
              <input placeholder="Search alert" />
            </div>
          </div>
          <div className="div4">
            <p className="text3">Select Status</p>
            <div className="dropdown-container">
              <button onClick={handleToggleDropdown} className="dropdown-trigger">
                {selectedOption}
                <span className={`arrow ${showDropdown ? "up" : "down"}`}>▾</span>
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleSelectOption("Option 1")}>Option 1</div>
                  <div className="dropdown-item" onClick={() => handleSelectOption("Option 2")}>Option 2</div>
                  <div className="dropdown-item" onClick={() => handleSelectOption("Option 3")}>Option 3</div>
                </div>
              )}
            </div>
          </div>
          <button className="deletbut">Delete</button>
          <button className="deletbut">Bulk Delete</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === tableData.length}
                    onChange={handleSelectAll}
                  />
                  {/* <label>Select All</label> */}
                </th>
                <th>Status</th>
                <th>Time</th>
                <th>Scrip</th>
                <th>Value</th>
                <th>Condition</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {alertData.map((row, index) => {
    // Convert and format the datetime string
    const date = new Date(row.datetime);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    return (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            checked={selectedRows.includes(index)}
            onChange={() => handleSelectRow(index)}
          />
        </td>
        <td className={row.status === 'Completed' ? 'status-completed' : 'status-pending'}>
          {row.status}
        </td>
        <td>{`${formattedDate} ${formattedTime}`}</td>
        <td>{row.symbol}</td>
        <td>{row.value}</td>
        <td>{row.type}</td>
        <td>{row.message}</td>
        <td>
        <IconButton onClick={() => handleedit(row)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handlecopy(row)}  aria-label="copy">
                <ContentCopyIcon />
              </IconButton>
              <IconButton onClick={() => handledelete(row.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>
        </div>
      </div>








      {editmodal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <div className="border">
                <div className="divh6">
                  <h6 className="texth6">Edit Alert</h6>
                  <button
                    className="close-button1"
                    onClick={handleCloseDetailsModal}
                  >
                    X
                  </button>
                </div>
                <div className="boxing">
                  <p className="text161">
                    {selectedSymbol1}
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
                    <button className="button48"  onClick={handleUpdateData}>Update Alert</button>
                    <button className="button49" >Clear Values</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}




{copymodal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <div className="border">
                <div className="divh6">
                  <h6 className="texth6">Edit Alert</h6>
                  <button
                    className="close-button1"
                    onClick={handleCloseDetailsModal}
                  >
                    X
                  </button>
                </div>
                <div className="boxing">
                  <p className="text161">
                    {selectedSymbol1}
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
                    <button className="button48"  onClick={handleUpdateData1}>Create Alert</button>
                    <button className="button49" >Clear Values</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
