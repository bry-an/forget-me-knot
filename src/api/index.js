import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";
import head from "ramda/src/head";
import last from "ramda/src/last";
import compose from "ramda/src/compose";
import curry from "ramda/src/curry";
import toPairs from "ramda/src/toPairs";

const buildQueryParams = (url, param) =>
  reduce(concat, url, ["&", head(param), "=", last(param)]);

const buildUrl = curry((baseUrl, params) =>
  reduce(buildQueryParams, baseUrl, params)
);

const buildRequest = curry((baseUrl, client, params) => {
  const paramPairs = toPairs(params);
  const requestUrl = buildUrl(baseUrl);

  return compose(client, requestUrl)(paramPairs);
});

export { buildUrl, buildRequest };
