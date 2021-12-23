/* istanbul ignore file */
const axios = require("axios").default;
const FormData = require("form-data");
const { Readable } = require("stream");

const fs = require("fs");

const { CLAM_AV_HOST } = process.env;

module.exports = async (fileInformation, fileName) => {
  const host = CLAM_AV_HOST || "https://dev-clamav.azurewebsites.net";

  if (typeof fileInformation?.tempFilePath !== "undefined") {
    const fileBuffer = fs.readFileSync(fileInformation?.tempFilePath);
    const form = new FormData();
    const readableStream = Readable.from(fileBuffer.toString());

    form.append("file", readableStream, "file");

    const { data } = await axios({
      headers: form.getHeaders(),
      url: host,
      data: form,
      method: "POST",
    });

    if (data?.isInfected === true) {
      throw new Error(`${fileName} contains a virus`);
    }
  }

  return true;
};
