import { buildBaseUrl } from "./index.js";

describe("buildUrl", () => {
  it("Correctly builds URL", () => {
    const testUrl = "test.com?q=1";
    const params = { query: "search", name: "testName" };
    const buildUrl = buildBaseUrl(testUrl);
    const url = buildUrl(params);
    expect(url).toBe("test.com?q=1&query=search&name=testName");
  });
});
