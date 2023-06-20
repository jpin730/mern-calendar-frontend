import { AUTH_STATUS } from "../../src/auth/constants/AuthStatus";
import { testUser } from "./testUser";

export const checkingState = {
  errorMessage: null,
  status: AUTH_STATUS.checking,
  user: {},
};

export const authenticatedState = {
  errorMessage: null,
  status: AUTH_STATUS.authenticated,
  user: { ...testUser },
};

export const notAuthenticatedState = {
  errorMessage: null,
  status: AUTH_STATUS.notAuthenticated,
  user: {},
};

export const initialState = { ...checkingState };
