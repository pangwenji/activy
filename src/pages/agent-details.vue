<template>
	<page :on-pulldown="onPullDownRefresh" :on-pullup="onReachBottom">
		<view class="table-view page-pading">

			<view class="tabs">

				<view class="tabs-view">
					<view class="empty" :data-empty="$t('ui.empty')" v-if="!list.length"></view>
					<view class="table" v-else>
						<view class="table-row head">
							<view class="table-cell" v-for="name in tabs[tabIndex]">{{ name }}</view>
						</view>
						<view class="table-row" v-for="item,index in list" :key="index">
							<!-- <view class="table-cell">
								<view class="ellipsis">
									{{index+1}}
								</view>
							</view> -->
							<view class="table-cell">
								<view class="ellipsis">
									{{item.game_type_name}}
								</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis white">
									{{item.total_performance}}
								</view>
							</view>
							<!-- <view class="table-cell">
								<view class="ellipsis">
									{{item.total_team_commission}}+
								</view>
							</view> -->

						</view>
					</view>
					<arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage" @click="onReachBottomBtn()">
					</arrow-more>
					<!-- <view class="arrow" :class="{active:showMore}" @click="showMore = !showMore">
						Mostre mais
					</view> -->
				</view>
			</view>
		</view>
	</page>
</template>

<script setup lang="ts">
import Page from "../components/page.vue"
	import ArrowMore from "../components/arrow-more.vue"
	import { ref } from "vue";
	import { t } from "../uilts/i18n";
