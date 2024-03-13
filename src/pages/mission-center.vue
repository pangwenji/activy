<template>
    <page :show-scrollbar="true" :mouse-wheel="true" :head-box="isPc ? ['content', 'right'] : undefined">

        <div class="body page-pading">
            <div class="total-reward">
                <div class="flex">
                    <img class="h5" src="@/assets/new/mission-center/mission-center-icon-h5.png" />
                    <img class="pc" src="@/assets/new/mission-center/mission-center-icon-pc.png" />
                    <div>
                        <div class="name">{{ $t('pageActivityNew.totalBonusClaim') }}</div>
                        <div class="value" :data-unit="unit">{{ total }}</div>
                    </div>
                </div>
                <border-gradient class="btn" @click="$open('/activity-record', {
                    code: ['DayTask', 'WeekTask', 'GiveBack']
                })" padding="0.4375rem 1.21875rem" :border="0" :bg-color="'#009d81'" :border-color="['#FF92FF', '#00FFFF']">
                    {{ $t('pageActivityNew.zqdrw') }}
                </border-gradient>
            </div>

            <div class="tab-btns">
                <div class="tab-btn" v-for="name, key in classIfy" :class="{ active: tabIndex == key }" @click="tabIndex = key">
                    {{ name }}
                </div>
            </div>
            <div class="empty" :data-empty="$t('ui.empty')">
                <template v-for="item in list">
                    <div class="mission" v-show="tabIndex == item.activity_type">
                        <div class="mission-content">
                            <div class="mission-text">
                                <div class="name">
                                    {{ item.title }} <span>{{ times[item.activity_id].text }}</span>
                                </div>
                                <div class="desc">
                                    <div v-if="!item.desc && tabIndex == 'DayTask'">
                                        {{ $t('pageActivityNew.zai') }}{{ item.title }}{{ $t('pageActivityNew.zhong') }}{{
                                            $t('pageActivityNew.tzjedd') }}{{ unit }}{{ item.task_money }}
                                    </div>
                                    <div v-else-if="!item.desc && tabIndex == 'WeekTask'">
                                        {{ $t('pageActivityNew.zai') }}{{ $t('pageActivityNew.meizouriwu') }}{{ unit }}{{
                                            item.task_money }}
                                    </div>
                                    <div v-else-if="!item.desc && tabIndex == 'GiveBack'">
                                        {{ $t('pageActivityNew.zai') }}{{ $t('pageActivityNew.huikuijiangli') }}{{ unit }}{{
                                            item.task_money }}
                                    </div>
                                    <div v-else-if="item.desc">
                                        {{ item.desc }}
                                    </div>
                                    <span class="h5" v-if="item.game_ids.length > 1 || item.game_platforms.length > 1"
                                        @click="$open('/mission-details', {
                                            activity_id: item.activity_id,
                                            task_id: item.task_id,
                                        })">{{ $t('pageActivityNew.details') }}</span>
                                </div>
                                <div class="money">{{ $t('pageActivityNew.earn') }} {{ unit }}{{ item.bonus }}</div>
                            </div>
                            <div class="chart" ref="chart" :data-task="item.task_money"
                                :data-complete="item.complete_money"></div>
                        </div>
                        <div class="btns">
                            <div class="details-btn pc" v-if="item.game_ids.length > 1 || item.game_platforms.length > 1"
                                @click="$open('/mission-details', {
                                    activity_id: item.activity_id,
                                    task_id: item.task_id,
                                })">{{ $t('pageActivityNew.details') }}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                    fill="none">
                                    <g clip-path="url(#clip0_9364_24919)">
                                        <path d="M7.91797 5L12.918 10L7.91797 15" stroke="#8E90CD" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_9364_24919">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>

                            <div class="mission-btn" :class="{
                                disable: item.is_receive == 2
                            }" @click="mission(item)">
                                <span v-if="item.is_receive === 1">
                                    {{ $t('pageActivityNew.receive') }}
                                </span>
                                <span v-else-if="item.is_receive === 0">
                                    {{ $t('pageActivityNew.goToGame') }}
                                </span>
                                <span v-else-if="item.is_receive === 2">
                                    {{ $t('pageActivityNew.receiveOk') }}
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

        </div>
    </page>
</template>

