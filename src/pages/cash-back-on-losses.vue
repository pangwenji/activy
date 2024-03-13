<template>
  <!-- <page
    title-bg-color="transparent"
    :show-scrollbar="true"
    :mouse-wheel="true"
    :head-box="isPc ? ['content', 'right'] : undefined"
  > -->
  <page :show-header="!isPc">
    <div class="body page-pading">
      <div class="jackpot shell">
        <div class="flex">
          <div class="title">
            <span>{{ data.in_use_rate }}%</span
            >{{ $t("pageCashBackOnLosses.t1") }}
          </div>
          <div>
            {{ $t("pageCashBackOnLosses.t2") }}:{{ data.max_rate.rate }}%
          </div>
        </div>
        <div class="schedule">
          <div :style="{
              width: scheduleLength + '%',
            }" class="schedule-silde"></div>
            <div :style="{
              left: scheduleLength + '%',
            }" :class="scheduleLength > 90 && 'posMax'" class="schedule-number">{{data.next_group_level ? data.level_up_advance + 'EXP' : 'max'}}</div>
          <!-- <div
            class="schedule-value"
            :data-px="
              data.next_group_level ? data.level_up_advance + 'EXP' : 'max'
            "
            :style="{
              width:
                (Number(data.level_up_advance) / Number(data.level_condition)) *
                  100 +
                '%',
            }"
            :class="Number(data.level_up_advance)<10 && 'leftPos'"
          ></div> -->
        </div>

        <div class="flex">
          <div>VIP {{ data.now_group_level }}</div>
          <div>
            VIP
            {{
              data.next_group_level
                ? data.next_group_level
                : $t("pageVip.levelD")
            }}
          </div>
        </div>

        <div class="flex top-px" v-if="data.next_group_level">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill=""
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.9994 10.0013C17.9994 9.26492 18.5963 8.66797 19.3327 8.66797H27.3327C28.069 8.66797 28.666 9.26492 28.666 10.0013V18.0013C28.666 18.7377 28.069 19.3346 27.3327 19.3346C26.5963 19.3346 25.9993 18.7377 25.9993 18.0013V13.3259L18.4196 21.2556C17.9867 21.7085 17.2969 21.7989 16.762 21.4729L11.1835 18.0735L5.02683 25.5174C4.55751 26.0849 3.71705 26.1644 3.1496 25.6951C2.58216 25.2258 2.50262 24.3853 2.97194 23.8179L9.86427 15.4845C10.2866 14.9739 11.0197 14.8509 11.5855 15.1957L17.2333 18.6374L24.2137 11.3346H19.3327C18.5963 11.3346 17.9994 10.7377 17.9994 10.0013Z"
              fill="#383838"
            />
          </svg>
          <span
            >{{ $t("pageCashBackOnLosses.t3") }}VIP {{ data.next_group_level
            }}{{ $t("pageCashBackOnLosses.t4")
            }}{{ data.leave_advance }}EXP</span
          >
        </div>
      </div>

      <div class="shell">
        <div class="time-left">
          <div>
            <div class="title">{{ $t("pageCashBackOnLosses.t5") }}</div>
            <div class="times">
              <div class="name">
                {{ $t("pageCashBackOnLosses.t6") }}
                <span :data-unit="unit" v-if="data.is_can_apply == 0">???</span>
                <span :data-unit="unit" v-else>{{ data.cashback_amount }}</span>
              </div>

              <span class="activity"
                >{{ $t("pageCashBackOnLosses.t7") }} {{ data.begin_time }} ~
                {{ data.end_time }}</span
              >
            </div>
          </div>
          <img src="@/assets/new/turntable/icon-2.png" class="icon" />
        </div>
        <div
          class="share-btn"
          :class="{ disable: data.is_can_apply == 0 }"
          @click="submint"
        >
          {{ $t("pageCashBackOnLosses.t8") }}
        </div>
        <div class="submit-times">
          {{ $t("pageCashBackOnLosses.r11") }}{{ data.rule.applyDate_start }} ~
          {{ data.rule.applyDate }}
        </div>
      </div>

      <div class="shell">
        <div class="title2">VIP{{ $t("pageCashBackOnLosses.t9") }}</div>
        <div class="tab-datas">
          <div class="tab-datas-content">
            <div class="tab-data head">
              <div>{{ $t("pageCashBackOnLosses.t10") }}</div>
              <div>{{ $t("pageCashBackOnLosses.t11") }}</div>
              <div>{{ $t("pageCashBackOnLosses.t12") }}</div>
            </div>
            <scroll-view
              class="tabs-conetnt-scroll"
              :disable="isPc"
              :scroll-y="true"
              :show-scrollbar="false"
              :bounce="false"
            >
              <div style="">
                <div class="tab-data winner" v-for="item in data.rule.list">
                  <div>VIP {{ item.vip_level }}</div>
                  <div>
                    {{ unit }}<span>{{ item.bet_money }}</span
                    >+
                  </div>
                  <div>{{ item.rate }}%</div>
                </div>
              </div>
            </scroll-view>
          </div>
        </div>
      </div>

      <div class="title2">{{ $t("pageTurntable.gtitle") }}</div>
      <div class="rules">
        <div class="item" v-for="i in 10">
          {{
            $t("pageCashBackOnLosses.r" + i, {
              time: data.rule.applyDate,
              money: unit + data.rule.max_money,
            })
          }}
        </div>
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import ScrollView from "../components/scroll-view.vue";
import { onUnmounted, reactive, ref, computed } from "vue";
import Page from "../components/page.vue";
import { onLoad, onShow } from "../router/routes";
import { hint } from "../uilts/ui";
import { t } from "../uilts/i18n";
import { isPc, unit } from "../uilts/async.var";
import { dbGet } from "../uilts/db";
const title = ref("");
const data = reactive<GetLossActivityDetails["response"]>({
  activity_id: 0,
  activity_type: "",
  activity_title: "",
  activity_name: "",
  begin_time: "",
  end_time: "",
  rule: {
    list: [],
    applyDate: "",
    max_money: "",
    bet_double: 0,
    applyDate_start: "",
  },
  in_use_rate: 0,
  max_rate: {
    rate: 0,
    task_id: "",
    bet_money: 0,
    vip_level: 0,
  },
  now_group_level: 0,
  next_group_level: 0,
  level_up_advance: 0,
  leave_advance: 0,
  level_condition: 0,
  cashback_amount: 0,
  is_max_level: 0,
  is_can_apply: 0,
});
const submint = () => {
  "/api/activity/applyLossActivity"
    .GET(undefined, {
      Authorization: async () => await dbGet("token"),
    })
    .then(() => {
      hint(t("pageCashBackOnLosses.t13"));
    });
};

