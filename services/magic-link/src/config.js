module.exports = {
  logger: {
    level: "debug",
    redact: [
      "opts.body",
      "config.db.session.uri",
      "config.server.sessionSecret",
    ],
  },
  jwtSigningKey: "",
  magicLinkValidityTimeMillis: 900000,
  cookieValidityTimeMillis: 14400000,
};
