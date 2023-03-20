import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  displayName: null,
  email: null,
  photoURL: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      displayName: payload.displayName,
      email: payload.email,
      photoURL: payload.photoURL,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authLogOut: () => initialState,
  },
});

export const authReducer = authSlice.reducer;
