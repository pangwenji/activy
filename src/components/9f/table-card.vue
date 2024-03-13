<template>
    <div class="table-card" :class="{ 'layout': !layout }">
        <div class="row" :style="customStyle">
            <slot name="name"></slot>
        </div>
        <slot name="row"></slot>
        <!-- <slot name="row"></slot> -->
    </div>
</template>

<script setup lang="ts">
defineProps<{
    layout?: boolean,
    customStyle?: Partial<CSSStyleDeclaration>,
}>()
</script>

<style lang="scss" scoped>
@import "@/scss/public.scss";

.table-card {
    width: 100%;
    display: table;
    margin: auto;
    // padding: 0 0.6250rem;

    @include pc {
        padding: 0;
        border-radius: 16px;
    }
}

.layout {
    table-layout: fixed;
}

table {
    border-collapse: collapse;
}

.row {
    box-sizing: border-box;
    display: table-row;
    // border: 1px solid #cccccc;
    text-align: center;
    font-size: .8125rem;
    color: #98a7b5;
    background: #151d28;
    height: 2.8125rem;

    /*display: table-row时margin、padding同时失效*/
    @include pc {
        height: 60px;
        font-size: 14px;
        border-radius: 16px;
        background-color: #231D4E;
        border-radius: 16px;
    }
}
</style>