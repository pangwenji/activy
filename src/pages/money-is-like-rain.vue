<template>
    <page :show-header="false" class="page" page-style="height:100%">
        <div class="mask" ref="moneys"></div>
        <div class="content">
            <div class="close" @click="close" />

            <div class="title">{{ $t("pageMoneyIsLikeRain.bigTitle") }}</div>

            <div class="top">
                <div>
                    <div class="title2">
                        <i class="money-icon" />
                        <span>{{ $t("pageMoneyIsLikeRain.title1") }}</span>
                        <span>{{ unit }}</span>
                        <span>{{ data.user_reward_money }}</span>
                    </div>

                    <div class="title2">
                        <i class="money-icon" />
                        <span>{{ $t("pageMoneyIsLikeRain.title2") }}</span>
                        <span>{{ unit }}</span>
                        <span>{{ data.user_max_money }}</span>
                    </div>
                </div>
            </div>


            <div class="date-box today" v-if="data?.today_times?.length > 0">
                <div class="sub-title">
                    <div class="left">
                        {{ $t("pageMoneyIsLikeRain.mt", { count: data.today_times.length }) }}
                    </div>
                    <div class="right">
                        <div>
                            <i class="star" />
                            {{ $t("pageMoneyIsLikeRain.other") }}
                        </div>
                    </div>
                </div>
                <div class="dates">
                    <div class="item" v-for="item in data.today_times">
                        <i class="date-icon" />
                        {{ item.join('-') }}
                    </div>
                </div>
            </div>

            <div class="date-box" v-if="data?.extra_times?.length > 0">
                <div class="sub-title">
                    <div class="left">
                        {{ $t("pageMoneyIsLikeRain.mt", { count: data.extra_times.length }) }}
                    </div>
                    <div class="right">
                        <div>
                            <i class="star" />
                            {{ $t("pageMoneyIsLikeRain.my") }}
                            {{ data.extra_date[0] }}-{{ data.extra_date[data.extra_date.length - 1] }}
                            {{ $t("pageMoneyIsLikeRain.h") }}
                        </div>

                        <div>
                            <i class="star" />
                            {{ $t("pageMoneyIsLikeRain.mz") }}<template v-for="k in data.extra_week">
                                {{ $t("pageMoneyIsLikeRain." + k) }}
                            </template>

                        </div>
                    </div>
                </div>
                <div class="dates">
                    <div class="item" v-for="item in data.extra_times">
                        <i class="date-icon" />
                        {{ item.join('-') }}
                    </div>
                </div>
            </div>

            <ul class="tips">
                <li>{{ $t("pageMoneyIsLikeRain.g1") }}{{ unit }}{{ data.user_max_money }} </li>
                <li>{{ $t("pageMoneyIsLikeRain.g2") }} </li>
                <li>{{ $t("pageMoneyIsLikeRain.g3") }}</li>
                <li>{{ $t("pageMoneyIsLikeRain.g4") }}</li>
            </ul>

            <div class="btn-box">
                <span @click="start()">
                    {{ $t("pageMoneyIsLikeRain.ksy") }} {{ data.begin_time }}
                </span>
            </div>

        </div>


    </page>
</template>

<script setup lang="ts">
import { open, onLoad, back } from '../router/routes';
import { dbGet } from '../uilts/db';
import { reactive, ref, nextTick } from 'vue';
import { unit, isOpenThrowCoins } from '../uilts/async.var';
import { getRandomInt } from '../uilts/base';

const data = reactive<GetMoneyIsLikeRainDetails['response']>({
    activity_id: 0,
    activity_type: '',
    activity_title: '',
    activity_name: '',
    extra_date: [],
    extra_week: [],
    begin_time: '',
    today_times: [],
    extra_times: [],
    next_times: [],
    next_start_time: 0,
    user_reward_money: '',
    user_max_money: ''
});

const moneys = ref()

const start = () => {
    "/api/activity/checkWhetherRainOfMoney".GET<CheckWhetherRainOfMoney>(null, {
        Authorization: async () => await dbGet('token')
    }).then(async ret => {
        if (ret.status === 0) {
            isOpenThrowCoins.value = 1;
            open('/throw-coins', ret);
        }
    })
}

const close = () => {
    back()
}

