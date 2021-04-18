<template>
  <div>Memory Grid!</div>
  <memory-grid-tile v-for="tile in grid" :key="tile.slug" :tile="tile" />
</template>

<script>
import { onMounted } from "vue";
import { buildReactiveGrid, grid } from "../composables/gridComposables.js";
import MemoryGridTile from "./MemoryGridTile.vue";
import sampleGrid from "../assets/tempGrid";
export default {
  name: "MemoryGrid",
  components: {
    MemoryGridTile,
  },
  setup() {
    onMounted(() => {
      buildReactiveGrid(sampleGrid);
    });
    return {
      grid,
    };
  },
};
</script>

<style scoped></style>
