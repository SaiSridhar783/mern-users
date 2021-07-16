import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
    // Add reducers here
    reducer: {
        auth: authSlice,
    },
    devTools: process.env.REACT_APP_DEBUG === "true",
});

export default store;
