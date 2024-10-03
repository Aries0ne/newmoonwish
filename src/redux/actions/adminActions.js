import axios from "axios";
import { API_URL } from "../../config";
import { generatePopup } from "../../utils/popup";
import * as actionTypes from "../actionTypes";

export const adminLivePosition = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.ADMIN_LIVE_POSITION_INIT,
    });
    axios
      .post(`${API_URL}/position/adminliveposition/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ADMIN_LIVE_POSITION_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.ADMIN_LIVE_POSITION_FAIL,
            payload: "Data Not Found",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.ADMIN_LIVE_POSITION_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const adminPaperPosition = (payload) => (dispatch) => {
  return new Promise((resolve, resject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.ADMIN_PAPER_POSITION_INIT,
    });
    axios
      .post(`${API_URL}/position/adminpaperposition/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ADMIN_PAPER_POSITION_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.ADMIN_PAPER_POSITION_FAIL,
            payload: "Data Not Found",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.ADMIN_PAPER_POSITION_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const adminPaperOrderData = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/position/adminpaperorder/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_ADMIN_PAPER_ORDER_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.GET_ADMIN_PAPER_ORDER_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_ADMIN_PAPER_ORDER_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const adminPaperOrder = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .post(`${API_URL}/position/adminpaperorder/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ADMIN_PAPER_ORDER_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.ADMIN_PAPER_ORDER_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.ADMIN_PAPER_ORDER_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const adminLiveOrderData =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");

      if (Object.keys(payload).length > 0) {
        axios
          .post(`${API_URL}/position/adminliveorder/`, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch({
                type: actionTypes.GET_ADMIN_LIVE_ORDER_SUCCESS,
                payload: res.data,
              });
              resolve(res.data);
            } else {
              dispatch({
                type: actionTypes.GET_ADMIN_LIVE_ORDER_FAIL,
              });
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              dispatch({
                type: actionTypes.GET_ADMIN_LIVE_ORDER_FAIL,
              });
            } else if (error?.response?.status === 401) {
              generatePopup("error", "Token is invalid or expired.");
              localStorage.clear();
              window.location.replace("/");
            }
          });
      } else {
        axios
          .get(`${API_URL}/position/adminliveorder/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              dispatch({
                type: actionTypes.GET_ADMIN_LIVE_ORDER_SUCCESS,
                payload: res.data,
              });
              resolve(res);
            } else {
              dispatch({
                type: actionTypes.GET_ADMIN_LIVE_ORDER_FAIL,
              });
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              dispatch({
                type: actionTypes.GET_ADMIN_LIVE_ORDER_FAIL,
              });
            } else if (error?.response?.status === 401) {
              generatePopup("error", "Token is invalid or expired.");
              localStorage.clear();
              window.location.replace("/");
            }
          });
      }
    });
  };

