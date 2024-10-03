import React, { useEffect } from "react";
import "./Header.scss";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Grid,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import logomob from "../../images/logomob.png";
import user from "../../images/user.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../redux/actions/authActions";
import { useState } from "react";
import noti from "../../images/noti.png";

// Dark/Ligth Mode
const light = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_682_4846)">
      <path
        d="M17.4492 8.25H14.3892C14.3308 7.83678 14.2228 7.43211 14.0675 7.04475L16.7127 5.51175C16.8011 5.46417 16.8791 5.39933 16.942 5.32107C17.0048 5.24281 17.0514 5.15272 17.0788 5.05614C17.1062 4.95956 17.114 4.85846 17.1016 4.75883C17.0892 4.6592 17.0569 4.56307 17.0067 4.47614C16.9565 4.38921 16.8893 4.31324 16.8092 4.25275C16.7291 4.19226 16.6376 4.14846 16.5403 4.12397C16.4429 4.09948 16.3416 4.09478 16.2424 4.11016C16.1432 4.12554 16.0481 4.16068 15.9627 4.2135L13.3152 5.74875C13.0621 5.42904 12.773 5.13962 12.4535 4.88625L13.988 2.238C14.0804 2.06629 14.1023 1.86534 14.049 1.67776C13.9958 1.49018 13.8715 1.33071 13.7027 1.23317C13.5339 1.13563 13.3337 1.10768 13.1446 1.15525C12.9555 1.20282 12.7923 1.32217 12.6897 1.488L11.1545 4.13175C10.7672 3.97629 10.3625 3.86826 9.94922 3.81V0.75C9.94922 0.551088 9.8702 0.360322 9.72955 0.21967C9.5889 0.0790176 9.39813 0 9.19922 0C9.00031 0 8.80954 0.0790176 8.66889 0.21967C8.52824 0.360322 8.44922 0.551088 8.44922 0.75V3.81C8.03596 3.86826 7.63127 3.97629 7.24397 4.13175L5.71097 1.4865C5.60838 1.32067 5.44524 1.20132 5.25613 1.15375C5.06703 1.10618 4.86683 1.13413 4.69799 1.23167C4.52914 1.32921 4.40493 1.48868 4.35167 1.67626C4.29842 1.86384 4.32031 2.06479 4.41272 2.2365L5.94722 4.88625C5.62773 5.13962 5.33856 5.42904 5.08547 5.74875L2.43797 4.2135C2.35259 4.16068 2.25748 4.12554 2.15827 4.11016C2.05906 4.09478 1.95777 4.09948 1.86041 4.12397C1.76304 4.14846 1.67159 4.19226 1.59147 4.25275C1.51134 4.31324 1.44418 4.38921 1.39396 4.47614C1.34374 4.56307 1.31148 4.6592 1.2991 4.75883C1.28673 4.85846 1.29447 4.95956 1.32189 5.05614C1.34931 5.15272 1.39584 5.24281 1.45872 5.32107C1.52161 5.39933 1.59956 5.46417 1.68797 5.51175L4.33097 7.04475C4.17568 7.43211 4.06765 7.83678 4.00922 8.25H0.949219C0.750306 8.25 0.559541 8.32902 0.418889 8.46967C0.278236 8.61032 0.199219 8.80109 0.199219 9C0.199219 9.19891 0.278236 9.38968 0.418889 9.53033C0.559541 9.67098 0.750306 9.75 0.949219 9.75H4.00922C4.06765 10.1632 4.17568 10.5679 4.33097 10.9553L1.68572 12.4882C1.59731 12.5358 1.51936 12.6007 1.45647 12.6789C1.39359 12.7572 1.34706 12.8473 1.31964 12.9439C1.29222 13.0404 1.28448 13.1415 1.29685 13.2412C1.30923 13.3408 1.34149 13.4369 1.39171 13.5239C1.44193 13.6108 1.50909 13.6868 1.58922 13.7473C1.66934 13.8077 1.76079 13.8515 1.85816 13.876C1.95552 13.9005 2.05681 13.9052 2.15602 13.8898C2.25523 13.8745 2.35034 13.8393 2.43572 13.7865L5.08322 12.2512C5.33631 12.571 5.62548 12.8604 5.94497 13.1138L4.41272 15.762C4.32031 15.9337 4.29842 16.1347 4.35167 16.3222C4.40493 16.5098 4.52914 16.6693 4.69799 16.7668C4.86683 16.8644 5.06703 16.8923 5.25613 16.8448C5.44524 16.7972 5.60838 16.6778 5.71097 16.512L7.24397 13.8668C7.63132 14.0224 8.03597 14.1309 8.44922 14.19V17.25C8.44922 17.4489 8.52824 17.6397 8.66889 17.7803C8.80954 17.921 9.00031 18 9.19922 18C9.39813 18 9.5889 17.921 9.72955 17.7803C9.8702 17.6397 9.94922 17.4489 9.94922 17.25V14.19C10.3624 14.1314 10.7671 14.0234 11.1545 13.8682L12.6875 16.5135C12.7901 16.6793 12.9532 16.7987 13.1423 16.8462C13.3314 16.8938 13.5316 16.8659 13.7004 16.7683C13.8693 16.6708 13.9935 16.5113 14.0468 16.3237C14.1 16.1362 14.0781 15.9352 13.9857 15.7635L12.4512 13.1152C12.7707 12.8619 13.0599 12.5725 13.313 12.2527L15.9605 13.788C16.0458 13.8408 16.141 13.876 16.2402 13.8913C16.3394 13.9067 16.4407 13.902 16.538 13.8775C16.6354 13.853 16.7268 13.8092 16.807 13.7488C16.8871 13.6883 16.9543 13.6123 17.0045 13.5254C17.0547 13.4384 17.087 13.3423 17.0993 13.2427C17.1117 13.143 17.104 13.0419 17.0765 12.9454C17.0491 12.8488 17.0026 12.7587 16.9397 12.6804C16.8768 12.6022 16.7989 12.5373 16.7105 12.4897L14.0652 10.9568C14.2214 10.569 14.3302 10.1638 14.3892 9.75H17.4492C17.6481 9.75 17.8389 9.67098 17.9795 9.53033C18.1202 9.38968 18.1992 9.19891 18.1992 9C18.1992 8.80109 18.1202 8.61032 17.9795 8.46967C17.8389 8.32902 17.6481 8.25 17.4492 8.25ZM9.19922 12.75C4.24322 12.5925 4.24472 5.40675 9.19922 5.25C14.1552 5.4075 14.1537 12.5932 9.19922 12.75Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_682_4846">
        <rect
          width="18"
          height="18"
          fill="white"
          transform="translate(0.199219)"
        />
      </clipPath>
    </defs>
  </svg>
);

