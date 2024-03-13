<template>
  <div v-if="isLeft" class="is-left-mask" @click="setLeft" />
  <page :show-header="false" :show-scrollbar="true" :mouse-wheel="true" class="back-pc" :content-style="{
    height: '100%',
  }">
    <template #header />
    <view class="content" :class="{'p-top': downloadBtnShow}">
      <div>
        <PublicSvg icon="icon_Close" class="close-icon" @click="setLeft" />
      </div>

      <div class="meun-card-k">
        <div class="btn-box">
          <div class="btn btnActive" @click="changeUrl('/casino')">
            <publicSvg icon="hall_dc" class="pre-icon" />
            <span>{{ $t("hallPage.dc") }}</span>
          </div>
          <div class="btn" @click="changeUrl('/vip')">
            <publicSvg icon="hall_vip" class="pre-icon" />
            <span>{{ $t("hallPage.vip") }}</span>
          </div>
        </div>

        <div class="menu-list">
          <div class="menu-item" @click="changeUrl('/seven-sign')">
            <publicSvg icon="hall_qd" class="pre-icon" />
            <span>{{ $t("hallPage.qd") }}</span>
          </div>

          <div class="menu-item" @click="changeUrl('/money-is-like-rain')" v-if="moneyRainOpen">
            <publicSvg icon="hall_money" class="pre-icon" />
            <span>{{ $t("pageMoneyIsLikeRain.bigTitle") }}</span>
          </div>

          <div class="menu-item" :class="{active: route.path.includes('/agent')}" @click="changeUrl('/agent')">
            <img src="@/assets/new/hall/svg/1.png" class="pre-icon" alt="">
            <span>{{ $t("menu.promotion") }}</span>
          </div>

          <div class="menu-item" @click="handleFree">
            <img src="@/assets/new/hall/svg/2.png" class="pre-icon" alt="">
            <span>{{ $t("menu.free") }}</span>
          </div>

          <div class="menu-item" @click="changeUrl('/cash-back-on-losses')">
            <img src="@/assets/new/hall/svg/3.png" class="pre-icon" alt="">
            <span>{{ $t("menu.loss") }}</span>
          </div>

          <div class="menu-item" @click="changeUrl('/activity')">
            <publicSvg icon="hall_activity" class="pre-icon" />
            <span>{{ $t("activity") }}</span>
          </div>

          <div class="menu-item" @click="downloadApp">
            <publicSvg icon="hall_download" class="pre-icon" />
            <span>{{ $t("components.public-page-head.download-btn") }}</span>
          </div>

          <!-- <div class="menu-item" @click="changeUrl('/share')">
            <publicSvg icon="hall_share" class="pre-icon" />
            <span>{{ $t("hallPage.share") }}</span>
          </div> -->
        </div>

        <div class="menu-btn">
          <div class="menu-item" @click="changeUrl('/washing')">
            <publicSvg icon="hall_back" class="pre-icon" />
            <span>{{ $t("hallPage.fs") }}</span>
            <PublicSvg icon="icon_Arrow" class="to-right" />
          </div>

          <div class="menu-item" @click="changeUrl('/coffer-pass', {})">
            <publicSvg icon="hall_box" class="pre-icon" />
            <span>{{ $t("hallPage.bxx") }}</span>
            <PublicSvg icon="icon_Arrow" class="to-right" />
          </div>
        </div>

        <div class="menu-list">
          <!-- <div class="menu-item bottom" @click="changeUrl('/collect')">
            <img :src="sc" alt="" class="pre-icon" />
            <span>{{ $t("hallPage.sc") }}</span>
          </div> -->

          <div class="menu-item bottom" @click="changeUrl('/history')">
            <publicSvg icon="hall_last" class="pre-icon" />
            <span>{{ $t("hallPage.zj") }}</span>
          </div>

          <div class="menu-item bottom"  @click="changeUrl('/message')">
            <span
						class="red" v-if="soketData.new_user_message > 0">{{ Math.min(99, soketData.new_user_message) }}</span>
            <publicSvg icon="hall_comm" class="pre-icon" />
            <span>{{ $t("hallPage.lyb") }}</span>
          </div>
        </div>

        <div class="bottom-img">
          <img src="@/assets/setting/profile_star.png" alt="" />
        </div>
      </div>
    </view>
  </page>
</template>

<script setup lang="ts">

