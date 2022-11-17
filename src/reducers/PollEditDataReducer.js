import { createSlice } from "@reduxjs/toolkit";

export const pollEditSlice = createSlice({
    name: "newssharedata",
    initialState: {
        value: {
            active: false,
            polldata: {
                id: "346",
                content: "",
                content_image: "",
                share_count: "0",
                forum_type: "",
                validity: "0",
                options: {
                    option1: "",
                    option2: "",
                    option3: "",
                    total_option1_voters: 0,
                    total_option2_voters: 0,
                    total_option3_voters: 0,
                    percentage_option1_voters: 0,
                    percentange_option2_voters: 0,
                    percentage_option3_voters: 0
                },
                image_width: "",
                image_height: "",
                created: "",
                first_name: "hzhddydy",
                last_name: "shhdhs",
                profile_pic: "",
                voted: false,
                posted_by_name: "",
                posted_by_profile: "",
                liked: false,
                total_liked: "",
                disliked: false,
                total_disliked: "",
                total_comments: "",
                comments: 0,
                isMine: false,
            }
        }
    },
    reducers: {
        setpolleditdata: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setpolleditdata } = pollEditSlice.actions;

export default pollEditSlice.reducer;