export const todayDashboardCount = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.GET_TODAY_DASHBOARD_COUNT_INIT,
    });
    axios
      .get(`${API_URL}/auth/todaycount/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_TODAY_DASHBOARD_COUNT_SUCCESS,
            payload: res.data,
          });

          resolve(res);
        } else {
          dispatch({
            type: actionTypes.GET_TODAY_DASHBOARD_COUNT_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_TODAY_DASHBOARD_COUNT_FAIL,
          });
        } else if (error.response.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const dashboardCount = (payload) => (dispatch) => {
  return new Promise((resolve, resject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.GET_DASHBOARD_COUNT_INIT,
    });
    axios
      .get(`${API_URL}/auth/count/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_DASHBOARD_COUNT_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.GET_DASHBOARD_COUNT_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_DASHBOARD_COUNT_FAIL,
          });
        } else if (error.response.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const getAdminPlData =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");

      axios
        .post(`${API_URL}/position/adminprofitdetails/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.GET_ADMIN_PL_REPORT_SUCCESS,
              payload: res.data,
            });
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.GET_ADMIN_PL_REPORT_FAIL,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.GET_ADMIN_PL_REPORT_FAIL,
            });
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const getAdminPlPaperData =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");

      axios
        .post(`${API_URL}/position/adminpaperprofitdetails/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.GET_ADMIN_PL_PAPER_REPORT_SUCCESS,
              payload: res.data,
            });
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.GET_ADMIN_PL_PAPER_REPORT_FAIL,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.GET_ADMIN_PL_PAPER_REPORT_FAIL,
            });
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const getIndicatorsData =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");

      axios
        .post(`${API_URL}/auth/indicatorview/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.GET_INDICATORS_SUCCESS,
              payload: res.data,
            });
            resolve(res.data);
          } else {
            dispatch({
              type: actionTypes.GET_INDICATORS_FAIL,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.GET_INDICATORS_FAIL,
            });
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const getSocketIndicatorsData = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.GET_INDICATORS_DATA_SOCKET_SUCCESS,
      payload: payload,
    });
    resolve();
  });
};

export const getPortfolioIndicatorsData = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.GET_PORTOFOLIO_INDICATORS_DATA_SOCKET_SUCCESS,
      payload: payload,
    });
    resolve();
  });
};

export const addIndicatorsData =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");

      axios
        .post(`${API_URL}/indicator/indicatorresult/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.ADD_PORTFOLIO_DATA_SUCCESS,
              payload: res.data,
            });
            resolve(res);
            generatePopup("success", "Data added to portfolio!");
          } else {
            dispatch({
              type: actionTypes.ADD_PORTFOLIO_DATA_FAIL,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.ADD_PORTFOLIO_DATA_FAIL,
            });
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const removeIndicatorsData =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");

      axios
        .put(`${API_URL}/indicator/indicatorresult/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.REMOVE_PORTFOLIO_DATA_SUCCESS,
              payload: res.data,
            });
            resolve(res);
            generatePopup("success", "Data removed from portfolio!");
          } else {
            dispatch({
              type: actionTypes.REMOVE_PORTFOLIO_DATA_FAIL,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.REMOVE_PORTFOLIO_DATA_FAIL,
            });
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const getSingleIndicatorData =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");

      axios
        .post(`${API_URL}/auth/indicatordataview/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.GET_SINGLE_INDICATORS_SUCCESS,
              payload: res.data,
            });
            resolve(res.data);
          } else {
            dispatch({
              type: actionTypes.GET_SINGLE_INDICATORS_FAIL,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.GET_SINGLE_INDICATORS_FAIL,
            });
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const getBankNiftyDetails = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/indicator/getBankniftyDetails/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_BANKNIFTY_DETAILS_SUCCESS,
            payload: res.data,
          });
          resolve(res.data);
        } else {
          dispatch({
            type: actionTypes.GET_BANKNIFTY_DETAILS_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_BANKNIFTY_DETAILS_FAIL,
          });
        } else if (error?.response?.status === 401) {
          // generatePopup("error", "Token is invalid or expired.");
          // localStorage.clear();
          // window.location.replace("/");
        }
      });
  });
};

export const getUserBankNifty = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/indicator/useraddBanknifty/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_USER_BANKNIFTY_SUCCESS,
            payload: res.data,
          });
          resolve(res.data);
        } else {
          dispatch({
            type: actionTypes.GET_USER_BANKNIFTY_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.GET_USER_BANKNIFTY_FAIL,
          });
        } else if (error?.response?.status === 401) {
          // generatePopup("error", "Token is invalid or expired.");
          // localStorage.clear();
          // window.location.replace("/");
        }
      });
  });
};

export const PutStrstegydata = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .post(`${API_URL}/indicator/useraddBanknifty/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.ADD_USER_BANKNIFTY_SUCCESS,
            payload: res.data,
          });
          resolve(res.data);
        } else {
          dispatch({
            type: actionTypes.ADD_USER_BANKNIFTY_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.ADD_USER_BANKNIFTY_FAIL,
          });
        } else if (error?.response?.status === 401) {
          // generatePopup("error", "Token is invalid or expired.");
          // localStorage.clear();
          // window.location.replace("/");
        }
      });
  });
};
