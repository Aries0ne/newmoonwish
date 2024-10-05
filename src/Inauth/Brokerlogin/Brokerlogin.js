import React, { useEffect } from "react";
import "./Brokerlogin.scss";
import BrokerComponent from "../../Components/BrokerComponent";
import broker1 from "../../images/aliceblue.png";
import broker2 from "../../images/zebull.png";
import broker3 from "../../images/paisa.png";
import broker4 from "../../images/anglebroking.png";
import broker5 from "../../images/finvasia.png";
import broker6 from "../../images/icici.png";
import broker7 from "../../images/kotak.png";
import broker8 from "../../images/motialoswal.png";
import broker9 from "../../images/swastika.png";
import broker10 from "../../images/zerodha.png";
import broker11 from "../../images/fyers.png";
import sharekhan from "../../images/sharekhan.png";
import { useDispatch, useSelector } from "react-redux";
import { BrokerStatus } from "../../redux/actions/brokerAction";
import { useNavigate } from "react-router";

export default function Brokerlogin() {
  const dispatch = useDispatch();

  let brokers = [
    // "aliceblue",
    // "zebull",
    "zerodha",
    // "icici",
    // "5Paisa",
    // "Angel Broking",
    // "Finvasia",
    // "Kotak Mahindra",
    // "Motilal Oswal",
    // "Swastika",
    // "Fyers",
    "sharekhan",
  ];

  let broker = [
    // {
    //   img: broker1,
    //   name: "aliceblue",
    //   id: 1,
    // },
    // {
    //   img: broker2,
    //   name: "zebull",
    //   id: 2,
    // },
    // {
    //   img: broker3,
    //   name: "5Paisa",
    //   id: 3,
    // },
    // {
    //   img: broker4,
    //   name: "Angel Broking",
    //   id: 4,
    // },
    // {
    //   img: broker5,
    //   name: "Finvasia",
    //   id: 5,
    // },
    // {
    //   img: broker6,
    //   name: "icici",
    //   id: 6,
    // },
    // {
    //   img: broker7,
    //   name: "Kotak Mahindra",
    //   id: 7,
    // },
    // {
    //   img: broker8,
    //   name: "Motilal Oswal",
    //   id: 8,
    // },
    // {
    //   img: broker9,
    //   name: "Swastika",
    //   id: 9,
    // },
    {
      img: broker10,
      name: "Zerodha",
      id: 10,
      desc:"Total 52 items sdsdv efgev evv eveve bebebeb evew vevev ervev ervberve erverv revev ervev reve veve vrevrev"
    },
    // {
    //   img: broker11,
    //   name: "Fyers",
    //   id: 11,
    // },
    {
      img: sharekhan,
      name: "Sharekhan",
      id: 12,
      desc:"Total 52 items sdsdv efgev evv eveve bebebeb evew vevev ervev ervberve erverv revev ervev reve veve vrevrev"

    },
  ];

  const brokerStatus = useSelector((state) => state.Broker.brokerstatus);

  useEffect(() => {
    dispatch(BrokerStatus());
  }, []);

  return (
    <>
      <BrokerComponent
        brokers={brokers}
        broker={broker}
        brokerStatus={brokerStatus}
      />
    </>
  );
}
