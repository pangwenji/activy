<template>
	<!-- :on-pullup="onReachBottom" -->


	<page :on-pulldown="onPullDownRefresh" 
		:show-header="!(type === 0 && com === 0 && game_company_code === '')" :jump-to-top="jumpToTop" :mouse-wheel="true">

		<template #header-content>
			<scroll-view :scroll-x="true" class="menu-card" v-if="type !== 0 || com !== 0 || game_company_code !== ''">

				<!-- <div class="menu-team" @click.stop="onBack()">
					<span class="iconfont iconhome"></span>
					<span class="menu-name">CASA</span>
				</div> -->

				<div class="menu-team xx-btn" v-for="v in collect" @click="changeMenu({ name: v.name, id: v.id })"
					:class="{ 'selected': v.id == com }">
					<img :src="v.id == gameType ? v.icon : v.icon" alt="">
					<span class="menu-name">{{ v.name }}</span>
				</div>

			</scroll-view>
		</template>
		<template #header-icon-right>
			<span class="iconfont iconhomeempty" @click="$back(-1)"></span>
		</template>
		<div class="content" :class="{ 'top-padding': (type !== 0 || com !== 0 || game_company_code !== '') }">

			<div class="page-pading" v-if="type === 0 && com === 0 && game_company_code === ''">
				<view class="search-card">
					<search-input @input="input" @confirm="input" v-model="name"
						:placeholder="$t('pageCasino.searchInput')"></search-input>
					<span class="qx" @click.stop="back()">{{ $t('pageGame.qx') }}</span>
				</view>

				<div class="search-tips">{{ $t('pageGame.searchTips') }}</div>

				<div class="history-card" v-if="historySearch.length > 0">
					<div class="history-title">
						<span>{{ $t('pageGame.l1') }}</span>
						<span class="clean" @click="cleanHistory()"></span>
					</div>
					<!-- <div class="history-team h5">
						<span v-for="v in historySearch" @click="input({ target: { value: v } })">{{ v }}</span>

					</div> -->
					<div class="history-team">
						<div v-for="v, i in historySearch">
							<span class="ellipsis" @click="input({ target: { value: v } })">{{ v }}</span>
							<public-svg class="icon-close" icon="icon_Close" @click="cleanHistory(i)"></public-svg>
						</div>

					</div>
				</div>

				<!-- <div class="divider h5" v-if="historySearch.length > 0"></div> -->
			</div>


			<public-loading class="public-loadings" v-if="isApiOk"></public-loading>
			<view class="slot-card page-pading" v-else>
				<div class="search-title" v-if="name && hotGameList.length > 0">{{ $t('pageGame.l3') }}</div>
				<view class="title sb" v-if="!name && (type !== 0 || com !== 0 || game_company_code !== '')" v-show="showTitle">
					<view class="title-left">
						<!-- <img class="title-icon" src="@/assets/new/game/hot.png" alt=""> -->
						<span><text @click="$back(-1)" class="-btn">{{ wTitle ? title : $t('pageActivity.dt') }}<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3323 9.95914C13.5595 10.1891 13.5593 10.5604 13.332 10.7907L7.93678 16.2483C7.60861 16.5807 7.07491 16.5804 6.74644 16.2478C6.41856 15.9151 6.41879 15.3755 6.74695 15.0431L11.3622 10.3738L6.75087 5.70182C6.42299 5.36857 6.42321 4.82892 6.75138 4.49655C7.08013 4.16418 7.61382 4.1644 7.94171 4.49705L13.3323 9.95914Z" fill="#989898"/>
