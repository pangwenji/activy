
<script setup lang="ts">

import ScrollView from "../components/scroll-view.vue";
import PublicBanner from '../components/public-banner.vue'
import PublicGame from '../components/public-game.vue'
import PublicLoading from '../components/public-loading.vue'
import PublicGrid from '../components/public-grid.vue'
import HotGame from "../components/hot-game.vue";
import { ref, reactive, onUnmounted, onMounted } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue";


import { isPc } from '../uilts/async.var';
import { addListener, dbGet, removeListener } from '../uilts/db';
import { open, back } from '../router/routes';
import { soketData } from '../uilts/socket';

// import { alert } from '../uilts/ui';
type CofferUrl = '/coffer-pass' | '/coffer-pass';
const cofferUrl = ref<CofferUrl>('/coffer-pass')

const hideInfo = (val: string) => {
	let str = [null, undefined, ""];
	if (!str.includes(val)) {
		let valLen = val.length;
		const numt = 1;
		const num = 2;
		let numf = 2;
		if (valLen > 26) {
			numf = numf * 2;
		}
		if (valLen % 2 == 0) {
			return val.substring(0, valLen / num - numf) + "******" + val.substring((valLen / num) + numf);
		} else {
			valLen += numt;
			return val.substring(0, (valLen / num) - numf - numt) + "******" + val.substring((valLen / num) + numf - numt);
		}
	} else {
		return val;
	}
}


let tabsIndex = ref(0);
let showMore = ref(false)
let collect = ref<Array<{
	gameData: Game;
}>>([])

const collectPage = ref(1)
const collectLastPage = ref(1)
//获取收藏列表
const collectLoading = ref(false);
let collectPro: Promise<GameList['response']>;
const getCollect = () => {
	collectLoading.value = true;
	collectPro && collectPro.abort();
	collectPro = '/api/game/gameList'.POST<GameList>({
		page: collectPage.value,
		limit: isPc.value ? 6 : 2
	}, {
		Authorization: async () => await dbGet('token')
	});
	collectPro.then(ret => {
		collect.value.length = 0;
		ret.list.forEach((v) => collect.value.push(v))
		collectLastPage.value = Math.ceil(ret.totalCount / (isPc.value ? 6 : 2))
	}).finally(() => {
		collectLoading.value = false;
	})
}
// const labelFilter = (text : string) => {
// 	return text.replace(/(\<[^\>]+\>)/g, '')
// }
const nextCollect = (action: number) => {
	let page = Math.max(collectPage.value + action, 1);
	if (page < 0 || page > collectLastPage.value) {
		return
	}
	if (page == collectPage.value) {
		return
	}
	collectPage.value = page;
	getCollect()
}

// const collectGame = (_id : number) => {
// 	collectPage.value = 1
// 	getCollect()
// }


let isLogin = ref(false);
let userInfo = reactive<UserModel>({
	id: 0,
	recommender_id: 0,
	invite_code: '',
	username: '',
	money: '',
	user_nick: '',
	box_pwd: 0
});
const userListener = (type: ListenerType, user?: UserModel) => {
	isLogin.value = (type === 'set');
	if (isLogin.value && user?.box_pwd === 0) cofferUrl.value = '/coffer-pass'
	if (isLogin.value && user?.box_pwd === 1) cofferUrl.value = '/coffer-pass'
	for (let k in user) {
		userInfo[k] = user[k];
	}
}
onUnmounted(() => {
	removeListener('user', userListener)
})

dbGet('user').then(user => {
	if (user) {
		isLogin.value = true;
	}
	userListener('set', user);
}).catch(_ => {

});

addListener('language', (type, _name) => {
	if (type === 'set') {
		init();
	}
})
const init = () => {
	addListener('user', userListener)
	getCollect();
}

onMounted(() => {
	init();
})
</script>

