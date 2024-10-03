import { toast } from "react-toastify";

// export const generatePopup = (type, msg) => {
//   return type === "success" ? (
//     <>{toast.success(msg, { autoClose: 1500 })}</>
//   ) : (
//     <>{toast.error(msg, { autoClose: 1500 })}</>
//   );
// };
export const generatePopup = (type, msg) => {
  return type === "success" ? (
    <>{toast.success(msg, { autoClose: 1500, theme: "dark" })}</>
  ) : (
    <>{toast.error(msg, { autoClose: 1500, theme: "dark" })}</>
  );
};
