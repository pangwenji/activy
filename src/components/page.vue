<template>
    <page-view>
        <slot name="header" v-if="$slots['header']"></slot>
        <page-head v-else-if="showHeader" :title="title" :closeLocation="closeLocation" :backing-out="backingOut"
            :bg-color="titleBgColor" :left-cilck="titleLeftClick" :right-cilck="titleRightCilck" :box="headBox" :head-style="headStyle">
            <template #icon-right v-if="$slots['header-icon-right']">
                <slot name="header-icon-right"></slot>
            </template>
            <template #content v-if="$slots['header-content']">
                <slot name="header-content"></slot>
            </template>
            <template #icon-left v-if="$slots['header-icon-left']">
                <slot name="header-icon-left"></slot>
            </template>
            <template #right-content v-if="$slots['header-right-content']">
                <slot name="header-right-content"></slot>
            </template>
            <template #left-content v-if="$slots['header-left-content']">
                <slot name="header-left-content"></slot>
            </template>
            
        </page-head>

        <page-content ref="scroll" :style="contentStyle">
            <slot v-if="disableScrollbar"></slot>
            <div ref="content" class="page-div" :style="pageStyle" v-else>
                <div class="pulldown-wrapper" v-if="onPulldown">
                    <div v-show="beforePullDown">
                        <span v-show="isPullOk">{{ $t('ui.xl') }}</span>
                        <span v-show="!isPullOk">{{ $t('ui.sk') }}</span>
                    </div>
                    <div v-show="!beforePullDown">
                        <div v-show="isPullingDown">
                            <span>Loading...</span>
                        </div>
                        <div v-show="!isPullingDown">
                            <span>Refresh success</span>
                        </div>
                    </div>
                </div>
                <slot></slot>
                <div class="pullup-tips" v-if="onPullup" v-show="isPullUpLoad">
                    <div v-if="!isPullUpLoad" class="before-trigger">
                        <span class="pullup-txt">Pull up and load more</span>
                    </div>
                    <div v-else class="after-trigger">
                        <span class="pullup-txt">Loading...</span>
                    </div>
                </div>
            </div>
             <!-- custom-vertical-scrollbar-->
            <div v-if="showScrollbar && isPc" class="custom-vertical-scrollbar" ref="vertical">
                <div class="custom-vertical-indicator"></div>
            </div>
            <!-- custom-horizontal-scrollbar-->
            <div v-if="showScrollbar && isPc" class="custom-horizontal-scrollbar" ref="horizontal">
                <div class="custom-horizontal-indicator"></div>
            </div>
        </page-content>
        <slot name="footer"></slot>
    </page-view>
</template>

<script setup lang="ts">
import PageHead from './page-head.vue';

import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'

import { onMounted, ref, onUnmounted, defineProps, withDefaults, watch } from 'vue';

import type { StyleValue } from 'vue';
import NestedScroll from '@better-scroll/nested-scroll';
import { isJumpToTop, isPc, screenScroll } from '../uilts/async.var';



const props = withDefaults(defineProps<{
    showHeader?: boolean;
    headStyle?:AnyObject;
    title?: string;
    titleBgColor?: string;
    titleLeftClick?: () => void;
    titleRightCilck?: () => void;
    contentStyle?: StyleValue;
    pageStyle?: StyleValue;
    closeLocation?: "left" | "right",
    onPulldown?: Function,
    onPullup?: Function,
    backingOut?: Function,
    mouseWheel?: boolean,
    showScrollbar?: boolean,
    disableScrollbar?: boolean,
    bounce?:boolean,
    scrollY?: boolean,
    headBox?:Array<'left'|'content'|'right'>,
    jumpToTop?:boolean,
    x?:number,
    y?:number,
}>(), {
    showHeader: true,
    mouseWheel: false,
    showScrollbar: false,
    disableScrollbar: false,
    scrollY: true,
    bounce:true,
    x:0,
    y:0,
})


// ===============================================================
/**
 * 上拉加载
 */
const isPullUpLoad = ref(false);
// ===============================================================

const scroll = ref<HTMLElement | null>(null);
// const content = ref<HTMLElement | null>(null);
let bs: BScroll | undefined;

// ===============================================================
/**
 * 下拉刷新
 */
const beforePullDown = ref(true);
const isPullingDown = ref(false);
const isPullOk = ref(false);

const TIME_BOUNCE = 800
// const REQUEST_TIME = 1000
const THRESHOLD = 70
const STOP = 70
let STEP = 0
// ===============================================================

const horizontal = ref();
const vertical = ref();


let options: AnyObject = {
    probeType: 3,
    stopPropagation: true,
    disableTouch: false,
    click: true,
    disableMouse: false,
    scrollY: props.scrollY,
    bounce:props.bounce,
    nestedScroll: {
        groupId: 'shared'
    },
    // ===============================================================
    /**滚动条 */
    // scrollbar: props.showScrollbar,
    // ===============================================================
    /**鼠标滚轮的能力 */
    mouseWheel: props.mouseWheel,
    // ===============================================================
    // 开启 observe-dom 插件
    observeDOM: true,
    observeImage: true,
    tagException: { tagName: /^INPUT$/ },
}

