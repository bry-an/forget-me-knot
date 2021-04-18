import { ref } from "vue";
import { getReactive, setReactive } from "./composableUtilities.js";
import { buildGrid, removeFrom } from "../utils/grid";
import compose from "ramda/src/compose";

const grid = ref([]);
const setGrid = setReactive(grid);
const getGrid = getReactive(grid);
const buildReactiveGrid = compose(setGrid, buildGrid);
const removeSlugFromGrid = compose(setGrid, removeFrom(getGrid));

export { grid, buildReactiveGrid, removeSlugFromGrid, setGrid, getGrid };
