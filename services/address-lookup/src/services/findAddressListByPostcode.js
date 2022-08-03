const axios = require("axios");
const logger = require("../utils/logger");
const capitalizeString = require("../utils/capitalizeString");
const formatDisplayAddress = require("../utils/formatAddress");

/** @typedef {import('../index.d.ts').OSApiAddress} OSApiAddress */
/** @typedef {import('../index.d.ts').findAddressListByPostcode} findAddressListByPostcode */

/** @type {findAddressListByPostcode} */
const findAddressListByPostcode = async (
  postcode,
  options = { maxResults: 100, minMatch: 0.1 }
) => {
  const apiKey = process.env.OS_PLACES_API_KEY;
  const { maxResults, minMatch } = options;

  if (!apiKey) {
    logger.error("OSApiKey is not defined");
    return {
      errors: { apiKey: { msg: "An error occurred, please try again later" } },
      addressList: [],
    };
  }
  /** @type {OSApiAddress[]} */
  const rawAddresses = await axios
    .get(
      `https://api.os.uk/search/places/v1/find?minmatch=${minMatch}&maxresults=${maxResults}&query=${postcode}&key=${apiKey}`
    )
    .then((response) => response?.data?.results || [])
    .catch(() => []);

  if (!Array.isArray(rawAddresses) || rawAddresses.length === 0) {
    return {
      errors: { postcode: { msg: "Enter a valid postcode" } },
      addressList: [],
    };
  }

  const addressList = rawAddresses.map((r) => {
    const {
      UPRN = "",
      UDPRN = "",
      DEPARTMENT_NAME = "",
      SUB_BUILDING_NAME = "",
      BUILDING_NAME = "",
      ADDRESS = "",
      POSTCODE = "",
      ORGANISATION_NAME = "",
      POST_TOWN = "",
      THOROUGHFARE_NAME = "",
      BUILDING_NUMBER = "",
    } = r.DPA;

    const apiReference = `${UPRN}_${UDPRN}`;
    const town = capitalizeString(POST_TOWN);
    const displayAddress = formatDisplayAddress(ADDRESS);
    const addressLine1 = `${
      BUILDING_NUMBER || BUILDING_NAME
    } ${capitalizeString(THOROUGHFARE_NAME)}`;
    const addressLine2 = [ORGANISATION_NAME, DEPARTMENT_NAME, SUB_BUILDING_NAME]
      .filter((p) => p !== "")
      .map((p) => capitalizeString(p))
      .join(", ");

    return {
      apiReference,
      addressLine1,
      addressLine2,
      displayAddress,
      postcode: POSTCODE,
      town,
    };
  });

  return { addressList };
};

module.exports = findAddressListByPostcode;
