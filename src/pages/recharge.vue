<template>
  <div>
    <public-loading class="public-loadings" v-if="isLoading"></public-loading>
    <div class="content page-pading" v-else>
      <view class="title">
        <!-- {{ $t("pageRecharge.depositCurrency") }} -->
        <img src="@/assets/new/withdraw-money/pix.png" alt="" />
      </view>

      <view class="currency-type" :max="3" :margin="10">
        <border-gradient class="btn btn-top" v-for="(item, index) in list" @click="changeTypes(index)"
          :class="{ active: listIndex === index }" :show-border="true" :border="listIndex === index ? 1 : 0"
          :border-color="['#009d81']" :bg-color="listIndex === index
              ? '#1f1f1f'
              : undefined
            ">
          <!-- <view :class="'icon-' + item.show_name"></view> -->
          <view class="name">
            <img :src="item.show_icon" alt="">
            <span>{{ item.show_name }}</span>
          </view>
        </border-gradient>
      </view>
      <div class="flex-title-btsns">
        <div>
          <div class="title2">{{ $t("pageRecharge.rechargeAmount") }}</div>
          <div class="code" v-if="list[listIndex] && list[listIndex].self_define == 1">
            <!-- <div class="uits">{{ uits }}</div> -->
            <input class="address" type="text" v-model="money" :placeholder="$t('pageRecharge.placeholder')" />
            <!-- 清除图标 -->
            <view @click="clearInput" class="clear-icon">
              <svg class="icon">
                <use xlink:href="/icon.svg#icon_Close"></use>
              </svg>
            </view>
          </div>

          <!-- <div class="tips" v-if="!isPc">
            <div class="tips-text" v-if="list[listIndex]">
              {{ $t("pageRecharge.tips") }}
              <text
                >{{ uits }}{{ list[listIndex].min_deposit }}~{{ uits
                }}{{ list[listIndex].max_deposit }}</text
              >
            </div>
          </div> -->

          <div class="tips" v-if="isPc">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path opacity="0.5"
                d="M9 12.2V9M9 5.8H9.008M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                stroke="#5B6DA1" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="tips-text" v-if="list[listIndex]">
              {{ $t("pageRecharge.minimum") }}{{ uits
              }}{{ list[listIndex].min_deposit }}
            </div>
          </div>
          <div class="tips" v-if="isPc">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path opacity="0.5"
                d="M9 12.2V9M9 5.8H9.008M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                stroke="#5B6DA1" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="tips-text" v-if="list[listIndex]">
              {{ $t("pageRecharge.maximum") }}{{ uits
              }}{{ list[listIndex].max_deposit }}
            </div>
          </div>
        </div>

        <view class="currency-type" :max="4" :margin="10" v-if="list[listIndex]">
          <div class="btn" v-for="item in list[listIndex].fixed_amount" @click="changeMoney(item)"
            @mouseenter="backs = item" @mouseleave="backs = 0" :class="{
              active:
                item == Number(money) || backs == item ? '#009d81' : undefined,
            }">
            <div class="amountContent">
              <span class="money-sign">{{ unit }}</span>
              <span>{{ item }}</span>
            </div>
            <span class="amountTips" :class="{
              'text-color':
                item == Number(money) || backs == item
                  ? '#009d81'
                  : undefined,
            }">
            </span>
          </div>
        </view>
      </div>

      <div class="submit-btn" style="background: #009d81" :class="{ disabled: submitBtnDisabled || submitLoading }"
        @click="submit(money)">
        <public-loading color="#0FF" v-if="submitLoading"></public-loading>
        <text v-else>{{ $t("pageRecharge.sure") }}</text>
      </div>
      <view class="notice" v-if="list[listIndex] &&
        list[listIndex].extras_config &&
        list[listIndex].extras_config.exchange_rates
        ">
        <text>{{ $t("pageRecharge.notice") }}</text>
        {{ $t("pageRecharge.rate") }} 1 USDT =
        {{ list[listIndex].extras_config.exchange_rates.USD }} {{ unit }}
        <view>
          {{
            $t("pageRecharge.payment_1") +
            (list[listIndex].extras_config.exchange_rates.USD * Number(money) +
              unit) +
            $t("pageRecharge.payment_2")
          }}
        </view>
      </view>

      <div class="star">
      <view class="start-text">
        <text>{{ $t("pageRecharge.starTip") }}</text>
      </view>
      <!-- <img src="../assets/banner.png" /> -->
    </div>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import Page from "../components/page.vue";
