const ensureIsAuthenticated = require("./ensure-is-authenticated");
const { mockReq, mockRes, mockNext } = require("../test/mocks");

describe("ensureIsAuthenticated", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = mockReq;
    res = mockRes();
    next = mockNext;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return next if request contains authentication confirmation", () => {
    req.isAuthenticated = true;

    ensureIsAuthenticated(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return redirect if request contains authentication confirmation", () => {
    req.isAuthenticated = false;

    ensureIsAuthenticated(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(
      `/authenticate?destination={req.path}`
    );
  });
});
