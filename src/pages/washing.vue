<template>
  <page :on-pullup="onReachBottom" :show-header="!isPc" class="container">
    <div class="body page-pading">
      <div class="pc-flex">
        <div class="rebate">
          <div class="icon-value">
            <div>
              {{ $t('pageWashing.TodayRebate') }}:
              <div>
                <span>{{ unit }}{{ toadyMoney }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="rebate">
          <div class="icon-value">
            <div>
              {{ $t('pageWashing.colorido') }}:
              <div>
                <span>{{ unit }}{{ totalMoney }}</span>
              </div>
            </div>
          </div>
          <div class="receive-btn" @click="receive(totalIndex)">{{ $t('pageWashing.persistia') }}</div>
        </div>
      </div>
    </div>
    <div v-if="!isPc" style="height: 0.25rem; background: #0d1518" class="line"></div>
    <div class="body page-pading" style="height: 100%;">
      <div class="pc-box">
        <div class="tab-btns">
          <div class="tab-btn" :class="{ active: tabIndex === 0 }" @click="switchMenu(0)">
            {{ $t('pageWashing.automaticCodeWashing') }}
          </div>
          <div class="tab-btn" :class="{ active: tabIndex === 1 }" @click="switchMenu(1)">
            {{ $t('pageWashing.codeWashingRecord') }}
          </div>
        </div>
        <div v-show="tabIndex === 0" class="tab-datas-box">
          <div class="tab-datas head">
            <div>{{ $t('pageWashing.gamept') }}</div>
            <div>{{ $t('pageWashing.totalAmountOfCoding') }}</div>
            <div>{{ $t('pageWashing.washCodeRatio') }}</div>
            <div>{{ $t('pageWashing.amount') }}</div>
          </div>
          <div class="empty empty-card" :data-empty="$t('ui.empty')" v-if="autoRecord.length === 0"></div>
          <div class="tab-datas" v-for="item in autoRecord">
            <div>{{ item[0] }}</div>
            <div style="color: #fff">{{ item[1] }}</div>
            <div>{{ item[2] }}</div>
            <div>{{ item[3] }}</div>
          </div>
        </div>
        <div v-show="tabIndex === 1" style="width: 100%;">
          <div class="two-months">
            <div class="txt-data">
              <div v-for="item in recentMonthRebateMoney">
                <div class="time">{{ item.create_time }}</div>
                <div class="value">
                  {{ unit }} {{ item.total_money }}
                  <span v-if="isPc">{{ $t('pageWashing.jangli') }}</span>
                </div>
                <!--                <div class="name">{{ unit }} {{ $t('pageWashing.rebateRewards') }}</div>-->
              </div>
            </div>
            <div class="img-data" ref="chart"></div>
          </div>
          <div class="tab-btns">
            <scroll-view class="scroll-view" :scroll-x="true">
              <div>
                <div class="tab-btn" v-for="item in timeBtns" :class="{ active: timeBtnsIndex == item.value }"
                  @click="switchTime(item.value)">
                  <span> {{ item.name }}</span>
                </div>
              </div>
            </scroll-view>
          </div>
          <div class="tab-datas-box cashback-record">
            <div class="tab-datas head">
              <div>{{ $t('pageWashing.pickUpTime') }}</div>
              <div>{{ $t('pageWashing.gamept') }}</div>
              <!-- <div>{{ $t('pageWashing.gameType') }}</div> -->
              <div>{{ $t('pageWashing.typingAmount') }}</div>
              <div>{{ $t('pageWashing.amount') }}</div>
              <div>{{ $t('pageWashing.operar') }}</div>
            </div>
            <div class="empty empty-card" :data-empty="$t('ui.empty')" v-if="autoRecord.length === 0"></div>
            <view class="tab-datas" v-for="item in autoRecord">
              <div>{{ item[0] }}</div>
              <div>{{ item[1] }}</div>
              <div style="color: #fff">{{ item[2] }}</div>
              <div style="color: #14d03d">{{ item[3] }}</div>
              <div class="text-btn" style="color: #009d80"
                @click="$open('/washing-details', { id: item[4], r: item[5] })">
                {{ $t('pageWashing.details') }}
              </div>
            </view>
          </div>
        </div>
        <ui-pagination v-if="isPc && autoRecord.length" v-model="pages" :pages="lastPage"></ui-pagination>
      </div>

      <!-- <div class="footer">
        <div>
          <div class="title">{{ $t('pageWashing.ftitle') }}</div>
          <div class="value">{{ $t('pageWashing.fvalue') }}</div>
        </div>
        <div class="go-game-btn" @click="$open('/casino')">{{ $t('pageActivityNew.goToGame') }}</div>
      </div> -->
    </div>
  </page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
// import BlockBtn from '../components/block-btn.vue'
import UiPagination from '../components/ui-pagination.vue'
import ScrollView from '../components/scroll-view.vue'

import { ref } from 'vue'
import { onLoad, onShow } from '../router/routes'
import { t } from '../uilts/i18n'
import { balance, isPc, restMoney, rootFontSize, unit } from '../uilts/async.var'
import { hint } from '../uilts/ui'
import { addListener, dbGet } from '../uilts/db'
import * as echarts from 'echarts'
import iconUp from '@/assets/new/washing/washing-up.png'
import iconDown from '@/assets/new/washing/washing-down.png'

const showMore = ref<boolean>(false)
const autoRecordState = ref<boolean>(false)
const tabIndex = ref<number>(0)
const timeBtnsIndex = ref<Receive['request']['time_range']>('today')
const totalIndex = ref<Receive['request']['time_range']>('today') //today
const isSubmit = ref<boolean>(false)
const isApiOk = ref<boolean>(true)
const tabBtns = ref([
  t('pageWashing.automaticCodeWashing'),
  t('pageWashing.codeWashingRecord'),
  t('pageWashing.washCodeRatio'),
])


const timeBtns = ref<
  Array<{
    name: string
    value: Receive['request']['time_range']
  }>
>([
  { name: t('pageRebateRatio.menu'), value: 'today' },
  { name: t('pageRebateRatio.menu1'), value: 'yesterday' },
  { name: t('pageRebateRatio.menu4'), value: 'month' },
  { name: t('pageRebateRatio.menu5'), value: 'last_month' },
])
const tabs = ref([
  [
    t('pageWashing.gameType'),
    t('pageWashing.totalAmountOfCoding'),
    t('pageWashing.washCodeRatio'),
    t('pageWashing.amount'),
  ],
  [
    t('pageWashing.pickUpTime'),
    t('pageWashing.gameType'),
    t('pageWashing.typingAmount'),
    t('pageWashing.amount'),
    t('pageWashing.operar'),
  ],
  [t('pageWashing.gamept'), t('pageWashing.washCodeRatio')],
])

const autoRecord = ref<Array<any>>([])
const category = ref()
const totalMoney = ref('0.00')
const toadyMoney = ref('0.00')

let pages = ref(1)
let lastPage = ref(1)
let limit = 20

//获取洗码总金额
const getTotalMoney = () => {
  '/api/userRebate/getTotalMoney'
    .GET<GetTotalMoney>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then((ret) => {
      totalMoney.value = ret.total_money
      toadyMoney.value = ret.toady_money
    })
}

//一键领取
const receive = (time_range: Receive['request']['time_range']) => {
  if (isSubmit.value) return
  isSubmit.value = true
  '/api/userRebate/receive'
    .POST<Receive>(
      {
        time_range,
      },
      {
        Authorization: async () => await dbGet('token'),
      },
    )
    .then((ret) => {
      if (ret.is_receive) {
        totalMoney.value = '0.00'
        balance.value = (Number(balance.value) + Number(totalMoney.value)).toFixed(1)
        hint(t('pageWashing.success'))
      } else {
        hint(t('pageWashing.error'))
      }

      restMoney.value = !restMoney.value
      getTotalMoney()
      if (tabIndex.value == 1) {
        pages.value = 1
        autoRecord.value.splice(0, autoRecord.value.length)
        getRecord(timeBtnsIndex.value)
      }
    })
    .finally(() => {
      isSubmit.value = false
    })
}

//自动洗码
let auto: Promise<GetAutoRecord['response']>
const getAutoRecord = () => {
  auto && auto.abort()
  auto = '/api/userRebate/getAutoRecord'.GET<GetAutoRecord>(null, {
    Authorization: async () => await dbGet('token'),
  })
  auto.then((ret) => {
    ret.forEach((v) => {
      autoRecord.value.push([v.game_platform_name, v.total_bet, v.rate * 100 + '%', '+' + unit.value + v.total_money])
    })

    if (ret.length > 0) {
      autoRecordState.value = true
      isApiOk.value = false
    } else {
      autoRecordState.value = false
    }
  })
}
let record: Promise<GetRecord['response']>
//洗码记录
const getRecord = async (time_range: GetRecord['request']['time_range']) => {
  record && record.abort()
  record = '/api/userRebate/getRecord'.GET<GetRecord>(
    {
      page: pages.value,
      limit,
      time_range,
    },
    {
      Authorization: async () => await dbGet('token'),
    },
  )
  let ret = await record
  lastPage.value = Math.ceil(ret.totalCount / limit)
  ret.list.forEach((v) => {
    autoRecord.value.push([
      v.receive_time,
      v.game_platform_name,
      v.total_bet,
      '+' + v.total_money,
      v.game_platform_id,
      v.receive_day,
    ])
  })
  if (ret.totalCount > 0) {
    autoRecordState.value = true
  } else {
    autoRecordState.value = false
  }
  showMore.value = false
}

let ratio: Promise<GetRatio['response']>
//洗码比例
const getRatio = async (type: Number) => {
  ratio && ratio.abort()
  ratio = '/api/userRebate/getRatio'.GET<GetRatio>(
    {
      page: pages.value,
      limit,
      game_type: type,
    },
    {
      Authorization: async () => await dbGet('token'),
    },
  )
  let ret = await ratio

  ret.list.forEach((v) => {
    autoRecord.value.push([v.name, v.rate * 100 + '%'])
  })
  if (ret.totalCount > 0) {
    autoRecordState.value = true
  } else {
    autoRecordState.value = false
  }
  lastPage.value = Math.ceil(ret.totalCount / limit)
  showMore.value = false
}

//切换时间
const switchTime = (e: Receive['request']['time_range']) => {
  timeBtnsIndex.value = e
  switch (tabIndex.value) {
    case 1:
      pages.value = 1
      autoRecord.value.length = 0
      getRecord(e)
      break
  }
}

//切换菜单
const switchMenu = (index: number) => {
  tabIndex.value = index
  autoRecord.value.length = 0
  ratio && ratio.abort()
  record && record.abort()
  auto && auto.abort()
  switch (index) {
    case 0:
      getAutoRecord()
      break
    case 1:
      pages.value = 1
      getRecord(timeBtnsIndex.value)
      break
    case 2:
      pages.value = 1
      getRatio(category.value)
      break
  }
}

const onReachBottom = async () => {
  if (tabIndex.value == 1) {
    if (lastPage.value > pages.value) {
      pages.value += 1
      showMore.value = true
      await getRecord(timeBtnsIndex.value)
    }
  }
  if (tabIndex.value == 2) {
    if (lastPage.value > pages.value) {
      pages.value += 1
      showMore.value = true
      await getRatio(category.value)
    }
  }
}

const init = () => {
  tabBtns.value = [
    t('pageWashing.automaticCodeWashing'),
    t('pageWashing.codeWashingRecord'),
    t('pageWashing.washCodeRatio'),
  ]

  timeBtns.value = [
    { name: t('pageRebateRatio.menu'), value: 'today' },
    { name: t('pageRebateRatio.menu1'), value: 'yesterday' },
    { name: t('pageRebateRatio.menu4'), value: 'month' },
    { name: t('pageRebateRatio.menu5'), value: 'last_month' },
  ]

  tabs.value = [
    [
      t('pageWashing.gameType'),
      t('pageWashing.totalAmountOfCoding'),
      t('pageWashing.washCodeRatio'),
      t('pageWashing.amount'),
    ],
    [
      t('pageWashing.pickUpTime'),
      t('pageWashing.gameType'),
      t('pageWashing.typingAmount'),
      t('pageWashing.amount'),
      t('pageWashing.operar'),
    ],
    [t('pageWashing.gamept'), t('pageWashing.washCodeRatio')],
  ]
  pages.value = 1
  getTotalMoney()
  switchMenu(tabIndex.value)
}
const recentMonthRebateMoney = ref<GetRecentMonthRebateMoney['response']>()
const chart = ref()
onLoad(() => {
  init()
  addListener('language', (type, _name) => {
    if (type === 'set') {
      init()
    }
  })
  '/api/userRebate/getRecentMonthRebateMoney'
    .GET<GetRecentMonthRebateMoney>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then((ret) => {
      recentMonthRebateMoney.value = ret
      // console.log(1223333, ret)
      let myChart = echarts.init(chart.value)
      let option = {
        toolbox: { show: false },
        title: {
          text: unit.value + '' + Number(ret[0].total_money - ret[1].total_money).toFixed(2),
          left: 'center',
          top: 'center',
          icon: Number(ret[0].total_money - ret[1].total_money) > 0 ? iconUp : iconDown,
          textStyle: {
            color: '#B5EBFF',
            fontSize: isPc.value ? 24 : rootFontSize.value * 0.625,
            fontFamily: 'Akrobat-ExtraBold',
          },
        },
        color: ['#00FFFF', '#FF10FF'],
        series: [
          {
            hoverAnimation: false,
            label: {
              show: true,
              color: 'inherit',
              formatter: ['{a|{b}}', '{c}'].join('\n'),
              rich: {
                a: { color: '#5B6DA1', fontFamily: 'Akrobat-ExtraBold', fontSize: 10 },
              },
              textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
                fontFamily: 'Akrobat-ExtraBold',
              },
            },
            labelLine: {
              length: rootFontSize.value * 0.64063,
              length2: rootFontSize.value * 0.64063,
            },
            type: 'pie',
            radius: ['90%', '70%'],
            startAngle: 135,
            data: ret.map((e) => ({
              name: `${e.create_time.slice(-2)}` + t('pageRebateRatio.month'),
              value: Number(e.total_money),
            })),
          },
        ],
      }

      myChart.setOption(option)
    })
})
onShow(() => {
  autoRecord.value.length = 0
  getTotalMoney()
  switchMenu(0)
  init()
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.scroll-view {
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
}

.body {
  background: #1f1f1f;
  width: 100%;
  box-sizing: border-box;

  @include pc {
    &~.body {
      padding-top: 0;
    }

    .pc-flex {
      display: flex;
      gap: 30px;
      align-items: center;
      justify-content: center;
    }
  }
}

.line {
  height: pxToRem(8);
}

.rebate {
  box-sizing: border-box;
  display: flex;
  padding: 0.625rem;
  background: #2a2a2a;
  color: #fff;
  font-size: 0.6875rem;
  margin-bottom: 0.62rem;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.1rem;
  height: pxToRem(108/2);
  border-radius: pxToRem(16/2);

  +.rebate {
    margin-top: 0;
  }

  @include pc {
    height: 201px;
    font-size: 22px;
    flex: 1;
    margin: 0;
    border-radius: 24px;
    background: #1d1a3f;
    box-sizing: border-box;
    padding: 20px;
  }

  .icon-value {
    display: flex;
    gap: 0.38rem;
    align-items: center;

    span {
      color: #14d03d;
    }

    @include pc {
      gap: 20px;

      div {
        display: flex;
        flex-direction: column;
      }

      span {
        padding-top: 12px;
        font-size: 22px;
      }
    }
  }

  .icon-value::before {
    content: '';
    display: block;
    width: pxToRem(170/4);
    height: pxToRem(107/4);
    background: url(@/assets/new/coffer/icon-1.png) no-repeat center;
    background-size: 100%;
    margin: 0;

    @include pc {
      width: 130px;
      height: 80px;
      background-size: auto 90%;
      margin: 0;
    }
  }

  &~.rebate .icon-value::before {
    background-image: url(@/assets/new/coffer/icon-2.png);
  }

  .receive-btn {
    display: flex;
    width: 4.25rem;
    height: 1.6875rem;
    flex-shrink: 0;
    border-radius: pxToRem(8);
    background: #009d80;
    justify-content: center;
    align-items: center;
    font-size: 0.875rem;
    color: #fff;

    @include pc {
      height: 54px;
      padding: 0 40px;
      font-size: 28px;
      margin-right: 60px;
    }
  }
}

.pc-box {
  width: 100%;
}

@include pc {
  .pc-box {
    width: 100%;
    padding: 35px 45px;
    border-radius: 24px;
    background: #1d1a3f;
    margin-top: 19px;
  }
}

.empty-card {
  width: 100%;
}

.tab-btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #7d8397;
  font-size: pxToRem(15);
  gap: 0.3125rem;
  margin-bottom: pxToRem(18);
  background: #202124;

  // overflow-x: scroll;
  .tab-btn {
    flex: 1;
    display: inline-block;
    margin-right: 0.625rem;
    padding: 0.25rem 0.9375rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 0.25rem;
    //border: 1px solid rgba(73, 70, 118, 0.5);
    border: 1px solid #494949;
    //background: rgba(32, 30, 71, 0.32);


    &.active {
      color: #00ffff;
      //font-size: 0.75rem;
      //background: #2e2c5e;
      border: 1px solid #00ffff;
    }

    span {
      white-space: nowrap;
    }
  }

  @include pc {
    justify-content: flex-start;
    gap: 20px;
    font-size: 16px;
    margin-bottom: 20px;

    .tab-btn {
      flex: none;
      height: 40px;
      padding: 0 30px;

      &.active {
        font-size: 16px;
        border: 1px solid #2e2c5e;
        background: #2e2c5e;
      }
    }
  }
}

@include pc {
  .tab-datas-box {
    border-radius: 8px;
    border: 1px solid rgba(73, 70, 118, 0.5);
    overflow: hidden;
  }
}

.tab-datas {
  display: flex;
  padding: 0.375rem 0.625rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  color: #7d8397;

  text-align: center;
  font-size: pxToRem(12);

  &.head {
    color: #ffffff;
    font-size: pxToRem(11);
  }

  div {
    flex: 1;
  }

  &:not(.head) div {
    //&:nth-child(2) {
    //  color: #fff;
    //}

    &:last-child {
      color: #14d03d;
    }
  }

  @include pc {
    height: 60px;
    padding: 0;
    font-size: 14px;
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

.two-months {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .txt-data {
    flex: 1;
    display: flex;
    text-align: center;
    font-size: 0.6875rem;
    line-height: 0.6875rem;
    justify-content: space-between;
    align-items: center;
    padding-right: 1.8rem;
    padding-left: 0.63rem;
  }

  .time {
    color: #fff;
  }

  .value {
    color: #14d03d;
    padding-top: 0.8rem;
    padding-bottom: 0.4rem;
  }

  .name {
    font-size: 0.5rem;
    background: linear-gradient(180deg, #ff7e43 0%, #ff5000 62.5%, #ff8d59 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .img-data {
    width: 12rem;
    height: 5.21875rem;
    margin-bottom: pxToRem(18);
  }

  @include pc {
    padding: 20px 0;

    .img-data {
      width: 400px;
      height: 167px;
    }

    .name {
      display: none;
    }

    .value {
      color: #0ff;
      font-size: 40px;
      padding: 0;

      span {
        font-size: 16px;
        color: #fff;
      }
    }

    .txt-data {
      flex: none;
      gap: 170px;
      font-size: 22px;
      line-height: normal;
      text-align: left;
    }

    .txt-data>div~div .value {
      color: #ff10ff;
    }
  }
}

.footer {
  border-radius: 0.5rem;
  background: #2a2a2a url(@/assets/new/washing/bet.png) no-repeat left top;
  background-size: auto 100%;
  height: 9.375rem;
  color: #fff;
  padding-left: 7.5rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 2rem;
  position: relative;
  font-family: Alibaba PuHuiTi 2;

  .title {
    font-weight: 600;
    font-size: pxToRem(16);
    font-family: Alibaba PuHuiTi 2;
    margin-bottom: pxToRem(6);
  }

  .value {
    width: 9.8rem;
    font-weight: 300;
    font-size: pxToRem(12);
  }

  .go-game-btn {
    background: #009d80;
    height: pxToRem(34);
    width: pxToRem(227/2);
    border-radius: pxToRem(16/2);
    text-align: center;
    line-height: pxToRem(34);
  }

  //@include pc {
  //  align-items: center;
  //  flex-direction: row;
  //  height: 300px;
  //  border-radius: 16px;
  //  background-size: auto 238px;
  //  background-position: 20px center;
  //  padding-left: 394px;
  //  justify-content: space-between;
  //  padding-right: 230px;
  //  margin: 64px 0;
  //  &::after {
  //    content: '';
  //    width: 174px;
  //    height: 174px;
  //    left: 430px;
  //    top: 20px;
  //    display: block;
  //    position: absolute;
  //    border-radius: 115px;
  //    opacity: 0.56;
  //    background: linear-gradient(90deg, rgba(0, 255, 255, 0.37) 0.16%, rgba(255, 146, 255, 0.64) 99.84%);
  //    filter: blur(60px);
  //  }
  //  .title {
  //    font-size: 32px;
  //  }
  //
  //  .value {
  //    width: 308px;
  //    font-size: 24px;
  //  }
  //  .go-game-btn {
  //    min-width: 220px;
  //    height: 60px;
  //    border-radius: 13px;
  //    font-size: 24px;
  //  }
  //}
}

//.cashback-record {
//  @include pc {
//    .tab-datas {
//      color: #fff;
//    }
//    .tab-datas:not(.head) div:nth-last-child(2) {
//      color: #02b563;
//    }
//    .tab-datas:not(.head) div:last-child {
//      color: #0ff;
//      display: flex;
//      align-items: center;
//      justify-content: center;
//      filter: brightness(0.5);
//      &::after {
//        content: '';
//        display: block;
//        width: 20px;
//        height: 20px;
//        background: url(@/assets/new/washing/tab-icon.png);
//        margin-left: 5px;
//      }
//      &:hover {
//        filter: brightness(1);
//      }
//    }
//  }
//}
</style>
