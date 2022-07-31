import { createSlice } from "@reduxjs/toolkit";

export const companiesbycountrySlice = createSlice({
    name: "sharebtnmodal",
    initialState: { value: false },
    reducers: {
        setcompanybycountryval: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setcompanybycountryval } = companiesbycountrySlice.actions;

export default companiesbycountrySlice.reducer;