const passport = require("passport");

const passportAuthenticate = (strategyId) => {
  passport.authenticate(strategyId, { failureRedirect: "/" });
};

const redirect = (req, res) => {
  if (req.user) return res.redirect("/logged-in");
  return res.redirect("https://login.microsoftonline.com/");
};

const render = (req, res) => {
  return res.render("check-your-inbox", { token: JSON.stringify(req) });
};

module.exports = async (req, res, strategyId) => {
  passportAuthenticate(strategyId);
  redirect(req, res);
  render(req, res);
};
