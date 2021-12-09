/* istanbul ignore file */
const axios = require("axios").default;
const FormData = require("form-data");

const fs = require("fs");
const path = require("path");

const { CLAM_AV_HOST } = process.env;

module.exports = async (fileInformation, { fileName, location, debug }) => {
  const host = CLAM_AV_HOST || "https://dev-clamav.azurewebsites.net";

  try {
    if (typeof fileInformation?.tempFilePath !== "undefined") {
      let filePath;

      if (debug === true) {
        filePath = path.resolve(location);
      } else {
        filePath = location;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const form = new FormData();

      form.append("name", fileName);
      form.append("file", fileBuffer, fileName);

      const { data } = await axios({
        headers: form.getHeaders(),
        url: `${host}/scan`,
        data: form,
        method: "POST",
      });

      if (typeof data === "string" && data.includes("false")) return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};
