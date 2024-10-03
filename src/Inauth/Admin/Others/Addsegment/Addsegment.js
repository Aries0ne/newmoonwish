import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
  Dialog,
  DialogContent,
  DialogContentText,
  InputBase,
} from "@mui/material";
import close from "../../../../images/close.png";
import moment from "moment";

const down = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L5 5L9 1"
      stroke="#FF231F"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const up = (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L5 1L9 5"
      stroke="#008F75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Addsegment(props) {
  const [indicatorsList, setIndicatorsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [exchange, setExchange] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const Addexchange = () => {
    setExchange(true);
  };
  const closeAddexchange = () => {
    setExchange(false);
  };
  const col = [
    "Sr.No",
    "Unique Code",
    "Exchange Short name",
    "Exchange Full name",
    "Created By",
    "Created Date",
    "Actions",
  ];

  return (
    <>
      <Box className="border-ap">
        <Box className="tabs">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                className="selectiondiv-box"
                sx={{ display: "flex !important" }}
              >
                <Tooltip
                  placement="top"
                  arrow
                  title={
                    <Typography sx={{ fontSize: "1.4rem" }}>
                      Download
                    </Typography>
                  }
                >
                  <Button className="download-btn solidButton">
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
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M4.55542 7.22229L8.99987 11.6667L13.4443 7.22229"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M9 11.6667V1"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </Button>
                </Tooltip>
                <Button
                  className="formSolid-btn"
                  onClick={Addexchange}
                  sx={{ marginLeft: 1 }}
                >
                  Add Segment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <TableContainer sx={{ MarginTop: 16, maxHeight: 440 }}>
          <Table
            sx={{ minWidth: "100%" }}
            className={`table tableData ${props.small}`}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                {col.map((colum, index) => (
                  <TableCell key={index}>{colum}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? indicatorsList?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : indicatorsList
              )?.map((data, index) => {
                const date = new Date();
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <span>
                        {page === 0
                          ? index + 1
                          : page * rowsPerPage + index + 1}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="symbolName"
                      >
                        <Typography component={"p"} style={{ color: "black" }}>
                          {data?.symbol}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="symbolStatus"
                      >
                        <Typography
                          component={"label"}
                          style={{
                            backgroundColor:
                              data?.status?.split(" ")[0] == "Bearish"
                                ? "red"
                                : "green",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {data?.status?.split(" ")[0]}{" "}
                          {data?.status?.split(" ")[0] == "Bearish" ? down : up}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className="tdp">
                      {moment(date).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className="tdp">{data?.pmh}</TableCell>
                    <TableCell className="tdp">{data?.pml}</TableCell>
                    <TableCell className="tdp">{data?.pwh}</TableCell>
                    <TableCell className="tdp">{data?.pwl}</TableCell>
                    <TableCell className="tdp">{data?.cwh}</TableCell>
                    <TableCell className="tdp">{data?.cwl}</TableCell>
                  </TableRow>
                );
              })}
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
      </Box>

      <Dialog
        open={exchange}
        onClose={closeAddexchange}
        className={`commonModal buysellModal`}
      >
        <Box className="modalHeader" sx={{ justifyContent: "space-between" }}>
          <Typography component={"h4"}>Add Segment</Typography>
          <Button onClick={closeAddexchange} className="closeModal">
            <img src={close} alt={close} />
          </Button>
        </Box>
        <DialogContent className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Exchange Short Name
                  </Typography>
                  <InputBase
                    placeholder="Enter Exchange Short Name"
                    className="userInput"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Exchanhe Full Name
                  </Typography>
                  <InputBase
                    placeholder="Enter Exchanhe Full Name"
                    className="userInput"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="inputFields space fullWidth">
                  <Typography component={"label"} className="label">
                    Remark
                  </Typography>
                  <InputBase
                    placeholder="Remark"
                    className="userInput"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 1 }}>
                <Box
                  sx={{
                    display: { xs: "block", md: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    className="modal-btn btn-danger"
                    onClick={closeAddexchange}
                    sx={{ marginBottom: "0.5rem" }}
                  >
                    Cancle
                  </Button>
                  <Button
                    className="solidButton download-btn"
                    sx={{
                      width: "100% !important",
                      margin: { xs: "0 0 0.5rem 0", md: "0 1rem 0.5rem 1rem" },
                    }}
                  >
                    Save & New
                  </Button>
                  <Button
                    className="formSolid-btn modal-btn btn-danger"
                    sx={{ marginBottom: "0.5rem" }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
