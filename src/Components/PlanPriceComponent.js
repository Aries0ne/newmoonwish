import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, ListItem, List, Button } from "@mui/material";
import "../Inauth/Planpricing/Planpricing.scss";
import { displayRazorPay } from "../Inauth/Planpricing/PaymentGateway";
import { generatePopup } from "../utils/popup";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const PlanPriceComponent = () => {
  const [remainingDays, setRemainingDays] = useState(null);
  const [planExpiry, setPlanExpiry] = useState(null);
  const profile = useSelector((state) => state?.Auth?.authProfile[0]);

  useEffect(() => {
    if (profile?.activate_at?.length > 0 && profile?.expire_at?.length > 0) {
      const startDate = dayjs(profile?.activate_at);
      const endDate = dayjs(profile?.expire_at);
      setRemainingDays(endDate.diff(startDate, "day"));
      const expiringAt = dayjs(profile.expire_at, {
        format: "YYYY-MM-DD",
      }).format("DD-MMM-YYYY");
      setPlanExpiry(expiringAt);
    }
  }, [profile]);

  const onError = () => {
    generatePopup("error", "Razor Pay is Not Ready");
  };

  const onSuccess = (data, plan) => {
    generatePopup("success", data.message);
  };

  function isStringValid(str) {
    return (
      typeof str === "string" &&
      str?.trim().length !== 0 &&
      str !== undefined &&
      str !== null
    );
  }

  return (
    <>
      <Box className="planStatus">
        <Box className="plan">
          <Typography component={"span"}>Plan Status : </Typography>
          <Typography className="green" component={"span"}>
            Subscription
            {profile?.is_subscribe === true ? " Active" : " Inactive"}
          </Typography>
        </Box>

        {profile?.is_subscribe === true && isStringValid(planExpiry) && (
          <Box className="plan">
            <Typography component={"span"}>Plan Expiry : </Typography>
            {planExpiry && (
              <Typography className="green" component={"span"}>
                {planExpiry}
              </Typography>
            )}
            {remainingDays && (
              <Typography className="grey" component={"span"}>
                ({remainingDays} Days Left)
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <Grid
        container
        spacing={1}
        justifyContent={"center"}
        sx={{
          maxWidth: { xs: "1600px" },
          margin: "auto",
        }}
      >
        <Grid item xs={12}>
          <Typography component={"h2"} className="title">
            Recharge Plans
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={1}
        justifyContent={"center"}
        sx={{
          maxWidth: { xs: "1600px" },
          margin: "auto",
        }}
      >
        <Grid item xs={12}>
          <Box className="planCard-flex">
            <Box className="planCard">
              <Box className="planCard-type">
                <Typography component={"p"} className="planType">
                  Basic
                </Typography>
                <Box className="planPrice">
                  <Typography component={"span"}>₹</Typography>
                  <Typography component={"span"}>3000</Typography>
                  <Typography component={"span"}>/ Month</Typography>
                </Box>

                <Box className="save">
                  <Typography component={"span"}>Save 50% </Typography>
                  vs our monthly plan
                  <Box component={"del"}>₹3000</Box>
                </Box>
              </Box>
              <Box className="planCard-content">
                <List>
                  <ListItem>Validity 30 Days </ListItem>
                  <ListItem> All Segment Trading</ListItem>
                  <ListItem> Engineer Support</ListItem>
                  <ListItem>Learning Videos </ListItem>
                </List>
                <Button
                  onClick={() => displayRazorPay(onError, onSuccess, "Basic")}
                  className="planCard-btn"
                >
                  Buy Now
                </Button>
              </Box>
            </Box>

            <Box className="planCard">
              <Box className="planCard-type">
                <Typography component={"p"} className="planType">
                  Pro
                </Typography>
                <Box className="planPrice">
                  <Typography component={"span"}>₹</Typography>
                  <Typography component={"span"}>10800</Typography>
                  <Typography component={"span"}>/ Quartely</Typography>
                </Box>

                <Box className="save">
                  <Typography component={"span"}>Save 40%</Typography>
                  vs our monthly plan
                  <Box component={"del"}>₹18000</Box>
                </Box>
              </Box>
              <Box className="planCard-content">
                <List>
                  <ListItem>Validity 90 Days </ListItem>
                  <ListItem> All Segment Trading</ListItem>
                  <ListItem>Engineer Support</ListItem>
                  <ListItem>Learning Videos</ListItem>
                </List>
                <Button
                  onClick={() => displayRazorPay(onError, onSuccess, "Pro")}
                  className="planCard-btn"
                >
                  Buy Now
                </Button>
              </Box>
            </Box>

            <Box className="planCard premium">
              <Box className="planCard-type">
                <Typography
                  component={"p"}
                  className="planType"
                  sx={{ color: "#FFFFFF !important" }}
                >
                  Premium
                </Typography>
                <Box className="planPrice">
                  <Typography component={"span"}>₹</Typography>
                  <Typography
                    component={"span"}
                    sx={{ color: "#FFFFFF !important" }}
                  >
                    17640
                  </Typography>
                  <Typography component={"span"}>/ Half Yearly</Typography>
                </Box>

                <Box className="save">
                  <Typography component={"span"}>Save 51%</Typography>
                  vs our monthly plan
                  <Box component={"del"}>₹36000</Box>
                </Box>
              </Box>
              <Box className="planCard-content">
                <List>
                  <ListItem>Validity 180 Days </ListItem>
                  <ListItem> All Segment Trading</ListItem>
                  <ListItem> Engineer Support</ListItem>
                  <ListItem>Learning Videos </ListItem>
                  <ListItem>Make Your Own Strategy </ListItem>
                  <ListItem> Expert Weekend Tranding Training</ListItem>
                </List>
                <Button
                  onClick={() => displayRazorPay(onError, onSuccess, "Premium")}
                  className="planCard-btn"
                >
                  Buy Now
                </Button>
              </Box>
            </Box>

            <Box className="planCard">
              <Box className="planCard-type">
                <Typography component={"p"} className="planType">
                  Extra Plan
                </Typography>
                <Box className="planPrice">
                  <Typography component={"span"}>₹</Typography>
                  <Typography component={"span"}>72000</Typography>
                  <Typography component={"span"}>/ Annually</Typography>
                </Box>

                <Box className="save">Cost-Effective, Full Service</Box>
              </Box>
              <Box className="planCard-content">
                <List>
                  <ListItem>Validity 180 Days </ListItem>
                  <ListItem> All Segment Trading</ListItem>
                  <ListItem> Engineer Support</ListItem>
                  <ListItem>Learning Videos </ListItem>
                  <ListItem>Make Your Own Strategy </ListItem>
                  <ListItem> Expert Weekend Tranding Training</ListItem>
                </List>
                <Button
                  onClick={() =>
                    displayRazorPay(onError, onSuccess, "Extra Plan")
                  }
                  className="planCard-btn"
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PlanPriceComponent;
