const ensureIsAuthenticated = require("./middleware/ensure-is-authenticated");
const sso = require("./lib/sso");

module.exports = {
  ensureIsAuthenticated,
  sso,
};
