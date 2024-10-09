import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Typography,
  InputBase,
  MenuItem,
  Tooltip,
} from "@mui/material";
import "../Inauth/Brokerlogin/Brokerlogin.scss";
import InfoIcon from "@mui/icons-material/Info";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import broker1 from "../images/aliceblue.png";
import broker2 from "../images/zebull.png";
import broker3 from "../images/paisa.png";
import broker4 from "../images/anglebroking.png";
import broker5 from "../images/finvasia.png";
import broker6 from "../images/icici.png";
import broker7 from "../images/kotak.png";
import broker8 from "../images/motialoswal.png";
import broker9 from "../images/swastika.png";
import broker10 from "../images/zerodha.png";
import broker11 from "../images/fyers.png";
import Zebull from "../Inauth/component/broker/Zebull";
import Icici from "../Inauth/component/broker/Icici";
import Angel from "../Inauth/component/broker/Angel";
import Zerodha from "../Inauth/component/broker/Zerodha";
import Finvasia from "../Inauth/component/broker/Finvasia";
import Kotak from "../Inauth/component/broker/Kotak";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  aliceLogin,
  iciciLogin,
  sharekhanBroker,
  zerodhaLogin,
} from "../redux/actions/brokerAction";
import Alice from "../Inauth/component/broker/Alice";
import Paisa from "../Inauth/component/broker/Paisa";
import MotilalOswal from "../Inauth/component/broker/MotilalOswal";
import Swastika from "../Inauth/component/broker/Swastika";
import Fyers from "../Inauth/component/broker/Fyers";
import Sharekhan from "../Inauth/component/broker/sharekhan";

