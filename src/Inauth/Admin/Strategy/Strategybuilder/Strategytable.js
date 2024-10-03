import * as React from "react";
import {
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../../Table/Table.scss";

export default function Strategytable(props) {
  const {
    rows,
    cols,
    small,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
  } = props;

  return (
    <>
      <TableContainer sx={{ MarginTop: 16, maxHeight: 440 }}>
        <Table
          stickyHeader
          sx={{ minWidth: "100%" }}
          className={`table tableData ${small}`}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell>Sr No.</TableCell> */}
              {cols.map((colum, index) => (
                <TableCell key={index}>{colum}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows?.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : rows
            )?.map((row, index) => (
              <TableRow key={index}>
                {/* <TableCell>
                  <span>
                    {page === 0 ? index + 1 : page * rowsPerPage + index + 1}
                  </span>
                </TableCell> */}
                {Object.keys(row).map((element, index) => (
                  <TableCell key={index}>{row[element]}</TableCell>
                ))}
              </TableRow>
            ))}
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
        <TablePagination
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
        />
      </Box>
    </>
  );
}
