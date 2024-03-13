<template>
	<div>
		<div class="download-placeholder"></div>
		<view class="download">
			<div class="download-left">
				<div class="close">
					<public-svg class="icon" icon="icon_Close" @click="showDown()"></public-svg>
				</div>
				<view class="download-tips">
					<div class="p1">{{ $t('appName2') }}</div>
					<div class="p2">{{ $t('components.public-page-head.download') }}</div>
				</view>
			</div>
			<view class="download-btns">
				<view class="btn" v-if="isPrompt" @click="addToHomeScreen()">
					{{ $t('components.public-page-head.download-btn') }}
				</view>
				<a class="btn" v-else-if="isAndroid || isPc" download :href="isIOS ? iosUrl : androidUrl"
					@click="downStatistics()">
					{{ $t('components.public-page-head.download-btn') }}
				</a>
				<view class="btn" v-else-if="isIOS" @click="$open('/phone')">
					{{ $t('components.public-page-head.download-btn') }}
				</view>
			</view>
		</view>
	</div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import PublicSvg from './public-svg.vue';
import { androidUrl, deferredPrompt, downloadBtnShow, iosUrl, isAdd, isAndroid, isIOS, isPc, isPrompt, isPwa, rootQuery } from "../uilts/async.var";

import { addToHomeScreen, downStatistics } from '../uilts/base';


const showTop = ref(false);

const showDown = () => {
	downloadBtnShow.value = false
	document.documentElement.style.setProperty(`--download-height`, '0px');
}

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
		document.documentElement.style.setProperty(`--download-height`, '3.4375rem');
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
		if (!isPc.value) document.documentElement.style.setProperty(`--download-height`, '3.4375rem');

	})
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.btn {
	height: 2.1875rem;
	background-color: #a0f10d;
	border-radius: 0.28rem;
	font-family: SF Pro;
	color: #0d0c0c;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	font-weight: 600;
	padding: 0 1.2500rem;
	box-sizing: border-box;
	cursor: pointer;
	-webkit-box-shadow: 0 1px 2px 0 rgba(255, 229, 42, .5) inset, 0 -1px 1px 0 rgba(46, 72, 50, .5) inset;
	box-shadow: inset 0 1px 2px 0 rgba(255, 229, 42, .5), inset 0 -1px 1px 0 rgba(46, 72, 50, .5);
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
}

.download-placeholder {
	height: var(--download-height);
}

.download {
	position: fixed;
	overflow: hidden;
	left: 0;
	right: 0;
	top: 0;
	height: var(--download-height);
	max-width: 100%;
	z-index: calc(var(--IMAX) + 0);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.6250rem;
	color: #98a7b5;
	font-size: 0.7500rem;
	background: -webkit-linear-gradient(281deg, #4d820b, rgba(0, 75, 61, .8));
	background: -o-linear-gradient(281deg, #4d820b 0, rgba(0, 75, 61, .8) 100%);
	background: linear-gradient(169deg, #4d820b, rgba(0, 75, 61, .8));
	padding: 0 0.12rem 0 1.42rem;
	box-sizing: border-box;

	.download-left {
		display: flex;
		align-items: center;

		.close {
			position: absolute;
			top: 0;
			left: 0;
			width: 1.72rem;
			height: 1.72rem;
			background-color: #d8d8d8;
			border-radius: 0 0 0.2rem;
			font-size: .1rem;
			color: #000;
			text-indent: 0.05rem;
			line-height: .17rem;
			border-radius: 0 0 1.82rem;
			padding: .08rem 0 0 .18rem;
			box-sizing: border-box;
		}

		.icon {
			fill: #000;
			width: .8rem
		}
	}

	.btn {
		text-decoration: none;
		margin: 0;
		margin-right: 0.6250rem;
		flex-wrap: nowrap;
		word-break: normal;
		white-space: nowrap;
		vertical-align: middle;
	}
}

.download-tips {
	// background: url(@/assets/public-page-head/tubiao.png) no-repeat left center;
	// background-size: auto 1.8750rem;
	padding-left: 0.625rem;
	padding-right: 0.6250rem;
	font-family: SF Pro;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-ms-flex-direction: column;
	flex-direction: column;
	font-weight: 600;

	.p1 {
		font-size: .84rem;
		color: #b6ff00;
		padding-bottom: .1rem;
		box-sizing: border-box;
	}

	.p2 {
		font-size: .64rem;
		color: #ffffff;
	}
}

.download-btns {
	display: flex;
	align-items: center;
}

@media (min-width: 9999px) {
	.download {
		bottom: 3.7500rem;
		right: auto;
		// left: 3.7500rem;
	}
}
</style>