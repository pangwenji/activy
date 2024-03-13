
<script setup lang="ts">
import PublicPageFooter from '../components/public-page-footer.vue';
import ScrollView from "../components/scroll-view.vue";
import PublicBanner from '../components/public-banner.vue'
import PublicGame from '../components/public-game.vue'
import PublicLoading from '../components/public-loading.vue'
import PublicGrid from '../components/public-grid.vue'
import HotGame from "../components/hot-game.vue";
import { ref, reactive, onUnmounted, onMounted, watch } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as TypeSwiper } from 'swiper';

import { config, isPc } from '../uilts/async.var';
import { addListener, dbGet, removeListener } from '../uilts/db';
import { open } from '../router/routes';
import { soketData } from '../uilts/socket';
import { Controller, Autoplay } from 'swiper/modules';
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';

let controlledSwiper = ref<TypeSwiper>();
const setControlledSwiper = (swiper: TypeSwiper) => {
	controlledSwiper.value = swiper;
	swiper.autoplay.start();
}
const setAutoplayStop = (swiper: TypeSwiper) => {
	swiper.autoplay.start()
}

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

const game_bet_recen = ref<Array<any>>([])
const collectPage = ref(1)
const collectLastPage = ref(1)
const collectTotal = ref(0)
//获取收藏列表
const collectLoading = ref(false);
let collectPro: Promise<GameList['response']>;
const getCollect = () => {
	collectLoading.value = true;
	collectPro && collectPro.abort();
	collectPro = '/api/game/gameList'.POST<GameList>({
		page: collectPage.value,
		limit: isPc.value ? 6 : 3
	}, {
		Authorization: async () => await dbGet('token')
	});
	collectPro.then(ret => {
		collect.value.length = 0;
		ret.list.forEach((v) => collect.value.push(v))
		collectLastPage.value = Math.ceil(ret.totalCount / (isPc.value ? 6 : 3))
		collectTotal.value = ret.totalCount
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
const setTabs = (index: number) => {
	tabsIndex.value = index
	if (index === 1) {
		game_bet_recen.value = soketData.get_hks_recent
	} else {
		game_bet_recen.value = soketData.get_game_bet_recent
	}
}

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

const isSubmit = ref(false)
const content = ref('')
const sendMessage = () => {
	if (isSubmit.value) return;
	if (!content.value.trim()) return hint(t('pageNoticeMessage.msg'))
	isSubmit.value = true
	'/api/personal/message'.POST<Message>({
		send_content: content.value
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		// collect.splice(0,collect.length)
		hint(t('pageNoticeMessage.hint'))
		content.value = ""
		// getMessageList()
	}).finally(() => {
		isSubmit.value = false;
	})
}

const article = ref('')
const getData = () => {
	
	'/api/article/getData'.GET<Help>({
		type: 'responsible_gaming'
	}).then(ret => {
		// collect.splice(0,collect.length)
		article.value = ret.intro;
	})
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
watch(soketData, (_newData, _oldData) => {
	if (!(game_bet_recen.value.length > 0)) {
		game_bet_recen.value = soketData.get_game_bet_recent
	}
})
const init = () => {
	addListener('user', userListener)

	getCollect();
	getData();
}

onMounted(() => {
	init();
})


</script>

<template>
	<div>
		<view class="content page-pading">
			<public-banner position="home_banner" :is-bottom="true"></public-banner>
			<!-- <div class="menu-route h5">

				<div class="menu-team">
					<img src="@/assets/new/home/1.png" alt="">
					<div class="menu-name">
						<div class="diamond-btn h5" @click="$open('/casino')"> <span>赌场</span> </div>
						<div class="menu-bottom pc">
							<div class="menu-bottom-name">赌场</div>
							<div class="menu-bottom-introduce">深入了解精彩赌场；畅快体验游戏的极致之旅！</div>
						</div>
					</div>
				</div>

				<div class="menu-team">
					<img src="@/assets/new/home/2.png" alt="">
					<div class="menu-name">
						<div class="diamond-btn h5" @click="$open('/agent')"><span>推广</span></div>
						<div class="menu-bottom pc">
							<div class="menu-bottom-name">推广</div>
							<div class="menu-bottom-introduce">与我们合作推广游戏，赚取丰厚佣金！</div>
						</div>
					</div>
				</div>

				<div class="menu-team">
					<img src="@/assets/new/home/3.png" alt="">
					<div class="menu-name">
						<div class="diamond-btn h5" @click="$open('/activity')"><span>活动</span></div>
						<div class="menu-bottom pc">
							<div class="menu-bottom-name">活动</div>
							<div class="menu-bottom-introduce">活动惊喜连连，丰厚奖励不容错过！</div>
						</div>
					</div>
				</div>

				<div class="menu-team">
					<img src="@/assets/new/home/4.png" alt="">
					<div class="menu-name">
						<div class="diamond-btn h5" @click="$open('/recommend')"><span>邀请</span></div>
						<div class="menu-bottom pc">
							<div class="menu-bottom-name">邀请</div>
							<div class="menu-bottom-introduce">邀请更多的朋友加入我们，获得额外奖励！</div>
						</div>
					</div>
				</div>
			</div> -->

			<template v-if="soketData.get_win_recent.length">
				<view class="bigwin-title">
					<img src="@/assets/new/home/sl.png" alt="">
					<span>{{ $t('pageIndex.recentBigWins') }}</span>
				</view>
				<swiper class="bigwin-list bigwin-item-list empty" :modules="[Controller, Autoplay]"
					:data-empty="$t('ui.empty')" :autoplay="true" :data-swiper-autoplay="100"
					:slides-per-view="isPc ? 5 : 3" @swiper="setControlledSwiper" @autoplayStop="setAutoplayStop">
					<swiper-slide v-for="v in soketData.get_win_recent">
						<view class="bigwin-item">
							<img v-lazy="v.image" mode="aspectFill" />
							<view class="bigwin-data">
								<view class="name">
									<img src="@/assets/new/user/user.png" class="user-icon" mode="aspectFill" />
									{{ hideInfo(v.game_user) }}
								</view>
								<view class="money">{{ v.game_profit }}{{ v.game_unit }}</view>
							</view>
						</view>
					</swiper-slide>
				</swiper>
			</template>


			<template v-if="collect.length && false">
				<view class="title sb">

					<view class="title-left" @click="open('/collect')">
						<img class="title-icon" src="@/assets/new/game/coller.png" alt="">
						<span>{{ $t('pageIndex.myCollect') }}</span>
					</view>
					<view class="btns">
						<view class="all" @click="open('/collect')">
							{{ $t('pageIndex.viewAll') }} <span>{{ collectTotal }}</span>
						</view>
						<view class="upper" @click="nextCollect(-1)" :class="{ 'dis': collectPage <= 1 }"></view>
						<view class="next " @click="nextCollect(1)" :class="{ 'dis': collectLastPage <= collectPage }">
						</view>
					</view>
				</view>

				<public-loading v-if="collectLoading" style="min-height:16.2500rem;"></public-loading>
				<public-grid v-else :max="isPc ? 6 : 3" :margin='isPc ? 40 : 12' class="empty" :data-empty="$t('ui.empty')">
					<public-game v-for="item in collect" :item="{
						...item.gameData,
						is_collect: 1
					}" :isCollectList="true"></public-game>
				</public-grid>

				<div class="divider"></div>
			</template>

			<view class="deposit">
				<view class="top-center">
					<div>
						<img src="@/assets/index/PIX.png" />
						<img src="@/assets/index/USDT.png" />
					</div>

				</view>
				<view class="bottom-center">
					<div class="bottom-center-k">
						<view class="payment-title">{{ $t('pageIndex.rm') }}{{ $t('pageIndex.depositBonus') }}</view>
						<!-- <view class="payment-title"> </view> -->
						<!-- open<CofferUrl>(cofferUrl, {}) -->
						<view class="diamond-btn" @click="open('/recharge')">
							<span>{{ $t('pageIndex.deposit') }}</span>
						</view>
					</div>
				</view>
			</view>

			<view class="deposit deposit2">
				<view class="bottom-center">
					<div class="bottom-center-k">
						<view class="payment-tips">{{ $t('pageIndex.t1') }}</view>
						<view class="payment-tips">{{ $t('pageIndex.t3') }}</view>
						<view class="payment-tips payment-tips2"> {{ $t('pageIndex.t2') }}</view>
						<view class="diamond-btn" @click="open('/vip')">
							<span>{{ $t('pageIndex.t4') }}</span>
						</view>
					</div>
				</view>
				<view class="top-center">


				</view>
			</view>

			<div class="divider h5"></div>
			<view class="title no-icon">
				<img class="title-icon" src="@/assets/new/home/nz.png" alt="">
				{{ $t('pageIndex.upToDateCompetition') }}
			</view>

			<view class="tabs">
				<scroll-view class="tabs-scroll" :scroll-x="true">
					<view class="tabs-navs">
						<view class="tabs-nav" :class="{ active: tabsIndex === 0 }" @click="setTabs(0)">
							<span>{{ $t('pageIndex.upToDate') }}</span>
						</view>
						<view class="tabs-nav" :class="{ active: tabsIndex === 1 }" @click="setTabs(1)">
							<span>{{ $t('pageIndex.tableProfit') }}</span>
						</view>
					</view>
				</scroll-view>


				<view class="tabs-view">
					<public-loading class="loading" v-if="!game_bet_recen.length"></public-loading>
					<view class="table " v-else>
						<div>
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
						</div>

						<scroll-view class="tabs-conetnt-scroll scroll-view" :scroll-y="true" :show-scrollbar="false">
							<div>
								<!-- v-show="(index < 10 && showMore === false) || (index < 100 && showMore === true)"" -->
								<view class="table-row" v-for="item, index in game_bet_recen" :key="index">
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
							</div>
						</scroll-view>


					</view>
					<!-- <view class="arrow" v-show="soketData.get_game_bet_recent.length > 10" :class="{ active: showMore }"
						@click="showMore = !showMore">
						<text v-show="!showMore">{{ $t('ui.showMore') }}</text>
						<text v-show="showMore">{{ $t('ui.downMore') }}</text>
					</view> -->
				</view>

			</view>

			<hot-game class="hot-game"></hot-game>

			<div class="message-card pc">

				<div class="message-left">
					<div class="message-title">{{$t('pageHelp.m10')}}</div>
					<div class="message-introduce">
						{{ article }}
					</div>
					<div class="message-go-btn" @click="$open('/help', { type: 'responsible_gaming' })">
						{{ $t('pageHelp.g1') }}
					</div>
				</div>

				<div class="message-right">
					<div class="message-title">{{ $t('pageHelp.g2') }}</div>
					<div class="message-textarea">
						<textarea class="textarea" maxlength="200" :placeholder="$t('pageHelp.g3')"  v-model="content"></textarea>
					</div>
					<div class="message-btn" @click="sendMessage()">
						<public-loading v-if="isSubmit"></public-loading>
						<span v-else>{{$t('pageHelp.g4')}}</span>
					</div>
					<div class="message-tips">
						<div>{{$t('pageHelp.g5')}}</div>
						<div>{{ $t('pageHelp.g6') }}<span>{{ config.kf_email }}</span></div>
					</div>
				</div>

			</div>

			<public-page-footer class="pc"></public-page-footer>
		</view>
		<public-page-footer class="h5"></public-page-footer>
	</div>
</template>


<style lang="scss" scoped>
@import '../scss/public.scss';

@include pc {

	textarea {
		overflow:hidden
	}
	.message-card {
		display: flex;
		justify-content: space-between;
		background-color: #1D1A3F;
		border-radius: 24px;
		padding: 100px;
		margin-top: 32px;

		.message-left {
			width: calc(50% - 38px);

			.message-introduce {
				color: var(--TAB-, #5B6DA1);
				font-family: PingFang SC;
				font-size: 18px;
				font-style: normal;
				font-weight: 400;
				line-height: 40px;
				/* 222.222% */
			}

			.message-go-btn {
				display: inline-block;
				color: #0FF;
				font-family: PingFang SC;
				font-size: 14px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				padding-top: 40px;
			}
		}

		.message-right {
			width: calc(50% - 38px);

			.message-textarea {
				width: 100%;
				padding-bottom: 32px;

				.textarea {
					width: 100%;
					padding: 10px;
					height: 267px;
					box-sizing: border-box;
					border-radius: 8px;
					border: 1px solid #29ACC9;
					background: #16122F;
					&::placeholder{
						color: #3C3E6D;
					}
				}
			}

			.message-btn {
				border-radius: 8px;
				border: 1px solid #29ACC9;
				background: var(--H5-, #201E47);
				width: 100%;
				display: flex;
				height: 48px;
				justify-content: center;
				align-items: center;
				text-align: center;
				box-sizing: border-box;
				color: #FFF;
				font-family: PingFang SC;
				font-size: 18px;
				font-style: normal;
				font-weight: 600;
				line-height: 0px;
				/* 0% */
			}

			.message-tips {
				display: flex;
				justify-content: space-between;
				color: var(--TAB-, #5B6DA1);
				font-family: PingFang SC;
				font-size: 14px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				padding-top: 20px;

				span {
					color: #0FF;
				}
			}
		}

		.message-title {
			color: #8E90CD;
			font-family: PingFang SC;
			font-size: 32px;
			font-style: normal;
			font-weight: 500;
			line-height: 40px;
			padding-bottom: 32px;
		}
	}
}

.menu-bottom {
	padding: 0 15px;

	.menu-bottom-name {
		color: #FFF;
		text-align: center;
		font-family: PingFang SC;
		font-size: 20px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}

	.menu-bottom-introduce {
		color: #FFF;
		text-align: center;
		font-family: PingFang SC;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-top: 8px;
	}
}

.hot-game {
	margin-top: 10px;
}

.menu-route {
	@include h5 {
		padding: 0.628rem 0;
	}

	@include pc {
		padding: 64px 0;
	}

	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.menu-team {
		@include h5 {
			width: calc(50% - 5px);
		}

		@include pc {
			width: calc(25% - 36px);
		}

		background-size: 100%;
		background-repeat: no-repeat;
		height: auto;
		position: relative;
		margin-bottom: 10px;

		img {
			width: 100%;
			height: 100%;
		}

		.menu-name {
			position: absolute;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.6);
			width: 100%;
			display: flex;
			justify-content: center;
			border-bottom-left-radius: 7px;
			border-bottom-right-radius: 7px;
			padding: 12px 0;

			.diamond-btn {
				color: #FFFFFF;
				width: 6.8750rem;
				height: 1.9750rem;
				background-image: linear-gradient(180deg, #7368ff, #5f6fff 63%, #7084ff 100%);
				// border: 0.5px solid;
				border-image: linear-gradient(180deg, #b7f2ff, #cae9ff 47%, #bae2ff 100%) 1 1;
				border-radius: 6px;
				box-shadow: 0px 0px 10px 0px #ffffff inset;
				position: relative;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				transform: skew(-5deg);
				font-size: 14px;

				span {
					transform: skew(5deg);
				}

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					// background-image: radial-gradient(#90ffff, rgba(0, 224, 255, 0.00));
				}
			}
		}
	}
}

/** 分割线 **/

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
		z-index: calc(var(--I1) + 0);
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
		z-index: calc(var(--I1) + 0);

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
	z-index: calc(var(--I1) + 0);
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
	display: block;
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
	@include h5 {
		// padding: 0.6250rem;
	}

	@include pc {
		// padding: 32px 60px;
	}
}

%title-font {
	color: var(--MENU, #8E90CD);
	font-size: 14px;
	// font-weight:700;
}

.title {
	@extend %title-font;
	background: url(@/assets/index/title-icon.png) no-repeat left center;
	background-size: 1.2500rem;
	display: flex;
	align-items: center;

	// padding-left: 1.8750rem;
	// margin-bottom: 0.6250rem;
	@include pc {
		font-size: 24px;
		padding: 32px 0 !important;
	}

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

	.title-icon {
		@include h5 {
			width: 1.0000rem;
			height: 1.0000rem;
			margin-right: 0.3125rem;
		}

		@include pc {
			width: 40px;
			height: 40px;
			margin-right: 8px;
		}
	}

	.title-left {
		display: flex;
		align-items: center;

		img {
			width: 0.8750rem;
			height: 1.0625rem;
		}

		span {
			padding: 0 5px;
		}
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
		z-index: calc(var(--I1) + 0);
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

	border-radius: var(--border-radius);

	@include h5 {
		background-image: url(@/assets/new/home/card1.png);
		height: 10.5000rem;

		&.deposit2 {
			background-image: url(@/assets/new/home/card2.png);
			margin-bottom: 10px;
		}
	}

	@include pc {
		background-image: url(@/assets/new/home/card1-pc.png);
		height: 336px;
		border-radius: 24px;
		margin-top: 64px;

		&.deposit2 {
			margin-top: 32px;
			background-image: url(@/assets/new/home/card2-pc.png);
			margin-bottom: 10px;
		}
	}

	background-color: #1C1E22;
	background-repeat: no-repeat;
	background-size: 100% 100%;

	margin-top: 10px;
	// min-height: 20.6250rem;
	display: flex;

	// flex-direction: column;
	.diamond-btn {
		@include h5 {
			width: 6.8750rem;
			height: 1.8000rem;
			border-radius: 6px;
			font-size: 14px;
			color: #FFFFFF;
		}

		@include pc {
			width: 220px;
			height: 60px;
			border-radius: 12px;
			color: #FFF;
			font-family: PingFang SC;
			font-size: 24px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			margin-top: 30px;
		}

		background-image: linear-gradient(180deg, #7368ff, #5f6fff 63%, #7084ff 100%);
		// border: 0.5px solid;
		border-image: linear-gradient(180deg, #b7f2ff, #cae9ff 47%, #bae2ff 100%) 1 1;

		box-shadow: 0px 0px 10px 0px #ffffff inset;
		position: relative;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: skew(-5deg);

		span {
			transform: skew(5deg);
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			// background-image: radial-gradient(#90ffff, rgba(0, 224, 255, 0.00));
		}
	}

	.top-center {
		width: 50%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		@include h5 {
			justify-content: center;
		}

		@include pc {
			width: calc(50% - 77px);
			justify-content: right;
			padding-right: 77px;
		}

		div {
			text-align: center;

			img {
				height: 1.2500rem;
				display: block;
				margin: 0.9375rem;
			}
		}

		// @extend %flex-center;
		// flex-direction: column;
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
		@extend %flex-center;

		color: #FFF;

		-webkit-backdrop-filter: blur(6px);
		backdrop-filter: blur(6px);

		@include h5 {
			flex: 1;
			flex-direction: column;

			.bottom-center-k {
				display: flex;

				justify-content: center;
				align-items: center;
				flex: 1;
				flex-direction: column;
			}
		}

		@include pc {
			flex: 1;
			width: calc(100% - 93px);

			// display: ;
			// 
			.bottom-center-k {
				padding-left: 93px;
				width: 100%;
			}
		}
	}

	.payment-title {

		// line-height: 1.6;
		// font-weight: 600;
		@include h5 {
			font-size: 12px;
			padding: 0.9375rem;
		}

		@include pc {
			color: #FFF;
			font-family: PingFang SC;
			font-size: 24px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			padding-bottom: 7px;
		}

		text {
			color: #FFBF39;
		}

		~.payment-title {
			font-weight: 400;
		}
	}

	.payment-tips {
		// line-height: 1.6;

		@include h5 {
			font-weight: 400;
			font-size: 14px;
			padding: 0.25rem;
		}

		@include pc {
			color: #FFF;
			font-family: PingFang SC;
			font-size: 24px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			padding: 3px 0;
		}

		text {
			color: #FFBF39;
		}


	}

	.payment-tips2 {
		font-weight: 600;
		padding-bottom: 0.5rem;
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
	display: flex;
	align-items: center;

	// padding-left: 1.2500rem;
	img {
		width: 0.9375rem;
		height: 0.92441rem;
		margin-right: 0.41rem;
	}


	@include pc {
		margin-bottom: 40px;
		margin-top: 64px;
		font-family: PingFang SC;
		font-size: 24px;
		font-style: normal;
		font-weight: 500;
		line-height: 40px;
		/* 166.667% */
		background: linear-gradient(90deg, #008585 0.16%, #FF92FF 99.84%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		img {
			width: 37.5px;
			height: 36.977px;
			margin-right: 9.25px;
		}
	}

	@extend %title-font;

	// &::after,
	// &::before {
	// 	content: "";
	// 	position: absolute;
	// 	display: block;
	// 	width: 0.4375rem;
	// 	height: 0.4375rem;
	// 	border-radius: 50%;
	// 	left: 0.3281rem;
	// 	top: 50%;
	// 	background-color: #45d91e;
	// 	margin-top: -0.2188rem;
	// }

	// &::after {
	// 	background-color: #45d91e4d;
	// 	-webkit-animation: online infinite 1.5s linear;
	// 	animation: online infinite 1.5s linear;
	// }
}

.bigwin-list {
	// margin:0 -0.3125rem;
	// height: 13.1250rem;
	width: 100%;
	// padding-bottom: 1.2500rem;

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
		// width: 10.6250rem;
		// height: 100%;
		box-sizing: border-box;
		background-color: #201E47;
		background-clip: content-box;
		// margin-right: 0.9375rem;
		border-radius: 0.1250rem;
		overflow: hidden;


		@include h5 {
			margin-right: 0.6250rem;
			border-radius: 0.5rem;
		}

		@include pc {
			margin-right: 32px;
			border-radius: 24px;
		}

		.name {
			display: flex;
			align-items: center;

			@include pc {
				width: 100%;
				justify-content: center;
				color: #908FA2;
				text-align: center;
				font-family: Montserrat;
				font-size: 20px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				padding: 13px 0 9px;
			}
		}

		.user-icon {

			margin-right: 0.31rem;

			@include pc {
				width: 25.45px;
				height: 25.45px;
			}

			@include h5 {
				width: 0.7813rem;
				height: 0.7813rem;
			}
		}
	}

	img {
		width: 100%;
		// height: 9.3750rem;
		display: block;
	}

	.bigwin-data {
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #8E90CD;

		@include h5 {
			height: 3.7500rem;
			align-items: flex-start;
			font-size: 0.7500rem;
			padding: 0 0.4375rem;
		}

		@include pc {
			padding-bottom: 20px;
		}
	}

	.money {
		// background: rgba(69, 217, 30, .1);
		border-radius: 1px;
		color: #0FF;
		font-size: 0.8125rem;

		// padding: 0 0.3125rem;
		@include h5 {
			margin-top: 0.5000rem;
		}

		@include pc {
			// min-width: 149px;
			text-align: center;
			padding: 6px 28px;
			border-radius: 18px;
			background: #2E2C5E;
			margin: auto;
			font-size: 20px;
		}
	}
}

.tabs {
	background-color: var(--bgcolor);
	padding: 0.6250rem 0;
	font-size: 0.7500rem;
	// width: 100%;

	.tabs-view {
		padding-top: 0.625rem;
		width: 100%;
	}

	.tabs-scroll {
		// padding:0 0.6250rem;
		// height:2.9688rem;
		width: 100%;
		margin: 0 auto;
	}

	.tabs-navs {
		display: flex;
		white-space: nowrap;
	}

	.tabs-nav {
		@extend %flex-center;
		flex-shrink: 0;
		color: var(--TAB-, #5B6DA1);
		background-color: #201E47;
		margin-right: 0.3125rem;

		@include h5 {
			width: 4.8750rem;
			padding: 0.2500rem 0;
			border-radius: 0.2500rem;

			&.active {
				background-color: #2E2C5E;
				font-weight: 700;
				color: #0FF;
			}
		}

		@include pc {
			width: 152px;
			height: 56px;
			border-radius: 8px;
			background: #16122F;
			font-size: 20px;
			font-style: normal;
			font-weight: 600;
			line-height: normal;
			border-radius: 8px;
			border: 1px solid #434176;
			box-sizing: border-box;

			&.active {
				background: linear-gradient(146deg, #2E2C5E 19.52%, #2E2C5E 79.82%);
				font-weight: 700;
				color: #0FF;
				border: none;

				span {
					background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;

				}
			}
		}
	}
}

.tabs-conetnt-scroll {
	overflow: hidden;

	@include h5 {
		height: 10rem;
	}

	@include pc {
		height: 184px;
	}
}

.table {
	// width: 100%;
	color: #8E90CD;
	text-align: center;
	box-sizing: border-box;

	@include h5 {
		font-size: 0.7500rem;
	}

	@include pc {
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

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
		box-sizing: border-box;
		vertical-align: middle;

		@include pc {
			padding: 12px 0;
		}

		@include h5 {
			padding: 0.3750rem 0.6250rem;
		}

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
				// padding-left: 0.6250rem;
				text-align: left;
				margin-left: 0;
			}
		}

		&:nth-child(2) {
			// color: #FFF;

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
			// color: #98A7B5;

			&:last-child {
				// color: #f53202;
				font-weight: 600;

				&.add {
					color: #3BC117;
				}
			}

			&:nth-child(3) {
				color: #FFF;
				font-weight: 600;
				background: linear-gradient(180deg, #FF3EFF 0%, #F0F 62.5%, #FF6FFF 100%);
				background-clip: text;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

		}

		&:nth-child(even) {
			background-color: #201E47;
		}

		img {
			width: 0.8125rem;
			height: 0.8125rem;
			display: inline-block;
			vertical-align: middle;
		}
	}

	.head {

		// color: #98A7B5;
		@include h5 {
			font-size: 0.7500rem;
		}

		@include pc {
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}

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
		min-width: 3.1250rem;
		padding: 0 0.3125rem;
		height: 1.5625rem;
		background-color: #231d4e;
		font-size: 0.6rem;
		@extend %flex-center;
		margin-right: 0;
		color: #8E90CD;

		span {
			color: #00FFFF;
			font-size: 0.6rem;
			padding: 0 0.5rem;
		}
	}

	.upper,
	.next {
		width: 1.5625rem;
		height: 1.5625rem;
		background-color: #231d4e;
		margin-left: 5px;
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
</style>