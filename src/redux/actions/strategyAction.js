import { toast } from "react-toastify";
import * as actionTypes from "../actionTypes";
import axios from "axios";
import { API_URL } from "../../config";
import { generatePopup } from "../../utils/popup";

export const strategyMarketplace = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/indicator/getstratergydata/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_STRATEGY_DATA_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.GET_STRATEGY_DATA_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_STRATEGY_DATA_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const addStrategy = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .post(`${API_URL}/indicator/userAddStratergy/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.POST_USER_STRATEGY_DATA_SUCCESS,
          });
          resolve(res);
          toast.success("Strategy added successfully");
        } else {
          dispatch({
            type: actionTypes.POST_USER_STRATEGY_DATA_FAIL,
          });

          toast.error("Deploy failed");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.POST_USER_STRATEGY_DATA_FAIL,
          });
          toast.error("Deploy failed");
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const getStrategyMarketplace = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/indicator/userAddStratergy/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_USER_STRATEGY_DETAILS_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.GET_USER_STRATEGY_DETAILS_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_USER_STRATEGY_DETAILS_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const deleteStrategyMarketplace = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .delete(`${API_URL}/indicator/userAddStratergy/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.DELETE_USER_STRATEGY_DATA_SUCCESS,
          });
          resolve(res);
          toast.success("Strategy removed succesfully.", { autoClose: 1500 });
          dispatch(getStrategyMarketplace());
        } else {
          dispatch({
            type: actionTypes.DELETE_USER_STRATEGY_DATA_FAIL,
          });
          toast.error("Failed to delete strategy", { autoClose: 1500 });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.DELETE_USER_STRATEGY_DATA_FAIL,
          });
          toast.error("Failed to delete strategy", { autoClose: 1500 });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const getStrategyCode = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/indicator/straterycreatecode/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_STRATEGY_CODE_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.GET_STRATEGY_CODE_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_STRATEGY_CODE_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const strategyMystrategy = (payload) => (dispatch) => {};

export const strategyDetails = (payload) => (dispatch) => {};

export const strategyDelete = (payload) => (dispatch) => {};
