import map from "ramda/src/map";
import path from "ramda/src/path";

/**
 *
 * @param {GiphyImage} giphyImage -- see https://developers.giphy.com/docs/api/schema#gif-object
 * @returns String url of giphy image
 */
const getFixedImage = (giphyImage) =>
  path(["images", "fixed_height", "url"], giphyImage);

/**
 *
 * @param {Function} take Method that behaves like https://ramdajs.com/docs/#take
 * @param {*} data Array of giphy GIFs -- see https://developers.giphy.com/docs/api/schema#gif-object
 * @returns Array of Strings representing giphy image URLs
 */
const getFixedImages = (take, data) => take(map(getFixedImage, data));

export { getFixedImages };
