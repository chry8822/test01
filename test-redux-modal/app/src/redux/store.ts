import { combineReducers,  legacy_createStore as createStore } from "redux";
import modal from "./reducers/modal/modal";

const rootReducer = combineReducers({
    modal
})

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer)