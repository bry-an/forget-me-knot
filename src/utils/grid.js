import assoc from "ramda/src/assoc";
import compose from "ramda/src/compose";
import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";

const tiePair = (pair) => {
  const [pair1, pair2] = pair;
  return [assoc("sibling", pair2, pair1), assoc("sibling", pair1, pair2)];
};

const generatePair = (slug) => [{ slug }, { slug }];

const generateLinkedItems = compose(tiePair, generatePair);

const addTileToGrid = (grid, tile) => concat(generateLinkedItems(tile), grid);

const buildGrid = reduce(addTileToGrid, []);

export { buildGrid };
