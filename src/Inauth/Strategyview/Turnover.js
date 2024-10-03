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

export default function Turnover() {

  return (
    <>
      <Box component={'div'} className='border-ap' sx={{ padding: '0 !important', marginTop: 2 }}>
        <Typography component={'h4'} className='title_table'>Turn Over</Typography>
        <TableContainer sx={{ MarginTop: 16, maxHeight: 550 }}>
          <Table
            stickyHeader
            sx={{ minWidth: "100%", maxHeight: 550 }}
            className={`table tableData`}
          >
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Net QTY</TableCell>
                <TableCell>Net rate</TableCell>
                <TableCell>CMP</TableCell>
                <TableCell>Previous Close</TableCell>
                <TableCell>Todays MTM</TableCell>
                <TableCell>Settled MTM</TableCell>
                <TableCell>Totals MTM</TableCell>
                <TableCell>Todays BPL</TableCell>
                <TableCell>Totals MTM</TableCell>
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
