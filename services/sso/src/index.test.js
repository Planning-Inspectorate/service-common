const index = require("./index");
const ensureIsAuthenticated = require("./middleware/ensure-is-authenticated");
const sso = require("./lib/sso");

describe("index", () => {
  it("should export the expected modules", () => {
    expect(index).toEqual({
      ensureIsAuthenticated,
      sso,
    });
  });
});
