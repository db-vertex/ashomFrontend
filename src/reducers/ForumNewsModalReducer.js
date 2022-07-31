import { createSlice } from "@reduxjs/toolkit";

export const forumNewsModalSlice = createSlice({
    name: "forumnewsmodal",
    initialState: {
        value: {
            visibility: false,
            details: {
                id: "",
                Company_Name: "",
                Country: "",
                DelistingDate: "",
                Reference_No: "",
                SymbolTicker: "",
                company_status: "",
                exchanges: "",
                image: "",
                industry: "",
                lastReport: ""
            }
        }
    },
    reducers: {
        showforumnewsmodal: (state, action) => {
            state.value.visibility = action.payload
        },
        setCompanyData: (state, action) => {
            state.value.details = action.payload
        },
        setForumNewsModalData: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { showforumnewsmodal, setCompanyData, setForumNewsModalData } = forumNewsModalSlice.actions;

export default forumNewsModalSlice.reducer;