import { buildRequest } from "./index.js";

const baseGiphySearchUrl = `https://api.giphy.com/v1/gifs/?type=search&rating=g&api_key=${process.env.VUE_APP_KEY}`;
const giphyRequest = buildRequest(baseGiphySearchUrl);
const fetchImagesByQuery = giphyRequest(fetch);

export { fetchImagesByQuery };
