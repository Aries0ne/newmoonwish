import { Box, InputBase,Switch,Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Dropdown from "../../Dropdown/Dropdown";

import { useDispatch, useSelector } from "react-redux";
import "./addsymbol.scss";


const Orderplace = ({ onClose }) => {

    const orderTypValues = ["Market", "Limit", "SL", "SL-M"];



    return (
        <>
            <div className="modal-overlay" >
                
                <div className="modal-content side6" >
                
                    {/* <button className="close-button1" onClick={onClose} >X</button> */}
                    <div className="modal-body side5">
                    <div style = {{backgroundColor:"#F75723" , width:"100%", height:"70px", display:'flex',alignItems:'center', flexDirection:'row'}}>
                        <div className="textorder">BANKNIFTY24JAN2024CE</div>
                        <div>
                        <Switch  />
                        </div>
                    </div>
                        <div className="border1">
                        <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "14px !important" }}
                    >
                      Quantity
                    </Typography>
                    <Box className="inputFields  space orderbox">
                      <InputBase
                        placeholder="Quantity"
                        type="number"
                        
                      />
                    </Box>



                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "14px !important", marginTop:"20px" }}
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
                          height:"40px"
                        
                        },
                      }}
                    >
                      <Dropdown
                        sx = {{height:"30px", fontSize:"12px"}}
                        val={orderTypValues}
                        value=""
                      />
                    </Box>



                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "14px !important", marginTop:"20px" }}
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
                          height:"40px"
                        
                        },
                      }}
                    >
                      <Dropdown
                        sx = {{height:"30px", fontSize:"12px"}}
                        val={orderTypValues}
                        value=""
                      />
                    </Box>



                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "14px !important", marginTop:"20px" }}
                    >
                      Price
                    </Typography>
                    <Box className="inputFields  space orderbox">
                      <InputBase
                        placeholder="Price"
                        type="number"
                        
                      />
                    </Box>


                    <Typography
                      component={"label"}
                      className="label"
                      sx={{ fontSize: "14px !important", marginTop:"20px" }}
                    >
                      Trigger Price
                    </Typography>
                    <Box className="inputFields  space orderbox">
                      <InputBase
                        placeholder="Trigger Price"
                        type="number"
                        
                      />
                    </Box>

                    <div className="orderbox2">
                        <div className="width50">
                                <Button className="orderbutton1">Buy</Button>
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