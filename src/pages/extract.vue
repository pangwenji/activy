<template>
  <!--  <page-->
  <!--    :show-scrollbar="!isPc"-->
  <!--    :mouse-wheel="true"-->
  <!--    :showHeader="false"-->
  <!--    :head-box="isPc ? ['content', 'right'] : undefined"-->
  <!--    :disable-scrollbar="isPc"-->
  <!--  >-->
  <div class="container">
    <svg class="icon" @click="clickHandler">
      <use xlink:href="/icon.svg#icon_Close"></use>
    </svg>
    <div class="inner">
      <div class="title">
        {{ $t('pageTurntable.title') }}
        <span :data-unit="unit">{{ showMoney }}</span>
      </div>
      <div class="box">
        <div class="name">
          <span>{{ $t('pageExtract.t1') }}</span>
          <span>{{ $t('pageExtract.t2') }}</span>
        </div>
        <div class="items">
          <div class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="#14D03D"
                d="M5.62976 5.62974C8.28247 2.97707 11.951 1.33398 16.0007 1.33398C20.0503 1.33398 23.7188 2.97707 26.3715 5.62975C29.0242 8.28246 30.6673 11.951 30.6673 16.0007C30.6673 20.0503 29.0242 23.7188 26.3715 26.3715C23.7188 29.0242 20.0503 30.6673 16.0007 30.6673C11.951 30.6673 8.28246 29.0242 5.62975 26.3715C2.97708 23.7188 1.33398 20.0503 1.33398 16.0007C1.33398 11.951 2.97709 8.28245 5.62976 5.62974ZM23.6101 12.9435C24.1308 12.4228 24.1308 11.5785 23.6101 11.0578C23.0894 10.5371 22.2452 10.5371 21.7245 11.0578L14.6673 18.115L11.6101 15.0578C11.0894 14.5371 10.2452 14.5371 9.72451 15.0578C9.20381 15.5785 9.20381 16.4228 9.72451 16.9435L13.7245 20.9435C14.2452 21.4642 15.0894 21.4642 15.6101 20.9435L23.6101 12.9435Z"
              />
            </svg>
            <span>{{ $t('pageExtract.t3') }}</span>
          </div>

          <div class="item">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                fill="#14D03D"
                d="M5.62976 5.62974C8.28247 2.97707 11.951 1.33398 16.0007 1.33398C20.0503 1.33398 23.7188 2.97707 26.3715 5.62975C29.0242 8.28246 30.6673 11.951 30.6673 16.0007C30.6673 20.0503 29.0242 23.7188 26.3715 26.3715C23.7188 29.0242 20.0503 30.6673 16.0007 30.6673C11.951 30.6673 8.28246 29.0242 5.62975 26.3715C2.97708 23.7188 1.33398 20.0503 1.33398 16.0007C1.33398 11.951 2.97709 8.28245 5.62976 5.62974ZM23.6101 12.9435C24.1308 12.4228 24.1308 11.5785 23.6101 11.0578C23.0894 10.5371 22.2452 10.5371 21.7245 11.0578L14.6673 18.115L11.6101 15.0578C11.0894 14.5371 10.2452 14.5371 9.72451 15.0578C9.20381 15.5785 9.20381 16.4228 9.72451 16.9435L13.7245 20.9435C14.2452 21.4642 15.0894 21.4642 15.6101 20.9435L23.6101 12.9435Z"
              />
            </svg>
            <!-- status -->
            <span v-if="data.status > 0">{{ $t('pageExtract.t42') }}</span>
            <span v-else>
              {{ $t('pageExtract.t4') }}{{ unit }}{{ Math.max(data.reward_money - data.record_money, 0).toFixed(2) }}
            </span>
          </div>

          <div class="item">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                :fill="data.status != 0 ? '#14D03D' : '#4b4f5d'"
                d="M5.62976 5.62974C8.28247 2.97707 11.951 1.33398 16.0007 1.33398C20.0503 1.33398 23.7188 2.97707 26.3715 5.62975C29.0242 8.28246 30.6673 11.951 30.6673 16.0007C30.6673 20.0503 29.0242 23.7188 26.3715 26.3715C23.7188 29.0242 20.0503 30.6673 16.0007 30.6673C11.951 30.6673 8.28246 29.0242 5.62975 26.3715C2.97708 23.7188 1.33398 20.0503 1.33398 16.0007C1.33398 11.951 2.97709 8.28245 5.62976 5.62974ZM23.6101 12.9435C24.1308 12.4228 24.1308 11.5785 23.6101 11.0578C23.0894 10.5371 22.2452 10.5371 21.7245 11.0578L14.6673 18.115L11.6101 15.0578C11.0894 14.5371 10.2452 14.5371 9.72451 15.0578C9.20381 15.5785 9.20381 16.4228 9.72451 16.9435L13.7245 20.9435C14.2452 21.4642 15.0894 21.4642 15.6101 20.9435L23.6101 12.9435Z"
              />
            </svg>
            <span :style="{ color: data.status != 0 ? '#14D03D' : '#4b4f5d' }">
              {{ $t('pageExtract.t5') }}{{ unit
              }}{{ Number(data.record_money) > Number(data.reward_money) ? data.record_money : data.reward_money }}
            </span>
          </div>
        </div>
      </div>
      <div class="submint-btn" v-if="data.status == 0 || data.status == 2" @click.stop="showSharePopHandler">
        {{ $t('pageExtract.t6') }}
      </div>
      <div class="submint-btn" v-else-if="data.status == 1" @click="submint">{{ $t('pageExtract.t7') }}</div>
    </div>
  </div>
  <!--  </page>-->
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits } from 'vue'
// import Page from '../components/page.vue'
import { back, onLoad } from '../router/routes'
import { isPc, unit } from '../uilts/async.var'
import { dbGet } from '../uilts/db'
import { hint } from '../uilts/ui'
import { t } from '../uilts/i18n'
// import { defineEmits } from 'vue/dist/vue'

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
const emit = defineEmits(['hiddenPop', 'showSharePop'])
const showMoney = ref('0')

