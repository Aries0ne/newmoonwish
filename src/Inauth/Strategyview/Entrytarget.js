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
import { useDispatch } from "react-redux";

export default function Entrytarget({ data, userBanknifty }) {
  return (
    <>
      <Box
        component={"div"}
        className="border-ap"
        sx={{ padding: "0 !important" }}
      >
        <Typography component={"h4"} className="title_table">
          Entry with Target
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
                <TableCell>Trading Expiry</TableCell>
                <TableCell>System Expiry</TableCell>
                <TableCell>System Entry</TableCell>
                <TableCell>Our Entry</TableCell>
                <TableCell>TGT-0</TableCell>
                <TableCell>TGT-1</TableCell>
                <TableCell>TGT-2</TableCell>
                <TableCell>TGT-3</TableCell>
                <TableCell>TGT-4</TableCell>
                <TableCell>TGT-5</TableCell>
                <TableCell>TGT-6</TableCell>
                <TableCell>TGT-7</TableCell>
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
                <TableCell>C</TableCell>
                <TableCell>
                  <Typography component={"p"}>{data?.tradingexpiry}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"} className="buy">
                    {data?.buyentry}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.ourentry || "--"}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target1b}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "BUY"
                      ? data?.target1
                        ? data?.target1
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target2b}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "BUY"
                      ? data?.target2
                        ? data?.target2
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target3b}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "BUY"
                      ? data?.target3
                        ? data?.target3
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target4b}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "BUY"
                      ? data?.target4
                        ? data?.target4
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target5b}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "BUY"
                      ? data?.target5
                        ? data?.target5
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target6b}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "BUY"
                      ? data?.target6
                        ? data?.target6
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target7b}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "BUY"
                      ? data?.target7
                        ? data?.target7
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                  <Typography component={"p"}>
                    {data?.side === "BUY"
                      ? data?.target8
                        ? data?.target8
                        : "--"
                      : "--"}
                  </Typography>
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
                <TableCell>C</TableCell>
                <TableCell>
                  <Typography component={"p"}>{data?.tradingexpiry}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"} className="sell">
                    {data?.sellentry}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.ourentry || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target1s}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "SELL"
                      ? data?.target1
                        ? data?.target1
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target2s}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "SELL"
                      ? data?.target2
                        ? data?.target2
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target3s}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "SELL"
                      ? data?.target3
                        ? data?.target3
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target4s}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "SELL"
                      ? data?.target4
                        ? data?.target4
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target5s}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "SELL"
                      ? data?.target5
                        ? data?.target5
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target6s}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "SELL"
                      ? data?.target6
                        ? data?.target6
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {userBanknifty?.target7s}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.side === "SELL"
                      ? data?.target7
                        ? data?.target7
                        : "--"
                      : "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                  <Typography component={"p"}>
                    {data?.side === "SELL"
                      ? data?.target8
                        ? data?.target8
                        : "--"
                      : "--"}
                  </Typography>
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
