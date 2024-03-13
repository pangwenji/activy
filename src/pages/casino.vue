<template>
  <!-- <turntable></turntable> -->
  <view class="top-page">
    <view v-if="!isApiOk">
      <view class="pad">
        <public-banner class="public-banner" position="casino_banner" :is-bottom="true"></public-banner>
        <view class="search-card h5" @click.stop="$open('/game', {})">
          <search-input v-model="name" :placeholder="$t('pageCasino.searchInput')" :disabled="true"></search-input>
        </view>
        <public-game-menu
          class="public-game-menu"
          :list="casinoClassify"
          :isAll="true"
          :isHot="false"
          v-model="activeId"
        ></public-game-menu>
        <public-loading v-if="apiLoading" class="api-loading" style="margin-top: 25%"></public-loading>
        <template v-if="activeId === 0" v-for="(item, index) in allGamesList">
          <view class="slot-card" v-if="item.totalCount">
            <view class="title sb">
              <img class="yd" src="@/assets/new/game/yd.png" alt="" />
              <view class="title-left">
                <img class="title-icon tc" v-if="item.icon" :src="item.icon" alt="" />
                <img class="title-icon" v-if="!item.icon && item.id === -1" src="@/assets/new/game/hot.png" alt="" />
                <img class="title-icon" v-if="!item.icon && item.id === -2" src="@/assets/new/game/new.png" alt="" />

                <span>{{ item.name }}</span>
                <span class="game">{{ $t('pageGame.game') }}</span>
              </view>
              <view class="bt2ns">
                <view class="all ellipsis" v-if="item.id != -1" @click="$open('/game', { c: item.id,n:item.name})">
                  {{ $t('pageIndex.viewAll') }}
                  <span class="h5">{{ item.totalCount }}</span>
                </view>

                <view
                  class="upper"
                  @click="getAllGamesList(index, item.page - 1)"
                  :class="{ dis: item.page == 1 }"
                ></view>
                <view
                  class="next"
                  @click="getAllGamesList(index, item.page + 1)"
                  :class="{ dis: item.lastPage <= item.page }"
                ></view>
              </view>
            </view>
            <public-loading v-if="item.loading"></public-loading>
            <public-grid
              v-else
              :max="isPc ? 5 : 3"
              :margin="isPc ? 40 : 20"
              class="public-grid"
              :data-empty="$t('ui.empty')"
            >
              <public-game v-for="item2 in item.list[item.page - 1]" :key="index" :item="item2"></public-game>
            </public-grid>
          </view>
        </template>
        <template
          v-else-if="classifyPages[activeId] && classifyPages[activeId].list.length"
          v-for="(item, index) in classifyPages[activeId].list"
        >
          <view class="slot-card" v-if="item.totalCount">
            <view class="title sb">
              <img class="yd" src="@/assets/new/game/yd.png" alt="" />
              <view class="title-left">
                <img class="title-icon tc" v-if="item.icon" :src="item.icon" alt="" />
                <!-- <img class="title-icon" src="@/assets/new/game/hot.png" alt=""> -->
                <span>{{ item.game_platform_name }}</span>
                <span class="game">{{ $t('pageGame.game') }}</span>
              </view>
              <view class="bt2ns">
                <view class="all ellipsis" @click="$open('/game', { t: activeId, c: item.game_platform_id })">
                  {{ $t('pageIndex.viewAll') }}
                  <span class="h5">{{ item.totalCount }}</span>
                </view>
                <view
                  class="upper"
                  @click="getAllCompanyList(index, item.page - 1)"
                  :class="{ dis: item.page == 1 }"
                ></view>
                <view
                  class="next"
                  @click="getAllCompanyList(index, item.page + 1)"
                  :class="{ dis: item.lastPage <= item.page }"
                ></view>
              </view>
            </view>
            <public-loading v-if="item.loading" style="min-height: 16.25rem"></public-loading>

            <public-grid
              v-else
              :max="isPc ? 5 : 3"
              :margin="isPc ? 40 : 20"
              class="public-grid"
              :data-empty="$t('ui.empty')"
            >
              <public-game v-for="item2 in item.list[item.page - 1]" :item="item2"></public-game>
            </public-grid>
          </view>
        </template>
      </view>

      <public-page-footer></public-page-footer>
    </view>
    <public-loading v-else class="page-loading"></public-loading>
  </view>
