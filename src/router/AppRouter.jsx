import { Navigate, Route, Routes } from "react-router-dom";

import { AUTH_STATUS, LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
  const authStatus = AUTH_STATUS.notAuthenticated;
  return (
    <Routes>
      {authStatus === AUTH_STATUS.notAuthenticated ? (
        <Route path="/auth/*" element={<LoginPage />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
