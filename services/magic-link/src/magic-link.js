const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt/lib").Strategy;
const passport = require("passport");
const mocks = require("node-mocks-http");
const config = require("./config");
const dateUtils = require("./util/dateUtil");
const cryptoUtils = require("./util/cryptoUtils");

const magicLinkDataValidator = require("./validators/schema/magicLinkDataValidator");

const ExpiredTokenError = require("./error/ExpiredTokenError");
const InvalidTokenError = require("./error/InvalidTokenError");

const AUTH_STRATEGY_NAME = "JWT";

/**
 * Creates a magic link URL that has a signed JWT token embedded .
 * The JWT contains the encrypted payload data and has an expiration time.
 *
 * @param payload object that contains the data required for  magic link generation.
 * Request body payload example: {
 *  "magicLink": {
 *    "redirectURL": "http://localhost:9001/appeal-questionnaire/89aa8504-773c-42be-bb68-029716ad9756/task-list",
 *    "expiredLinkRedirectURL": "http://localhost:9001/appeal-questionnaire/E69999999/authentication/your-email/link-expired",
 *  },
 * "auth": {
 *    "userInformation": { // The data in this object can be whatever you want
 *      "email": "test.address@planninginspectorate.gov.uk",
 *      "lpaCode": "E69999999"
 *    },
 *    "tokenValidity": 400000,
 *    "cookieName": "authCookie"
 *  }
 * }
 * @returns magicLink token in case of success
 */
/* istanbul ignore next */
function getMagicLink(payload) {
  try {
    // eslint-disable-next-line no-unused-vars
    magicLinkDataValidator.validate(payload).then();

    const tokenData = {
      data: cryptoUtils.encryptValue(JSON.stringify(payload)),
      exp: dateUtils
        .addMillisToCurrentDate(config.magicLinkValidityTimeMillis)
        .getTime(),
    };

    return jwt.sign(tokenData, config.jwtSigningKey);
  } catch (err) {
    throw new Error("Invalid magic link request format");
  }
}

/**
 * Authenticates user by creating a signed JWT token and returning an object indicating the status of the login attempt as well as a cookie and a redirect URL.
 *
 * @returns an object indicating the status of the login attempt as well as a cookie and a redirect URL.
 */
/* istanbul ignore next */
function verifyMagicLink(magicLink) {
  const jwtStrategy = new JwtStrategy(
    {
      jwtFromRequest: () => {
        return magicLink;
      },
      secretOrKey: config.jwtSigningKey,
      ignoreExpiration: true,
    },
    (jwtPayload, done) => {
      return done(null, jwtPayload);
    }
  );

  passport.use(AUTH_STRATEGY_NAME, jwtStrategy);

  let magicLinkData = null;
  let loginDetails = null;

  try {
    passport.authenticate(AUTH_STRATEGY_NAME, {}, (err, tokenPayload) => {
      if (!tokenPayload) {
        throw new InvalidTokenError("Invalid or missing token.");
      }

      if (tokenPayload.exp <= new Date().valueOf()) {
        throw new ExpiredTokenError("Token has expired.");
      }

      magicLinkData = JSON.parse(cryptoUtils.decryptValue(tokenPayload.data));
    })(mocks.createRequest());

    const authToken = jwt.sign(
      {
        userInformation: magicLinkData.auth.userInformation,
        exp: dateUtils
          .addMillisToCurrentDate(magicLinkData.auth.tokenValidity)
          .getTime(),
      },
      config.jwtSigningKey
    );

    loginDetails = {
      success: true,
      cookieName: magicLinkData.auth.cookieName,
      cookieToken: authToken,
      cookieOptions: {
        expires: dateUtils.addMillisToCurrentDate(
          config.cookieValidityTimeMillis
        ),
        httpOnly: true,
      },
      redirectUrl: magicLinkData.magicLink.redirectURL,
    };
  } catch (err) {
    if (err instanceof ExpiredTokenError) {
      magicLinkData = JSON.parse(cryptoUtils.decryptValue(err.tokenPayload));

      loginDetails = {
        success: false,
        redirectUrl: magicLinkData.magicLink.expiredLinkRedirectURL,
      };
    } else if (err instanceof InvalidTokenError) {
      loginDetails = {
        success: false,
      };
    } else {
      loginDetails = {
        success: false,
      };
    }
  }

  return loginDetails;
}

module.exports = {
  getMagicLink,
  verifyMagicLink,
};
