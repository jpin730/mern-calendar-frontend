import { createSlice } from "@reduxjs/toolkit";

import { AUTH_STATUS } from "../../auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: AUTH_STATUS.checking,
    user: {},
    errorMessage: null,
  },
  reducers: {
    checking: (state) => {
      state.status = AUTH_STATUS.checking;
      state.user = {};
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = AUTH_STATUS.authenticated;
      state.user = payload;
      state.errorMessage = null;
    },
  },
});

export const { checking, onLogin } = authSlice.actions;
