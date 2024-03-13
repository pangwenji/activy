<template>
	<page :on-pullup="onReachBottom" :on-pulldown="onPullDownRefresh" :show-header="isPc ? false : true">
		<div class="page-k page-pading">
			<div class="head pc">
				<img class="xx-btn" src="@/assets/new/agent/fh.svg" @click="$back()" alt="">
				<span>{{ $t('pageAgent.team') }}</span>
			</div>
			<div class="kk">
				<search-input class="search-input h5" v-model="user"  @input="input" @confirm="input" :placeholder="$t('pageAgent.input')"></search-input>
				<div class="tips h5"><span>*</span>{{ $t('pageAgent.ts1') }}</div>
				<div class="scroll-view introduce-meun-view">
					<div class="scroll-view">
						<div class="introduce-meun-team xx-btn" v-for="(item) in timeBtns"
						:class="{ 'introduce-meun-team-sign': totalIndex == item.value }"
						@click="switchTotalTime(item.value)">
						{{ item.name }}
					</div>
					</div>
					

					<div>
						<search-input class="search-input pc" v-model="user" :type="true" @input="input" @confirm="input" :placeholder="$t('pageAgent.input')"></search-input>
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

				<ui-pagination class="pagination" v-if="isPc && list.length" v-model="pages" :pages="lastPage"
					@change="getCommissionLog()"></ui-pagination>

				<!-- <arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage" @click="onReachBottomBtn()">
				</arrow-more> -->
			</div>
		</div>

	</page>
</template>

<script setup lang="ts">
import UiPagination from "../components/ui-pagination.vue"
import TableCard from "../components/table-card.vue";
import TableCell from "../components/table-cell.vue";
import TableRow from "../components/table-row.vue";
import SearchInput from "../components/search-input.vue"
import Page from '../components/page.vue'

import { ref } from "vue";
import { onLoad } from '../router/routes';
import { dbGet } from '../uilts/db';
import { t } from '../uilts/i18n';
import { isPc, unit } from "../uilts/async.var";

// const showMore = ref(false);
const list = ref<GetTeamCommissionLog["response"]["list"]>([]);
const user = ref('')

const tabs = [
	[
		t("pageAgent.teamName1"),
		t("pageAgent.teamName2"),
		t("pageAgent.teamName3")
	],
]

const tabIndex = ref(0);
const totalIndex = ref<GetTeamCommissionLog["request"]["time_range"]>('today');//today

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
	// console.log();
	
}
//switchTotalTime
const switchTotalTime = (e: GetTeamCommissionLog["request"]["time_range"]) => {
	list.value.length = 0
	pages.value = 1
	totalIndex.value = e
	getCommissionLog()
}

const input = async () =>{
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

onLoad(() => {
	getCommissionLog()
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

@include pc {

	.introduce-meun-view{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.search-input{
			height: 48px;
			margin-bottom: 20px;
			color: #5B6DA1 !important;
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

.search-input {
	margin-bottom: 1.25rem;
}

.page-k {
	// padding: 1.25rem 0.6250rem;

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
	color: var(--TAB-, #5B6DA1);

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
		padding-top: 0;
	}

	.introduce-meun-team {
		display: inline-flex;
		font-size: 0.7819rem;
		color: #5B6DA1;
		text-align: center;
		width: calc(25% - 0.4688rem);
		border-radius: 0.2500rem;
		background: #201E47;
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
		background-color: #2E2C5E;
		color: #0FF;
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