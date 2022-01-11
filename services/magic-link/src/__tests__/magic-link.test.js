/**
 * @jest-environment jsdom
 */
/* eslint-env browser */

const magicLink = require("../magic-link");
const magicLinkJsonData = require("./resources/magicLinkData.json");
const magicLinkJsonDataInvalid = require("./resources/magicLinkDataInvalid.json");

jest.mock("../util/cryptoUtils");
const payload = require("./resources/magicLinkData.json");

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
      it("should respond with object indicating the status of the login attempt as well as a cookie and a redirect URL", async () => {
        // //cryptoUtils.generateBytes.mockReturnValue(Buffer.alloc(16));
        // const token = magicLink.getMagicLink(payload);
        // console.log('token');
        // console.log(token);

        const token1 = magicLink.verifyMagicLink(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Iml2IjoiMmYwMmM5MGI1NmM4ODEzZjdjMzAzMGJmNmFjYzE1NzQiLCJjb250ZW50IjoiZjE1Mjg4NWNhNGQ3YWY0NTQ5YjU2NzMwMDA0YjZjMTQxYmNiMGFlN2FjOGY3Mzc1NWE0OWE5ZDk5Yzc0MzUyOWIzODFjZGQ3ZGQzYzI3ODE0MzY4NmY4MTM2NGQ1ZmYzOGE4MzQ2YzI5YzkyODkwZDhmYjZjMzY4OWU5YjNhZTNiYTFiNjc4ZGY4OTI0ZmRiZGVjYjdiZWY0MTFmYWU1YzBhYmQ4YTgwOGM0Y2RjNzZhMzYzYjY2MjRlZWRhMWFiYzc0NzQyMzczYjE3NTFmN2U0MGQwM2Q1MTgzNDdmMDNhOGQ4YzgyMWFhMTg2ZWExOWM1NWZjNjRiOTA4ZjdlNjk1YjI1MzAwOWY5Mjk0ZmZjZGVmODc4YTI0MGNlZjRhNzMzNDk4OTc2MzEyYTQyNzhjNTA5Y2MxZjVlNTY4OWExNTFlY2NlNDk1M2M4ODcyZTIwYWQ2NDA1YjNlYWM5MjY2NjI5YmE5ODBkM2IzODAwNGZmNjY2OTE2NGVmNzI2YTgxNmIwOGNiMzFhMTQwNzBhODdlYjIyMDE0YWNhODg2MGJhMWM4MWNiZDc1YzM2MzcyOTI3M2QwODc3MjkwNzA3MTVlNDRiYWY4YTBiY2VlYzNkNTU5NjkyYzg5OGNkNzc4ZmFiNTg4NTI4N2IzZmIwMTY5MDc0NWM0NGM2NTQ4NTg2ZTQ2ODBjNWJjMDFiYmQ1OTY2ZTU5NGUyNTFjZjNlZDI0MDU4NDJkZDZjNzhiYzM0OTVmZDk3ZjY4ZWJjZmM1MDBlYzAzZmU2NjM3ZjI5YTA0MjQ3MTkxZGZlMTk1OTQzOGRmZjNhOGQzMDJmNjBkY2Y4OGUyMmI3Y2U0ZmFiZDVkNzNhMDFkZmM4MDc3OTVhYzBhOWZjMjk5MzI4MGEzMDA2YmMzMTJmZTU4NDBkM2VlNmUyNmUwNGM5MzQ4NDkwM2IyZmY2YTY1YmU0MmY5YTRkMTNkNjU5MGMzMDkyNjNkZjkyMzJkMjUwZmVlYzAwNTAwY2M1MGU1YmUzZDgyNjIyN2QxNjM2MDYifSwiZXhwIjoxNjQxOTIwOTIxMDgwLCJpYXQiOjE2NDE5MjAwMjF9.dmqxgqBnVi7hUo5wRpsrYL22_nKl6JltcQSQrfwz6Tc"
        );

        console.log(token1);
        // console.log(token1);

        // magicLinkResponse = await magicLink.getMagicLink(magicLinkJsonData);
        //
        // const loginResponse = magicLink.verifyMagicLink(magicLinkResponse);
        //
        // expect(loginResponse.success).toBe(true);
        // expect(loginResponse.cookieName).toBe("authCookie");
        // expect(loginResponse.cookieToken).toBeTruthy(); // Might be a better way to test this
        // expect(loginResponse.cookieOptions.expires).toBe(1629300347 + 400000);
        // expect(loginResponse.cookieOptions.httpOnly).toBe(true);
        // expect(loginResponse.redirectUrl).toBe(
        //   "http://localhost:9001/appeal-questionnaire/89aa8504-773c-42be-bb68-029716ad9756/task-list"
        // );
      });
    });
  });
});
