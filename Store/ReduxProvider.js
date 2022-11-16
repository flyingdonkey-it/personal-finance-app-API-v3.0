
import React from 'react'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = [thunk];


let store = configureStore({
    reducer: persistedReducer,
    middlewares: middlewares,
    devTools: process.env.NODE_ENV !== 'production', // to make sure that redux's dev tool is only available when in dev environment.
});

let persistor = persistStore(store);


export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
