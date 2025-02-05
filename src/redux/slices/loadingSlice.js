import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false,
    },

    reducers: {
        setLoading(state) {
            state.isLoading = true;
        },
        clearIsLoading(state) {
            state.isLoading = false;
        },

    }
});

const loadingReducer = loadingSlice.reducer;
const loadingActions = loadingSlice.actions;



export { loadingReducer, loadingActions };