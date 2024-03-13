<template>
  <page :mouse-wheel="true" :show-scrollbar="true">
    <div style="width: 100%;height: 80vh;" :color="'#0FF'" v-if="isLoading">
      <public-loading class="loadings"></public-loading>
    </div>

    <div class="content page-pading" v-else>
      <div class="pcres">
        <div>
          <div class="title">{{ $t("pageWithdrawMoney.currency") }}</div>
          <div class="currency-type">
            <border-gradient class="btn" v-for="item in currency_list" :border="item.currency_code === currency ? 1 : 0" :show-border="item.currency_code === currency" :border-color="['#009d81', '#009d81']"
              :bg-color="item.currency_code === currency
                  ? '#1f1f1f'
                  : undefined
                " :class="{ active: item.currency_code === currency }" @click="changeCurrency(item.currency_code)">
              <div class="name">
                <img :src="item.show_icon" alt="">
                <span>{{ item.currency_code }}</span>
              </div>
            </border-gradient>
          </div>
        </div>

        <div class="pcflex">
          <img class="pc" src="@/assets/new/withdraw-money/icon111.png" />
          <div class="select">
            <div class="currency">
              <div class="name">{{ $t("pageWithdrawMoney.balance") }}</div>
            </div>
            <div class="value">
              <div>
                <text>{{ unit }}{{ balance }}</text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <view class="title">{{
          $t("pageWithdrawMoney.withdrawalAddress")
        }}</view>

        <div class="bank-card" @click="selectBank()" v-if="bankList && bankList[bankIndex]">
          <div class="info-box">
            <div class="info">
              <div>{{ bankList[bankIndex].type }}</div>
              <div v-if="bankList[bankIndex].real_name">{{ bankList[bankIndex].real_name }}</div>
              <div v-if="bankList[bankIndex].bank_code">{{ bankList[bankIndex].bank_code }}</div>
              <div v-if="bankList[bankIndex].bank_name">{{ bankList[bankIndex].bank_name }}</div>
            </div>
            <div class="numbers">
              {{ hiddenNumbers(bankList[bankIndex].bank_account) }}
            </div>
          </div>
          <div class="btns">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M23.1654 18.6444C23.5178 18.2879 23.5178 17.712 23.1654 17.3546L14.8009 8.88631C14.2921 8.37058 13.4643 8.37058 12.9547 8.88631C12.4459 9.40203 12.4459 10.239 12.9547 10.7548L20.11 17.9999L12.9547 25.2433C12.4459 25.7599 12.4459 26.5969 12.9547 27.1127C13.4643 27.6284 14.2921 27.6284 14.8009 27.1127L23.1654 18.6444Z"
                fill="#ffffff" />
            </svg>
          </div>
        </div>

        <div class="bank-card" v-else @click="selectBank()">
          <div>
            <div class="info">
              <div>{{ $t("pageWithdrawMoney.withdrawalAddresstips") }}</div>
            </div>
          </div>
          <div class="btns">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M23.1654 18.6444C23.5178 18.2879 23.5178 17.712 23.1654 17.3546L14.8009 8.88631C14.2921 8.37058 13.4643 8.37058 12.9547 8.88631C12.4459 9.40203 12.4459 10.239 12.9547 10.7548L20.11 17.9999L12.9547 25.2433C12.4459 25.7599 12.4459 26.5969 12.9547 27.1127C13.4643 27.6284 14.2921 27.6284 14.8009 27.1127L23.1654 18.6444Z"
                fill="#ffffff" />
            </svg>
          </div>
        </div>

        <view class="title2">{{
          $t("pageWithdrawMoney.withdrawalAmount")
        }}</view>
        <view class="code2">
          <div class="uits">{{ unit }}</div>
          <input class="address" type="number" maxlength="10" v-model="money"
            :placeholder="$t('pageWithdrawMoney.placeholderMoney')" />
        </view>

        <view class="notice-tips">
          <view class="tips-text">
            {{ $t("pageWithdrawMoney.withdrawalAmount") }}
            <text>{{ unit }}{{ money || '0' }}</text>
          </view>
          <view class="tips-text" v-if="networkTypes[networkTypesIndex]">
            {{ $t("pageWithdrawMoney.fee") }} <text> {{ config.withdraw_fee_proportion }}% </text>
          </view>
          <view class="tips-text">
            {{ $t("pageWithdrawMoney.total") }}
            <text>{{ unit }}{{ lumpSum }}</text>
          </view>
        </view>
        <view class="btn-submint btn-loading" v-if="submintLoading">
          <public-loading color="#0FF"></public-loading>
        </view>
        <view style="background: #009d81" v-else class="btn-submint" :class="{
          disabled: !(bankIndex >= 0 && money),
        }" @click="submint()">{{ $t("pageWithdrawMoney.ljtk") }}</view>
      </div>
      <div class="star">
        <view class="star-text">

          <view class="notice" v-if="networkTypes[networkTypesIndex]">
            <text class="text">{{ $t("pageWithdrawMoney.notice") }}</text>
            <text>{{
              $t("pageWithdrawMoney.onlySend_1") +
              (moneyUnit +
                " = " +
                Number(networkTypes[networkTypesIndex].rate) +
                " " +
                unit) +
              $t("pageWithdrawMoney.onlySend_2") +
              (showAllMoney + " " + moneyUnit) +
              $t("pageWithdrawMoney.onlySend_3")
            }}</text>
          </view>
        </view>
        <img src="../assets/banner.png" />
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import Page from "../components/page.vue";
import BorderGradient from "../components/border-gradient.vue";
import PublicLoading from "../components/public-loading.vue";
import UiBankSheet from "../components/ui-bank-sheet.vue";
import UiModal2 from "../components/ui-modal2.vue";

