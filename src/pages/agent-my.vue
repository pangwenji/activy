<template>
	<page :on-pullup="onReachBottom" :on-pulldown="onPullDownRefresh">
		<div class="page-k page-pading">
			<div class="tips"><span>*</span>只展示近30日我的返佣数据</div>
			<div class="scroll-view introduce-meun-view">
				<div class="introduce-meun-team" v-for="(item) in timeBtns"
					:class="{ 'introduce-meun-team-sign': totalIndex == item.value }" @click="switchTotalTime(item.value)">
					{{ item.name }}
				</div>
			</div>
			<!-- <scroll-view :show-scrollbar="false" class="scroll-view introduce-meun-view" :scroll-x="true">
				<view class="introduce-meun-team" v-for="(item) in timeBtns"
					:class="{ 'introduce-meun-team-sign': totalIndex == item.value }" @click="switchTotalTime(item.value)">
					{{ item.name }}
				</view>
			</scroll-view> -->

			<table-card>
				<template #name>
					<table-cell v-for="name in tabs[tabIndex]">
						<template #cell>
							{{ name }}
						</template>
					</table-cell>
				</template>
				<template #row>
					<table-row v-for="_i in 10" class="table-row">
						<table-cell class="cell">
							<template #cell>
								2023-11-23 18:00:00
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								￥5000.00
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								160/万
							</template>
						</table-cell>
                        <table-cell class="cell">
							<template #cell>
								￥5000.00
							</template>
						</table-cell>
					</table-row>
				</template>
			</table-card>

			<arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage" @click="onReachBottomBtn()">
			</arrow-more>
		</div>

	</page>
</template>

<script setup lang="ts">
import TableCard from "../components/table-card.vue";
import TableCell from "../components/table-cell.vue";
import TableRow from "../components/table-row.vue";
import Page from '../components/page.vue'
import ArrowMore from '../components/arrow-more.vue'
import { ref } from "vue";
import { onLoad } from '../router/routes';
import { dbGet } from '../uilts/db';
import { t } from '../uilts/i18n';

// const showMore = ref(false);
const list = ref<GetCommissionLog["response"]["list"]>([]);

const tabs = [
	[
		"日期",
		"有效投注",
		"返佣比例",
        "返佣金额"
	],
]

const tabIndex = ref(0);
const totalIndex = ref<GetCommissionLog["request"]["time_range"]>('today');//today

const timeBtns = ref<Array<{
	name: string;
	value: GetCommissionLog["request"]["time_range"];
}>>([
	{ name: t('pageRebateRatio.menu'), value: 'today' },
	{ name: t('pageRebateRatio.menu1'), value: 'yesterday' },
	{ name: t('pageRebateRatio.menu4'), value: 'month' },
	{ name: t('pageRebateRatio.menu5'), value: 'last_month' },
])

const pages = ref(1)
const lastPage = ref(1)
const limit = 20
const showMore = ref(false)

// /api/agent/getCommissionLog
let Log: Promise<GetCommissionLog["response"]>;
const getCommissionLog = async () => {
	Log && Log.abort();
	Log = '/api/agent/getCommissionLog'.POST<GetCommissionLog>({
		time_range: totalIndex.value,
		page: pages.value,
		limit: limit
	}, {
		Authorization: async () => await dbGet('token')
	})
	let ret = await Log
	ret.list.forEach((v) => {
		list.value.push(v)
	})
	showMore.value = false
	lastPage.value = Math.ceil(ret.totalCount / limit)
}
//switchTotalTime
const switchTotalTime = (e: GetCommissionLog["request"]["time_range"]) => {
	list.value.length = 0
	pages.value = 1
	totalIndex.value = e
	getCommissionLog()
}
const onReachBottomBtn = async () => {
	if (lastPage.value > pages.value) {
		showMore.value = true
		pages.value += 1
		await getCommissionLog()
	}
}

const onPullDownRefresh = async () => {
	list.value.length
	pages.value = 1
	await getCommissionLog()
}

const onReachBottom = async () => {
	if (lastPage.value > pages.value) {
		showMore.value = true
		pages.value += 1
		await getCommissionLog()
	}
}

onLoad(() => {
	getCommissionLog()
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.page-k {
	// padding: 0.6250rem;
}

.tips {
    // padding-top: 0.6250rem;
	font-size: 0.7500rem;
	color: var(--TAB-, #5B6DA1);

	span {
		color: #FF007A;
	}
}

.scroll-view {
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	white-space: nowrap;
	width: 100%;
	border-radius: 0.1087rem;
	// margin-top: 1.0938rem;
	padding-top: 0.625rem;
	display: flex;
	justify-content: space-between;
	.introduce-meun-team {
		display: inline-block;
		font-size: 0.7819rem;
		color: var(--TAB-, #5B6DA1);
		padding: 0.2500rem 0;
		text-align: center;
		width: calc(25% - 0.4688rem);
		border-radius: 0.2500rem;
		background: #201E47;
		// margin-right: 0.6250rem;
	}

	.introduce-meun-team-sign {
		background-color: #2E2C5E !important;
		color: #FFFFFF;
	}
}

.loading {
	min-height: 9.3750rem;
}

.arrow {
	background-color: #24262A;
	width: 7.8125rem;
	height: 2.0000rem;
	@extend %flex-center;
	color: #9BA6B3;
	font-size: 0.8125rem;
	margin: 0 auto;
	margin-top: 0.6250rem;

	&::after {
		content: '';
		display: block;
		width: 0.7500rem;
		height: 0.5000rem;
		background: url(@/assets/index/arrow-bottom.png);
		background-size: 100%;
		margin-left: 0.8125rem;
	}

	&.active::after {
		transform: rotateX(180deg);
	}
}

.cell {
	&:nth-child(1) {
		color: var(--MENU);
	}

	&:nth-child(2) {
		color: #FFFFFF;
	}

	&:nth-child(3) {
		color: #14D03D;
	}
    &:nth-child(4) {
		color: #14D03D;
	}
}</style>