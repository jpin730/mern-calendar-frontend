import { useDispatch, useSelector } from "react-redux";

import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";
import { AUTH_LOCAL_STORAGE } from "../auth";
import { calendarApi } from "../api";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem(AUTH_LOCAL_STORAGE.token, data.token);
      localStorage.setItem(
        AUTH_LOCAL_STORAGE.tokenInitDate,
        new Date().getTime
      );
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch {
      dispatch(onLogout("Wrong credentials"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      });
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/user", {
        name,
        email,
        password,
      });
      localStorage.setItem(AUTH_LOCAL_STORAGE.token, data.token);
      localStorage.setItem(
        AUTH_LOCAL_STORAGE.tokenInitDate,
        new Date().getTime
      );
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogout(error?.response?.data?.msg || "Registration error"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      });
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem(AUTH_LOCAL_STORAGE.token);
    if (!token) {
      return dispatch(onLogout());
    }

    try {
      const { data } = await calendarApi.get("auth/token");
      localStorage.setItem(AUTH_LOCAL_STORAGE.token, data.token);
      localStorage.setItem(
        AUTH_LOCAL_STORAGE.tokenInitDate,
        new Date().getTime()
      );
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuthToken,
  };
};
