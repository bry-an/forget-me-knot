<template>
  <div class="relative">
    <app-icon
      v-if="icon"
      :scale="4"
      :class="['base-icon', icon]"
      :name="icon"
    />
    <div
      @click="$emit('select-tile', tile, index)"
      :class="['flip-tile cursor-pointer', { mask: icon !== '' }]"
    >
      <div :class="['flip-tile-inner', { 'flip-action': clicked }]">
        <div class="flip-tile-front">
          <img
            src="https://www.fillmurray.com/200/200"
            class="rounded-md"
            alt="memory-card-front"
          />
        </div>
        <div class="flip-tile-back flex items-center rounded-md">
          <img
            :style="{ background: `url(${tile.slug})` }"
            :src="tile.slug"
            alt="memory-game-tile"
            class="rounded-md"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppIcon from "./AppIcon.vue";
export default {
  name: "MemoryGridTile",
  components: {
    AppIcon,
  },
  props: {
    tile: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  computed: {
    clicked() {
      return this.tile.clicked;
    },
    getImage() {
      const images = require.context("../assets/", false, /\.svg$/);
      return images("./" + this.overlay + ".svg");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/appStyles.scss";
.mask {
  opacity: 0.5;
}
.base-icon {
  z-index: 10;
  position: absolute;
  left: 25%;
  transform: translateY(50%);
}
.wrong-icon {
  color: $mem-terracotta;
}
.right-icon {
  color: $mem-mint;
}
.flip-tile {
  height: 200px;
  width: 200px;
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
.flip-tile-front {
  color: black;
}

.flip-tile-back {
  width: 200px;
  height: 200px;
  background-color: white;
  transform: rotateY(180deg);
}

.flip-action {
  transform: rotateY(180deg);
}
</style>