import PublicLoading from "../components/public-loading.vue";
import BorderGradient from "../components/border-gradient.vue";

import { ref, computed } from "vue";
import { isPc, isReTips, unit } from "../uilts/async.var";
import { format, randomHabitString } from "../uilts/base";
import { dbGet } from "../uilts/db";
import { t } from "../uilts/i18n";
import { back, clonetabIndex, onLoad, onShow, open } from "../router/routes";
import { alert } from "../uilts/ui";

const backs = ref(0);
const money = ref("");
const list = ref<Array<RechargeListsItme>>([]);
const isLoading = ref(true);
const submitLoading = ref(false);
const listIndex = ref(0);
const openUrl = ref("");
const submitBtnDisabled = computed(() => !/^\d+\.?\d*$/.test(money.value));

const uits = computed(() =>
  list.value[listIndex.value].show_name == "PIX" ? unit.value : "USDT"
);

const changeTypes = (index: number) => {
  money.value = openUrl.value = "";
  listIndex.value = index;
};

const clearInput = () => (money.value = "");

const changeMoney = (value: number) => {
  if (list.value[listIndex.value].self_define == 1) {
    money.value = value.toString();
  } else {
    submit(value);
  }
};
let pro: Promise<RechargeSave["response"]>;
const submit = (value: number | string) => {
  submitLoading.value = true;
  let item = list.value[listIndex.value];
  pro && pro.abort();
  pro = "/api/recharge/save".POST<RechargeSave>(
    {
      channel_id: item.id,
      money: value.toString(),
      sn:
        format(new Date(), "yyyyMMddhhmmss") +
        randomHabitString("0123456789", 6),
    },
    {
      Authorization: async () => await dbGet("token"),
    }
  );
  pro
    .then((ret) => {
      openUrl.value = ret.url;

      if (isPc.value) {
        alert({
          title: t("ui.uniShowModalTitle"),
          content: t("ui.recharge"),
          showCancel: false,
        }).finally(() => {
          back();
        });
      } else {
        isReTips.value = true;
      }
      // #ifdef H5
      try {
        dbGet("kwaiq").then((kwaiqId) => {
          kwaiq.instance(kwaiqId).track("addToCart");
        }).catch(()=>{});
        dataLayer.push({ event: "rechargeClick" });
      } catch (error) { }
      // #endif
      openLink();
    })
    .finally(() => {
      submitLoading.value = false;
    });
};
const openLink = () => {
  if (isPc.value) {
    window.open(openUrl.value);
  } else {
    open("/customer-service", { url: openUrl.value, reg: 1 });
  }
};

