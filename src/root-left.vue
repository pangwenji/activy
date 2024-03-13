<script setup lang="ts">
import Hall from "./pages/hall.vue";

import { onMounted, onUnmounted } from "vue";
onMounted(() => {
  document.documentElement.style.setProperty("--left-width", "0px");
});
onUnmounted(() => {
  document.documentElement.style.setProperty("--left-width", "296px");
});
</script>

<template>
  <div class="left">
    <keep-alive>
      <hall></hall>
    </keep-alive>
  </div>
</template>

<style lang="scss" scoped>
.left {
  width: var(--left-width);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  background-color: #1b1839;
  z-index: calc(var(--I1) + 1);
  transition: width .3s ease-in-out;
}
</style>
