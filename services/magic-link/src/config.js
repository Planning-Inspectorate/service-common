module.exports = {
  logger: {
    level: "debug",
    redact: [
      "opts.body",
      "config.db.session.uri",
      "config.server.sessionSecret",
    ],
  },
  jwtSigningKey: "QeThWmZq4t7w!z$C&F)J@NcRfUjXn2r5",
  magicLinkValidityTimeMillis: 86400000,
  cookieValidityTimeMillis: 14400000,
};