const pullingDownHandler = async () => {
    beforePullDown.value = false
    isPullingDown.value = true;
    await (props.onPulldown && props.onPulldown());
    STEP += 1
    isPullingDown.value = false;
    finishPullDown();
}

const finishPullDown = async () => {
    bs?.finishPullDown();
    setTimeout(() => {
        beforePullDown.value = true;
        bs?.refresh();
    }, TIME_BOUNCE + 100);
}
const scrollHandler = (pos: { y: number }) => {
    isPullOk.value = (pos.y < THRESHOLD);
}


const pullingUpHandler = async () => {
    isPullUpLoad.value = true;
    await (props.onPullup && props.onPullup());
    bs?.finishPullUp();
    bs?.refresh();
    isPullUpLoad.value = false;
}

// watch(props,(_newJ,_oldJ) => {
//     if(props.jumpToTop === true){
//         bs?.scrollTo(0,0,0)
//     }
// })

watch(isJumpToTop,(_newJ,_oldJ) => {
    // console.log('去顶部');
    
    bs?.scrollTo(0,0,0)
})

watch(props,(newProps,_oldProps) => {
    bs?.scrollTo(newProps.x,newProps.y);
})

const emit = defineEmits(['update:y','update:x']);

onMounted(() => {

    // ===============================================================
    /**
     * 滚动条样式
     */
    if (props.showScrollbar) {
        BScroll.use(ScrollBar)
    }
    /**
 * 嵌套
 */
    BScroll.use(NestedScroll)
    // ===============================================================
    /**鼠标滚轮的能力 */
    if (props.mouseWheel) {
        BScroll.use(MouseWheel)
    }
    // ===============================================================
    /**防抖 自动检测dom变化 */
    BScroll.use(ObserveDOM)
    BScroll.use(ObserveImage)
    // ===============================================================


    if (!props.disableScrollbar) {
        if (props.onPulldown) {
            BScroll.use(PullDown)
            options = {
                ...options,
                bounceTime: TIME_BOUNCE,
                pullDownRefresh: {
                    threshold: THRESHOLD,
                    stop: STOP
                },
            }
        }

        if (props.onPullup) {
            BScroll.use(Pullup)
            options = {
                ...options,
                pullUpLoad: true
            }
        }

    }

    if(props.showScrollbar && isPc.value){
        options = {
            ...options,
            freeScroll: true,
            click: true,
            scrollbar: {
                customElements: [horizontal.value, vertical.value],
                fade: true,
                interactive: true,
                scrollbarTrackClickable: true
            }
        }
    }

    if (!props.disableScrollbar) {
        bs = new BScroll(scroll.value as HTMLElement, options);
        if (props.onPulldown) {
            bs.on('pullingDown', pullingDownHandler)
        }

        bs.on('scroll', (e: { x: number; y: number; }) => {
            screenScroll.value = true;
            
            emit('update:x', e.x);
            emit('update:y', e.y);
            if (props.onPulldown) {
                scrollHandler(e)
            }
        })
        bs.on('scrollEnd', () => {
            screenScroll.value = false;
        })
        
        bs.on('scrollCancel', () => {
            screenScroll.value = false;
        })

        if (props.onPullup) {
            bs.on('pullingUp', pullingUpHandler)
        }
        setTimeout(() => {

            bs?.refresh()
        }, 2000)
    }
})

onUnmounted(() => {
    if (!props.disableScrollbar) {
        bs?.destroy();
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
    width: 100%;
    height: 100%;
    position: relative;
    z-index:calc(var(--I1) + 0);
    overflow: hidden;
    box-sizing:border-box;
}

page-view {
    display: block;
    height: 100%;
    width: 100%;
    max-width: var(--content-max-width);
    margin: 0 auto;
    // overflow: hidden;
    background-color: var(--body-background-color);
}

.page-head,
.public-page-head {
    &+page-content {
        height: calc(100% - var(--headers-height));
    }
}

.page-div {
    min-height: 100%;
    width: 100%;
    position: relative;
}




    
  .custom-vertical-scrollbar{
    position: absolute;
    top: 0;
    bottom:0;
    right: 12px;
    width:8px;
    border-radius:6px;
    background-color: rgba(58,50,118,0.2),
  }
  .custom-vertical-indicator{
    width: 100%;
    height:200px;
    border-radius: 6px;
    background-color: #3A3276;

  }
  .custom-horizontal-scrollbar{
    position: absolute;
    left: 0;
    right:0;
    bottom: 12px;
    width: 100px;
    height: 8px;
    border-radius: 6px;
    transform: translateX(-50%) translateZ(0);
    background-color: rgba(58,50,118,0.2),

  }
  .custom-horizontal-indicator{

    height: 100%;
    width: 200px;
    border-radius: 6px;
    background-color: #3A3276;
  }



</style>