</template>

<script setup lang="ts">
import Turntable from '../components/turntable.vue'
import DsDigital from '../components/ds-digital.vue'

import PublicPageFooter from '../components/public-page-footer.vue'
import PublicBanner from '../components/public-banner.vue'
import SearchInput from '../components/search-input.vue'
import PublicGrid from '../components/public-grid.vue'
import PublicGame from '../components/public-game.vue'
import PublicLoading from '../components/public-loading.vue'
import PublicGameMenu from '../components/public-game-menu.vue'

import { ref, reactive, watch } from 'vue'
import { casinoClassify, casinoType, isPc, restMoney } from '../uilts/async.var'
import { addListener, dbGet } from '../uilts/db'
import { open, onLoad, onShow, router } from '../router/routes'

const apiLoading = ref(false)
const name = ref('')
const activeId = ref(0)
const companyId = ref('')
const isApiOk = ref(true)
const classifyPages = reactive<{
  [k: string]: {
    page: number
    lastPage: number
    loading: boolean
    list: Array<{
      id?: number
      list: [Array<Games>]
      game_platform_name: string
      game_platform_id: number
      icon: string
      totalCount: number
      page: number
      loading: boolean
      lastPage: number
    }>
  }
}>({
  '-1': {
    page: 1,
    lastPage: 0,
    loading: false,
    list: [],
  },
  '0': {
    page: 1,
    lastPage: 0,
    loading: false,
    list: [],
  },
})
const allGamesList = ref<
  Array<{
    page: number
    id: number
    name: string
    lastPage: number
    totalCount: number
    loading: boolean
    icon_click: string
    icon: string
    list: Array<Array<Games>>
  }>
>([])

const pros: {
  [k: number]: Promise<GetGameList['response']>
} = {}
const getGamesList = async (id?: number, _limit?: number) => {
  let key = id || activeId.value
  if (!classifyPages[key]) return
  ;(await pros[key]) && pros[key].abort()
  classifyPages[key].loading = true
  if (classifyPages[key].page === 1) {
    classifyPages[key].list.length = 0
  }
  if (activeId.value > 0) apiLoading.value = true
  '/api/game/getGameByCompanyGroup'
    .GET<GetGameByCompanyGroup>(
      {
        limit: isPc.value ? 10 : 6,
        game_type: key,
        is_mobile: isPc.value ? 0 : 1,
      },
      {
        Authorization: async () => {
          try {
            return await dbGet('token')
          } catch (e) {
            return undefined
          }
        },
      },
    )
    .then((arr) => {
      classifyPages[key].list.length = 0
      for (let item of arr) {
        classifyPages[key].list.push({
          list: [item.list],
          game_platform_name: item.game_platform_name,
          game_platform_id: item.game_platform_id,
          icon: item.game_platform_icon,
          totalCount: item.totalCount,
          page: 1,
          loading: false,
          lastPage: Math.ceil(item.totalCount / (isPc.value ? 10 : 6)),
        })
      }
    })
    .finally(() => {
      apiLoading.value = false
    })
}

