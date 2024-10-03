import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  List,
  InputBase,
  ListItem,
  TextField,
} from "@mui/material";
import contactbg from "../../images/contact-bg.jpeg";
import "./Contact.scss";
import ContactComponent from "../../Components/ContactComponent";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/authActions";

export default function Contact() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const profileData = useSelector((state) => state.Auth.authProfile);

  return (
    <>
      <ContactComponent profileData={profileData} />
    </>
  );
}
