import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Signform.scss";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import logolight from "../../images/logo-light.png";
import logodark from "../../images/logo-dark.png";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import signimg from "../../images/sign-img.png";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { country_list } from "./countryList";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import ReactFlagsSelect from "react-flags-select";
import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

import 'react-phone-input-2/lib/material.css'
import {
  authSignup,
  sendOtp,
  verifyOtp,
} from "../../redux/actions/authActions";
import {
  validateOtp,
  validateRegister,
  validateValues,
  validateNumber,
} from "../../validation/signin";
import moment from "moment";
import { useState } from "react";
import { generatePopup, otpPopup } from "../../utils/popup";

export default function Signform() {
  // Main tab
  const [otp, setotp] = useState("block");
  const [signin, setsignin] = useState("none");
  const [signup, setsignup] = useState("none");
  const [counter, setCounter] = useState(40);
  const [otpcode, setOtpCode] = useState("");
  const [countrycode, setCountryCode] = useState("IN");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [fields, setFields] = useState();
  const [Error, setErr] = useState(false);
  const [fielderror, setFieldError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  let countNum = 30;
  const [count, setCount] = useState(countNum);
  const [showOtp, setShowOtp] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Dropdown tab
  const allcustomerdrp = (event) => {
    setCountryCode(event.target.value);
  };

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   const formattedValue = value.replace(/\D/g, "");
  //   let formattedNumber = formattedValue;

  //   // Format the phone number with a hyphen after 5 characters for display
  //   if (formattedValue.length > 5) {
  //     formattedNumber =
  //       formattedValue.slice(0, 5) + "-" + formattedValue.slice(5);
  //   }

  //   if (event.key === "Backspace") {
  //     // Handle backspace key
  //     if (formattedValue.length === 6 && formattedValue.charAt(5) === "-") {
  //       // Remove hyphen when deleting the 6th character
  //       formattedNumber = formattedValue.slice(0, 5);
  //     }
  //     if (formattedValue.length === 5) {
  //       // Remove last character when deleting the 5th character
  //       formattedNumber = formattedValue.slice(0, 4);
  //     }
  //   }

  //   if (formattedValue.length <= 10) {
  //     setFormattedPhoneNumber(formattedNumber);
  //     setNumber(formattedValue);
  //   }
  // };

  const handleChange = (value) => {
    // 'value' is the raw input (phone number)
    const formattedValue = value.replace(/\D/g, "");
    console.log(formattedValue);
    let formattedNumber = formattedValue;
  
    // Format the phone number with a hyphen after 5 characters for display
  
  
    // Ensure the formatted number stays within 10 digits
   
      setFormattedPhoneNumber(formattedNumber);
      setNumber(formattedValue);
    
  };

  // const handleSendOTP = (e, flag = true) => {
  //   e.preventDefault();
  // // 20-07-2023

  const [selected, setSelected] = useState("IN");

  const handleSendOTP = (e, flag = true) => {
    e.preventDefault();

    console.log("handle Send OTP called", validateValues(number));
    if (validateValues(number) === true) {
      let obj = {
        phone:  number,
        method: "text",
      };
      dispatch(sendOtp(obj)).then((res) => {
        if (flag) {
          if (res) {
            if (otp === "block") {
              setotp("none");
              setsignin("block");
            } else {
              setotp("block");
              setsignin("none");
            }
          }
        }
        setReadOnly(true);
        setCount(countNum);
        handleCount();
        generatePopup("success", "OTP sent successfully !");
      });
    } else {
      setNumberError(validateValues(number));
      return generatePopup("error", "OTP not sent !");
    }
  };

  const changenumber = () => {
    if (otp === "none") {
      setotp("block");
      setsignin("none");
    } else {
      setotp("block");
      setsignin("none");
    }
  };

  const onHandleChangeOtp = (event) => {
    if (
      /^[0-9]*$/.test(event.target.value) &&
      event.target.value.toString().length <= 6
    ) {
      setOtpCode(event.target.value);
      setErr(validateOtp(event.target.value));
    }
  };

  const signinform = (e) => {
    e.preventDefault();
    if (!validateOtp(otpcode) === true) {
      let obj = {
        phone:  number,
        otp: otpcode,
      };
      dispatch(verifyOtp(obj, navigate))
        .then((res) => {
          console.log("ressssssssss", res);
          if (res.status === 200) {
            localStorage.setItem("token", res?.data?.access);
            localStorage.setItem("phone", res?.data?.phone);
            navigate("/");
          } else if (res?.response?.data?.status === "False") {
            if (signin === "block") {
              setsignin("none");
              setsignup("block");
            } else {
              setsignin("block");
              setsignup("none");
            }
          }
        })
        .catch((error) => {
          console.log("otp not verify :>> ", error.message);
        });
    } else {
      setErr("Please enter valid OTP");
    }
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    let loginObj = {
      ...fields,
      phone: country_list[countrycode].phone + number,
    };
    setFields(loginObj);
    setFieldError(validateRegister(loginObj));
    const error = validateRegister(loginObj);

    let selectedDate = new Date(fields?.DOB);
    let todayDate = new Date();

    if (loginObj?.firstname?.length < 4) {
      return generatePopup("error", "FirstName should greater than 3 letter !");
    } else if (loginObj?.lastname?.length < 4) {
      return generatePopup("error", "LastName should greater than 3 letter !");
    } else if (todayDate.getFullYear() - selectedDate.getFullYear() < 18) {
      return generatePopup("error", "You should be elder than 18 years !");
    }

    if (Object.keys(error) == 0) {
      dispatch(authSignup(loginObj)).then((res) => {
        if (res?.response?.status === 400) {
          // setotp("block");
          // setsignup("none");
          setFields({
            phone: "",
            email: "",
            firstname: "",
            lastname: "",
            DOB: "",
          });
          setNumber("");
          setOtpCode("");
        } else if (res?.status === 201) {
          localStorage.setItem("token", res?.data?.access);
          localStorage.setItem("phone", res?.data?.phone);
          navigate("/");
          // setotp("block");
          // setsignup("none");
          // setFields({
          //   phone: "",
          //   email: "",
          //   firstname: "",
          //   lastname: "",
          //   DOB: "",
          // });
          // setNumber("");
          // setOtpCode("");
        }
      });
    }
  };

  const handleInputChange = (event) => {
    const keyName = event.target.name;
    const keyValue = event.target.value;
    setFields((prevState) => ({
      ...prevState,
      [keyName]: keyValue,
    }));
    if (isSubmit) {
      setFieldError(validateRegister({ ...fields, [keyName]: keyValue }));
    }
  };

  const handleBirthChange = (stringValue) => {
    setFields({
      ...fields,
      DOB: moment(new Date(stringValue)).format("YYYY-MM-DD"),
    });
    if (isSubmit) {
      setFieldError(
        validateRegister({
          ...fields,
          DOB: moment(stringValue).format("YYYY-MM-DD"),
        })
      );
    }
  };

  // Countdown
  // React.useEffect(() => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // }, [counter]);

  const handleCount = () => {
    setCount(countNum);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((oldCount) => {
        if (oldCount === 1) {
          setReadOnly(false);
        }
        return Math.max(oldCount - 1, 0);
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  let token = localStorage.getItem("token");
  let path;
  useEffect(() => {
    if (!token || token == null) {
      path = "/signform";
    }
  }, [token]);

  let country_array = [];
  let country_label = {};
  let country_labelName = {};
  let array = Object.keys(country_list).map((code, index) => {
    const country = country_list[code];
    country_array.push(code);
    country_label[code] = "+" + country.phone;
    country_labelName[code] = " " + country.name;
  });

  return (
    <>
      <Box className="login_layer"></Box>
      <Box className="signForm-bg">
        <Box className="signForm-menu">
          <NavLink to={path} className="logoLight">
            <img src={logolight} height={"100%"} width={"100%"} />
          </NavLink>
          {/* <Button className="signForm-btn">
            Login In <LoginRoundedIcon />
          </Button> */}
        </Box>

        <Box className="signForm-box">
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
            <Grid item xs={12} md={6} lg={5} xl={5}>
              <Box className="from-bg">
                <img src={logodark} className="formLogo" />
                {/* <Typography component={"p"} className="form-text">
                  Welcome back! 👋
                </Typography> */}
                <Typography component={"h4"} className="form-text">
                  {signup !== "none" ? "Sign Up" : "Log In / Sign Up"}
                </Typography>
                <Typography component={"h3"} className="form-text">
                  Please verify your number to get started
                </Typography>

                {/*Send OTP */}
                <Box
                  className="contactForm formBox"
                  sx={{ display: otp, border: "none !important" }}
                >
                  <form onSubmit={handleSendOTP}>
                    <Box className="formItems">
                      {/* <Typography component={"label"} className="label">
                      Enter Mobile Number
                    </Typography> */}
                      <Box sx={{ display: "flex" }}>
                        {/* <Box
                          className="dropdown-ap"
                          sx={{
                            width: "10rem !important",
                            marginRight: 1,
                            "& >div.ReactFlagsSelect-module_flagsSelect__2pfa2 > button > span":
                              {
                                padding: 0,
                                height: "1.8rem",
                                fontSize: "1.4rem",
                              },
                            "& >div.ReactFlagsSelect-module_flagsSelect__2pfa2>ul":
                              { maxWidth: "12rem", width: "12rem" },
                          }}
                        >
                          <ReactFlagsSelect
                            selected={countrycode}
                            countries={country_array}
                            customLabels={country_label}
                            onSelect={(code) => {
                              setCountryCode(code);
                            }}
                            placeholder=" "
                          />
                            </Box> */}
                        {/* <TextField
                          type="text"
                          // placeholder="Enter Mobile Number"
                          className={
                            numberError ? "inputFiled error" : "inputFiled"
                          }
                          value={formattedPhoneNumber}
                          id="otpInput"
                          name="phone"
                          onChange={handleChange}
                          label="Mobile Number"
                        /> */}
                      </Box>


                 
            <PhoneInput
              value={formattedPhoneNumber}
              onChange={handleChange}
              inputProps={{
                name: 'ph',
                required: true,
              }}
              country="in"
              enableSearch={true}
              inputClass = 'sanket'
              countryCodeEditable={false}
              
              containerClass = 'sam'
              
            />








                      {numberError && <p className="color">{numberError}</p>}
                    </Box>

                    <Box className="formItems" sx={{ position: "relative" }}>
                      {/* <Typography component={"label"} className="label">
                    Enter OTP12
                  </Typography>
                  <TextField
                    type="number"
                    placeholder="Enter OTP"
                    className="inputFiled"
                    value={otpcode}
                    id="otp"
                    onChange={onHandleChangeOtp}
                  />
                  {Error ? <p className="color">{Error}</p> : ""} */}
                      {/* {readOnly && (
                      <Typography className={"countdown"}>
                        You can resend an OTP in{" "}
                        <Typography component={"span"}>{count}</Typography>{" "}
                        seconds.
                      </Typography>
                    )} */}
                      <Button
                        type="submit"
                        sx={{ marginTop: "2rem !important" }}
                        className="signForm-btn"
                        onClick={handleSendOTP}
                      >
                        {countrycode !== "IN" ? (
                          <WhatsAppIcon
                            className="whatsapp-logo"
                            style={{ marginRight: 5 }}
                          />
                        ) : (
                          <SmsOutlinedIcon
                            className="whatsapp-logo"
                            style={{ marginRight: 5 }}
                          />
                        )}

                        {countrycode !== "IN" ? " WHATSAPP OTP" : "SMS OTP "}
                      </Button>
                    </Box>
                  </form>
                </Box>

                {/* Otp  */}
                <Box
                  className="contactForm formBox"
                  sx={{ display: signin, border: "none !important" }}
                >
                  <form onSubmit={signinform}>
                    <Box className="sendOTP-alert">
                      <TaskAltIcon
                        sx={{ fontSize: "2.4rem" }}
                        className="checkIcon"
                      />
                      <Box sx={{ marginLeft: "1rem" }}>
                        <Typography component={"h5"}>
                          An OTP has been sent on your
                          {countrycode === "IN" ? (
                            <b> Mobile</b>
                          ) : (
                            <b> WhatsApp</b>
                          )}{" "}
                          number
                          {/* {countrycode === "IN"
                            ? " " + "Mobile Number"
                            : " " + "whatsapp number"}{" "} */}
                          <Typography component={"span"}>
                            {" +" + country_list[countrycode].phone + number}
                          </Typography>
                        </Typography>
                        <Typography component={"p"}>
                          Plese enter the OTP below to continue.
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="formItems" sx={{ position: "relative" }}>
                      {/* <Typography component={"label"} className="label">
                        Enter OTP
                      </Typography> */}
                      <TextField
                        type="text"
                        // placeholder="Enter OTP"
                        className={Error ? "inputFiled error" : "inputFiled"}
                        value={otpcode}
                        id="otp"
                        onChange={onHandleChangeOtp}
                        label="Enter OTP"
                      />
                      {Error ? <p className="color">{Error}</p> : ""}
                      {readOnly && (
                        <Typography className={"countdown"}>
                          You can resend the OTP in{" "}
                          <Typography component={"span"}>{count}</Typography>{" "}
                          seconds.
                        </Typography>
                      )}
                      <Button
                        className="signForm-btn resendOtp"
                        onClick={(e) => handleSendOTP(e, false)}
                        disabled={readOnly}
                        sx={
                          {
                            // top: readOnly ? "5%" : "5%",
                          }
                        }
                        style={{
                          color: readOnly === true && "gray",
                        }}
                      >
                        RESEND OTP
                      </Button>
                    </Box>

                    <Box
                      sx={{
                        display: { sm: "flex" },
                        flexDirection: "column",
                        gap: 1,
                        alignItems: "center",
                        marginTop: 2,
                      }}
                    >
                      <Button
                        type="submit"
                        className="signForm-btn"
                        onClick={signinform}
                      >
                        Verify OTP
                      </Button>
                      <Button
                        className="signForm-btn secound"
                        onClick={changenumber}
                      >
                        Change Number
                      </Button>
                    </Box>
                  </form>
                </Box>

                {/* Sign Up Form */}
                <Box
                  className="contactForm formBox"
                  sx={{ display: signup, border: "none !important" }}
                >
                  <Box
                    sx={{
                      display: { md: "flex" },
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      className="formItems"
                      sx={{ paddingRight: { md: "0.5rem" } }}
                    >
                      {/* <Typography component={"label"}>First name</Typography> */}
                      <TextField
                        type="text"
                        placeholder="First Name"
                        className="inputFiled"
                        id="FirstName"
                        name="firstname"
                        value={fields?.firstname}
                        onChange={handleInputChange}
                      />
                      {fielderror && (
                        <span className="color">{fielderror.firstName}</span>
                      )}
                    </Box>
                    <Box
                      className="formItems"
                      sx={{ paddingLeft: { md: "0.5rem" } }}
                    >
                      {/* <Typography component={"label"}>Last name</Typography> */}
                      <TextField
                        type="text"
                        placeholder="Last Name"
                        className="inputFiled"
                        id="LastName"
                        name="lastname"
                        value={fields?.lastname}
                        onChange={handleInputChange}
                      />
                      {fielderror && (
                        <span className="color">{fielderror.lastname}</span>
                      )}
                    </Box>
                  </Box>

                  <Box className="formItems">
                    {/* <Typography component={"label"}>E mail</Typography> */}
                    <TextField
                      type="email"
                      placeholder="E-mail"
                      className="inputFiled"
                      id="Email"
                      name="email"
                      value={fields?.email}
                      onChange={handleInputChange}
                    />
                    {fielderror && (
                      <span className="color">{fielderror.email}</span>
                    )}
                  </Box>
                  <Box className="formItems">
                    {/* <Typography component={"label"}>DOB</Typography> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        // label="DD-MMM-YYYY"
                        className="datePicker"
                        sx={{ width: "100% !important" }}
                        id="DOB"
                        onChange={handleBirthChange}
                        format="DD/MMM/YYYY"
                        slotProps={{ textField: { placeholder: "D.O.B" } }}
                      />
                    </LocalizationProvider>
                    {fielderror && (
                      <span className="color">{fielderror.DOB}</span>
                    )}
                  </Box>
                  <Box className="formItems">
                    <Button
                      type="submit"
                      className="signForm-btn"
                      onClick={handleSubmit}
                    >
                      Sign Up
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              md={4}
              xl={5}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <img src={signimg} height={"100%"} width={"100%"} />
              <Box className="signContent">
                <Typography component={"h3"}>Make In India</Typography>
                <Typography component={"p"}>
                  Mooonwish Technology Solutions has come up with fully
                  automatic Robo Trading to make your trading strategies
                  smarter. You've come to the right place for Option Call,
                  Commodity Trading, Nifty Future, and other trading products
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
