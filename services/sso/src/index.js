const authenticationRouter = require("./routes/authenticationRouter");
const ensureIsAuthenticated = require("./middleware/ensure-is-authenticated");

module.exports = {
  authenticationRouter,
  ensureIsAuthenticated,
};