const submint = () => {
  '/api/activity/receiveTurntable'
    .GET<ReceiveTurntable>(
      {
        record_id: data.record_id,
      },
      {
        Authorization: async () => await dbGet('token'),
      },
    )
    .then(() => {
      hint(t('pageExtract.t9'))
      back()
    })
}

let animationTimer = 0

const count = 33

const moneyAnimation = () => {
  const _money = Number(data.record_money)

  if (Number(showMoney.value) >= _money) {
    showMoney.value = _money.toFixed(2)

    window.cancelAnimationFrame(animationTimer)
  } else {
    showMoney.value = (Number(showMoney.value) + _money / count).toFixed(2)

    animationTimer = window.requestAnimationFrame(moneyAnimation)
  }
}

onLoad(() => {
  '/api/activity/getTurntableDetails'
    .GET<GetTurntableDetails>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then((ret) => {
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
const clickHandler = () => {
  emit('hiddenPop')
}
const showSharePopHandler = () => {
  emit('showSharePop')
}
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.container {
  background: #191b1d;
  width: pxToRem(311);
  padding: pxToRem(32) pxToRem(11) pxToRem(11);
  margin: 0 auto;
  border-radius: pxToRem(10);
  position: relative;

  .inner {
    background: #27292d;
    border-radius: pxToRem(10);
    padding-top: pxToRem(12);
  }
  .icon {
    width: pxToRem(15);
    height: pxToRem(15);
    position: absolute;
    top: pxToRem(8);
    right: pxToRem(8);
    fill: #fff;
  }
}

//.body {
//  // padding:0 0.75rem;
//  @include pc {
//    display: flex;
//    // padding:0 36px 36px;
//    flex-direction: column;
//    justify-content: space-between;
//    align-items: flex-start;
//    height: 100%;
//    box-sizing: border-box;
//    div {
//      width: 100%;
//      box-sizing: border-box;
//    }
//  }
//}

.submint-btn {
  display: flex;
  height: 2.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: rgb(109, 223, 57);
  color: #fff;
  text-align: center;
  margin-top: pxToRem(14);
  font-size: pxToRem(15);

  &.disable {
    filter: grayscale(1);
  }

  @include pc {
    height: 44px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 600;
  }
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgb(109, 223, 57);
  font-size: pxToRem(12);

  //height: 3.3125rem;
  //padding: 0 1rem;
  //align-items: center;
  //gap: 0.75rem;
  //border-radius: 0.5rem;
  //background: #201e47;
  //font-size: 0.875rem;
  //color: #5b6da1;
  //font-size: 0.875rem;
  //margin-bottom: 0.5rem;
  span {
    margin-top: pxToRem(6);
    font-size: pxToRem(35);
    color: rgb(253, 38, 38);
    font-weight: 700;

    &::before {
      content: attr(data-unit);
      //font-size: 0.75rem;
    }
  }

  @include pc {
    padding: 24px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 8px;
    border: 1px solid #292547;
    background: transparent;
    height: auto;
    justify-content: space-between;
    margin-bottom: 16px;

    span {
      font-size: 24px;
      font-weight: 700;

      &::before {
        font-size: 24px;
      }
    }
  }
}

.box {
  //padding: 1rem;
  border-radius: 0.5rem;
  //background: ##;
  color: #e6e6e6;
  font-size: 0.75rem;

  .name {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    padding-bottom: 0.75rem;
    font-size: pxToRem(11);
    gap: pxToRem(7);
  }

  .items {
    background: #232327;
    font-size: pxToRem(9);
    border-radius: pxToRem(10);
    padding-left: pxToRem(16);
    padding-top: pxToRem(13);
  }

  .item {
    display: flex;
    align-items: center;
    padding-bottom: pxToRem(16);
    position: relative;
    color: #6ddf39;
    &::before {
      left: pxToRem(5);
      bottom: 0;
      position: absolute;
      content: '';
      height: 16px;
      border-left: pxToRem(1) dotted #6ddf39;
    }
    &:nth-child(3) {
      &::before {
        display: none;
      }
    }
  }

  svg {
    width: pxToRem(12);
    height: pxToRem(12);
    margin-right: pxToRem(6);
  }

  @include pc {
    padding: 32px 24px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 8px;
    border: 1px solid #292547;
    background: transparent;
    height: auto;
    justify-content: space-between;
    font-size: 16px;

    .name {
      padding-bottom: 24px;
    }

    .items {
      border-radius: 8px;
      background: #181538;
    }

    .item {
      display: flex;
      padding: 0 16px;
      align-items: center;
      gap: 16px;
      height: 40px;
      font-size: 14px;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
