<template>
	<page :backing-out="isReg ? ()=> $back(1) : () => $back(-1)" :show-header="!h5fullscreenState" :page-style="{
		height: '100%'
	}">
		<template #header-content>
			<div class="header-content-auto">
				
				<!-- {{ $t('agentNew') }} -->
			</div>
		</template>
		<!-- <template #header-icon-right>
			<div class="flex-center">
				<svg class="fullscreen-icon-btn" @click="h5fullscreenState = !h5fullscreenState">
					<use xlink:href="@/assets/icon.svg#icon_FullScreen"></use>
				</svg>
			</div>
		</template> -->
		<template #header-icon-right>
			<span class="iconfont iconhomeempty" @click="$back(-1)"></span>
		</template>

		<div class="content ">
			<view class="iframe " :class="{ 'iframe2': isReg }">
				<view class="loading-if" v-if="loadingIframe">
					<!-- <img class="logo-icon" src="@/assets/LOGO88.png" /> -->
					<public-loading :color="'#009D80'"  class="public-loading"></public-loading>
					
				</view>
				<div v-if="html" v-html="html"></div>
				<iframe v-else :class="{ 'iframer': isReg }" ref="refiframe" v-show="!loadingIframe" :src="url" id="iframe"
					class="ifra" frameborder="0"></iframe>
			
			</view>
		</div>
	</page>
</template>

<script setup lang="ts">
import PublicPageFooter from '../components/public-page-footer.vue';
import Page from "../components/page.vue";
import HotGame from "../components/hot-game.vue";
import PublicGrid from '../components/public-grid.vue';
import PublicGame from '../components/public-game.vue';
import PublicLoading from "../components/public-loading.vue";
import { onMounted, ref, onUnmounted, nextTick } from "vue";
import { open, onLoad, onShow, back } from "../router/routes";
import { companyType, downloadBtnShow, isPc, isPwa } from "../uilts/async.var";
import { dbGet } from '../uilts/db';

const h5fullscreenState = ref(false);
const isReg = ref(false)
const refiframe = ref();
const item = ref<Games>()
let pinnacleOrigin = '';
const url = ref('');
const html = ref('');
const id = ref(0)
const fullscreen = () => {
	let el = document.getElementById('iframe');
	let method = el?.requestFullscreen || el?.webkitRequestFullscreen || el?.mozRequestFullscreen;
	if (method) {
		method.call(el);
	} else if (typeof window.ActiveXObject !== "undefined") {
		let ws = new ActiveXObject("WScript.Shell");
		ws.sendKeys("{F11}")
	}
}

const loadingIframe = ref(true);

const iframeLoad = () => {
	nextTick(() => {
		const iframe = document.getElementById('iframe') as HTMLIFrameElement;
		//attachEvent: 处理兼容性问题
		if (iframe?.attachEvent) {
			iframe?.attachEvent("onload", function () {
				// 加载完成
				loadingIframe.value = false;
			});
		} else {
			if (iframe) {
				iframe.onload = function () {
					// 加载完成
					loadingIframe.value = false;
				};
			}
		}
	});
}


const cc = (event: { origin: string; data: any; }) => {
	// check pinnacle origin 
	if (event.origin && event.origin.toLowerCase().endsWith(pinnacleOrigin)) {
		var postData = event.data;
		switch (postData.action) {
			case 'OPEN_WINDOW':
				var url = postData.url;
				window.open(url);
				break;
			default:
				break;
		}
	}
}
// #endif
const getGameData = () => {
	'/api/game/getGameData'.POST<GetGameData>({
		id: id.value
	}, {
		Authorization: async () => {
			try {
				return await dbGet('token')
			} catch (e) {
				return undefined
			}
		}
	}).then(ret => {
		item.value = ret
	});
}

const changeCompany = (code: string, name: string) => {
	companyType.value = {
		code,
		name
	}
	companyType.value.name = code
	open('/game', { game_company_code: code, n: name })
}

onUnmounted(() => {
	document.body.className = "";
	window.removeEventListener("message", cc)
})
// onBackPress(() => {
// 	back(-2);
// 	return true;
// })

