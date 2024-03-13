<template>
    <div class="table-card" :class="{ 'layout': !layout }">
        <div class="row">
            <slot name="name"></slot>
        </div>
        <slot name="row"></slot>
        <!-- <slot name="row"></slot> -->
    </div>
</template>

<script setup lang="ts">
defineProps<{
    layout?: boolean,
}>()
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.table-card {
    width: 100%;
    display: table;
    margin: auto;
    // padding: 0 0.6250rem;
    padding: 0.625rem 0;

    @include pc {
        padding: 0;
        border-radius: 16px;
    }
}

.layout {
    table-layout: fixed;
}

.row {
    display: table-row;
    // border: 1px solid #cccccc;
    text-align: center;
    font-size: 0.7500rem;
    color: #5B6DA1;

    /*display: table-row时margin、padding同时失效*/
    @include pc {
        height: 60px;
        font-size: 14px;
        border-radius: 16px;
        background-color: #231D4E;
        border-radius: 16px;
    }
}</style>