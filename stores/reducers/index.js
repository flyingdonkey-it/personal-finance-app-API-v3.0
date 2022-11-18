
import { combineReducers } from "@reduxjs/toolkit";
import userTransactionsReducer from "./userTransactionsReducers";

const rootReducer = combineReducers( {
    userTransactions: userTransactionsReducer
});

export default rootReducer;