</svg></text>{{
							wTitle != '' ? wTitle : title }}</span>
					</view>
					<!-- <view class="btns">
						
						<view class="upper" @click="next(-1)" :class="{ 'dis': pages == 1 }"></view>
						<view class="next " @click="next(1)" :class="{ 'dis': lastPage <= pages }"></view>
					</view> -->
				</view>
				<!-- class="empty empty-card" :data-empty="$t('ui.empty')" -->
				<div>
					<public-grid :max="isPc ? 5 : 3" :margin='isPc ? 40 : 20' v-if="hotGameList.length > 0" class="empty"
						:data-empty="$t('ui.empty')">
						<public-game v-for="item, index in hotGameList" :key="index" :item="item"></public-game>
					</public-grid>
				</div>

				<div class="tips" v-if="hotGameList.length > 0">
					<span>{{$t('pageGame.t1')}} {{ totalCount }} {{$t('pageGame.t2')}}{{$t('pageGame.t3')}} {{ Math.min(pages*limit,totalCount) }} {{$t('pageGame.t2')}}</span>
				</div>
				<div class="more-btn" v-if="hotGameList.length > 0 && lastPage > pages" @click="onReachBottom">
					<span>{{$t('pageGame.t4')}}</span>
				</div>
				<!-- <arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage"></arrow-more> -->

			</view>

			<hot-game v-if="type === 0 && com === 0 && game_company_code === ''" class="hot-game"></hot-game>
			<!-- <div @click="jumpToTop = !jumpToTop">asdasds</div> -->
			<public-page-footer class="pc"></public-page-footer>
		</div>


	</page>
</template>

<script setup lang="ts">
import PublicPageFooter from '../components/public-page-footer.vue';
import PublicSvg from '../components/public-svg.vue';
import ScrollView from '../components/scroll-view.vue';
import Page from "../components/page.vue"
import ArrowMore from "../components/arrow-more.vue"
import PublicLoading from "../components/public-loading.vue"
import PublicGrid from "../components/public-grid.vue"
import PublicGame from "../components/public-game.vue"
import HotGame from "../components/hot-game.vue";
import SearchInput from "../components/search-input.vue"
import { nextTick, onUnmounted, ref, watch } from 'vue';
import { gameType, isPc, companyType, casinoClassify, languageIcon, languageName } from "../uilts/async.var";
import { open, back, onLoad, onShow } from "../router/routes";
import { addListener, dbGet, localDbGet, localDbSet } from "../uilts/db";
import { t } from "../uilts/i18n";
import { gameInit } from '../uilts/emit';

let pages = ref<number>(1)
let limit = isPc.value ? 15 : 24
let lastPage = ref<number>(1)
const totalCount = ref(0)
const name = ref<string>("")
let type = ref(0)
let com = ref(0)
let game_company_code = ref('')
const wTitle = ref()
const title = ref()
const hotGameList = ref<GetGameList['response']['list']>([])
const showMore = ref(false)
const showTitle = ref(false)
const isApiOk = ref(true)
const historySearch = ref<Array<string>>([])
const jumpToTop = ref(false)

const onBack = () => {
	// console.log(1111);
	back()
}

//获取游戏数据
let Log: Promise<any>;
const getGame = async (data: GetGameList['request']) => {
	Log && Log.abort();
	const game = Log = '/api/game/getGameList'.POST<GetGameList>(data, header)
	return game
}

const getGameList = () => {
	let request: GetGameList['request'] = {
		page: pages.value,
		limit,
		is_mobile: isPc.value ? 0 : 1
	};


	if (name.value) {
		request.name = name.value
	} else {
		if (type.value) request.type = type.value
		if (com.value) request.game_platform_id = com.value
		if (game_company_code.value) request.game_company_code = game_company_code.value
		// if(!type.value && !com.value && !game_company_code.value) return isApiOk.value = false;
		// console.log(game_company_code.value);

	}
	if (!name.value && !type.value && !com.value && !game_company_code.value) {
		isApiOk.value = false
		return false
	}
	getGame(request).then((ret) => {
		// hotGameList.value.length = 0
		ret.list.forEach((v) => {
			hotGameList.value.push(v)
		})
		showMore.value = false

		totalCount.value = ret.totalCount
		lastPage.value = Math.ceil(ret.totalCount / limit)
		if (!name.value) {
			showTitle.value = true
		} else {
			showTitle.value = false
		}
		// console.log(game_company_code.value);
	}).finally(() => {
		isApiOk.value = false
	})
}


const input = (e: { target: { value: string; }; }) => {
	// showTitle.value = false
	name.value = e.target?.value
	if (name.value.length < 3) return false;
	if (name.value && !historySearch.value.includes(name.value)) {
		historySearch.value.unshift(name.value)
		if (historySearch.value.length > 10) {
			historySearch.value.splice(historySearch.value.length - 1, 1)
			// console.log(historySearch.value.length);
		}


		localDbSet('historySearch', historySearch.value)
	}

	pages.value = 1
	hotGameList.value.length = 0
	isApiOk.value = true
	getGameList()
}

