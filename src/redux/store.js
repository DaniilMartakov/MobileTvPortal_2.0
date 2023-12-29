import { configureStore , combineReducers } from "@reduxjs/toolkit";

import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import userReducer from "./reducer/authReducer";
import infoReducer from "./reducer/infoReducer";
import orderReducer from "./reducer/ordersReducer";
import basketReducer from "./reducer/basketReducer";


const rootReducer = combineReducers({
        user: userReducer,
        info: infoReducer,
        order: orderReducer,
        basket: basketReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const persistedReducer = persistReducer(persistConfig , rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            })
});

export const persistor = persistStore(store)
export default store;

