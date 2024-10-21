import { toast } from "react-toastify";
import * as actionTypes from "../actionTypes";
import axios from "axios";
import { API_URL } from "../../config";
import { generatePopup } from "../../utils/popup";

export const paperProfitDetails = (payload) => (dispatch) => {
  return Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.PAPER_PROFIT_DETAILS_INIT,
    });
    axios
      .post(`${API_URL}/position/paperprofitdetails/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.PAPER_PROFIT_DETAILS_SUCCESS,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.PAPER_PROFIT_DETAILS_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.PAPER_PROFIT_DETAILS_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const profitDetails = (payload) => (dispatch) => {
  return Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.PROFIT_DETAILS_INIT,
    });
    axios
      .post(`${API_URL}/position/profitdetails/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.PROFIT_DETAILS_SUCCESS,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.PROFIT_DETAILS_FAIL,
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.PROFIT_DETAILS_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const paperOrderDetails = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.PAPER_ORDER_DETAILS_INIT,
    });
    axios
      .get(`${API_URL}/position/paperorderdetails/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.PAPER_ORDER_DETAILS_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.PAPER_ORDER_DETAILS_FAIL,
            payload: "Data Not Found",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.PAPER_ORDER_DETAILS_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const liveOrderDetails = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.LIVE_ORDER_DETAILS_INIT,
    });
    axios
      .get(`${API_URL}/position/liveorderdetails/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.LIVE_ORDER_DETAILS_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.LIVE_ORDER_DETAILS_FAIL,
            payload: "Data Not Found",
          });
        }
      })
      .catch((error) => {
        if (error.response.status) {
          dispatch({
            type: actionTypes.LIVE_ORDER_DETAILS_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const signalDetails = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.SIGNAL_DETAILS_INIT,
    });
    axios
      .post(`${API_URL}/position/signaldetails/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.SIGNAL_DETAILS_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.SIGNAL_DETAILS_FAIL,
            payload: "Data Not Found",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          dispatch({
            type: actionTypes.SIGNAL_DETAILS_FAIL,
          });
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const getLivePositions = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.GET_LIVE_POSITION_SUCCESS,
      payload: payload,
    });
    resolve();
  });
};

export const createPosition =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      dispatch({
        type: actionTypes.SIGNAL_DETAILS_INIT,
      });
      axios
        .post(`${API_URL}/position/placemanualorder/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.CREATE_POSITION_SUCCESS,
              payload: res.data,
            });
            generatePopup("success", "Position created successfully.");
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.CREATE_POSITION_FAIL,
            });
            generatePopup("error", "Failed to create position.");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.CREATE_POSITION_FAIL,
            });
            generatePopup("error", "Failed to create position.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const squareOffLivePosition =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      dispatch({
        type: actionTypes.SIGNAL_DETAILS_INIT,
      });
      axios
        .post(`${API_URL}/position/closeorder/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.SQUARE_OFF_LIVE_POSITION_SUCCESS,
              payload: res.data,
            });
            generatePopup("success", "Position closed successfully.");
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.SQUARE_OFF_LIVE_POSITION_FAIL,
            });
            generatePopup("error", "Failed to close position.");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.SQUARE_OFF_LIVE_POSITION_FAIL,
            });
            generatePopup("error", "Failed to close position.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const liveTradeDetails = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");
    dispatch({
      type: actionTypes.LIVE_ORDER_DETAILS_INIT,
    });
    axios
      .get(`${API_URL}/position/tradedetails1/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.GET_LIVE_TRADE_DETAILS_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.GET_LIVE_TRADE_DETAILS_FAIL,
          });
          generatePopup("error", "Failed to get live trade details.");
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
          dispatch({
            type: actionTypes.GET_LIVE_TRADE_DETAILS_FAIL,
          });
          generatePopup("error", "Failed to get live trade details.");
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};




export const squareOffAllLive = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/position/closeallliveorder/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.SQUARE_OFF_ALL_LIVE_POPSITION_SUCCESS,
            payload: res.data,
          });
          generatePopup("success", "All position closed successfully.");

          resolve(res);
        } else {
          dispatch({
            type: actionTypes.SQUARE_OFF_ALL_LIVE_POPSITION_FAIL,
          });
          generatePopup("error", "Failed to square off positions.");
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
          dispatch({
            type: actionTypes.SQUARE_OFF_ALL_LIVE_POPSITION_FAIL,
          });
          generatePopup("error", "Failed to square off positions.");
        } else if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        }
      });
  });
};

