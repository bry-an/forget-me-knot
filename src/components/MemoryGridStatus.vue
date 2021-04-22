<template>
  <div class="flex justify-between my-4 status">
    <h4
      :class="{
        'text-terracotta': wrongAnswer,
        'text-mint': rightAnswer,
        'text-plum': defaultStatus,
      }"
    >
      > {{ statusMessage }}
    </h4>
    <h4 class="text-mint">Cards remaining: {{ remainingTiles }}</h4>
  </div>
</template>
<script>
export default {
  name: "MemoryGridStatus",
  props: {
    statusMessage: {
      type: String,
      default: "",
    },
    wrongAnswer: {
      type: Boolean,
      default: false,
    },
    rightAnswer: {
      type: Boolean,
      default: false,
    },
    remainingTiles: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    defaultStatus() {
      return !this.wrongAnswer && !this.rightAnswer;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/appStyles.scss";
.status {
  font-family: "Press Start 2P", cursive;
}
</style>
