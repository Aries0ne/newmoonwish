// import React, { useEffect } from 'react';
import React from 'react';
import { Box, Typography,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';



export default function StrategyOverview() {

  const col = [
    "Net Profit",
      "Total Closed Traders",
      "Percent Portfolio",
      "Profit Factor",
      "Max Drawdown",
      "Avg Trade",
      "Avg #Bars in Traders",   
    ];
 
  const col1= [
      "Year",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July", 
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    
    ];

    const col2 = [
     

      "Index",
      "Entry Date",
      "Entry Time",
      "Exit Date",
      "Exit Time",
      "Entry Price",
      "Exit Price",
      "Type", 
      "Strike",
      "B/S",
      "Entry Price",
      "Exit Price",
      "P/L",
      
      ];

      const rows = [
        {
          NetProfit: "-19,860.75 INR -19.86%",
          TotalCLosedTraders: "100",
          PrecentPortfolio: "38%",
          ProfitFactor: "0.872",
          MaxDrawdown: "55,441.50 INR",
          AvgTrade: "-191.61 INR -0.03%",  
          AvgBarsinTraders: "153",
        },
        ]
  
    const rows1 = [
    {
      Year: "2022",
      Jan: "0",
      Feb: "0",
      Mar: "0",
      Apr: "0",
      May: "0",  
      Jun: "0",
      July: "0",
      Aug: "0",
      Sept: "0",
      Oct: "0",
      Nov: "0",
      Dec: "0",
    },
    ]

    const rows2 = [
    {
      Index: "1",
      EntryDate: "2023-09-30",
      EntryTime: "10:00 AM",
      ExitDate: "2023-09-30",
      ExitTime: "3:00 PM",
      Type: "Buy",  
      Strike: "50",
      Bs: "B",
      EntryPrice: "150.00",
      ExitPrice:"160.00" ,
      PL:"+1000.00" ,
      
      
    },
    ]
   
  return(
    <Box className="tabelBox" sx={{ padding: { xs: "1rem 0", md: "0" } }}>

    {/*    --- First table  */}
    
    <Box sx={{ marginBottom: '5rem' }}>
      <Typography variant="h4" component="h1" gutterBottom style={{fontWeight: 600 , fontSize:'1.8rem'}}>
        Trade Overview       
      </Typography>

      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {col.map((column, index) => (
              <TableCell key={index}style={{fontSize: '1.6rem', fontWeight: 500,}}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.NetProfit}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }} >{row.TotalCLosedTraders}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }} >{row.PrecentPortfolio}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }} >{row.ProfitFactor}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }} >{row.MaxDrawdown}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }} >{row.AvgTrade}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }} >{row.AvgBarsinTraders}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

   <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {col1.map((column1, index) => (
              <TableCell key={index}style={{fontSize: '1.6rem', fontWeight: 500 ,}}>{column1}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows1.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Year}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Jan}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Feb}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Mar}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Apr}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.May}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Jun}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.July}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Aug}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Sept}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Oct}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Nov}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Dec}</TableCell>        
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

{/*  --- second table */}

<Box>
    
    <Typography variant="h4" component="h1" gutterBottom style={{fontWeight:600 , fontSize: '1.8rem'}}>
    <div style={{ margin: '50px' }}></div>
        Full Report
      </Typography>
            <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {col2.map((column, index) => (
                <TableCell key={index} style={{ fontSize: '1.6rem', fontWeight: 500 ,}}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows2.map((row, index) => (
              <TableRow key={index}>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Index}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.EntryDate}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.EntryTime}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.ExitDate}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.ExitTime}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.EntryPrice}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.ExitPrice}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Type}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Strike}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.Bs}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.EntryPrice}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.ExitPrice}</TableCell>
              <TableCell style={{ fontSize: '1.3rem', fontWeight: 500 }}>{row.PL}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
       

       </Box>
       
  );

}
