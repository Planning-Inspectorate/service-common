const uploadAV = require("./index");

describe("clamav", () => {
  it("should scan uploaded txt file with positive result", async () => {
    const file = {
      name: "eicar.com.txt",
      tempFilePath: "tests/artifacts/eicar.com.txt",
    };

    await expect(() => uploadAV(file, file.name)).rejects.toThrowError(
      `${file.name} contains a virus`
    );
  });

  it("should scan uploaded document with negative result", async () => {
    const file = {
      tempFilePath: "tests/artifacts/default.csv",
      name: "default.csv",
    };

    const succesfullyUploaded = await uploadAV(file, file.name);
    expect(succesfullyUploaded).toBe(true);
  });
});
