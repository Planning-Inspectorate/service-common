/**
 * Config
 *
 * This is the single-source-of-truth for the application. All
 * config should be driven by environment variables where different
 * values are required
 */

const path = require('path');

module.exports = {
  docs: {
    api: {
      path: process.env.DOCS_API_PATH || path.join(__dirname, '..', '..', 'api'),
    },
  },
  gotenberg: {
    url: process.env.GOTENBERG_URL,
  },
  logger: {
    level: process.env.LOGGER_LEVEL || 'debug',
  },
  server: {
    port: Number(process.env.SERVER_PORT || 3000),
    showErrors: process.env.SERVER_SHOW_ERRORS === 'true',
    terminationGracePeriod: Number((process.env.SERVER_TERMINATION_GRACE_PERIOD_SECONDS || 0) * 1000),
  },
};
