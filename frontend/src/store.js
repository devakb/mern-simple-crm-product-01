import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { pageLoadingReducer } from "./reducers/pageLoadingReducer";

const reducers = combineReducers({
  pageLoadingStatus: pageLoadingReducer,
});

let initialState = {};

const middlewares = [thunk];

let store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
