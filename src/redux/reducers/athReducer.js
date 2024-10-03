import * as actionTypes from "../actionTypes";

const initState = {
    error: "",
    athData: [],
    athOrderData: {},
    PortfolioData: []
}

const store = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.POST_ATH_INIT:
            return {
                ...state,
                error: "",
            };
        case actionTypes.POST_ATH_SUCCESS:
            return {
                ...state,
                athData: action.payload,
                error: "",
            };
        case actionTypes.POST_ATH_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.POST_ATHORDER_INIT:
            return {
                ...state,
                error: "",
            };
        case actionTypes.POST_ATHORDER_SUCCESS:
            return {
                ...state,
                athOrderData: action.payload,
                error: "",
            };
        case actionTypes.POST_ATHORDER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case actionTypes.GET_ATH_PORTFOLIO_INIT:
            return {
                ...state,
                error: "",
            };
        case actionTypes.GET_ATH_PORTFOLIO_SUCCESS:
            return {
                ...state,
                PortfolioData: action.payload,
                error: "",
            };
        case actionTypes.GET_ATH_PORTFOLIO_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default store;