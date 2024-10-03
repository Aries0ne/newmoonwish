import * as actionTypes from "../actionTypes";

const initState = {
    brokerstatus: {},
    loading: false,
    error: "",
};

const store = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ZEBULL_BROKER_INIT:
            return {
                ...state,
                loading: true,
                error: ""
            }
        case actionTypes.ZEBULL_BROKER_SUCCESS:
            return {
                ...state,
                loading: true,
                error: ""
            }
        case actionTypes.ZEBULL_BROKER_FAIL:
            return {
                ...state,
                loading: true,
                error: action?.payload
            }
        case actionTypes.ICICI_BROKER_INIT:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ICICI_BROKER_SUCCESS:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ICICI_BROKER_FAIL:
            return {
                ...state,
                error: action?.payload
            }
        case actionTypes.ANGEL_BROKER_INIT:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ANGEL_BROKER_SUCCESS:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ANGEL_BROKER_FAIL:
            return {
                ...state,
                error: action?.payload
            }
        case actionTypes.ZERODHA_BROKER_INIT:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ZERODHA_BROKER_SUCCESS:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ZERODHA_BROKER_FAIL:
            return {
                ...state,
                error: action?.payload
            }
        case actionTypes.FINVASIA_BROKER_INIT:
            return {
                ...state,
                error: ""
            }
        case actionTypes.FINVASIA_BROKER_SUCCESS:
            return {
                ...state,
                error: ""
            }
        case actionTypes.FINVASIA_BROKER_FAIL:
            return {
                ...state,
                error: action?.payload
            }
        case actionTypes.KOTAK_BROKER_INIT:
            return {
                ...state,
                error: ""
            }
        case actionTypes.KOTAK_BROKER_SUCCESS:
            return {
                ...state,
                error: ""
            }
        case actionTypes.KOTAK_BROKER_FAIL:
            return {
                ...state,
                error: action?.payload
            }
        case actionTypes.ALICE_BROKER_INIT:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ALICE_BROKER_SUCCESS:
            return {
                ...state,
                error: ""
            }
        case actionTypes.ALICE_BROKER_FAIL:
            return {
                ...state,
                error: action?.payload
            }
        case actionTypes.FYERS_BROKER_INIT:
            return {
                ...state,
                error: ""
            }
        case actionTypes.FYERS_BROKER_SUCCESS:
            return {
                ...state,
                error: ""
            }
        case actionTypes.FYERS_BROKER_FAIL:
            return {
                ...state,
                error: action?.payload
            }
        case actionTypes.BROKER_STATUS_INIT:
            return {
                ...state,
                error: ""
            }
        case actionTypes.BROKER_STATUS_SUCCESS:
            return {
                ...state,
                brokerstatus: action.payload,
                error: ""
            }
        case actionTypes.BROKER_STATUS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default store;