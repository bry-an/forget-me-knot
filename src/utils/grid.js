import assoc from "ramda/src/assoc";
import compose from "ramda/src/compose";
import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";
import not from "ramda/src/not";
import filter from "ramda/src/filter";
import propEq from "ramda/src/propEq";

const tiePair = (pair) => {
  const [pair1, pair2] = pair;
  return [assoc("sibling", pair2, pair1), assoc("sibling", pair1, pair2)];
};

const generatePair = (slug) => [
  { slug, key: `${slug}-1`, clicked: false },
  { slug, key: `${slug}-2`, clicked: false },
];

const generateLinkedItems = compose(tiePair, generatePair);

const addTileToGrid = (grid, tile) => concat(generateLinkedItems(tile), grid);

const buildGrid = reduce(addTileToGrid, []);

const notSlug = (slug) => compose(not, propEq("slug", slug));

const removeFromGrid = (slug, grid) => filter(notSlug(slug), grid);

export { buildGrid, removeFromGrid };
