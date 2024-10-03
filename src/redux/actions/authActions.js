import axios from "axios";
import { generatePopup } from "../../utils/popup";
import * as actionTypes from "../actionTypes";
import { API_URL } from "../../config";

export const sendOtp = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.OTP_SENT_INIT,
    });
    console.log("send OTP called axios");
    axios
      .post(`${API_URL}/auth/otp/`, payload)
      .then((res) => {
        console.log("res", res);
        if (res.status == 200) {
          dispatch({
            type: actionTypes.OTP_SENT_SUCCESS,
            payload: res.data,
          });
          resolve(res?.data);
        } else {
          dispatch({
            type: actionTypes.OTP_SENT_FAIL,
            payload: res.data?.message || "Failed to sent otp",
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: actionTypes.OTP_SENT_FAIL,
          payload: typeof e == "string" ? e : "Failed to otp",
        });
      });
  });
};

export const sendContactMessage = async (payload) => {
  const token = localStorage.getItem("token");
  return axios
    .post(`${API_URL}/auth/sendmail/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => null);
};

export const getTutorial = async (payload) => {
  const token = localStorage.getItem("token");
  return axios
    .get(`${API_URL}/auth/uploadtutorial/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("data in get tutorial ", res.data);
      return res.data;
    })
    .catch((err) => {
      // generatePopup('error', 'Something went wrong');
      return null;
    });
};

export const uploadTutorial = async (payload) => {
  const token = localStorage.getItem("token");
  return axios
    .post(`${API_URL}/auth/uploadtutorial/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.data?.status) {
        generatePopup(
          "success",
          res?.data?.message || "Link uploaded successfully"
        );
      }

      return res.data;
    })
    .catch((err) => {
      generatePopup("error", "Something went wrong");
      return null;
    });
};

export const editTutorial = async (payload) => {
  const token = localStorage.getItem("token");

  return axios
    .put(`${API_URL}/auth/uploadtutorial/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.data?.status) {
        generatePopup(
          "success",
          res?.data?.message || "Link updated successfully"
        );
      }

      return res.data;
    })
    .catch((err) => {
      generatePopup("error", "Something went wrong");
      return null;
    });
};

export const deleteTutorial = async (payload) => {
  const token = localStorage.getItem("token");
  return axios
    .post(`${API_URL}/auth/deletetutorial/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res?.data?.status === true) {
        generatePopup(
          "success",
          res?.data?.message || "Link Deleted successfully"
        );
      }
      return res.data;
    })
    .catch((err) => {
      generatePopup("error", "Something went wrong");
      return null;
    });
};

export const verifyOtp = (payload, navigate) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.OTP_VERIFY_INIT,
    });
    axios
      .post(`${API_URL}/auth/login/`, payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionTypes.OTP_VERIFY_SUCCESS,
            payload: res.data,
          });
          resolve(res);
          window.location.replace("/");
        } else {
          dispatch({
            type: actionTypes.OTP_VERIFY_FAIL,
            payload: res.data?.message || "Failed to verify otp",
          });
        }
      })
      .catch((error) => {
        if (error.response.data.otp === "False") {
          dispatch({
            type: actionTypes.OTP_VERIFY_FAIL,
            payload: typeof error == "string" ? error : "Failed to verify otp",
          });
          resolve(error);
          generatePopup("error", error?.response?.data?.message);
        } else {
          dispatch({
            type: actionTypes.OTP_VERIFY_FAIL,
            payload: typeof error == "string" ? error : "User not registered",
          });
          resolve(error);
          generatePopup("error", error?.response?.data?.message);
        }
      });
  });
};

export const getAboutUs = async (payload) => {
  const token = localStorage.getItem("token");

  return axios
    .get(`${API_URL}/auth/aboutus/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
};

export const getPrivacyPolicy = async () => {
  const token = localStorage.getItem("token");

  return axios
    .get(`${API_URL}/auth/privacypolicy/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("error", err);
      return null;
    });
};

export const authSignup = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.AUTH_SIGNUP_INIT,
    });
    axios
      .post(`${API_URL}/auth/register/`, payload)
      .then((res) => {
        if (res.status == 201) {
          dispatch({
            type: actionTypes.AUTH_SIGNUP_SUCCESS,
            payload: res.data,
          });
          generatePopup("success", "User register succesfully.");
          window.location.replace("/");
          resolve(res);
        } else {
          dispatch({
            type: actionTypes.AUTH_SIGNUP_FAIL,
            payload: res.data?.message || "Failed to signup user",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("error.response :>> ", error.response);
          dispatch({
            type: actionTypes.AUTH_SIGNUP_FAIL,
            payload:
              typeof error == "string" ? error : "User already registered!",
          });
          resolve(error);
          generatePopup("error", error?.response?.data?.email[0]);
        }
      });
  });
};

export const getProfile = () => (dispatch) => {
  const token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.AUTH_PROFILE_INIT,
    });
    axios
      .get(`${API_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          dispatch({
            type: actionTypes.AUTH_PROFILE_SUCCESS,
            payload: res?.data,
          });
          resolve(res?.data);
        } else {
          dispatch({
            type: actionTypes.AUTH_PROFILE_FAIL,
            payload: res?.data?.message || "Failed to get profile!",
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          generatePopup("error", "Token is invalid or expired.");
          localStorage.clear();
          window.location.replace("/");
        } else {
          dispatch({
            type: actionTypes.AUTH_PROFILE_FAIL,
            payload: error?.response?.data?.message || "Something went wrong",
          });
        }
      });
  });
};

export const updateProfile =
  (payload = {}) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      dispatch({
        type: actionTypes.AUTH_PROFILE_INIT,
      });
      axios
        .put(`${API_URL}/auth/user/`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.AUTH_PROFILE_UPDATE_SUCCESS,
              payload: res?.data,
            });
            dispatch(getProfile());
            generatePopup("success", "Profile update succesfully.");
            resolve(res?.data);
          } else {
            dispatch({
              type: actionTypes.AUTH_PROFILE_UPDATE_FAIL,
              payload: res?.data?.message || "Failed to update profile!",
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.AUTH_PROFILE_UPDATE_FAIL,
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

export const getFund =
  (payload = {}) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    return new Promise((resolve, reject) => {
      dispatch({
        type: actionTypes.GET_FUND_INIT,
      });
      axios
        .get(`${API_URL}/auth/fund/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: actionTypes.GET_FUND_SUCCESS,
              payload: res?.data,
            });
            dispatch(getProfile());
            resolve(res?.data);
          } else {
            dispatch({
              type: actionTypes.GET_FUND_FAIL,
              payload: res?.data?.message || "Failed to update profile!",
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            dispatch({
              type: actionTypes.GET_FUND_FAIL,
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
