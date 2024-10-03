import React, { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import "./Strategyview.scss";

export default function Update({ data, userBanknifty }) {
  return (
    <>
      <Box
        component={"div"}
        className="border-ap"
        sx={{ padding: "0 !important", marginBottom: 2 }}
      >
        <Typography component={"h4"} className="title_table">
          Update
        </Typography>
        <TableContainer sx={{ MarginTop: 16, maxHeight: 550 }}>
          <Table
            stickyHeader
            sx={{ minWidth: "100%", maxHeight: 550 }}
            className={`table tableData`}
          >
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Indicator</TableCell>
                <TableCell>Open Position</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Net Qty</TableCell>
                <TableCell>Entry Date</TableCell>
                <TableCell>Entry</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Totals P & L</TableCell>
                <TableCell>Lot Size</TableCell>
                <TableCell>Scrip Code</TableCell>
                <TableCell>Ckt</TableCell>
                <TableCell>Rollower Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data?.symbol || "--"}</TableCell>
                <TableCell>Bull CF</TableCell>
                <TableCell>{data?.side}</TableCell>
                <TableCell>{data?.tradingexpiry || "--"}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>{data?.entrydate || "--"}</TableCell>
                <TableCell>{data?.systementry || "--"}</TableCell>
                <TableCell>{data?.status}</TableCell>
                <TableCell>
                  <Typography component={"p"}>0.00</Typography>
                </TableCell>
                <TableCell>15</TableCell>
                <TableCell>{data?.scriptcode}</TableCell>
                <TableCell>Up CKT</TableCell>
                <TableCell>20</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          className="tablePagination"
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "end" },
            padding: "0 1rem",
          }}
        >
          {/* <TablePagination
          rowsPerPageOptions={[10, 20, 30, { label: "All", value: -1 }]}
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          SelectProps={{
            fontSize: "1.6rem",
            native: false,
          }}
          page={page}
          className="tablePagination"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        </Box>
      </Box>
    </>
  );
}