import { ref, computed, h } from "vue";
import { dbGet } from "../uilts/db";
import { hint, alert, showActionSheet } from "../uilts/ui";
import { unit, balance, restMoney, isPc, config } from "../uilts/async.var";
import { back, onLoad, onShow, open } from "../router/routes";
import { t } from "../uilts/i18n";
import success from "@/assets/new/withdraw-money/success.png";
import fail from "@/assets/new/withdraw-money/fail.png";
import { hiddenNumbers } from "../uilts/base";

const network = ref<string>("");
const currency = ref<string>("");
const networkTypes = ref<Array<WithdrawalConfigItme>>([]);
const networkTypesIndex = ref<number>(0);
const isLoading = ref<boolean>(true);
const submintLoading = ref<boolean>(false);
const currency_list = ref<CurrencyList["response"]>([]);
const moneyUnit = computed(() => {
  return currency.value === "1" ? "USDT" : "R$";
});
const money = ref<string>("");
const bankList = ref<Array<Bank>>([]);
const lumpSum = computed(() => {
  let m = Number(money.value);
  return Number(Math.trunc(m * (100 - Number(config.value.withdraw_fee_proportion)) / 100 * 10) / 10);
});
const showAllMoney = computed(() => {
  return Number(
    (lumpSum.value / networkTypes.value[networkTypesIndex.value].rate).toFixed(
      6
    )
  );
});
const bankIndex = ref(-1);

