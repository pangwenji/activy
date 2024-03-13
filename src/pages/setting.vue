<template>
  <div class="body">
    <div class="head-top">
      <div class="user-top-view" @click="open('/member-gen')">
        <!-- <user-top @click="open('/member-avatar')"></user-top>
				<view class="edit-bottom -btn" @click="open('/member-avatar')">
					<public-svg class="icon" icon="icon_Edit"></public-svg>
				</view> -->
        <div class="head-img">
          <border-gradient class="head-img-btn" :border-color="['#FF92FF', '#00FFFF']" :border="2">
            <public-image :src="userInfo.portrait || ''"></public-image>
          </border-gradient>
        </div>
        <div class="user-content">
          <div class="user-name-card">
            <div class="user-name ellipsis">
              {{ userInfo.user_nick ? userInfo.user_nick : userInfo.username || '' }}
            </div>
            <div class="user-vip">
              <img src="@/assets/new/user/icon-vip.png" alt="" />
              <span>VIP{{ userInfo.level || 0 }}</span>
            </div>
          </div>
          <div class="user-id"><span>ID: </span>{{ userInfo.id || 0 }}</div>
        </div>

        <i class="iconfont icon-to to-c-pas" />

        <!-- <i class="icon icon-right to-c-pas" /> -->
        <!-- <border-gradient
          class="user-top-edit-btn ellipsis"
          :border="1"
          :border-color="['#FF92FF', '#00FFFF']"
          @click="open('/member-avatar')"
        >
          {{ t("pageSetting.edit") }}
        </border-gradient> -->
      </div>

      <div class="user-bottom-view">
        <div class="balance-box">
          <!-- <div class="balance-icon">
            <i class="iconfont icon-wallet" />
          </div> -->

          <div class="balance-money">
            <div>{{ t("pageSignRecord.balance") }}</div>
            <div>
              <span>{{ unit }}</span>
              <span>{{ balance }}</span>
            </div>
          </div>
        </div>

        <div class="bonus-box">
          <div>{{ t("pageRecommend.bonus") }}</div>
          <div>
            <span>{{ unit }}</span>
            <span>{{ totalGift }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page-k">
      <div class="mid-box">
        <div @click="open('/recharge')">{{ $t("pageDeposit.recharge") }}</div>

        <div @click="open('/withdraw-money')">
          {{ $t("pageDeposit.withdrawMoney") }}
        </div>
      </div>

      <div class="item details" @click="open('/member-asset')">
        <span >{{ $t("pageSettingInfo.detalhes") }}</span>
        <i class="iconfont icon-to to-right" />
      </div>

      <div class="item border" @click="open('/member-record')">
        <span>{{ $t("pageSettingInfo.personalData") }}</span>
        <i class="iconfont icon-to to-right" />
      </div>

      <div class="item border" @click="open('/member-gen')">
        <span>{{ $t("memberGen") }}</span>
        <i class="iconfont icon-to to-right" />
      </div>

      <div class="item border" :class="{ 'red': isNotice }" @click="open('/notice')">
        <span>{{ $t("pageSettingInfo.msgItem") }}</span>
        <i class="iconfont icon-to to-right" />
      </div>

      <div class="item" @click="open('/phone')">
        <span>{{ $t("pageSettingInfo.app") }}</span>
        <i class="iconfont icon-to to-right" />
      </div>

      <!-- <border-gradient
        class="out-btn"
        :border="1"
        :border-color="['#FF92FF', '#00FFFF']"
        @click="outLogin"
      >
        <span>{{ t("pageSetting.out") }}</span>
      </border-gradient> -->

      <div class="star">
        <img :src="profileImg" alt="" />
      </div>

      <div class="logout">
        <span @click="outLogin">{{ $t("pageSetting.out") }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BorderGradient from "../components/border-gradient.vue";
import { reactive, ref, onUnmounted, watch } from "vue";
import { back, onlyOpen, open, onLoad, onShow, clonetabIndex } from "../router/routes";
import { t } from "../uilts/i18n";
import { alert } from "../uilts/ui";
import {
  dbDelete,
  dbGet,
  addListener,
  removeListener
} from "../uilts/db";
import { balance, restMoney, unit } from "../uilts/async.var";
import profileImg from "@/assets/setting/profile_star.png";
// import { isAndroid, isIOS, isPc, isPrompt } from "../uilts/async.var";
// import { addToHomeScreen, downStatistics } from "../uilts/base";
import userPortrait from '@/assets/new/user/user.png'
import PublicImage from "../components/public-image.vue"
import { soketData } from "../uilts/socket";

// import { restSocket } from '@/uilts/socket';
const userInfo = reactive({
  level: '',
  user_nick: '',
  username: '',
  id: '',
  portrait: ''
})

const outLogin = () => {
  alert({
    content: t("pageSettingInfo.outLoginTips"),
    showCancel: true,
  }).then(async () => {
    "/api/public/logout".POST<Logout>(null, {
      Authorization: async () => await dbGet("token"),
    });
    // #ifdef H5
    try {
      dbGet("kwaiq").then((kwaiqId) => {
        kwaiq.instance(kwaiqId).track("initiatedCheckout");
      });
      dataLayer.push({ event: "logout" });
    } catch (error) { }
    // #endif
    await dbDelete("user");
    await dbDelete("token");
    // await switchTab(0)
    await back(-1);
    await onlyOpen("/login");
  });
};

const totalGift = ref("0.00");

// const clickDownload = () => {
//   if (isPrompt.value) {
//     addToHomeScreen();
//   } else if (isAndroid.value || isPc.value) {
//     downStatistics();
//   } else if (isIOS.value) {
//     open("/phone");
//   }
// };



const setUser = (type: any, ret: any) => {
  if (type === 'set') {
    userInfo.level = ret.level;
    userInfo.user_nick = ret.user_nick;
    userInfo.username = ret.username;
    userInfo.id = ret.id;
    userInfo.portrait = ret.portrait || userPortrait;
  }
}

const init = () => {
  "/api/activity/getActivityList"
    .GET<GetActivityList>(null, {
      Authorization: async () => await dbGet("token"),
    })
    .then((ret) => {
      totalGift.value = ret.total_activity_bonus + "";
    });
}
const isNotice = ref(true)
watch(soketData, (_o, n) => {
	isNotice.value = n.get_system_notice
})

onUnmounted(() => {
  removeListener("user", setUser);
});

onLoad(() => {
  clonetabIndex.value = 3
  // open("/customer-service", { url: 'http://www.baidu.com', reg: 1 });
  // console.log(clonetabIndex.value );
  restMoney.value = !restMoney.value
  isNotice.value = soketData.get_system_notice
  init();
  dbGet('user').then(ret => setUser('set', ret));
  addListener('user', setUser)
})

onShow(() => {
  init();
  restMoney.value = !restMoney.value
  dbGet('user').then(ret => setUser('set', ret));
  addListener('user', setUser)
})


</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.red {
  &::after {
			content: '';
			display: block;
			width: 0.6250rem;
			height: 0.6250rem;
			position: absolute;
			right: 1rem;
			top: 50%;
      transform: translateY(-50%);
			background-color: #FF0000;
			border-radius: 100%;
	}
}

.page-k {
  position: relative;
  font-size: 0.87rem;
  color: #fff;
  padding-top: 1.1rem;
}

.meun-card-k {
  padding: 0.625rem 0;
}

.out-btn {
  // display: flex;
  // align-items: center;
  padding: 0.625rem;
  color: #ffffff;
  text-align: center;
  /* 按钮 */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 900;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin-top: 6.38rem;
  width: 100%;
}

.content-page {
  background-color: #17181b;
  padding: 0 0.625rem;
  min-height: 100%;
}

.head-top {
  position: relative;
  height: 7rem;
  // background-image: url(@/assets/new/member/bg.png);
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  background: linear-gradient(180deg, #fcde26, #fdbd05);

  padding: 0.625rem 1.1rem;
  padding-top: calc(0.625rem + constant(safe-area-inset-top));
  padding-top: calc(0.625rem + env(safe-area-inset-top));
}

.content {
  /* #ifdef APP */
  padding: 1.25rem 0.625rem 0.625rem 0.625rem;
  /* #endif */
}

.user-top-view {
  position: relative;
  //   padding: 1.25rem;
  display: flex;
  align-items: center;
  padding-bottom: 0.69rem;
  border-bottom: 0.08rem dotted #d9a801;
  cursor: pointer;

  .head-img {
    width: 2.3rem;
    height: 2.3rem;

    .head-img-btn {
      border-radius: 50%;
    }

  }

  .user-content {
    // padding: 0 0.625rem;
    margin-left: 0.63rem;

    .user-name-card {
      display: flex;
      align-items: center;

      .user-name {
        font-size: 0.9rem;
        color: #000;
        line-height: 1;
        // color: #ffb800;
        // max-width: 6rem;
        // font-family: Montserrat;
        // font-size: 1.3125rem;
        // font-style: normal;
        // font-weight: 600;
        // line-height: normal;
        // padding-right: 0.375rem;
      }

      .user-vip {
        display: flex;
        align-items: center;
        color: #FF6B00;
        font-family: PingFang SC;
        font-size: 0.6563rem;
        font-style: normal;
        font-weight: 400;
        border-radius: 0.5625rem;
        background: rgba(0, 255, 255, 0.1);
        padding: 0.1875rem;

        // line-height: 24px;
        /* 114.286% */
        img {
          width: 0.8438rem;
          height: 0.8438rem;
        }
      }
    }

    .user-id {
      font-size: 0.8rem;
      line-height: 1;
      color: #000;
      //   padding-top: 0.625rem;

      //   span {
      //     color: var(--TAB-, #5b6da1);
      //     font-family: PingFang SC;
      //     font-size: 0.875rem;
      //     font-style: normal;
      //     font-weight: 400;
      //     line-height: normal;
      //   }

      //   color: var(--MENU, #8e90cd);
      //   font-family: PingFang SC;
      //   font-size: 0.875rem;
      //   font-style: normal;
      //   font-weight: 400;
      //   line-height: normal;
    }
  }

  .user-top-edit-btn {
    width: 4.25rem;
    height: 1.6875rem;
    border-radius: 0.5rem;
    color: #ffffff;
    font-size: 0.875rem;
  }
}

.edit-bottom {
  position: absolute;
  top: 0;
  right: 0;
  width: 2.1875rem;
  height: 2.1875rem;
  border-radius: 0.1563rem;
  text-align: center;
  background-color: #1e2024;

  .icon {
    margin-top: 0.7813rem;
  }
}

.icon {
  width: 0.9375rem;
  height: 0.9375rem;
  fill: #9ba6b3;
}

.meun-view {
  // width: 21.8750rem;
  border-radius: 0.1087rem;
  background-color: #1e2024;
  // margin: 1.2500rem 0.7813rem 0;
  margin-bottom: 1.25rem;
}

.public-meun-team {
  // border-bottom: 1px solid #2d3034;

  &:last-child {
    border: none;
  }
}

.vip-meun-view {
  // width: 21.8750rem;
  background-color: #1e2024;
  border-radius: 0.1087rem;
  margin: 0.8438rem 0.7813rem 0;

  .scroll-view_H {
    white-space: nowrap;
    width: calc(100% - 1.5625rem);
    margin: 0 0.7813rem;

    img {
      width: 2.0313rem;
      height: 2.875rem;
    }
  }
}

.meun-curto-card {
  display: flex;
  justify-content: space-between;
  margin: 1.25rem 0;

  view {
    display: flex;
    width: calc(50% - 0.3125rem);
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 2.6063rem;
    line-height: 2.6063rem;
    background-image: linear-gradient(to bottom, #2f2c61, #312e63, #4741a3);
    border-radius: 0.1087rem;
    transform: skew(-5deg);
    border-radius: 0.5rem;

    img {
      transform: skew(5deg);
    }

    span {
      display: block;
      color: var(--MENU, #8e90cd);
      text-shadow: 0px 1.367px 0px #000;
      /* PingFang/Medium 28 */
      font-family: PingFang SC;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      transform: skew(5deg);
      padding-left: 0.3125rem;
      /* 142.857% */
    }
  }

  img {
    width: 1.125rem;
    height: 1.125rem;
  }
}

@media (min-width: 9999px) {
  .public-meun-team {
    border-bottom: none;
  }

  .meun-view {
    margin: 0;
  }

  page {
    background: var(--body-background-color) !important;
    padding: 0 0.625rem;
  }
}

.user-bottom-view {
  display: flex;
  font-size: 0.75rem;
}

.to-c-pas {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%) rotate(180deg);
  width: 1rem;
  height: 1rem;
}

.balance-box {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.44rem;
  border-right: 0.08rem dotted #d9a801;

  .balance-icon {
    margin: 0 0.5rem;

    i {
      font-size: 1.15rem;
    }

    // .icon {
    //   width: 1.15rem;
    //   height: 1.15rem;
    //   fill: #000;
    // }
  }

  .balance-money {
    text-align: center;

    >div:nth-of-type(2) {
      font-size: 0.88rem;
    }
  }
}

.bonus-box {
  margin-top: 0.44rem;
  margin-left: 2.65rem;
  text-align: center;

  >div:nth-of-type(2) {
    font-size: 0.88rem;
  }
}

.body {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Helvetica,
    Segoe UI, Arial, Roboto, PingFang SC, miui, Hiragino Sans GB,
    Microsoft Yahei, sans-serif;
  padding-bottom: 3rem;
}

.mid-box {
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 1.12rem;
  transform: translateY(-50%);
  box-sizing: border-box;
  z-index: var(--I2);
  >div {
    width: 10.16rem;
    height: 2.75rem;
    line-height: 2.75rem;
    background-color: #009d81;
    color: #fff;
    text-align: center;
    border-radius: 0.25rem;
    cursor: pointer;
  }
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.18rem;
  margin: 0 1.12rem;
  position: relative;
  cursor: pointer;

  &.details {
    border-bottom: 0.5rem solid var(--body-background-color);
    margin: 0;
    padding: 0 1.12rem 0;
  }

  &.border {
    border-bottom: 0.08rem solid #3f3f3f;
  }

  .to-right {
    font-size: 1rem;
    transform: rotate(180deg);
  }
}

.star {
  margin-top: 1.25rem;

  img {
    display: block;
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

.body {
  min-height: 100vh;
  background-color: #1f1f1f;
}

.logout {
  margin-top: 0.6rem;
  text-align: center;
  line-height: 2.12rem;

  span {
    cursor: pointer;
  }
}</style>
