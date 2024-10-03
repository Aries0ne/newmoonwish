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

export default function Stoploss({ data, userBanknifty }) {
  return (
    <>
      <Box
        component={"div"}
        className="border-ap"
        sx={{ padding: "0 !important", marginTop: 2 }}
      >
        <Typography component={"h4"} className="title_table">
          Stoploss
        </Typography>
        <TableContainer sx={{ MarginTop: 16, maxHeight: 550 }}>
          <Table
            stickyHeader
            sx={{ minWidth: "100%", maxHeight: 550 }}
            className={`table tableData`}
          >
            <TableHead>
              <TableRow>
                <TableCell>Scrip Name</TableCell>
                <TableCell>Trade</TableCell>
                <TableCell>Final Stop loss</TableCell>
                <TableCell>Revised Final Stop loss</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>SL-Before Target</TableCell>
                <TableCell>SL-After Target</TableCell>
                <TableCell>HH / LL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{data?.symbolmaster}</TableCell>
                <TableCell>
                  <Typography component={"p"} className="buy">
                    Lots
                  </Typography>
                  <Typography component={"p"} className="buy">
                    Buy
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.side === "BUY" ? data?.sl : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>{data?.status}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.slbeforetarget}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>48337.4</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{data?.symbolmaster}</TableCell>
                <TableCell>
                  <Typography component={"p"} className="sell">
                    Lots
                  </Typography>
                  <Typography component={"p"} className="sell">
                    Sell
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.side === "SELL" ? data?.sl : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>{data?.status}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>47700</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>46964.7</Typography>
                </TableCell>
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