import { dbGet } from "../uilts/db";
import { onLoad, onShow } from "../router/routes";

	const list = ref<FindUserMess["response"]["list"]>([]);
	const tabIndex = ref(0);
	const tabs = [
		[
			// t('pageAgentDetails.ranking'),
			t('pageVipRecord.type'),
			t('pageAgentDetails.performance'),
			// t('pageAgentDetails.contribute'),

		],
	]

	let pages = ref(1)
	let limit = 20
	let lastPage = ref(1)
	const showMore = ref(false);
	let gid = 0
	let gdate:FindUserMess["request"]["dateType"] = ""

	//搜索玩家
	const findUserMess = async (user_id:number, date:FindUserMess["request"]["dateType"]) => {
		let ret = await '/api/agent/findUserMessDetails'.POST<FindUserMess>({
			dateType: date,
			user_id: user_id,
			page: pages.value,
			limit
		}, {
			Authorization: async () => await dbGet('token')
		})
		ret.list.forEach((v) => {
			list.value.push(v)
		})
		showMore.value = false
		lastPage.value = Math.ceil(ret.totalCount / limit)
	}


	

	const onReachBottomBtn = async () => {
		if (lastPage.value > pages.value) {
			pages.value += 1
			showMore.value = true
			await findUserMess(gid, gdate)
		}
	}

	const onPullDownRefresh = async () => {
		list.value.length = 0
		pages.value = 1
		await findUserMess(gid, gdate)
	}

	const onReachBottom = async () => {
		if (lastPage.value > pages.value) {
			pages.value += 1
			showMore.value = true
			await findUserMess(gid, gdate)
		}
	}

	onLoad((get:any) => {
		gid = get.id
		gdate = get.date
		findUserMess(get.id, get.date)
	})

	onShow((get:any) => {
		gid = get.id
		gdate = get.date
		list.value.length = 0
		pages.value = 1
		findUserMess(get.id, get.date)
	})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
	.content{
		padding-top: 0.9375rem;
	}
	.washing-card {
		padding: 0.9375rem 0;
		margin: 0.9375rem 0.7813rem;
		background-color: #1C1E22;
		border-radius: 0.1084rem;

		.washing-card-head {
			margin-left: 1.0938rem;
			margin-right: 1.0938rem;
			margin-top: 0.6250rem;
			display: flex;
			border-bottom: 0.0625rem solid #5D5D5D;
			padding-bottom: 1.0938rem;

			.washing-card-head-m {
				width: 4.4688rem;
				height: 3.2500rem;
			}

			.washing-card-head-num {
				margin-left: 0.9375rem;

				text {
					display: block;
				}

				.washing-card-head-title {
					font-size: 0.7813rem;
					color: #9BA6B3;
				}

				.washing-card-head-mon {
					font-size: 1.5625rem;
					color: #65BE3D;
				}
			}
		}

		.washing-card-bottom {
			padding: 1.0625rem 0 0.6250rem;
			margin-left: 1.0938rem;
			margin-right: 1.0938rem;
			display: flex;

			.washing-card-bottom-nao {
				text {
					display: block;
				}

				.washing-card-bottom-nao-num {
					font-size: 1.5625rem;
					color: #65BE3D;
				}

				.washing-card-bottom-nao-title {
					font-size: 1.0313rem;
					color: #FFFFFF;
				}
			}

			.washing-card-bottom-button {
				width: 11.3125rem;
				height: 3.0625rem;
				line-height: 3.0625rem;
				text-align: center;
				border-radius: 0.1084rem;
				background-color: #2D3034;
				margin-right: 0;
				font-size: 0.7813rem;
				color: #2AE035;
				font-weight: bold;
				margin-top: 0.9375rem;
			}
		}
	}

	.scroll-view {
		::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		}

		white-space: nowrap;
		width: calc(100% - 1.8750rem);
		margin: 0 0.7813rem;
		height: 2.6250rem;
		line-height: 2.6250rem;
		// background-color: #1C1E22;
		border-radius: 0.1087rem;
		margin-top: 1.0938rem;

		.introduce-meun-team {
			display: inline-block;
			font-size: 0.7819rem;
			color: #FFFFFF;
			padding: 0 0.9375rem;
			height: 2.6250rem;
			margin-right: 0.6250rem;
			background-color: #1E2024 !important;
		}

		.introduce-meun-team-sign {
			background-color: #2D3034 !important;
		}
	}

	.table-view {
		// margin-left: 0.7813rem;
		// margin-right: 0.7813rem;
		// margin-top: 1.0938rem;
		// background-color: #1C1E22;
	}


	.tabs {
		background-color: var(--bgcolor);
		padding: 0.6250rem 0;
		font-size: 0.7500rem;

		.tabs-scroll {
			// padding:0 0.6250rem;
			// height:2.9688rem;
			width: calc(100% - 1.2500rem);
			margin: 0 auto;
		}

		.tabs-navs {
			// margin:0 0.6250rem;
			display: flex;
			background-color: #24262A;
			white-space: nowrap;
			// overflow-x: auto;
			// justify-content: space-between;
		}

		.tabs-nav {
			flex-shrink: 0;
			width: 7.6875rem;
			height: 2.9688rem;
			@extend %flex-center;
			color: #98A7B5;
			background-color: #24262A;

			&.active {
				background-color: #2D3034;
				font-weight: 700;
				color: #f5f6f7;
			}
		}
	}

	.table {
		width: 100%;
		color: #98A7B5;
		font-size: 0.7500rem;
		text-align: center;
		font-weight: 600;

		.ellipsis {
			max-width: calc((100vw - 1.2500rem) / 4);
		}

		.table-cell {
			direction: unset;
			height: 2.8750rem;
			vertical-align: middle;

			&:nth-child(1) {
				text-align: left;
				direction: ltr;
				padding-left: 0.6250rem;
			}

			&:last-child {
				text-align: right;
				direction: rtl;
				padding-right: 0.6250rem;
			}
		}

		.table-row {
			cursor: pointer;
			// display: flex;
			&:not(.head):active {
				background-color: #2D3034;
			}

			&:not(.head) .table-cell {
				color: #98A7B5;

				&:last-child {
					position: relative;
					color: #3BC117;
				}

				&:last-child::after {
					content: "";
					bottom: 0;
					right: 0;
					width: 3.1250rem;
					height: 0.3125rem;
					background-color: #2AE035;
				}

				&:nth-child(2) {
					color: #FFF;
				}
			}

			image {
				width: 0.8125rem;
				height: 0.8125rem;
				display: inline-block;
				vertical-align: middle;
				margin-top: -0.3125rem;
			}
		}

		.head {
			color: #98A7B5;
			font-size: 0.7500rem;
			font-weight: normal;
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

	.text-btn {
		font-weight: normal;
		text-decoration: underline;
	}

	.white {
		color: #FFFFFF;
	}
	
	@media (min-width:9999px) {
		.table-view{
			min-height: 70vh;
		}
	}
</style>
