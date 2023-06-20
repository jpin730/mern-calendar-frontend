import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  checkingState,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authStates";
import { testUser } from "../../fixtures/testUser";

jest.mock("../../../src/auth", () => ({
  ...jest.requireActual("../../../src/auth/constants/AuthStatus"),
}));

describe("authSlice", () => {
  test("should return initial state", () => {
    const state = authSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("should login test user", () => {
    const state = authSlice.reducer(initialState, onLogin(testUser));
    expect(state).toEqual(authenticatedState);
  });

  test("should logout test user", () => {
    let state = authSlice.reducer(authenticatedState, onChecking());
    expect(state).toEqual(checkingState);

    state = authSlice.reducer(state, onLogout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test("should logout test user with error message and clear it", () => {
    const errorMessage = "test error message";
    let state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });

    state = authSlice.reducer(state, clearErrorMessage());
    expect(state).toEqual(notAuthenticatedState);
  });
});