<template>
	<div>
		<view class="banner-view">
			<img class="pc-banner" src="@/assets/index/pc-banner.png" />
			<view class="banner-text">
				<view class="tips" v-if="isLogin">
					{{ $t('pageIndex.hi') }},<text>{{ userInfo.user_nick ||
						userInfo.username }}</text>{{ $t('pageIndex.welcome') }}
				</view>
				<view class="name">{{ $t('pageIndex.firstDeposit') }}</view>
				<view class="money">{{ $t('pageIndex.reward') }}</view>
				<view class="btns">
					<view class="btn ellipsis" @click="$open('/recharge')">
						<text>{{ $t('pageIndex.depositAndGame') }}</text>
					</view>
					<view class="btn btn2 ellipsis" @click="back(-2)">{{ $t('pageIndex.free') }}</view>
				</view>
			</view>
		</view>

		<public-banner position="home_banner"></public-banner>
		<view class="content">
			<view class="max-flex">
				<view class="flex-box">
					<view class="title h5">
						{{ $t('casinoHome') }}
					</view>
					<view class="bg">
						<img @click="back(-2)" style="width:100%;" src="@/assets/index/casino1.png" />
						<view class="bg-content">
							<view class="title pc">{{ $t('casinoHome') }}</view>
							<view class="txt">{{ $t('pageIndex.tips1') }}</view>
							<view class="btn" @click="back(-2)">{{ $t('pageIndex.goCasino') }}</view>
						</view>
					</view>
				</view>
				<view class="flex-box">
					<view class="title sports h5">{{ $t('pageIndex.shareHome') }}</view>
					<view class="bg bg2">
						<img @click="back(-3)" style="width:100%;"
							src="@/assets/index/casino2.png" />
						<view class="bg-content">
							<view class="title sports pc">{{ $t('pageIndex.shareHome') }}</view>
							<view class="txt">
								{{ $t('pageIndex.tips2') }}
							</view>
							<view class="btn btn2" @click="back(-3)">
								{{ $t('pageIndex.goShare') }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<template v-if="soketData.get_win_recent.length">
				<view class="bigwin-title">
					{{ $t('pageIndex.recentBigWins') }}
				</view>
				<swiper class="bigwin-list bigwin-item-list empty" :data-empty="$t('ui.empty')" :autoplay="true" :slides-per-view="isPc ? 7 : 2">
					<swiper-slide v-for="v in soketData.get_win_recent">
						<view class="bigwin-item">
							<img :src="v.image" mode="aspectFill" />
							<view class="bigwin-data">
								<view class="name">
									{{ hideInfo(v.game_user) }}
								</view>
								<view class="money">{{ v.game_profit }}{{ v.game_unit }}</view>
							</view>
						</view>
					</swiper-slide>
				</swiper>
			</template>
			<template v-if="collect.length">
				<view class="title sb">
					<view>{{ $t('pageIndex.myCollect') }}</view>
					<view class="btns">
						<view class="all" @click="open('/collect')">
							{{ $t('pageIndex.viewAll') }}
						</view>
						<view class="upper" @click="nextCollect(-1)" :class="{ 'dis': collectPage <= 1 }"></view>
						<view class="next " @click="nextCollect(1)" :class="{ 'dis': collectLastPage <= collectPage }">
						</view>
					</view>
				</view>
				<public-loading v-if="collectLoading" style="min-height:16.2500rem;"></public-loading>
				<public-grid v-else :max="isPc ? 6 : 2" :margin='isPc ? 40 : 10' class="empty" :data-empty="$t('ui.empty')">
					<public-game v-for="item in collect" :item="{
						...item.gameData,
						is_collect: 1
					}" :isCollectList="true"></public-game>
				</public-grid>
			</template>

			<view class="deposit">
				<view class="top-center">
					<view class="list">
						<img src="@/assets/index/PIX.png" />
						<img src="@/assets/index/USDT.png" />
					</view>
				</view>
				<view class="bottom-center">
					<view class="payment-title">{{ $t('pageIndex.rm') }}</view>
					<view class="payment-title"> {{ $t('pageIndex.depositBonus') }}</view>
					<view class="btn" @click="open<CofferUrl>(cofferUrl,{})">
						{{ $t('pageIndex.deposit') }}
					</view>
				</view>
			</view>


			<view class="title no-icon" v-if="false">
				{{ $t('pageIndex.upToDateCompetition') }}
			</view>
			<view class="tabs" v-if="false">
				<scroll-view class="tabs-scroll" :scroll-x="true">
					<view class="tabs-navs">
						<view class="tabs-nav" :class="{ active: tabsIndex === 0 }" @click="tabsIndex = 0">
							{{ $t('pageIndex.upToDate') }}
						</view>
						<view class="tabs-nav" :class="{ active: tabsIndex === 1 }" @click="tabsIndex = 1">
							{{ $t('pageIndex.tableProfit') }}
						</view>
					</view>
				</scroll-view>

				<view class="tabs-view" v-show="tabsIndex == 0">
					<public-loading class="loading" v-if="!soketData.get_game_bet_recent.length"></public-loading>
					<view class="table " v-else>
						<view class="table-row head">
							<view class="table-cell">
								<view class="ellipsis">{{ $t('pageIndex.gamename') }}</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">{{ $t('pageIndex.username') }}</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">{{ $t('pageIndex.betAmount') }}</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">{{ $t('pageIndex.profitNum') }}</view>
							</view>
						</view>
						<view class="table-row" v-for="item, index in soketData.get_game_bet_recent"
							v-show="(index < 10 && showMore === false) || (index < 100 && showMore === true)" :key="index">
							<view class="table-cell">
								<view class="ellipsis">
									{{ item.game_name }}
								</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">
									{{ item.game_user }}
								</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">
									{{ item.game_bet }}
								</view>
							</view>
							<view class="table-cell">

								<view class="ellipsis"
									:class="{ 'add': item.game_win_status === 1, 'reduce': item.game_win_status !== 1 }">
									<text v-if="item.game_win_status === 1">{{ '+' }}{{ item.game_profit }}
										{{ item.game_unit }} </text>
									<text v-else>{{ '-' }}{{ item.game_profit }} {{ item.game_unit }} </text>
								</view>
							</view>
						</view>


					</view>
					<view class="arrow" v-show="soketData.get_game_bet_recent.length > 10" :class="{ active: showMore }"
						@click="showMore = !showMore">
						<text v-show="!showMore">{{ $t('ui.showMore') }}</text>
						<text v-show="showMore">{{ $t('ui.downMore') }}</text>
					</view>
				</view>

				<view class="tabs-view" v-show="tabsIndex == 1">
					<public-loading class="loading" v-if="!soketData.get_hks_recent.length"></public-loading>
					<view class="table" v-else>
						<view class="table-row head">
							<view class="table-cell">
								<view class="ellipsis">{{ $t('pageIndex.gamename') }}</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">{{ $t('pageIndex.username') }}</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">{{ $t('pageIndex.betAmount') }}</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">{{ $t('pageIndex.profitNum') }}</view>
							</view>
						</view>
						<view class="table-row" v-for="item, index in soketData.get_hks_recent" :key="index"
							v-show="(index < 10 && showMore === false) || (index < 100 && showMore === true)">
							<view class="table-cell">
								<view class="ellipsis">
									{{ item.game_name }}
								</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">
									{{ item.game_user }}
								</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">
									{{ item.game_bet }}
								</view>
							</view>
							<view class="table-cell" :class="{ add: item % 2 === 0 }">
								<view class="ellipsis"
									:class="{ 'add': item.game_win_status === 1, 'reduce': item.game_win_status !== 1 }">
									<text v-if="item.game_win_status === 1">{{ '+' }}{{ item.game_profit }}
										{{ item.game_unit }} </text>
									<text v-else>{{ '-' }}{{ item.game_profit }} {{ item.game_unit }} </text>
								</view>
							</view>
						</view>


					</view>
					<view class="arrow" v-show="soketData.get_hks_recent.length > 10" :class="{ active: showMore }"
						@click="showMore = !showMore">
						<text v-show="!showMore">{{ $t('ui.showMore') }}</text>
						<text v-show="showMore">{{ $t('ui.downMore') }}</text>
					</view>
				</view>

			</view>


			<view class="saiba-mais h5">
				<view>{{ $t('pageIndex.t1') }}</view>
				<view> <text>{{ $t('pageIndex.t2') }}</text></view>
				<view></view>
				<view class="uma">{{ $t('pageIndex.t3') }}</view>
				<img src="@/assets/index/saiba-mais.png" />
				<view class="btn" @click="open('/vip')">
					{{ $t('pageIndex.t4') }}
				</view>
			</view>

			<view class="saiba-mais saiba-mais-pc pc">
				<view class="saiba-mais-pc-left">
					<view class="saiba-mais-pc-left-one">{{ $t('pageIndex.t1') }}</view>
					<view class=""> <text>{{ $t('pageIndex.t2') }}</text></view>
					<view></view>
					<view class="uma saiba-mais-pc-text">{{ $t('pageIndex.t3') }}</view>
					<view class="btn" @click="open('/vip')">
						{{ $t('pageIndex.t4') }}
					</view>
				</view>
				<view class="saiba-mais-pc-right">
					<img src="@/assets/index/saiba-mais.png" />
				</view>
			</view>
			<hot-game></hot-game>
		</view>
	</div>
