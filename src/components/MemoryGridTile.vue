<template>
  <div
    @click="$emit('select-tile', tile, index)"
    class="flip-tile cursor-pointer"
  >
    <div :class="['flip-tile-inner', { 'flip-action': clicked }]">
      <div class="flip-tile-front">
        <img src="https://www.fillmurray.com/200/200" alt="memory-card-front" />
      </div>
      <div class="flip-tile-back flex items-center">
        <img
          @click="$emit('select-tile', tile, index)"
          :style="{ background: `url(${tile.slug})` }"
          :src="tile.slug"
          alt="memory-game-tile"
        />
      </div>
    </div>
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
  computed: {
    clicked() {
      return this.tile.clicked;
    },
  },
};
</script>
<style lang="scss" scoped>
.flip-tile {
  width: 200px;
  height: 200px;
  perspective: 1000px;
  position: relative;
}

.flip-tile-inner {
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-tile-front,
.flip-tile-back {
  position: absolute;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}
.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-tile-back {
  width: 200px;
  height: 200px;
  background-color: black;
  transform: rotateY(180deg);
}

.flip-action {
  transform: rotateY(180deg);
}
</style>
