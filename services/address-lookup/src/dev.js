const logger = require("./utils/logger");
const findAddressListByPostcode = require("./services/findAddressListByPostcode");

(async () => {
  // eslint-disable-next-line prefer-destructuring
  process.env.OS_PLACES_API_KEY = process.argv[2];
  const results = await findAddressListByPostcode("EC2M 4PT", {
    maxResults: 2,
  });
  logger.info(results);
})();