<script setup lang="ts">
// import ScrollView from "../components/scroll-view.vue";
import Page from '../components/page.vue';
import BorderGradient from '../components/border-gradient.vue';
import { onUnmounted, ref, nextTick } from "vue"
import { dbGet } from "../uilts/db";
import { isPc, restMoney, rootFontSize, unit } from "../uilts/async.var";
import { onLoad, open } from '../router/routes';
import * as echarts from 'echarts'
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';

const tabIndex = ref('DayTask');
const list = ref<GetTaskDetails['response']['activity_list']>([]);
// 分类
const classIfy = ref({}); 
const total = ref('');
type Times = {
    [k: number]: {
        end: number,
        text: string,
    }
};
const chart = ref();
const times = ref<Times>({});
const timeFormat = (t: number) => {
    return Math.max(Math.floor(t / 3600000),0)  + 'h:' + Math.max(Math.floor(t / 60000 % 60),0) + 'm:' + Math.max(Math.floor(t / 1000 % 60),0) + 's';
}


let chartEls: Array<{
    option: any;
    el: echarts.ECharts
}> = [];
const refreshChart = () => {
    let width = document.documentElement.clientWidth;
    for (let c of chartEls) {
        c.option.title.textStyle.fontSize = (((width <= 9999) ? width : 375) / 23.4375) * 0.625;
        c.el.setOption(c.option, true)
        c.el.resize();
    }
}
const charts = () => {
    for (let c of chart.value) {
        let myChart = echarts.init(c);
        let option = {
            tooltip: {
                show: false
            },
            title: {
                text: c.dataset.complete + "/" + c.dataset.task,
                left: 'center',
                top: 'center',
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: rootFontSize.value * 0.625,
                    fontFamily: 'Akrobat-ExtraBold'
                }
            },
            color: [
                "#009D80",
                "#000000",
            ],
            series: [
                {
                    hoverAnimation: false,
                    label: {
                        show: false,
                    },
                    type: 'pie',
                    radius: ['90%', '75%'],
                    startAngle: 135,
                    data: [
                        { value: c.dataset.complete, name: 'Direct' },
                        { value: c.dataset.task - c.dataset.complete, name: 'Search Engine' },
                    ]
                }
            ]
        };
        chartEls.push({
            option: option,
            el: myChart
        });
        myChart.setOption(option, true)
    }
}


let interval: NodeJS.Timeout;
onUnmounted(() => {
    clearInterval(interval);
    window.removeEventListener('resize', refreshChart)
})

const mission = (item: GetTaskDetails['response']['activity_list'][number]) => {
    if (item.is_receive === 0) {
        open('/casino')
    } else if (item.is_receive === 1) {
        "/api/activity/receive".POST<ReceiveTask>({
            activity_id: item.activity_id,
            task_id: item.task_id
        }, {
            Authorization: async () => await dbGet('token')
        }).then(_ret => {
            restMoney.value = !restMoney.value
            total.value  = (Number(total.value ) + Number(item.task_money)) + ''
            item.is_receive = 2;
            list.value = JSON.parse(JSON.stringify(list.value))
            hint(t('pageAgentPromotion.success'));
        })
    } else if (item.is_receive === 2) {

    }
}

