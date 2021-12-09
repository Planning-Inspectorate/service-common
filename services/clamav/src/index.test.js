const uploadAV = require("./index");

describe("clamav", () => {
  it("should scan uploaded document with positive result", async () => {
    const file = {
      tempFilePath: "./eicar.com.txt",
    };

    const succesfullyUploaded = await uploadAV(file, {
      fileName: "eicar.com.txt",
      location: "tests/artifacts/eicar.com.txt",
      debug: true,
    });

    expect(succesfullyUploaded).toBe(false);
  });

  it("should scan uploaded document with negative result", async () => {
    const file = {
      tempFilePath: "./default.txt",
    };

    const succesfullyUploaded = await uploadAV(file, {
      fileName: "default.txt",
      location: "tests/artifacts/default.txt",
      debug: true,
    });

    expect(succesfullyUploaded).toBe(true);
  });
});
