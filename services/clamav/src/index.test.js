const uploadAV = require("./index");

describe("clamav", () => {
  it("should scan uploaded document with negative result", async () => {
    const file = {
      tempFilePath: "./events.csv",
    };

    const succesfullyUploaded = await uploadAV(file, {
      fileName: "testfile.docx",
      location: "./events.csv",
      debug: true,
    });

    expect(succesfullyUploaded);
  });
});