const BrokerComponent = (props) => {
  const [brokerValue, setBrokerValue] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const [sessionToken, setSessionToken] = useState();
  const [optionsKey, setOptionsKey] = useState(0);

  const [isModalOpen,setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { brokers, broker, brokerStatus } = props;

  const handleClick = (value) => {
    if (value) {
      setModalOpen(true);
      setBrokerValue(value);
      setOptionsKey((prevKey) => prevKey + 1);
    }
  };

  const closemodal = () => {
    setModalOpen(false);
    setBrokerValue(null);
  }
  const handleSelectbroker = (event, value) => {
    setBrokerValue(value);
  };

  brokers = brokers.map((b) => b.toUpperCase());

  useEffect(() => {
    let apisession = searchParams.get("apisession");
    const appkey = localStorage.getItem("AppKey");
    const authCode = searchParams.get("authCode");
    const uid = localStorage.getItem("uid");
    const userId = searchParams.get("userId");
    let session = searchParams.get("request_token");
    const secretkey = localStorage.getItem("secretkey");
    const brokername = localStorage.getItem("brokername");
    const broker = localStorage.getItem("broker");

    if (session && appkey && secretkey && brokername == "sharekhan") {
      let obj = {
        appkey: appkey,
        secretkey: secretkey,
        uid: uid,
        session: session.replace(/ /g, "+"),
        brokername: "sharekhan",
      };
      dispatch(sharekhanBroker(obj, navigate));
    }
    if (session && appkey && secretkey && brokername == "zerodha") {
      let obj = {
        appkey: appkey,
        secretkey: secretkey,
        session: session,
        uid:uid,
        brokername: "zerodha",
      };
      dispatch(zerodhaLogin(obj, navigate));
    }
  }, [window, searchParams]);

  const brokerDesc = (
    <Typography sx={{ fontSize: "1.4rem" }}>
      Sharekhan is an Indian retail brokerage full-service brokerage firm, that
      as of 2020, was the fifth largest full-service firm and the 8th largest
      stock broker in India with 16 lakh customers.
    </Typography>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Box className="formBox" sx={{ border: "none !important" }}>
            <Box className="formItems">
              <Box className="selectionDiv brokerDrp">
                <Typography component={"label"} className="label1">
                  Connect Your Broker
                </Typography>
       

                <p className="text002">Total 52 items sdfsdv efgev evv eveve bebebeb evew vevev ervev ervberve erverv revev ervev reve veve vrevrev</p>
              </Box>
              <Box xs={8}>
                <div>
                  {/* {brokerValue?.toLowerCase() === "aliceblue" && (
                    <div>
                      <Alice broker={brokerValue}></Alice>
                    </div>
                  )} */}
                  {brokerValue?.toLowerCase() === "zebull" && (
                    <div>
                      <Zebull broker={brokerValue} type="new"></Zebull>
                    </div>
                  )}
                  {/* {brokerValue?.toLowerCase() === "icici" && (
                    <div>
                      <Icici broker={brokerValue} type="new"></Icici>
                    </div>
                  )} */}
                  {brokerValue?.toLowerCase() === "zerodha" && isModalOpen && (
                    <div>
                      <Zerodha broker={brokerValue} onClose={closemodal}></Zerodha>
                    </div>
                  )}
                  {brokerValue?.toLowerCase() === "sharekhan"  && isModalOpen && (
                    <div>
                      <Sharekhan broker={brokerValue} onClose={closemodal}></Sharekhan>
                    </div>
                  )}
                  {/* {brokerValue.toLowerCase() === "Angle Broking" && (
                    <div>
                      <Angel broker={brokerValue}></Angel>
                    </div>
                  )}

                  {brokerValue === "Finvasia" && (
                    <div>
                      <Finvasia broker={brokerValue}></Finvasia>
                    </div>
                  )}
                  {brokerValue === "Kotak Mahindra" && (
                    <div>
                      <Kotak broker={brokerValue}></Kotak>
                    </div>
                  )}

                  {brokerValue === "5Paisa" && (
                    <div>
                      <Paisa broker={brokerValue}></Paisa>
                    </div>
                  )}
                  {brokerValue === "Motial Oswal" && (
                    <div>
                      <MotilalOswal broker={brokerValue}></MotilalOswal>
                    </div>
                  )}
                  {brokerValue === "Swastika" && (
                    <div>
                      <Swastika broker={brokerValue}></Swastika>
                    </div>
                  )}
                  {brokerValue === "Fyers" && (
                    <div>
                      <Fyers broker={brokerValue}></Fyers>
                    </div>
                  )} */}
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "1rem" }}>
          <Box className="selectBroker">
          
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap",justifyContent:"space-between" }}
            >
   
              {brokerStatus[0]?.status == true ? (
                <>
                  {broker.map((brokers, index) => {
                    if (brokerStatus[0]?.brokername == brokers.name) {
                      return (
                        <Button
                          className="brokerList"
                          key={index}
                          onClick={() => handleClick(brokers.name)}
                        >
                          <img src={brokers.img} />
                          <Typography
                            component={"p"}
                            className="brokerDestials"
                          >
                            {brokers.name}
                          </Typography>
                        </Button>
                      );
                    }
                  })}{" "}
                </>
              ) : (
                <>
                  {brokerValue !== null? broker.map((brokers, index) => {
                        if (brokerValue?.toLowerCase() == brokers.name) {
                          return (
                            <div className="brokerList">
                              <Button
                                key={index}
                                onClick={() => handleClick(brokers.name)}
                              >
                                <img src={brokers.img} />
                                <Typography
                                  component={"p"}
                                  className="brokerDestials"
                                >
                                  {brokers.name}
                                </Typography>
                              </Button>
                              zerodha
                            </div>
                          );
                        }
                      })
                    : broker.map((brokers, index) => {
                        console.log("brokers", brokers);
                        return (
                          <>
                            <div className="brokerList">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  width:"100%",
                                  justifyContent:"space-evenly",
                                  
                                }}
                              >
                                {/* <Tooltip title={brokerDesc} placement="top"> */}
                                  <Button title={brokerDesc} key={index}>
                                  
                                    <img src={brokers.img} />

                                    
                                  </Button>
                                {/* </Tooltip> */}
                                
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection:"column",
                                    justifyContent:"end",
                                    gap:"10px",
                                    width:"55%",
                                    padding:"5px",
                                    
                                 
                                  }}
                                >
                                
                                  <h6 className="text001">{brokers.name}</h6>
                                  <p className="text002">{brokers.desc}</p>
                                  <Button
                                    onClick={() => handleClick(brokers.name)}
                                    variant="outlined"
                                    className="ConnectButton"
                                  >
                                    Connect Broker
                                  </Button>
                                  {/* <Tooltip title={brokerDesc} placement="auto">
                                    <Button
                                      style={{
                                        padding: "0 7px",
                                        minWidth: "auto",
                                      }}
                                      variant="outlined"
                                      className="ConnectButton"
                                    >
                                      <InfoIcon style={{ fontSize: "20px" }} />
                                    </Button>
                                  </Tooltip> */}
                               
                                <Button
                                  onClick={() =>
                                    window.open(
                                      "https://diy.sharekhan.com/app/BRFR"
                                    )
                                  }
                                  variant="outlined"
                                  className="ConnectButton"
                                >
                                  Open an Account{" "}
                                  <OpenInNewIcon
                                    style={{ marginLeft: "5px" }}
                                  />
                                </Button>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BrokerComponent;