const changeMenu = (code: { name: string; id: number }) => {
	companyType.value = code
}

const cleanHistory = (index?: number) => {
	if (index) {
		historySearch.value.splice(index, 1)
	} else {
		historySearch.value.length = 0
	}

	localDbSet('historySearch', historySearch.value)
}

let header = {}


const next = (action: number) => {
	let pageed = Math.max(pages.value + action, 1);
	if (pageed < 0 || pageed > lastPage.value) {
		return
	}
	if (pageed == pages.value) {
		return
	}
	pages.value = pageed;
	getGameList()
}
// history-search
// const onReachBottomBut = () => {
// 	if (lastPage.value > pages.value) {
// 		showMore.value = true
// 		pages.value += 1
// 		getGameList()
// 	}
// }

//获取厂商列表
const collectLoading = ref(false);
const collect = ref<GetCompanyList['response']>([])

let collectPro: Promise<GetCompanyList['response']>;
const getCollect = () => {
	collectLoading.value = true;
	collectPro && collectPro.abort();
	collectPro = '/api/game/getGamePlatformList'.POST<GetCompanyList>({
		game_type:type.value
	});
	collectPro.then(ret => {
		collect.value.length = 0;
		ret.forEach((v) => collect.value.push(v))

	}).finally(() => {
		collectLoading.value = false;
	})
}

const onReachBottom = () => {
	if (lastPage.value > pages.value && showMore.value === false) {
		showMore.value = true
		pages.value += 1
		isApiOk.value = true
		getGameList()
	}
}


watch(gameType, (_newData, _oldData) => {
	type.value = gameType.value
	com.value = 0
	game_company_code.value = ''
	name.value = ''

	wTitle.value = ''
	isApiOk.value = true
	if (type.value === -1) title.value = t('pageActivity.hot')
	'/api/game/getGameTypeList'.POST<GetGameTypeList>().then(arr => {
		for (let item of arr) {
			if (item.id == type.value) {
				title.value = item.name
				return
			}
		}
	})

	hotGameList.value.splice(0, hotGameList.value.length)
	pages.value = 1
	getGameList()
})

watch(companyType, (_newData, _oldData) => {
	// type.value = 0
	// com.value = 0
	name.value = ''
	hotGameList.value.length = 0
	com.value = companyType.value.id
	wTitle.value = ''
	wTitle.value = companyType.value.name

	pages.value = 1
	isApiOk.value = true
	getGameList()
})


const onPullDownRefresh = () => {
	hotGameList.value.splice(0, hotGameList.value.length)
	pages.value = 1
	getGameList()
}

let get: PageData['/game'];
const init = () => {
	name.value = ''
	wTitle.value = ''
	title.value = ''
	game_company_code.value = ''
	com.value = 0
	type.value = 0
	hotGameList.value.splice(0, hotGameList.value.length)
	pages.value = 1
	// console.log(get);
	if (get.game_company_code) game_company_code.value = get.game_company_code as string
	localDbGet('historySearch').then(history => {
		historySearch.value = history
	}).catch(()=>{})

	if (get.n) wTitle.value = get.n
	if (type.value || com.value) wTitle.value = ''

	hotGameList.value.length = 0
	if (get.t) {
		type.value = get.t
		console.log(get)
		if (type.value === -1) {
			title.value = t('pageActivity.hot')
		}
		'/api/game/getGameTypeList'.POST<GetGameTypeList>().then(arr => {
			for (let item of arr) {
				if (item.id == type.value) {
					title.value = item.name
					return
				}
			}
		})
	} else {
		title.value = t('pageActivity.dt');
	}
	getCollect()
	if (get.c) {
		com.value = get.c

		'/api/game/getGamePlatformList'.POST<GetCompanyList>().then(arr => {
			for (let item of arr) {

				if (item.id == com.value) {
					wTitle.value = item.name
					return
				}
			}
		})
	}

	

	dbGet('token').then((token) => {
		header = {
			Authorization: token
		}
		getGameList()
	}).catch((_Error) => {
		getGameList()
	})

}

onUnmounted(() => {
	jumpToTop.value = false
})

