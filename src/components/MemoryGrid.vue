<template>
  Status: {{ statusMessage }}
  <div class="grid grid-cols-6 gap-x-3 gap-y-3 xl:gap-y-6">
    <memory-grid-tile
      @select-tile="selectTile"
      v-for="(tile, i) in grid"
      :key="tile.key"
      :tile="tile"
      :index="i"
      :class="{ shake: tile.clicked && wrongAnswer }"
      :icon="getTileOverlay(tile)"
    />
  </div>
</template>

<script>
import MemoryGridTile from "./MemoryGridTile.vue";
import { buildGrid, removeFromGrid, shuffle } from "../utils/grid.js";
import { fetchImagesByQuery } from "../api/giphyClient.js";
import { getFixedImages } from "../utils/apiParser.js";
import take from "ramda/src/take";
import map from "ramda/src/map";
import assoc from "ramda/src/assoc";
import compose from "ramda/src/compose";
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
      wrong: "Try again!",
      correct: "Correct!",
    },
    gameStatus: true,
    timers: [],
  }),
  components: {
    MemoryGridTile,
  },
  methods: {
    getTileOverlay(tile) {
      if (this.wrongAnswer && tile.clicked) return "wrong-icon";
      if (this.rightAnswer && tile.clicked) return "right-icon";
      return "";
    },
    setStatusMessage(status) {
      this.statusMessage = status;
      this.delayed(() => (this.statusMessage = this.statusMessages.default))(3);
    },
    checkCorrectSelection(tile) {
      return this.selectedTile.sibling.key === tile.key;
    },
    delay(fn, seconds) {
      this.timers.push(setTimeout(fn, seconds * 1000));
    },
    delayed(fn) {
      return (seconds, ...args) =>
        this.timers.push(
          setTimeout(() => fn.apply(this, args), seconds * 1000)
        );
    },
    selectTile(tile, i) {
      this.grid[i].clicked = true;
      if (!this.selectedTile) {
        this.selectedTile = tile;
        return;
      }
      if (this.selectedTile.key === tile.key) return; // selected same tile, short-circuit rest of check
      if (this.checkCorrectSelection(tile)) {
        this.delayed(this.removeTile)(3, tile);
        this.setStatusMessage(this.statusMessages.correct);
        this.setAnswer("rightAnswer");
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
    removeTile(tile) {
      this.grid = removeFromGrid(tile.slug, this.grid);
    },
    buildGridFromGiphyImages(json) {
      const takeN = take(this.gridSize / 2);
      this.grid = compose(shuffle, buildGrid, getFixedImages)(json.data, takeN);
    },
  },
  watch: {
    grid(newVal) {
      if (newVal.length === 0) {
        this.gameStatus = false;
      }
    },
  },
  mounted() {
    fetchImagesByQuery({ q: "computers" })
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
