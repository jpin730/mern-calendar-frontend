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
    } catch (error) {
      dispatch(onLogout("Wrong credentials"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      });
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
  };
};