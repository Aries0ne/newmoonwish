import * as React from "react";
import "./Tablesearch.scss";
import { Box, TextField, InputBase } from "@mui/material";

export default function Tableaction(props) {
  const { placeholder, onStateChange, handleChange, value } = props;

  const onHandleChange = (e) => {
    onStateChange(e.target.value);
  };

  return (
    <>
      <Box className="inputFields">
        <InputBase
          placeholder={placeholder}
          className="tabledataFind"
          onChange={handleChange}
          value={value}
        />
        <Box className="searchIcon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.85722 14.7144C11.6444 14.7144 14.7144 11.6444 14.7144 7.85722C14.7144 4.07008 11.6444 1 7.85722 1C4.07008 1 1 4.07008 1 7.85722C1 11.6444 4.07008 14.7144 7.85722 14.7144Z"
              stroke="#6A6D78"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 13.0001L17 17.0002"
              stroke="#6A6D78"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      </Box>
    </>
  );
}