</template>


<style lang="scss" scoped>
@import '../scss/public.scss';

.flex-box {
	padding-bottom: 0.6250rem;
	flex: 1;
}



page {
	--bgcolor: #1C1E22;
	background-color: #24262b;
	min-height: 100%;
}

@-webkit-keyframes online {
	0% {
		-webkit-transform: scale(1);
		-ms-transform: scale(1);
		transform: scale(1)
	}

	to {
		-webkit-transform: scale(2.5);
		-ms-transform: scale(2.5);
		transform: scale(2.5)
	}
}

@keyframes online {
	0% {
		-webkit-transform: scale(1);
		-ms-transform: scale(1);
		transform: scale(1)
	}

	to {
		-webkit-transform: scale(2.5);
		-ms-transform: scale(2.5);
		transform: scale(2.5)
	}
}

.banner-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	// padding:0 1.2500rem;
	flex-wrap: wrap;
	flex-direction: row-reverse;
	margin-bottom: -7.5000rem;

	.name {
		font-size: 1.5625rem;
		color: #FFF;
	}

	.tips {
		z-index:calc(var(--I1) + 0);
		font-size: 0.8750rem;
		color: #9BA6B3;
		font-weight: 500;
		padding: 0;
		display: flex;

		text {
			color: #FFF;
			// display: inline-block;
			max-width: 4.6875rem;
			padding: 0 0.6250rem;
			flex-wrap: nowrap;
			word-break: normal;
			text-overflow: ellipsis;
			white-space: nowrap;
			vertical-align: middle;
			overflow: hidden;
		}
	}

	.money {
		display: inline-block;
		background: linear-gradient(90deg, #b5e916, #77d313);
		font-size: 2.5000rem;
		font-weight: 700;
		text-align: left;
		color: transparent;
		// letter-spacing: -4.5px;
		background-clip: text;
		-webkit-background-clip: text;
	}

	.btns {
		padding-top: 1.2500rem;
	}

	.btn {
		@include button(#3E9222);
		width: 100%;
		height: 2.5000rem;
		font-weight: normal;
		width: 9.3750rem;
		height: 3.0000rem;
		position: relative;
		z-index:calc(var(--I1) + 0);

		&.btn2 {
			@include button-color(#8853fc);
			margin-left: 1.2500rem;
		}
	}
}

.banner-text {
	padding-left: 0.6250rem;
	margin-right: -100%;
	padding-bottom: 6.2500rem;
	z-index:calc(var(--I1) + 0);
}

.imgs-list {
	height: 12.5000rem;
	padding: 0.6250rem 0;

	swiper,
	swiper-item {
		height: 100%;
	}

	.img-box {
		width: 100%;
		height: 100%;
		padding: 0.6250rem;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	image {
		width: 100%;
	}
}

.pc-banner {
	display:block;
	width: 100%;
	max-width: 618px;
	min-height: 24rem;
}

@media (max-width: 9999px) {
	.banner-text {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-left: 0;
		margin-right: 0;
		margin-top: -6.2500rem;
		padding-bottom: 1.2500rem;
	}

	.banner-view {
		margin-bottom: 0;

		.tips {
			font-size: 0.7500rem;
			padding: 0.3125rem 0;
		}

		.name {
			font-size: 0.9375rem;
		}

		.money {
			font-size: 1.0000rem;
		}
	}

	.pc-banner {
		max-width: 100%;
		min-height: 15rem;
	}

}

.content {
	padding: 0 0.6250rem 1.5rem;

	&>view {
		margin-bottom: 0.6250rem;
	}
}

%title-font {
	color: #FFF;
	font-size: 1.0313rem;
	// font-weight:700;
}

.title {
	@extend %title-font;
	background: url(@/assets/index/title-icon.png) no-repeat left center;
	background-size: 1.2500rem;
	padding-left: 1.8750rem;
	margin-bottom: 0.6250rem;

	&.no-icon,
	&.sb {
		background: none;
		padding: 0;
	}

	&.sports {
		// background-size:1.8750rem;
		background-image: url(@/assets/index/1.png);
	}

	&.sb {
		display: flex;
		justify-content: space-between;
	}
}

.bg {
	$color-1: #622ae0;
	$color-2: #2AE035;
	$color-end: #1e1e22;
	background: -webkit-linear-gradient(to bottom, $color-1, $color-end);
	background: linear-gradient(to bottom, $color-1, $color-end);
	border-radius: 0.1250rem;

	&.bg2 {
		background: -webkit-linear-gradient(to bottom, $color-2, $color-end);
		background: linear-gradient(to bottom, $color-2, $color-end);
	}

	.bg-img {
		height: 10.4688rem;
		width: 100%;
		@extend %flex-center;
	}

	img {
		min-height: 9.3750rem;
		width: 16.1250rem;
		// margin-top:2.4375rem;
	}

	.bg-content {
		// min-height:6.5625rem;
		background: rgba(0, 0, 0, 0.50);
		padding: 0.6250rem 0.8125rem;
		box-sizing: border-box;
		@extend %flex-center;
		flex-direction: column;
		align-items: start;
		margin-top: -3.1250rem;
		z-index:calc(var(--I1) + 0);
		position: relative;
		backdrop-filter: blur(3px);
	}

	.txt {
		font-size: 0.7500rem;
		color: #9BA6B3;
		margin-bottom: 0.6250rem;
	}

	.btn {
		@include button($color-1);
		width: 100%;
		height: 2.5000rem;

		&.btn2 {
			@include button-color($color-2);
		}
	}
}

.deposit {
	--left-bg: url(@/assets/index/ball_2.2adeb099.png);
	--right-bg: url(@/assets/index/ball_3.21626868.png);
	border-radius: var(--border-radius);
	background: var(--left-bg), var(--right-bg);
	background-color: #1C1E22;
	background-repeat: no-repeat, no-repeat;
	background-size: auto 35%, auto 50%;
	background-position: left 3.125rem, 15.625rem center;
	min-height: 20.6250rem;
	display: flex;
	flex-direction: column;

	.top-center {
		height: 9.3750rem;
		@extend %flex-center;
		flex-direction: column;
	}

	.list {
		@extend %flex-center;

		&~.list {
			margin-top: 0.6250rem;
		}
	}

	image {
		width: 4.6875rem;
		height: 1.8750rem;
		padding: 0 0.6250rem;
	}

	.bottom-center {
		flex: 1;
		@extend %flex-center;
		flex-direction: column;
		color: #FFF;
		-webkit-backdrop-filter: blur(6px);
		backdrop-filter: blur(6px);
	}

	.payment-title {
		line-height: 1.6;
		font-weight: 600;

		text {
			color: #FFBF39;
		}

		~.payment-title {
			font-weight: 400;
		}
	}

	.btn {
		@include button(#5617cb);
		width: 7.5000rem;
		height: 2.5000rem;
		margin-top: 1.2500rem;
	}
}

.bigwin-title {
	position: relative;
	line-height: 1.3750rem;
	padding-left: 1.2500rem;
	@extend %title-font;

	&::after,
	&::before {
		content: "";
		position: absolute;
		display: block;
		width: 0.4375rem;
		height: 0.4375rem;
		border-radius: 50%;
		left: 0.3281rem;
		top: 50%;
		background-color: #45d91e;
		margin-top: -0.2188rem;
	}

	&::after {
		background-color: #45d91e4d;
		-webkit-animation: online infinite 1.5s linear;
		animation: online infinite 1.5s linear;
	}
}

.bigwin-list {
	// margin:0 -0.3125rem;
	height: 13.1250rem;
	width: 100%;
	padding-bottom: 1.2500rem;

	swiper {
		height: 100%;
	}

	.bigwin-item-list {
		flex-wrap: nowrap;
		word-break: normal;
		white-space: nowrap;
		vertical-align: middle;
	}

	.bigwin-item {
		display: inline-block;
		width: 10.6250rem;
		height: 100%;
		box-sizing: border-box;
		background-color: var(--bgcolor);
		background-clip: content-box;
		// margin-right: 0.9375rem;
		border-radius: 0.1250rem;
		overflow: hidden;
		margin-right: 0.6250rem;
	}

	img {
		width: 100%;
		// height: 9.3750rem;
		display: block;
	}

	.bigwin-data {
		height: 3.7500rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #FFF;
		align-items: flex-start;
		font-size: 0.8750rem;
		padding: 0 0.4375rem;
	}

	.money {
		background: rgba(69, 217, 30, .1);
		border-radius: 1px;
		color: #3BC117;
		font-size: 0.8125rem;
		padding: 0 0.3125rem;
		margin-top: 0.5000rem;
	}
}

.tabs {
	background-color: var(--bgcolor);
	padding: 0.6250rem 0;
	font-size: 0.7500rem;
	width: 100%;

	.tabs-view {
		width: 100%;
	}

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
		padding: 0 0.3125rem;
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
	box-sizing: border-box;

	.ellipsis {
		width: 80%;
		margin: auto;
		text-align: center;



		text {
			white-space: nowrap
		}
	}

	.table-cell {
		width: 20%;
		height: 2.8750rem;
		box-sizing: border-box;
		vertical-align: middle;

		.add {
			color: #67c23e;
		}

		.reduce {
			color: #f53202;
		}

		.ellipsis {
			width: calc(20vw - 0.3125rem);
			box-sizing: border-box;
			max-width: 100%;
		}

		&:nth-child(1) {
			text-align: left;

			// direction: ltr;
			.ellipsis {
				padding-left: 0.6250rem;
				text-align: left;
				margin-left: 0;
			}
		}

		&:nth-child(2) {
			color: #FFF;

			// .ellipsis {
			// 	// width: 50%;
			// }
		}

		&:last-child {
			text-align: right;
			// direction: rtl;


			.ellipsis {
				// width: 100%;
				padding-right: 0.6250rem;
				text-align: right;
			}
		}

		&.add {
			text-align: right;
		}
	}

	.table-row {
		cursor: pointer;
		width: 100%;
		// display: flex;
		&:not(.head):active {
			background-color: #2D3034;
		}

		&:not(.head) .table-cell {
			color: #98A7B5;

			&:last-child {
				// color: #f53202;

				&.add {
					color: #3BC117;
				}
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

.saiba-mais {
	font-size: 1.2500rem;
	color: #FFF;
	background-color: #1C1E22;
	padding: 0.8750rem;
	font-weight: bold;

	text {
		color: #65BE3D;
	}

	img {
		width: 17.2813rem;
		display: block;
		margin: 0 auto;
		margin-top: 1.5625rem;
		margin-bottom: 0.7813rem;
	}

	.uma {
		font-size: 1.0313rem;
		color: #9BA6B3;
		font-weight: normal;
	}

	.btn {
		@include button(#2AE035);
		width: 100%;
		height: 3.0000rem;
		margin: 0 auto;
	}
}

.saiba-mais-pc {
	display: flex;
	// padding: 3.1250rem 0;
	--left-bg: url(@/assets/index/ball_2.2adeb099.png);
	--right-bg: url(@/assets/index/ball_4.webp);
	border-radius: var(--border-radius);
	background: var(--left-bg), var(--right-bg);
	background-color: #1C1E22;
	background-repeat: no-repeat, no-repeat;
	background-size: auto 100%, auto 100%;
	background-position: 105% -4rem, center 5rem;
	position: relative;

	.saiba-mais-pc-left {
		position: absolute;
		height: 100%;
		bottom: 0;
		width: 50%;
		backdrop-filter: blur(6px);

		// justify-content: center;
		view {
			margin-left: 3.1250rem;
		}

		.saiba-mais-pc-left-one {
			margin-top: 3.1250rem;
		}

		.saiba-mais-pc-text {
			margin-top: 0.9375rem;
		}

		.btn {
			width: 40%;
			margin-top: 3.7500rem;
		}
	}

	.saiba-mais-pc-right {
		margin-left: auto;
		width: 50%;
		display: flex;
		justify-content: center;
		
		img {
			width: 25.5000rem;
		}
	}
}

.btns {
	font-weight: normal;
	display: flex;

	.all {
		width: 3.7500rem;
		height: 1.5625rem;
		background-color: #1D1E22;
		font-size: 0.7500rem;
		@extend %flex-center;
		margin-right: 0.6250rem;
	}

	.upper,
	.next {
		width: 1.5625rem;
		height: 1.5625rem;
		background-color: #202226;
		background-color: #1C1E22;
		margin-left: 0.3125rem;
		background-image: url(@/assets/index/arrow-no-dis.png);
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.4375rem;

		&.dis {
			background-image: url(@/assets/index/arrow-dis.png);
		}
	}

	.upper:not(.dis),
	.next.dis {
		transform: rotate(180deg);
	}
}

.slot-list {
	display: flex;
	flex-wrap: wrap;

	// justify-content:space-between;
	.public-game {
		margin-right: 0.6250rem;
	}
}



@media (min-width: 9999px) {
	.max-flex {
		display: flex;
	}

	.flex-box {
		padding-right: 0.3125rem;
		object-fit: cover;

		&~.flex-box {
			padding-left: 0.3125rem;
			padding-right: 0;
		}
	}

	.bg .bg-content .txt {
		font-size: 1.1250rem;
		display: block;
		padding: 0.6250rem 1.2500rem;

		min-height: 3.1250rem;
	}

	.deposit {
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 14.3750rem;
		min-height: auto;
		background-size: 30%, 40%;
		background-position: -10% top, center -9.375rem;

		.top-center {
			flex: 1;
		}

		.bottom-center {
			height: 100%;
			box-sizing: border-box;
			padding-left: 3.7500rem;
			align-items: start;
		}
	}

	.tabs {
		.ellipsis {
			width: 100% !important;
		}
	}
}
</style>