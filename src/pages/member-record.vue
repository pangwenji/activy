<template>
	<page :show-header="!isPc">
		<div class="content page-pading">
			<!-- <public-banner position="person_banner"></public-banner> -->
			<div class="lable-div">
				<view class="user-wallet-view">

					<view class="user-wallet">
						<view class="user-wallet-team">

							<img class="i1 pc" src="@/assets/new/member-record/pc-icon-2.png" alt="">
							<img class="i1 h5" src="@/assets/new/member-record/money-one.png" alt="">
							<div class="pc-card">
								<text class="user-wallet-team-name">{{ t('pageMemberRecord.profit') }}</text>
								<text class="user-wallet-team-num">{{ unit }}{{ userData.total_bonus }}</text>
							</div>
						</view>
						<view class="user-wallet-team">
							<img class="i2 pc" src="@/assets/new/member-record/pc-icon-1.png" alt="">
							<img class="i2 h5" src="@/assets/new/member-record/money-all.png" alt="">
							<div class="pc-card">
								<text class="user-wallet-team-name">{{ t('pageMemberRecord.profit2') }}</text>
								<text class="user-wallet-team-num">{{ unit }}{{ userData.total_profit }}</text>
							</div>
						</view>
					</view>
				</view>

				<div class="divider h5"></div>

				<view class="fund-details-view">
					<record-table-menu :all="true" :today="true" @menu="changeMenu"></record-table-menu>

					<div class="table-card-k">
						<table-card class="table-card">
							<template #name>
								<table-cell class="cell" v-for="name in tableMenu">
									<template #cell>
										{{ name }}
									</template>
								</table-cell>
							</template>
							<table-row>

							</table-row>
							<template #row>
								<div class="empty empty-card " :data-empty="$t('ui.empty')" v-if="list.length === 0">
								</div>
								<table-row v-for="v in list" class="table-row">
									<table-cell class="cell">
										<template #cell>
											{{ v.game_type_name }}
										</template>
									</table-cell>
									<table-cell class="cell">
										<template #cell>
											{{ v.game_round }}
										</template>
									</table-cell>
									<table-cell class="cell">
										<template #cell>
											{{ v.bet_money }}
										</template>
									</table-cell>
									<table-cell class="cell">
										<template #cell>
											<span class="jia " v-if="v.profit_money > 0">+{{ v.profit_money }}</span>
											<span class="jian" v-else>{{ v.profit_money }}</span>
										</template>
									</table-cell>
								</table-row>
							</template>
						</table-card>
					</div>

					<!-- <div class="game-type-card">
						<div class="game-team" v-for="v in casinoClassify" @click="setType(v.id)"
							:class="{ 'game-team-ok': activeId == v.id }">{{ v.name }}</div>
					</div> -->
					<div class="bottom-1 h5">{{ t('pageMemberRecord.t1') }}</div>
					<div class="bottom-2 h5">{{ t('pageMemberRecord.t2') }}</div>
					<!-- <view class="circular-chart">
						<circular-chart-member :chartProps="chartProps" :categories="categories"></circular-chart-member>
					</view> -->
					<table-card class="table-card h5" :layout="true">
						<template #name>
							<table-cell :style="{ width: '7rem' }" class="cell">
								<template #cell>
									{{ t('pageMemberRecord.m1') }}
								</template>
							</table-cell>
							<table-cell class="cell">
								<template #cell>
									{{ t('pageMemberRecord.m2') }}
								</template>
							</table-cell>
						</template>
						<template #row>
							<div class="empty empty-card h5" :data-empty="$t('ui.empty')" v-if="gameData.length === 0">
							</div>
							<table-row v-for="v, i in gameData" class="table-row">
								<table-cell class="cell">
									<template #cell>
										{{ v.date }}
									</template>
								</table-cell>
								<table-cell class="cell">
									<template #cell>
										<div class="yk-team">
											<div class="jd"
												:class="{ 'y': Number(v.profit_money) >= 0, 's': Number(v.profit_money) < 0 }"
												:style="{
													'--abc': ( Number(v.profit_money) > 0 ? Number(v.profit_money)/1000 : -Number(v.profit_money) / 1000)  + '%'
												}"></div>
											<div class="yl"
												:class="{ 'yn': Number(v.profit_money) >= 0, 'sn': Number(v.profit_money) < 0 }">
												<span v-if="Number(v.profit_money) < 0">{{ v.profit_money }}</span>
												<span v-else>+{{ v.profit_money }}</span>
											</div>
										</div>
									</template>
								</table-cell>

							</table-row>
						</template>
					</table-card>



				</view>

				<div class="pc circular-card">

					<div class="circular-title">
						<span>丨</span>
						<span>{{ t('pageMemberRecord.t3') }}</span>
					</div>

					<view class="circular-chart">
						<circular-chart-member :chartProps="chartProps" :categories="categories"></circular-chart-member>
					</view>
				</div>
			</div>
		</div>

	</page>
