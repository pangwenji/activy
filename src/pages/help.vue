<template>
  <page :show-scrollbar="true">
    <!-- <view class="title">
			{{$t('pageSettingHelp.immediately')}}
		</view> -->

    <div class="page-pading main">
      <div class="menu-card">
        <scroll-view
          :show-scrollbar="false"
          :scroll-x="true"
          class="scroll-view menu-card"
        >
          <div
            class="menu-team xx-btn"
            v-for="v in menu"
            :class="{ 'is-ok': v.key == type }"
            @click="selectMenu(v.key)"
          >
            {{ v.value }}
          </div>
        </scroll-view>
      </div>

      <public-loading class="public-loading" v-if="isLoading"></public-loading>
      <div v-else class="heip-team-content" v-html="ilist.content"></div>
    </div>
  </page>
</template>

<script setup lang="ts">
import Page from "../components/page.vue";
import ScrollView from "../components/scroll-view.vue";
import PublicLoading from "../components/public-loading.vue";
import { ref } from "vue";
import { onLoad, onShow } from "../router/routes";
import { t } from "../uilts/i18n";

const isLoading = ref(true);
const type = ref<Help["request"]["type"]>("sports_terms");
const menu = ref<
  Array<{
    value: string;
    key: Help["request"]["type"];
  }>
>([
  { value: t("pageHelp.m1"), key: "sports_terms" },
  { value: t("pageHelp.m2"), key: "privacy_policy" },
  { value: t("pageHelp.m3"), key: "terms_of_service" },
  { value: t("pageHelp.m4"), key: "faq" },
  { value: t("pageHelp.m5"), key: "bonus_policy" },
  { value: t("pageHelp.m6"), key: "registration_and_login" },
  { value: t("pageHelp.m7"), key: "support" },
  { value: t("pageHelp.m8"), key: "fees" },
  { value: t("pageHelp.m9"), key: "coin_precision_limitations" },
  { value: t("pageHelp.m10"), key: "responsible_gaming" },
]);

let ilist = ref<Help["response"]>({
  content: "",
  title: "",
  intro: "",
});

const selectMenu = (key: Help["request"]["type"]) => {
  type.value = key;
  getHelp();
};

//获取收藏列表
const getHelp = () => {
  isLoading.value = true;
  "/api/article/getData"
    .GET<Help>({
      type: type.value,
    })
    .then((ret) => {
      // collect.splice(0,collect.length)
      ilist.value = ret;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

onLoad<{ type: Help["request"]["type"] }>((get) => {
  if (get.type) type.value = get.type;
  getHelp();
});
onShow<{ type: Help["request"]["type"] }>((get) => {
  type.value = "sports_terms";
  if (get.type) type.value = get.type;
  getHelp();
});
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.main {
  min-height: 100vh;
  background-color: rgb(31, 31, 31);
}

.content {
  // padding: 32px 60px;
  min-height: 668px;

  .title {
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }

    color: var(--MENU, #8e90cd);
    text-align: center;
    font-family: PingFang SC;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .min-content {
    padding-top: 24px;
    display: flex;
    justify-content: space-between;

    .left-menu {
      width: 280px;
      min-height: 558px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 12px;
      background: #1b1839;

      .left-menu-team {
        padding: 10px 40px;
        box-sizing: border-box;
        color: var(--MENU, #8e90cd);

        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border-radius: 8px;

        &:hover,
        &.selected {
          color: #faf;
          border: 2px solid #312e63;
          background: radial-gradient(
              70.67% 70.18% at 56.72% 138.26%,
              rgba(255, 251, 251, 0.2) 0%,
              rgba(255, 255, 255, 0) 100%
            ),
            linear-gradient(180deg, #2f2c61 0%, #3c3789 100%);
        }
      }
    }

    .right-content {
      width: calc(100% - 305px);
      height: 668px;
      border-radius: 12px;
      background: #1b1839;
      padding: 20px;
      box-sizing: border-box;

      .scroll-view {
        height: 628px;
        overflow: hidden;
      }
    }
  }
}

page {
  padding-bottom: 3.125rem;
}

.public-loading {
  @include h5 {
    margin-top: 100%;
  }
}

.menu-card {
  // padding: 0.625rem;
  width: calc(100% - 1.25rem);
  // display: flex;
  white-space: nowrap;

  .menu-team {
    display: inline-block;
    // padding: 0.3125rem 0.4688rem;

    // color: var(--TAB-, #5b6da1);
    // text-align: center;
    // font-family: PingFang SC;
    // font-size: 0.75rem;
    // font-style: normal;
    // font-weight: 900;
    // line-height: normal;
    // border-radius: 0.1875rem;
    // border: 1px solid #2f2a5c;
    // background: #1b173a;
    // margin-right: 0.3125rem;
    margin-right: 0.38rem;
    padding: 0 0.4rem;
    height: 1.87rem;
    line-height: 1.87rem;
    font-size: 0.75rem;
    color: #c4c4c4;
    background-color: #3a3a3a;
    border-radius: 0.31rem;
  }

  .is-ok {
    color: #fff;
    background-color: #009d80;
    // color: #0ff;
    // border: 1px solid #474f9d;
    // background: #272c5d;
  }
}

.title {
  margin: 0.3125rem 0.7813rem;
  font-size: 0.7813rem;
  color: #fefefe;
}

.heip-team {
  margin: 0.9375rem 0.7813rem;
  height: 2.0625rem;
  height: auto;
  overflow: hidden;

  .heip-team-title {
    height: 2.0625rem;
    line-height: 2.0625rem;
    background-color: #2d2d35;
    display: flex;

    text {
      margin-left: 1.4063rem;
      display: inline-block;
      color: #fefefe;
      font-size: 0.7813rem;
    }

    image {
      display: block;
      width: 0.7188rem;
      height: 0.4063rem;
      margin-left: auto;
      margin-top: 0.8125rem;
      margin-right: 0.3906rem;
    }
  }
}

.heip-team-content {
  padding-top: 0.625rem;
  font-size: 0.7813rem;
  // color: var(--TAB-, #5b6da1);
  color: #fff;
  line-height: 1.25rem;
  // background-color: #1c1e22;
}

.heip-team:active {
  height: auto;
}

.heip-team::selection {
  height: auto;
}

.tips {
  display: block;
  // color: #808185;
  // font-size: 0.6250rem;
  padding-bottom: 1.25rem;

  .tips-title {
    display: block;
  }
}
</style>
