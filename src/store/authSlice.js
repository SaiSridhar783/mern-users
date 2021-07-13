import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authLogin = createAsyncThunk("authLogin", async (payload, thunkAPI) => {
    try {
        const response = await axios.post(
            "http://localhost:9001/api/users/signup",
            payload
        );
        return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data || e.message || e);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
    },
    extraReducers: {
        [authLogin.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.error = null;
            state.user = action.payload;
        },
        [authLogin.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.error = action.payload;
        },
    },
});

export const authActions = { ...authSlice.actions, authLogin };

export default authSlice.reducer;
