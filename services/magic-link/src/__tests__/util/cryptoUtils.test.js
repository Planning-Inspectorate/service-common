const crypto = require("../../util/cryptoUtils");

const data = JSON.stringify({
  attribute: "value",
});

const encryptedData = {
  iv: "b7af0b5ae51352a96412c9198cd285a7",
  content: "3031c4f801ac4cc0ecb6024ba45f9edcd7e7b53848",
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
