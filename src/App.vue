<template>
  <style-provider>
    <app-title />
    <memory-grid />
    <Footer />
  </style-provider>
</template>

<script>
import MemoryGrid from "./components/MemoryGrid.vue";
import StyleProvider from "./components/StyleProvider.vue";
import AppTitle from "./components/AppTitle.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    MemoryGrid,
    StyleProvider,
    AppTitle,
    Footer,
  },
};
</script>
