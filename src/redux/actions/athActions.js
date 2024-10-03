import * as actionTypes from "../actionTypes";
import axios from "axios";
import { API_URL } from "../../config";
import { generatePopup } from "../../utils/popup";

export const postAth = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.POST_ATH_INIT,
    });
    axios
      .post(`${API_URL}/ath/athresult/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.POST_ATH_SUCCESS,
            payload: res.data,
          });
          resolve(res?.data);
        } else {
          dispatch({
            type: actionTypes.POST_ATH_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.POST_ATH_FAIL,
          });
        } else if (error.response.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const postAthOrder = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.POST_ATHORDER_INIT,
    });
    axios
      .post(`${API_URL}/ath/athorder/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.POST_ATHORDER_SUCCESS,
            payload: res.data,
          });
          resolve(res?.data);
        } else {
          dispatch({
            type: actionTypes.POST_ATHORDER_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.POST_ATHORDER_FAIL,
          });
        } else if (error.response.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const postAthAddPortfolio = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.POST_ATH_ADDPORTFOLIO_INIT,
    });
    axios
      .post(`${API_URL}/ath/athportfolio/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.POST_ATH_ADDPORTFOLIO_SUCCESS,
            payload: res.data,
          });
          resolve(res?.data);
        } else {
          dispatch({
            type: actionTypes.POST_ATH_ADDPORTFOLIO_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.POST_ATH_ADDPORTFOLIO_FAIL,
          });
        } else if (error.response.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const getAthPortfolio = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.GET_ATH_PORTFOLIO_INIT,
    });
    axios
      .get(`${API_URL}/ath/athportfolio/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_ATH_PORTFOLIO_SUCCESS,
            payload: res.data,
          });
          resolve(res?.data);
        } else {
          dispatch({
            type: actionTypes.GET_ATH_PORTFOLIO_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_ATH_PORTFOLIO_FAIL,
          });
        } else if (error.response.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};