<script setup lang="ts">
// import Page from '../components/page.vue'
import PageHead from '../components/page-head.vue'
import PublicPageHead from '../components/public-page-head.vue'
// import PublicPageFooter from '../components/public-page-footer.vue';
// import Scroll from '../components/scroll.vue';

import { computed, onMounted, ref, onUnmounted, watch, nextTick } from 'vue'
import { midButton, routerTabs } from '../router/config'
import {
  indexIsScroll,
  isIndexKeepAlive,
  isPc,
  publicHeadIsShow,
  showTabIndex,
  isLogin,
  moneyRainData,
  moneyRainOpen,
  backTabIndex,
  isGoTop,
} from '../uilts/async.var'
import { clonetabIndex, noKeepAlivePage, router } from '../router/routes'

// import BScroll from '@better-scroll/core'
// import ObserveDOM from '@better-scroll/observe-dom'
// import NestedScroll from '@better-scroll/nested-scroll'
// import MouseWheel from '@better-scroll/mouse-wheel'

import type { VNode } from 'vue'
import { RouterTabs } from '../@types/router.config'
import { addListener } from '../uilts/db'
import { soketData } from '../uilts/socket'

const disabledHead = ref(false)

const scroll = ref<HTMLElement | null>(null)
// const content = ref<HTMLElement | null>(null);
// let bs: BScroll | undefined

watch(
  moneyRainOpen,
  (newValue) => {
    if (!newValue) return
    nextTick(() => animateImages())
  },
  { immediate: true },
)

onMounted(() => {
  isIndexKeepAlive.value = true
  // ===============================================================
  /**防抖 自动检测dom变化 */
  // BScroll.use(ObserveDOM)
  // ===============================================================
  /**
   * 嵌套
   */
  // BScroll.use(NestedScroll)
  // // ===============================================================
  // BScroll.use(MouseWheel)
  // bs = new BScroll(scroll.value as HTMLElement, {
  //   probeType: 3,
  //   nestedScroll: {
  //     groupId: 'shared',
  //   },
  //   stopPropagation: true,
  //   disableTouch: false,
  //   click: true,
  //   disableMouse: false,
  //   scrollY: true,
  //   // 开启 observe-dom 插件
  //   observeDOM: true,
  //   mouseWheel: true,
  // })
  // disabledHead.value = !isPc.value
  //
  // bs.on('scroll', () => {
  //   indexIsScroll.value = true
  //   // console.log(indexIsScroll.value);
  // })
  // bs.on('scrollEnd', () => {
  //   indexIsScroll.value = false
  // })
  //
  // bs.on('scrollCancel', () => {
  //   indexIsScroll.value = false
  // })

  window.addEventListener('resize', () => {
    disabledHead.value = !isPc.value
  })

  // animateImages()
})

// onUnmounted(() => {
//   bs?.destroy()
// })

/**==================================================================================================== */

const tabItems = computed(() => {
  let arr: Array<
    {
      index: number
    } & RouterTabs
  > = routerTabs.map((item, index) => ({
    index,
    ...item,
  }))
  arr.length % 2 === 0
    ? arr.splice(routerTabs.length / 2, 0, {
        index: -1,
        ...midButton,
      })
    : arr
  return arr
})

const goTop = () => {
  if (scroll.value) {
    scroll.value.scrollTop = 0
  }
}

watch(isGoTop, (_n, _o) => {
  goTop()
})

const tabIndex = computed(() => {
  let index = routerTabs.findIndex((item) => item.path === router.currentRoute.value.name)
  backTabIndex.value = index > 0 ? index : showTabIndex.value

  return index > 0 ? index : showTabIndex.value
})

const tabView = ref<VNode>()
publicHeadIsShow.value = false

type TabPath = '/casino' | '/recharge' | '/activity' | '/setting' | '/agent'

const setTabView = (component: VNode) => {
  if (component) {
    tabView.value = component
  }
  return component
}

