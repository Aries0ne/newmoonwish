import { Box, Button, Grid, Tooltip, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import jsPDF from "jspdf";
import React, { useState } from "react";
import Dropdown from "../Inauth/Dropdown/Dropdown";
import "../Inauth/Plreport/Plreport.scss";
import Table from "../Inauth/Table/Table";
import { red } from "@mui/material/colors";
import dayjs from "dayjs";
import { generatePopup } from "../utils/popup";

const PlReportComponent = (props) => {
  const [selectedSegment, setSelectedSegment] = useState("NSE");
  const [selectTradeType, setSelectTradeType] = useState("Live");
  const [orderType, setOrderType] = useState("Intraday");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  let segmentList = ["NSE", "NFO", "CDS", "MCX", "BSE"];

  const tradeTypeList = ["Paper", "Live"];
  const col = [
    "Symbol Name",
    "Exchange",
    "Order type",
    "Buy QTY",
    "Sell QTY",
    "Entry Price",
    "Exit Price",
    "LTP",
    "Trade Type",
    "Strategy Name",
    "Date/Time",
    "P&L",
  ];
  const rows = [
    {
      SymbolName: "BANKNIFTY2310542900PE",
      Exchange: "NFO",
      Ordertype: "MIS",
      BuyQTY: 150,
      SellQTY: 150,
      EntryPrice: 208.44,
      ExitPrice: 210.93,
      LTP: 210.93,
      TradeType: "Bankniftyoption",
      StrategyName: "Testing",
      DateTime: "15-05-2023 / 14:21:11:8",
      // pl: <span className='close'> - 373.5</span>,
      pl: -373,
    },
    {
      SymbolName: "BANKNIFTY2310542900PE",
      Exchange: "NFO",
      Ordertype: "MIS",
      BuyQTY: 150,
      SellQTY: 150,
      EntryPrice: 208.44,
      ExitPrice: 210.93,
      LTP: 210.93,
      TradeType: "Bankniftyoption",
      StrategyName: "Testing",
      DateTime: "15-05-2023 / 14:21:11:8",
      // pl: <span className='open'> + 205</span>,
      pl: 205,
    },
  ];

  const orderTypeList = ["Intraday", "Positional"];

  const handleSegment = (e) => {
    setSelectedSegment(e.target.value);
  };

  const handleTradeType = (e) => {
    setSelectTradeType(e.target.value);
  };

  const handleOrderType = (e) => {
    setOrderType(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownload = () => {
    if (!fromDate) {
      generatePopup("error", "Please enter start date");
      return;
    } else if (!toDate) {
      generatePopup("error", "Please enter end Date");
      return;
    } else if (!selectTradeType) {
      generatePopup("error", "Please select trade type");
      return;
    } else if (!selectedSegment) {
      generatePopup("error", "Please select segment");
      return;
    } else if (!orderType) {
      generatePopup("error", "Please select order type");
      return;
    }

    const startX = 15;
    const startY = 30;
    const pageWidth = 510;
    const pageHeight = 200;
    const doc = new jsPDF({
      orientation: "landscape",
      format: [pageWidth, pageHeight],
    });

    const fontSize = 16;
    const fontName = "Times-New-Roman";

    doc.addFont("Times-New-Roman", "normal");
    doc.addFont("Times-New-Roman", "bold");
    doc.addFont("Times-New-Roman", "light");

    doc.setFont(fontName, "bold");
    doc.setTextColor(119, 221, 119);
    doc.setFontSize(20);

    let text = "Profit & Loss Statement";
    let textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;

    let horizontalPosition = (pageWidth - textWidth) / 2;
    doc.text(text, horizontalPosition, startY);

    doc.setFont(fontName, "light");
    doc.setTextColor(79, 79, 79);
    doc.setFontSize(12);

    const firstTextY = startY + 20;
    const diff = 7;

    const headers = col;
    let sumProfit = 0;
    const table = rows.map((row, index) => {
      const profit = row.pl;
      sumProfit += profit;
      const isNegative = profit < 0;

      // Style for red (negative) or green (positive) cells
      const cellStyles = {
        textColor: isNegative ? [255, 0, 0] : [1, 135, 73],
      };

      const rowKeys = Object.keys(row);
      const rowWithStyles = headers.map((header, index) => {
        const data = row[rowKeys[index]];
        let cellContent = data || "";

        if (header === "P&L" && data > 0) {
          cellContent = `+${data.toFixed(2)}`;
        } else {
          cellContent = data;
        }

        if (typeof cellContent === "number") {
          cellContent = cellContent.toFixed(2);
        }

        return {
          content: String(cellContent),
          styles: header === "P&L" ? cellStyles : {},
        };
      });

      // const backgroundColor = index % 2 === 0 ? [224, 224, 224] : [242, 242, 242];

      return rowWithStyles;
    });

    text = "Profit/Loss : ";

    const formattedFromDate = dayjs(fromDate).format("DD-MM-YYYY");
    const formattedToDate = dayjs(toDate).format("DD-MM-YYYY");

    doc.text("Broker Client Id : DELB13505", startX, firstTextY);
    doc.text("Client Name : Ankit Bhasker", startX, firstTextY + diff);
    doc.text(
      `Date : ${formattedFromDate} To ${formattedToDate}`,
      startX,
      firstTextY + diff * 2
    );
    doc.text(`Segment : ${selectedSegment}`, startX, firstTextY + diff * 3);
    doc.text(`Trade Type : ${selectTradeType}`, startX, firstTextY + diff * 4);
    doc.text(`Order Type : ${orderType}`, startX, firstTextY + diff * 5);
    doc.text(text, startX, firstTextY + diff * 6);

    var profitLoss = sumProfit;

    if (profitLoss < 0) {
      doc.setTextColor(255, 0, 0);
    } else {
      doc.setTextColor(0, 128, 0);
    }

    textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    text = profitLoss < 0 ? "-" : "";
    text += Math.abs(profitLoss).toFixed(2);

    var textX = textWidth + startX;

    doc.text(text, textX, firstTextY + diff * 6);

    doc.autoTable({
      bodyStyles: { minCellWidth: 20 },
      head: [headers],
      body: table,
      startY: firstTextY + diff * 7,
      startX: startX,
      headStyles: {
        fillColor: [119, 221, 119],
        halign: "center",
      },
      styles: {
        halign: "center",
      },
    });
    doc.save("table.pdf");
  };

  const download = (
    <Typography component={"p"} sx={{ fontSize: "1.4rem" }}>
      Download
    </Typography>
  );

  return (
    <Box className="tabelBox" sx={{ padding: { xs: "1rem 0", md: "0" } }}>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={12}>
          <Box className="selectiondiv-box">
            <Box className="selectionDiv bn">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={fromDate}
                  onChange={(val) => {
                    setFromDate(val);
                  }}
                  className="datePicker"
                />
              </LocalizationProvider>
            </Box>
            <Box className="selectionDiv bn">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={toDate}
                  onChange={(val) => {
                    setToDate(val);
                  }}
                  className="datePicker"
                />
              </LocalizationProvider>
            </Box>
            <Dropdown
              title="Select Segment"
              val={segmentList}
              value={selectedSegment}
              handleChange={handleSegment}
            />
            <Dropdown
              title="Trade Type"
              val={tradeTypeList}
              value={selectTradeType}
              handleChange={handleTradeType}
            />
            <Dropdown
              title="Order Type"
              val={orderTypeList}
              value={orderType}
              handleChange={handleOrderType}
            />

            <Box className="selectionDiv bn">
              <Tooltip title={download} arrow>
                <Button
                  onClick={handleDownload}
                  className="download-btn solidButton"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 11.6669V15.2224C17 15.6939 16.8127 16.1461 16.4793 16.4795C16.1459 16.8129 15.6937 17.0002 15.2222 17.0002H2.77778C2.30628 17.0002 1.8541 16.8129 1.5207 16.4795C1.1873 16.1461 1 15.6939 1 15.2224V11.6669"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11.6667V1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Table
        col={col}
        rows={rows}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default PlReportComponent;