const dark = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_331_3459)">
      <path
        d="M11.4498 17.9998C10.1894 17.9989 8.94328 17.7337 7.79174 17.2213C6.64019 16.709 5.60887 15.9609 4.76432 15.0253C3.9134 14.0887 3.27138 12.9818 2.88088 11.7781C2.49038 10.5744 2.36032 9.30138 2.49932 8.04357C2.72342 6.08608 3.57737 4.25437 4.93259 2.82421C6.28782 1.39405 8.07096 0.44285 10.0136 0.113821C11.2694 -0.0801479 12.5509 -0.0279277 13.7868 0.267571C14.1104 0.350715 14.406 0.518824 14.6428 0.754502C14.8796 0.99018 15.0492 1.28486 15.1339 1.60806C15.2187 1.93126 15.2155 2.27123 15.1248 2.5928C15.034 2.91437 14.859 3.20584 14.6178 3.43707C11.1978 6.56157 11.4948 11.4201 15.2231 14.2446C15.4867 14.4515 15.69 14.7252 15.8119 15.0374C15.9339 15.3495 15.9699 15.6886 15.9163 16.0194C15.8627 16.3502 15.7214 16.6606 15.5072 16.9183C15.2929 17.176 15.0135 17.3715 14.6981 17.4846C13.6494 17.8272 12.553 18.0011 11.4498 17.9998V17.9998ZM11.5068 1.49982C11.0857 1.49881 10.6652 1.53066 10.2491 1.59507C8.63171 1.86861 7.14697 2.6601 6.01833 3.85042C4.88969 5.04074 4.17824 6.56546 3.99107 8.19507C3.87407 9.2451 3.9819 10.308 4.30738 11.3132C4.63286 12.3183 5.16854 13.2427 5.87882 14.0248C6.91857 15.1346 8.25803 15.9187 9.7347 16.2822C11.2114 16.6456 12.7618 16.5727 14.1978 16.0723C14.2597 16.0491 14.3144 16.01 14.3563 15.9589C14.3982 15.9077 14.4258 15.8464 14.4364 15.7812C14.447 15.7159 14.4402 15.6491 14.4166 15.5873C14.393 15.5256 14.3535 15.4711 14.3021 15.4296C9.85532 12.0711 9.50207 6.06507 13.5911 2.34282C13.638 2.29926 13.6718 2.24347 13.6888 2.18173C13.7058 2.11999 13.7052 2.05474 13.6871 1.99332C13.6715 1.92813 13.6384 1.86845 13.5913 1.82073C13.5443 1.77301 13.485 1.73906 13.4201 1.72257C12.7936 1.57147 12.1512 1.49667 11.5068 1.49982V1.49982Z"
        fill="#131722"
      />
    </g>
    <defs>
      <clipPath id="clip0_331_3459">
        <rect
          width="18"
          height="18"
          fill="white"
          transform="translate(0.200195)"
        />
      </clipPath>
    </defs>
  </svg>
);