const contentHeight = computed(() => {
  // console.log(isPc.value || (!isPc.value && tabIndex.value != 3))
  // if (isPc.value || (!isPc.value)) {
  //     return 'calc(100% - var(--headers-height) - var(--tab-bar-height))';
  // } else {
  //     return 'calc(100% - var(--tab-bar-height))';
  // }
  return 'calc(100% - var(--headers-height) - var(--tab-bar-height))'
})

let currentIndex = false
const redicon = ref()
const redicon2 = ref()
const ddi = ref()
const animateImages = () => {
  let currentImage: any
  let nextImage: any
  if (currentIndex) {
    currentImage = redicon2.value
    nextImage = redicon.value

    ddi.value.style.transform = 'translateY(-100%)'
  } else {
    currentImage = redicon.value
    nextImage = redicon2.value
    ddi.value.style.transform = 'translateY(0px)'
  }

  currentImage.classList.add('zoom-in')
  nextImage.classList.add('zoom-out')

  setTimeout(() => {
    currentImage.classList.remove('zoom-in')
    nextImage.classList.remove('zoom-out')
    currentIndex = !currentIndex

    animateImages()
  }, 3000)
}

const isTable = computed(() => {
  if (router.currentRoute.value.name === '/turntable-alert' && clonetabIndex.value === 0) return 0
  if (router.currentRoute.value.name === '/turntable-alert' && clonetabIndex.value === 1) return 1
  if (router.currentRoute.value.name === '/turntable-alert' && clonetabIndex.value === 2) return 2
  if (router.currentRoute.value.name === '/turntable-alert' && clonetabIndex.value === 3) return 3

  return -1
})

const openLink = (url: string) => {
  window.open(url)
}

const userListener = (type: ListenerType, _user?: UserModel) => {
  isLogin.value = type === 'set'
}

const isNotice = ref(false)
watch(soketData, (_o, n) => {
	isNotice.value = n.get_system_notice
})

addListener('user', userListener)

let scrollingTimer: any
const scrollHandler = () => {
  indexIsScroll.value = true

  clearTimeout(scrollingTimer)

  scrollingTimer = setTimeout(function () {
    indexIsScroll.value = false
  }, 400)
}
</script>

<template>
  <page-view class="_test_">
    <public-page-head
      v-if="(!isPc && tabIndex === 0 && router.currentRoute.value.name !== '/turntable-alert') || isTable === 0"
    />
    <page-head v-if="(!isPc && (tabIndex === 3 || tabIndex === 2 || tabIndex === 1)) || isTable > 0">
      <template #content>
        <div class="header-content-auto">
          <template v-if="tabIndex === 1 || isTable === 1">{{ $t('tabName1') }}</template>
          <template v-if="tabIndex === 2 || isTable === 2">{{ $t('activity') }}</template>
        </div>
      </template>
      <template #icon-right>
        <div class="right-home">
          <span class="iconfont iconhomeempty" @click="$back(-1)"></span>
        </div>
      </template>
    </page-head>

    <page-content ref="scroll" @scroll="scrollHandler" :style="{ height: contentHeight }">
      <div ref="content" class="page-div">
        <router-view v-slot="{ Component }">
          <keep-alive :exclude="noKeepAlivePage">
            <component :is="setTabView(Component) || tabView" />
          </keep-alive>
        </router-view>
      </div>
    </page-content>
    <div class="tab-bar" v-show="!isPc">
      <div class="tab-content">
        <div
          class="tab-item"
          v-for="item,index in tabItems"
          :class="{ active: tabIndex === item.index && item.iconClick , 'red': index === 4 && isNotice }"
          @click="$open<TabPath>(item.path as TabPath)"
        >
          <!-- <span class="iconfont" v-if="i !== 2 && i !== 1" :class="'icon' + i"></span> -->
          <img v-if="item.index > -1" :class="'icon' + (item.index > -1 || '-mid-button')" :src="item.icon" />
          <!-- <div class="tabler-conter" v-if="item.index <= -1">
                        <div>
                            <img :class="'icon' + (item.index > -1 || '-mid-button')" :src="item.icon" />
                        </div>
                    </div> -->
          <img v-if="item.index <= -1" :class="'icon' + (item.index > -1 || '-mid-button')" :src="item.icon" />
          <img v-if="item.iconClick" class="active" :class="'icon' + item.index" :src="item.iconClick" />
          <p v-if="item.name" :class="'font' + (item.index > -1 || '-mid-button')">{{ $t(item.name) }}</p>
        </div>
      </div>
    </div>
    <div
      class="icons-container"
      v-if="moneyRainOpen"
      :class="{ 'half-hidden': indexIsScroll }"
      @click="$open('/money-is-like-rain')"
    >
      <div class="wrap">
        <div class="redicon image" ref="redicon"></div>
        <div class="redicon2 image" ref="redicon2"></div>
        <div class="di">
          <div class="ddi" ref="ddi">
            <div class="span">{{ $t('jqy') }}</div>
            <div class="span">{{ moneyRainData.begin_time }} {{ $t('jqyks') }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="custom-message">
      <svg class="custom-message-icon-svg" @click="openLink('https://direct.lc.chat/17143491/')">
        <use xlink:href="@/assets/icon.svg#icon_Message"></use>
      </svg>
    </div> -->
  </page-view>
</template>

<style lang="scss" scoped>
@import '../scss/public.scss';
@import '@/assets/font/font.css';

.half-hidden {
  transform: translateX(75%);
}

.right-home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  line-height: var(--headers-height);
}

