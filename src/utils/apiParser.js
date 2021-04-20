import map from "ramda/src/map";
import path from "ramda/src/path";

const getFixedImage = (giphyImage) =>
  path(["images", "fixed_height", "url"], giphyImage);

const getFixedImages = (take, data) => take(map(getFixedImage, data));

export { getFixedImages };
