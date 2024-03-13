<template>
    <div ref="scroll">
        <div :style="scrollStyle" v-if="scrollX">
            <slot></slot>
        </div>
        <slot v-else></slot>
    </div>
</template>

<script setup lang="ts">

import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'
import NestedScroll from '@better-scroll/nested-scroll'
// import NestedScroll from '@better-scroll/nested-scroll'

import { onMounted, ref, onUnmounted, defineProps, withDefaults, watch } from 'vue';

const props = withDefaults(defineProps<{
    mouseWheel?:boolean,
    showScrollbar?:boolean,
    scrollY?:boolean,
    scrollX?:boolean,
    bounce?:boolean,
    disable?:boolean,
    x?:number,
    y?:number,
    
}>(), {
    mouseWheel: false,
    showScrollbar:false,
    scrollY:false,
    scrollX:false,
    bounce:true,
    x:0,
    y:0
})

const scrollStyle = props.scrollX ? 'display:inline-block; white-space nowrap;height:100%;min-width:100%;' : ''
const scroll = ref<HTMLElement | null>(null);
let bs: BScroll | undefined;


let options: AnyObject = {
    probeType:2,
    bounce:props.bounce,
    scrollY: props.scrollY,
    scrollX: props.scrollX,
    // ===============================================================
    /**
     * 嵌套
     */
    nestedScroll: {
        groupId: 'shared'
    },
    click: true,
    // ===============================================================
    /**滚动条 */
    scrollbar: props.showScrollbar,
    // ===============================================================
    /**鼠标滚轮的能力 */
    mouseWheel:props.mouseWheel,
    // ===============================================================
    // 开启 observe-dom 插件
    observeDOM: true,
    observeImage: true
}

const refresh = () => bs?.refresh();

watch(props,(newProps,_oldProps) => {
    bs?.scrollTo(newProps.x,newProps.y);
})

const emit = defineEmits(['update:y','update:x']);

onMounted(() => {
    
    if(!props.disable) {
        // ===============================================================
        /**
         * 嵌套
         */
        BScroll.use(NestedScroll)
        // BScroll.use(NestedScroll)
        // ===============================================================
        /**
         * 滚动条样式
         */
        if(props.showScrollbar){
            BScroll.use(ScrollBar)
        }

        // ===============================================================
        /**鼠标滚轮的能力 */
        if(props.mouseWheel){
            BScroll.use(MouseWheel)
        }
        // ===============================================================
        /**防抖 自动检测dom变化 */
        BScroll.use(ObserveDOM)
        BScroll.use(ObserveImage)
        // ===============================================================

        // console.log(options);
        bs = new BScroll(scroll.value as HTMLElement, options);
        bs.scrollTo(props.x,props.y);
        window.addEventListener('resize',refresh)
        bs.on('scroll', (position: { x: any; y: any; }) => {
            // console.log(position.x, position.y)
            emit('update:x', position.x);
            emit('update:y', position.y);
        })
        // console.log(NestedScroll.getAllNestedScrolls());
    }
    
    
})

onUnmounted(() => {
    if(!props.disable){
        bs?.destroy();
        window.removeEventListener('resize',refresh)
    }
})


</script>

<style lang="scss" scoped>
.pullup-tips {
    padding: 20px;
    text-align: center;
    color: #999;
}




.pulldown-wrapper {

    position: absolute;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    transform: translateY(-100%) translateZ(0);
    text-align: center;
    color: #999;
}




page-content {
    display: block;
    height: 100%;
    position: relative;
    z-index:calc(var(--I1) + 0);
    overflow: hidden;
}

page-view {
    display: block;
    height: 100%;
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    overflow: hidden;
    background-color: var(--body-background-color);
}

.page-head,
.public-page-head {
    &+page-content {
        height: calc(100% - var(--headers-height));
    }
}
</style>