import assoc from "ramda/src/assoc";
import compose from "ramda/src/compose";
import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";
import propEq from "ramda/src/propEq";
import map from "ramda/src/map";
import sort from "ramda/src/sort";
import dissoc from "ramda/src/dissoc";
import when from "ramda/src/when";

/**
 *
 * @param {Array} pair of images
 * @returns Array of pairs with an added sibling property
 */
const tiePair = (pair) => {
  const [first, second] = pair;
  return [assoc("sibling", second, first), assoc("sibling", first, second)];
};

/**
 *
 * @param {String} slug unique value to identify a pair of tiles
 * @returns Array of duplicated Tile items
 */
const generatePair = (slug) => [
  { slug, key: `${slug}-1`, clicked: false, display: true },
  { slug, key: `${slug}-2`, clicked: false, display: true },
];

/**
 * @returns Function that accepts a slug, returns an array of duplicated, associated Tiles keyed with each slug
 */
const generateLinkedItems = compose(tiePair, generatePair);

/**
 * buildGrid reducer function
 * @param {Array} grid accumulator
 * @param {Object} tile Tile to be added to grid
 * @returns Grid accumulator
 */
const addTileToGrid = (grid, slug) => concat(generateLinkedItems(slug), grid);

/**
 * Partial function that returns function expecting array of slugs used to generate grid.
 * Total function returns Grid
 */
const buildGrid = reduce(addTileToGrid, []);

const setDisplay = assoc("display");
const setClicked = assoc("clicked");
const setDisplayTrue = setDisplay(true);
const setDisplayFalse = setDisplay(false);

/**
 *
 * @param {String} slug to remove (will affect both instances of slug)
 * @param {Array} grid that contains tiles
 * @returns Array grid with tiles corresponding to slug modified to have display property false
 */
const removeFromDisplayedGrid = (slug, grid) =>
  map(when(propEq("slug", slug), setDisplayFalse), grid);

/**
 *
 * @param {String} key corresponding to unique tile key
 * @param {Boolean} clicked value to apply to tile
 * @param {Array} grid containing tile to be modified
 * @returns Array grid with indicated tile modified
 */
const setClickedOnGridItem = (key, clicked, grid) =>
  map(when(propEq("key", key), setClicked(clicked)), grid);

/**
 * Associates random number with each item, sorts based on random number, dissociates random number
 * @param {Array} Array to be shuffled
 * @returns Array shuffled
 */
const shuffle = (arr) =>
  map(
    dissoc("random"),
    sort(
      (a, b) => a.random - b.random,
      map((o) => assoc("random", Math.random(), o), arr)
    )
  );

/**
 * Returns total function expecting a grid whose tiles' display values will be set to true and will be shuffled.
 * Total function returns grid
 */
const resetGrid = compose(shuffle, map(setDisplayTrue));

export {
  buildGrid,
  removeFromDisplayedGrid,
  shuffle,
  setClickedOnGridItem,
  resetGrid,
};
