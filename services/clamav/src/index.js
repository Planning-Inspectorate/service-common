/* istanbul ignore file */
const NodeClam = require("clamscan");
const fs = require("fs");

const { CLAM_AV_PORT, CLAM_AV_HOST } = process.env

module.exports = async (fileInformation, fileName = "The file") => {
  if (typeof fileInformation?.tempFilePath !== "undefined") {
    const clamscan = await new NodeClam().init({
      debug_mode: true,
      clamdscan: {
        host: CLAM_AV_HOST || "clamav",
        port: CLAM_AV_PORT || 3310,
        bypass_test: true,
      },
    });
  
    const fileStream = fs.createReadStream(fileInformation.tempFilePath);
  
    // eslint-disable-next-line camelcase
    const { is_infected } = await clamscan.scan_stream(fileStream);
  
    // eslint-disable-next-line camelcase
    if (is_infected) {
      throw new Error(`${fileName} contains a virus`);
    }
  }

  return true;
};
