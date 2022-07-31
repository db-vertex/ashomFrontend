import { createSlice } from "@reduxjs/toolkit";

export const subscriptionModalSlice = createSlice({
    name: "subscriptionmodal",
    initialState: { value: false },
    reducers: {
        showsubscriptionmodal: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { showsubscriptionmodal } = subscriptionModalSlice.actions;

export default subscriptionModalSlice.reducer;