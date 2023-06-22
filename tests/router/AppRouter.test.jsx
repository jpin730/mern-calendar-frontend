import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { AUTH_STATUS } from "../../src/auth/constants/AuthStatus";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("AppRouter", () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should show loading and call checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: AUTH_STATUS.checking,
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getByRole("heading", { level: 3 }).innerHTML).toBe(
      "Loading..."
    );
    expect(mockCheckAuthToken).toHaveBeenCalledWith();
  });

  test("should show login page if user is not authenticated", () => {
    useAuthStore.mockReturnValue({
      status: AUTH_STATUS.notAuthenticated,
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/home"]}>
        <AppRouter />
      </MemoryRouter>
    );

    const h3Elements = screen.getAllByRole("heading", { level: 3 });

    expect(h3Elements.at(0).innerHTML).toBe("Login");
    expect(h3Elements.at(1).innerHTML).toBe("Create an account");
    expect(container).toMatchSnapshot();
  });

  test("should show login page if user is not authenticated", () => {
    useAuthStore.mockReturnValue({
      status: AUTH_STATUS.authenticated,
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toBe(
      "CalendarPage"
    );
  });
});
