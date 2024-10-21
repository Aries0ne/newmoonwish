import { Box, InputBase, Switch, Typography, IconButton, FormControlLabel,FormControl,FormHelperText } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useEffect, useState, useRef } from "react";
import Dropdown from "../../Dropdown/Dropdown";
import { generatePopup } from '../../../utils/popup';
import { useDispatch, useSelector } from "react-redux";
import "./addsymbol.scss";
import zIndex from "@mui/material/styles/zIndex";

import {
  createPosition,
  
} from "../../../redux/actions/positionAction";



const Orderplace = ({ data, onClose }) => {

  const dispatch = useDispatch();

  const orderTypValues = ["MARKET", "Limit", "SL", "SL-M"];

  const productTypValues = ["MIS", "NRML"];

  // const [inputSets, setInputSets] = useState([]);

  const [backgroundColor, setBackgroundColor] = useState('#2992ec');
  const [orderType, setOrderType] = useState('');
  const [productType, setProductType] = useState('');
  const [side, setSide] = useState('BUY');
  const [isPriceDisabled, setIsPriceDisabled] = useState(false);
  const [isTPriceDisabled, setTIsPriceDisabled] = useState(false);


  const [errors, setErrors] = useState({});

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  // const handleAddInputSet = () => {
  //   if (inputSets.length < 10) {
  //     setInputSets([...inputSets, {}]);
  //   } else {
  //     // Optional: You can show a message or do something else here
  //     alert('Maximum of 10 actions can be added');
  //   }// Add new input set when button clicked
  // };

  // const handleCloseAction = (index) => {
  //   // Remove the action from the inputSets array by index
  //   setInputSets((prevInputSets) => prevInputSets.filter((_, i) => i !== index));
  // };


  const sendOrder = () =>{
    let obj = {
      symboltoken:data.token,
      action:inputSets,
      exchange:data.exchange,
      product:productType,
      complexty:"REGULAR",
      side:side,
      prctyp:orderType,
      quantity:parseInt(quantity1Ref.current)
    }
    dispatch(createPosition(obj));
  }


  const stbc = () => {
    setBackgroundColor('#F75723')
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setBackgroundColor('#F75723');
      setSide('SELL');
    }
    else {
      setBackgroundColor('#2992ec');
      setSide('BUY');
    }
  };

  const changeOrderType = (event) => {

    setOrderType(event.target.value); // Directly set the selected value
    if (event.target.value == "MARKET") {
      setIsPriceDisabled(true);
      setTIsPriceDisabled(true);
    } else if (event.target.value == "Limit") {
      setIsPriceDisabled(false);
      setTIsPriceDisabled(true);
    } else if (event.target.value == "SL") {
      setIsPriceDisabled(false);
      setTIsPriceDisabled(false);
    } else {
      setIsPriceDisabled(true);
      setTIsPriceDisabled(false);
    }
  };

  const changeProductType = (event) => {

    setProductType(event.target.value); // Directly set the selected value
    
  };


  const [inputSets, setInputSets] = useState([]); // Array to store input sets
  const quantity2Ref = useRef();
  const quantity3Ref = useRef();
  const handleAddInputSet = () => {
    if (quantity3Ref.current) {

      if (parseInt(quantity3Ref.current) % parseInt(data.lot) === 0) {


        if (inputSets.length !== 0) {

          let currentQuantity = parseInt(quantity2Ref.current, 10) || 0; // Default to 0 if NaN
          console.log(inputSets[inputSets.length - 1]?.tquantity)
          let valueInt = parseInt(inputSets[inputSets.length - 1]?.tquantity, 10) || 0; // Default to 0 if NaN

          let value1 = currentQuantity + valueInt;  // Perform the addition

          quantity2Ref.current = value1.toString(); // Convert the result back to string

          let actualQuantity = parseInt(quantity1Ref.current, 10) || 0;
          let value2 = actualQuantity - value1
          quantity3Ref.current = value2.toString()

        }
        if (parseInt(quantity3Ref.current) !== 0) {
          setInputSets([...inputSets, { 'squantity': quantity3Ref.current }]);
        }
        else {
          alert("Quantity reach value.")
        }
      }
      else {
        generatePopup('error', 'Kindly Enter proper lot size.');
      }
    }
    else {
      generatePopup('error', 'Kindly select all Fields.');
    }



    // inputSets[inputSets.length]?.sl+inputSets.length

    // console.log(inputSets);
  };

  const handleInputChange = (index, key, value) => {

    if (key === "tquantity") {
      if (parseInt(value) % parseInt(data.lot) === 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [index]: '', // Set the error message for the current index
        }));

        setInputSets(prevSets => {
          // Map through the previous inputSets and modify the targeted one
          return prevSets.map((item, i) => {
            if (i === index) {
              // Append new key-value pair to the object
              return { ...item, [key]: value };
            }
            return item; // Return other items unchanged
          });
        });
      }
      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [index]: "Please enter a valid lot size", // Set the error message for the current index
        }));
      }

    }
    else {
      setInputSets(prevSets => {
        // Map through the previous inputSets and modify the targeted one
        return prevSets.map((item, i) => {
          if (i === index) {
            // Append new key-value pair to the object
            return { ...item, [key]: value };
          }
          return item; // Return other items unchanged
        });
      });
    }
  };


  const [quantity, setQuantity] = useState();
  const [quantityadded, setQuantityadded] = useState();
  const quantity1Ref = useRef();
  const handleInput = (value) => {
    if (parseInt(value) % parseInt(data.lot) === 0) {
      setError(false);

    setQuantity(value);
    quantity1Ref.current = value;
    quantity3Ref.current = value;
    console.log(quantity1Ref.current)
  }else{
    setError(true);
    setErrorMessage('Please Enter a valid lot size');
  }

  }

  const handleCloseAction = (index) => {
    // Remove input set from the list
    const updatedInputSets = inputSets.filter((_, idx) => idx !== index);
    setInputSets(updatedInputSets);
  };


  return (
    <>
      <div className="modal-overlay">

        <div className="modal-content side6" style={{ overflowY: 'auto' }} >

          {/* <button className="close-button1" onClick={onClose} >X</button> */}
          <div className="modal-body side5" style={{ overflowY: 'auto' }} >
            <div style={{ backgroundColor: backgroundColor, width: "100%", height: "70px", display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <div className="textorder">{data.tradingsymbol}</div>
              <div>
                <FormControlLabel
                  control={
                    <Switch
                      
                      onClick={handleChange}

                    />
                  }

                />
              </div>
            </div>
            <div className="border1" style={{ overflowY: 'auto' }} >
              <Typography
                component={"label"}
                className="label"
                sx={{ fontSize: "14px !important" }}
              >
                Quantity
              </Typography>
              <Box className="inputFields  space orderbox">
              <FormControl error={error} margin="normal">
                  <InputBase
                    placeholder={`Lot: ${data.lot}`}
                    type="number"
                    
                    onChange={(e) => handleInput(e.target.value)}
                    style={{ width: '100%',  border: error ? '1px solid red' : 'none', }}
                  />
                  {error && <FormHelperText>{errorMessage}</FormHelperText>} {/* Display error message */}
                </FormControl>
              </Box>
              <Typography
                component={"label"}
                className="label"
                sx={{ fontSize: "14px !important", marginTop: "20px" }}
              >
                Price
              </Typography>
              <Box className="inputFields  space orderbox">
                <InputBase
                  placeholder="Price"
                  type="number"
                  disabled={isPriceDisabled}
                />
              </Box>



              <Typography
                component={"label"}
                className="label"
                sx={{ fontSize: "14px !important", marginTop: "20px" }}
              >
                Order Type
              </Typography>
              <Box
                className="inputFields space fullWidth"
                sx={{
                  "& > .selectionDiv": {
                    padding: "0 !important",
                    marginTop: "0 !important",
                    border: "none !important",
                    height: "40px"

                  },
                }}
              >
                <Dropdown
                  sx={{ height: "30px", fontSize: "12px" }}
                  val={orderTypValues}
                  value={orderType}
                  handleChange={changeOrderType}
                />
              </Box>



              <Typography
                component={"label"}
                className="label"
                sx={{ fontSize: "14px !important", marginTop: "20px" }}
              >
                Product Type
              </Typography>
              <Box
                className="inputFields space fullWidth"
                sx={{
                  "& > .selectionDiv": {
                    padding: "0 !important",
                    marginTop: "0 !important",
                    border: "none !important",
                    height: "40px"

                  },
                }}
              >
                <Dropdown
                  sx={{ height: "30px", fontSize: "12px" }}
                  val={productTypValues}
                  value={productType}
                  handleChange={changeProductType}
                />
              </Box>





              <Typography
                component={"label"}
                className="label"
                sx={{ fontSize: "14px !important", marginTop: "20px" }}
              >
                Trigger Price
              </Typography>
              <Box className="inputFields  space orderbox">
                <InputBase
                  placeholder="Trigger Price"
                  type="number"
                  disabled={isTPriceDisabled}
                />
              </Box>



              <div>
                <Button
                  variant="outlined"  // Outlined button
                  fullWidth           // 100% width
                  onClick={handleAddInputSet}
                  sx={{
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    marginTop: '20px',
                    borderColor: '#818197', // Custom border color
                    color: '#818197',       // Custom text color
                    '&:hover': {
                      borderColor: '#F75723', // Keep the same border color on hover
                      backgroundColor: 'rgba(247, 87, 35, 0.1)', // Light background color on hover
                    },
                  }}
                >
                  Action Button
                </Button>

                {inputSets.map((_, index) => (
                  <Box key={index} mt={2}>
                    {/* Dynamic Header for each action */}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
                        Action {index + 1} {/* This will show "Action 1", "Action 2", etc. */}
                      </Typography>
                      {index === inputSets.length - 1 && (
                        <IconButton onClick={() => handleCloseAction(index)}>
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Box>

                    {/* Full-width Input for Quantity */}
                    <Box display="flex" justifyContent="space-between">
                      <TextField
                        label="Target Quantity"
                        variant="outlined"
                        style={{ width: '45%', marginRight: '10px' }}
                        onChange={(e) => handleInputChange(index, 'tquantity', e.target.value)}
                        margin="normal"
                        InputLabelProps={{
                          style: { fontSize: '12px' }  // Set label font size to 12px
                        }}

                        error={!!errors[index]} // Set error state based on specific index
                        helperText={errors[index]}
                      />
                      <TextField
                        label={inputSets.length > 0 ? `SL Quantity: ${inputSets[index].squantity}` : 'SL Quantity:: '}
                        variant="outlined"
                        style={{ width: '45%' }}
                        margin="normal"

                        InputLabelProps={{
                          style: { fontSize: '12px' },
                          // Set label font size to 12px
                        }}
                        disabled={true}

                      />
                    </Box>

                    {/* Two Inputs with 45% Width Side by Side */}
                    <Box display="flex" justifyContent="space-between">
                      <TextField
                        label="Target"
                        variant="outlined"
                        style={{ width: '45%', marginRight: '10px' }}
                        onChange={(e) => handleInputChange(index, 'target', e.target.value)}
                        margin="normal"
                        InputLabelProps={{
                          style: { fontSize: '12px' }  // Set label font size to 12px
                        }}
                      />
                      <TextField
                        label="Stop Loss"
                        variant="outlined"
                        style={{ width: '45%' }}
                        margin="normal"
                        onChange={(e) => handleInputChange(index, 'sl', e.target.value)}
                        InputLabelProps={{
                          style: { fontSize: '12px' },
                          // Set label font size to 12px
                        }}

                      />
                    </Box>
                  </Box>
                ))}
              </div>



              <div className="orderbox2" style={{ marginBottom: '20px' }}>
                <div className="width50">
                  <Button className="orderbutton5" sx={{
                    backgroundColor, '&:hover': {
                      backgroundColor,
                    },
                  }}   onClick={sendOrder}>{side}</Button>
                </div>
                <div className="width50">
                  <Button className="orderbutton2" onClick={onClose}>Cancel</Button>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>

    </>
  );


}

export default Orderplace;