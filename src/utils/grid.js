import assoc from "ramda/src/assoc";
import compose from "ramda/src/compose";
import concat from "ramda/src/concat";
import reduce from "ramda/src/reduce";
import propEq from "ramda/src/propEq";
import map from "ramda/src/map";
import sort from "ramda/src/sort";
import dissoc from "ramda/src/dissoc";
import when from "ramda/src/when";

const tiePair = (pair) => {
  const [first, second] = pair;
  return [assoc("sibling", second, first), assoc("sibling", first, second)];
};

const generatePair = (slug) => [
  { slug, key: `${slug}-1`, clicked: false, display: true },
  { slug, key: `${slug}-2`, clicked: false, display: true },
];

const generateLinkedItems = compose(tiePair, generatePair);

const addTileToGrid = (grid, tile) => concat(generateLinkedItems(tile), grid);

const buildGrid = reduce(addTileToGrid, []);

const setDisplay = assoc("display");
const setClicked = assoc("clicked");
const setDisplayTrue = setDisplay(true);
const setDisplayFalse = setDisplay(false);

const removeFromDisplayedGrid = (slug, grid) =>
  map(when(propEq("slug", slug), setDisplayFalse), grid);

const setClickedOnGridItem = (key, clicked, grid) =>
  map(when(propEq("key", key), setClicked(clicked)), grid);

/**
 * Associates random number with each item, sorts based on random number, dissociates random number
 * @param {Array} Array to be shuffled
 * @returns Array
 */
const shuffle = (arr) =>
  map(
    dissoc("random"),
    sort(
      (a, b) => a.random - b.random,
      map((o) => assoc("random", Math.random(), o), arr)
    )
  );

const resetGrid = compose(shuffle, map(setDisplayTrue));

export {
  buildGrid,
  removeFromDisplayedGrid,
  shuffle,
  setClickedOnGridItem,
  resetGrid,
};
