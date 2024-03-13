<template>
  <page :show-header="false" class="page" page-style="height:100%" :mouse-wheel="true">
    <template #header-icon-right>
      <img src="@/assets/new/turntable/help.png" class="icon" alt="" />
    </template>
    <div class="body">
      <div class="flex">
        <img src="@/assets/new/turntable/close.png" alt="" @click="$back()" />
        <turntable class="turntable" @spin="spin" :datas="data.config" v-model="data.can_turn_num" />
        <div class="title">
          <div>{{ title }}</div>
        </div>
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import Page from '../components/page.vue'
import TurntableAlert from '../components/turntable-alert.vue'
import Turntable from '../components/turntable.vue'
import { onLoad, onlyOpen, open } from '../router/routes'
import { alert, hint } from '../uilts/ui'
import { t } from '../uilts/i18n'
import { unit, isLogin } from '../uilts/async.var'
import { dbGet } from '../uilts/db'
const title = ref('')
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

const spin = (run: (p: Promise<any>) => Promise<{ item: TurntableConfig; data: DrawTurnTable['response'] }>) => {
  if (!isLogin.value) {
    setTimeout(() => {
      open('/login')
    }, 1000)
  }

  run(
    '/api/activity/drawTurnTable'.GET<DrawTurnTable>(null, {
      Authorization: async () => await dbGet('token'),
    }),
  )
    .then((e) => {
      if (e.item.type == 3 || e.item.type == 4) {
        alert(
          {
            title: t('pageTurntable.zjl'),
            content: unit.value + e.data.money,
          },
          TurntableAlert,
        ).finally(() => {
          onlyOpen('/turntable', { title: title.value })
        })
      }
    })
    .catch((msg) => {
      hint(msg)
    })
}
if (isLogin.value) {
  onLoad<PageData['/turntable']>((get) => {
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
      })
      .catch((e) => {
        // console.log(e)
      })
  })
}

onMounted(() => {
  if (!isLogin.value) {
    '/api/page/getUnknownTurntableConfig'
      .GET<GetTurntableDetails>(null, {})
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
      })
      .catch((e) => {
        // console.log(e)
      })
  }
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

@include pc {
  .page {
    background: transparent;
  }
}
.body {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @include pc {
    transform: scale(2);
  }
}

.turntable {
  margin: 0 auto 0.97rem auto;
}
.flex {
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  img {
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: pxToRem(-98);
    right: pxToRem(62);
    z-index: 4;
  }
}
.title {
  line-height: 1.375rem;
  height: pxToRem(146/4);
  width: pxToRem(906/4);
  background: url('@/assets/new/turntable/title-bg.png') no-repeat;
  background-size: cover;
  margin: 0 auto;
  div {
    color: #ffda96;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    font-size: pxToRem(16);
  }
}
</style>
