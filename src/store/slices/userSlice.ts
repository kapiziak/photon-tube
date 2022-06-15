import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type AuthInfo = {
    loginAt: number;
    userId: UserID;
    userName: string;
    userAvatar: string | null;
};

type UserState = {
    authenticated: AuthInfo | null;
};

const initialState: UserState = {
    authenticated: {
        loginAt: new Date().getTime(),
        userId: "000-000-001",
        userName: "Kacper Zakrzewski",
        userAvatar: null,
    },
};

export const userState = createSlice({
    name: "userstate",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<AuthInfo | null>) => {
            state.authenticated = action.payload;
        },
    },
});

export const { setUserInfo } = userState.actions;

export const selectUserID = (state: RootState) =>
    state.userstate.authenticated ? state.userstate.authenticated.userId : null;

export const selectUserName = (state: RootState) =>
    state.userstate.authenticated
        ? state.userstate.authenticated.userName
        : null;

export const selectUserAvatar = (state: RootState) =>
    state.userstate.authenticated
        ? state.userstate.authenticated.userAvatar
        : null;

export default userState.reducer;
