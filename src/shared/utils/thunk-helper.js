export const postThunk = (url, axios) => async (payload, thunkAPI) => {
    try {
        const response = await axios.post(url, payload);
        return thunkAPI.fulfillWithValue(response.data);
    } catch (e) {
        return thunkAPI.rejectWithValue(
            e.response.data.message || e.message || "Something Went Wrong..."
        );
    }
};
