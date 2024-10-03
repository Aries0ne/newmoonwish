import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import adminReducer from "../redux/reducers/adminReducer";
import alertReducer from "../redux/reducers/alertReducer";
import athReducer from "../redux/reducers/athReducer";
import authReducers from "../redux/reducers/authReducer";
import brokerReducers from "../redux/reducers/brokerReducer";
import commonReducers from "../redux/reducers/commonReducer";
import confirmReducer from "../redux/reducers/confirmReducer";
import positionReducer from "../redux/reducers/positionReducer";
import strategyReducer from "../redux/reducers/strategyReducer";

const rootReducer = combineReducers({
  Auth: authReducers,
  Broker: brokerReducers,
  Position: positionReducer,
  CommonReducer: commonReducers,
  Admin: adminReducer,
  Alert: alertReducer,
  Ath: athReducer,
  Strategy: strategyReducer,
  Confirm: confirmReducer,
});

const logger = (store) => (next) => (action) => {
  let result = next(action);
  console.groupEnd();
  return result;
};

const monitorReducerEnhancer =
  (createStore) => (reducer, initialState, enhancer) => {
    const monitoredReducer = (state, action) => {
      const start = performance.now();
      const newState = reducer(state, action);
      const end = performance.now();
      const diff = Math.round(end - start);

      return newState;
    };

    return createStore(monitoredReducer, initialState, enhancer);
  };

const intialState = {};

const middlewares = [logger, thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = compose(...enhancers);

const store = createStore(rootReducer, intialState, composedEnhancers);

export default store;
