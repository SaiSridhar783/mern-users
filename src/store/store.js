import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
    // Add reducers here
    reducer: {
        auth: authSlice,
    },
});

export default store;