const scheduleLength = computed(() => Number(data.level_up_advance) / Number(data.level_condition) * 100)

onUnmounted(() => {});

onLoad<PageData["/turntable"]>((get) => {
  title.value = get.title;
  "/api/activity/getLossActivityDetails"
    .GET<GetLossActivityDetails>(null, {
      Authorization: async () => await dbGet("token"),
    })
    .then((ret) => {
      data.activity_id = ret.activity_id;
      data.activity_type = ret.activity_type;
      data.activity_title = ret.activity_title;
      data.activity_name = ret.activity_name;
      data.begin_time = ret.begin_time;
      data.end_time = ret.end_time;
      data.rule = ret.rule;
      data.in_use_rate = ret.in_use_rate;
      data.max_rate = ret.max_rate;
      data.now_group_level = ret.now_group_level;
      data.next_group_level = ret.next_group_level;
      data.level_up_advance = ret.level_up_advance;
      data.leave_advance = ret.leave_advance;
      data.level_condition = ret.level_condition;
      data.cashback_amount = ret.cashback_amount;
      data.is_max_level = ret.is_max_level;
      data.is_can_apply = ret.is_can_apply;
    });
});
onShow<PageData["/turntable"]>((get) => {
  title.value = get.title;
  "/api/activity/getLossActivityDetails"
    .GET<GetLossActivityDetails>(null, {
      Authorization: async () => await dbGet("token"),
    })
    .then((ret) => {
      data.activity_id = ret.activity_id;
      data.activity_type = ret.activity_type;
      data.activity_title = ret.activity_title;
      data.activity_name = ret.activity_name;
      data.begin_time = ret.begin_time;
      data.end_time = ret.end_time;
      data.rule = ret.rule;
      data.in_use_rate = ret.in_use_rate;
      data.max_rate = ret.max_rate;
      data.now_group_level = ret.now_group_level;
      data.next_group_level = ret.next_group_level;
      data.level_up_advance = ret.level_up_advance;
      data.leave_advance = ret.leave_advance;
      data.level_condition = ret.level_condition;
      data.cashback_amount = ret.cashback_amount;
      data.is_max_level = ret.is_max_level;
      data.is_can_apply = ret.is_can_apply;
    });
});
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.body {
  font-size: 0.75rem;
  background: #fff;
  padding-bottom: 5.4rem;
  box-sizing: border-box;
  @include pc {
  }
}
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.shell {
  padding: 0.7rem;
  box-sizing: border-box;
  background: #ededed;
  border-radius: 0.42rem;
  font-family: SWISSC;
  margin-bottom: 0.8rem;
  box-sizing: border-box;
  .title2 {
    color: grey;
  }
  @include pc {
    padding: 18px 30px;
  }
}

