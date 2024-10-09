import { toast } from "react-toastify";
import { API_URL } from "../../config";
import * as actionTypes from "../actionTypes";
import axios from "axios";
import { generatePopup } from "../../utils/popup";

export const getLiveData = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.LIVE_FEED_DATA_SUCCESS,
      payload: payload,
    });
    resolve();
  });
};

export const getaddsymboldata = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.ADD_SYMBOL_DATA_SOCKET,
      payload: payload,
    });
    resolve();
  });
};

export const getProfitLoss = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.GET_OVERALL_PROFIT_LOSS_SUCCESS,
      payload: payload,
    });
    resolve();
  });
};

export const getWatchListSocket = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.GET_WATCH_LIST_DATA_SUCCESS,
      payload: payload,
    });
    resolve();
  });
};

export const getWatchListLiveData = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.GET_WATCH_LIST_LIVE_DATA_SUCCESS,
      payload: payload,
    });
    resolve();
  });
};

export const addWatchList = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .post(`${API_URL}/position/watchlistupdate/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ADD_WATCH_LIST_SUCCESS,
            payload: res.data,
          });
          generatePopup("success", "Symbol added succesfully.");
          resolve(res.data);
        } else {
          dispatch({
            type: actionTypes.ADD_WATCH_LIST_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.ADD_WATCH_LIST_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const deleteWatchList = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .delete(`${API_URL}/position/watchlistupdate/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.DELETE_WATCH_LIST_DATA_SUCCESS,
            payload: res.data,
          });
          generatePopup("success", "Symbol deleted succesfully.");
          resolve(res.data);
        } else {
          dispatch({
            type: actionTypes.DELETE_WATCH_LIST_DATA_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.DELETE_WATCH_LIST_DATA_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

// export const getWatchListData = (payload) => (dispatch) => {
//   return new Promise((resolve, reject) => {
//     let token = localStorage.getItem("token");
//     dispatch({
//       type: actionTypes.GET_WATCH_LIST_DATA_SUCCESS,
//     });

//     axios
//       .post(`${API_URL}/position/watchlist/`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           dispatch({
//             type: actionTypes.GET_WATCH_LIST_DATA_SUCCESS,
//             payload: res.data,
//           });
//           resolve(res.data);
//         } else {
//           dispatch({
//             type: actionTypes.GET_WATCH_LIST_DATA_FAIL,
//           });
//         }
//       })
//       .catch((error) => {
//         if (error?.response?.status === 400) {
//           dispatch({
//             type: actionTypes.GET_WATCH_LIST_DATA_FAIL,
//           });
//           generatePopup("error", error?.response?.data?.message);
//         } else if (error?.response?.status === 401) {
//           generatePopup("error", "Token is invalid or expired.");
//           localStorage.clear();
//           window.location.replace("/");
//         }
//       });
//   });
// };
