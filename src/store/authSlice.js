import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postThunk } from "../shared/utils/thunk-helper";

const instance = axios.create({
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const authSignup = createAsyncThunk(
    "auth/signup",
    postThunk(`${process.env.REACT_APP_BASE_URL}/users/signup`, instance)
);

const authLogin = createAsyncThunk(
    "auth/login",
    postThunk(`${process.env.REACT_APP_BASE_URL}/users/login`, axios)
);

const initialState = {
    login: { isLoggedIn: false },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authReset: (state) => {
            state = initialState;
            localStorage.removeItem("userData");
            return state;
        },
        localLogin: (state, action) => {
            state.login = { ...action.payload, isLoggedIn: true };
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
            state.login.token = null;
        },
        [authLogin.fulfilled]: (state, action) => {
            state.login.loading = false;
            state.login.error = null;
            state.login.userId = action.payload.userId;
            state.login.token = action.payload.token;
            state.login.isLoggedIn = !!state.login.token;

            localStorage.setItem(
                "userData",
                JSON.stringify({
                    userId: state.login.userId,
                    token: state.login.token,
                    expiration: new Date(
                        new Date().getTime() + 1000 * 60 * 60
                    ).toISOString(),
                })
            );
        },
        [authLogin.rejected]: (state, action) => {
            state.login.loading = false;
            state.login.isLoggedIn = false;
            state.login.error = action.payload;
            state.login.token = null;
        },
    },
});

export const authActions = { ...authSlice.actions, authSignup, authLogin };

export default authSlice.reducer;
