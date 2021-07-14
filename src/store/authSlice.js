import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authSignup = createAsyncThunk(
    "auth/signup",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://localhost:9001/api/users/signup",
                payload
            );

            if (!response.data) {
                return thunkAPI.rejectWithValue(response.data.message);
            }
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            return thunkAPI.rejectWithValue(
                e.response.data.message || e.message || e
            );
        }
    }
);

const authLogin = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
    try {
        const response = await axios.post(
            "http://localhost:9001/api/users/login",
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
        [authSignup.pending]: (state, action) => {
            state.loading = true;
        },
        [authSignup.fulfilled]: (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.error = null;
            state.user = action.payload;
        },
        [authSignup.rejected]: (state, action) => {
            state.loading = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        },
    },
});

export const authActions = { ...authSlice.actions, authSignup, authLogin };

export default authSlice.reducer;
