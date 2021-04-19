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
    />
  </div>
</template>

<script>
import MemoryGridTile from "./MemoryGridTile.vue";
import { buildGrid, removeFromGrid } from "../utils/grid.js";
import { fetchImagesByQuery } from "../api/giphyClient.js";
import { getFixedImages } from "../utils/apiParser.js";
import take from "ramda/src/take";
import map from "ramda/src/map";
import assoc from "ramda/src/assoc";
export default {
  name: "MemoryGrid",
  data: () => ({
    grid: [],
    gridSize: 24,
    selectedTile: null,
    wrongAnswer: false,
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
    setStatusMessage(status) {
      this.statusMessage = status;
      this.delay(
        () => (this.statusMessage = this.statusMessages.default),
        3 * 1000
      );
    },
    checkCorrectSelection(tile) {
      return this.selectedTile.sibling.slug === tile.slug;
    },
    delay(fn, time) {
      this.timers.push(setTimeout(fn, time));
    },
    selectTile(tile, i) {
      this.grid[i].clicked = true;
      if (!this.selectedTile) {
        this.selectedTile = tile;
        return;
      }
      if (this.checkCorrectSelection(tile)) {
        this.removeTile(tile);
        this.setStatusMessage(this.statusMessages.correct);
      } else {
        this.setWrongAnswer();
        this.setStatusMessage(this.statusMessages.wrong);
      }
      this.selectedTile = null;
      this.delay(this.resetClickedProperties, 1 * 1000);
    },
    setWrongAnswer() {
      this.wrongAnswer = true;
      this.delay(() => (this.wrongAnswer = false), 3 * 1000);
    },
    resetClickedProperties() {
      const resetClicked = assoc("clicked", false);
      this.grid = map(resetClicked, this.grid);
    },
    removeTile(tile) {
      this.grid = removeFromGrid(tile.slug, this.grid);
    },
    buildGridFromGiphyImages(json) {
      const takeN = take(this.gridSize / 2);
      this.grid = buildGrid(getFixedImages(json.data, takeN));
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
