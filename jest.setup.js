require("dotenv").config();

jest.mock("./src/helpers/getEnv", () => ({
  getEnv: () => ({ ...process.env }),
}));
