import { toast } from "react-toastify";
import * as actionTypes from "../actionTypes";
import axios from "axios";
import { API_URL } from "../../config";
import { generatePopup } from "../../utils/popup";

export const createStrategy = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.CREATE_STRATEGY_INIT,
    });
    axios
      .post(`${API_URL}/indicator/getstratergy/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.CREATE_STRATEGY_SUCCESS,
          });
          resolve(res);
          const message = res?.data?.message || 'Strategy created successfully';
          generatePopup("success", message);
        } else {
          dispatch({
            type: actionTypes.CREATE_STRATEGY_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
        else{
          generatePopup('error','Failed to create strategy');
        }
        reject(error);
      });
  });
};
