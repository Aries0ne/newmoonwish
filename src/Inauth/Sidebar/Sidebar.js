import React, { useState } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  Tooltip,
  Typography,
  Collapse,
} from "@mui/material";
import "./Sidebar.scss";
import { NavLink, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dash from '../../images/dash.png';
import brok from '../../images/brok.png';
import port from '../../images/port.png';
import mark from '../../images/mark.png';
import pl from '../../images/p&l.png';
import strat from '../../images/strat.png';
import scan from '../../images/scan.png';
import alert from '../../images/alert.png';
import ath from '../../images/ath.png';
import indi from '../../images/indi.png';
import arrow from '../../images/arrow.png';
import logomob from "../../images/logomob.png";

export default function Sidebar(props) {
  const profile = useSelector((state) => state.Auth.authProfile);
  const [handlesidebar, setHandlesidebar] = useState("openWeb");
  const [handleHumburger, setHandleHumburger] = useState("left");
  const [handleHumburgerarw, setHandleHumburgerarw] = useState(
    <img src={arrow} alt="Logo" className="arrowimage" style={{height:"25px",width:"20px",marginRight:"-20px" }} />
  );
  const [expanded, setExpanded] = React.useState(false);
  const [expandedsv, setExpandedsv] = React.useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("phone");
    localStorage.clear();
    window.location.replace("/");
  };

  const handleSidebarMenu = () => {
    if (handlesidebar === "openWeb") {
      setHandlesidebar("");
      setHandleHumburger("center");
      setHandleHumburgerarw(<img src={arrow} alt="Logo" className="arrowimage" style={{height:"25px",width:"20px",marginRight:"-20px"}} />);
    } else {
      setHandlesidebar("openWeb");
      setHandleHumburger("left");
      setHandleHumburgerarw(<img src={arrow} alt="Logo" className="arrowimage" style={{height:"25px",width:"20px",marginRight:"-20px"}} />);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    // setExpandedsv(!expandedsv);
  };

  const handleExpandClicksv = () => {
    setExpandedsv(!expandedsv);
    // setExpanded(!expanded);
  };

  

  return (
    <>
   

      <Box className={`sidebar ${props.openbar} ${handlesidebar}`}>
        <List className="menu_action">
          <ListItem sx={{ justifyContent: handleHumburger }}>
            <Button
              className="btn_menuHandle right"
              onClick={handleSidebarMenu}
            >
              {handleHumburgerarw}
            </Button>
          </ListItem>
        </List>

        <List className="sidebarList">

         <Box component={"a"} href="/" className="ap-logo">
                <img
                  src={logomob}
                  alt={"Logo"}
                  loading="lazy"
                              
                  className="logomain"
                />
                

              </Box>




          <ListItem className="sidebarList-item">
            <NavLink components={"a"} to={"/"} className="sidebarList-menu">
              <Box className="sidebarList-icon">
               
                 <div>
                    <img src={dash} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
               Dashboard
              </Typography>
            </NavLink>
          </ListItem>

          <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"broker"}
              className="sidebarList-menu"
            >
              <Box className="sidebarList-icon">
              
                <div>
                    <img src={brok} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                Broker Login
              </Typography>
            </NavLink>
          </ListItem>

          <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"/marketwatch"}
              className="sidebarList-menu"
            >
              <Box className="sidebarList-icon">
              
                
                <div>
                    <img src={mark} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                Market Watch
              </Typography>
            </NavLink>
          </ListItem>

          <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"/portfolio"}
              className="sidebarList-menu"
            >
              <Box className="sidebarList-icon">
              
                <div>
                    <img src={port} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                Portfolio
              </Typography>
            </NavLink>
          </ListItem>

          <ListItem className={`sidebarList-item collapse_box`}>
            <Link
              onClick={handleExpandClicksv}
              href={"#"}
              className={`sidebarList-menu ${
                location.pathname == "/strategyview" ? "active" : ""
              }`}
            >
              <Box className="sidebarList-icon">
              <div>
                    <img src={strat} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}}/>
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                Strategy View
              </Typography>
            </Link>
            <Box component={"div"} className="collase_icon">
              <ExpandMoreIcon />
            </Box>
          </ListItem>

          <Collapse in={expandedsv} timeout="auto" unmountOnExit>
            <ListItem className="sidebarList-item">
              <NavLink
                components={"a"}
                to={"strategyview"}
                className="sidebarList-menu"
              >
                <Box className="sidebarList-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.59998 19.7499H4C3.04 19.7499 2.25 18.9599 2.25 17.9999V9.37988C2.25 8.41988 3.04 7.62988 4 7.62988H5.59998C6.55998 7.62988 7.34998 8.41988 7.34998 9.37988V17.9999C7.34998 18.9599 6.55998 19.7499 5.59998 19.7499ZM4 9.11987C3.86 9.11987 3.75 9.22987 3.75 9.36987V17.9999C3.75 18.1399 3.86 18.2499 4 18.2499H5.59998C5.73998 18.2499 5.84998 18.1399 5.84998 17.9999V9.37988C5.84998 9.23988 5.73998 9.12988 5.59998 9.12988H4V9.11987Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12.8002 19.7499H11.2002C10.2402 19.7499 9.4502 18.9599 9.4502 17.9999V6.18994C9.4502 5.22994 10.2402 4.43994 11.2002 4.43994H12.8002C13.7602 4.43994 14.5502 5.22994 14.5502 6.18994V17.9999C14.5502 18.9599 13.7602 19.7499 12.8002 19.7499ZM11.2002 5.93994C11.0602 5.93994 10.9502 6.04994 10.9502 6.18994V17.9999C10.9502 18.1399 11.0602 18.2499 11.2002 18.2499H12.8002C12.9402 18.2499 13.0502 18.1399 13.0502 17.9999V6.18994C13.0502 6.04994 12.9402 5.93994 12.8002 5.93994H11.2002Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.0004 19.75H18.4004C17.4404 19.75 16.6504 18.96 16.6504 18V3C16.6504 2.04 17.4404 1.25 18.4004 1.25H20.0004C20.9604 1.25 21.7504 2.04 21.7504 3V18C21.7504 18.96 20.9604 19.75 20.0004 19.75ZM18.4004 2.75C18.2604 2.75 18.1504 2.86 18.1504 3V18C18.1504 18.14 18.2604 18.25 18.4004 18.25H20.0004C20.1404 18.25 20.2504 18.14 20.2504 18V3C20.2504 2.86 20.1404 2.75 20.0004 2.75H18.4004Z"
                      fill="currentColor"
                    />
                  </svg>
                </Box>

                <Typography component={"span"} className="title">
                  Strategy
                </Typography>
              </NavLink>
            </ListItem>
          </Collapse>

          <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"scanner"}
              className="sidebarList-menu"
            >
              <Box className="sidebarList-icon">
              
                  <div>
                    <img src={scan} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                Scanner
              </Typography>
            </NavLink>
          </ListItem>

          <ListItem className="sidebarList-item">
            <NavLink components={"a"} to={"alert"} className="sidebarList-menu">
              <Box className="sidebarList-icon">
           
                  <div>
                    <img src={alert} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                Alert
              </Typography>
            </NavLink>
          </ListItem>

          <ListItem className="sidebarList-item">
            <NavLink components={"a"} to={"ath"} className="sidebarList-menu">
              <Box className="sidebarList-icon">
               
                  <div>
                    <img src={ath} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                ATH
              </Typography>
            </NavLink>
          </ListItem>
          <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"indicators"}
              className="sidebarList-menu"
            >
              <Box className="sidebarList-icon">
               
                  <div>
                    <img src={indi} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                indicators
              </Typography>
            </NavLink>
          </ListItem>

          <ListItem className={`sidebarList-item collapse_box`}>
            <Link
              onClick={handleExpandClick}
              // components={"a"}
              href={"#"}
              className={`sidebarList-menu ${
                location.pathname == "/indicatorbacktest" ||
                location.pathname == "/strategys"
                  ? "active"
                  : ""
              }`}
            >
              <Box className="sidebarList-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 10.75H17C14.58 10.75 13.25 9.42 13.25 7V5C13.25 2.58 14.58 1.25 17 1.25H19C21.42 1.25 22.75 2.58 22.75 5V7C22.75 9.42 21.42 10.75 19 10.75ZM17 2.75C15.42 2.75 14.75 3.42 14.75 5V7C14.75 8.58 15.42 9.25 17 9.25H19C20.58 9.25 21.25 8.58 21.25 7V5C21.25 3.42 20.58 2.75 19 2.75H17Z"
                    fill="currentColor"
                  />
                  <path
                    d="M7 22.75H5C2.58 22.75 1.25 21.42 1.25 19V17C1.25 14.58 2.58 13.25 5 13.25H7C9.42 13.25 10.75 14.58 10.75 17V19C10.75 21.42 9.42 22.75 7 22.75ZM5 14.75C3.42 14.75 2.75 15.42 2.75 17V19C2.75 20.58 3.42 21.25 5 21.25H7C8.58 21.25 9.25 20.58 9.25 19V17C9.25 15.42 8.58 14.75 7 14.75H5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 10.75C3.38 10.75 1.25 8.62 1.25 6C1.25 3.38 3.38 1.25 6 1.25C8.62 1.25 10.75 3.38 10.75 6C10.75 8.62 8.62 10.75 6 10.75ZM6 2.75C4.21 2.75 2.75 4.21 2.75 6C2.75 7.79 4.21 9.25 6 9.25C7.79 9.25 9.25 7.79 9.25 6C9.25 4.21 7.79 2.75 6 2.75Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 22.75C15.38 22.75 13.25 20.62 13.25 18C13.25 15.38 15.38 13.25 18 13.25C20.62 13.25 22.75 15.38 22.75 18C22.75 20.62 20.62 22.75 18 22.75ZM18 14.75C16.21 14.75 14.75 16.21 14.75 18C14.75 19.79 16.21 21.25 18 21.25C19.79 21.25 21.25 19.79 21.25 18C21.25 16.21 19.79 14.75 18 14.75Z"
                    fill="currentColor"
                  />
                </svg>
              </Box>

              <Typography component={"span"} className="title">
                Backtest Data
              </Typography>
            </Link>
            <Box component={"div"} className="collase_icon">
              <ExpandMoreIcon />
            </Box>
          </ListItem>

          {/*   Collapse data */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
           
            <ListItem className="sidebarList-item">
              <NavLink
                components={"a"}
                to={"indicatorbacktest"}
                className="sidebarList-menu"
              >
                <Box className="sidebarList-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4897 20.7599C15.2997 20.7599 15.1097 20.6899 14.9597 20.5399C14.6697 20.2499 14.6697 19.7699 14.9597 19.4799L19.9697 14.4699C20.2597 14.1799 20.7397 14.1799 21.0297 14.4699C21.3197 14.7599 21.3197 15.2399 21.0297 15.5299L16.0197 20.5399C15.8697 20.6799 15.6797 20.7599 15.4897 20.7599Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.5 15.7402H3.5C3.09 15.7402 2.75 15.4002 2.75 14.9902C2.75 14.5802 3.09 14.2402 3.5 14.2402H20.5C20.91 14.2402 21.25 14.5802 21.25 14.9902C21.25 15.4002 20.91 15.7402 20.5 15.7402Z"
                      fill="currentColor"
                    />
                    <path
                      d="M3.49945 9.75994C3.30945 9.75994 3.11945 9.68994 2.96945 9.53994C2.67945 9.24994 2.67945 8.76994 2.96945 8.47994L7.97945 3.46994C8.26945 3.17994 8.74945 3.17994 9.03945 3.46994C9.32945 3.75994 9.32945 4.23994 9.03945 4.52994L4.02945 9.53994C3.88945 9.67994 3.68945 9.75994 3.49945 9.75994Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20.5 9.75977H3.5C3.09 9.75977 2.75 9.41977 2.75 9.00977C2.75 8.59977 3.09 8.25977 3.5 8.25977H20.5C20.91 8.25977 21.25 8.59977 21.25 9.00977C21.25 9.41977 20.91 9.75977 20.5 9.75977Z"
                      fill="currentColor"
                    />
                  </svg>
                </Box>

                <Typography component={"span"} className="title">
                  Indicators
                </Typography>
              </NavLink>
            </ListItem>
          </Collapse>
         

          <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"plreport"}
              className="sidebarList-menu"
            >
              <Box className="sidebarList-icon">
               
                  <div>
                    <img src={pl} alt="Logo" className="logoImage" style={{height:"20px",width:"20px"}} />
                 </div>
              </Box>

              <Typography component={"span"} className="title">
                P&L Report
              </Typography>
            </NavLink>
          </ListItem>

          <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"tutorial"}
              className="sidebarList-menu"
            >
              <Box className="sidebarList-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                    fill="currentColor"
                  />
                  <path
                    d="M10.7598 16.3698C10.3398 16.3698 9.94984 16.2698 9.59984 16.0698C8.79984 15.6098 8.33984 14.6698 8.33984 13.4798V10.5198C8.33984 9.33981 8.79984 8.3898 9.59984 7.9298C10.3998 7.4698 11.4398 7.53981 12.4698 8.13981L15.0398 9.6198C16.0598 10.2098 16.6498 11.0798 16.6498 11.9998C16.6498 12.9198 16.0598 13.7898 15.0398 14.3798L12.4698 15.8598C11.8898 16.1998 11.2998 16.3698 10.7598 16.3698ZM10.7698 9.12981C10.6098 9.12981 10.4698 9.1598 10.3598 9.2298C10.0398 9.4198 9.84984 9.88981 9.84984 10.5198V13.4798C9.84984 14.1098 10.0298 14.5798 10.3598 14.7698C10.6798 14.9598 11.1798 14.8798 11.7298 14.5598L14.2998 13.0798C14.8498 12.7598 15.1598 12.3698 15.1598 11.9998C15.1598 11.6298 14.8498 11.2298 14.2998 10.9198L11.7298 9.4398C11.3698 9.2298 11.0398 9.12981 10.7698 9.12981Z"
                    fill="currentColor"
                  />
                </svg>
              </Box>

              <Typography component={"span"} className="title">
                Tutorial
              </Typography>
            </NavLink>
          </ListItem>

          {profile[0]?.is_staff && (
            <ListItem className="sidebarList-item">
              <NavLink
                components={"a"}
                to={"admin?key=dashboard"}
                className="sidebarList-menu"
              >
                <Box className="sidebarList-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.1205 13.53C12.1005 13.53 12.0705 13.53 12.0505 13.53C12.0205 13.53 11.9805 13.53 11.9505 13.53C9.68047 13.46 7.98047 11.69 7.98047 9.50998C7.98047 7.28998 9.79047 5.47998 12.0105 5.47998C14.2305 5.47998 16.0405 7.28998 16.0405 9.50998C16.0305 11.7 14.3205 13.46 12.1505 13.53C12.1305 13.53 12.1305 13.53 12.1205 13.53ZM12.0005 6.96998C10.6005 6.96998 9.47047 8.10998 9.47047 9.49998C9.47047 10.87 10.5405 11.98 11.9005 12.03C11.9305 12.02 12.0305 12.02 12.1305 12.03C13.4705 11.96 14.5205 10.86 14.5305 9.49998C14.5305 8.10998 13.4005 6.96998 12.0005 6.96998Z"
                      fill="CurrentColor"
                    />
                    <path
                      d="M12.0008 22.7501C9.31081 22.7501 6.74081 21.7501 4.75081 19.9301C4.57081 19.7701 4.49081 19.5301 4.51081 19.3001C4.64081 18.1101 5.38081 17.0001 6.61081 16.1801C9.59081 14.2001 14.4208 14.2001 17.3908 16.1801C18.6208 17.0101 19.3608 18.1101 19.4908 19.3001C19.5208 19.5401 19.4308 19.7701 19.2508 19.9301C17.2608 21.7501 14.6908 22.7501 12.0008 22.7501ZM6.08081 19.1001C7.74081 20.4901 9.83081 21.2501 12.0008 21.2501C14.1708 21.2501 16.2608 20.4901 17.9208 19.1001C17.7408 18.4901 17.2608 17.9001 16.5508 17.4201C14.0908 15.7801 9.92081 15.7801 7.44081 17.4201C6.73081 17.9001 6.26081 18.4901 6.08081 19.1001Z"
                      fill="CurrentColor"
                    />
                    <path
                      d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
                      fill="CurrentColor"
                    />
                  </svg>
                </Box>

                <Typography component={"span"} className="title">
                  Admin
                </Typography>
              </NavLink>
            </ListItem>
          )}

          <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"contact"}
              className="sidebarList-menu"
            >
              <Box className="sidebarList-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.13 19.04 8 18.07 6.94 17.02C5.88 15.95 4.92 14.82 4.07 13.66C3.21 12.46 2.52 11.27 2.03 10.1C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.95 3.61 2.39 2.96 3 2.39C3.77 1.64 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.34 11.72 10.81 12.22 11.27 12.7C11.87 13.29 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.05 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75ZM5.59 2.75C5.04 2.75 4.53 2.99 4.04 3.47C3.59 3.9 3.26 4.37 3.06 4.88C2.85 5.4 2.75 5.95 2.75 6.54C2.75 7.47 2.97 8.48 3.41 9.52C3.86 10.58 4.49 11.68 5.29 12.78C6.09 13.88 7 14.95 8 15.96C9 16.95 10.08 17.87 11.19 18.68C12.27 19.47 13.38 20.11 14.48 20.57C16.19 21.3 17.79 21.47 19.11 20.92C19.62 20.71 20.07 20.39 20.48 19.93C20.71 19.68 20.89 19.41 21.04 19.09C21.16 18.84 21.22 18.58 21.22 18.32C21.22 18.16 21.19 18 21.11 17.82C21.09 17.77 21.02 17.65 20.83 17.52L17.51 15.16C17.31 15.02 17.13 14.92 16.96 14.85C16.7 14.75 16.53 14.74 16.31 14.88C16.11 14.98 15.93 15.13 15.73 15.33L14.97 16.08C14.58 16.46 13.98 16.55 13.52 16.38L13.25 16.26C12.84 16.04 12.36 15.7 11.83 15.25C11.34 14.84 10.84 14.37 10.2 13.74C9.7 13.23 9.22 12.7 8.71 12.12C8.24 11.57 7.9 11.1 7.69 10.71L7.56 10.41C7.5 10.19 7.48 10.06 7.48 9.92C7.48 9.56 7.61 9.24 7.86 8.99L8.61 8.21C8.81 8.01 8.96 7.82 9.06 7.65C9.14 7.52 9.17 7.41 9.17 7.31C9.17 7.23 9.14 7.11 9.09 6.99C9.03 6.82 8.92 6.65 8.78 6.45L6.46 3.17C6.36 3.03 6.24 2.93 6.09 2.86C5.93 2.79 5.76 2.75 5.59 2.75ZM13.95 15.01L13.79 15.69L14.06 14.99C14.02 14.98 13.98 14.99 13.95 15.01Z"
                    fill="currentColor"
                  />
                  <path
                    d="M20.5 6.75H15.5C15.09 6.75 14.75 6.41 14.75 6C14.75 5.59 15.09 5.25 15.5 5.25H20.5C20.91 5.25 21.25 5.59 21.25 6C21.25 6.41 20.91 6.75 20.5 6.75Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 9.25C17.59 9.25 17.25 8.91 17.25 8.5V3.5C17.25 3.09 17.59 2.75 18 2.75C18.41 2.75 18.75 3.09 18.75 3.5V8.5C18.75 8.91 18.41 9.25 18 9.25Z"
                    fill="currentColor"
                  />
                </svg>
              </Box>

              <Typography component={"span"} className="title">
                Contact Us
              </Typography>
            </NavLink>
          </ListItem>

          {/* <ListItem className="sidebarList-item">
            <NavLink
              components={"a"}
              to={"/"}
              className="sidebarList-menu"
              onClick={() => {
                localStorage.clear();
                window.location.replace("/");
              }}
            >
              <Box className="sidebarList-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 20.75H10C5.17 20.75 1.25 16.82 1.25 12C1.25 7.18 5.17 3.25 10 3.25H14C18.83 3.25 22.75 7.18 22.75 12C22.75 16.82 18.83 20.75 14 20.75ZM10 4.75C6 4.75 2.75 8 2.75 12C2.75 16 6 19.25 10 19.25H14C18 19.25 21.25 16 21.25 12C21.25 8 18 4.75 14 4.75H10Z"
                    fill="currentColor"
                  />
                  <path
                    d="M14 16.75C11.38 16.75 9.25 14.62 9.25 12C9.25 9.38 11.38 7.25 14 7.25C16.62 7.25 18.75 9.38 18.75 12C18.75 14.62 16.62 16.75 14 16.75ZM14 8.75C12.21 8.75 10.75 10.21 10.75 12C10.75 13.79 12.21 15.25 14 15.25C15.79 15.25 17.25 13.79 17.25 12C17.25 10.21 15.79 8.75 14 8.75Z"
                    fill="currentColor"
                  />
                </svg>
              </Box>

              <Typography component={"span"} className="title">
                Logout
              </Typography>
            </NavLink>
          </ListItem> */}
              <div className="rect">
                  <Typography>Dark Mode</Typography>
                <div class="toggle-switch">
                  <label class="switch-label">
                    <input type="checkbox" class="checkbox"></input>
                    <span class="slider"></span>
                  </label>
                </div>  
              </div>
        </List>
      </Box>
    </>
  );
}