onMounted(() => {
	iframeLoad();
});
onLoad<PageData["/customer-service"]>((get) => {
	downloadBtnShow.value = false
	document.documentElement.style.setProperty(`--download-height`, '0px');
	isReg.value = false
	if (get.url) {
		url.value = get.url;
	}
	if (get.html) {
		let encodedData = window.btoa(get.html);
		url.value = "data:text/html;base64," + encodedData;
	}
	if (get.reg == 1) isReg.value = true
	document.body.className = "webView";
	if (!isPwa.value) {
		pinnacleOrigin = import.meta.env.VITE_APP_GAME_URL;
		window.addEventListener("message", cc);
	}
	if (isPc.value && get.id) {
		id.value = get.id
		getGameData()
	}
})
onShow<PageData["/customer-service"]>((get) => {
	
	
	downloadBtnShow.value = false
	document.documentElement.style.setProperty(`--download-height`, '0px');
	console.log(downloadBtnShow.value);
	h5fullscreenState.value = false
	isReg.value = false
	if (get.reg == 1) isReg.value = true
	if (get.url) {
		url.value = get.url;
	}
	if (get.html) {
		let encodedData = window.btoa(get.html);
		url.value = "data:text/html;base64," + encodedData;
	}
	document.body.className = "webView";
	if (!isPwa.value) {
		pinnacleOrigin = import.meta.env.VITE_APP_GAME_URL;
		window.addEventListener("message", cc);
	}
	if (isPc.value && get.id) {
		id.value = get.id
		getGameData()
	}
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

%title-font {
	color: var(--MENU, #8E90CD);
	font-size: 14px;
	// font-weight:700;
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

		@include h5 {
			img {
				width: 0.8750rem;
				height: 1.0625rem;
			}

			span {
				padding: 0 5px;
			}
		}

		@include pc {
			img {
				width: 40px !important;
				height: 40px !important;
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

.bottom-box {
	border-radius: 0px 0px 24px 24px;
	background: #1D1A3F;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 20px;
	color: #908FA2;
	font-weight: 600;
	width: 100%;
	height: 78px;
	text-indent: 24px;

	.fullscreen-icon-btn {
		margin-right: 24px;
		fill: #FFFFFF;
	}
}

.content {
	@include pc {
		// padding: 32px;
	}
	height: 100%;
	background-color: #1F1F1F;
}

.iframe {
	// height: calc(100% - var(--headers-height));
	height:100%;
	// overflow: scroll;
}

.iframe2 {
	height:100%;
	// height: 130vh;
}

body {

	// padding-top: var(--tab-bar-height);
	// overflow-y:hidden;
	#chat-widget-container {
		display: none !important;
	}
}

web-view {
	height: 100%;
	// top:var(--tab-bar-height);
}

.loading-if {
	// max-width: 1280px;
	border-top: 1px solid #1F1F1F;
	width: 100%;
	height: 100%;
	// background-color: rgba(29, 26, 63, 1);
	justify-content: center;
	// display: flex;
	align-items: center;
	text-align: center;
	.logo-icon {
		display: block;
		width: 9.3750rem;
		margin: 20% auto 0.9375rem;
	}

	.public-loading {
		margin: 75% auto 0;
		height: auto;
	}
}

iframe {
	// max-width: 1280px;

	width: 100%;

	// background-color: #151618;
	// overflow: scroll;

	&:-webkit-full-screen {
		max-width: 100%;
		max-height: 100%;
	}

	&::-webkit-scrollbar {
		width: 5px;
		/* 设置滚动条宽度 */
		height: 5px;
	}

	&::-webkit-scrollbar-track {
		background-color: #1e2024;
		/* 设置滚动条轨道的背景颜色 */
	}

	&::-webkit-scrollbar-thumb {
		background-color: #4d565e;
		/* 设置滚动条的颜色 */
		border-radius: 4px;
		/* 设置滚动条的圆角 */
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: #555;
		/* 设置滚动条在悬停时的颜色 */
	}
}

.fullscreen-icon-btn {
	width: 1.8750rem;
	height: 1.8750rem;
	fill: #FFF;

	&:hover {
		fill: #FFF;
	}
}

.left-icon {
	transform: rotate(180deg);
}

.b-box {
	// max-width: 1280px;
	width: 100%;
	height: var(--headers-height);
	display: flex;
	margin: 0 auto;
	// flex-direction: row-reverse;
	justify-content: space-between;
	background-color: rgba(29, 26, 63, 1);
	padding: 0 0.6250rem;
	align-items: center;
	box-sizing: border-box;
	border-radius: 0.3125rem 0.3125rem 0 0;

	@include pc {
		background-color: transparent;
		padding: 16px 0;
		justify-content: left;

		span {
			color: #8E90CD;
			font-size: 20px;
			font-weight: 400;
			text-indent: 16px;
		}

		// height: 78px;
	}
}

.box2 {
	position: fixed;
	// top: var(--download-height);
}

.iframe {
	width: 100%;
	// height: calc(100% - $content-height);
	// display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

@media (max-width: 9999px) {
	.loading-if {
		height: 100%;
	}

	.loading-if {
		.logo-icon {
			margin: 50% auto 0.9375rem;
		}

	}

	// .b-box {
	// // position: fixed;
	// // top: 0
	// }
	iframe {
		height: 100%;
	}

	.iframer {
		height: 100%;
	}
}

@media (min-width: 9999px) {

	.loading-if,
	iframe {
		max-height: 720px;
	}

	iframe {
		height: 100%;
	}
}

.game-name {

	display: flex;
	justify-content: space-between;
	align-items: center;

	@include h5 {
		color: var(--MENU, #8E90CD);
		/* PingFang/Medium 28 */
		font-family: PingFang SC;
		font-size: 0.75rem;
		font-style: normal;
		font-weight: 500;
		padding: 0 0.6250rem;
		height: 2.5rem;
	}

	@include pc {
		padding: 0 20px 0 24px;
		color: #908FA2;
		font-family: Montserrat;
		font-size: 14px;
		font-style: normal;
		font-weight: 600;
		line-height: 16px;
		height: 52px;
		/* 114.286% */
	}

	span {
		width: calc(100% - 1.625rem);
		overflow: hidden;
	}

	.ellipsis2 {
		white-space: normal;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.collect-icon {

		@include h5 {
			width: 1.0000rem;
			height: 1.0000rem;
			border-radius: 50%;
			background-color: #FFFFFF;
		}

		@include pc {
			width: 18px;
			height: 18px;
		}

		display: flex;

		justify-content: center;
		align-items: center;

		img {
			@include h5 {
				width: 0.6250rem;
				height: 0.6250rem;
			}

			@include pc {
				width: 18px;
				height: 18px;
			}



		}
	}
}

.public-game {

	// max-width:12.5000rem;
	@include h5 {
		margin-bottom: 0.6250rem;
	}

	@include pc {
		margin-bottom: 16px;
	}
}

.public-image {
	width: inherit;
}

.slot-item {
	width: 100%;
	background-color: #1D1A3F;
	// margin-bottom:0.8125rem;
	overflow: hidden;

	@include h5 {
		border-radius: 0.1250rem;
	}

	@include pc {
		border-radius: 24px;
	}

	.game-nav {
		width: 100%;
		// min-height: 9.3750rem;
		transform: scale(1);
		filter: blur(0px);
		transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

		&:hover {
			// filter: blur(2px);
			transform: scale(1.1);
		}

		&:hover:before {
			content: "";
			backdrop-filter: blur(2px);
			border-radius: 0.4688rem;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			background-image: url(@/assets/new/game/pay.png);
			background-repeat: no-repeat;
			background-size: 40%;
			background-position: 50%;
			z-index: calc(var(--I1) + 0);
		}

	}

	.game-image {
		width: 100%;
		height: auto;
		background-position: center center;
		background-color: #201E47;
		;
		background-size: cover;
		border-radius: 0.1250rem;
		overflow: hidden;
		aspect-ratio: 1;
		// height:10.0000rem;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;

		.game_company_image {
			width: auto;
			height: 1.6875rem;
		}
	}

	.datas {
		padding: 0 0.3125rem 0.0000rem;
	}

	.name {
		font-size: 0.7813rem;
		color: #9BA6B3;
		min-height: 2.5000rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.text {
			width: 7.5000rem;
		}
	}

	.colect-btn {
		width: 1.4375rem;
		height: 1.4375rem;

		.icon {
			width: 100%;
			height: 100%;
			fill: #67707B;

			&:active {
				fill: #FFF;
			}
		}
	}

	.icon-btn {
		width: 1.1250rem;
		height: 1.1250rem;
		background: url(@/assets/index/collect.png) no-repeat center center;
		background-size: 100%;
	}

	.icon-btn-show {
		width: 1.1250rem;
		height: 1.1250rem;
		background: url(@/assets/index/collect-on.png) no-repeat center center;
		background-size: 100%;
	}

	.btn {
		// @include button(#2AE035);
		// @include button(#2D3035);
		// @include button-color(#2D3035);
		@extend %flex-center;
		background: #2D3035;
		width: 5.0000rem;
		height: 1.8750rem;
		font-size: 0.7500rem;
		border-radius: 0.1250rem;
		font-weight: normal;
		color: #FFF;

		&:active {
			background-color: #25c52d;
			// color:#2D3035;
		}
	}
}

@media (min-width: 9999px) {
	.slot-item {
		.game-nav {
			&:hover {
				// backdrop-filter: blur(2px);
				transform: scale(1.1);
			}

			&:hover:before {
				content: "";
				backdrop-filter: blur(2px);
				border-radius: 0.4688rem;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				background-image: url(@/assets/new/game/pay.png);
				background-repeat: no-repeat;
				background-size: 40%;
				background-position: 50%;
				z-index: calc(var(--I1) + 0);
			}
		}
	}

}
</style>