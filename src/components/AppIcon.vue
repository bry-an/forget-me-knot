<template>
  <svg :height="size" viewBox="0 0 25 25">
    <path fill="currentColor" :d="path" />
  </svg>
</template>

<script>
import icons from "@/assets/images/icons/icons.js";
export default {
  name: "AppIcon",
  props: {
    name: {
      type: String,
      default: "",
    },
    scale: {
      type: [Number, String],
      default: 1,
    },
  },
  computed: {
    path() {
      return icons[this.name];
    },
    size() {
      return 25 * this.scale;
    },
  },
};
</script>
<style lang="scss"></style>
