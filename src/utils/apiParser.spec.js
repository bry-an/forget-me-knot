import { getFixedImages } from "./apiParser.js";
import sampleApiResponse from "./__mocks__/sampleGiphyApiResponse.js";
import take from "ramda/src/take";

describe("getFixedImages", () => {
  it("Correctly extracts fixed image url path, returns in array", () => {
    expect(getFixedImages(take(1), sampleApiResponse.data)).toBeInstanceOf(
      Array
    );
    expect(getFixedImages(take(1), sampleApiResponse.data)).toStrictEqual([
      sampleApiResponse.data[0].images.fixed_height.url,
    ]);
  });
});