onLoad<PageData['/game']>((e) => {
	get = e
	init();
	gameInit(() => {
		get = {}
		init()
	})
	// uni.$on('changeCategory', function (id) {
	// 	activeId.value = id;
	// })
	addListener('language', (type, _name) => {
		if (type === 'set') {
			init();
		}
	})


})
onShow<PageData['/game']>((e) => {
	
	get = e
	nextTick(() => {
		jumpToTop.value = false
		jumpToTop.value = true
	})


	init();
	// uni.$on('changeCategory', function (id) {
	// 	activeId.value = id;
	// })
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
@import "@/assets/font/font.css";

.tips{
	font-size: 0.5625rem;
	color: #c4c4c4;
	text-align: center;
	margin-top: 0.5625rem;
}

.more-btn{
	background-color: #1a1a1a;
	font-size: 0.675rem;
	color: #c4c4c4;
	height: 1.74375rem;
	line-height: 1.74375rem;
	align-items: center;
	text-align: center;
	border-radius: 0.28125rem;
	margin-top: 0.5625rem;
}

@include pc {
	.empty-card {
		min-height: 70vh;
	}
}

.page-pading {
	padding: 0 0.625rem;
}

.iconhome {
	font-family: iconfont;
	font-size: 1.2rem;
	background-image: -webkit-linear-gradient(top, #e1e1e1, #949494);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;

	&::before {
		content: "\e64f";
	}
}

.menu-card {
	// max-width: var(--content-max-width);
	width: 100%;
	// height: 1.5rem;
	left: 0;
	top: 0;
	position: absolute;
	top: calc(var(--headers-height) - 0.02rem);
	z-index: calc(var(--I1) + 1);
	background-color: #1a1a1a;
	white-space: nowrap;
	overflow: hidden;
	padding:  0;
	// left: 0;
	.menu-team {
		// width: 20%;
		padding: 0.75rem 1rem;
		// line-height: .5rem;
		flex-direction: column;
		display: inline-block;

		img {
			display: block;
			width: auto;
			height: 1.5rem;
			margin: auto;
		}

		span {
			text-align: center;
			display: block;
		}

		&.selected {
		background-color: #282828;
			span {
				color: #009d80;
			}

		}
	}
}

.menu-name {
	color: #FFFFFF;
	font-size: 0.75rem;
	padding-top: 0.25rem;
}

.search-tips {
	text-align: center;
	font-size: 0.75rem;
	color: #6e6e6e;
	padding: 0.625rem;
}

.history-card {
	padding: 0.625rem 0.625rem;
	color: #FFFFFF;

	.history-title {
		font-size: 0.75rem;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.clean {
			color: #FFFFFF;
			font-family: PingFang SC;

			font-style: normal;
			font-weight: 300;
			font-family: iconfont;
			font-size: 0.75rem;

			&::before {
				content: "\e634";
			}
		}
	}

	.history-team {
		color: #b3b3b3;
		text-align: center;
		font-family: PingFang SC;
		font-size: 0.75rem;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		display: flex;
		flex-wrap: wrap;
		padding: 0.625rem 0 0;
		display: flex;

		div {
			padding: 0.25rem 0.5rem;

			display: flex;
			justify-content: space-between;
			border-radius: 0.25rem;
			background: #1a1a1a;
			align-items: center;
			margin-right: 0.5rem;
			margin-bottom: 0.5rem;
		}


		.icon-close {
			width: 0.75rem;
			height: 0.75rem;
			fill: #b3b3b3;
			margin-left: 0.75rem;
		}
	}
}

.search-title {
	color: #FFFFFF;
	font-family: PingFang SC;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	padding: 0.625rem 0;

	@include pc {
		font-size: 24px;
		padding: 0;
		padding-bottom: 32px;
	}
}

page {
	background-color: var(--body-background-color);
	// padding-bottom: 6.2500rem;
	// --bgcolor: #1C1E22;
}

.public-loadings {
	width: 100%;
	height: 60vh;
	// margin-top: 25%;
}

.content {
	min-height: 100vh;


	@include pc {
		// padding: 36px 66px;
	}
}

.top-padding {
	padding-top: 5.05rem;
}

.scroll-view {
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}

	white-space: nowrap;
	width: calc(100% - 1.8750rem);
	margin: 0 0.9375rem;
	height: 2.6250rem;
	line-height: 2.6250rem;
	// background-color: #1C1E22;
	border-radius: 0.1087rem;
	margin-top: 0.9375rem;

	.introduce-meun-team {
		display: inline-block;
		font-size: 0.7819rem;
		color: #FFFFFF;
		padding: 0 0.9375rem;
		height: 2.6250rem;
		margin-right: 0.6250rem;
		background-color: #1E2024 !important;

		image {
			position: relative;
			top: 0.0625rem;
			width: 0.7813rem;
			height: 0.7813rem;
		}
	}

	.introduce-meun-team-sign {
		background-color: #2D3034 !important;
	}
}

.search-card {
	// margin-top: 1.2500rem;
	padding: 0.6250rem 0;
	position: relative;

	.qx {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		color: #FFFFFF;
		font-size: 0.8125rem;
	}
}


.btns {
	font-weight: normal;
	display: flex;

	.all {

		@extend %flex-center;
		margin-right: 0;
		color: #8E90CD;

		@include h5 {
			min-width: 3.1250rem;
			padding: 0 0.3125rem;
			height: 1.5625rem;
			background-color: #231d4e;
			font-size: 0.75rem;
			// font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			align-items: center;

			span {
				color: #00FFFF;
				font-size: 0.6rem;
				padding: 0 0.5rem;
			}
		}

		@include pc {
			color: #8E90CD;
			min-width: 87px;
			height: 40px;
			border-radius: 8px;
			border: 1px solid #2E2B4F;
			// opacity: 0.2;
			background: #2E2B4F;
			box-sizing: border-box;
			font-size: 16px;

			span {
				color: #8E90CD;
				font-size: 14px;
				padding: 0 0.5rem;
			}
		}


	}

	.upper,
	.next {
		margin-left: 5px;
		background-image: url(@/assets/new/index/arrow-no-dis.png);

		@include h5 {
			width: 1.5625rem;
			height: 1.5625rem;
			background-color: #231d4e;
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 1rem;
		}

		@include pc {
			width: 40px;
			height: 40px;
			background-color: #2E2B4F;
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 20px;
			border-radius: 8px;
			border: 1px solid #2E2B4F;
			box-sizing: border-box;
		}

		&.dis {
			background-image: url(@/assets/new/index/arrow-dis.png);
			background-color: #1E1B3B;
		}
	}

	.upper:not(.dis),
	.next.dis {
		transform: rotate(180deg);
	}

	.upper:hover {
		background-image: url(@/assets/new/index/arrow-no-dis.png);
		background-color: #2E2B4F;
		border: 1px solid #2E2B4F;
		transform: rotate(180deg);
	}

	.next:hover {
		background-image: url(@/assets/new/index/arrow-no-dis.png);
		background-color: #2E2B4F;
		border: 1px solid #2E2B4F;
		transform: rotate(0deg);
	}
}

.slot-card {
	padding: 0 0.625rem 0.6250rem;
}

.slot-list {
	display: flex;
	flex-wrap: wrap;

	// justify-content:space-between;
	.public-game {
		margin-right: 0.6250rem;
	}
}

%title-font {
	color: var(--MENU, #8E90CD);
	font-size: 0.865rem;
}

.title {
	@extend %title-font;
	background: url(@/assets/index/title-icon.png) no-repeat left center;
	background-size: 0.8750rem;

	@include h5 {
		padding-left: 1.3125rem;
		margin-bottom: 0.6250rem;
	}

	@include pc {
		margin: 32px 0;
	}

	svg{
		font-size: 0.865rem;
		width: 0.865rem;
	}

	&.no-icon,
	&.sb {
		background: none;
		padding: 0;
	}

	&.sb {
		display: flex;
		justify-content: space-between;
	}

	.title-left {
		display: flex;
		align-items: center;
		font-weight: 700;
		color: #FFFFFF;
		.-btn{
			color: #989898;
			display: flex;
			align-items: center;
		}
		@include h5 {
			img {
				width: 0.8750rem;
				height: 1.0625rem;
			}

			span {
				padding: 0 5px;
				display: flex;
			}
		}


		@include pc {
			img {
				width: 30px;
				height: 37px;
			}


			span {
				color: #8E90CD;
				font-family: PingFang SC;
				font-size: 24px;
				font-style: normal;
				font-weight: 500;
				line-height: 40px;
				/* 166.667% */
				padding: 0 13px;
			}
		}

	}
}
</style>