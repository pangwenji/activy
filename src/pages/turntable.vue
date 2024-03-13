<template>
  <page
    title-bg-color="transparent"
    :title="title"
    :show-scrollbar="true"
    :mouse-wheel="true"
    :head-box="isPc ? ['content', 'right'] : undefined"
    class="table-container"
    :class="{ containerWithPop: showPop || showSharePop }"
  >
    <!--    <template #header-icon-right>-->
    <!--      <img src="@/assets/new/turntable/help.png" class="icon" alt="" />-->
    <!--    </template>-->
    <!--    <template #header-content>-->
    <!--      <div>-->
    <!--        {{ title }}-->
    <!--        <img src="@/assets/new/turntable/help.png" class="icon pc" @click="isPc ? (tabIndex = 2) : rule()" alt="" />-->
    <!--      </div>-->
    <!--    </template>-->
    <div class="body page-pading">
      <div class="jackpot">
        <div class="j-centent">
          <div class="title">
            <img src="@/assets/new/turntable/cash.png" alt="" />
            <span class="money" :data-unit="unit">{{ showMoney }}</span>
            <!--            <span class="btn" @click="$open('/extract')">-->
            <span class="btn" @click="showPop = true">
              <img src="@/assets/new/turntable/btn-icon.png" alt="" />
              {{ $t('pageTurntable.tq') }}
            </span>
          </div>

          <div class="schedule">
            <div
              class="schedule-value"
              :style="{ width: Math.min(Math.max(data.record_money / data.reward_money, 0), 1) * 100 + '%' }"
            >
              <span class="percent">
                {{ (Math.min(Math.max(data.record_money / data.reward_money, 0), 1) * 100).toFixed(2) }}%
              </span>
            </div>
          </div>

          <div class="remain-money">
            <div v-if="data.reward_money - data.record_money > 0">
              {{ $t('pageTurntable.ewj') }}
              <span>{{ showExtraMoney }}</span>
            </div>
            <div v-else>{{ $t('pageTurntable.ywcjljj') }}</div>
          </div>
        </div>
      </div>
      <teleport to="#independent" :disabled="!isPc">
        <turntable class="turntable" @spin="spin" :datas="data.config" v-model="data.can_turn_num"></turntable>
      </teleport>

      <div class="time-left-box">
        <div class="time-left">
          <!--          <div>-->
          <div class="title">{{ $t('pageTurntable.sysj') }}</div>
          <div class="times">
            <div><ds-digital style="transform: scale(0.5)" :value="times.d[times.d.length - 2]"></ds-digital></div>
            <div><ds-digital style="transform: scale(0.5)" :value="times.d[times.d.length - 1]"></ds-digital></div>
            <span>d</span>
            <div><ds-digital style="transform: scale(0.5)" :value="times.h[times.h.length - 2]"></ds-digital></div>
            <div><ds-digital style="transform: scale(0.5)" :value="times.h[times.h.length - 1]"></ds-digital></div>
            <span>:</span>
            <div><ds-digital style="transform: scale(0.5)" :value="times.m[times.m.length - 2]"></ds-digital></div>
            <div><ds-digital style="transform: scale(0.5)" :value="times.m[times.m.length - 1]"></ds-digital></div>
            <span>:</span>
            <div><ds-digital style="transform: scale(0.5)" :value="times.s[times.s.length - 2]"></ds-digital></div>
            <div><ds-digital style="transform: scale(0.5)" :value="times.s[times.s.length - 1]"></ds-digital></div>
            <!--              <span>:</span>-->
          </div>
          <!--          </div>-->
          <!--          <img src="@/assets/new/turntable/icon-2.png" class="icon" alt="" />-->
        </div>
        <div class="share-btn" @click="showSharePop = true">
          {{ $t('pageTurntable.tjhdjj') }}
          <svg class="icon">
            <use xlink:href="/icon.svg#icon_Share"></use>
          </svg>
        </div>
      </div>

      <div class="table-tabBtns">
        <div class="tab-btn" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0">
          {{ $t('pageTurntable.ysz') }}
        </div>
        <div class="tab-btn" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">
          {{ $t('pageTurntable.yqh') }}
        </div>
      </div>

      <div class="infinity-scroll" v-show="tabIndex == 0">
        <div class="empty" :data-empty="$t('ui.empty')" v-if="!data.win_user.length"></div>
        <div
          class="tab-datas"
          :class="{ running: data.win_user.length > 5 }"
          v-show="tabIndex == 0"
          :style="{ animationDuration: data.win_user.length / 2 + 's' }"
        >
          <div class="tab-data winner" v-for="item in data.win_user">
            <div>{{ item.username }}</div>
            <div>{{ $t('pageTurntable.ysd') }}</div>
            <div>{{ unit }}{{ item.money }}</div>
          </div>
          <div class="tab-data winner" v-if="data.win_user.length > 5 && !isPc" v-for="item in data.win_user">
            <div>{{ item.username }}</div>
            <div>{{ $t('pageTurntable.ysd') }}</div>
            <div>{{ unit }}{{ item.money }}</div>
          </div>
        </div>
      </div>
      <div class="infinity-scroll infinity-scroll2" v-show="tabIndex == 1">
        <!--        <div class="empty" :data-empty="$t('ui.empty')" v-if="!data.invitation.length"></div>-->
        <div
          class="tab-datas"
          :class="{ running: data.invitation.length > 5 }"
          v-show="tabIndex == 1"
          :style="{ animationDuration: data.invitation.length + 's' }"
        >
          <div class="tab-data" v-for="item in data.invitation">
            <div>{{ item.username }}</div>
            <div>{{ $t('pageTurntable.yzc') }}</div>
            <div>{{ $t('pageTurntable.ywc') }}</div>
          </div>

          <div class="tab-data" v-if="data.invitation.length > 5 && !isPc" v-for="item in data.invitation">
            <div>{{ item.username }}</div>
            <div>{{ $t('pageTurntable.yzc') }}</div>
            <div>{{ $t('pageTurntable.ywc') }}</div>
          </div>
        </div>
      </div>

      <div class="rules">
        <h2 class="rule">
          {{ $t('pageTurntable.gtitle') }}
        </h2>
        <div class="tip-container">
          <div class="item" v-for="item in rules">{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="pop" v-if="showPop" @click="showPop = false">
      <extract @hiddenPop="showPop = false" @showSharePop="showSharePop = true" class="extract" />
    </div>
    <div class="pop" v-if="showSharePop" @click="showSharePop = false">
      <ShareFriends @hiddenPop="showSharePop = false" class="share-friends" />
    </div>
  </page>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import Page from '../components/page.vue'
import DsDigital from '../components/ds-digital.vue'
import TurntableAlert from '../components/turntable-alert.vue'
import extract from '../pages/extract.vue'
import ShareFriends from '@/pages/share-friends.vue'
// import BorderGradient from '../components/border-gradient.vue'
import Turntable from '../components/turntable.vue'
import UiTurntableRule from '../components/ui-turntable-rule.vue'
// import UiNotice from '../components/ui-notice.vue'
import { onLoad, onShow } from '../router/routes'
import { alert, hint, showActionSheet } from '../uilts/ui'
import { t } from '../uilts/i18n'
import { isPc, restMoney, unit } from '../uilts/async.var'
import { dbGet } from '../uilts/db'
const title = ref('')
const tabIndex = ref(0)
const data = reactive<GetTurntableDetails['response']>({
  activity_id: 0,
  activity_title: '',
  activity_name: '',
  start_time: 0,
  end_time: 0,
  status: 0,
  can_turn_num: 0,
  reward_money: 0,
  record_money: 0,
  record_id: 0,
  win_user: [],
  invitation: [],
  config: [],
})

const rules = computed(() => [
  t('pageTurntable.g1', { money: unit.value + data.reward_money }),
  t('pageTurntable.g2'),
  t('pageTurntable.g3'),
  t('pageTurntable.g4'),
  t('pageTurntable.g5'),
  t('pageTurntable.g6'),
])
const nowTime = ref(Date.now() / 1000)

const showMoney = ref('0')

const showExtraMoney = ref('0')

const times = computed<{
  d: string
  h: string
  m: string
  s: string
}>(() => {
  let t = data.end_time - nowTime.value
  return {
    d: '0' + Math.floor(t / 60 / 60 / 24),
    h: '0' + Math.floor((t / 60 / 60) % 24),
    m: '0' + Math.floor((t / 60) % 60),
    s: '0' + Math.floor(t % 60),
  }
})

const spin = (run: (p: Promise<any>) => Promise<{ item: TurntableConfig; data: DrawTurnTable['response'] }>) => {
  run(
    '/api/activity/drawTurnTable'.GET<DrawTurnTable>(null, {
      Authorization: async () => await dbGet('token'),
    }),
  )
    .then((e) => {
      if (e.item.type == 3 || e.item.type == 4) {
        data.record_money = data.record_money - 0 + (e.data.money - 0)
        restMoney.value = !restMoney.value
        '/api/activity/getTurntableDetails'
    .GET<GetTurntableDetails>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then((ret) => {
      if (!title.value) {
        title.value = ret.activity_title + unit.value + ret.reward_money
      }
      data.activity_id = ret.activity_id
      data.activity_title = ret.activity_title
      data.activity_name = ret.activity_name
      data.start_time = ret.start_time
      data.end_time = ret.end_time
      data.status = ret.status
      data.can_turn_num = ret.can_turn_num
      data.reward_money = ret.reward_money
      data.record_money = ret.record_money
      data.record_id = ret.record_id
      data.win_user = ret.win_user
      data.invitation = ret.invitation
      data.config = ret.config

      window.requestAnimationFrame(moneyAnimation)
    })
        alert(
          {
            title: t('pageTurntable.zjl'),
            content: unit.value + e.data.money,
          },
          TurntableAlert,
        )
      }
    })
    .catch((msg) => {
      hint(msg)
    })
}

// const rule = () => {
//   showActionSheet(rules.value, UiTurntableRule, {
//     title: t('pageTurntable.gtitle'),
//   })
// }

let animationTimer = 0

const count = 33

const moneyAnimation = () => {
  const _money = Number(data.record_money)

  if (Number(showMoney.value) >= _money) {
    showMoney.value = _money.toFixed(2)
    showExtraMoney.value = Math.max(data.reward_money - data.record_money, 0).toFixed(2)

    window.cancelAnimationFrame(animationTimer)
  } else {
    showMoney.value = (Number(showMoney.value) + _money / count).toFixed(2)

    const _diff = Number(data.reward_money) - Number(data.record_money)
    showExtraMoney.value = _diff > 0 ? (Number(showExtraMoney.value) + _diff / count).toFixed(2) : '0.00'

    animationTimer = window.requestAnimationFrame(moneyAnimation)
  }
}

let interval: NodeJS.Timeout
const showPop = ref(false)
const showSharePop = ref(false)
onUnmounted(() => {
  clearInterval(interval)
})
onLoad<PageData['/turntable']>((get) => {
  interval = setInterval(() => {
    nowTime.value = Date.now() / 1000
  }, 1000)
  title.value = get.title
  '/api/activity/getTurntableDetails'
    .GET<GetTurntableDetails>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then((ret) => {
      if (!title.value) {
        title.value = ret.activity_title + unit.value + ret.reward_money
      }
      data.activity_id = ret.activity_id
      data.activity_title = ret.activity_title
      data.activity_name = ret.activity_name
      data.start_time = ret.start_time
      data.end_time = ret.end_time
      data.status = ret.status
      data.can_turn_num = ret.can_turn_num
      data.reward_money = ret.reward_money
      data.record_money = ret.record_money
      data.record_id = ret.record_id
      data.win_user = ret.win_user
      data.invitation = ret.invitation
      data.config = ret.config

      window.requestAnimationFrame(moneyAnimation)
    })
})
onShow<PageData['/turntable']>((get) => {
  interval = setInterval(() => {
    nowTime.value = Date.now() / 1000
  }, 1000)
  title.value = get.title
  '/api/activity/getTurntableDetails'
    .GET<GetTurntableDetails>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then((ret) => {
      if (!title.value) {
        title.value = ret.activity_title + unit.value + ret.reward_money
      }
      data.activity_id = ret.activity_id
      data.activity_title = ret.activity_title
      data.activity_name = ret.activity_name
      data.start_time = ret.start_time
      data.end_time = ret.end_time
      data.status = ret.status
      data.can_turn_num = ret.can_turn_num
      data.reward_money = ret.reward_money
      data.record_money = ret.record_money
      data.record_id = ret.record_id
      data.win_user = ret.win_user
      data.invitation = ret.invitation
      data.config = ret.config

      window.requestAnimationFrame(moneyAnimation)
    })
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.table-container {
  .page-pading {
    padding: 0 pxToRem(26);
  }
  .body {
    background: #24262b;
  }
  //position: relative;
  .pop {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .extract {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .share-friends {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}
.containerWithPop {
  :deep(.page-div) {
    height: 100%;
    overflow: hidden;
  }
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;

  @include pc {
    width: 20px;
    height: 20px;
    margin-left: 19px;
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notice {
  position: absolute;
  top: var(--headers-height);
  left: 0.75rem;
  right: 0.75rem;
  z-index: calc(var(--I1) + 0);
  background-color: var(--body-background-color);

  @include pc {
    left: 36px;
    right: 36px;
  }
}

.turntable {
  //margin: 1.5rem auto;
  @include pc {
    //margin: 0;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: 0 auto;
    z-index: calc(var(--I3) + 1);
    transform: scale(2) translateX(-166.5px);
  }
}

.jackpot {
  padding: pxToRem(8) pxToRem(23);
  border-radius: pxToRem(10);
  background-color: rgb(35, 35, 39);
  font-size: 0.75rem;
  color: #5b6da1;
  position: relative;
  z-index: 1;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > img {
      width: pxToRem(50);
    }

    .money {
      margin-right: pxToRem(12);
    }

    span {
      font-size: pxToRem(30);
      color: #6ddf38;
      font-weight: 700;

      &::before {
        content: attr(data-unit);
      }
    }

    .btn {
      display: flex;
      align-items: center;
      font-weight: 700;
      border-radius: pxToRem(10);
      font-size: pxToRem(12);
      color: #fff;
      height: pxToRem(24);
      background: #efb423 linear-gradient(90deg, #49a319, #2b8b2f);
      padding: 0 pxToRem(12);

      img {
        width: pxToRem(14);
        margin-right: pxToRem(3);
      }
    }
  }

  .flex ~ .flex {
    padding-top: 0.5rem;
  }

  @include pc {
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #292547;
    background: transparent;
    font-size: 14px;
    gap: 24px;

    img {
      width: 100px;
      height: 100px;
    }

    .j-centent {
      width: 100%;
    }

    .title {
      font-size: 20px;
      padding-bottom: 8px;
      font-weight: 600;

      span {
        font-size: 24px;

        &::before {
          font-size: 24px;
        }
      }
    }
  }
}

.time-left-box {
  position: relative;
  z-index: 1;
}

@include pc {
  .time-left-box {
    display: flex;
    padding: 24px;
    border-radius: 8px;
    border: 1px solid #292547;
    font-size: 14px;
    gap: 24px;
    margin-top: 8px;
    align-items: center;
    justify-content: space-between;
  }
}

.time-left {
  display: flex;
  justify-content: center;
  font-size: pxToRem(13);
  color: rgb(135, 149, 177);

  .title {
    line-height: pxToRem(23);
  }

  .times {
    font-size: pxToRem(13);
    color: #fff;
    display: flex;
    align-items: center;
  }

  .icon {
    width: 5rem;
    height: 5rem;
  }

  @include pc {
    flex-direction: row-reverse;
    background: transparent;
    align-items: center;
    padding: 0;
    margin: 0;

    .icon {
      width: 100px;
      height: 100px;
      margin: 0;
      margin-right: 24px;
    }

    .title {
      font-size: 20px;
      font-weight: 600;
      padding-bottom: 10px;
    }

    .times {
      font-size: 13px;
      gap: 5px;

      div {
        width: 13px;
        height: 25px;
        border-radius: 2.5px;
      }
    }
  }
}

.share-btn {
  display: flex;
  height: pxToRem(35);
  //justify-content: center;
  align-items: center;
  background: rgb(32, 33, 36);
  color: #fff;
  text-align: center;
  font-size: pxToRem(14);
  margin-top: pxToRem(6);
  justify-content: space-around;
  .icon {
    fill: #fff;
  }
  @include pc {
    padding: 0 20px;
    height: 44px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
  }
}

.schedule {
  width: 100%;
  height: pxToRem(8);
  border-radius: 1.5625rem;
  background: #6ddf39;
  margin-top: pxToRem(17);

  //margin-right: 0.5rem;
  @include pc {
    width: 365px;
    height: 6px;
    border-radius: 50px;
    background: #201e47;
  }
}

.schedule-value {
  height: 100%;
  background: transparent;
  position: relative;

  .percent {
    position: absolute;
    bottom: 0.5rem;
    right: pxToRem(-24);
    font-size: pxToRem(14);
    color: #fff;
  }

  &::after {
    content: '';
    border-radius: 50%;
    background: #fff;
    width: pxToRem(8);
    height: pxToRem(8);
    position: absolute;
    right: 0;
  }

  @include pc {
    &::after {
      border-radius: 50%;
      width: 12px;
      height: 12px;
      right: 0;
      top: -3px;
    }
  }
}

.tq-btn {
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #fff;

  @include pc {
    height: 42px;
    border-radius: 8px;
    min-width: 118px;
  }
}

.table-tabBtns {
  //display: grid;
  margin-top: pxToRem(20);
  display: flex;
  height: pxToRem(45);
  background: rgb(31, 33, 37);
  font-size: pxToRem(15s);
  color: rgb(156, 156, 156);
  justify-content: space-around;
  position: relative;
  z-index: 1;

  .tab-btn {
    display: flex;
    //padding: 0.25rem 0.9375rem;
    justify-content: center;
    align-items: center;
    //border-radius: 0.25rem;
    //border: 1px solid rgba(73, 70, 118, 0.5);
    //background: rgba(32, 30, 71, 0.32);
    //color: #5b6da1;
    text-align: center;

    //font-size: 0.75rem;
    &.active {
      //background: #2e2c5e;
      //border: 1px solid #2e2c5e;
      //font-weight: 900;
      color: #fff;
    }
  }

  @include pc {
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    margin-bottom: 16px;
    margin-top: 32px;

    .tab-btn {
      height: 40px;
      padding: 0;
      font-size: 16px;
      font-weight: 900;
    }
  }
}

.tab-datas {
  padding-bottom: 1rem;

  .tab-data {
    display: flex;
    //border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    text-align: center;
    font-size: pxToRem(12);
    //font-weight: 500;
    color: #8795b1;
    height: pxToRem(30);
    align-items: center;
    justify-content: space-between;

    div {
      flex: 1;
    }

    &:last-child {
      border: none;
    }

    &.winner div:last-child {
      font-size: 0.8125rem;
      color: #14d03d;
    }
  }

  @include pc {
    .tab-data {
      height: 60px;
      font-size: 14px;
      font-weight: 400;

      &.winner div:last-child {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}

.item {
  color: #5b6da1;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
}

.top-page {
  position: relative;
  z-index: calc(var(--I1) + 0);
  background-color: var(--body-background-color);
}

.infinity-scroll {
  height: pxToRem(170);
  overflow: hidden;

  .tab-datas {
    animation: infinity-scroll 5s linear infinite;
    animation-play-state: paused;

    &.running {
      animation-play-state: running;
    }
  }

  .empty {
    padding: 0;
  }
}

.infinity-scroll2 {
  @include pc {
    height: auto;
  }
}

@keyframes infinity-scroll {
  0% {
    transform: translateY(0%);
    -webkit-transform: translateY(0%);
  }

  100% {
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
  }
}

.rules {
  background: #232327;
  border-radius: 0.04rem;
  padding: pxToRem(12);

  .rule {
    padding-top: pxToRem(11);
    color: #8795b1;
    text-align: center;
    font-size: pxToRem(18);
    height: pxToRem(36);
    line-height: pxToRem(36);
  }

  .item {
    margin: pxToRem(16) 0;
    color: #7d8397;
    font-size: pxToRem(14);
  }
}

.remain-money {
  color: #fff;
  font-size: pxToRem(13);
  text-align: center;
  height: pxToRem(22);
  line-height: pxToRem(22);
  margin-bottom: pxToRem(5);
  margin-top: pxToRem(7);

  span {
    display: inline-block;
    padding-left: pxToRem(3);
    color: #6ddf39;
  }
}
</style>
