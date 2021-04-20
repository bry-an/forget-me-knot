<template>
  <style-provider>
    <app-title />
    <memory-grid />
  </style-provider>
</template>

<script>
import MemoryGrid from "./components/MemoryGrid.vue";
import StyleProvider from "./components/StyleProvider.vue";
import AppTitle from "./components/AppTitle.vue";

export default {
  name: "App",
  components: {
    MemoryGrid,
    StyleProvider,
    AppTitle,
  },
};
</script>

<style></style>
