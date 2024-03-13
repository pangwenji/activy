<template>
	<div class="page-k ">
		<div class="head pc">
			<img class="xx-btn" src="@/assets/new/agent/fh.svg" @click="$back()" alt="">
			<span>{{ $t('pageAgent.team') }}</span>
		</div>

		<div class="kk">
			<!-- <div class="tips h5"><span>*</span>{{ $t('pageAgent.ts1') }}</div>
			<div class="scroll-view introduce-meun-view">
				<div class="scroll-view">
					<div class="introduce-meun-team xx-btn" v-for="(item) in timeBtns"
						:class="{ 'introduce-meun-team-sign': totalIndex == item.value }"
						@click="switchTotalTime(item.value)">
						{{ item.name }}
					</div>
				</div>
			</div> -->
			<div class="tips pc"><span>*</span>{{ $t('pageAgent.ts1') }}</div>

			<table-card :customStyle="{ background: '#e0e0e0' }">
				<template #name>
					<table-cell v-for="name in tabs[tabIndex]">
						<template #cell>
							{{ name }}
						</template>
					</table-cell>
				</template>
				<template #row>
					<div class="empty empty-card" :data-empty="$t('ui.empty')" v-if="list.length === 0">
					</div>
					<table-row v-for="v in list" class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ v.user_name }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								{{ unit }}{{ v.self_bet }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								{{ unit }}{{ v.team_commission }}
							</template>
						</table-cell>
					</table-row>
				</template>
			</table-card>

			<!-- <ui-pagination class="pagination" v-if="isPc && list.length" v-model="pages" :pages="lastPage"
					@change="getCommissionLog()"></ui-pagination> -->

			<!-- <arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage" @click="onReachBottomBtn()">
			</arrow-more> -->
		</div>

	</div>
</template>

<script setup lang="ts">
import UiPagination from "../components/ui-pagination.vue"
import TableCard from "../components/9f/table-card.vue";
import TableCell from "../components/9f/table-cell.vue";
import TableRow from "../components/9f/table-row.vue";
import Page from '../components/page.vue'
import ScrollView from "../components/scroll-view.vue";

import { ref, onActivated, watch } from "vue";
import { onLoad } from '../router/routes';
import { dbGet } from '../uilts/db';
import { t } from '../uilts/i18n';
import { isPc, unit } from "../uilts/async.var";

// const showMore = ref(false);
const list = ref<GetTeamCommissionLog["response"]["list"]>([]);
const user = ref('')
const props = withDefaults(defineProps<{
	isPulldown?: boolean,
	isPullup?: boolean,
}>(), {
	isPulldown: false,
	isPullup: false,
})
const emits = defineEmits(['update:isPulldown', 'update:isPullup',])


const tabs = [
	[
		t("pageAgent.teamName1"),
		t("pageAgent.teamName2"),
		t("pageAgent.teamName3")
	],
]

const tabIndex = ref(0);
const totalIndex = ref<GetTeamCommissionLog["request"]["time_range"]>('month');//today

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
const limit = isPc.value ? 10 : 20
const showMore = ref(false)

// /api/agent/getCommissionLog
let Log: Promise<GetTeamCommissionLog["response"]>;
const getCommissionLog = async () => {
	Log && Log.abort();
	Log = '/api/agent/getTeamCommissionLog'.GET<GetTeamCommissionLog>({
		user: user.value,
		time_range: totalIndex.value,
		page: pages.value,
		limit: limit
	}, {
		Authorization: async () => await dbGet('token')
	})
	let ret = await Log
	if (isPc.value) {
		list.value.length = 0
	}

	ret.list.forEach((v) => {
		list.value.push(v)
	})

	showMore.value = false
	lastPage.value = Math.ceil(ret.totalCount / limit)
}
//switchTotalTime
const switchTotalTime = (e: GetTeamCommissionLog["request"]["time_range"]) => {
	list.value.length = 0
	pages.value = 1
	totalIndex.value = e
	getCommissionLog()
}

const input = async () => {
	// console.log(1111);

	list.value.length = 0
	pages.value = 1
	await getCommissionLog()
}

const onPullDownRefresh = async () => {
	list.value.length = 0
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

watch(() => props.isPulldown, (newVal) => {
	if (newVal) {
		onPullDownRefresh()
		setTimeout(() => {
			emits('update:isPulldown', false)
		}, 500)
	}
})

watch(() => props.isPullup, (newVal) => {
	if (newVal) {
		onReachBottom();
		setTimeout(() => {
			emits('update:isPullup', false)
		}, 500)
	}
})


onActivated(() => {
	list.value = [];
	getCommissionLog()
})

onLoad(() => {
	// getCommissionLog()
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
@import "../scss/common.scss";


:deep(body) {
	background-color: rgb(237, 237, 237);
}

:deep(.page-k) {
	margin: 0 .9375rem;
	border-radius: 0.25rem;
	height: calc(100vh - 10.5rem);
}

:deep(.empty:empty::after) {
	color: grey;
}

:deep(.kk) {
	.table-cell {
		color: $cellColor;
		border-bottom: .1rem solid #ccc;
	}
}

@media (max-width: 9999px) {
	.empty.empty-card {}
}

@include pc {
	.introduce-meun-view {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.search-input {
			height: 48px;
			margin-bottom: 20px;
			color: $cellColor !important;
		}
	}

	.head {
		display: flex;
		align-items: center;
		padding-bottom: 30px;

		img {
			width: 20px;
			height: 20px;
		}

		span {
			color: var(--MENU, #8E90CD);
			font-family: PingFang SC;
			font-size: 20px;
			font-style: normal;
			font-weight: 600;
			line-height: normal;
			padding-left: 20px;
		}
	}

	.pagination {
		margin-top: 30px;
	}

	.empty-card {
		display: table-row-group;
		text-align: center;
		position: relative;
		height: 480px;

		&::after {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
		}
	}
}

.page-k {

	@include pc {
		// padding: 66px;


		.kk {
			background: #1D1A3F;
			border-radius: 24px;
			padding: 35px 45px;
		}
	}
}

.tips {
	// padding-top: 0.6250rem;
	font-size: 0.7500rem;
	color: gray;

	span {
		color: #FF007A;
	}

	@include pc {
		color: var(--TAB-, $cellColor);
		font-family: PingFang SC;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-bottom: 20px;
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

	@include h5 {
		justify-content: space-between;
	}

	@include pc {
		padding-bottom: 20px;
		padding-top: 0;
	}

	.introduce-meun-team {
		display: inline-flex;
		font-size: 0.7819rem;
		color: #fff;
		text-align: center;
		width: calc(25% - 0.4688rem);
		border-radius: 0.2500rem;
		background: gray;
		height: 1.56rem;
		align-items: center;
		justify-content: center;

		// margin-right: 0.6250rem;
		@include pc {
			display: flex;
			width: 120px;
			height: 48px;
			// padding: 8px 30px;
			justify-content: center;
			align-items: center;
			gap: 10px;
			font-size: 16px;
			margin-right: 20px;
			border-radius: 8px;
		}
	}

	.introduce-meun-team-sign {
		background-color: #009d80;
		color: #fff;
	}
}

.loading {
	min-height: 9.3750rem;
}

.table-card {
	:deep(.row) {
		font-family: 'SWISSC' !important;

		.table-cell {
			color: $tableTitleColor;
			font-weight: 600;
		}
	}
}

.table-row:nth-child(even) {
	background: #f5f5f5 !important;

	.cell {
		font-family: 'SWISSC' !important;

		&:nth-child(1) {
			color: $cellColor;
		}

		&:nth-child(2) {
			color: $cellColor;
		}
	}
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

	@include pc {
		font-size: 14px;
	}

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
</style>