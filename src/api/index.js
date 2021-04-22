import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";
import curry from "ramda/src/curry";
import toPairs from "ramda/src/toPairs";

/**
 * Reducer function that concats query params onto url
 * @param {String} url
 * @param {Array} param
 * @returns String url with params appended
 */
const buildQueryParams = (url, param) => {
  const [key, value] = param;
  return reduce(concat, url, ["&", key, "=", value]);
};

/**
 * Concats all query params onto base url with above reducer function
 */
const buildUrl = (baseUrl, params) => reduce(buildQueryParams, baseUrl, params);

/**
 * Builds url, composes result into client -- works out of the box with fetch
 */
const buildRequest = curry((baseUrl, client, params) => {
  const fullUrl = buildUrl(baseUrl, toPairs(params));
  return client(fullUrl);
});

export { buildUrl, buildRequest };
