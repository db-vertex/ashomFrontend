import { createSlice } from "@reduxjs/toolkit";

export const newsShareSlice = createSlice({
    name: "newssharedata",
    initialState: {
        value: {
            active: false,
            title: "",
            link: "",
            image: ""
        }
    },
    reducers: {
        setnewssharedata: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setnewssharedata } = newsShareSlice.actions;

export default newsShareSlice.reducer;