onLoad<PageData['/mission-center']>((data) => {

    window.addEventListener('resize', refreshChart)

    tabIndex.value = data.tabIndex || 'DayTask';
    return "/api/activity/getTaskDetails".GET<GetTaskDetails>(null, {
        Authorization: async () => await dbGet('token')
    }).then(ret => {
        let obj: AnyObject = {};
        total.value = ret.total_activity_bonus;
        let ts: Times = {};
        for (let item of ret.activity_list) {
            obj[item.activity_type] = item.activity_name;
            ts[item.activity_id] = {
                end: item.end_time * 1000,
                text: ''
            };
        }
        list.value = ret.activity_list;
        classIfy.value = obj;
        times.value = ts;
        interval = setInterval(() => {
            let ts: Times = times.value;
            for (let id in ts) {
                ts[id] = {
                    end: ts[id].end,
                    text: timeFormat(ts[id].end - Date.now())
                };
            }
            times.value = ts;
        }, 1000)
        nextTick(() => {
            charts();
        })
    });
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';


.flex {
    display: flex;
    align-items: center;
}

.total-reward {
    border-radius: 0.5rem;
    background: #2A2A2A;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        display: block;
        width: 2.75rem;
        height: 2.75rem;
        margin-right: 0.9rem;
    }

    .name {
        color: #ffffff;
        font-size: 0.75rem;
        padding-bottom: 0.5rem;
    }

    .value {
        color: #009d81;
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.3125rem;

        &::before {
            content: attr(data-unit);
            font-size: 0.75rem;
        }
    }

    .btn {
        color: #FFF;
        font-size: 0.875rem;
        border-radius: 0.5rem;
    }

    @include pc {
        border-radius: 8px;
        padding: 24px;
        gap: 24px;
        border: 1px solid #292547;
        background: none;

        img {
            width: 100px;
            height: 100px;
            margin-right: 24px;
        }

        .name {
            font-size: 20px;
            padding-bottom: 8px;
        }

        .value {
            color: #0FF;
            font-size: 24px;
            line-height: normal;

            &::before {
                font-size: 24px;
            }
        }

        .btn {
            height: 48px;
            font-size: 20px;
            border-radius: 8px;
        }
    }
}

.tab-btns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.5rem;

    color: #ffffff;
    font-size: 0.75rem;
    gap: 0.3125rem;
    margin-bottom: 1rem;
    margin-top: 1.25rem;
    .tab-btns {
        margin: 0;
    }

    .tab-btn {
        flex: 1;
        display: flex;
        padding: 0.25rem 0.9375rem;
        justify-content: center;
        align-items: center;
        border-radius: 0.25rem;
        background: #2A2A2A;
        color: #C4C4C4;
        white-space: nowrap;
        &.active {
            color: #ffffff;
            font-size: 0.75rem;
            background: #009D80;
        }
    }

    @include pc {
        grid-column-gap: 16px;
        grid-row-gap: 16px;
        margin-bottom: 16px;
        margin-top: 24px;

        .tab-btn {
            font-size: 16px;
            padding: 0;
            height: 40px;
            box-sizing: border-box;

            &.active {
                font-size: 16px;
                background: #2E2C5E;
                border: 1px solid #2E2C5E;
            }
        }
    }
}

.mission {
    border-radius: 0.5rem;
    background: #2A2A2A;

    overflow: hidden;
    color: #ffffff;
    font-size: 0.875rem;
    margin-bottom: 0.96rem;

    .mission-content {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem;
    }

    .mission-text {
        display: flex;
        align-items: flex-start;
        // height: 4.90625rem;
        flex-direction: column;
        justify-content: space-between;
    }

    .name {
        font-size: 0.875rem;
         
        span {
            color: #009d81;
            padding-left: 0.5rem;
            font-size: 0.75rem;
        }
    }

    .desc {
        display: flex;
        font-size: 0.75rem;
        gap: 0.5rem;
        span {
            color: #B5EBFF;
        }
    }

    .money {
        color: #009d81;
        font-weight: 600;
        font-size: 0.75rem;
        padding-top: 0.2rem;
    }

    .mission-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2.75rem;
        background: #009d81;
        color: #ffffff;
        flex-wrap: nowrap;
        word-break: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        overflow:hidden;

        &.disable {
            background: #272557;
            color: #8E90CD;
        }
    }

    .chart {
        width: 5.30625rem;
        height: 5.30625rem;
    }

    @include pc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px;
        gap: 24px;

        font-size: 20px;

        .mission-content {
            flex-direction: row-reverse;
            gap: 24px;
            align-items: center;
            padding:0;
        }

        .mission-btn {
            height: 44px;
            width: auto;
            border-radius: 8px;
            padding: 0 30px;
        }

        .name {
            font-size: 20px;
            padding-bottom:16px;
            span{
                font-size: 20px;
            }
        }

        .desc {
            font-size: 14px;
            padding-bottom:8px;
        }

        .chart {
            width: 130px;
            height: 130px;
        }
        .btns{
            display:flex;
            flex-direction: column;
            align-items: flex-end;
        }
        .details-btn{
            font-size: 14px;
            color:#8E90CD;
            display:flex;
            align-items:center;
            margin-bottom:22px;
            height:34px;
            svg{
                width: 20px;
                height: 20px;
            }
        }
    }
}</style>
