import { combineReducers, legacy_createStore as createStore } from "redux";

import { reducer as todoReducer } from "./reducer";
// import { reducer as userReducer } from "./user";

const rootReducer = combineReducers({
  todoReducer,
});

export const store = createStore(rootReducer);