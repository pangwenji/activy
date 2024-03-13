<template>
  <page :on-pullup="onReachBottom" :on-pulldown="onPullDownRefresh" class="page" title-bg-color="#1f1f1f"
    :show-scrollbar="true" :mouse-wheel="true" :head-box="isPc ? ['content', 'right'] : undefined"
    :pageStyle="{ background: '#1f1f1f', }">
    <div class="body page-pading">
      <div class="tab-datas head">
        <div v-for="name in tabs[tabIndex]">{{ name }}</div>
      </div>
      <div class="tab-datas" v-for="item in list">
        <div style="color: #7d8397">{{ item.game_name }}</div>
        <div>{{ item.bet }}</div>
        <div style="color: #7d8397">{{ item.rate * 100 }}%</div>
        <div>+{{ item.money }}</div>
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
// import ArrowMore from '../components/arrow-more.vue'
import { ref } from 'vue'
import { t } from '../uilts/i18n'
import { dbGet } from '../uilts/db'
import { onLoad, onShow } from '../router/routes'
import { isPc } from '../uilts/async.var'
const showMore = ref<boolean>(false)
const list = ref<GetRecordDetail['response']['list']>([])
const tabIndex = ref<number>(0)
let receive_time = 0
const tabs = [
  [
    t('pageWashing.gameName'),
    t('pageWashing.totalAmountOfCoding'),
    t('pageWashing.washCodeRatio'),
    t('pageWashing.amount'),
  ],
]

let pages = ref<number>(1)
let lastPage = ref<number>(1)
const limit = 20
let type = 0

//自动洗码
const getRecordDetail = async (type: Number) => {
  let ret = await '/api/userRebate/getRecordDetail'.GET<GetRecordDetail>(
    {
      page: pages.value,
      limit: limit,
      game_platform_id: type,
      receive_day: receive_time,
    },
    {
      Authorization: async () => await dbGet('token'),
    },
  )
  ret.list.forEach((v) => {
    list.value.push(v)
  })
  lastPage.value = Math.ceil(ret.totalCount / limit)
  showMore.value = false
}

// const onReachBottomBtn = async () => {
// 	if (lastPage.value > pages.value) {
// 		pages.value += 1
// 		showMore.value = true
// 		await getRecordDetail(type)
// 	}
// }

const onPullDownRefresh = async () => {
  list.value.length = 0
  pages.value = 1
  await getRecordDetail(type)
}

const onReachBottom = async () => {
  if (lastPage.value > pages.value) {
    pages.value += 1
    showMore.value = true
    await getRecordDetail(type)
  }
}

interface Option {
  id: number
  r: number
  c: string
}
onLoad((get: Option) => {
  type = get.id
  receive_time = get.r
  getRecordDetail(get.id)
})
onShow((get: Option) => {
  type = get.id
  receive_time = get.r
  list.value.length = 0
  getRecordDetail(get.id)
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.page {
  // background-color:#2E2C5E;
  //width: pxToRem(320) !important;
  //overflow: hidden;
  //background: #1f1f1f;
  //margin-left: 55px;
  background: transparent;
  box-sizing: border-box;
}

.body {
  border-radius: 0.1875rem;
  min-height: 15.4rem;
  margin: 0 pxToRem(10);
  background: #2a2a2a;
  padding-bottom: pxToRem(10);
}

.tab-datas {
  display: flex;
  padding: 0.375rem 0.625rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: #ffffff;
  text-align: center;
  font-size: 0.6875rem;

  div {
    flex: 1;
  }

  //&:nth-child(2n) {
  //  background: #201e47;
  //}

  &:not(.head) div {
    &:nth-child(2) {
      color: #fff;
    }

    &:last-child {
      color: #14d03d;
    }
  }

  @include pc {
    height: 60px;
    padding: 0;
    font-size: 14px;
    color: #fff;
    background: #1d1a41;

    &.head {
      background: #231d4e;
      color: #fff;
    }

    &:nth-child(2n) {
      background: #181538;
    }

    &:not(.head) div {

      &:nth-child(2),
      &:nth-child(3) {
        color: #fff;
      }

      &:last-child {
        color: #14d03d;
      }
    }

    &:hover {
      background-color: #181538;
    }
  }
}
</style>
