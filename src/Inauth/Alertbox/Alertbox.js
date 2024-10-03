import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./Alertbox.scss";

export default function Alertbox() {
  return (
    <>
      <Box className="alertBoxs">
        <Box className="alertBox-inner">
          <CheckCircleRoundedIcon className="alertSuccess" />
          <Typography component={"p"}>OTP Send Successfully</Typography>

          <Button className="alertClose">
            <CloseRoundedIcon />
          </Button>
        </Box>
      </Box>
    </>
  );
}
