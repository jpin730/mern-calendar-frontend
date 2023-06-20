import { act, renderHook, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "../fixtures/authStates";
import { AUTH_LOCAL_STORAGE } from "../../src/auth/constants/AuthLocalStorage";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store/auth/authSlice";
import { calendarApi } from "../../src/api";
import { testUser, testUserFull } from "../fixtures/testUser";

jest.mock("../../src/auth", () => ({
  ...jest.requireActual("../../src/auth/constants"),
}));

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

const hookMethods = {
  checkAuthToken: expect.any(Function),
  startLogin: expect.any(Function),
  startLogout: expect.any(Function),
  startRegister: expect.any(Function),
};

describe("useAuthStore", () => {
  beforeEach(() => localStorage.clear());

  test("should return default values", () => {
    const mockStore = getMockStore(initialState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({ ...initialState, ...hookMethods });
  });

  test("should start login successfully", async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserFull);
    });

    expect(result.current).toEqual({ ...authenticatedState, ...hookMethods });
    expect(localStorage.getItem(AUTH_LOCAL_STORAGE.token)).toEqual(
      expect.any(String)
    );
    expect(localStorage.getItem(AUTH_LOCAL_STORAGE.tokenInitDate)).toEqual(
      expect.any(String)
    );
  });

  test("should start login unsuccessfully", async () => {
    const mockStore = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "wrong@email.com",
        password: "123456",
      });
    });

    expect(result.current).toEqual({
      ...notAuthenticatedState,
      errorMessage: "Wrong credentials",
      ...hookMethods,
    });
    expect(localStorage.getItem(AUTH_LOCAL_STORAGE.token)).toBe(null);
    expect(localStorage.getItem(AUTH_LOCAL_STORAGE.tokenInitDate)).toBe(null);

    waitFor(() => {
      expect(result.current.errorMessage).toBe(null);
    });
  });

  test("should create a new user successfully", async () => {
    const newUser = {
      email: "new.user@email.com",
      password: "123456789",
      name: "New Test User",
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const data = {
      ok: true,
      uid: "test-uid",
      name: newUser.name,
      token: "test-token",
    };
    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data,
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    expect(result.current).toEqual({
      ...authenticatedState,
      user: { name: data.name, uid: data.uid },
      ...hookMethods,
    });

    spy.mockRestore();
  });

  test("should create a new user unsuccessfully", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserFull);
    });

    expect(result.current).toEqual({
      ...notAuthenticatedState,
      errorMessage: "User email already exists",
      ...hookMethods,
    });
  });

  test("should check token successfully", async () => {
    const token = "test-token";
    localStorage.setItem("token", token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const data = {
      ok: true,
      msg: "Token valid",
      uid: testUser.uid,
      name: testUser.name,
      token: "new-test-token",
    };
    const spy = jest.spyOn(calendarApi, "get").mockReturnValue({
      data,
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    expect(result.current).toEqual({
      ...authenticatedState,
      ...hookMethods,
    });
    expect(localStorage.getItem(AUTH_LOCAL_STORAGE.token)).toBe(data.token);

    spy.mockRestore();
  });

  test("should check token unsuccessfully", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    expect(result.current).toEqual({
      ...notAuthenticatedState,
      ...hookMethods,
    });
  });
});
