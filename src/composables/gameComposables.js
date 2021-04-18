import curry from "ramda/src/curry";
import path from "ramda/src/path";
import equals from "ramda/src/equals";
import { grid } from "./gridComposables.js";
import { getReactive } from "./composableUtilities.js";

const selectItem = curry((a, b) =>
  equals(path(["sibling", "slug"], a), path(["slug"], b))
);

const calculateGameProgress = curry(
  (origSize, currSize) => currSize / origSize
);

const specificGameProgress = calculateGameProgress(getReactive(grid).length);
const calculateIsGameRunning = (currProgress) =>
  specificGameProgress(currProgress) > 0;

export { selectItem, calculateGameProgress, calculateIsGameRunning };
