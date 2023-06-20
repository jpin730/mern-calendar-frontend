import { AUTH_LOCAL_STORAGE } from "../../src/auth/constants/AuthLocalStorage";
import calendarApi from "../../src/api/calendarApi";

describe("calendarApi", () => {
  test("should have default base URL", () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("should have a token header in request if it exists", async () => {
    const testToken = "test-token";
    localStorage.setItem(AUTH_LOCAL_STORAGE.token, testToken);

    const { config } = await calendarApi.get();

    expect(config.headers["x-token"]).toBe(testToken);
  });
});
