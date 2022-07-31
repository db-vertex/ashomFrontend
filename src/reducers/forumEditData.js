import { createSlice } from "@reduxjs/toolkit";

export const forumEditSlice = createSlice({
    name: "newssharedata",
    initialState: {
        value: {
            active: false,
            forumdata: {
                id: "346",
                content: "",
                content_image: "",
                share_count: "0",
                forum_type: "",
                validity: "0",
                options: false,
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
        setforumeditdata: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setforumeditdata } = forumEditSlice.actions;

export default forumEditSlice.reducer;