import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  Grid,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import "../Inauth/Position/Position.scss";
import Table from "../Inauth/Table/Table";
import Tablesearch from "../Inauth/Tablesearch/Tablesearch";
import close from "../images/close.png";

const PositionComponent = (props) => {
  const {
    col,
    rows,
    handleClose,
    handleChange,
    alignment,
    open,
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
    closeLivePosition,
    tradetypesdrp,
    tradetypeshand,
    closeAllPosition,
    open3,
    setOpen3,
    open4,
    closeSelected,
    setOpen4,
  } = props;

  const tradetypes = ["Paper", "Live"];

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  return (
    <>
      <Box className="tabelBox">
        <Grid container spacing={2} alignItems={"center"}>
          <Grid item xs={12}>
            <Box className="selectiondiv-box">
              <Box className="selectionDiv bn searchFlex">
                <Tablesearch placeholder="Enter symbol" />
              </Box>
              <Button
                className="squareOff-btn solidButton"
                sx={{
                  width: "auto !important",
                  fontSize: "1.2rem",
                  marginRight: 1,
                }}
                onClick={handleClickOpen3}
              >
                Square Off All
              </Button>
              <Button
                className="squareOff-btn solidButton"
                sx={{
                  width: "auto !important",
                  fontSize: "1.2rem",
                  marginRight: 1,
                }}
                onClick={handleClickOpen4}
              >
                Square Off
              </Button>

              <Box className="selectionDiv bn searchFlex">
                <Typography className="label" component={"label"}>
                  Select Trade Type
                </Typography>
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  className="tradeType-toggle"
                >
                  <ToggleButton value="paper">Paper</ToggleButton>
                  <ToggleButton value="live">Live</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Table
          col={col}
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        className="commonModal squareOff"
      >
        <Box className="modalHeader" sx={{ justifyContent: "end" }}>
          <Typography component={"h4"}>Square Off</Typography>
          <Button onClick={handleClose} className="closeModal">
            <img src={close} />
          </Button>
        </Box>
        <DialogContent sx={{ padding: "0" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Box className="alertIcons">
              <svg
                width="1052"
                height="1052"
                viewBox="0 0 1052 1052"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M558 334C558 316.3 543.7 302 526 302C508.3 302 494 316.3 494 334V590C494 607.7 508.3 622 526 622C543.7 622 558 607.7 558 590V334ZM526 750C536.609 750 546.783 745.786 554.284 738.284C561.786 730.783 566 720.609 566 710C566 699.391 561.786 689.217 554.284 681.716C546.783 674.214 536.609 670 526 670C515.391 670 505.217 674.214 497.716 681.716C490.214 689.217 486 699.391 486 710C486 720.609 490.214 730.783 497.716 738.284C505.217 745.786 515.391 750 526 750Z"
                  fill="#4987FE"
                />
                <circle
                  cx="526"
                  cy="526"
                  r="507"
                  stroke="#5086EE"
                  stroke-width="38"
                />
              </svg>
            </Box>
            <Typography
              component={"h4"}
              sx={{
                fontSize: "1.8rem",
                textAlign: "center",
                marginTop: "2rem",
              }}
              className="alertText"
            >
              Are You Sure You Want to Close Position !
            </Typography>

            <Box sx={{ display: { xs: "flex" }, marginTop: 2 }}>
              <Button
                onClick={handleClose}
                className="modal-btn btn-danger"
                sx={{ marginRight: "0.5rem" }}
              >
                Discard
              </Button>
              <Button
                onClick={closeLivePosition}
                className="modal-btn btn-primary"
                sx={{ marginLeft: "0.5rem" }}
              >
                Confirm
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Sqaure Off with Dropdown */}
      <Dialog
        open={open3}
        onClose={handleClose3}
        className="commonModal squareOff"
        fullWidth
      >
        <Box className="modalHeader">
          <Typography component={"h4"}>Square Off</Typography>
          <Button onClick={handleClose3} className="closeModal">
            <img src={close} />
          </Button>
        </Box>
        <DialogContent sx={{ padding: "0" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Box className="alertIcons">
              <svg
                width="1052"
                height="1052"
                viewBox="0 0 1052 1052"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M558 334C558 316.3 543.7 302 526 302C508.3 302 494 316.3 494 334V590C494 607.7 508.3 622 526 622C543.7 622 558 607.7 558 590V334ZM526 750C536.609 750 546.783 745.786 554.284 738.284C561.786 730.783 566 720.609 566 710C566 699.391 561.786 689.217 554.284 681.716C546.783 674.214 536.609 670 526 670C515.391 670 505.217 674.214 497.716 681.716C490.214 689.217 486 699.391 486 710C486 720.609 490.214 730.783 497.716 738.284C505.217 745.786 515.391 750 526 750Z"
                  fill="#4987FE"
                />
                <circle
                  cx="526"
                  cy="526"
                  r="507"
                  stroke="#5086EE"
                  stroke-width="38"
                />
              </svg>
            </Box>
            <Typography
              component={"h4"}
              sx={{
                fontSize: "1.8rem",
                textAlign: "center",
                marginTop: "2rem",
              }}
              className="alertText"
            >
              Are You Sure You Want to Close Position !
            </Typography>
            <Box className="formBox">
              <Box className="formItems" sx={{ marginTop: 2 }}>
                {/* <Typography component={'label'} className='label important'>Select Trade Type:</Typography> */}
                <Box className="selectionDiv">
                  <FormControl className="dropdown-ap" sx={{ width: "100%" }}>
                    <Select
                      value={tradetypeshand}
                      onChange={tradetypesdrp}
                      className="dropdown"
                    >
                      {tradetypes.map((vals, index) => (
                        <MenuItem value={vals} key={index}>
                          {vals}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex" }, marginTop: 2 }}>
              <Button
                onClick={handleClose3}
                className="modal-btn btn-danger"
                sx={{ marginRight: "0.5rem" }}
              >
                Discard
              </Button>
              <Button
                onClick={closeAllPosition}
                className="modal-btn btn-primary"
                sx={{ marginLeft: "0.5rem" }}
              >
                Close All
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* square off selected */}
      <Dialog
        open={open4}
        onClose={handleClose4}
        className="commonModal squareOff"
        fullWidth
      >
        <Box className="modalHeader">
          <Typography component={"h4"}>Square Off</Typography>
          <Button onClick={handleClose4} className="closeModal">
            <img src={close} />
          </Button>
        </Box>
        <DialogContent sx={{ padding: "0" }} className="modalBody">
          <DialogContentText sx={{ padding: "0" }}>
            <Box className="alertIcons">
              <svg
                width="1052"
                height="1052"
                viewBox="0 0 1052 1052"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M558 334C558 316.3 543.7 302 526 302C508.3 302 494 316.3 494 334V590C494 607.7 508.3 622 526 622C543.7 622 558 607.7 558 590V334ZM526 750C536.609 750 546.783 745.786 554.284 738.284C561.786 730.783 566 720.609 566 710C566 699.391 561.786 689.217 554.284 681.716C546.783 674.214 536.609 670 526 670C515.391 670 505.217 674.214 497.716 681.716C490.214 689.217 486 699.391 486 710C486 720.609 490.214 730.783 497.716 738.284C505.217 745.786 515.391 750 526 750Z"
                  fill="#4987FE"
                />
                <circle
                  cx="526"
                  cy="526"
                  r="507"
                  stroke="#5086EE"
                  stroke-width="38"
                />
              </svg>
            </Box>
            <Typography
              component={"h4"}
              sx={{
                fontSize: "1.8rem",
                textAlign: "center",
                marginTop: "2rem",
              }}
              className="alertText"
            >
              Are You Sure You Want to Close Selected Position !
            </Typography>

            <Box sx={{ display: { xs: "flex" }, marginTop: 2 }}>
              <Button
                onClick={handleClose4}
                className="modal-btn btn-danger"
                sx={{ marginRight: "0.5rem" }}
              >
                Discard
              </Button>
              <Button
                onClick={closeSelected}
                className="modal-btn btn-primary"
                sx={{ marginLeft: "0.5rem" }}
              >
                Close All
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PositionComponent;
