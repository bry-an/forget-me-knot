import { buildUrl, buildRequest } from "./index.js";
import toPairs from "ramda/src/toPairs";

const testUrl = "test.com?q=1";
const params = { query: "search", name: "testName" };

describe("buildUrl", () => {
  it("Correctly builds URL with param pairs", () => {
    const url = buildUrl(testUrl)(toPairs(params));
    expect(url).toBe("test.com?q=1&query=search&name=testName");
  });
});

describe("buildRequest", () => {
  it("Correctly builds full request", () => {
    const fetch = jest.fn(() => Promise.resolve({ data: "test" }));
    const request = buildRequest(testUrl, fetch);
    request(params);
    expect(fetch).toHaveBeenCalledWith(
      "test.com?q=1&query=search&name=testName"
    );
  });
});
