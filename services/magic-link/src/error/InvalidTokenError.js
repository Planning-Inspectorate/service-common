/**
 * Error thrown during authentication when the token is invalid.
 * @type {InvalidTokenError}
 */
/* istanbul ignore next */
module.exports = class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};
