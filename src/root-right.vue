<script setup lang="ts">
import { onMounted,onUnmounted } from "vue";
onMounted(() => {
  document.documentElement.style.setProperty("--right-width",'300px');
})
onUnmounted(() => {
  document.documentElement.style.setProperty("--right-width",'0px');
})
</script>

<template>
    <div class="right">right</div>
</template>

<style lang="scss" scoped>
.right {
  width: var(--right-width);
  position:fixed;
  right:0;
  top:0;
  bottom:0;
  background-color: rgb(68, 77, 209);
  z-index:calc(var(--I1) + 0);
}
</style>