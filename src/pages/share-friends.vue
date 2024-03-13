<template>
  <div class="container">
    <svg class="close" @click="clickHandler">
      <use xlink:href="/icon.svg#icon_Close"></use>
    </svg>
    <div class="title">1.{{ $t('pageShareFriends.t2') }}</div>
    <!--    <div class="icon-btns">-->
    <!--      <div class="icon-btn">-->
    <!--        <img src="@/assets/new/share-friends/icon-1.png" class="icon" alt="" />-->
    <!--        <div>Facebook</div>-->
    <!--      </div>-->

    <!--      <div class="icon-btn">-->
    <!--        <img src="@/assets/new/share-friends/icon-2.png" class="icon" alt="" />-->
    <!--        <div>Telegram</div>-->
    <!--      </div>-->

    <!--      <div class="icon-btn">-->
    <!--        <img src="@/assets/new/share-friends/icon-3.png" class="icon" alt="" />-->
    <!--        <div>Twitter</div>-->
    <!--      </div>-->

    <!--      <div class="icon-btn">-->
    <!--        <img src="@/assets/new/share-friends/icon-4.png" class="icon" alt="" />-->
    <!--        <div>Email</div>-->
    <!--      </div>-->

    <!--      <div class="icon-btn">-->
    <!--        <img src="@/assets/new/share-friends/icon-5.png" class="icon" alt="" />-->
    <!--        <div>TikTok</div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="title">2.{{ $t('pageShareFriends.t2') }}</div>-->
    <div class="copy" v-for="item in data.domain">
      <div class="text">{{ item.url + '?invite_code=' + data.invite_code }}</div>
      <div class="icon-btn" @click="copy(item.url + '?invite_code=' + data.invite_code, $t('pageShareFriends.t3'))">
        <svg class="icon">
          <use xlink:href="/icon.svg#icon_Copy"></use>
        </svg>
      </div>
    </div>
    <div class="title">2.{{ $t('pageShareFriends.t4') }}</div>
    <div class="tels">
      <div class="tel" v-for="tel in data.mobile_list">{{ tel.mobile }}</div>
    </div>
    <div
      class="pay-btn"
      @click="
        copy(
          data.sms_template.replace('{url}', data.domain[0].url + '?invite_code=' + data.invite_code),
          $t('pageShareFriends.t3'),
        )
      "
    >
      <div>
        {{ $t('pageShareFriends.t5') }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, reactive, defineEmits } from 'vue'
// import Page from '../components/page.vue'

import UiTurntableRule from '../components/ui-turntable-rule.vue'
import { onLoad } from '../router/routes'
import { showActionSheet } from '../uilts/ui'
import { t } from '../uilts/i18n'
import { copy } from '../uilts/base'
import { dbGet } from '../uilts/db'
// import { defineEmits } from 'vue/dist/vue'
// import { isPc } from '../uilts/async.var'
const rules = [
  t('pageTurntable.g1'),
  t('pageTurntable.g2'),
  t('pageTurntable.g3'),
  t('pageTurntable.g4'),
  t('pageTurntable.g5'),
  t('pageTurntable.g6'),
]
const data = reactive<GetShareInfo['response']>({
  invite_code: '',
  domain: [],
  mobile_list: [],
  sms_template: '',
})

onUnmounted(() => {})

const rule = () => {
  showActionSheet(rules, UiTurntableRule, {
    title: t('pageTurntable.gtitle'),
  })
}
onLoad(() => {
  '/api/activity/getShareInfo'
    .GET<GetShareInfo>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then((ret) => {
      data.invite_code = ret.invite_code
      data.domain = ret.domain
      data.mobile_list = ret.mobile_list
      data.sms_template = ret.sms_template
    })
})
const emit = defineEmits(['hiddenPop'])
const clickHandler = () => {
  emit('hiddenPop')
}
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
.container {
  height: 19rem;
  width: 100%;
  overflow: hidden;
  background: #fff !important;
  padding: pxToRem(14) pxToRem(12) pxToRem(24);
  box-sizing: border-box;
  position: relative;
  .close {
    position: absolute;
    top: pxToRem(10);
    right: pxToRem(16);
    height: pxToRem(16);
    width: pxToRem(16);
    fill: grey;
  }
}
.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.title {
  //color: #9c9c9c;
  //font-size: 0.75rem;
  //margin-top: 0.75rem;
  //margin-bottom: 0.5rem;
  font-size: pxToRem(13);
  font-weight: 700;
  color: #898989;
  @include pc {
    font-size: 16px;
    margin: 0;
    padding-bottom: 8px;
  }
}
.pay-btn {
  display: flex;
  width: 100%;
  background: black;
  padding: 0 pxToRem(10);
  box-sizing: border-box;
  height: pxToRem(56);

  div {
    background: #fff;
    color: black;
    height: pxToRem(46);
    line-height: pxToRem(46);
    width: 100%;
    text-align: center;
    font-size: pxToRem(20);
  }
  @include pc {
    border-radius: 8px;
    height: 44px;
    font-size: 20px;
    font-weight: 600;
    margin: 0;
    .icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
}
.icon-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.5625rem;
  padding: pxToRem(11) 0;
  color: #727272;
  .icon-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon {
    width: pxToRem(40);
    height: pxToRem(40);
    margin-bottom: pxToRem(6);
  }
  @include pc {
    border-radius: 8px;
    border: 1px solid #292547;
    background: transparent;
    font-size: 14px;
    padding: 24px 20px;
    margin-bottom: 16px;
    .icon {
      width: 40px;
      height: 40px;
      margin-bottom: 8px;
    }
  }
}

.copy {
  height: pxToRem(28);
  padding-left: 1rem;
  //border-radius: 0.25rem;
  background: #f9f9f9;
  //background-color: rgb(32, 33, 36);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: pxToRem(19);
  .text {
    display: flex;
    align-items: center;
    width: 80%;
    //padding: 0.59rem 0;
    color: grey;
    font-size: pxToRem(10);
    flex-wrap: nowrap;
    word-break: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    overflow: hidden;
  }
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: pxToRem(5);
    .icon {
      fill: #40a1de;
    }
  }
  @include pc {
    padding-left: 24px;
    border-radius: 8px;
    border: 1px solid #292547;
    background: transparent;
    margin-bottom: 16px;
    .icon-btn {
      width: 40px;
      height: 40px;
      background: #272557;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text {
      font-size: 14px;
    }
  }
}

.tab-datas {
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background: #231d4e;
  color: #8e90cd;
  .tab-data {
    display: flex;
    text-align: center;
    font-size: 0.8125rem;
    font-weight: 500;
    height: 3.125rem;
    align-items: center;
    justify-content: space-between;
    div {
      flex: 1;
    }
    &:nth-of-type(2n) {
      background-color: #181538;
    }
  }
  @include pc {
    .tab-data {
      height: 40px;
      font-size: 14px;
      font-weight: 400;
    }
  }
}

.tels {
  margin-top: pxToRem(8);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  //border-radius: 0.5rem;
  background-color: black;
  color: #8f8f8f;
  //margin-bottom: 1rem;
  padding: pxToRem(12) pxToRem(10);
  .tel {
    display: flex;
    text-align: center;
    font-size: pxToRem(10);
    font-weight: 700;
    height: pxToRem(17);
    align-items: center;
    justify-content: center;
  }
  @include pc {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
    .tel {
      height: 40px;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>