const check = (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.0002 25.6668C17.2218 25.6668 20.1385 24.361 22.2497 22.2497C24.361 20.1385 25.6668 17.2218 25.6668 14.0002C25.6668 10.7785 24.361 7.86186 22.2497 5.75058C20.1385 3.63933 17.2218 2.3335 14.0002 2.3335C10.7785 2.3335 7.86186 3.63933 5.75058 5.75058C3.63933 7.86186 2.3335 10.7785 2.3335 14.0002C2.3335 17.2218 3.63933 20.1385 5.75058 22.2497C7.86186 24.361 10.7785 25.6668 14.0002 25.6668Z"
      fill="#F5F5F5"
      stroke="#4F4F4F"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M9.3335 14L12.8335 17.5L19.8335 10.5"
      stroke="#4F4F4F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default function Header(props) {
  const [Dropdown, setDropdown] = useState(null);
  const [Dropdown2, setDropdown2] = useState(null);
  const [Dropdown3, setDropdown3] = React.useState(null);
  const [modeHandler, setmodeHandler] = useState(light);
  const [profileData, setProfileData] = useState();
  const theme = document.querySelector("html");
  const open = Boolean(Dropdown);
  const open2 = Boolean(Dropdown2);
  const open3 = Boolean(Dropdown3);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const brokerStatus = useSelector((state) => state.Broker.brokerstatus);
  const profile = useSelector((state) => state.Auth.authProfile);
  const overAllPL = useSelector(
    (State) => State?.CommonReducer?.overAllProfitLoss
  );

  const status =
    brokerStatus?.length > 0 &&
    brokerStatus.map((e) => {
      return e.brokerlogin;
    });

  const handleClick = (event) => {
    setDropdown(event.currentTarget);
  };
  const handleClose = () => {
    // setDropdown(null);
    localStorage.removeItem("token");
    localStorage.removeItem("phone");
    window.location.replace("/");
  };

  const closeDropDown = () => {
    setDropdown(null);
  };
  const handleProfile = () => {
    setDropdown(null);
  };

  const handleClicklanguage = (event) => {
    setDropdown3(event.currentTarget);
  };
  const handleCloselanguage = () => {
    setDropdown3(null);
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (profile && profile.length > 0) {
      setProfileData(profile[0]);
    }
  }, [profile]);

  const handleClicknoti = (event) => {
    setDropdown2(event.currentTarget);
  };
  const handleClosenoti = () => {
    setDropdown2(null);
  };

  useEffect(() => {
    let mode = localStorage.getItem("mode");
    if (!mode) {
      theme.setAttribute("data-theme", "light");
      localStorage.setItem("mode", "light");
    } else if (mode === "light") {
      theme.setAttribute("data-theme", "light");
      localStorage.setItem("mode", "light");
    } else {
      theme.setAttribute("data-theme", "dark");
      localStorage.setItem("mode", "dark");
    }
  }, []);

  let mode = localStorage.getItem("mode");
  const modeChange = (e) => {
    if (mode === "light") {
      theme.setAttribute("data-theme", "dark");
      localStorage.setItem("mode", "dark");
      setmodeHandler(light);
    } else {
      theme.setAttribute("data-theme", "light");
      localStorage.setItem("mode", "light");
      setmodeHandler(dark);
    }
  };

  const modes = (
    <Typography component={"p"} sx={{ fontSize: "1.4rem" }}>
      {mode == "light" ? "DarkMode" : "Light Mode"}
    </Typography>
  );

  const langTooltip = (
    <Typography component={"p"} sx={{ fontSize: "1.4rem" }}>
      Language
    </Typography>
  );

  const Notification = (
    <Typography component={"p"} sx={{ fontSize: "1.4rem" }}>
      Notification
    </Typography>
  );

  let notification = [];
  for (let i = 0; i < 10; i++) {
    notification.push(
      <Box className="NotifyBox" key={i}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box className="notifyCheck">{check}</Box>
          <Box className="notiFy">
            <Typography component={"h4"}>Notification title</Typography>
            <Typography component={"p"}>
              Are you sure you want to accept this?
            </Typography>
          </Box>
        </Box>
        <Box className="nofityAction">
          <Button className="del">{/* <img src={del} /> */}</Button>
        </Box>
      </Box>
    );
  }

  const up = (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666525 5.52859H8.11452C8.24636 5.52857 8.37522 5.48945 8.48483 5.4162C8.59444 5.34294 8.67986 5.23883 8.73031 5.11703C8.78076 4.99523 8.79396 4.86121 8.76825 4.73191C8.74253 4.60261 8.67906 4.48383 8.58586 4.3906L4.86186 0.666604C4.73684 0.541624 4.5673 0.471413 4.39052 0.471413C4.21375 0.471413 4.04421 0.541624 3.91919 0.666604L0.195191 4.3906C0.101985 4.48383 0.038514 4.60261 0.0128023 4.73191C-0.0129094 4.86121 0.000292748 4.99523 0.0507394 5.11703C0.101186 5.23883 0.186612 5.34294 0.296219 5.4162C0.405826 5.48945 0.534691 5.52857 0.666525 5.52859Z"
        fill="currentColor"
      />
    </svg>
  );

  const down = (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.11111 0.0195815L0.666322 0.238393C0.534546 0.242294 0.406885 0.285178 0.299478 0.361622C0.192071 0.438067 0.10974 0.54464 0.0628934 0.667869C0.0160469 0.791099 0.00678827 0.92545 0.0362869 1.05394C0.0657865 1.18243 0.13272 1.29929 0.228626 1.38975L4.06042 5.00273C4.18906 5.12398 4.36059 5.18918 4.53729 5.18399C4.71399 5.17879 4.88139 5.10363 5.00268 4.97503L8.61567 1.14324C8.7061 1.04731 8.76605 0.92672 8.78795 0.796718C8.80985 0.666717 8.79272 0.533141 8.73872 0.412876C8.68471 0.292611 8.59627 0.191057 8.48455 0.121053C8.37284 0.0510482 8.24288 0.0157366 8.11111 0.0195815Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <>
      <Box
        className="unLayer"
        onClick={props.openMenu}
        sx={{ left: props.layer }}
      ></Box>
      <Box component={"header"} sx={{marginLeft:"200px"}}>
        <Grid container spacing={0} alignItems={"center"} >
          <Grid item xs={3} sx={{ paddingTop: "0rem 0rem !important" }}>
            <Box
              sx={{
                display: { xs: "flex" },
                alignItems: { xs: "center" },
                padding: "0 1rem",
                
              }}
            >
              {/* <Box component={"a"} href="/" className="ap-logo">
                <img
                  src={logomob}
                  alt={"Logo"}
                  loading="lazy"
                  height={"100%"}
                  width={"100%"}
                />
              </Box> */}
              {status == "true" ? (
                <NavLink to={"/broker"} className="brokerStatus-green">
                  Broker Online
                </NavLink>
              ) : (
                <NavLink to={"/broker"} className="brokerStatus">
                  Broker Offline
                </NavLink>
              )}
            </Box>
          </Grid>

          <Grid item xs={9} sx={{ paddingTop: "0rem 0rem !important" }}>
            <Box
              sx={{
                display: { xs: "flex" },
                alignItems: { xs: "center" },
                justifyContent: { xs: "end" },
              }}
            >
              {/* <Divider
                orientation="vertical"
                flexItem
                sx={{
                  margin: "0 0.5rem",
                  display: { xs: "none", lg: "block" },
                }}
              />
              <Box sx={{ display: "block" }}>
                <Box className="plan_statusexpiry">
                  <Typography component={"span"}>Plan Status :</Typography>
                  <Box className="status">
                    <Typography component={"p"}>Subscription </Typography>
                    <Box component={"div"} className="status_type active"></Box>
                    <Typography component={"span"}>(Basic)</Typography>
                  </Box>
                </Box>
                <Box className="plan_statusexpiry">
                  <Typography component={"span"}>Plan Expiry :</Typography>
                  <Box className="status">
                    <Typography component={"p"}>24-Dec-2023</Typography>
                    <Typography component={"span"}>(191 Day Left)</Typography>
                  </Box>
                </Box>
              </Box> */}
              {/* <Divider
                orientation="vertical"
                flexItem
                sx={{
                  margin: "0 0.5rem",
                  display: { xs: "none", lg: "block" },
                }}
              /> */}
              {/* <Box className="dayGainLoss" sx={{ textAlign: "center" }}>
                <Typography component={"span"}>Day Gain/Loss</Typography>
                <Box sx={{ display: "flex" }}>
                  <Box
                    className={
                      Number(overAllPL?.live) > 0 ? "status up" : "status down"
                    }
                  >
                    Live {Number(overAllPL?.live).toFixed(2)}
                    {Number(overAllPL?.live) > 0 ? up : down}
                  </Box>
                  <Box
                    className={
                      Number(overAllPL?.paper) > 0 ? "status up" : "status down"
                    }
                  >
                    Paper {Number(overAllPL?.paper).toFixed(2)}
                    {Number(overAllPL?.paper) > 0 ? up : down}
                  </Box>
                </Box>
              </Box> */}

              {/* <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: "0 0.5rem" }}
              /> */}







{/*          important for dark mode   

              <Tooltip title={modes} arrow>
                <Button
                  className="headerButtons"
                  id="modeChanger"
                  onClick={modeChange}
                >
                  {modeHandler}
                </Button>
              </Tooltip> */}


              {/* <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: "0 0.5rem" }}
              /> */}












              {/* Notification */}
              <Tooltip title={Notification} arrow>
                <Button
                  id="long-button2"
                  className="headerButtons notifcation"
                  onClick={handleClicknoti}
                >
               
                  <img src={noti} alt="Logo" className="headImage" />
                  
                    <g clipPath="url(#clip0_682_4849)">
                      <path
                        d="M17.1153 10.2465L15.6903 5.11951C15.2727 3.61751 14.3649 2.29823 13.1113 1.37136C11.8578 0.444502 10.3304 -0.0367482 8.77193 0.00411186C7.21347 0.0449719 5.71339 0.605597 4.51013 1.59687C3.30687 2.58815 2.46949 3.95319 2.13108 5.47501L1.02783 10.4363C0.90597 10.9845 0.908787 11.553 1.03608 12.1C1.16337 12.647 1.41188 13.1584 1.76327 13.5964C2.11466 14.0345 2.55995 14.388 3.06627 14.631C3.57258 14.8739 4.127 15 4.68858 15H5.52408C5.69622 15.8477 6.15613 16.6099 6.82589 17.1573C7.49565 17.7047 8.33407 18.0038 9.19908 18.0038C10.0641 18.0038 10.9025 17.7047 11.5723 17.1573C12.242 16.6099 12.7019 15.8477 12.8741 15H13.5026C14.0807 15.0001 14.651 14.8664 15.1689 14.6096C15.6868 14.3527 16.1383 13.9796 16.4882 13.5194C16.8381 13.0592 17.0768 12.5243 17.1857 11.9565C17.2946 11.3888 17.2708 10.8035 17.1161 10.2465H17.1153ZM9.19908 16.5C8.73539 16.4981 8.28361 16.3529 7.90556 16.0844C7.52751 15.8159 7.24165 15.4372 7.08708 15H11.3111C11.1565 15.4372 10.8707 15.8159 10.4926 16.0844C10.1146 16.3529 9.66278 16.4981 9.19908 16.5ZM15.2936 12.6113C15.0846 12.8885 14.8138 13.1132 14.5028 13.2675C14.1918 13.4218 13.849 13.5014 13.5018 13.5H4.68858C4.35167 13.5 4.01907 13.4242 3.71534 13.2784C3.4116 13.1327 3.14449 12.9205 2.9337 12.6577C2.72292 12.3949 2.57385 12.088 2.4975 11.7599C2.42116 11.4317 2.41947 11.0906 2.49258 10.7618L3.59508 5.79976C3.86085 4.60442 4.51856 3.53221 5.46368 2.7536C6.40879 1.97498 7.58705 1.53464 8.81116 1.50257C10.0353 1.4705 11.235 1.84855 12.2196 2.57661C13.2041 3.30468 13.9171 4.34097 14.2451 5.52076L15.6701 10.6478C15.7642 10.9818 15.7792 11.3332 15.7139 11.674C15.6485 12.0148 15.5046 12.3358 15.2936 12.6113Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_682_4849">
                        <rect
                          width="18"
                          height="18"
                          fill="white"
                          transform="translate(0.199219)"
                        />
                      </clipPath>
                    </defs>
                
                </Button>
              </Tooltip>
              <Menu
                anchorEl={Dropdown2}
                open={open2}
                onClose={handleClosenoti}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    maxWidth: "50rem",
                    maxHeight: "100% !important",
                    "& > ul": { padding: 0 },
                  },
                }}
              >
                <Box className="notifyModal">
                  <Box
                    className="notifyHeader"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography component={"h3"}>Notifications</Typography>
                    <Box>
                      <Button className="clear">Clear</Button>
                    </Box>
                  </Box>
                  <Box className="notifyBody">{notification}</Box>
                </Box>
              </Menu>

              {/* <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: "0 0.5rem" }}
              /> */}
              {/* <Tooltip title={langTooltip} arrow>
                <Button className="headerButtons" onClick={handleClicklanguage}>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_63_1446)">
                      <path
                        d="M25 2.5H11.6666V6.66667H13.3333V4.16667H25C25.5 4.16667 25.8333 4.5 25.8333 5V14.1667C25.8333 14.6667 25.5 15 25 15H14.1666V20.8333H9.74996L6.66663 23.25V20.8333H4.16663C3.66663 20.8333 3.33329 20.5 3.33329 20V10.8333C3.33329 10.3333 3.66663 10 4.16663 10H15V8.33333H4.16663C2.74996 8.33333 1.66663 9.41667 1.66663 10.8333V20C1.66663 21.4167 2.74996 22.5 4.16663 22.5H4.99996V26.75L10.25 22.5H15.8333V16.6667H25C26.4166 16.6667 27.5 15.5833 27.5 14.1667V5C27.5 3.58333 26.4166 2.5 25 2.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M5.16663 19.0833H7.16663L7.66663 17.75H10.25L10.75 19.0833H12.75L9.91663 11.6667H7.91663L5.16663 19.0833ZM8.91663 13.75L9.74996 16.3333H8.08329L8.91663 13.75Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16.6666 14.1667C17.5833 14.1667 18.8333 13.9167 20 13.3333C21.1666 13.9167 22.5 14.1667 23.3333 14.1667V12.5C23.3333 12.5 22.5 12.5 21.5833 12.1667C22.5833 11.1667 23.3333 9.66667 23.3333 7.5V6.66667H20.8333V5H19.1666V6.66667H16.6666V8.33333H21.5833C21.4166 9.83333 20.75 10.75 20 11.3333C19.5 10.9167 19 10.3333 18.6666 9.58333H16.9166C17.25 10.6667 17.75 11.5 18.4166 12.1667C17.5833 12.5 16.8333 12.5 16.6666 12.5V14.1667Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_63_1446">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
              </Tooltip> */}
              <Menu
                anchorEl={Dropdown3}
                open={open3}
                onClose={handleCloselanguage}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.15))",
                    mt: 1.5,
                    "& > ul": { padding: 0 },
                    maxWidth: "20rem",
                    width: "20rem",
                  },
                }}
              >
                <MenuItem>English</MenuItem>
                <MenuItem>Hindi</MenuItem>
                <MenuItem>Gujrati</MenuItem>
                <MenuItem>Marathi</MenuItem>
              </Menu>
              <Divider
                orientation="vertical"
                className="humburgarDivider"
                flexItem
                sx={{ margin: "0 0.5rem" }}
              />
              <Button className="headerButtons humburgar">
                <MenuOpenRoundedIcon
                  sx={{ fontSize: "2.6rem" }}
                  onClick={props.openMenu}
                />
              </Button>
              {/* <Divider
                orientation="vertical"
                flexItem
                sx={{ margin: "0 0.5rem" }}
              /> */}
              <Button onClick={handleClick} className="userMenu">
                <Avatar src={user} sx={{ height: "3.6rem", width: "3.6rem	" }} />
                <ArrowDropDownRoundedIcon
                  className="userDrp"
                  sx={{ display: { xs: "none", md: "block" } }}
                />
              </Button>
              <Menu
                anchorEl={Dropdown}
                open={open}
                onClose={closeDropDown}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 5px rgba(0,0,0,0.15))",
                    mt: 1.5,
                    "& > ul": { padding: 0 },
                    maxWidth: "28rem",
                    width: "28rem",
                  },
                }}
              >
                <MenuItem>
                  <NavLink
                    to={"userprofilesetting"}
                    onClick={handleProfile}
                    className={"navMenu-item, userMenu"}
                  >
                    <Box className="userName">
                      {profileData?.firstname?.charAt(0).toUpperCase()}
                    </Box>
                    <Box className="userFullname">
                      <Typography component={"h5"}>
                        {profileData?.firstname + " " + profileData?.lastname}
                      </Typography>
                      <Typography component={"p"}>
                        {profileData?.email}
                      </Typography>
                    </Box>
                  </NavLink>
                </MenuItem>
                <MenuItem sx={{ padding: 0 }}>
                  <NavLink
                    to={"profile"}
                    onClick={handleProfile}
                    className={"navMenu-item"}
                  >
                    About
                  </NavLink>
                </MenuItem>
                <MenuItem sx={{ padding: 0 }}>
                  <NavLink onClick={handleClose} className={"navMenu-item"}>
                    Log Out
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
