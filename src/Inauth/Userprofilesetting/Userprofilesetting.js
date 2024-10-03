import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Tooltip,
  InputBase,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../redux/actions/authActions";
import { generatePopup } from "../../utils/popup";
import close from "../../images/close.png";

export default function Profilesetting() {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [update, setUpdate] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const profile = useSelector((state) => state.Auth.authProfile);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (profile && profile.length > 0) {
      setFirstname(profile[0].firstname);
      setLastname(profile[0].lastname);
      setPhone(profile[0].phone);
      setEmail(profile[0].email);
    }
  }, [profile]);

  const handleSave = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      return generatePopup("error", "Email in not valid.");
    }

    dispatch(
      updateProfile({ firstname: firstname, lastname: lastname, email: email })
    );
    setUpdate(true);
    setOpen(false);
  };

  const edit = <Typography sx={{ fontSize: "1.4rem" }}>Edit</Typography>;
  return (
    <>
      <Box className="contactDetails-box">
        <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
          <Grid item xs={12}>
            <Typography component={"h2"} sx={{ fontSize: "2.2rem !important" }}>
              Profile Setting
            </Typography>
          </Grid>
        </Grid>
        <Box
          className="border-ap contactForm formBox"
          sx={{ padding: 1, maxWidth: "500px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box
                className="formItems inputFields space fullWidth"
                sx={{ marginTop: " 0 !important" }}
              >
                <Typography component={"label"} className="label">
                  First Name
                </Typography>
                <InputBase
                  placeholder="First Name"
                  type="text"
                  id="FirstName"
                  fullWidth
                  value={firstname}
                  disabled={update}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                className="formItems inputFields space fullWidth"
                sx={{ marginTop: " 0 !important" }}
              >
                <Typography component={"label"} className="label">
                  Last Name
                </Typography>
                <InputBase
                  placeholder="Last Name"
                  type="text"
                  id="LastName"
                  fullWidth
                  value={lastname}
                  disabled={update}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Box
                className="formItems inputFields space fullWidth"
                sx={{ marginTop: " 0 !important" }}
              >
                <Typography component={"label"} className="label">
                  Email
                </Typography>
                <InputBase
                  placeholder="E-mail"
                  type="text"
                  id="Email"
                  fullWidth
                  value={email}
                  disabled={update}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                className="formItems inputFields space fullWidth"
                sx={{ marginTop: " 0 !important" }}
              >
                <Typography component={"label"} className="label">
                  Phone Number
                </Typography>
                <InputBase
                  placeholder="Phone"
                  type="text"
                  fullWidth
                  id="Phone"
                  value={phone}
                  disabled
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box
                className="formItems inputFields space fullWidth"
                sx={{
                  display: "flex !important",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Tooltip title={edit} arrow placement="top">
                  <Button
                    className="fetchReport-btn solidButton"
                    onClick={() => setUpdate(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      {" "}
                      <path
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </Button>
                </Tooltip>
                <Button
                  className="formSolid-btn"
                  sx={{ marginLeft: 1 }}
                  onClick={handleClickOpen}
                  disabled={update}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
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
              Are You Sure You Want to Update Profile!
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
                onClick={handleSave}
                className="modal-btn btn-primary"
                sx={{ marginLeft: "0.5rem" }}
              >
                Confirm
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