.tabler-conter {
  position: absolute;
  width: 2.9375rem;
  height: 2.9375rem;
  background-color: #292929;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  top: -1rem;

  div {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.40625rem;
    height: 2.40625rem;
    background-color: #454545;

    img {
      width: 1.6875rem;
      height: 1.6875rem;
      margin-top: 0;
    }
  }
}

.icons-container {
  position: absolute;
  right: 1rem;
  top: 50%;
  z-index: calc(var(--I1) + 2);
  transition: transform 0.3s ease;
  cursor: pointer;

  .wrap {
    width: 4rem;
    height: 4.65rem;
    position: relative;
    right: 1rem;

    @keyframes spanIn {
      0% {
        transform: translateY(0px);
      }

      5% {
        transform: translateY(0px);
      }

      45% {
        transform: translateY(0px);
      }

      50% {
        transform: translateY(-100%);
      }

      95% {
        transform: translateY(-100%);
      }

      100% {
        transform: translateY(0px);
      }
    }

    .di {
      position: absolute;
      width: 4rem;
      height: 2.72rem;
      bottom: -0.3rem;
      right: -0.5rem;
      background-image: url(@/assets/new/game/di.png);
      background-size: 4rem 2.72rem;
      background-repeat: no-repeat;
      z-index: calc(var(--I1) + 2);
      overflow: hidden;

      .ddi {
        // animation: spanIn 6s linear infinite;
        transition: transform 0.5s ease 0s;
        width: 4rem;
        height: 2.72rem;
      }

      .span {
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        text-align: center;
        color: #ffffff;
        font-size: 0.75rem;
        justify-content: center;
      }
    }

    .redicon {
      position: absolute;
      width: 3rem;
      height: 3.49rem;
      bottom: 0;
      right: 0;
      background-image: url(@/assets/new/game/redicon.png);
      background-size: 3rem 3.49rem;
      background-repeat: no-repeat;
      z-index: calc(var(--I1) + 1);
    }

    .redicon2 {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 3rem;
      height: 3.49rem;
      background-image: url(@/assets/new/game/redicon2.png);
      background-size: 3rem 3.49rem;
      background-repeat: no-repeat;
      z-index: calc(var(--I1) + 1);
    }

    @keyframes zoomIn {
      0% {
        transform: scale(1);
        opacity: 0;
      }

      100% {
        transform: scale(1.2);
        opacity: 1;
      }
    }

    @keyframes zoomOut {
      0% {
        transform: scale(1.2);
        opacity: 1;
      }

      100% {
        transform: scale(1);
        opacity: 0;
      }
    }

    .image {
      // width: 200px;
      // height: 200px;
      // position: absolute;
      // right: 1rem;
      transition:
        transform 0.5s,
        opacity 0.5s;
    }

    .zoom-in {
      animation: zoomIn 1s forwards;
    }

    .zoom-out {
      animation: zoomOut 1s forwards;
    }
  }
}
.custom-message {
  line-height: 0.45rem;
  text-align: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  right: 1rem;
  bottom: 7.2rem;
  position: absolute;
  z-index: calc(var(--I1) + 2);
  font-size: 0.23rem;
  color: #fff;
  background: #2f7dea;
  .custom-message-icon-svg {
    fill: #fff;
    width: 42%;
    height: 100%;
  }
}
.iconfont {
  font-family: iconfont;
  font-size: 1.5rem;
  color: #ffffff;
  // margin-top: -0.75rem;

  &.icon0 {
    &::before {
      content: '\e64f';
    }
  }

  &.icon1 {
    &::before {
      content: '\e64f';
    }
  }

  &.icon3 {
    font-size: 1.4rem;

    &::before {
      content: '\e606';
    }
  }

  &.icon4 {
    font-size: 1.4rem;

    &::before {
      content: '\e638';
    }
  }

  & ~ .active {
    color: #009d80;
  }

  // &::before {
  // 	content: "\e64f";
  // }
}

