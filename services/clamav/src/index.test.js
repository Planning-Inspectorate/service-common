const uploadAV = require("./index");

describe("clamav", () => {
  it("should scan uploaded document with negative result", async () => {
    const file = {
      tempFilePath: "./eicar.com.txt",
    };

    const succesfullyUploaded = await uploadAV(file, {
      fileName: "eicar.com.txt",
      location: "./eicar.com.txt",
      debug: true,
    });

    expect(succesfullyUploaded);
  });
});
