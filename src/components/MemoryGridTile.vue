<template>
  <div>{{ tile.slug }}</div>
</template>

<script>
export default {
  name: "MemoryGridTile",
  props: {
    tile: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
