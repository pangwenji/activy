<template>
    <div>
        <div class="FAQ-box">
            <div>
                <div class="content">
                    <font>
                        <font class="title">什么是 9F.COM 联盟计划？</font>
                    </font>
                    <div>
                        <font class="des">
                            <font>9F.COM Affiliates 是一个我们为您提供每天赚钱机会的计划，只是让我们有机会吸引更多玩家。
                            </font>
                        </font>
                    </div>
                </div>
                <div class="content">
                    <font>
                        <font class="title">参与费用是多少？</font>
                    </font>

                    <div>
                        <font class="des">
                            <font>绝对没有。</font>
                            <font>它是完全免费的。</font>
                        </font>
                    </div>
                </div>
                <div class="content">

                    <font>
                        <font class="title">即使我没有网站，我也能受益吗？</font>
                    </font>

                    <div>
                        <font class="des">
                            <font>当然可以。</font>
                            <font>我们可以为您提供在社交媒体或电子邮件上离线推广 9F.COM 所需的所有营销工具。</font>
                        </font>
                    </div>
                </div>
                <div class="content">

                    <font>
                        <font class="title">我能赢多少钱？</font>
                    </font>

                    <div>
                        <font class="des">
                            <font>作为我们联属网络的一部分，您将通过收入分成模式获得报酬。</font>
                            <font>您赚取超过80%的佣金奖励。</font>
                        </font>
                    </div>
                    <div class="link">
                        <font @click="showDetail = true">佣金奖励规则</font>
                        <font @click="switchTab(4)">佣金计算规则</font>
                    </div>
                </div>

                <div class="commission-box">
                    <div class="title">佣金奖励规则</div>
                    <div class="line"></div>
                    <div class="hint-box">
                        <div class="high-tip">通过推荐朋友到9F.COM赚钱，您将获得超过80%的奖励佣金！</div>
                        <div class="rule-box row-center">
                            <img class="money-img" src="@/assets/9f/agent/money.png" alt="">
                            <div class="can-get">
                                <span style="color:red">推荐 > 750</span>
                                <span style="color:red">佣金 > 每月 131,250 美元！</span>
                            </div>
                        </div>
                        <span class="down-line all-center">下属无限发展</span>
                        <img class="down-line-img" src="@/assets/9f/agent/group_mx.png" alt="">
                        <div class="tip">
                            <span>1. 每次您推荐的玩家下注时，</span>
                            <span style="color:red">无论他们输赢，</span>
                            <span>您都会收到不同的佣金百分比。</span>
                        </div>
                        <div class="tip">
                            <span>2. 系统每3分钟计算一次佣金。</span>
                        </div>
                    </div>
                </div>

                <div class="content">

                    <font>
                        <font class="title">定义</font>
                    </font>

                    <div>
                        <p>
                            <font class="des">
                                <font>注册 - 注册用户数量</font>
                            </font>
                        </p>
                        <p>
                            <font class="des">
                                <font>新玩家 - 今日注册用户中的新付费玩家</font>
                            </font>
                        </p>
                        <p>
                            <font class="des">
                                <font>对团队[编号] 的有效投注 - 对您团队的参考和贡献的有效投注总价值。</font>
                                <font>num - 贡献有效投注的推荐人和团队成员总数。</font>
                            </font>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <teleport to="#independent">
        <CommissionDetail v-model:show="showDetail"></CommissionDetail>
    </teleport>
    <div class="popup-box">

        <!-- <table-card class="table-card">
            <template #name>
                <table-cell class="name-team" v-for="name in tabs[tabIndex]">
                    <template #cell>
                        {{ name }}
                    </template>
                </table-cell>
            </template>
            <template #row>
                <table-row v-for="v in list.rules" class="table-row">
                    <table-cell class="cell">
                        <template #cell>
                            {{ v.level }}
                        </template>
                    </table-cell>
                    <table-cell class="cell">
                        <template #cell>
                            {{ t('pageLevel.n', { num: v.bet_money }) }}+
                        </template>
                    </table-cell>
                    <table-cell class="cell">
                        <template #cell>
                            {{ t('pageLevel.n', { num: v.bonus }) }}
                        </template>
                    </table-cell>
                </table-row>
            </template>
        </table-card> -->
    </div>


    <div class="page-k page-pading" v-if="false">
        <div class="tips-card">
            <div class="title-card" @click="$open('/agent-rule')">
                <span>{{ t('pageLevel.t1') }}</span>
                <public-svg class="right-icon" icon="icon_Arrow"
                    :style="{ width: '0.8750rem', fill: '#698AFF', height: '1.5000rem' }">
                </public-svg>
            </div>

            <div class="tip-team">
                {{ t('pageLevel.t2') }}
            </div>
            <div class="tip-team">
                {{ t('pageLevel.t3') }}
            </div>
            <div class="tip-team">
                {{ t('pageLevel.t4') }}{{ unit }}{{ agentRule.max_commission_day }}
            </div>
            <div class="tip-team">
                {{ t('pageLevel.t5') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TableCard from "@/components/9f/table-card.vue";
import TableCell from "@/components/9f/table-cell.vue";
import TableRow from "@/components/table-row.vue";
import PublicSvg from "@/components/public-svg.vue";
import CommissionDetail from '@/components/9f/commission-detail.vue'

import Page from '@/components/page.vue'
import { ref, defineEmits } from "vue";
import { onLoad } from '@/router/routes';
import { dbGet } from '@/uilts/db';
import { t } from '@/uilts/i18n';
import { isPc, unit } from "@/uilts/async.var";
import { emit } from "process";
import { tab } from "../../uilts/base";

const emits = defineEmits(['switchTab'])
// const showMore = ref(false);
const list = ref<AgentLevel["response"]>({
    rules_type: "",
    rules: []
});

const showDetail = ref(false);

const switchTab = (tabIndex: number) => {
    emits('switchTab', tabIndex)
}

let Log: Promise<AgentLevel["response"]>;
const getAgentLevel = async () => {
    Log && Log.abort();
    Log = '/api/agent/agentLevel'.GET<AgentLevel>({}, {
        Authorization: async () => await dbGet('token')
    })
    let ret = await Log
    list.value = ret
}

const agentRule = ref({
    max_commission_day: '0'
})
let Loga: Promise<GetAgentRule["response"]>;
const getAgentRule = async () => {
    Loga && Loga.abort();
    Loga = '/api/agent/getAgentRule'.GET<GetAgentRule>({}, {
        Authorization: async () => await dbGet('token')
    })
    let ret = await Loga
    agentRule.value = ret
}


onLoad(() => {
    getAgentLevel()
    getAgentRule()
})
</script>

<style lang="scss" scoped>
@import "@/scss/public.scss";

font {}

.FAQ-box {
    background: white;
    padding: 10px;
    border-radius: 5px;

    .content {
        margin-bottom: 1.25rem;

        .title {
            font-weight: 600;
            display: block;
            color: #000;
            font-size: 1.25rem;
            border-bottom: 1px solid rgba(gray, .5);
        }

        .des {

            font {
                color: grey;
                font-size: .75rem;
            }
        }

        .link {
            font {
                margin-top: .3125rem;
                display: block;
                color: #009d80;
                font-size: .75rem;
            }
        }
    }

    .commission-box {
        display: flex;
        background: white;
        flex-direction: column;
        padding: 0 .625rem;
        margin-bottom: .625rem;
        border-radius: .125rem;

        .title {
            color: grey;
            font-size: .75rem;
            padding: .3125rem 0;
        }

        .line {
            background: #bdbdbd;
            width: 100%;
            height: 1px;
        }

        .hint-box {
            padding: .625rem 0rem;

            .high-tip {
                color: #442729;
                font-size: .9375rem;
                text-align: center;
            }

            span {
                color: #442729;
                font-size: .9375rem;
            }


            .rule-box {
                margin-top: .625rem;

                .can-get {
                    display: flex;
                    flex-direction: column;
                }

                img {
                    width: 4.375rem;
                    height: 4.375rem;
                }
            }

            .down-line {
                font-size: .875rem;
                text-align: center;
            }

            .down-line-img {
                width: 100%;
            }

            .tip {
                margin-top: .625rem;

                span {
                    font-size: .75rem;
                }
            }
        }

    }

}

.page-k {
    // padding: 0 0.6250rem;

    @include pc {
        // padding: 0 32px;
    }
}

.table-card {
    border-radius: 8px 8px 0px 0px;
    background-color: #0e1319;
}


.title-card {
    display: flex;
    justify-content: space-between;
    padding: 0.5000rem 0.6250rem;
    border-radius: 0.5000rem;
    background: #231D4E;
    align-items: center;

    @include pc {
        padding: 16px 20px;
        border-radius: 16px;
        margin-top: 32px;
        margin-bottom: 32px;
    }

    span {
        color: var(--MENU, #8E90CD);
        font-family: PingFang SC;
        font-size: 0.8750rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;

        @include pc {
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
        }
    }
}

.tips-card {
    padding: 0.6250rem 0;

    .tip-team {
        padding-top: 0.6250rem;
        color: var(--TAB-, #5B6DA1);
        font-family: PingFang SC;
        font-size: 0.7500rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        @include pc {
            font-size: 14px;
        }
    }
}

.table-row {
    background: #0e1319 !important;
    height: 2.5rem;
    font-size: .75rem;

    &:nth-child(odd) {
        background: #151d28 !important;
    }
}

.cell {
    @include pc {
        padding: 20px;
        font-size: 14px;
    }

    color: #98a7b5;

    &:nth-child(3) {
        color: #db922b;
    }
}

.popup-box {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 9999;
}
</style>