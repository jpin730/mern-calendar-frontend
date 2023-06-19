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
    onChecking: (state) => {
      state.status = AUTH_STATUS.checking;
      state.user = {};
      state.errorMessage = null;
    },
    onLogin: (state, { payload }) => {
      state.status = AUTH_STATUS.authenticated;
      state.user = payload;
      state.errorMessage = null;
    },
    onLogout: (state, { payload }) => {
      state.status = AUTH_STATUS.noAuthenticated;
      state.user = {};
      state.errorMessage = payload || null;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
