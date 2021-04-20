<template>
  <div class="flex justify-center mb-4 status">
    <h3
      :class="{
        'text-terracotta': wrongAnswer,
        'text-mint': rightAnswer,
        'text-plum': defaultStatus,
      }"
    >
      {{ statusMessage }}
    </h3>
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
  },
  defaultStatus() {
    return !this.wrongAnswer && !this.rightAnswer;
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/appStyles.scss";
.status {
  font-family: "Red Hat Display", sans-serif;
}
</style>
