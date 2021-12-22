/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const magicLink = require("../magic-link");
const magicLinkJsonData = require("./resources/magicLinkData.json");

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
      it("should create a JWT cookie", async () => {
        cryptoUtils.generateBytes.mockReturnValue(Buffer.alloc(16));

        magicLinkResponse = await magicLink.getMagicLink(magicLinkJsonData);

        expect(magicLinkResponse).toEqual(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU3MDAzNDcsImlhdCI6MTYyOTMwMH0.gfSPnMSZ8MC7ux41q2zlB9508VK_eEgOhQYFsbYS3hU"
        );
      });
    });

    describe("verifyMagicLink", () => {
      it("should respond with object indicating the status of the login attempt as well as a cookie and a redirect URL", async () => {
        const loginResponse = magicLink.verifyMagicLink(magicLinkResponse);

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
