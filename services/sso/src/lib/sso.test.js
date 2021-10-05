const msal = require("@azure/msal-node");
const sso = require("./sso");

jest.mock("@azure/msal-node");

describe("sso", () => {
  let app;
  const logger = jest.fn();

  const mockClientId = "mock-client-id";
  const mockCloudInstanceId = "mock-cloud-instance-id";
  const mockTenantId = "mock-tenant-id";
  const mockClientSecret = "mock-client-secret";
  const mockRedirectUri = "mock-redirect-uri";

  const mockConfig = {
    auth: {
      clientId: mockClientId,
      cloudInstanceId: mockCloudInstanceId,
      tenantId: mockTenantId,
      clientSecret: mockClientSecret,
    },
    redirectUri: mockRedirectUri,
  };

  beforeEach(() => {
    msal.ConfidentialClientApplication.mockClear();
    app = { get: jest.fn(), use: jest.fn() };
  });

  it("should call the constructor of msal.ConfidentialClientApplication", () => {
    sso(app, mockConfig, logger);
    expect(msal.ConfidentialClientApplication).toHaveBeenCalled();
  });

  it("should call root and redirect of app.get", () => {
    sso(app, mockConfig, logger);

    expect(app.get).toHaveBeenCalledTimes(1);
    expect(app.use).toHaveBeenCalledTimes(1);
    expect(app.use).toHaveBeenCalledWith("/", expect.any(Function));
    expect(app.get).toHaveBeenCalledWith("/redirect", expect.any(Function));
  });
});
