<template>
  <style-provider>
    <memory-grid />
  </style-provider>
</template>

<script>
import MemoryGrid from "./components/MemoryGrid.vue";
import StyleProvider from "./components/StyleProvider.vue";

export default {
  name: "App",
  components: {
    MemoryGrid,
    StyleProvider,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
