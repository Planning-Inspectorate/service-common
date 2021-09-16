const msal = require("@azure/msal-node");

const getAzureConfig = (authConfig, logger) => {
  return {
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
  };
};

module.exports = (app, config, logger) => {
  const cca = new msal.ConfidentialClientApplication(
    getAzureConfig(config.auth, logger)
  );

  /* istanbul ignore next */
  app.get("/", (req, res) => {
    const authCodeUrlParameters = {
      scopes: ["user.read"],
      redirectUri: config.redirectUri,
    };

    cca
      .getAuthCodeUrl(authCodeUrlParameters)
      .then((response) => {
        res.redirect(response);
      })
      .catch((error) =>
        logger.error({ error }, `Error getting authorisation url`)
      );
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
