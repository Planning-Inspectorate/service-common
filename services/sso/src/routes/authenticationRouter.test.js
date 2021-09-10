jest.mock("passport");
const passport = require("passport");
const authenticationRouter = require("./authenticationRouter");
const { mockReq, mockRes } = require("../mocks");

describe("authenticationRouter", () => {
  const mockStrategyId = "mock-strategy-id";
  let req;
  let res;

  beforeEach(() => {
    req = mockReq;
    res = mockRes();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call passport with a mock strategy", () => {
    authenticationRouter(req, res, mockStrategyId);
    expect(passport.authenticate).toHaveBeenCalledWith(mockStrategyId, {
      failureRedirect: "/",
    });
  });

  it("should define the expected route with an existent user", () => {
    req.user = { mockUser: "mock-user" };

    authenticationRouter(req, res, mockStrategyId);
    expect(res.redirect).toHaveBeenCalledWith("/logged-in");
  });

  it("should define the expected route with an non-existent user", () => {
    req.user = null;

    authenticationRouter(req, res, mockStrategyId);
    expect(res.redirect).toHaveBeenCalledWith(
      "https://login.microsoftonline.com/"
    );
  });

  it("should render the check-your-inbox page", () => {
    authenticationRouter(req, res, mockStrategyId);
    expect(res.render).toHaveBeenCalledWith("check-your-inbox", {
      token: JSON.stringify(req),
    });
  });
});