</template>

<script setup lang="ts">
import TableCard from "../components/table-card.vue";
import TableCell from "../components/table-cell.vue";
import TableRow from "../components/table-row.vue";
import Page from '../components/page.vue'
import CircularChartMember from '../components/circular-chart-member.vue'
import PublicBanner from '../components/public-banner.vue'
import RecordTableMenu from '../components/record-table-menu.vue'
import PublicGameMenu from "../components/public-game-menu.vue";
import { ref } from 'vue';
import { addListener, dbGet } from '../uilts/db';
import { casinoClassify, isPc, unit } from '../uilts/async.var';
import { onLoad, onShow } from '../router/routes';
import { reverse } from "dns";
import { t } from "../uilts/i18n";

const activeId = ref<number>(2);
const chartProps = ref<Array<any>>([])
const categories = ref<Array<any>>([])
const userData = ref<any>({})
const list = ref<Array<any>>([])
let pro: Promise<GetGameDataStatistics["response"]>;
const isLoading = ref(false);
//获取个人数据
const getCollect = (time: GetGameDataStatistics["request"]["time_range"]) => {
	isLoading.value = true;
	pro && pro.abort();
	pro = '/api/game/getGameDataStatistics'.POST<GetGameDataStatistics>({
		time_range: time
	}, {
		Authorization: async () => await dbGet('token')
	});
	pro.then(ret => {
		chartProps.value.length = 0
		categories.value.length = 0
		list.value.length = 0
		userData.value = ret

		ret.game_details.forEach((v) => {

			list.value.push(v)

			// if (isPc.value) {
			// 	categories.value.push(v.game_type_name)
			// 	chartProps.value.push(v.total_bet - 0)
			// } else {

			// 	chartProps.value.push({ name: v.game_type_name, value: v.total_bet - 0 })
			// }
		})
		getGameDataByType(1)

	}).finally(() => {
		isLoading.value = false;
	})
}

const gameData = ref<any>([])
let proData: Promise<GetGameDataByType["response"]>;
//获取最近30天统计数据
const getGameDataByType = (type: number) => {
	isLoading.value = true;
	proData && proData.abort();
	proData = '/api/game/getGameDataByType'.GET<GetGameDataByType>({
		// game_type_id: type
	}, {
		Authorization: async () => await dbGet('token')
	});
	proData.then(ret => {
		// console.log(ret);
		categories.value.length = 0

		gameData.value = ret
		// console.log(gameData.value);

		ret.reverse().forEach((v) => {
			// (v.win_money > 0 || v.loss_money > 0 ) && 
			categories.value.push(v.date)
			chartProps.value.push(v.profit_money)
		})


	}).finally(() => {
		isLoading.value = false;
	})
}

const changeMenu = (data: GetGameDataStatistics["request"]["time_range"]) => {
	getCollect(data)
}

const setType = (id: any) => {
	activeId.value = id
	getGameDataByType(activeId.value)
}

const tableMenu = ref([
	t('pageMemberRecord.tabName1'),
	t('pageMemberRecord.tabName2'),
	t('pageMemberRecord.tabName3'),
	t('pageMemberRecord.winnings')
]);

const init = () => {
	tableMenu.value = [
		t('pageMemberRecord.tabName1'),
		t('pageMemberRecord.tabName2'),
		t('pageMemberRecord.tabName3'),
		t('pageMemberRecord.winnings')
	];
	getCollect("0")
	// getGameDataByType(activeId.value)
}

