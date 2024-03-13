<script setup lang="ts">
import Download from './components/download.vue';
import H5Add from './components/h5-add.vue';
import { onMounted, computed, ref } from 'vue'
import PublicSvg from './components/public-svg.vue';
// import DownloadBtn from './components/download-btn.vue';
import RootLeft from "./root-left.vue";
import { androidUrl, deferredPrompt, downloadBtnShow, iosUrl, isAdd, isAndroid, isFirstOpenApp, isIOS, isIndexKeepAlive, isPc, isPrompt, isPwa, rootQuery } from "./uilts/async.var";

import PublicPageHead from './components/public-page-head.vue';
import { router } from './router/routes';
import { routerTabs } from './router/config';
// import { addToHomeScreen, downStatistics } from './uilts/base';
const top = () => {
	scrollTo(0, 0);
}



const showTop = ref(false);
const showHeader = computed(() => {
	if (isFirstOpenApp.value) {
		isFirstOpenApp.value = false;
		let path = router.currentRoute.value.name || router.currentRoute.value.path;
		let isTabView = routerTabs.findIndex(item => item.path === path) > -1;
		return !(isTabView || path === '/')
	}
	return false || !isIndexKeepAlive.value;
})
onMounted(() => {
	try {
		let u = navigator.userAgent;
		isAndroid.value = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
		isIOS.value = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		isPwa.value = ["fullscreen", "standalone", "minimal-ui"].some(
			(displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches
		);
	} catch (error) {

	}
	isAdd.value = (isIOS.value && !isPwa.value);
	window.addEventListener('scroll', (e) => {
		showTop.value = (e.target?.scrollingElement.scrollTop || 0) > 500
	})
	window.addEventListener('beforeinstallprompt', function (e) {
		isPrompt.value = true;
		downloadBtnShow.value = true;
		if (e) {
			deferredPrompt.value = e;
			e.preventDefault();
			e.stopPropagation();//阻止事件冒泡
			return false;
		}
	}, false);
	"/api/public/getAppLeastVersion".GET<GetAppLeastVersion>().then(ret => {
		androidUrl.value = ret.android.url;
		iosUrl.value = ret.ios.url;
		downloadBtnShow.value = true;
	})
})
</script>


<template>
	<teleport to="#fixed-area">
		<download
			v-if="rootQuery['isapp'] != '1' && !isPc && (isPrompt || (isAndroid && androidUrl) || (isIOS) || (isPc && (iosUrl || androidUrl))) && !isPwa">
		</download>
		<!-- <public-page-head v-if="isPc && showHeader"></public-page-head> -->
		<root-left></root-left>

		<view class="sts pc" @click="top()" v-if="isPc && showTop">
			<svg xmlns="http://www.w3.org/2000/svg" width="98" height="98" viewBox="0 0 98 98" fill="none">
				<g clip-path="url(#clip0_12432_24444)">
					<g filter="url(#filter0_bii_12432_24444)">
						<rect width="98" height="98" rx="24" fill="#181538" fill-opacity="0.55" />
						<rect x="1" y="1" width="96" height="96" rx="23" stroke="url(#paint0_linear_12432_24444)"
							stroke-width="2" />
					</g>
					<path fill-rule="evenodd" clip-rule="evenodd"
						d="M49.0817 42.3354C48.6219 41.8811 47.8792 41.8814 47.4186 42.3361L36.5034 53.1264C35.8387 53.7828 35.8391 54.8502 36.5044 55.5071C37.1697 56.1629 38.249 56.1624 38.9138 55.5061L48.2524 46.2755L57.5964 55.4983C58.2629 56.154 59.3422 56.1536 60.0069 55.4972C60.6716 54.8397 60.6712 53.7724 60.0059 53.1166L49.0817 42.3354Z"
						fill="url(#paint1_linear_12432_24444)" />
				</g>
				<defs>
					<filter id="filter0_bii_12432_24444" x="-6" y="-6" width="110" height="110" filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB">
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feGaussianBlur in="BackgroundImageFix" stdDeviation="3" />
						<feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_12432_24444" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_12432_24444" result="shape" />
						<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha" />
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="6" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix type="matrix"
							values="0 0 0 0 0.270588 0 0 0 0 0.247059 0 0 0 0 0.533333 0 0 0 0.5 0" />
						<feBlend mode="normal" in2="shape" result="effect2_innerShadow_12432_24444" />
						<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha" />
						<feOffset dy="-4" />
						<feGaussianBlur stdDeviation="6" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix type="matrix"
							values="0 0 0 0 0.184314 0 0 0 0 0.164706 0 0 0 0 0.403922 0 0 0 0.6 0" />
						<feBlend mode="normal" in2="effect2_innerShadow_12432_24444"
							result="effect3_innerShadow_12432_24444" />
					</filter>
					<linearGradient id="paint0_linear_12432_24444" x1="49" y1="0" x2="49" y2="98"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#181538" stop-opacity="0.84" />
						<stop offset="1" stop-color="#181538" stop-opacity="0.58" />
					</linearGradient>
					<linearGradient id="paint1_linear_12432_24444" x1="60.4426" y1="42.0115" x2="60.4484" y2="55.9671"
						gradientUnits="userSpaceOnUse">
						<stop stop-color="#00FFFF" />
						<stop offset="1" stop-color="#FF92FF" />
					</linearGradient>
					<clipPath id="clip0_12432_24444">
						<rect width="98" height="98" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</view>
		<h5-add v-if="isIOS && !isPwa && false">
			<template #content>
				<view class="ios-card">
					<view class="ios-card-title">{{ $t('iosAdd.t1') }}</view>
					<view class="ios-card-tel">
						<img class="ios-card-tel-1" src="@/assets/hall/tel.png" mode="widthFix" />
						<img class="ios-card-tel-2" src="@/assets/hall/logo.png" mode="widthFix" />
					</view>
					<view class="ios-card-team">
						<view class="ios-card-team-title">
							<text>{{ $t('iosAdd.t2') }}</text>{{ $t('iosAdd.t3') }}
						</view>
						<view class="ios-card-team-content">
							<img class="tabs-png" src="@/assets/hall/tabs.png" mode="widthFix" />
						</view>
					</view>
					<view class="ios-card-team">
						<view class="ios-card-team-title">
							<text>{{ $t('iosAdd.t4') }}</text>{{ $t('iosAdd.t5') }}
						</view>
						<view class="ios-card-team-content">
							<view class="ios-card-team-content-d">
								<text>{{ $t('iosAdd.t6') }}</text>
								<img src="@/assets/hall/xin.png" mode="widthFix" />
							</view>
							<view class="ios-card-team-content-d">
								<text>{{ $t('iosAdd.t7') }}</text>
								<img src="@/assets/hall/sou.png" mode="widthFix" />
							</view>
							<view class="ios-card-team-content-d">
								<text>{{ $t('iosAdd.t8') }}</text>
								<img src="@/assets/hall/jia.png" mode="widthFix" />
							</view>
						</view>
					</view>
				</view>
			</template>
		</h5-add>
	</teleport>
</template>

<style lang="scss" scoped>
@import "./scss/public.scss";
@import "./scss/router-animation.scss";


.ios-card {
	padding-top: 1.5625rem;
	padding-bottom: 1.5625rem;
	background-color: #F2F2F2;
	border-radius: 0.4688rem;

	.ios-card-title {
		color: #000000;
		font-size: 1.0000rem;
		font-weight: bold;
		text-align: center;
	}

	.ios-card-tel {
		display: flex;
		padding: 0.625rem;
		justify-content: space-around;
		align-items: center;

		.ios-card-tel-1 {
			width: 100px;
			height: auto;
		}

		.ios-card-tel-2 {
			width: 100px;
			height: 100px;
		}
	}

	.ios-card-team {
		padding: 0.9375rem;
		font-size: 0.8750rem;

		text {
			color: #2074E1;
		}

		.tabs-png {
			margin-top: 0.9375rem;
			width: 100%;
		}

		.ios-card-team-content-d {
			margin-top: 0.1563rem;
			padding: 0.6250rem;
			background-color: #ffffff;
			display: flex;

			text {
				color: #323232;
			}

			img {
				display: block;
				width: 0.8750rem;
				height: 0.8125rem;
				margin-left: auto;

			}
		}
	}
}


.sts {
	position: fixed;
	z-index: calc(var(--I1) + 0);
	right: 1.2500rem;
	bottom: 5.0000rem;
	width: 3.3750rem;
	height: 3.3750rem;
	border-radius: 0.2500rem;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	font-size: 0.8750rem;
	display: flex;
	-webkit-align-items: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	// background-color: #25272C;
	color: #ffffff;
	cursor: pointer;

	.icon {
		width: 0.9375rem;
		height: 0.9375rem;
		transform: rotate(-90deg);
	}
}


.btn {
	@include button(#2AE035);
	background-color: rgba(49, 46, 99, 0.55);
	padding: 0 1.2500rem;
	height: 2.1875rem;
	font-weight: normal;
	margin-left: 0.6250rem;
	text-decoration: none;

	&.white {
		background: none;
		color: #98A7B5;
		font-weight: normal;
	}
}

.icon {
	width: 1.2500rem;
	height: 1.2500rem;
	fill: #9BA6B3;
	cursor: pointer;
}

.icon-btns {
	display: flex;
	align-items: center;
}</style>
