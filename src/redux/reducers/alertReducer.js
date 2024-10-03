import * as actionTypes from "../actionTypes";

const initState = {
  loading: false,
  adminAlertData: [],
  indicatorData: {},
  alertSymbols: [],
  futureData: [],
  optionExpiryData: [],
  optionStrikeData: [],
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALERT_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        adminAlertData: action.payload,
      };
    case actionTypes.GET_ALERT_INIT:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_SEGMENT_SYMBOL_ALERT_SUCCESS:
      return {
				...state,
				loading: false,
				error: '',
				alertSymbols: action.payload,
			};

    case actionTypes.GET_INDICATORS_SUCCESS:
      return {
				...state,
				loading: false,
				indicatorData: action.payload,
			};

    case actionTypes.FUTURE_ALERT_DATA_SUCCESS:
      return {
				...state,
				loading: false,
				futureData: action.payload,
			};

    case actionTypes.OPTION_ALERT_DATA_SUCCESS:
      return {
				...state,
				loading: false,

				optionExpiryData: action.payload,
			};
    case actionTypes.OPTION_STRIKE_DATA_SUCCESS:
      return {
				...state,
				loading: false,
				optionStrikeData: action.payload,
			};
    default:
      return state;
  }
};

export default store;
