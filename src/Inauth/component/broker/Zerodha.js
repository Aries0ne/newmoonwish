import "./Broker.scss";
import { Box, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { zerodhaValidation } from "../../../validation/broker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BrokerStatus } from "../../../redux/actions/brokerAction";

const Zerodha = () => {
  const inputFields = { appkey: "", secretkey: "" };
  const [fields, setFields] = useState(inputFields);
  const [isSubmit, setIsSubmit] = useState(false);
  const [Error, setError] = useState();
  const brokerStatus = useSelector((state) => state.Broker.brokerstatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputBorder = {
    borderRadius: "5px",
    border: "1px solid #bcbcbc",
  };

  const handleChange = (event) => {
    const keyName = event.target.name;
    const keyValue = event.target.value;
    setFields((prevState) => ({
      ...prevState,
      [keyName]: keyValue,
    }));
    if (isSubmit) {
      setError(zerodhaValidation({ ...fields, [keyName]: keyValue }));
    }
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    setError(zerodhaValidation(fields));
    const error = zerodhaValidation(fields);
    if (Object.keys(error) == 0) {
      localStorage.setItem("AppKey", fields.appkey);
      localStorage.setItem("secretkey", fields.secretkey);
      localStorage.setItem("uid", fields.uid);
      localStorage.setItem("brokername", "zerodha");
      window.location.replace(
        `https://kite.zerodha.com/connect/login?v=3&api_key=${fields.appkey}`
      );
    }
  };

  useEffect(() => {
    dispatch(BrokerStatus());
  }, []);

  useEffect(() => {
    if (brokerStatus?.length > 0) {
      if (brokerStatus[0]?.appkey) {
        setFields({
          ...fields,
          appkey: brokerStatus[0]?.appkey,
          secretkey: brokerStatus[0]?.secretkey,
          uid: brokerStatus[0]?.uid,
        });
      }
    }
  }, [brokerStatus]);

  return (
    <>
      <div className="border">
        <Box>
          <Grid xs={12} lg={12}>
            {/* <Box>
                            <Typography component={'label'} style={{ display: 'flex', justifyContent: "center" }}>ZERODHA BROKER</Typography>
                            <hr style={{ color: "#26DE81", border: '2px solid' }} />
                        </Box> */}
            <Box style={{ border: "none" }} className="contactForm formBox">
              <Box className="formItems">
                <Typography component={"label"} className="label">
                  APP KEY :
                </Typography>
                <TextField
                  placeholder="Enter Access Key"
                  name="appkey"
                  className="inputFiled"
                  style={inputBorder}
                  onChange={handleChange}
                  value={fields?.appkey}
                />
                {Error ? <div className="error">{Error.appkey}</div> : ""}
              </Box>
              <Box className="formItems">
                <Typography component={"label"} className="label">
                  SECRET KEY :
                </Typography>
                <TextField
                  placeholder="Enter Secret Key"
                  name="secretkey"
                  className="inputFiled"
                  style={inputBorder}
                  onChange={handleChange}
                  value={fields?.secretkey}
                />
                {Error ? <div className="error">{Error.secretkey}</div> : ""}
              </Box>
              <Box className="formItems">
                <Typography component={"label"} className="label">
                  UID :
                </Typography>
                <TextField
                  placeholder="Enter UID"
                  name="uid"
                  className="inputFiled"
                  style={inputBorder}
                  onChange={handleChange}
                  value={fields?.uid}
                />
                {Error ? <div className="error">{Error.uid}</div> : ""}
              </Box>
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
                    onClick={handleSubmit}
                  >
                    Login
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Zerodha;
