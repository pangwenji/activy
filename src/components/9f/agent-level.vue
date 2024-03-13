<template>
    <div class="page-k ">

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
            <div class="title-card cursor" @click="switchTab(4)">
                <span>{{ t('pageLevel.t1') }}</span>
                <public-svg class="right-icon" icon="icon_Arrow"
                    :style="{ width: '0.8750rem', fill: '#949494', height: '1.5000rem' }">
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
import TableRow from "@/components/9f/table-row.vue";
import PublicSvg from "@/components/public-svg.vue";
import Page from '@/components/page.vue'
import { ref, inject, watch } from "vue";
import { onLoad } from '@/router/routes';
import { dbGet } from '@/uilts/db';
import { t } from '@/uilts/i18n';
import { isPc, unit } from "@/uilts/async.var";

// const showMore = ref(false);
const props = withDefaults(defineProps<{
    isPulldown?: boolean,
    isPullup?: boolean,
}>(), {
    isPulldown: false,
    isPullup: false,
})
const emits = defineEmits(['update:isPulldown', 'update:isPullup',])

const list = ref<AgentLevel["response"]>({
    rules_type: "",
    rules: []
});
const switchTab = inject('switchTab');

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

watch(() => props.isPulldown, (newVal) => {
    if (newVal) {
        getAgentLevel()
        getAgentRule()
        setTimeout(() => {
            emits('update:isPulldown', false)
        }, 500)
    }
})



onLoad(() => {
    getAgentLevel()
    getAgentRule()
})
</script>

<style lang="scss" scoped>
@import "@/scss/public.scss";
@import "@/scss/common.scss";


.page-k {
    // padding: 0 0.6250rem;

    @include pc {
        // padding: 0 32px;
    }
}

.table-card {
    border-radius: 8px 8px 0px 0px;

    :deep(.row) {
        background: rgb(224, 224, 224) !important;
        font-family: 'SWISSC' !important;

        color: $tableTitleColor;
        font-weight: 600;
    }
}


.table-row {
    background: #f5f5f5 !important;
    font-family: 'SWISSC' !important;

    &:nth-child(odd) {
        background: rgb(224, 224, 224) !important;
    }
}

.title-card {
    display: flex;
    justify-content: space-between;
    padding: 0.5000rem 0.6250rem;
    border-radius: 0.5000rem;
    background: rgb(224, 224, 224);
    align-items: center;
    color: $cellColor;
    font-family: SWISCC;

    @include pc {
        padding: 16px 20px;
        border-radius: 16px;
        margin-top: 32px;
        margin-bottom: 32px;
    }

    span {
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
    font-family: SWISCC;

    .tip-team {
        padding-top: 0.6250rem;
        color: $cellColor;
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

    color: $cellColor;
}
</style>