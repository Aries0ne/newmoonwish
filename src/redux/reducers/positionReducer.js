import * as actionTypes from "../actionTypes";

const initState = {
  paperprofitdetails: {},
  profitdetails: {},
  paperorderdetails: [],
  liveorderdetails: [],
  signaldetails: [],
  error: "",
  livePositions: [],
  liveTradeDetails: [],
  watchlistName : [],
  adminwatchlistName : [],
  watchname1: "",
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PAPER_PROFIT_DETAILS_INIT:
      return {
        ...state,
        error: "",
      };
      case 'SET_WATCH_NAME':
      return {
        ...state,
        watchname1: action.payload,  // Update the global watchname
      };
      case actionTypes.ADMIN_GET_WATCHLIST_NAME:
        return {
          ...state,
          adminwatchlistName: action.payload,
          error: "",
        };
        case actionTypes.ADMIN_GET_WATCHLIST_NAME_FAIL:
          return {
            ...state,
      
            error: "",
          };
      
      case actionTypes.GET_WATCHLIST_NAME:
        return {
          ...state,
          watchlistName: action.payload,
          error: "",
        };
        case actionTypes.GET_WATCHLIST_NAME_FAIL:
          return {
            ...state,
      
            error: "",
          };
    case actionTypes.PAPER_PROFIT_DETAILS_SUCCESS:
      return {
        ...state,
        paperprofitdetails: action.payload,
        error: "",
      };
    case actionTypes.PAPER_PROFIT_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.PROFIT_DETAILS_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.PROFIT_DETAILS_SUCCESS:
      return {
        ...state,
        profitdetails: action.payload,
        error: "",
      };
    case actionTypes.PROFIT_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.PAPER_ORDER_DETAILS_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.PAPER_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        paperorderdetails: action.payload,
        error: "",
      };
    case actionTypes.PAPER_ORDER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.LIVE_ORDER_DETAILS_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.LIVE_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        liveorderdetails: action.payload,
        error: "",
      };
    case actionTypes.LIVE_ORDER_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.SIGNAL_DETAILS_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.SIGNAL_DETAILS_SUCCESS:
      return {
        ...state,
        signaldetails: action.payload,
        error: "",
      };
    case actionTypes.SIGNAL_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_LIVE_POSITION_SUCCESS:
      return {
        ...state,
        livePositions: action.payload,
      };

    case actionTypes.GET_LIVE_TRADE_DETAILS_SUCCESS:
      return {
        ...state,
        liveTradeDetails: action.payload,
      };
    default:
      return state;
  }
};

export default store;
