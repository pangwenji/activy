<template>
    <page class="page" :show-scrollbar="true" :mouse-wheel="true">
        <template #header>
            <page-head close-location="right" :box="isPc ? ['content', 'right'] : undefined" class="head-style">
              <template #content>
                    <div class="name">{{ $t('vipRule') }}</div>
                <div class="title-tips h5">
                  <div><span>{{ $t("pageVipRule.Bet1yuan") }}=</span>{{ betRate }}EXP</div>
                  <div><span>{{ $t("pageVipRule.recharge1yuan") }}=</span>{{ rechargeRate }}EXP</div>
                </div>
                </template>
            </page-head>
        </template>
        <div class="body page-pading">
            <div class="title-tips pc">
                <div><span>{{ $t("pageVipRule.Bet1yuan") }}=</span>{{ betRate }}EXP</div>
                <div><span>{{ $t("pageVipRule.recharge1yuan") }}=</span>{{ rechargeRate }}EXP</div>
            </div>
            <div class="tab-datas-box">
                <div class="data head">
                    <div>{{ $t("pageVip.tab2name1") }}</div>
                    <div>{{ $t("pageVip.task2") }}</div>
                    <div>{{ $t("pageVip.task1") }}</div>
                </div>
                <div class="data" v-for="item in list">
                    <div>VIP{{ item.level }}</div>
                    <div>{{ unit }}{{ item.level_up_gift }}</div>
                    <div>{{ item.level_condition }}</div>
                </div>

            </div>
        </div>
    </page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import PageHead from '../components/page-head.vue';
import { computed, ref } from 'vue';
import { dbGet } from '../uilts/db';
import { onLoad } from '../router/routes';
import { isPc, unit } from '../uilts/async.var';

const list = ref<VipLevelRules["response"]>([])

const userLevel = ref<number>(0);

const betRate = computed(() => {
    try {
      if(userLevel.value === 0){
        return (list.value[0].bet_rate / 100).toFixed(2);
      }else {
        return (list.value.filter(e => e.level == userLevel.value)[0].bet_rate / 100).toFixed(2)
      }
    } catch (error) {
        return 0;
    }
})

const rechargeRate = computed(() => {
    try {
      if(userLevel.value === 0){
        return (list.value[0].recharge_rate / 100).toFixed(2);
      }else {
        return (list.value.filter(e => e.level == userLevel.value)[0].recharge_rate / 100).toFixed(2)
      }
    } catch (error) {
        return 0;
    }
})
onLoad(() => {
    '/api/vip/info'.GET<VipInfo>(null, {
        Authorization: async () => await dbGet('token')
    }).then(ret => {
        list.value = ret.vip;
        userLevel.value = ret.user.user_group.level;
    })
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.page {
    background-color: #1F1F1F;
    @include pc {
        background: var(--body-background-color);
    }
}

.name {
    text-align: center;
    @include pc {
        text-align: left;
        // padding-bottom: 24px;
    }
}

.title-tips {
    font-size: 0.75rem;
    font-weight: normal;
    display: flex;
    gap: 0.5rem;
    color: #999;
    margin-top: .2rem;

    span {
        color: #fff;
    }

    @include pc {
        color: #8E90CD;
        font-size: 16px;
        padding-bottom: 24px;
        span {
            color: #8E90CD;
        }
    }
}

.body {
    // margin: 0.63rem;
    // padding: 0.625rem;
    border-radius: 0.1875rem;
    background: #2A2A2A;

    @include pc {
        // margin: 0;
        // padding: 0 36px 24px;
        background: transparent;

        .tab-datas-box {
            border-radius: 8px;
            overflow: hidden;
        }
    }
}
.head div{
  font-size: 0.75rem;
  color: #999;
  font-weight: 900;
}
.data {
    display: flex;
    padding: 0.375rem 0.625rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    color: #fff;
    text-align: center;
    font-size: 0.75rem;

    div {
        flex: 1;
    }

    //&:nth-child(2n) {
    //    background: #545454;
    //}

    &:not(.head) div {
        &:nth-child(2) {
            color: #FFF;
        }
    }

    @include pc {
        height: 60px;
        padding: 0;
        font-size: 14px;
        color: #FFF;
        background: #1D1A41;

        &.head {
            background: #231D4E;
            color: #B2B3BD;
        }

        &:nth-child(2n) {
            background: #181538;
        }

        &:not(.head) div {

            &:nth-child(2),
            &:nth-child(3) {
                color: #FFF;
            }
        }

        // &:hover{
        // 	background-color: #181538;
        // }
    }
}</style>