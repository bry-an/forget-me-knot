<template>
  <div>
    {{ tile.clicked }}
    <img
      class="cursor-pointer"
      @click="$emit('select-tile', tile, index)"
      :src="tile.slug"
      alt="memory-game-tile"
    />
  </div>
</template>

<script>
export default {
  name: "MemoryGridTile",
  props: {
    tile: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="scss" scoped></style>
