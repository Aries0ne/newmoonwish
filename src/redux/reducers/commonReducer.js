import * as actionTypes from "../actionTypes";

const initState = {
  loading: false,
  error: "",
  liveFeedData: [],
  watchListData: [],
  watchListLive: [],
  AdminLive: [],
  overAllProfitLoss: {},
  addsymboldata:[],
};

const store = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.LIVE_FEED_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        liveFeedData: action?.payload,
      };

    case actionTypes.GET_OVERALL_PROFIT_LOSS_SUCCESS:
      return {
        ...state,
        overAllProfitLoss: action?.payload,
      };

    case actionTypes.GET_WATCH_LIST_DATA_INIT:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.GET_WATCH_LIST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        watchListData: action?.payload,
      };

    case actionTypes.ADD_SYMBOL_DATA_SOCKET:
      console.log('Updating Redux addsymboldata with:', action.payload);
      return {
        ...state,
        
        addsymboldata: action?.payload,
      };

    case actionTypes.GET_WATCH_LIST_DATA_FAIL:
      return {
        ...state,
        loading: false,
      };

    case actionTypes.GET_WATCH_LIST_LIVE_DATA_SUCCESS:
      return {
        ...state,
        watchListLive: action?.payload,
      };

      case actionTypes.ADMIN_GET_WATCH_LIST_LIVE_DATA_SUCCESS:
        console.log("Reducer Payload:", action.payload);
      return {
        
        ...state,
        AdminLive: action?.payload,
      };

    default:
      return state;
  }
};

export default store;
