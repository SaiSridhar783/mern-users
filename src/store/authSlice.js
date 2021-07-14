import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postThunk } from "../shared/utils/thunk-helper";

const authSignup = createAsyncThunk(
    "auth/signup",
    postThunk("http://localhost:9001/api/users/signup", axios)
);

const authLogin = createAsyncThunk(
    "auth/login",
    postThunk("http://localhost:9001/api/users/login", axios)
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: { isLoggedIn: false },
    },
    reducers: {
        authReset: (state) => {
            state = {
                login: { isLoggedIn: false },
            };
            return state;
        },
    },
    extraReducers: {
        [authSignup.pending]: (state, action) => {
            state.loading = true;
            state.user = null;
        },
        [authSignup.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
        },
        [authSignup.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        },
        [authLogin.pending]: (state, action) => {
            state.login.loading = true;
            state.login.isLoggedIn = false;
        },
        [authLogin.fulfilled]: (state, action) => {
            state.login.loading = false;
            state.login.isLoggedIn = true;
            state.login.error = null;
            state.login.user = action.payload;
        },
        [authLogin.rejected]: (state, action) => {
            state.login.loading = false;
            state.login.isLoggedIn = false;
            state.login.error = action.payload;
        },
    },
});

export const authActions = { ...authSlice.actions, authSignup, authLogin };

export default authSlice.reducer;