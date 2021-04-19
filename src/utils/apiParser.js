import map from "ramda/src/map";
const getFixedImage = (giphyImage) => {
  return giphyImage.images.fixed_height.url;
};

const getFixedImages = (data, take) => take(map(getFixedImage, data));

export { getFixedImages };
