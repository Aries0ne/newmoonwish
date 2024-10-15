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
} from "@mui/material";
import * as React from "react";
import "./Table.scss";

export default function Dashboard(props) {
  const {
    rows,
    col,
    small,
    page,
    isLoading,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
  } = props;

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // console.log({ rows });
  // console.log({ col });

  const getActions = (ele, index) => {
    return (
      <Box className="tableActions">
        <Box className="actionButton">
          {ele?.map((item) => {
            return (
              <Button
                className={item?.type === "delete" ? "table_del_btn" : ""}
                variant="text"
                onClick={() => {
                  const element = rows && rows[index];
                  item?.onClick && item.onClick(element, index);
                }}
              >
                {item?.icon}
              </Button>
            );
          })}
        </Box>
      </Box>
    );
  };

  // console.log(
  // 	'isLoading in table',
  // 	isLoading,

  // 	'rows Per Page',

  // 	rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  // );

  return (
    <>
      <TableContainer sx={{ MarginTop: 16, maxHeight: 550 }} className="custom-scrollbar">
        <Table
          stickyHeader
          sx={{ minWidth: "100%", maxHeight: 550 }}
          className={`table tableData ${small}`}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell>Sr No.</TableCell> */}
              {col.map((colum, index) => (
                <TableCell key={index}>{colum}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              (rowsPerPage > 0 && rows
                ? rows?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              )?.map((row, index) => (
                <TableRow key={index}>
                  {/*
								 	 <TableCell>
                  <span>
                    {page === 0 ? index + 1 : page * rowsPerPage + index + 1}
                  </span>
                </TableCell> */}
                  {Object.keys(row).map((element, rowIndex) => {
                    return element !== "id" ? (
                      <TableCell key={rowIndex}>
                        {element === "actions"
                          ? getActions(row[element], index)
                          : row[element]}
                      </TableCell>
                    ) : null;
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
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
          className="tablePagination custom-scrollbar"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}