onLoad(() => {
	init();
	addListener('language', (type, _name) => {
		if (type === 'set') {
			init();
		}
	})
})
onShow(() => {
	init();
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.table-card-k {
	@include pc {
		margin-top: 20px;
		border: 1px solid #292547;
		border-radius: 8px;
		height: 722px;

		.table-row {
			height: 60px;
		}

		.cell {
			height: 60px;
			font-size: 14px;
		}
	}
}

@include pc {
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

	.circular-card {
		padding: 35px 40px;
		height: 772px;
		border-radius: 24px;
		background-color: #1D1A3F;
		margin-top: 64px;

		.circular-title {
			background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-size: 24px;
			font-style: normal;
			font-weight: 600;
		}
	}
}

.yk-team {
	@include h5 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.jd {
		width: 9.25rem;
		height: 0.3125rem;
		background-color: #120F25;
		position: relative;
	}

	.y::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: var(--abc);
		height: 0.3125rem;
		background-color: #0FF;
	}

	.s::before {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		width: var(--abc);
		height: 0.3125rem;
		background-color: #FF0000;
	}

	.yl {
		margin-right: 0.625rem;
	}

	.yn {
		color: #14D03D;
	}

	.sn {
		color: #FF0000;
	}
}

.bottom-1 {
	color: #ffdd25;
	// text-align: center;
	font-family: PingFang SC;
	font-size: 0.625rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}

.bottom-2 {
	// color: var(--TAB-, #5B6DA1);
	color: #fff;
	font-family: PingFang SC;
	font-size: 0.625rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}

// page {
// 	background-color: #1C1E22;
// 	padding-bottom: 6.2500rem;
// }

.game-type-card {
	display: flex;
	// justify-content: space-between;

	.game-team {
		padding: 0.2500rem 0.9375rem;
		border-radius: 0.2500rem;
		border-radius: 0.2500rem;
		border: 1px solid rgba(73, 70, 118, 0.50);
		background: rgba(32, 30, 71, 0.32);
		box-sizing: border-box;
		color: var(--TAB-, #5B6DA1);
		text-align: center;
		font-family: PingFang SC;
		font-size: 0.7500rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-right: 0.2500rem;
	}

	.game-team-ok {
		background: #2E2C5E;
		color: #0FF;
	}
}

.cell {
	// color: #8E90CD;
	color: #f0f0f0;
	text-align: center;
	font-family: PingFang SC;
	font-size: 0.7500rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}

.jia {
	color: #14D03D;
}

.jian {
	color: #FF007A;
	;
}

.content {
	// background-color: #1C1E22;
	// padding: 1.25rem 0.75rem 0 0.75rem;

	@include pc {
		// padding: 64px 66px;
	}
}

.scroll-table-muen {
	margin-top: 0.9375rem;
}

.scroll-table {
	margin-top: 0.9375rem;
}

.user-wallet-view {
	// margin-top: 2.5000rem;
	// padding: 0 0.6250rem;
	// background-color: #24262A;

	border-radius: 0.1087rem;

	.user-top {
		padding-bottom: 1rem;
	}

	.user-wallet {

		display: flex;
		justify-content: space-between;
		padding-bottom: 0.6250rem;
		gap: 0.625rem;

		.user-wallet-team {
			flex: 1;
			display: flex;
			border-radius: 0.5000rem;
			// background: #201E47;
			background: #1f1f1f;
			align-items: center;
			padding: 0.6250rem;
			height: 3.3125rem;

			@include pc {
				width: calc(50% - 63px);
				padding: 20px;
				height: 161px;
				border-radius: 24px;
			}

			.pc-card {
				padding-left: 0.625rem;
			}

			text {
				display: block;
			}

			.i1 {
				width: 1.96875rem;
				margin: 0 0.34rem;

				@include pc {
					width: 166px;
					height: 75px;
				}
			}

			.i2 {
				width: 2.03125rem;
				margin: 0 0.34rem;

				@include pc {
					width: 166px;
					height: 75px;
				}
			}

			.user-wallet-team-name {
				// color: #5B6DA1;
				color: #fff;
				font-size: 0.6875rem;
				font-weight: 400;

				@include pc {
					font-size: 22px;
				}
			}

			.user-wallet-team-num {
				color: #14D03D;
				font-size: 0.6875rem;
				padding-top: 0.12rem;
				text-align: left;
				margin-left: -2px;

				@include pc {
					color: #B5EBFF;
					font-size: 24px;
				}
			}
		}
	}
}

.fund-details-view {
	// margin: 0 0.7813rem;
	margin-top: 0;
	// padding: 0 0.6250rem;
	// background: #24262a;
	border-radius: 0.1087rem;
	// border-bottom: 0.0313rem solid #24262a;
	padding-top: 0.6250rem;

	@include pc {
		margin-top: 64px;
		padding: 35px 45px;
		background-color: #1D1A3F;
		min-height: 748px;
		border-radius: 24px;
	}
}

.record-table-view {
	display: flex;
	justify-content: space-around;
	margin-left: 0.3750rem;
	// margin-top: 1.6875rem;
	margin-right: 0.3750rem;

	text {
		display: block;
		text-align: center;
		margin-bottom: 1.2500rem;
		font-size: 0.7813rem;
	}

	.name {
		color: #9BA6B3;
		font-size: 0.7813rem !important;
		margin-bottom: 0.9375rem !important;
	}

	.types-of {
		color: #9BA6B3;

	}

	.entradas {
		color: #FEFEFE;
	}

	.quantidade {
		color: #65BE3D;
	}
}

.circular-chart {
	// margin: 0.6250rem 0.7813rem 0;
	padding: 0.6250rem 0 0;
	// background: #24262a;
	border-radius: 0.1087rem;
	// border-top: 0.0313rem solid #24262a;
}

.table-row {
	&:nth-child(even) {
		background: transparent !important;
	}
}
</style>