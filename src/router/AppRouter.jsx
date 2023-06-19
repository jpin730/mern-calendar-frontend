import { Navigate, Route, Routes } from "react-router-dom";

import { AUTH_STATUS, LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === AUTH_STATUS.checking) {
    return (
      <div className="min-vh-100 d-flex">
        <div className="m-auto">
          <h3 className="text-center px-5">Loading...</h3>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated w-100"></div>
          </div>
        </div>
      </div>
    );
  }

  const isAuthenticated = status === AUTH_STATUS.authenticated;

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
