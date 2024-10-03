import React from "react";
import { Box, Grid, Typography, ListItem, List, Button } from "@mui/material";
import "./Opendemat.scss";
import cardImg1 from "../../images/card-img1.jpeg";
import cardImg2 from "../../images/card-img2.jpeg";
import cardImg3 from "../../images/card-img3.jpeg";
import cardImg4 from "../../images/card-img4.jpeg";
import cardImg5 from "../../images/card-img5.jpeg";
import DematComponent from "../../Components/DematComponent";

import broker1 from '../../images/aliceblue.png';
import broker2 from '../../images/zebull.png';
import broker3 from '../../images/paisa.png';
import broker4 from '../../images/anglebroking.png';
import broker5 from '../../images/finvasia.png';
import broker6 from '../../images/icici.png';
import broker7 from '../../images/kotak.png';
import broker8 from '../../images/motialoswal.png';
import broker9 from '../../images/swastika.png';
import broker10 from '../../images/zerodha.png';
import broker11 from '../../images/fyers.png';


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
  return <DematComponent />;
}
