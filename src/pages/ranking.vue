<template>
	<page>
		<view class="vip-menu">
			<view :class="{'vip-menu-sign':menu == 1}" @click="setMenu(1)">{{$t('pageRanking.profit')}}</view>
			<view :class="{'vip-menu-sign':menu == 2}" @click="setMenu(2)">{{$t('pageRanking.promotion')}}</view>
		</view>

		<view class="promo-view">

			<view class="first-place-card" v-if="list.length > 0">
				<view>
					<img class="top-user-kuang" src="@/assets/ranking/2.png" mode="" />
					<img class="top-user" :src="list[1].portrait ? list[1].portrait : userImg" mode="" />
					<view class="name w50 w60">{{list[1].username ?? '------' }}</view>
					<view class="level">VIP{{list[1].level ?? 0}}</view>
					<view class="profit" v-show="menu == 1">{{unit + numFilter(list[1].score ?? 0) }}
					</view>
					<view class="profit" v-show="menu == 2">{{unit + numFilter(list[1].score ?? 0)}}
					</view>
				</view>
				<view>
					<img class="top-user-kuang first-kuang" src="@/assets/ranking/1.png" mode="" />
					<img class="top-user first" :src="list[0].portrait ? list[0].portrait : userImg" mode="" />
					
					<view class="name w50 w60">{{list[0].username ?? '------' }}</view>
					<view class="level">VIP{{list[0].level ?? 0}}</view>

					<view class="profit" v-show="menu == 1">{{unit + numFilter(list[0].score ?? 0)}}
					</view>
					<view class="profit" v-show="menu == 2">{{unit + numFilter(list[0].score ?? 0)}}
					</view>
				</view>
				<view>
					<img class="top-user-kuang" src="@/assets/ranking/2.png" mode="">
					<img class="top-user" :src="list[2].portrait ? list[2].portrait : userImg" mode="" />
					<view class="name w50 w60">{{list[2].username ?? '------' }}</view>
					<view class="level">VIP{{list[2].level ?? 0}}</view>
					<view class="profit" v-show="menu == 1">{{unit + numFilter(list[2].score ?? 0)}}
					</view>
					<view class="profit" v-show="menu == 2">{{unit + numFilter(list[2].score ?? 0)}}
					</view>
				</view>
			</view>

			<view class="ad-card">
				<img src="@/assets/ranking/d.png" mode="" />
			</view>

			<view class="table-view">
				<view class="tabs">
					<view class="tabs-view">
						<!-- <public-loading class="loading" v-if="!list.length || list.length === 3"></public-loading> -->
						<view class="empty" :data-empty="$t('ui.empty')" v-if="!list.length || list.length === 3"></view>
						<view class="table" v-else>
							<view class="table-row head">
								<view class="table-cell">{{$t('pageRanking.menu1')}}</view>
								<view class="table-cell">{{$t('pageRanking.menu2')}}</view>
								<view class="table-cell">{{$t('pageRanking.menu3')}}</view>
								<view class="table-cell" v-show="menu == 1">{{$t('pageRanking.menu4')}}</view>
								<view class="table-cell" v-show="menu == 2">{{$t('pageRanking.menu5')}}</view>

							</view>
							<view class="table-row" v-for="item,index in list" :key="index" v-show="index > 2">
								<view class="table-cell">
									<view class="ellipsis">
										{{index+1}}
									</view>
								</view>
								<view class="table-cell">
									<view class="ellipsis w50">
										{{item.username}}
									</view>
								</view>
								<view class="table-cell">
									<view class="ellipsis">
										VIP{{item.level}}
									</view>
								</view>

								<view class="table-cell" :class="{add:index%2 === 0}">

									<view class="ellipsis ">
										{{unit + numFilter(item.score)}}
									</view>
								</view>
							</view>
						</view>
						<!-- <view class="arrow" :class="{active:showMore}" @click="showMore = !showMore">
							Mostre mais
						</view> -->
					</view>
				</view>
			</view>

		</view>
	</page>

</template>

<script setup lang="ts">
import Page from '../components/page.vue'
	import { ref } from "vue"
