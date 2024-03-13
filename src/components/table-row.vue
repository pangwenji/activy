<template>
    <div class="table-row">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.table-row {
    display: table-row;
    text-align: center;

    /*display: table-row时margin、padding同时失效*/
    @include pc {
        height: 60px;
        font-size: 14px;
    }
}
</style>