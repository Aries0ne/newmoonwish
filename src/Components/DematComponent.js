import React from "react";
import { Box, Grid, Typography, ListItem, List, Button } from "@mui/material";
// import './Opendemat.scss';
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
import sharekhan from "../images/sharekhan.png";

const brokerList = [
  { brokerImg: broker1 },
  { brokerImg: broker2 },
  // { brokerImg: broker3, },
  // { brokerImg: broker4, },
  // { brokerImg: broker5, },
  { brokerImg: broker6 },
  // { brokerImg: broker7, },
  // { brokerImg: broker8, },
  // { brokerImg: broker9, },
  { brokerImg: broker10 },
  // { brokerImg: broker11, },
];

export default function Opendemat() {
  const Link = (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0691 1.28638H17.351V5.54129"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.62825"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4946 10.648V15.7548C16.4946 16.6949 15.7278 17.457 14.7818 17.457H2.79258C1.84665 17.457 1.07983 16.6949 1.07983 15.7548V3.83897C1.07983 2.89884 1.84665 2.13672 2.79258 2.13672H7.93083"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.62825"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6436 8.94601L16.9228 1.71143"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.62825"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  return (
    <Box className="dematBox">
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={7} textAlign={"center"}>
          <Typography className="title" component={"h2"}>
            Open Demat
          </Typography>
          <Typography className="tagLine" component={"p"}>
            Choose from our top associate brokers and create your own trading
            account.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        sx={{
          maxWidth: { xs: "1550px" },
          margin: "auto",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: { xs: "flex" },
            flexWrap: { xs: "wrap" },
            justifyContent: "center",
          }}
          className='demat_grid'
        >
          {/* {brokerList.map((item, index) => (
            <Grid className="dematCard-item" key={index}>
              <Box className="dematCard">
                <Box className="dematCard-img">
                  <img src={item.brokerImg} />
                </Box>
                <Box className="dematCard-content">
                  <List>
                    <ListItem>{15}/- Rs per Order</ListItem>
                    <ListItem>All equity delivery15/- Rs </ListItem>
                    <ListItem>Account openingcharges free . </ListItem>
                  </List>
                  <Button className="dematCard-btn">
                    {Link}Click here to Proceed
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))} */}
          <Grid className="dematCard-item">
            <Box className="dematCard">
              <Box className="dematCard-img">
                <img src={sharekhan} />
              </Box>
              <Box className="dematCard-content">
                <List>
                  <ListItem>Account Opening Charges-Zero</ListItem>
                  <ListItem>
                    Equity - Intraday brokerage: 0.02% on market rate or
                  </ListItem>
                  {/* <ListItem>minimum 1 paisa per share (each side)</ListItem> */}
                  <ListItem>
                    Equity &Commodity Options brokerage: INR 20 per lot
                  </ListItem>
                  <ListItem>
                    Currency - Options brokerage: INR 5 per lot
                  </ListItem>
                </List>
                <Button
                  className="dematCard-btn"
                  onClick={() =>
                    window.open(
                      "https://diy.sharekhan.com/app/BRFR"
                    )
                  }
                >
                  {Link}Click here to Proceed
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
