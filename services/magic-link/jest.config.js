module.exports = {
  watchPathIgnorePatterns: ["globalConfig"],
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.js"],
  coverageReporters: ["json", "html", "text", "text-summary"],
  coveragePathIgnorePatterns: [
    "node_modules",
    "<rootDir>/src/index.js",
    "<rootDir>/src/error/ExpiredTokenError.js",
    "<rootDir>/src/error/InvalidTokenError.js",
  ],
  coverageDirectory: "./coverage",
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  moduleFileExtensions: ["js", "json"],
  testMatch: ["**/?(*.)+(spec|test).js?(x)"],
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/__tests__/setup-jest.js"],
};
