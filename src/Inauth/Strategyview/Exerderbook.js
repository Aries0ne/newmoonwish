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
import './Strategyview.scss';

export default function Exerderbook() {

  return (
    <>
      <Box component={'div'} className='border-ap' sx={{ padding: '0 !important', marginTop: 2 }}>
        <Typography component={'h4'} className='title_table'>Order Book</Typography>
        <TableContainer sx={{ MarginTop: 16, maxHeight: 550 }}>
          <Table
            stickyHeader
            sx={{ minWidth: "100%", maxHeight: 550 }}
            className={`table tableData`}
          >
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Buy sell</TableCell>
                <TableCell>Order Type</TableCell>
                <TableCell>Order QTY</TableCell>
                <TableCell>Order Price</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Exexcuted QTY</TableCell>
                <TableCell>EXEC Price</TableCell>
                <TableCell>Trigeger Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
                <TableCell>--</TableCell>
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