const createMoney = () => {
    const money = document.createElement('div');
    money.className = 'money-rain money_' + getRandomInt(1, 4);
    money.style.animationName = ['drop', 'fall', 'drop1', 'fall1', 'drop2', 'fall2'][getRandomInt(0, 5)];
    money.style.animationDuration = getRandomInt(3, 7) + 's';


    money.style.animationTimingFunction = ['linear', 'ease-in-out', 'ease', 'ease-in', 'ease-out', 'cubic-bezier(0, -3.92, 0, 2.18)'][getRandomInt(0, 5)];

    money.style.left = `${Math.random() * (moneys.value.offsetWidth * 0.8)}px`;
    moneys.value.appendChild(money);
    money.onanimationend = () => {
        money.remove();
        createMoney()
    }
}

const init = () => {
    "/api/activity/getMoneyIsLikeRainDetails".GET<GetMoneyIsLikeRainDetails>(null, {
        Authorization: async () => await dbGet('token')
    }).then(ret => {
        data.activity_id = ret.activity_id;
        data.activity_type = ret.activity_type;
        data.activity_title = ret.activity_title;
        data.activity_name = ret.activity_name;
        data.extra_date = ret.extra_date;
        data.extra_week = ret.extra_week;
        data.begin_time = ret.begin_time;
        data.today_times = ret.today_times;
        data.extra_times = ret.extra_times;
        data.next_times = ret.next_times;
        data.next_start_time = ret.next_start_time;
        data.user_reward_money = ret.user_reward_money;
        data.user_max_money = ret.user_max_money;
    })


    nextTick(() => {
        for (let i = 0; i < 88; i++) {
            createMoney()
        }
    })
}

onLoad(() => {
    init();
})


</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.mask {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: calc(var(--I4) + 0);
}

.content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.65rem;
    width: 19.75rem;
    height: auto;
    z-index: calc(var(--I4) + 1);
    background: url('@/assets/money-rain/bg.png') center center no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    transition: all .3s;

}

.title {
    text-align: center;
    color: #ffd800;
    font-size: 1.5rem;
    line-height: 1;
}

.close {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    width: 1.25rem;
    height: 1.25rem;
    background: url('@/assets/money-rain/close.png') center center no-repeat;
    background-size: contain;
    cursor: pointer;
}

.top {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 18.6rem;
    height: 5.2rem;
    color: #fff;
    font-size: 1.22rem;
    background: url('@/assets/money-rain/top_bg.png') center center no-repeat;
    background-size: contain;
    white-space: nowrap;

    .money-icon {
        display: inline-block;
        margin-right: 0.31rem;
        width: 1.75rem;
        height: 1.45rem;
        background: url('@/assets/money-rain/money_icon.png') center center no-repeat;
        background-size: contain;
        vertical-align: middle;
    }
}

.date-box {
    padding: 0.1rem 0.5rem;
    background-color: #009d7f;
    border-radius: 0.31rem;

    &.today {
        margin-bottom: 0.3rem;
    }

    .sub-title {
        display: flex;
        align-items: center;
        margin-bottom: 0.3rem;
    }

    .left {
        color: gold;
        font-size: 0.88rem;
        margin-right: 0.25rem;
    }

    .right {
        color: #fff;
        font-size: 0.63rem;

        >div {
            display: flex;
            align-items: center;
        }
    }

    .star {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        margin-right: 0.15rem;
        background: url('@/assets/money-rain/star.png') center center no-repeat;
        background-size: contain;
    }

    .date-icon {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        background: url('@/assets/money-rain/date.png') center center no-repeat;
        background-size: contain;
    }

    .dates {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .item {
        width: 30%;
        font-size: 0.88rem;
        color: #fff;
    }
}

.tips {
    margin-top: 0.55rem;
    margin-left: 1rem;
    padding-left: 0;
    color: #fff;
    font-size: 0.65rem;
}

.btn-box {
    margin: 0.4rem 0 0.2rem;
    color: #ffd800;
    text-align: center;
}
</style>

<style lang="scss">
.money-rain {
    position: absolute;
    top: 0;
    z-index: calc(var(--I4) + 0);
    background-size: 100% 100%;

    &.money_1 {
        width: 3.85rem;
        height: 2.45rem;
        background-image: url('@/assets/money-rain/money_1.png');
    }

    &.money_2 {
        width: 4.6rem;
        height: 2.8rem;
        background-image: url('@/assets/money-rain/money_2.png');
    }


    &.money_3 {
        width: 3.35rem;
        height: 1.95rem;
        background-image: url('@/assets/money-rain/money_3.png');
    }

    &.money_4 {
        width: 4.372rem;
        height: 2.611rem;
        background-image: url('@/assets/money-rain/money_4.png');
    }
}
</style>