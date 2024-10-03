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

export default function Highlow({ data, userBanknifty }) {
  return (
    <>
      <Box
        component={"div"}
        className="border-ap"
        sx={{ padding: "0 !important", marginTop: 2 }}
      >
        <Typography component={"h4"} className="title_table">
          High-Low according to Expiry
        </Typography>
        <TableContainer sx={{ MarginTop: 16, maxHeight: 550 }}>
          <Table
            stickyHeader
            sx={{ minWidth: "100%", maxHeight: 550 }}
            className={`table tableData`}
          >
            <TableHead>
              <TableRow>
                <TableCell>Expiry</TableCell>
                <TableCell>Data & Day</TableCell>
                <TableCell>
                  <Typography component={"p"}>P 1 Day</Typography>
                  <Typography component={"p"}>28-Dec-2023</Typography>
                  <Typography component={"p"}>Wed</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>P 2 Day</Typography>
                  <Typography component={"p"}>27-Dec-2023</Typography>
                  <Typography component={"p"}>Tue</Typography>
                </TableCell>
                <TableCell>P 1 & 2 Day HH</TableCell>
                <TableCell>
                  <Typography component={"p"}>9:20AM</Typography>
                  <Typography component={"p"}>27-Dec-2023</Typography>
                  <Typography component={"p"}>Tue</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>9:30AM</Typography>
                  <Typography component={"p"}>27-Dec-2023</Typography>
                  <Typography component={"p"}>Tue</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>Intraday</Typography>
                  <Typography component={"p"}>27-Dec-2023</Typography>
                  <Typography component={"p"}>Tue</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography component={"p"}>Current Expiry</Typography>
                  <Typography component={"p"}>{data?.tradingexpiry}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"} className="sell">
                    HIGH
                  </Typography>
                  <Typography component={"p"} className="buy">
                    LOW
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.c_1_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.c_1_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.c_2_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.c_2_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.c_high || "--"}
                  </Typography>
                  <Typography component={"p"}>{data?.c_low || "--"}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.c_920_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.c_920_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.c_930_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.c_930_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                  <Typography component={"p"}>--</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography component={"p"}>Next Expiry</Typography>
                  <Typography component={"p"}>{data?.nextexpiry}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"} className="sell">
                    HIGH
                  </Typography>
                  <Typography component={"p"} className="buy">
                    LOW
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {" "}
                    {data?.n_1_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.n_1_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.n_2_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.n_2_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.n_high || "--"}
                  </Typography>
                  <Typography component={"p"}>{data?.n_low || "--"}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.n_920_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.n_920_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.n_930_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.n_930_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                  <Typography component={"p"}>--</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography component={"p"}>Both Expiry</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"} className="sell">
                    HIGH
                  </Typography>
                  <Typography component={"p"} className="buy">
                    LOW
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.b_1_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.b_1_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.b_2_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.b_2_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.b_high || "--"}
                  </Typography>
                  <Typography component={"p"}>{data?.b_low || "--"}</Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.b_920_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.b_930_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>
                    {data?.b_930_high || "--"}
                  </Typography>
                  <Typography component={"p"}>
                    {data?.b_930_low || "--"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component={"p"}>--</Typography>
                  <Typography component={"p"}>--</Typography>
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
