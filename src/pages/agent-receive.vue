<template>
	<page :on-pullup="onReachBottom" :on-pulldown="onPullDownRefresh" :show-header="isPc ? false : true">
		<div class="page-k page-pading">
			<div class="head pc">
				<img src="@/assets/new/agent/fh.svg" class="xx-btn" @click="$back()" alt="">
				<span>{{ $t('pageAgent.receive') }}</span>
			</div>
			<div class="kk">
				<div class="tips h5"><span>*</span>{{ $t('pageAgent.ts1') }}</div>
				<div class="scroll-view introduce-meun-view">
					<div class="introduce-meun-team xx-btn" v-for="(item) in timeBtns"
						:class="{ 'introduce-meun-team-sign': totalIndex == item.value }"
						@click="switchTotalTime(item.value)">
						{{ item.name }}
					</div>
				</div>
				<div class="tips pc"><span>*</span>{{ $t('pageAgent.ts1') }}</div>
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
						<div class="empty empty-card" :data-empty="$t('ui.empty')" v-if="list.length === 0">
						</div>

						<table-row v-for="v in list" class="table-row">
							<table-cell class="cell">
								<template #cell>
									{{ v.create_time }}
								</template>
							</table-cell>
							<table-cell class="cell">
								<template #cell>
									{{ unit }}{{ v.amount }}
								</template>
							</table-cell>
							<table-cell class="cell">
								<template #cell>
									{{ unit }}{{ v.after_money }}
								</template>
							</table-cell>
						</table-row>
					</template>
				</table-card>

				<arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage" @click="onReachBottomBtn()">
				</arrow-more>
			</div>
		</div>

	</page>
</template>

<script setup lang="ts">
import TableCard from "../components/9f/table-card.vue";
import TableCell from "../components/9f/table-cell.vue";
import TableRow from "../components/9f/table-row.vue";
import Page from '../components/page.vue'
import ArrowMore from '../components/arrow-more.vue'
import { ref } from "vue";
import { onLoad } from '../router/routes';
import { dbGet } from '../uilts/db';
import { t } from '../uilts/i18n';
import { isPc, unit } from "../uilts/async.var";

// const showMore = ref(false);
const list = ref<GetReceiveCommissionLog["response"]["list"]>([]);

const tabs = [
	[
		t('pageAgent.rm1'),
		t('pageAgent.rm2'),
		t('pageAgent.rm3')
	],
]

const tabIndex = ref(0);
const totalIndex = ref<GetReceiveCommissionLog["request"]["time_range"]>('today');//today

const timeBtns = ref<Array<{
	name: string;
	value: GetReceiveCommissionLog["request"]["time_range"];
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
let Log: Promise<GetReceiveCommissionLog["response"]>;
const getCommissionLog = async () => {
	Log && Log.abort();
	Log = '/api/agent/getReceiveCommissionLog'.GET<GetReceiveCommissionLog>({
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
const switchTotalTime = (e: GetReceiveCommissionLog["request"]["time_range"]) => {
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

@include pc {
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
	// padding: 0.6250rem;

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
	color: white;

	span {
		color: #FF007A;
	}

	@include pc {
		color: var(--TAB-, #5B6DA1);
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
	}

	.introduce-meun-team {
		display: inline-block;
		font-size: 0.7819rem;
		color: var(--TAB-, #5B6DA1);
		padding: 0.2500rem 0;
		text-align: center;
		width: calc(25% - 0.4688rem);
		border-radius: 0.2500rem;
		background: rgb(227, 233, 231);

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
		background-color: #009d81 !important;
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

:deep(.row) {
	background: rgb(224, 224, 224) !important;
	color: #5B6DA1;
}

.table-card {
	margin-top: .625rem;
	background: rgb(224, 224, 224) !important;

}

.table-row {
	background: #f5f5f5 !important;

	&:nth-child(odd) {
		background: rgb(224, 224, 224) !important;

	}
}

.cell {
	color: #5B6DA1;
}
</style>