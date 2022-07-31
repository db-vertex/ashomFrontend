import { createSlice } from "@reduxjs/toolkit";

export const sharebtnSlice = createSlice({
    name: "sharebtnmodal",
    initialState: { value: { isShow: false, shareUrl: "", link: "" } },
    reducers: {
        showsharemodal: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { showsharemodal } = sharebtnSlice.actions;

export default sharebtnSlice.reducer;