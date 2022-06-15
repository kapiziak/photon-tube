import {
    configureStore,
    ThunkAction,
    Action,
  } from "@reduxjs/toolkit";
  import commentsReducer from "./slices/commentsSlice";
  import userReducer from "./slices/userSlice";

  export const store = configureStore({
    reducer: {
      commentsstate: commentsReducer,
      userstate: userReducer,
    },
  });
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;