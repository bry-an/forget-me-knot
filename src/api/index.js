import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";
import head from "ramda/src/head";
import last from "ramda/src/last";
import compose from "ramda/src/compose";
import curry from "ramda/src/curry";
import toPairs from "ramda/src/toPairs";
import mergeDeepLeft from "ramda/src/mergeDeepLeft";

const baseSearchUrl = "https://api.giphy.com/v1/gifs/?type=search";
const giphyBaseParams = {
  rating: "g",
  api_key: process.env.VUE_APP_KEY,
};
const buildQueryParams = (url, param) =>
  reduce(concat, url, ["&", head(param), "=", last(param)]);

const buildBaseUrl = curry((baseUrl, params) =>
  reduce(buildQueryParams, baseUrl, toPairs(params))
);

const buildRequest = curry((baseUrl, baseParams, client, params = {}) => {
  const allParams = compose(toPairs, mergeDeepLeft)(baseParams, params);
  const requestUrl = buildBaseUrl(baseUrl);

  return compose(client, requestUrl)(allParams);
});

const getGiphyImages = buildRequest(baseSearchUrl, giphyBaseParams);

export { getGiphyImages, buildBaseUrl };
