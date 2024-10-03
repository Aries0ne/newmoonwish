import * as actionTypes from "../actionTypes";

const initState = {
  loading: false,
  authProfile: [],
  fundData: {},
  error: "",
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_INIT:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.OTP_SENT_INIT:
      return {
        ...state,
      };
    case actionTypes.OTP_SENT_SUCCESS:
      return {
        ...state,
        error: "",
      };
    case actionTypes.OTP_SENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.OTP_VERIFY_INIT:
      return {
        ...state,
      };
    case actionTypes.OTP_VERIFY_SUCCESS:
      return {
        ...state,
        error: "",
      };
    case actionTypes.OTP_VERIFY_FAIL:
      return {
        ...state,
        error: action?.payload,
      };
    case actionTypes.AUTH_SIGNUP_INIT:
      return {
        ...state,
      };
    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        error: "",
      };
    case actionTypes.AUTH_SIGNUP_FAIL:
      return {
        ...state,
        error: action?.payload,
      };
    case actionTypes.AUTH_PROFILE_INIT:
      return {
        ...state,
      };
    case actionTypes.AUTH_PROFILE_SUCCESS:
      return {
        ...state,
        authProfile: action.payload,
      };
    case actionTypes.AUTH_PROFILE_FAIL:
      return {
        ...state,
        error: action?.payload,
      };
    case actionTypes.GET_FUND_SUCCESS:
      return {
        ...state,
        fundData: action?.payload,
      };
    default:
      return state;
  }
};

export default store;
