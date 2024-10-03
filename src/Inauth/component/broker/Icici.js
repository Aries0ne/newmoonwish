import "../broker/Broker.scss";
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { iciciValidation } from "../../../validation/broker";
import { BrokerStatus, iciciLogin } from "../../../redux/actions/brokerAction";
import Brokerlogin from "../../Brokerlogin/Brokerlogin";

const Icici = (props) => {
  const inputFields = { AppKey: "", secretkey: "" };
  const [fields, setFields] = useState(inputFields);
  const [isSubmit, setIsSubmit] = useState(false);
  const [Error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const brokerStatus = useSelector((state) => state.Broker.brokerstatus);
  const { broker } = props;
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
      setError(iciciValidation({ ...fields, [keyName]: keyValue }));
    }
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    setError(iciciValidation(fields));
    let error = iciciValidation(fields);
    if (Object.keys(error) == 0) {
      localStorage.setItem("AppKey", fields?.AppKey);
      localStorage.setItem("secretkey", fields?.secretkey);
      localStorage.setItem("broker", broker);
      window.location.replace(
        `https://api.icicidirect.com/apiuser/login?api_key=${encodeURIComponent(
          fields.AppKey
        )}`
      );
      // dispatch(iciciLogin(fields, navigate))
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
          AppKey: brokerStatus[0]?.appkey,
          secretkey: brokerStatus[0]?.secretkey,
        });
      }
    }
  }, [brokerStatus]);

  return (
    <>
      <div className="border">
        <Box>
          <Grid xs={12} lg={12}>
            {/* <Box >
                            <Typography style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }} component={'label'} className='label'>ICICI BROKER</Typography>
                            <hr style={{ color: '#26DE81', border: '2px solid' }} />
                        </Box> */}
            <Box
              sx={{ display: "flex", border: "none " }}
              className="contactForm formBox"
            >
              {/* <Box className='formItems'>
                                <Typography component={'label'} className='label'>USER ID :</Typography>
                                <TextField
                                    placeholder="Enter User id..."
                                    className='inputFiled'
                                    style={inputBorder}
                                    name='userId'
                                    onChange={handleChange}
                                />
                                {Error ? <div className='error'>{Error.userId}</div> : ""}
                            </Box> */}
              <Box className="formItems">
                <Typography component={"label"} className="label">
                  APP KEY :
                </Typography>
                <TextField
                  placeholder="Enter App Key..."
                  className="inputFiled"
                  style={inputBorder}
                  name="AppKey"
                  onChange={handleChange}
                  value={fields?.AppKey}
                />
                {Error ? <div className="error">{Error.AppKey}</div> : ""}
              </Box>
              <Box className="formItems">
                <Typography component={"label"} className="label">
                  SECRET KEY :
                </Typography>
                <TextField
                  placeholder="Enter Secret Key..."
                  className="inputFiled"
                  style={inputBorder}
                  name="secretkey"
                  onChange={handleChange}
                  value={fields?.secretkey}
                />
                {Error ? <div className="error">{Error.secretkey}</div> : ""}
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

export default Icici;
