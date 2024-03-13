<template>
    <div class="help-container">
        <div class="help-header row-space-between">
            <span class="header-title">
                佣金奖励规则
            </span>
            <div class="close">
                <public-svg class="icon" icon="icon_Close" @click="$back"></public-svg>
            </div>
            <!-- <img src="@/assets/new/close.png" @click="closePopup" /> -->
        </div>
        <table-card class="table-card">
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
        </table-card>

        <div class="rule-wrap">

            <div class="wager-wrap">
                <div class="wager-title">
                    <div class="wager-title-dot"></div>
                    <font>
                        <font>有效投注取决于不同的游戏：</font>
                    </font>
                </div>
                <div class="wager-block">
                    <div class="iconfont icon-notice"></div>
                    <font>
                        <font>崩溃类型和虚拟游戏将不被视为有效投注</font>
                    </font>
                </div>
                <div class="wager-block">
                    <div class="percent-box row-center">
                        <div class="wager-percent">
                            <font>
                                <font class="percent">100%</font>
                            </font>
                        </div>
                        <font>
                            <font> &nbsp;赌注的</font>
                        </font>
                    </div>
                    <div class="games-block">
                        <font>
                            <font class="game">游戏：</font>
                        </font><span>
                            <font>
                                <font>真人娱乐场、第三方</font>
                            </font>
                        </span>
                    </div>
                </div>
                <div class="wager-block">
                    <div class="percent-box row-center">
                        <div class="wager-percent">
                            <font>
                                <font class="percent">100%</font>
                            </font>
                        </div>
                        <font>
                            <font> &nbsp;赌注的</font>
                        </font>
                    </div>
                    <div class="games-block">
                        <font>
                            <font class="game">Juegos：</font>
                        </font><span>
                            <font>
                                <font>其他原创游戏</font>
                            </font>
                        </span>
                    </div>
                </div>
                <div class="wager-block">
                    <div class="warning-txt">
                        <font>
                            <font>佣金计算规则</font>
                        </font>
                    </div>
                    <div class="iconfont icon-to"></div>
                </div>
                <ul class="rule-list">
                    <li>
                        <font>
                            <font>佣金可以随时从仪表板提取到我们的 9F.COM 钱包。</font>
                        </font>
                    </li>
                    <li>
                        <font>
                            <font>系统每3分钟计算一次佣金。</font>
                        </font>
                    </li>
                    <li>
                        <font>
                            <font>每日最高佣金：10,000 MXN</font>
                        </font>
                    </li>
                    <li>
                        <font>
                            <font>同一IP或设备不计佣金，故意夸大业务量不计佣金。</font>
                        </font>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import TableCard from "@/components/9f/table-card.vue";
import TableCell from "@/components/9f/table-cell.vue";
import TableRow from "@/components/table-row.vue";
import PublicSvg from "@/components/public-svg.vue";
import Page from '@/components/page.vue'
import { ref, defineProps, defineEmits, withDefaults, watch } from "vue";
import { onLoad, back } from '@/router/routes';
import { dbGet } from '@/uilts/db';
import { t } from '@/uilts/i18n';
import { isPc, unit } from "@/uilts/async.var";

// const showMore = ref(false);
const list = ref<AgentLevel["response"]>({
    rules_type: "",
    rules: []
});

const tabs = [
    [
        t('pageLevel.tab1'),
        t('pageLevel.tab2'),
        t('pageLevel.tab3')
    ],
]


const tabIndex = ref(0);

let Log: Promise<AgentLevel["response"]>;
const getAgentLevel = async () => {
    // console.log('执行我了');

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

// console.log('执行我了')
getAgentLevel();
getAgentRule();

</script>
<style lang="scss" scoped>
@import "@/scss/public.scss";

.faceIn-enter-active {
    animation: face-in 0.3s;
}

.faceIn-leave-active {
    animation: face-in 0.3s reverse;
}

@keyframes face-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.help-container {
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background: #1f2024;
    padding: 0 1.25rem 1.25rem 1.25rem;
    z-index: 9999;
    left: 0;
    top: 0;
    overflow-y: auto;
}

.help-header {
    padding: .625rem 0;

    span {
        font-size: .875rem;
        color: #98a7b5;
        flex: 1;
    }

    .icon {
        fill: white;
        width: 1.25rem;
        height: 1.25rem;
    }

    img {
        width: 1.25rem;
        height: 1.25rem;
    }
}

.wager-wrap {

    font {
        color: #98a7b5;
        font-size: .875rem;
    }

    .wager-title {
        margin: .625rem 0;
    }

    .wager-block {
        padding: .625rem 1.25rem;
        background: #25262b;
        border-radius: .125rem;
        margin: 1.25rem 0;

        .percent {
            color: white;
            font-size: 1.875rem !important;
        }

        .game {
            font-size: .75rem;
            color: #575f6a;
        }
    }

    .rule-list {
        li {
            color: #98a7b5;
            margin: .625rem 0;
            font-size: .75rem;

            font {
                font-size: .75rem;
            }
        }
    }
}



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
</style>