// const changeClassifyPage = (e, index) => {
// 	classifyPages[activeId.value].list[index].page = e.detail.current + 1
// }
const prosCom: {
  [k: number]: Promise<GetGameList['response']>
} = {}
const getAllCompanyList = async (index: number, page: number) => {
  let item = classifyPages[activeId.value].list[index]
  if (page <= 0 || page > item.lastPage) {
    return
  }
  classifyPages[activeId.value].list[index].page = Math.max(page, 1)

  // if (classifyPages[activeId.value].list[index].list[page - 1]) {
  // 	return
  // }
  classifyPages[activeId.value].list[index].list[page - 1] = []
  // classifyPages[activeId.value].list[index].list.length = 0;
  item.loading = true
  // prosCom[item.id] && prosCom[item.id].abort();
  prosCom[item.id!] = '/api/game/getGameList'.POST<GetGameList>(
    {
      page: classifyPages[activeId.value].list[index].page,
      limit: isPc.value ? 10 : 6,
      type: activeId.value,
      game_platform_id: item.game_platform_id,
      name: name.value,
      is_mobile: isPc.value ? 0 : 1,
    },
    {
      Authorization: async () => {
        try {
          return await dbGet('token')
        } catch (e) {
          return undefined
        }
      },
    },
  )
  prosCom[item.id!]
    .then((ret) => {
      classifyPages[activeId.value].list[index].lastPage = Math.ceil(ret.totalCount / (isPc.value ? 10 : 6))
      for (let item of ret.list) {
        classifyPages[activeId.value].list[index].list[page - 1].push(item)
      }
    })
    .finally(() => {
      classifyPages[activeId.value].list[index].loading = false
    })
}

// const changePage = (e: { detail: { current: number; }; }, index: string | number) => {
// 	allGamesList.value[index].page = e.detail.current + 1
// }
const pross: {
  [k: number]: Promise<GetGameList['response']>
} = {}
const getAllGamesList = async (index: number, page: number, isAdd: boolean = false) => {
  let item = allGamesList.value[index]
  if (page <= 0 || page > item.lastPage) {
    return
  }
  if (!isAdd) allGamesList.value[index].page = Math.max(page, 1)
  let requests: {
    is_hot?: number
    page: number
    limit: number
    type?: number
    game_platform_id?: number
    name: string
    is_mobile: number
  }
  if (isAdd) {
    requests = {
      page: allGamesList.value[index].page + 1,
      limit: index === 0 ? 9 : isPc.value ? 10 : 6,
      name: name.value,
      is_mobile: isPc.value ? 0 : 1,
    }
    allGamesList.value[index].list[page] = []
  } else {
    requests = {
      page: allGamesList.value[index].page,
      limit: index === 0 ? 9 : isPc.value ? 10 : 6,
      name: name.value,
      is_mobile: isPc.value ? 0 : 1,
    }
    allGamesList.value[index].list[page - 1] = []
  }

  if (index === 0) {
    requests.is_hot = 1
  } else {
    requests.game_platform_id = item.id
  }

  item.loading = true
  // pross[item.id] && pross[item.id].abort();
  pross[item.id] = '/api/game/getGameList'.POST<GetGameList>(requests, {
    Authorization: async () => {
      try {
        return await dbGet('token')
      } catch (e) {
        return undefined
      }
    },
  })
  pross[item.id]
    .then((ret) => {
      allGamesList.value[index].lastPage = Math.ceil(ret.totalCount / (isPc.value ? 10 : 6))
      for (let item of ret.list) {
        allGamesList.value[index].list[page - 1].push(item)
      }
    })
    .finally(() => {
      allGamesList.value[index].loading = false
    })
}

// const swiperHeight = ref(0)
// const getCurrentSwiperHeight = (element: any) => {
// 	nextTick(() => {
// 		let query = uni.createSelectorQuery();
// 		query.select('.swiper-item-content').boundingClientRect((res: any) => {
// 		});
// 		query.exec((res: { height: number; }[]) => {
// 			swiperHeight.value = res[0].height;
// 		})
// 	})

// }

watch(activeId, (_value, _oldValue) => {
  companyId.value = ''
  getGamesList()
  // if(activeId.value) open('/game', { t: activeId.value })
})

watch(companyId, (_value, _oldValue) => {
  getGamesList()
})

watch(name, (_value, _oldValue) => {
  classifyPages[activeId.value].page = 1
  getGamesList()
})

watch(casinoType, (_value, _oldValue) => {
  activeId.value = casinoType.value
  // console.log('我来了')
})

// watch(router.currentRoute,(_value, oldValue)=>{
// 	if(oldValue.name == '/casino'){
// 		casinoType.value = 0
// 		// console.log('切换了');

// 	}

// })

