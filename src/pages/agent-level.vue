<template>
    <page :head-box="isPc ? ['content', 'right'] : undefined" :show-scrollbar="true" :mouse-wheel="true">
        <div class="page-k page-pading">

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

    </page>
</template>

<script setup lang="ts">
import TableCard from "../components/table-card.vue";
import TableCell from "../components/table-cell.vue";
import TableRow from "../components/table-row.vue";
import PublicSvg from "../components/public-svg.vue";
import Page from '../components/page.vue'
isPc
import { ref } from "vue";
import { onLoad } from '../router/routes';
import { dbGet } from '../uilts/db';
import { t } from '../uilts/i18n';
import { isPc, unit } from "../uilts/async.var";

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
@import "../scss/public.scss";

.page-k {
    // padding: 0 0.6250rem;

    @include pc {
        // padding: 0 32px;
    }
}

.table-card {
    border-radius: 8px 8px 0px 0px;
    background-color: #231D4E;
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

.cell {
    @include pc {
        padding: 20px;
        font-size: 14px;
    }

    &:nth-child(1) {
        color: var(--MENU);
    }

    &:nth-child(2) {
        color: #FFFFFF;
    }

    &:nth-child(3) {
        color: #14D03D;
    }
}
</style>