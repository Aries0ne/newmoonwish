import "./addsymbol.scss";
import { Box, InputBase } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../hooks/useNewSocket";
import {
    addWatchList,
    deleteWatchList,
  } from "../../../redux/actions/commonActions";

const Addsymbol = ({ onClose }) => {
    const dispatch = useDispatch();
    const [datasymbol, setDatasymbol] = useState([]);
    const [inputValue, setInputValue] = useState(''); 
    const addsymbol = useSocket("watchlist");
    const [selectedOption, setSelectedOption] = useState('');
    const addsymboldata = useSelector(
        (state) => state?.CommonReducer?.addsymboldata
      );
      useEffect(() => {
        console.log('addsymboldata from WebSocket:', addsymboldata); 

        if (addsymboldata && addsymboldata.length > 0) {
            setDatasymbol(addsymboldata.slice(0, 50));  // Limit to 50 entries
        }
    }, [addsymboldata]);

    const handleSendMessage = () => {
    if (inputValue) {
        if (!selectedOption){
            setSelectedOption("all");
        }
        addsymbol.sendMessage({
        exchange: selectedOption,  // Define message type, if needed
        symbol: inputValue,  // Send input value as symbol
        });
        
        
    }
    };

    const handleAddSymbol = async (item) => {
        let obj = {
            exchange: item.exchange,
            expiry: item.expiry,
            // instrument: selectedAlert.instrument,
            option: item.option,
            strikeprice: item.strikeprice,
            symbol: item.symbol,
            token: item.token,
            tradingsymbol: item.tradingsymbol,
            lot:"0",
            name:"watchlist"
          };
          dispatch(addWatchList(obj));
    };

    const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update input value on change
    
    };

    useEffect(() => {
        if (inputValue) {
            handleSendMessage();
        }
    }, [inputValue]);

    
    const handleButtonClick = (option) => {
        setSelectedOption(option);
        // setDatasymbol([{ name: "Banknifty", exchange: "NSE" },
        //     { name: "Nifty", exchange: "NSE" },
        //     { name: "Dow Jones", exchange: "NYSE" }])
    };


      

    return (
        <>
            <div className="modal-overlay" >
                <div className="modal-content" >
                    <button className="close-button" onClick={onClose} >X</button>
                    <div className="modal-body">
                        <div className="border">
                            <h6 className="texth6">Indices</h6>
                            <div class="horizontal-line"></div>
                            <h1 className="text15">ADD MORE SYMBOLS</h1>
                            <p className="text16">
                                Select symbol
                            </p>
                            <Box className="inputFields">
                                <InputBase
                                    placeholder="Search your symbol .."
                                    className="tabledataFind"
                                    value={inputValue}  // Bind input value to state
                                    onChange={handleInputChange} 
                                />
                                <Box className="searchIcon">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M7.85722 14.7144C11.6444 14.7144 14.7144 11.6444 14.7144 7.85722C14.7144 4.07008 11.6444 1 7.85722 1C4.07008 1 1 4.07008 1 7.85722C1 11.6444 4.07008 14.7144 7.85722 14.7144Z"
                                            stroke="#6A6D78"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M13 13.0001L17 17.0002"
                                            stroke="#6A6D78"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Box>
                            </Box>
                            <div className="button-group">
                                {['All', 'NSE', 'NFO', 'Currency', 'Commodity'].map((option) => (
                                    <button
                                        key={option}
                                        className={`button ${selectedOption === option ? 'active' : ''}`}
                                        onClick={() => handleButtonClick(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <p className="text16">
                                Search Result
                            </p>
                            {datasymbol.map((item, index) => (
                                <div key={index}>
                                <div  className="box15">
                                    <div className="box16">
                                        <div className="text45">{item.tradingsymbol}</div>
                                        <div className="text46">{item.exchange}</div>
                                    </div>
                                    <div className="box17">
                                        <button className="button45" onClick={() => handleAddSymbol(item)}>+ ADD</button>
                                    </div>
                                    {/* Add a horizontal line after each box except the last one */}
                                   
                                </div>
                                {index < datasymbol.length - 1 && <div className="horizontal-line1"></div>}
                                </div>
                                
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Addsymbol;