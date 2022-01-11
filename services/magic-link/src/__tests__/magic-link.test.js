/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const magicLink = require("../magic-link");
const magicLinkJsonData = require("./resources/magicLinkData.json");
const magicLinkJsonDataInvalid = require("./resources/magicLinkDataInvalid.json");

jest.mock("../util/cryptoUtils");

describe("magiclink - integration tests", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("Successful authentication with magic link", () => {
    let magicLinkResponse;

    describe("getMagicLink", () => {
      it("should create a JWT cookie", async () => {
        magicLinkResponse = await magicLink.getMagicLink(magicLinkJsonData);

        expect(magicLinkResponse).toEqual(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjkwMDAwMCwiaWF0IjowfQ.hoaKRIfrFsfSxVQbk53FBWQR7pF902sMt98qGWIDLJ4"
        );
      });
    });

    describe("getMagicLink", () => {
      it("errors when given invalid Json data - Invalid magic link request format", async () => {
        try {
          magicLinkResponse = await magicLink.getMagicLink(
            magicLinkJsonDataInvalid
          );
        } catch (err) {
          expect(err.message).toEqual("Invalid magic link request format");
        }
      });
    });

    describe("verifyMagicLink", () => {
      it("errors when given an invalid magic link - not valid", async () => {
        const loginResponse = magicLink.verifyMagicLink("");

        expect(loginResponse.success).toBe(false);
        expect(loginResponse.redirectUrl).toBeUndefined();
      });
    });
  });
});
