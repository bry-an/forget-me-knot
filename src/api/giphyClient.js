import { buildRequest } from "./index.js";

const giphyBaseParams = {
  rating: "g",
  api_key: process.env.VUE_APP_KEY,
};
const baseSearchUrl = "https://api.giphy.com/v1/gifs/?type=search";
const giphyRequest = buildRequest(baseSearchUrl, giphyBaseParams);
const fetchImagesByQuery = giphyRequest(fetch);

export { fetchImagesByQuery };