.jackpot {
  background: #fcde26;
  font-size: 0.65rem;
  color: #383838;
  .title {
    color: #009d80;
    font-size: 1.4rem;
    span {
      font-weight: 600;
    }
  }
  img {
    width: 3.75rem;
    height: 3.75rem;
  }
  .schedule {
    width: 100%;
    height: 0.36rem;
    border-radius: 1.5625rem;
    background: #fff;
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
    box-sizing: border-box;
    position: relative;
    @include pc {
      height: 6px;
      border-radius: 50px;
      margin-bottom: 11px;
      margin-top: 47px;
      background: #fff;
      & ~ .flex {
        font-size: 14px;
      }
    }
  }
  .schedule-silde {
    height: 100%;
    border-radius: 1.5625rem;
    position: relative;
    background-color: green;
    &:after {
      content: "";
      border-radius: 50%;
      background: green;
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      // right:0;
      top: -0.13rem;
    }
  }
  .schedule-number {
    text-align: center;
    font-size: 0.625rem;
    position: absolute;
    top: -1.15rem;
    left: 0;
    color: #009d80;
    &.posMax {
      left: 87% !important;
    }
  }
  .schedule-value {
    height: 100%;
    border-radius: 1.5625rem;
    position: relative;
    background-color: green;
    &::after {
      content: "";
      border-radius: 50%;
      background: green;
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      right:0;
      top: -0.13rem;
    }
    &::before {
      content: attr(data-px);
      text-align: center;
      font-size: 0.625rem;
      position: absolute;
      right: 0;
      top: -1.15rem;
      // transform: translate(50%);
      color: #009d80;

    }
    // &.leftPos {
    //   &::before {
    //     transform: translateX(3.2rem);
    //   }
    // }
    @include pc {
      &::after {
        border-radius: 50%;
        width: 12px;
        height: 12px;
        right: 0;
        top: -3px;
      }
      &::before {
        font-size: 14px;
        top: -26px;
      }
    }
  }

  @include pc {
    padding: 24px 30px;
    border-radius: 8px;
    font-size: 16px;
    .flex {
      font-weight: 600;
    }
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

.name {
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  span {
    font-size: 0.9rem;
    color: #009d81;
    font-weight: 700;
    &::before {
      content: attr(data-unit);
      font-size: 0.75rem;
    }
  }
  @include pc {
    font-size: 20px;
    padding-bottom: 16px;
    span {
      font-size: 20px;
      &::before {
        font-size: 20px;
      }
    }
  }
}

.time-left {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 0.75rem;
  .title {
    font-size: 1.075rem;
    font-weight: 500;
    padding-bottom: 0.7rem;
    font-family: SWISSC-BT;
    color: #cf0202;
  }
  .times {
    font-size: 0.8rem;
    color: #000;
    .activity {
      color: #cf0202;
    }
  }
  .icon {
    width: 5rem;
    height: 5rem;
  }
  @include pc {
    display: flex;
    background: transparent;
    font-size: 20px;
    align-items: center;
    justify-content: space-between;
    .icon {
      width: 120px;
      height: 120px;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      padding-bottom: 16px;
    }
    .times {
      font-size: 14px;
    }
  }
}
.share-btn {
  display: flex;
  height: 2.15rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.35rem;
  background: #009d81;
  color: #fff;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.46rem 0 0.64rem 0;
  box-sizing: border-box;
  cursor: pointer;
  &.disable {
    color: #fff;
    filter: brightness(0.5);
    pointer-events: none;
    & ~ .submit-times {
    }
  }
  @include pc {
    width: 250px;
    height: 44px;
    font-size: 20px;
    line-height: normal;
    margin-bottom: 16px;
  }
}
.submit-times {
  font-size: 0.8rem;
  line-height: 0.625rem;
  padding-bottom: 0.15rem;
  box-sizing: border-box;
  color: #272525;
  @include pc {
    font-size: 14px;
    line-height: normal;
  }
}

.top-px {
  justify-content: flex-end;
  padding-top: 0.5rem;
  margin-top: 0.75rem;
  border-top: 1px solid grey;
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
  }
  @include pc {
    justify-content: flex-start;
    font-size: 14px;
    padding-top: 16px;
    margin-top: 22px;
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
.tab-datas {
  background: #dedede;
  border-top: 0.01rem solid #bdbdbd;
  .tab-data {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    text-align: center;
    font-size: 0.8rem;
    font-weight: 500;
    color: #2b2b2b;
    height: 1.44rem;
    align-items: center;
    justify-content: space-between;
    div {
      flex: 1;
      height: 100%;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:last-child {
      border: none;
    }
    &.winner div:last-child {
      font-weight: 600;
    }
    &.winner {
      span {
        font-weight: 600;
      }
      &:nth-child(odd) {
        background: #d1d1d1;
      }
      &:nth-last-child(1) {
        color: #cf0202;
      }
    }
    &.head {
      height: 1.8125rem;
      height: 1.44rem;
      color: #009d80;
      font-weight: 600;
      border-bottom: none;
    }
  }
  @include pc {
    .tab-data {
      height: 60px;
      font-size: 14px;
      font-weight: 400;
      &.winner div:last-child {
        font-size: 14px;
      }
      &.head {
        height: 60px;
      }
    }
  }
}

.item {
  font-weight: 400;
  font-family: SWISSC;
  color: #383838;
  line-height: 1.3rem;
  @include pc {
    font-size: 14px;
    line-height: 22px;
  }
}
.title2 {
  font-size: 0.75rem;
  font-weight: 600;
  padding-bottom: 0.4rem;
  @include pc {
    padding-bottom: 8px;
    font-size: 16px;
  }
}
.tabs-conetnt-scroll {
  overflow: hidden;
  height: 21.875rem;
  @include pc {
    height: auto;
  }
}
</style>
