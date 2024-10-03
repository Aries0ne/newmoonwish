import { useState } from "react";
import AdminStrategyComponent from "../../../Components/AdminStrategyComponent";

export default function IndexFuture() {

  const optionvalue = [
    {
      id: 1,
      name: "BANKNIFTY",
      label: "LOT SIZE 25"
    },
    {
      id: 2,
      name: "NIFTY",
      label: "LOT SIZE 50"
    }
  ]

  const [selected, setSelected] = useState();

  const handleActive = (value) => {
    setSelected(value)
  }

  return (
    <>
      <AdminStrategyComponent optionvalue={optionvalue} handleActive={handleActive} selected={selected} />
    </>
  );
}
