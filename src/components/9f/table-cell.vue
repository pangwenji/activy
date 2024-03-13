<template>
    <div class="table-cell" :style="styles">
        <slot name="cell"></slot>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    styles?: {
        width: string
    },
}>()
</script>

<style lang="scss" scoped>
.table-cell {
    display: table-cell;
    padding: 0.3750rem;
    vertical-align: middle;

    /*display: table-cell时margin会失效*/
}
</style>