import PublicSvg from "../components/public-svg.vue";
import Page from "../components/page.vue";
import { ref, onUnmounted, onMounted, watch } from "vue";
import { dbGet } from "../uilts/db";
import { open, changeWindow } from "../router/routes";
import {
  androidUrl,
  iosUrl,
  isAndroid,
  isCollectApi,
  isLeft,
  isPrompt,
  unit,
  isLogin,
  downloadBtnShow,
  moneyRainOpen
} from "../uilts/async.var";
import { addToHomeScreen } from "../uilts/base";
import { useRoute } from "vue-router";
import publicSvg from "../components/public-svg.vue";
import { soketData } from "../uilts/socket";

const isShowGame = ref(false);

const gameNum = ref<GetUserPageCount["response"]>();

const route = useRoute();

const btnActive = ref(route.path.includes("/vip") ? 1 : 0);

const changeUrl = (url: any, data?: any) => {
  setLeft();
  if (url != "/game") {
    isShowGame.value = false;
  }

  btnActive.value = url === "/vip" ? 1 : 0;

  open(url, data);
};

const downloadApp = () => {
  const isAboriginalPc = document.documentElement.clientWidth > 960

  const isIos = /Mac|iPhone|iPad|iPod/.test(navigator.platform)

  if (isPrompt.value) {
    addToHomeScreen();
  } else if (isIos) {
    open("/phone");
  } else if (isAndroid.value || isAboriginalPc) {
    const link = document.createElement("a");
    link.href = isAndroid.value ? androidUrl.value : iosUrl.value;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  setLeft();
};

const getUserPageCount = () => {
  "/api/page/getUserPageCount"
    .GET<GetUserPageCount>(
      {},
      {
        Authorization: async () => await dbGet("token"),
      }
    )
    .then((res) => {
      gameNum.value = res;
    });
};

const setLeft = () => {
  isLeft.value = !isLeft.value;
  changeWindow("left");
};

let freeLoading = false;
const handleFree = () => {
  
  if (!isLogin.value) {
    setLeft();
    open("/login");
    return;
  }

  if (freeLoading) return;

  "/api/activity/getActivityList"
    .GET<GetActivityList>(null, {
      Authorization: async () => await dbGet("token"),
    })
    .then((ret) => {
      const special_activity = ret.special_activity;

      const item = special_activity.find(
        (i) => i.activity_type === "Turntable"
      );

      if (item) {
        setLeft()
        open(!item.start_time ? "/turntable-alert" : "/turntable", {
          title: item.activity_title + unit.value + item.reward_money,
        });
      }
    })
    .finally(() => {
      freeLoading = false;
    });
};

watch(isCollectApi, (_n, _o) => {
  getUserPageCount();
});
const isUserMsg = ref(0)
watch(soketData, (_o, n) => {
	isUserMsg.value = n.new_user_message
})
onMounted(() => {
  isUserMsg.value = soketData.new_user_message
  getUserPageCount();
});

onUnmounted(() => { });
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.meun-card-k{
  white-space: nowrap;
}

.red {
	display: block;
	width: 0.75rem;
	height: 0.75rem;
	position: absolute;
	left: 0.75rem;
			top: 0.5rem;
	font-size: 0.625rem;
	color: #FFF;
	text-align: center;
	// transform: translateY(-50%);
	background-color: #FF0000;
	border-radius: 100%;
}
.back-pc {
  background-color: rgb(31, 31, 31);
}

.content {
  padding: 0.5rem 1rem;

  &.p-top {
    padding-top: calc(0.5rem + var(--download-height));
  }
}

.close-icon {
  width: 0.7rem;
  height: 0.7rem;
  fill: #b4b4b4;
  cursor: pointer;
}

.btn-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 1.2rem;

  .btn {
    display: flex;
    width: 47%;
    height: 2.3rem;
    padding: 0.5rem 0.65rem;
    box-sizing: border-box;
    background-color: #3a3a3a;
    color: #c4c4c4;
    font-size: 0.87rem;
    align-items: center;
    border-radius: 0.12rem;

    &.btnActive {
      background-color: #009d80;
      color: #fff;
      svg {
        fill: #fff;
      }
    }
  }
}

.pre-icon {
  display: block;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  fill: #A7A7A7;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  color: #fff;
  font-size: 0.87rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &.bottom {
    color: #7d7d7d;
  }

  &.active {
    svg {
      fill: #fff;
    }
  }
}

.menu-btn {
  .menu-item {
    position: relative;
    margin: 0.88rem 0;
    padding: 0 0.5rem;
    background-color: #3a3a3a;
  }

  .to-right {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    fill: #fff;
  }
}

.bottom-img {
  padding-top: 1.21rem;

  img {
    display: block;
    width: 14.6rem;
    height: auto;
  }
}

.is-left-mask {
  position: fixed;
  top: 0;
  left: var(--left-width);
  bottom: 0;
  right: 0;
  z-index: 0;
}
</style>
