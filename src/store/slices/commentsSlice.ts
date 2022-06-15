import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type CommentsState = {
    [vid: VideoID]: VideoComment[];
};

const initialState: CommentsState = {
    "1": [
        {
            user: "Photon Education",
            text: "Mega!",
            createdAt: 1622631600000,
        },
    ],
    "27": [
        {
            user: "Photon Education",
            text: "Ok!",
            createdAt: 1623236400000,
        },
    ],
    "20": [
        {
            user: "Photon Education",
            text: "Mega!",
            createdAt: 1654167600000,
        },
        {
            user: "Photon Education",
            text: "Super!",
            createdAt: 1654081200000,
        },
    ],
};

export const commentsState = createSlice({
    name: "commentsstate",
    initialState,
    reducers: {
        addNewComment: (
            state,
            action: PayloadAction<{ vid: VideoID } & { comment: VideoComment }>
        ) => {
            if (!state[action.payload.vid]) state[action.payload.vid] = [];
            state[action.payload.vid].unshift(action.payload.comment);
        },
    },
});

export const { addNewComment } = commentsState.actions;

export const selectVideoComments =
    (vid: string | string[] | number | undefined) => (state: RootState) =>
        typeof vid !== "undefined" ? state.commentsstate[+vid] ?? null : null;

export default commentsState.reducer;