const selectNetwork = () => {
  let arr = networkTypes.value.map((e) => e.type);
  showActionSheet(arr).then((e) => {
    networkTypesIndex.value = e.tapIndex;
    network.value = arr[e.tapIndex];
  });
};
const selectBank = () => {
  showActionSheet(bankList.value, UiBankSheet, {
    title: t("pageWithdrawMoney.withdrawalAddressSelect"),
    selectedIndex: bankIndex.value,
    submintBtn: t("pageBankCard.submintBtn"),
    submintFn: () => open("/add-bank-card", {}),
  }).then((ret) => {
    bankIndex.value = ret.tapIndex;
  });
};
// type : '1' | '2'
const changeCurrency = (type: string) => {
  currency.value = type;
  getConfig();
};
let qq: Promise<any>;
const getConfig = () => {
  isLoading.value = true;
  qq && qq.abort();
  qq = "/api/withdrawal/config".GET<WithdrawalConfig>(
    {
      currency_code: currency.value,
    },
    {
      Authorization: async () => await dbGet("token"),
    }
  );
  qq.then((config) => {
    networkTypes.value = config;
    if (config.length) {
      network.value = config[0].type;
      networkTypesIndex.value = 0;
    }
  }).finally(() => {
    isLoading.value = false;
  });
};
const submint = () => {
  // if (!account.value) {
  // 	return hint(t('pageWithdrawMoney.enterAccount'))
  // }
  // if (!account_number.value) {
  // 	return hint(t('pageWithdrawMoney.placeholderAddress'))
  // }

  if (bankIndex.value < 0) {
    return hint(t("pageWithdrawMoney.enterAccount"));
  }

  if (!money.value) {
    return hint(t("pageWithdrawMoney.placeholderMoney"));
  }
  // #ifdef H5
  try {
    dbGet("kwaiq").then((kwaiqId) => {
      kwaiq.instance(kwaiqId).track("addPaymentInfo");
    });
    dataLayer.push({ event: "withdrawClick" });
  } catch (error) { }
  // #endif
  submintLoading.value = true;
  "/api/withdrawal/apply"
    .POST<withdrawalApply>(
      {
        // currency_code: currency.value,
        // type: networkTypes.value[networkTypesIndex.value].type,
        // money: money.value,
        // account: account.value,
        // account_number: account_number.value,
        // real_money: lumpSum.value,

        currency_code: bankList.value[bankIndex.value].bank_code,
        type: bankList.value[bankIndex.value].type,
        money: money.value,
        account: bankList.value[bankIndex.value].real_name,
        account_number: bankList.value[bankIndex.value].bank_account,
        real_money: lumpSum.value,
      },
      {
        Authorization: async () => await dbGet("token"),
      }
    )
    .then(() => {
      restMoney.value = !restMoney.value
      alert(
        {
          title: () => {
            return [
              h("img", {
                src: success,
                style:
                  "width:5.0625rem;height: 4.375rem;margin-top:1.8rem;margin-bottom:0.5rem;",
              }),
            ];
          },
          content: t("ui.withdrawMoney"),
          showCancel: false,
        },
        UiModal2
      ).then((_e) => {
        back();
      });
    })
    .catch((_err) => {
      alert(
        {
          title: () => {
            return [
              h("img", {
                src: fail,
                style:
                  "width:4.375rem;height: 4.375rem;margin-top:1.8rem;margin-bottom:0.5rem;",
              }),
            ];
          },
          content: t("ui.withdrawMoneyFail"),
          showCancel: false,
        },
        UiModal2
      ).then((_e) => {
        back();
      });
    })
    .finally(() => {
      submintLoading.value = false;
      restMoney.value = !restMoney.value;
    });
};
const init = () => {
  money.value = ''
  "/api/withdrawal/currency"
    .GET<CurrencyList>(null, {
      Authorization: async () => await dbGet("token"),
    })
    .then((ret) => {
      if (ret.length) {
        currency.value = ret[0].currency_code;
        currency_list.value = ret;
        getConfig();
      }
    });

  "/api/user/banks"
    .GET<Banks>(null, {
      Authorization: async () => await dbGet("token"),
    })
    .then((ret) => {
      bankList.value = ret;
      let i = 0;
      for (let item of ret) {
        if (item.is_default) {
          bankIndex.value = i;
          break;
        }
        i++;
      }
    });
}
onLoad(() => {
  init()
});
onShow(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.page-pading {
  background-color: #1f1f1f;
}

.content {
  // padding: 0.6250rem;

  @include pc {

    // padding: 0 36px 36px;
    .pcres {
      display: flex;
      flex-direction: column-reverse;
    }

    .pcflex {
      display: flex;
      align-items: center;
      border-radius: 8px;
      border: 1px solid #302b59;
      padding: 20px;
      margin-bottom: 64px;

      img {
        width: 44px;
        height: 36px;
        margin-right: 12px;
      }
    }
  }
}

.currency-type {
  display: grid;
  padding: 0.625rem 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 0.62rem;
  grid-row-gap: 0.62rem;
  margin-bottom: 1rem;

  @include pc {
    padding: 0;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    margin-top: 20px;
    margin-bottom: 36px;
  }
}

.loadings {
  margin-top: 0%;
}

.btn-submint {
  @extend %button;
  height: 3.125rem;
  margin: 1.8rem 0;

  &.disabled {
    @extend %button-disabled;
  }

  @include pc {
    border: none;
    border-radius: 8px;
    font-size: 18px;
    background: linear-gradient(90deg, #0ff 0.16%, #ff92ff 99.84%);

    &.disabled {
      font-size: 18px;
      border-radius: 8px;
      background: linear-gradient(90deg, #0ff 0.16%, #ff92ff 99.84%);
      filter: brightness(0.5);
    }
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

.code2 {
  font-size: 0.75rem;
  color: #fff;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.71875rem 0;
  margin: 0.375rem 0;
  border-radius: 0.5rem;
  border-bottom: 2px solid #201e47;
  background: #494949;

  .uits {
    font-size: 0.75rem;
    // color: #B5EBFF;
    color: #ffffff;
    padding-right: 0.38rem;
    white-space: nowrap;
  }

  .address {
    width: 100%;
    cursor: text;
    user-select: text;
    height: 1.2rem;
    // color: #B5EBFF;
    color: #ffffff;
    font-size: 0.75rem;

    &::-webkit-input-placeholder {
      color: #ffffff;
    }
  }

  @include pc {
    border-radius: 8px;
    background: #1b1839;
    padding: 0 12px;
    height: 60px;
    border: none;
    margin: 20px 0;

    .uits {
      font-size: 14px;
      color: #b5ebff;
      padding-right: 13px;
    }

    .address {
      height: auto;
      font-size: 18px;
    }
  }
}

.code {
  background-color: #231d4e;
  font-size: 0.875rem;
  color: #fff;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem;
  margin: 0.625rem 0;
  border-radius: 0.125rem;

  .address {
    width: 15.625rem;
    cursor: text;
    user-select: text;
    font-size: 1rem;
    height: 1.2rem;
    color: #b5ebff;

    &::-webkit-input-placeholder {
      color: #5b6da1;
    }
  }

  textarea.address {
    width: 100%;
    height: 3.125rem;
  }

  .copy-btn {
    background-color: #24262b;
    // width:3.7500rem;
    padding: 0 0.625rem;
    height: 1.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.125rem;
  }
}

.notice-tips {
  border-radius: 0.5rem;
  background: #494949;
  padding: 0 0.625rem;
  display: flex;
  height: 6.15rem;
  flex-direction: column;
  justify-content: space-evenly;

  .tips-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    // color:#5B6DA1;
    color: #ffffff;
    align-items: center;

    text {
      font-size: 0.875rem;
    }
  }

  @include pc {
    border-radius: 8px;
    border: 1px solid #302b59;
    background: transparent;
    height: 124px;
    margin-bottom: 64px;

    .tips-text {
      font-size: 14px;
    }
  }
}

.star {
  padding: 0.75rem;
  display: flex;
  background-color: #1A1A1A;

  img {
    width: auto;
    height: 10rem;

  }

  .star-text {
    position: relative;
    width: 62%;

    //  top: 23px;
    .notice {
      position: absolute;
      color: #c7c7c7;
      font-size: 0.75rem;
      padding-bottom: 1rem;
      //  line-height: 2rem;

      .text {
        display: block;
      }

      .text::before {
        content: "*";
        color: #ff007a;
      }

      @include pc {
        font-size: 14px;
        padding-bottom: 0;
      }
    }
  }
}

.tips {
  display: flex;
  flex-direction: row-reverse;
  color: rgba(153, 164, 176, 0.6);
  padding: 0.625rem;
  // color: var(--TAB-, #5B6DA1);
  color: #ffffff;
  font-family: PingFang SC;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  @include pc {
    flex-direction: row;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 14px;

    &~.tips {
      padding-top: 12px;
      padding-bottom: 64px;
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
  background-color: #494949;
  display: flex;
  height: 1.2rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.625rem;
  border-radius: 0.5rem;
  padding: 0.71875rem 0.625rem;
  cursor: pointer;
  margin-bottom: 1.3rem;

  @include pc {
    flex-direction: column;
    margin: 0;
    padding: 0;
    background: transparent;
    align-items: flex-start;
  }
}

.currency,
.value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #ffffff;

  .name {
    font-size: 0.875rem;
    color: #ffffff;
  }

  [class*="icon-"]+.name {
    padding-left: 0.625rem;
  }

  text {
    // color: #B5EBFF;
    color: #ffffff;
  }

  @include pc {
    font-size: 14px;

    .name {
      font-size: 14px;
    }
  }
}

@include pc {
  .currency {
    padding-bottom: 6px;
  }

  .value {
    font-size: 20px;
  }
}

.icon {
  width: 0.75rem;
  height: 0.75rem;
  fill: #67707b;
  margin-left: 0.625rem;
}

.btn {
  width: 6.875rem;
  height: 2.8rem;
  color: #8e90cd;
  text-align: center;
  font-size: 0.6875rem;
  font-weight: 500;
  border-radius: 0.5rem;
 
 
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

  @include pc {
    font-size: 18px;
    border-radius: 40px;
    height: 54px;
    width: 138px;
  }
}

.title {
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 400;

  @include pc {
    font-size: 16px;
  }
}

.title2 {
  font-size: 0.75rem;
  // color: #5B6DA1;
  color: #ffffff;

  @include pc {
    font-size: 16px;
  }
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
  // margin-right: 0.6250rem;
  // margin-left: -0.3125rem;

  &::before {
    content: "$";
    font-size: 0.875rem;
    color: #fff;
  }
}

$names: "BTC", "BNB", "CRO", "LTC", "SHIB", "SOL", "TRX", "XLM", "XRP", "USDT",
  "ETH", "PIX", "BRL";

@each $c in $names {

  // $i: index($names, $c);
  .icon-#{$c} {
    background-image: url(@/assets/public-page-head/#{$c}.webp);
    background-size: 80%;
    background-position: center;
    background-repeat: no-repeat;

    &::before {
      display: none;
    }
  }
}

.bank-card {
  padding: 1rem;
  border-radius: 0.5rem;
  background: #494949;
  font-size: 0.75rem;
  display: flex;
  height: 0.9rem;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  margin-bottom: 0.75rem;
  margin-top: 0.625rem;

  .info-box {
    width: 70%;
    
  }

  .info {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    padding-bottom: 0.25rem;
    div {
            margin-right: 2.5rem;
        }
  }

  .numbers {
    color: #ffffff;
    text-shadow: 0px 1px 0px #000;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    .icon-btn {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  @include pc {
    margin-top: 20px;
    padding: 25px;
    border-radius: 8px;
    font-size: 18px;
    margin-bottom: 16px;
    cursor: pointer;

    .info {
      padding-bottom: 8px;
    }

    .numbers {
      font-size: 32px;
    }

    .btns {
      gap: 0;

      .icon-btn {
        width: 60px;
        height: 60px;
      }

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
