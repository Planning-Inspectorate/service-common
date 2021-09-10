const index = require("./index");
const authenticationRouter = require("./routes/authenticationRouter");
const ensureIsAuthenticated = require("./middleware/ensure-is-authenticated");

describe("index", () => {
  it("should export the expected modules", () => {
    expect(index).toEqual({
      authenticationRouter,
      ensureIsAuthenticated,
    });
  });
});
