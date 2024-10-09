import Admin from "../Inauth/Admin/Admin";
import Brokerlogin from "../Inauth/Brokerlogin/Brokerlogin";
import Contact from "../Inauth/Contact/Contact";
import Dashboard from "../Inauth/Dashboard/Dashboard";
import Home from "../Inauth/Home/Home";
import Opendemat from "../Inauth/Opendemat/Opendemat";
import Orderhistory from "../Inauth/Orderhistory/Orderhistory";
import Planpricing from "../Inauth/Planpricing/Planpricing";
import Plreport from "../Inauth/Plreport/Plreport";
import Position from "../Inauth/Position/Position";
import Profile from "../Inauth/Profile/Profile";
import Scanner from "../Inauth/Scanner/Scanner";
import Strategy from "../Inauth/Strategy/Strategy";
import Tutorial from "../Inauth/Tutorial/Tutorial";
import Alert from "../Inauth/Admin/Alert/Alert";
import Alert1 from "../Inauth/Admin/Alert/newalert";
import Indicators from "../Inauth/Admin/Indicators/Indicators";
import IndexFuture from "../Inauth/Admin/Strategy/Strategyalert/Strategyalert";
import CardDetails from "../Inauth/CardDetails/CardDetails";
import Userprofilesetting from "../Inauth/Userprofilesetting/Userprofilesetting";
import TradeDetails from "../Inauth/TradeDetails/TradeDetails";
import Marketwatch from "../Inauth/Marketwatch/Marketwatch";
import Portfolio from "../Inauth/Portfolio/Portfolio";
import Strategybuilder from "../Inauth/Admin/Strategy/Strategybuilder/Strategybuilder";
import Ath from "../Inauth/Ath/Ath";
import AthDetails from "../Inauth/Ath/AthDetails/AthDetails";
import Indicators2 from "../Inauth/Admin/Indicators/Indicators2";
import Strategyoverview from "../Inauth/Admin/Strategy/Strategyoverview/Strategyoverview";
import Strategys from "../Inauth/Strategys/Strategys";
import IndicatorBacktest from "../Inauth/Indicators/IndicatorBacktest";
import Strategyview from "../Inauth/Strategyview/Strategyview";
import Marketwatch1 from "../Inauth/Marketwatch/Marketwatch1";
import AlertComponent from "../Inauth/Admin/Alert/newalert";

const PublicRoutes = [
  {
    index: "1",
    path: "/",
    Component: <Home />,
  },
  {
    index: "2",
    path: "/dashboard",
    Component: <Dashboard />,
  },
  {
    index: "3",
    path: "/broker",
    Component: <Brokerlogin />,
  },
  {
    index: "4",
    path: "/strategy",
    Component: <Strategy />,
  },
  {
    index: "5",
    path: "/scanner",
    Component: <Scanner />,
  },
  {
    index: "6",
    path: "/position",
    Component: <Position />,
  },
  {
    index: "7",
    path: "/orderhistory",
    Component: <Orderhistory />,
  },
  {
    index: "8",
    path: "/opendemat",
    Component: <Opendemat />,
  },
  {
    index: "9",
    path: "/plreport",
    Component: <Plreport />,
  },
  {
    index: "10",
    path: "/planpricing",
    Component: <Planpricing />,
  },
  {
    index: "11",
    path: "/tutorial",
    Component: <Tutorial />,
  },
  {
    index: "12",
    path: "/contact",
    Component: <Contact />,
  },
  {
    index: "13",
    path: "/admin",
    Component: <Admin />,
  },
  {
    index: "14",
    path: "/profile",
    Component: <Profile />,
  },
  {
    index: "15",
    path: "/newalert",
    Component: <Alert />,
  },

  {
    index: "15",
    path: "/alert1",
    Component: <AlertComponent />,
  },
  {
    index: "16",
    path: "/indicators",
    Component: <Indicators2 />,
  },
  {
    index: "16",
    path: "/indexfutures",
    Component: <IndexFuture />,
  },
  {
    index: "16",
    path: "/cardDetails",
    Component: <CardDetails />,
  },
  {
    index: "17",
    path: "/userprofilesetting",
    Component: <Userprofilesetting />,
  },
  {
    index: "17",
    path: "/tradeDetails",
    Component: <TradeDetails />,
  },
  {
    index: "18",
    path: "/marketwatch",
    Component: <Marketwatch />,
  },
  {
    index: "18",
    path: "/marketwatch1",
    Component: <Marketwatch1 />,
  },
  {
    index: "18",
    path: "/portfolio",
    Component: <Portfolio />,
  },
  {
    index: "19",
    path: "/strategybuilder",
    Component: <Strategybuilder />,
  },
  {
    index: "19",
    path: "/ath",
    Component: <Ath />,
  },
  {
    index: "19",
    path: "/athdetails",
    Component: <AthDetails />,
  },

  {
    index: "20",
    path: "/Strategyoverview",
    Component: <Strategyoverview />,
  },
  {
    index: "26",
    path: "/strategysbacktest",
    Component: <Strategys />,
  },
  {
    index: "27",
    path: "/indicatorbacktest",
    Component: <IndicatorBacktest />,
  },
  {
    index: "28",
    path: "/Strategyview",
    Component: <Strategyview />,
  },
];

export default PublicRoutes;