const init = async () => {
  activeId.value = 0

  isApiOk.value = true
  '/api/game/getGameTypeList'
    .POST<GetGameTypeList>()
    .then((list) => {
      casinoClassify.value.length = 0
      for (let item of list) {
        casinoClassify.value.push(item)
        classifyPages[item.id] = {
          page: 1,
          lastPage: 0,
          loading: false,
          list: [],
        }
      }
    })
    .catch((err) => {
      // console.log(err);
    })
  '/api/game/getGroupGameList'
    .GET<GroupGameList>(
      {
        hot_limit: 9,
        limit: 6,
        is_mobile: isPc.value ? 0 : 1,
      },
      {
        Authorization: async () => {
          try {
            return await dbGet('token')
          } catch (e) {
            return undefined
          }
        },
      },
    )
    .then((arr) => {
      allGamesList.value.length = 0
      arr.forEach((item, _index) => {
        allGamesList.value.push({
          list: [item.list],
          name: item.game_platform_name,
          totalCount: item.totalCount,
          id: item.game_platform_id,
          page: 1,
          icon_click: item.game_platform_icon ?? null,
          icon: item.game_platform_icon ?? null,
          loading: false,
          lastPage: Math.ceil(item.totalCount / (isPc.value ? 10 : 6)),
        })
        // getAllGamesList(index,2,true)
      })
      getGamesList()

      // for (item,index in arr) {

      // }
      // getCurrentSwiperHeight('.swiper-item-content');
    })
    .finally(() => {
      isApiOk.value = false
    })

  restMoney.value = !restMoney.value
}

// onPullDownRefresh(() => {
// 	classifyPages[activeId.value].page = 1;
// 	init();
// })
// onReachBottom(() => {
// 	if (!isPc.value) {
// 		classifyPages[activeId.value].page++;
// 		if (classifyPages[activeId.value].lastPage >= classifyPages[activeId.value].page) {
// 			getGamesList();
// 		}
// 	}
// })