onLoad(() => {
  clonetabIndex.value = 1
  
  "/api/recharge/lists"
    .GET<RechargeLists>(null, {
      Authorization: async () => await dbGet("token"),
    })
    .then((lists) => {
      list.value = lists;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

</script>
<style lang="scss" scoped>
@import "../scss/public.scss";

// =======改版样式======

.main {
  padding: 0.44rem 1.18rem;
  background-color: #1f1f1f;
}

.channel-container {
  width: 100%;
  overflow: auto;
  overscroll-behavior: contain;
  -ms-scroll-chaining: contain;
  text-align: center;

  .pay-channel {
    display: flex;
    margin: 0.1rem 0;
    height: 2rem;
    background: pink;

    .channel-item {
      margin-right: 0.06rem;
      width: 0.96rem;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      height: 0.5rem;
      background: transparent;
      border: 0.01px solid #494949;
      border-radius: 0.05rem;
      line-height: 0.28rem;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      color: #868686;
      font-size: 0.1rem;
    }
  }

  .active {
    background: transparent;
    border: 0.01px solid #009d81;
    border-radius: 0.05rem;
  }
}

.page-pading {
  background-color: #1f1f1f;
}

// =======改版样式======

.public-loadings {
  padding: 10rem;
}

.content {

  // padding:0.6250rem;
  @include pc {
    // padding:0 36px;
  }
}

.currency-type {
  padding: 0.625rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 0.62rem;
  grid-row-gap: 0.62rem;
  margin-bottom: 1rem;

  @include pc {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    padding-top: 20px;
    padding-bottom: 36px;
    margin: 0;
  }
}

.money {
  text-align: center;
  font-size: 0.75rem;
  color: #fff;
  padding-top: 0.625rem;
}

.qrCode {
  width: 9.375rem;
  height: 9.375rem;
  margin: 0.625rem auto;
  background-color: #fff;
  border-radius: 0.125rem;
}

.submit-btn {
  @extend %button;
  height: 3.125rem;
  margin: 1.8rem 0;
  border: none;

  @include pc {
    display: flex;
    height: 60px;
    border: none;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: linear-gradient(90deg, #00ffff 0.16%, #ff92ff 99.84%);
  }

  &.disabled {
    filter: brightness(0.5);
    pointer-events: none;
  }
}

.code {
  //   font-size: 0.75rem;
  color: #fff;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //   padding: 0.71875rem 0;
  margin: 0.375rem 0;
  border-radius: 0.125rem;
  border-bottom: 2px solid #201e47;
  position: relative;

  .uits {
    font-size: 0.75rem;
    color: #b5ebff;
    padding-right: 0.38rem;
    white-space: nowrap;
  }

  .clear-icon {
    position: absolute;
    //   top: 50%;
    right: 10px;

    //   transform: translateY(-50%);
    .icon {
      fill: #868686;
      width: 1rem;
      height: 1rem;
    }
  }

  .address {
    // width: 100%;
    cursor: text;
    user-select: text;
    // color: #b5ebff;
    // background-color: #494949;
    // font-size: 1rem;

    font-size: 1rem;
    width: 100%;
    background-color: #494949;
    border-radius: 0.3rem;
    height: 2.6rem;
    color: #868686;
    text-indent: 0.14rem;

    &::-webkit-input-placeholder {
      color: #868686;
    }
  }

  .submit-btn {
    background: #3bc117;
    // width: 3.7500rem;
    padding: 0 0.625rem;
    font-weight: normal;
    height: 1.875rem;
    margin: 0;

    &.disabled {
      pointer-events: none;
      color: #979ead;
      background: #444f59;
    }
  }

  .copy-btn {
    background-color: #24262b;
    padding: 0 0.625rem;
    height: 1.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.125rem;
  }

  @include pc {
    height: 60px;
    margin: 0;
    padding: 0;
    border-radius: 8px;
    // background: #1b1839;
    border: none;

    .uits {
      font-size: 14px;
      color: #8e90cd;
      padding-right: 13px;
      padding-left: 12px;
    }

    .address {
      font-size: 18px;

      &::-webkit-input-placeholder {
        color: rgba(91, 109, 161, 0.65);
      }
    }
  }
}

.notice {
  color: #fff;
  font-size: 0.75rem;
  background-color: rgba(58, 201, 72, 0.1);
  border-radius: 0.125rem;
  padding: 0.625rem;
  margin-top: 0.625rem;

  text {
    color: #3bc117;
    font-weight: 700;
  }
}

.tips {
  display: flex;
  flex-direction: row-reverse;
  color: rgba(153, 164, 176, 0.6);
  padding: 0.625rem 0;
  color: var(--TAB-, #5b6da1);
  font-family: PingFang SC;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  @include pc {
    flex-direction: row;
    padding-top: 20px;
    padding-bottom: 0;
    font-size: 14px;

    &~.tips {
      padding-top: 12px;
    }

    svg {
      width: 16px;
      height: 16px;
      margin-right: 20px;
    }
  }

  text {
    color: #8e90cd;
    font-size: 0.75rem;
    font-weight: 600;

    @include pc {
      font-size: 14px;
    }
  }
}

.select {
  background-color: #17181b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.625rem;
  height: 2.5rem;
  margin-top: 0.625rem;
  border-radius: 0.125rem;
  cursor: pointer;
}

.currency,
.value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgba(153, 164, 176, 0.6);

  .name {
    color: #5b6da1;
    font-size: 0.6875rem;
  }

  [class*="icon-"]+.name {
    padding-left: 0.625rem;
  }

  text {
    color: #fff;
  }
}

.icon {
  width: 0.75rem;
  height: 0.75rem;
  fill: #67707b;
  margin-left: 0.625rem;
}

.star {
  // width: 100%;
  position: relative;
  min-height: 10rem;
  // padding-left: 0.75rem;
  padding: 0.75rem 0.75rem;
  background-image: url(@/assets/banner.png);
  background-repeat: no-repeat;
  background-position: 100% 100%;
  background-size: auto 10rem;
  background-color: #1A1A1A;
  img {
    width: 100%;
    height: 10rem;
  }

  .start-text {
    position: absolute;
  
    display: flex;
    align-items: center;
    top: 20px;
    color: #ffffff;
    width: 70%;
    font-size: 0.75rem;
  }

  @media screen and (min-width: 402px) {
    // position: absolute;
    font-size: 0.75rem;

    .start-text {
      line-height: 1.5rem;
    }
  }

  @media screen and (min-width: 600px) {
    // position: absolute;
    font-size: 0.75rem;

    img {
      width: 100%;
      height: 100%;
    }

    .start-text {
      line-height: 1rem;
      top: 47px;
    }
  }
}

.btn {
  height: 3rem;
  color: #ffffff;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.3rem;
  background: #494949;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  &.btn-top{
    font-size: 0.75rem;height: 2rem;
  }
  &.active {
    background: #009d81;
  }

  .amountContent {
    display: flex;
    align-items: center;

    .money-sign {
      font-style: italic;
    font-size: 1rem;
    margin-right: 0.2rem;
    }

    .icon-unit-brl:before {
      //   content: "\e735";
    }
  }

  .iconImg {
    background: url("../assets/public-page-head/hot.webp") no-repeat;
    background-size: 20rem auto;
  }

  .amountTips {
    font-size: 0.7rem;
    color: #ff9500;

    &.text-color {
      color: #ffffff;
    }
  }

  @include pc {
    border-radius: 2.8rem;
    font-size: 14px;
    height: 54px;
  }

  .name {
    display: flex;
    align-items: center;

    text {
      color: #5b6da1;
      font-size: 0.875rem;
    }
    span{
      display: block;
    }
    img{
      height: 1rem;
      width: auto;
      margin-right: 0.5rem;
    }
  }

  &.active,
  &.active text,
  &:active {
    color: #fff;
  }
}

.title {
  color: #ffffff;

  img{
    width: auto;
    height: 1.51875rem;
  }

  @include pc {
    font-size: 16px;
  }
}

.title2 {
  font-size: 1rem;
  color: #fff;

  @include pc {
    font-size: 16px;
    padding-top: 36px;
    padding-bottom: 20px;
  }
}

[class*="icon-"] {
  width: 1.25rem;
  height: 1.25rem;
  background-size: cover;
}

[class*="icon-"] {
  width: 1.25rem;
  height: 1.25rem;
  background-size: cover;
  border-radius: 1.25rem;
  // background-color: #e98a2c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.625rem;
  margin-left: -0.3125rem;

  &::before {
    content: "$";
    font-size: 0.875rem;
    color: #fff;
  }
}

.flex-title-btsns {
  display: flex;
  flex-direction: column;

  @include pc {
    flex-direction: column-reverse;

    .currency-type {
      padding: 0;
    }
  }
}

$names: "BTC", "BNB", "CRO", "LTC", "SHIB", "SOL", "TRX", "XLM", "XRP", "USDT",
  "ETH", "PIX";

@each $c in $names {

  // $i: index($names, $c);
  .icon-#{$c} {
    background-image: url(@/assets/public-page-head/#{$c}.webp);
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;

    // background-color: #FFFFFF;
    &::before {
      display: none;
    }
  }
}
</style>
