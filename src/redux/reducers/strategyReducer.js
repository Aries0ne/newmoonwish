import * as actionTypes from "../actionTypes";

const initState = {
  error: "",
  strategyData: [],
  ourStrategy: [],
  strategyCode: {},
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_STRATEGY_INIT:
      return {
        ...state,
        error: "",
      };
    case actionTypes.CREATE_STRATEGY_SUCCESS:
      return {
        ...state,
        paperprofitdetails: action.payload,
        error: "",
      };
    case actionTypes.CREATE_STRATEGY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_STRATEGY_DATA_SUCCESS:
      return {
        ...state,
        strategyData: action.payload,
      };
    case actionTypes.GET_USER_STRATEGY_DETAILS_SUCCESS:
      return {
        ...state,
        ourStrategy: action.payload,
      };

    case actionTypes.GET_STRATEGY_CODE_SUCCESS:
      return {
        ...state,
        strategyCode: action.payload,
      };

    default:
      return state;
  }
};

export default store;