import { dbGet } from '../uilts/db';
import { unit } from '../uilts/async.var';
import userImg from '@/assets/user/user.png'

	let menu = ref<number>(1)
	let list = ref<GetTopUsers["response"]>([
		{ username: '', level: 0, score: 0 , portrait: ""},
		{ username: '', level: 0, score: 0 , portrait: ""},
		{ username: '', level: 0, score: 0 , portrait: ""}
	])

	//盈利排行榜
	let topUser : Promise<GetTopUsers["response"]>;
	const getTopUsers = () => {
		topUser && topUser.abort();
		topUser = '/api/profit/getTopUsers'.GET<GetTopUsers>(null, {
			Authorization: async () => await dbGet('token')
		})
		topUser.then(ret => {
			list.value.length = 0
			ret.forEach((v) => {
				list.value.push(v)
			})

			if (list.value.length < 3) {
				let j = 3 - list.value.length
				for (let i = 0; i < j; i++) {
					list.value.push({ username: '', level: 0, score: 0, portrait: '' })
				}
			}
		})
	}

	const numFilter = (value:number) => {
		let realVal = Number(value).toFixed(1)
		return realVal
	}

	//推广排行榜
	let topAgent : Promise<GetAgentTopUsers["response"]>;
	const getAgentTopUsers = () => {
		topAgent && topAgent.abort();
		topAgent = '/api/agent/getTopUsers'.GET<GetAgentTopUsers>(null, {
			Authorization: async () => await dbGet('token')
		})
		topAgent.then(ret => {
			list.value.length = 0
			ret.forEach((v) => {
				list.value.push(v)
			})

			if (list.value.length < 3) {
				let j = 3 - list.value.length
				for (let i = 0; i < j; i++) {
					list.value.push({ username: '', level: 0, score: 0, portrait: '' })
				}
			}
		})
	}

	const setMenu = (i:number) => {
		list.value = [
			{ username: '', level: 0, score: 0 , portrait: ""},
			{ username: '', level: 0, score: 0 , portrait: ""},
			{ username: '', level: 0, score: 0 , portrait: ""}
		]
		if (i == 1) {
			getTopUsers()
		} else {
			getAgentTopUsers()
		}
		menu.value = i
	}

	getTopUsers()
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
	// page {
	// 	background-color: var(--body-background-color);
	// }

	.w50 {
		margin: auto;
		width: 3.1250rem;
		flex-wrap: nowrap;
		word-break: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: middle;
		overflow: hidden;
	}

	.w60 {
		width: 3.4375rem;
	}

	.menu-card {
		margin-left: 0.7813rem;
		margin-right: 0.7813rem;
		background-color: #1C1E22;
		border-radius: 0.1087rem;
		margin-top: 0.6250rem;
		margin-bottom: 1.1250rem;
	}

	// .content {}

	.vip-menu {
		padding-left: 0.7813rem;
		padding-right: 0.7813rem;
		padding-top: 0.1563rem;
		position: sticky;
		top: calc(var(--window-top));
		background-color: #24262A;
		z-index:calc(var(--I1) + 0);
		display: flex;
		justify-content: space-around;
		font-size: 0.7813rem;
		color: #9BA6B3;
		font-weight: bold;
		text-align: center;

		&>view {
			width: 48%;
			height: 1.9063rem;
			line-height: 1.9063rem;
			border-bottom: 0.0938rem solid #828282;
		}

		.vip-menu-sign {
			opacity: 1;
			background: linear-gradient(0deg, rgba(42, 224, 53, 0.3) 0%, rgba(42, 224, 53, 0) 100%);
			color: #FFFFFF;
			border-bottom: 0.0938rem solid #2AE035;
		}
	}

	.first-place-card {
		padding-top: 3.7500rem;
		display: flex;
		justify-content: center;
		background-image: url(@/assets/ranking/x.png), url(@/assets/ranking/w.png);
		background-repeat: no-repeat, no-repeat;
		background-size: 3.1875rem 3.2500rem, 1.3438rem 1.3438rem;
		background-position: 3.5938rem 2.1875rem, right 1.5625rem top 6.7813rem;
		text-align: center;
		line-height: 1.2500rem;
		view{
			position: relative;
		}
		.top-user-kuang{
			position: absolute;
			top: 2.8125rem;
			z-index:calc(var(--I1) + 0);
			width: 4.3750rem;
			height: 4.7500rem;
			left: 0;
		}
		.top-user {
			display: block;
			width: 4.0625rem;
			height: 4.0625rem;
			margin-top: 3.1250rem;
			margin-left: 0.1563rem;
			border-radius: 50%;
		}
		.first-kuang{
			width: 5.8750rem;
			height: 6.0000rem;
			top:-0.3125rem;
			left: 50%;
			transform: translateX(-50%);
		}
		.first {
			width: 5.0000rem;
			height: 5.0000rem;
			margin-top: 0.3125rem;
			margin-left: 1.8750rem;
			margin-right: 1.5625rem;
		}

		.name {
			font-size: 0.7813rem;
			color: #FFFFFF;
		}

		.level {
			font-size: 0.7813rem;
			color: #9BA6B3;
		}

		.profit {
			color: #65BE3D;
			font-size: 0.7813rem;
		}
	}

	.ad-card {
		width: 19.4375rem;
		height: 9.5313rem;
		margin: auto;

		image {
			width: 19.4375rem;
			height: 9.5313rem;
		}
	}

	.table-view {
		margin-left: 0.7813rem;
		margin-right: 0.7813rem;
		margin-top: 0.6250rem;
		background-color: #1C1E22;
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

		// .ellipsis {

		// 	max-width:calc((100vw - 1.2500rem) / 4);
		// }

		.table-cell {
			direction: unset;
			height: 2.8750rem;
			vertical-align: middle;
			width: 25%;
			box-sizing: border-box;

			&:nth-child(1) {
				text-align: left;
				direction: ltr;
				padding-left: 0.6250rem;
			}

			&:nth-child(4) {
				text-align: right;
				// direction: rtl;
				padding-right: 0.6250rem;
			}

			&:last-child {
				text-align: right;
				// direction: rtl;
				padding-right: 0.6250rem;
			}

			&.add {
				text-align: right;
			}
		}

		.table-row {
			cursor: pointer;
			// display: flex;
			&:not(.head):active {
				background-color: #2D3034;
			}
			display: flex;
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

			img {
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
			// text-align: left !important;
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




	@media (min-width: 9999px) {
		.vip-menu {
			justify-content: flex-start;
			padding-top: 1.2500rem;
			position: assets;

			&>view {
				width: 13.1875rem;
				height: 4.5000rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border: none;
				cursor: pointer;
				background: #1C1E22;
				font-size: 1.0000rem;
			}

			.vip-menu-sign {
				background: #34363B;
				border: none;
			}
		}

		.first-place-card {
			background-size: 5.8750rem 6.0625rem, 3.8750rem 3.8750rem;
			background-position: 6.5625rem 4.0625rem, 80% 9.3750rem;
		}
	}
</style>