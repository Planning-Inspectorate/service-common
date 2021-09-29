const msal = require("@azure/msal-node");

const getAzureConfig = (authConfig, logger) => ({
  auth: {
    clientId: authConfig.clientId,
    authority: `${authConfig.cloudInstanceId}/${authConfig.tenantId}`,
    clientSecret: authConfig.clientSecret,
  },
  system: {
    loggerOptions: {
      /* istanbul ignore next */
      loggerCallback(loglevel, message) {
        logger.info({ loglevel, message }, `Logger callback`);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
});

/* istanbul ignore next */
// eslint-disable-next-line consistent-return
const loginViaMicrosoft = (req, res, cca, config, logger) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: config.redirectUri,
  };

  try {
    return cca.getAuthCodeUrl(authCodeUrlParameters);
  } catch (error) {
    logger.error({ error }, `Error getting authorisation url`);
  }
};

module.exports = (app, config, logger) => {
  const cca = new msal.ConfidentialClientApplication(
    getAzureConfig(config.auth, logger)
  );

  /* istanbul ignore next */
  // eslint-disable-next-line consistent-return
  app.use("/", async (req, res, next) => {
    if (req.session.isAuthenticated !== true) {
      const response = await loginViaMicrosoft(req, res, cca, config, logger);
      if (response) {
        req.session.isAuthenticated = true;
        res.redirect(response);
      } else {
        return res.status(401).send({ error: "Microsoft Login Failed" });
      }
    } else {
      next();
    }
  });

  /* istanbul ignore next */
  app.get("/redirect", (req, res) => {
    const tokenRequest = {
      code: req.query.code,
      scopes: ["user.read"],
      redirectUri: config.redirectUri,
    };

    cca
      .acquireTokenByCode(tokenRequest)
      .then((response) => {
        logger.info({ response }, `Acquiring token by code`);
        res.sendStatus(200);
      })
      .catch((error) => {
        logger.error({ error }, `Error acquiring token by code`);
        res.status(500).send(error);
      });
  });
};
