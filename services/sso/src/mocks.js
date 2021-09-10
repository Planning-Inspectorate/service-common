const mockGet = jest.fn();
const mockPost = jest.fn();
const mockDelete = jest.fn();
const mockReq = {
  session: {},
  params: {},
  log: {
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
};
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.set = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn();
  res.render = jest.fn();
  return res;
};
const mockNext = jest.fn();

/* istanbul ignore next */
jest.doMock("express", () => ({
  Router: () => ({
    get: mockGet,
    post: mockPost,
    delete: mockDelete,
  }),
}));

module.exports = {
  mockGet,
  mockPost,
  mockDelete,
  mockReq,
  mockRes,
  mockNext,
};