export const closePosition =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      dispatch({
        type: actionTypes.POST_POSITION_CLOSEL_INIT,
      });
      axios
        .post(`${API_URL}/position/closelimit/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.POST_POSITION_CLOSEL_SUCCESS,
              payload: res.data,
            });
            generatePopup("success", "Position close successfully.");
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.POST_POSITION_CLOSEL_FAIL,
            });
            generatePopup("error", "Failed to close position.");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.POST_POSITION_CLOSEL_FAIL,
            });
            generatePopup("error", "Failed to close position.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const modifyOrder =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      dispatch({
        type: actionTypes.POST_POSITION_MODIFY_ORDER_INIT,
      });
      axios
        .post(`${API_URL}/position/modifyorder/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.POST_POSITION_MODIFY_ORDER_SUCCESS,
              payload: res.data,
            });
            generatePopup("success", "Order Edit successfully.");
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.POST_POSITION_MODIFY_ORDER_FAIL,
            });
            generatePopup("error", "Failed to Edit Order.");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.POST_POSITION_CLOSEL_FAIL,
            });
            generatePopup("error", "Failed to Edit Order.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

export const deletePositionOrder =
  (payload = {}) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      dispatch({
        type: actionTypes.POST_POSITION_CANCEL_ORDER_INIT,
      });
      axios
        .post(`${API_URL}/position/cancelorder/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.POST_POSITION_CANCEL_ORDER_SUCCESS,
              payload: res.data,
            });
            generatePopup("success", "Order Delete successfully.");
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.POST_POSITION_CANCEL_ORDER_FAIL,
            });
            generatePopup("error", "Failed to Delete Order.");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.POST_POSITION_CANCEL_ORDER_FAIL,
            });
            generatePopup("error", "Failed to Delete Order.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };







  // get watchlist name


  export const getWatchlistName = (payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      dispatch({
        type: actionTypes.GET_WATCHLIST_NAME,
      });
      axios
        .get(`${API_URL}/position/createwatchlistname/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.GET_WATCHLIST_NAME,
              payload: res.data,
            });
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.GET_WATCHLIST_NAME_FAIL,
            });
            generatePopup("error", "Failed to get live trade details.");
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            dispatch({
              type: actionTypes.GET_WATCHLIST_NAME_FAIL,
            });
            generatePopup("error", "Failed to get live trade details.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };




  export const createWatchlistName = (payload = {}) => (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      
      axios
        .post(`${API_URL}/position/createwatchlistname/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
							type: actionTypes.CREATE_WATCHLIST_NAME,
							payload: res.data,
						});
            generatePopup("success", "New Watchlist created.");
            
          } else {
            
            generatePopup("error", "Failed to create new watchlist.");
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            
            generatePopup("error", "Failed to create new watchlist.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };









  export const admingetWatchlistName = (payload) => (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      dispatch({
        type: actionTypes.ADMIN_GET_WATCHLIST_NAME,
      });
      axios
        .get(`${API_URL}/position/admincreatewatchlistname/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.ADMIN_GET_WATCHLIST_NAME,
              payload: res.data,
            });
            resolve(res);
          } else {
            dispatch({
              type: actionTypes.ADMIN_GET_WATCHLIST_NAME_FAIL,
            });
            generatePopup("error", "Failed to get live trade details.");
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            dispatch({
              type: actionTypes.ADMIN_GET_WATCHLIST_NAME_FAIL,
            });
            generatePopup("error", "Failed to get live trade details.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };

  export const setWatchName = (name) => ({
    type: 'SET_WATCH_NAME',
    payload: name,
  });


  export const admincreateWatchlistName = (payload = {}) => (dispatch) => {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      
      axios
        .post(`${API_URL}/position/admincreatewatchlistname/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
							type: actionTypes.ADMIN_CREATE_WATCHLIST_NAME,
							payload: res.data,
						});
            generatePopup("success", "New Watchlist created.");
            
          } else {
            
            generatePopup("error", "Failed to create new watchlist.");
          }
        })
        .catch((error) => {
          if (error.response.status == 400) {
            
            generatePopup("error", "Failed to create new watchlist.");
          } else if (error?.response?.status === 401) {
            generatePopup("error", "Token is invalid or expired.");
            localStorage.clear();
            window.location.replace("/");
          }
        });
    });
  };