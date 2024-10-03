import React from "react";
import UserViewComponent from "../../../Components/UserViewComponent";

export default function Userview() {
  const drpValue = ["JHJF", "FFD55"];

  return (
    <>
      <UserViewComponent drpValue={drpValue} />
    </>
  );
}
