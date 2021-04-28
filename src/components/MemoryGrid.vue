<template>
  <memory-grid-status
    :status-message="statusMessage"
    :wrong-answer="wrongAnswer"
    :right-answer="rightAnswer"
    :remaining-tiles="remainingTiles"
  />
  <div v-if="loading" class="text-center">
    Please wait while your game loads...
  </div>
  <div
    v-if="gameIsRunning"
    class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-3 xl:gap-y-6 mx-auto mt-8"
  >
    <div v-for="tile in grid" :key="tile.key" class="flex justify-center">
      <memory-grid-tile
        @select-tile="selectTile"
        :tile="tile"
        :class="{ shake: tile.clicked && wrongAnswer }"
        :icon="getTileOverlay(tile)"
      />
    </div>
  </div>
  <div
    v-else
    class="flex flex-col items-center justify-center mt-8"
    data-test="game-over"
  >
    <img src="https://rb.gy/7ymrtx" class="rounded-md" alt="game-over" />
    <div>
      <button
        @click="resetGame"
        class="border rounded-md mt-6 p-2 bg-mint hover:bg-terracotta"
      >
        <h4 class="text-plum play-again">Play Again!</h4>
      </button>
    </div>
  </div>
  <div v-if="error" class="flex flex-col items-center justify-center mt-8">
    That's an error! Please refresh the page to try again.
  </div>
</template>

<script>
import MemoryGridTile from "./MemoryGridTile.vue";
import MemoryGridStatus from "./MemoryGridStatus.vue";
import {
  buildGrid,
  removeFromDisplayedGrid,
  setClickedOnGridItem,
  resetGrid,
  shuffle,
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
      won: "You won!!",
    },
    gameIsRunning: true,
    timers: [],
    loading: false,
    error: false,
    theme: "bill murray",
    inputDisabled: false,
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
      this.delayed(() => (this.statusMessage = status))(0.8); // wait one second before displaying result
      this.delayed(() => (this.statusMessage = this.statusMessages.default))(3);
    },
    disableInput() {
      this.inputDisabled = true;
      this.delayed(() => (this.inputDisabled = false))(3);
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
      if (this.inputDisabled) return; // don't allow input when both tiles selected (between turns)
      this.grid = setClickedOnGridItem(tile.key, true, this.grid);
      if (!this.selectedTile) {
        // first tile picked, no need to check status
        this.selectedTile = tile;
        return;
      }
      // second tile picked, delay all input for a second
      if (this.selectedTile.key === tile.key) {
        // selected same tile, unselect it
        this.selectedTile = null;
        this.grid = setClickedOnGridItem(tile.key, false, this.grid);
        return;
      }
      this.disableInput();
      if (this.checkCorrectSelection(tile)) {
        this.handleCorrectAnswer(tile);
      } else {
        this.handleWrongAnswer();
      }
      this.selectedTile = null;
      this.delayed(this.resetClickedProperties)(3); // second tile clicked, reset `clicked`
    },
    handleWrongAnswer() {
      this.setAnswer("wrongAnswer");
      this.setStatusMessage(this.statusMessages.wrong);
    },
    handleCorrectAnswer(tile) {
      this.delayed(this.hideTile)(3, tile);
      this.setStatusMessage(this.statusMessages.right);
      this.setAnswer("rightAnswer");
    },
    setAnswer(status) {
      this.delayed(() => (this[status] = true))(0.8); // set status after second delay
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
      this.grid = compose(shuffle, buildGrid, getFixedImages)(takeN, json.data);
    },
    checkGameStillRunning() {
      return this.remainingTiles > 0;
    },
    getImages() {
      return fetchImagesByQuery({ q: this.theme })
        .then((res) => res.json())
        .then(this.buildGridFromGiphyImages);
    },
    endGame() {
      this.gameIsRunning = false;
      this.setStatusMessage(this.statusMessages.won);
    },
    resetGame() {
      this.setStatusMessage(this.statusMessages.default);
      this.gameIsRunning = true;
      this.grid = resetGrid(this.grid);
    },
  },
  computed: {
    remainingTiles() {
      const getFilteredLength = compose(length, filter);
      return getFilteredLength(propEq("display", true), this.grid);
    },
  },
  mounted() {
    this.loading = true;
    this.getImages()
      .then(() => (this.loading = false))
      .catch((e) => {
        this.loading = false;
        this.error = true;
        console.error(e);
      });
  },
  unmounted() {
    this.timers.length && this.timers.forEach((t) => clearTimeout(t));
  },
  watch: {
    remainingTiles(newVal) {
      if (newVal === 0) {
        this.endGame();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/appStyles.scss";
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.play-again {
  font-family: "Press Start 2P", cursive;
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
