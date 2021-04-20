<template>
  <memory-grid-status
    :status-message="statusMessage"
    :wrong-answer="wrongAnswer"
    :right-answer="rightAnswer"
    :remaining-tiles="remainingTiles"
  />
  <div class="grid grid-cols-6 gap-x-3 gap-y-3 xl:gap-y-6">
    <div v-for="tile in grid" :key="tile.key" class="flex justify-center">
      <memory-grid-tile
        @select-tile="selectTile"
        :tile="tile"
        :class="{ shake: tile.clicked && wrongAnswer }"
        :icon="getTileOverlay(tile)"
      />
    </div>
  </div>
</template>

<script>
import MemoryGridTile from "./MemoryGridTile.vue";
import MemoryGridStatus from "./MemoryGridStatus.vue";
import {
  buildGrid,
  removeFromDisplayedGrid,
  shuffle,
  setClickedOnGridItem,
} from "../utils/grid.js";
import { fetchImagesByQuery } from "../api/giphyClient.js";
import { getFixedImages } from "../utils/apiParser.js";
import take from "ramda/src/take";
import map from "ramda/src/map";
import assoc from "ramda/src/assoc";
import compose from "ramda/src/compose";
import filter from "ramda/src/filter";
import propEq from "ramda/src/propEq";
import length from "ramda/src/length";
import not from "ramda/src/length";
export default {
  name: "MemoryGrid",
  data: () => ({
    grid: [],
    gridSize: 24,
    selectedTile: null,
    wrongAnswer: false,
    rightAnswer: false,
    statusMessage: "Select a card",
    statusMessages: {
      default: "Select a card",
      wrong: "Try again",
      right: "Correct!",
    },
    gameIsRunning: true,
    timers: [],
  }),
  components: {
    MemoryGridTile,
    MemoryGridStatus,
  },
  methods: {
    getTileOverlay(tile) {
      if (this.wrongAnswer && tile.clicked) return "wrong-icon";
      if (this.rightAnswer && tile.clicked) return "right-icon";
      return "";
    },
    setStatusMessage(status) {
      this.delayed(() => (this.statusMessage = status))(0.8);
      this.delayed(() => (this.statusMessage = this.statusMessages.default))(3);
    },
    checkCorrectSelection(tile) {
      return this.selectedTile.sibling.key === tile.key;
    },
    delayed(fn) {
      return (seconds, ...args) =>
        this.timers.push(
          setTimeout(() => fn.apply(this, args), seconds * 1000)
        );
    },
    selectTile(tile) {
      if (this.wrongAnswer || this.rightAnswer) return; // time between turns, don't do anything
      this.grid = setClickedOnGridItem(tile.key, true, this.grid);
      if (!this.selectedTile) {
        // first tile picked, no need to check status
        this.selectedTile = tile;
        return;
      }
      if (this.selectedTile.key === tile.key) {
        // selected same tile, unselect it
        this.selectedTile = null;
        this.grid = setClickedOnGridItem(tile.key, false, this.grid);
        return;
      }
      if (this.checkCorrectSelection(tile)) {
        this.delayed(this.hideTile)(3, tile);
        this.setStatusMessage(this.statusMessages.right);
        this.setAnswer("rightAnswer");
        this.gameIsRunning = this.checkEndOfGame() ? false : true;
      } else {
        this.setAnswer("wrongAnswer");
        this.setStatusMessage(this.statusMessages.wrong);
      }
      this.selectedTile = null;
      this.delayed(this.resetClickedProperties)(3); // second tile clicked, reset `clicked`
    },
    setAnswer(status) {
      this.delayed(() => (this[status] = true))(0.8); // give tile chance to flip before marking
      this.delayed(() => (this[status] = false))(3); // reset
    },
    resetClickedProperties() {
      this.grid = map(assoc("clicked", false), this.grid);
    },
    hideTile(tile) {
      this.grid = removeFromDisplayedGrid(tile.slug, this.grid);
    },
    buildGridFromGiphyImages(json) {
      const takeN = take(this.gridSize / 2); // n size grid requires n/2 images
      this.grid = compose(shuffle, buildGrid, getFixedImages)(json.data, takeN);
    },
    checkEndOfGame() {
      return not(this.remainingTiles);
    },
  },
  computed: {
    remainingTiles() {
      const getFilteredLength = compose(length, filter);
      return getFilteredLength(propEq("display", true), this.grid);
    },
  },
  mounted() {
    fetchImagesByQuery({ q: "bill murray" })
      .then((res) => res.json())
      .then(this.buildGridFromGiphyImages);
  },
  unmounted() {
    this.timers.length && this.timers.forEach((t) => clearTimeout(t));
  },
};
</script>

<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