onLoad(() => {
  // open("/customer-service", { url: 'http://www.baidu.com', reg: 1 });
  // console.log(111);
  activeId.value = casinoType.value
  init()
  // uni.$on('changeCategory', function (id: number) {
  // 	activeId.value = id;
  // })
  addListener('language', (type: string, _name: any) => {
    if (type === 'set') {
      isApiOk.value = false
      init()
    }
  })
})
onShow(() => {
  init()
  // open('/game-open')
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.public-banner {
  padding: 0 0.75rem;
}

.top-page {
  @include pc {
    // padding: 60px;
  }
}

.tc {
  @include h5 {
    width: auto !important;
    height: 1.5rem;
  }

  @include pc {
    width: 40px !important;
    // height: 40px !important;
  }
}

page {
  background-color: var(--body-background-color);
  padding-bottom: calc(var(--tab-bar-height) + env(safe-area-inset-bottom));
  // --bgcolor: #1C1E22;
  min-height: 100%;
}

.page-loading {
  width: 100%;
  height: 60vh;
  // padding-top: 50%;
}

.api-loading {
  width: 100%;
  height: 30vh;
  // padding-top: 50%;
}

.public-game-menu {
  margin-top: 0.9375rem;
  margin-left: 0.75rem;
}

.pad {
  // padding: 0.6250rem;
  min-height: 100vh;
}

.scroll-view {
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }

  white-space: nowrap;
  width: calc(100% - 1.875rem);
  margin: 0 0.9375rem;
  height: 2.625rem;
  line-height: 2.625rem;
  // background-color: #1C1E22;
  border-radius: 0.1087rem;
  margin-top: 0.9375rem;

  .introduce-meun-team {
    display: inline-block;
    font-size: 0.7819rem;
    color: #ffffff;
    padding: 0 0.9375rem;
    height: 2.625rem;
    margin-right: 0.625rem;
    background-color: #1e2024 !important;

    img {
      position: relative;
      top: 0.0625rem;
      width: 0.7813rem;
      height: 0.7813rem;
    }
  }

  .introduce-meun-team-sign {
    background-color: #2d3034 !important;
  }
}

.search-card {
  // margin-top: 1.2500rem;
  margin: 0 0.75rem;
}

.upper-next {
  display: flex;
  justify-content: space-around;
  margin-top: 0.9375rem;

  .upper,
  .next {
    @include button(#2ae035);
    min-width: 5.625rem;
    padding: 0 0.625rem;
    height: 2.1875rem;

    // &.dis {
    // background-color: #303239;
    // color: #828B97;
    // background-image: none;
    // }
  }
}

.public-grid {
  background-color: #1a1a1a;
  padding: 0.3125rem 0.625rem;
  margin-top: -0.1rem;
  // grid-template-rows:0.75rem;
}

.bt2ns {
  width: 50%;
  background-color: transparent;
  // background: url(@/assets/new/game/yd.png);
  padding: 0 0.625rem 0.625rem;
  // background-color: #1A1A1A;
  margin-left: -1rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: right;

  .all {
    min-width: 3.156rem;
    padding: 0.125rem 0.25rem;
    height: 1.25rem;
    border-radius: 0.25rem;
    background-color: #1a1a1a;
    font-size: 0.75rem;
    font-weight: 400;
    align-items: center;
    color: #b3b3b3;
    margin-right: 0;
    @extend %flex-center;

    @include pc {
      min-width: 87px;
      height: 40px;
      border-radius: 8px;
      border: 1px solid #1a1a1a;
      // opacity: 0.2;
      background: #1a1a1a;
      font-size: 16px;
      box-sizing: border-box;
    }

    span {
      color: rgb(0, 157, 127);

      margin-left: 0.25rem;
    }
  }

  .upper,
  .next {
    width: 1.25rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    margin-left: 5px;
    background-image: url(@/assets/new/index/arrow-no-dis.png);

    background-color: #1a1a1a;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 1.25rem 1.5rem;
    // border: 1px solid #1A1A1A;

    @include pc {
      width: 40px;
      height: 40px;
      background-color: #1a1a1a;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 20px;
      border-radius: 8px;
      // border: 1px solid #1A1A1A;
      box-sizing: border-box;
    }

    &.dis {
      background-image: url(@/assets/new/index/arrow-dis.png);
      background-color: #1a1a1a;
      // filter: grayscale(100%) brightness(200%) saturate(0%) contrast(200%);
      // border: 1px solid #1A1A1A;
    }
  }

  .upper:not(.dis),
  .next.dis {
    transform: rotate(180deg);
  }

  .upper:hover {
    background-image: url(@/assets/new/index/arrow-no-dis.png);
    background-color: #2e2b4f;
    border: 1px solid #2e2b4f;
    transform: rotate(180deg);
  }

  .next:hover {
    background-image: url(@/assets/new/index/arrow-no-dis.png);
    background-color: #2e2b4f;
    border: 1px solid #2e2b4f;
    transform: rotate(0deg);
  }
}

.slot-card {
  margin-top: 14px;
}

%title-font {
  color: var(--MENU, #8e90cd);
  font-size: 14px;
}

.title {
  position: relative;
  @extend %title-font;

  @include pc {
    margin: 32px 0;
  }

  &.no-icon,
  &.sb {
    background: none;
    padding: 0;
  }

  &.sb {
    display: flex;
    justify-content: space-between;
  }

  .yd {
    position: absolute;
    left: 49%;
    bottom: 0;
    height: 100%;
    z-index: -1;
  }

  .title-left {
    display: flex;
    align-items: center;
    width: calc(50% - 1.25rem);
    background: #1a1a1a;
    color: #ffffff;
    font-weight: 600;
    padding: 0.3125rem 0.625rem 0.3125rem;
    white-space: nowrap;

    @include h5 {
      img {
        width: 1rem;
        margin-right: 0.35rem;
      }

      span {
        font-size: 0.75rem;
        font-weight: 500;
      }
    }

    @include pc {
      img {
        width: 30px;
      }

      span {
        color: #8e90cd;
        font-size: 24px;
        font-weight: 500;
        line-height: 40px;
        /* 166.667% */
        padding: 0 13px;
      }
    }

    .game {
      color: #009d80;
      font-size: 0.875rem;
      margin-left: 0.5rem;
      white-space: nowrap;
    }
  }
}
</style>
