import { configureStore } from "@reduxjs/toolkit";

import { calendarSlice } from "./calendar";
import { authSlice } from "./auth";
import { uiSlice } from "./ui";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
