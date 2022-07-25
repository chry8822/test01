import { combineReducers } from 'redux';
import {legacy_createStore as createStore} from 'redux'
import todoReducer from './reducers/todos';
import { persistReducer,persistStore  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// persistReducer = 리덕스 상태를 로컬,세션 스토리지에 저장 (상태보존)

// localStorage의 key, value
const persistConfig = {
    key: "root", // localStorage 에 저장될 때의 key값
    storage
}

const rootReducer = combineReducers({
    todoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(persistedReducer);
export const persistor = persistStore(store)
