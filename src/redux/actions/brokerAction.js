import { toast } from "react-toastify";
import { API_URL } from "../../config";
import * as actionTypes from "../actionTypes";
import axios from "axios";
import { generatePopup } from "../../utils/popup";

export const zebullBroker = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.ZEBULL_BROKER_INIT,
    });
    axios
      .post(`${API_URL}/auth/brokerdetails/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ZEBULL_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          navigate("/");
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.ZEBULL_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add zebull broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.ZEBULL_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add zebull broker details!",
          });
          resolve(error.response);
          // error?.response?.data?.message
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const iciciLogin = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.ICICI_BROKER_INIT,
    });

    axios
      .post(`${API_URL}/auth/brokerdetails/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ICICI_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          navigate("/");

          resolve(res);
        } else {
          dispatch({
            type: actionTypes.ICICI_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add icici broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.ICICI_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add icici broker details!",
          });
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const angelLogin = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.ANGEL_BROKER_INIT,
    });
    axios
      .post(`${API_URL}/auth/angel`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ANGEL_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          navigate("/");
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.ANGEL_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add angel broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.ANGEL_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add angel broker details!",
          });
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const zerodhaLogin = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.ZERODHA_BROKER_INIT,
    });
    axios
      .post(`${API_URL}/auth/brokerdetails/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ZERODHA_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          resolve(res);
          navigate("/");
        } else {
          dispatch({
            type: actionTypes.ZERODHA_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add zerodha broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.ZERODHA_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add zerodha broker details!",
          });
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const finvasiaLogin = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.FINVASIA_BROKER_INIT,
    });
    axios
      .post(`${API_URL}/auth/finvasia`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.FINVASIA_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          navigate("/");
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.FINVASIA_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add finvasia broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.FINVASIA_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add finvasia broker details!",
          });
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const kotakLogin = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.KOTAK_BROKER_INIT,
    });
    axios
      .post(`${API_URL}/auth/kotak`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.KOTAK_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          navigate("/");
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.KOTAK_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add kotak broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.KOTAK_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add kotak broker details!",
          });
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const aliceLogin = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.ALICE_BROKER_INIT,
    });
    axios
      .post(`${API_URL}/auth/brokerdetails/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ALICE_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          navigate("/");
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.ALICE_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add alice broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.ALICE_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add alice broker details!",
          });
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const fyersBroker = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.FYERS_BROKER_INIT,
    });
    axios
      .post(`${API_URL}/auth/brokerdetails/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.FYERS_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          navigate("/");
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.FYERS_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add zebull broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.FYERS_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add zebull broker details!",
          });
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const sharekhanBroker = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.SHAREKHAN_BROKER_INIT,
    });
    axios
      .post(`${API_URL}/auth/brokerdetails/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.SHAREKHAN_BROKER_SUCCESS,
          });
          generatePopup("success", res?.data?.message);
          navigate("/");
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.SHAREKHAN_BROKER_FAIL,
            payload:
              res?.data?.message || "Failed to add sharekhan broker details!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          dispatch({
            type: actionTypes.SHAREKHAN_BROKER_FAIL,
            payload:
              typeof error == "string"
                ? error
                : "Failed to add sharekhan broker details!",
          });
          generatePopup("error", error?.response?.data?.message);
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const BrokerStatus =
  (payload = {}, navigate = {}) =>
    (dispatch) => {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem("token");
        dispatch({
          type: actionTypes.BROKER_STATUS_INIT,
        });
        axios
          .get(`${API_URL}/auth/brokerdetails/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch({
                type: actionTypes.BROKER_STATUS_SUCCESS,
                payload: res.data,
              });
              // navigate("/");
              resolve(res);
            } else {
              dispatch({
                type: actionTypes.BROKER_STATUS_FAIL,
                payload: res?.data?.message,
              });
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              dispatch({
                type: actionTypes.BROKER_STATUS_FAIL,
                payload: error?.response?.data?.message,
              });
            } else if (error?.response?.status === 401) {
              generatePopup("error", "Token is invalid or expired.");
              localStorage.clear();
              window.location.replace("/");
            }
          });
      });
    };
