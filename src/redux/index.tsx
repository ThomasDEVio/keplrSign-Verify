//@ts-nocheck

import { combineReducers } from "redux";

import Counter from "./reducers/count";

const rootReducer = combineReducers({
  Counter,
})

export default rootReducer