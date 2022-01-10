/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const magicLink = require("../magic-link");
const magicLinkJsonData = require("./resources/magicLinkData.json");
const magicLinkJsonDataInvalid = require("./resources/magicLinkDataInvalid.json");

jest.mock("../util/cryptoUtils");
const cryptoUtils = require("../util/cryptoUtils");

describe("magiclink - integration tests", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(1629300347);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("Successful authentication with magic link", () => {
    let magicLinkResponse;

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

    describe("getMagicLink", () => {
      it("should create a JWT cookie", async () => {
        magicLinkResponse = await magicLink.getMagicLink(magicLinkJsonData);

        expect(magicLinkResponse).toEqual(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzAyMDAzNDcsImlhdCI6MTYyOTMwMH0.DGWGjs3XfOj2jZJgffCC05PDaWG7XuE9BwFM-NyxUn4"
        );
      });
    });

    describe("verifyMagicLink", () => {
      it("should respond with object indicating the status of the login attempt as well as a cookie and a redirect URL", async () => {
        const loginResponse = magicLink.verifyMagicLink(magicLinkResponse);

        console.log(loginResponse);

        expect(loginResponse.success).toBe(true);
        expect(loginResponse.cookieName).toBe("authCookie");
        expect(loginResponse.cookieToken).toBeTruthy(); // Might be a better way to test this
        expect(loginResponse.cookieOptions.expires).toBe(1629300347 + 400000);
        expect(loginResponse.cookieOptions.httpOnly).toBe(true);
        expect(loginResponse.redirectUrl).toBe(
          "http://localhost:9001/appeal-questionnaire/89aa8504-773c-42be-bb68-029716ad9756/task-list"
        );
      });
    });
  });
});
