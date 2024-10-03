import { Box, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import "../broker/Broker.scss";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import EventIcon from "@mui/icons-material/Event";
import {
  BrokerStatus,
  zebullBroker,
} from "../../../redux/actions/brokerAction";
import { zebullValidation } from "../../../validation/broker";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
const Zebull = (props) => {
  const { broker } = props;
  const inputValue = { uid: "", password: "", dob: "", appkey: "" };
  const [fields, setFields] = useState(inputValue);
  const [isSubmit, setIsSubmit] = useState(false);
  const [Error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brokerStatus = useSelector((state) => state.Broker.brokerstatus);

  const dateField = {
    width: {
      xs: "100% !important",
      md: "100% !important",
    },
    border: "1px solid #bcbcbc",
    borderRadius: {
      xs: "3px",
    },
  };

  const handleChange = (event) => {
    let keyName = event.target.name;
    let keyValue = event.target.value;
    if (keyName == "uid") {
      keyValue = keyValue.toUpperCase();
    }
    setFields((prevState) => ({
      ...prevState,
      [keyName]: keyValue,
    }));
    if (isSubmit) {
      setError(zebullValidation({ ...fields, [keyName]: keyValue }));
    }
  };

  const handleDateChange = (dateString) => {
    setFields({
      ...fields,
      dob: dayjs(dateString, "YYYY-MM-DD").format("YYYY-MM-DD"),
    });
    if (isSubmit) {
      setError(
        zebullValidation({
          ...fields,
          dob: dayjs(dateString, "YYYY-MM-DD").format("YYYY-MM-DD"),
        })
      );
    }
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    setError(zebullValidation(fields));
    let error = zebullValidation(fields);
    if (Object.keys(error) == 0) {
      dispatch(zebullBroker({ ...fields, brokername: broker }, navigate))
        .then((res) => {
          if (res?.data?.status === 200) {
          } else if (res?.status === 400) {
            setFields({ uid: "", password: "", dob: "", appkey: "" });
          }
        })
        .catch((error) => {
          console.log("Failed to add Zebull Broker", error.message);
        });
    }
  };

  const inputBorder = {
    borderRadius: "5px",
    border: "1px solid #bcbcbc",
  };

  useEffect(() => {
    dispatch(BrokerStatus());
  }, []);

  useEffect(() => {
    if (brokerStatus?.length > 0) {
      if (brokerStatus[0]?.appkey) {
        setFields({
          ...fields,
          uid: brokerStatus[0]?.uid,
          appkey: brokerStatus[0]?.appkey,
          dob: brokerStatus[0]?.dob,
        });
      }
    }
  }, [brokerStatus]);

  return (
    <>
      <div className="border">
        <Box>
          <Grid item xs={12} lg={12}>
            {/* <Box >
                            <Typography style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }} component={'label'} className='label'>ZEBULL BROKER</Typography>
                            <hr style={{ color: '#26DE81', border: '2px solid' }} />
                        </Box> */}
            <Box
              sx={{ display: "flex", border: "none " }}
              className="contactForm formBox"
            >
              <Box className="formItems" /* sx={inputFiled} */>
                <Typography component={"label"} className="label">
                  UID :
                </Typography>
                <TextField
                  placeholder="Enter Uid..."
                  className="inputFiled"
                  value={fields?.uid}
                  style={inputBorder}
                  name="uid"
                  id="uid"
                  onChange={handleChange}
                />
                {Error && <div className="error">{Error.uid}</div>}
              </Box>
              <Box className="formItems" /* sx={inputFiled} */>
                <Typography component={"label"} className="label">
                  Password :
                </Typography>
                <TextField
                  placeholder="Enter Password..."
                  className="inputFiled"
                  value={fields?.password}
                  style={inputBorder}
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
                {Error && <div className="error">{Error.password}</div>}
              </Box>
              <Box className="formItems">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Typography component={"label"} className="label">
                    DOB :
                  </Typography>
                  <MobileDatePicker
                    sx={dateField}
                    format="YYYY-MM-DD"
                    value={dayjs(fields.dob)}
                    onChange={handleDateChange}
                    slotProps={{
                      textField: {
                        error: false,
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <EventIcon />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />
                  {Error && <div className="error">{Error.dob}</div>}
                </LocalizationProvider>
              </Box>
              <Box className="formItems">
                <Typography component={"label"} className="label">
                  App Key :
                </Typography>
                <TextField
                  placeholder="Enter App Key..."
                  style={dateField}
                  value={fields?.appkey}
                  className="inputFiled"
                  name="appkey"
                  id="appkey"
                  onChange={handleChange}
                />
                {Error && <div className="error">{Error.appkey}</div>}
              </Box>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  style={{ display: "flex", justifyContent: "start" }}
                >
                  <Box>
                    <Button
                      variant="contained"
                      style={{
                        fontSize: "15px",
                        marginTop: "13px",
                        width: "120px",
                      }}
                      sm={10}
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};
export default Zebull;
