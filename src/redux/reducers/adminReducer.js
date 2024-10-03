import * as actionTypes from "../actionTypes";

const initState = {
  loading: false,
  adminliveposition: [],
  adminpaperposition: [],
  error: "",
  liveOrderData: [],
  paperOrderData: [],
  todaycount: {},
  dashboardcount: {},
  adminPlReport: [],
  adminAlertData: [],
  indicatorData: [],
  singleIndicatorData: [],
  alertSymbols: [],
  indicatorDataSocket: {},
  indicatorPortfolioDataSocket: {},
  bankniftyDetails: [],
  userBankNifty: [],
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_LIVE_POSITION_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.ADMIN_LIVE_POSITION_SUCCESS:
      return {
        ...state,
        adminliveposition: action.payload,
        error: "",
      };
    case actionTypes.ADMIN_LIVE_POSITION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.ADMIN_PAPER_POSITION_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.ADMIN_PAPER_POSITION_SUCCESS:
      return {
        ...state,
        adminpaperposition: action.payload,
        error: "",
      };
    case actionTypes.ADMIN_PAPER_POSITION_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_ADMIN_LIVE_ORDER_SUCCESS:
      return {
        ...state,
        error: "",
        liveOrderData: action.payload,
      };

    case actionTypes.GET_ADMIN_PAPER_ORDER_SUCCESS:
      return {
        ...state,
        error: "",
        paperOrderData: action.payload,
      };

    case actionTypes.GET_TODAY_DASHBOARD_COUNT_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.GET_TODAY_DASHBOARD_COUNT_SUCCESS:
      return {
        ...state,
        todaycount: action.payload,
        error: "",
      };
    case actionTypes.GET_TODAY_DASHBOARD_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_DASHBOARD_COUNT_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.GET_DASHBOARD_COUNT_SUCCESS:
      return {
        ...state,
        dashboardcount: action.payload,
        error: "",
      };
    case actionTypes.GET_DASHBOARD_COUNT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_ADMIN_PL_REPORT_SUCCESS:
      return {
        ...state,
        error: "",
        adminPlReport: action.payload,
      };

    case actionTypes.GET_ALERT_ADMIN_SUCCESS:
      return {
        ...state,
        error: "",
        adminAlertData: action.payload,
      };

    case actionTypes.GET_SEGMENT_SYMBOL_ALERT_SUCCESS:
      return {
        ...state,
        error: "",
        alertSymbols: action.payload,
      };

    case actionTypes.GET_INDICATORS_SUCCESS:
      return {
        ...state,
        indicatorData: action.payload,
      };

    case actionTypes.GET_SINGLE_INDICATORS_SUCCESS:
      return {
        ...state,
        singleIndicatorData: action.payload,
      };
    case actionTypes.GET_INDICATORS_DATA_SOCKET_SUCCESS:
      return {
        ...state,
        indicatorDataSocket: action.payload,
      };

    case actionTypes.GET_PORTOFOLIO_INDICATORS_DATA_SOCKET_SUCCESS:
      return {
        ...state,
        indicatorPortfolioDataSocket: action.payload,
      };
    case actionTypes.GET_BANKNIFTY_DETAILS_SUCCESS:
      return {
        ...state,
        bankniftyDetails: action.payload,
      };
    case actionTypes.GET_USER_BANKNIFTY_SUCCESS:
      return {
        ...state,
        userBankNifty: action.payload,
      };

    default:
      return state;
  }
};

export default store;