.zj {
  background-image: url(@/assets/new/tabler/gg.png);
  background-repeat: no-repeat;
  background-size: 54px;
  background-position: 50% -50%;
}

.content-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tab-views {
  display: block;
  height: 100%;
}

.tab-bar {
  height: var(--tab-bar-height);
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: calc(var(--I1) + 0);
  background-color: #292929;

  &::before {
    content: '';
    position: absolute;
    top: -14px;
    z-index: calc(var(--I1) + 0);
    left: 0;
    width: 100%;
    height: 54px;
    // background-image: url(@/assets/new/index/back.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
  }

  // opacity: ;

  .tab-content {
    position: relative;
    z-index: calc(var(--I1) + 0);
    height: var(--tab-bar-height);
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    // padding-top: 14px;
  }

  .tab-item {
    flex: 1;
    height: 100%;
    @extend %flex-center;
    flex-direction: column;
    position: relative;
    &.red{
      &::after {
			content: '';
			display: block;
			width: 0.50rem;
			height: 0.50rem;
			position: absolute;
			right: 1.25rem;
			top: 0.5rem;
      // transform: translateY(-50%);
			background-color: #FF0000;
			border-radius: 100%;
	}
    }
    &.active {
      // position: relative;
      // &::before {
      //     content: '';
      //     position: absolute;
      //     top: 0;
      //     width: 1.5rem;
      //     height: 1.5rem;

      // }
      //background-image: url(@/assets/new/tabler/active-x.png);
      //background-repeat: no-repeat;
      //background-size: 1.8rem 1.4rem;
      //background-position: 50% 0.7rem;

      p {
        color: #009d80;
      }

      .active {
        display: block;
      }

      img {
        display: none;
      }

      span {
        color: #009d80 !important;
      }
    }
  }

  img {
    width: 1.8125rem;

    height: 1.8125rem;
    display: block;
    // margin-top: -0.25rem;

    &.icon-mid-button {
      width: 3.09375rem;
      height: 3.09375rem;
      margin-top: -1.48125rem;

      // &~p {
      //     margin-top: 1.1rem !important;
      // }
    }

    &.active {
      display: none;
    }
  }

  p {
    color: #a7a7a7;
    font-size: 0.625rem;
    line-height: normal;
    // margin-top: 0.1rem;
    // position: absolute;
    // bottom: 0.75rem;
  }

  .font-mid-button {
    margin-top: 0.2rem;
  }
}

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
  z-index: calc(var(--I1) + 0);
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;

  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar{
    display: none;
  }
}

page-view {
  display: block;
  height: 100%;
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  overflow: hidden;
  min-height: calc(100vh - var(--headers-height) - var(--tab-bar-height) - var(--download-height));
  background-color: var(--body-background-color);
}

.page-head,
.public-page-head {
  & + page-content {
    height: calc(100% - var(--headers-height));
  }
}
</style>
