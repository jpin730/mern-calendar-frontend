import { Navigate, Route, Routes } from "react-router-dom";

import { AUTH_STATUS, LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {
  const authStatus = AUTH_STATUS.notAuthenticated;

  const isAuthenticated = authStatus === AUTH_STATUS.authenticated;

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<CalendarPage />} />
      ) : (
        <Route path="/auth/login" element={<LoginPage />} />
      )}

      <Route
        path="/*"
        element={<Navigate to={isAuthenticated ? "/" : "/auth/login"} />}
      />
    </Routes>
  );
};
