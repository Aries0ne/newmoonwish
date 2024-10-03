import React, { useEffect } from "react";
import ScannerComponent from "../../Components/ScannerComponent";
import { useDispatch, useSelector } from "react-redux";
import { signalDetails } from "../../redux/actions/positionAction";
import { useState } from "react";

const down = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L5 5L9 1"
      stroke="#FF231F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const up = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L5 1L9 5"
      stroke="#008F75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const col = [
  "Symbol Name",
  "Trend",
  "Entry Price",
  "Target",
  "Exchange",
  "Singal Type",
  "Quantity",
  "Strategy",
  "Strikeprice",
];
const rows = [
  {
    date: "CRUDEOILM23519FUT",
    day: <span className="down">{down}Sell</span>,
    open: 5866,
    high: 5732,
    low: 5902,
    close: <span className="down"> Square Off</span>,
    pl: "05-15-2023, 11:20:05 PM",
  },
  {
    date: "CRUDEOILM23519FUT",
    day: <span className="up">{up}Buy</span>,
    open: 5866,
    high: 5732,
    low: 5902,
    close: <span className="up"> Call Active</span>,
    pl: "05-15-2023, 11:20:05 PM",
  },
];

// Dropdown
const title = "Select Segment";
const drpValue = ["All", "NSE", "NFO", "CDS", "MCX"];

const title2 = "Select Strategy";
const drpValue2 = [
  "All",
  "RSI",
  "DCASH",
  "DEMSMIC",
  "Mooonwish",
  "RSIOPTION",
  "TRADE",
];

const title3 = "Select trade type";
const drpValue3 = ["BOTH", "BUY", "SELL"];

export default function Scanner() {
  const [segment, setSegment] = useState("All");
  const [strategy, setStrategy] = useState("All");
  const [type, setType] = useState("BOTH");
  const [signaldetails, setSignaldetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  const signals = useSelector((state) => state.Position.signaldetails);

  const handleSegment = (event) => {
    setSegment(event.target.value);
  };

  const handleStrategy = (event) => {
    setStrategy(event.target.value);
  };

  const handelType = (event) => {
    setType(event.target.value.toUpperCase());
  };

  const handleSubmit = () => {
    dispatch(
      signalDetails({
        segment: segment == "All" ? "select" : segment,
        strategy: strategy == "All" ? "select" : strategy,
        type,
      })
    );
  };

  useEffect(() => {
    handleSubmit();
  }, [type, strategy, segment]);

  const commonArrayFun = (signals = signals) => {
    let newArr = [];
    for (let index = 0; index < signals.length; index++) {
      const element = signals[index];
      newArr.push({
        symbol: element.symbol,
        side: (
          <span className={element.side == "BUY" ? "up" : "down"}>
            {element.side}
          </span>
        ),
        price: element.price,
        ret: element.ret,
        exchange: element.exchange,
        prctyp: element.prctyp,
        quantity: element.quantity,
        stratergy: element.stratergy,
        strikeprice: element.strikeprice,
      });
    }
    return newArr;
  };

  useEffect(() => {
    let newArr = commonArrayFun(signals);

    setSignaldetails(newArr);
  }, [signals]);

  const handleSearch = (event) => {
    if (event.target.value.length > 0) {
      let filterData = signals.filter((item) =>
        item.symbol.toLowerCase().includes(event.target.value.toLowerCase())
      );

      let newArr = commonArrayFun(filterData);

      setSignaldetails(newArr);
    } else {
      let newArr = commonArrayFun(signals);

      setSignaldetails(newArr);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <ScannerComponent
        down={down}
        up={up}
        col={col}
        rows={rows}
        title={title}
        drpValue={drpValue}
        title2={title2}
        drpValue2={drpValue2}
        title3={title3}
        drpValue3={drpValue3}
        handleSegment={handleSegment}
        handleStrategy={handleStrategy}
        handleType={handelType}
        handleSubmit={handleSubmit}
        signaldetails={signaldetails}
        type={type}
        strategy={strategy}
        segment={segment}
        handleSearch={handleSearch}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleChangePage={handleChangePage}
      />
    </>
  );
}
