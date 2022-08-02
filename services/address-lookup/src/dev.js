const findAddressListByPostcode = require("./services/findAddressListByPostcode");

// npm run dev {apiKey}

(async () => {
  // eslint-disable-next-line prefer-destructuring
  process.env.OS_API_KEY = process.argv[2];
  const results = await findAddressListByPostcode("EC2M 7PD");
  console.log(results);
})();
