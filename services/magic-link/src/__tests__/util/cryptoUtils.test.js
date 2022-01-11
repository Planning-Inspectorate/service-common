const crypto = require("../../util/cryptoUtils");

const data = JSON.stringify({
  attribute: "value",
});

const encryptedData = {
  iv: "0df6311c143bab361250a28b45dc8a7f",
  content: "8d641559a9772cb1dd42f8da754db3836fe4ad9472",
};

describe("util.crypto", () => {
  describe("encrypt text", () => {
    test("should encrypt with success", () => {
      const expectedEncryptedData = crypto.encryptValue(data);

      expect(expectedEncryptedData).toHaveProperty("content");
      expect(expectedEncryptedData).toHaveProperty("iv");
    });
  });

  describe("decrypt text", () => {
    test("should decrypt with success", () => {
      const expectedEncryptedData = crypto.decryptValue(encryptedData);

      expect(expectedEncryptedData).toEqual(data);
    });
  });
});
