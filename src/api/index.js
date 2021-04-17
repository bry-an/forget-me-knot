import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";
import head from "ramda/src/head";
import last from "ramda/src/last";
import compose from "ramda/src/compose";
import curry from "ramda/src/curry";
import values from "ramda/src/values";
import mergeDeepLeft from "ramda/src/mergeDeepLeft";

const baseSearchUrl = "https://api.giphy.com/v1/gifs/?type=search";
const giphyBaseParams = {
  rating: "g",
  api_key: process.env.VUE_APP_KEY,
};

const buildRequest = curry((baseUrl, baseParams, params) => {
  const p = compose(values, mergeDeepLeft)(baseParams, params);

  const buildQuery = (url, param) =>
    reduce(concat, url, ["&", head(param), "=", last(param)]);

  const buildUrl = reduce(buildQuery, p, baseUrl);

  return compose(fetch, buildUrl);
});

const getGiphyImages = buildRequest(baseSearchUrl, giphyBaseParams);

export { getGiphyImages };
