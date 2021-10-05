const index = require("./index");
const { validMimeType, validateMimeBinaryType } = require("./validateMime");

describe("index", () => {
  it("should export the expected modules", () => {
    expect(index).toEqual({
      validMimeType,
      validateMimeBinaryType,
    });
  });
});
