<template>
	<page>
		<div class="page-k page-pading">
			<view class="setting-team flex border">
				<view class="setting-title">
					<text>{{ $t('pageSettingSecure.msg') }}</text>
				</view>
				<view @click="switchUp" :class="{ 'setting-switch-sign': switchSign, 'setting-switch': !switchSign }"
					class="">

				</view>
			</view>

			<view class="setting-team">
				<view class="setting-title">
					<!-- <img class="word-icon" src="@/assets/icon/word.png" mode="" /> -->
					<text>{{ $t('pageSettingSecure.lang') }}</text>
				</view>
				<view class="setting-select xxx-btn" @click="$open('/language')">
					<img :src="languageIcon" class="icon-k" alt="">
					<text class="value">{{ lang }}</text>
					<public-svg class="right-icon" icon="icon_Arrow">
					</public-svg>
					<!-- <img class="setting-select-icon-top" src="@/assets/icon/arrow-top.png" mode=""></img> -->
				</view>
			</view>



			<view class="setting-team  padding">
				<view class="setting-title">
					<text>{{ $t('pageSettingSecure.clean') }}</text>
				</view>
				<view class="setting-select xxx-btn " @click="hint($t('pageSettingSecure.cleanOk'))">
					<text class="value ellipsis">{{ $t('pageSettingSecure.immediatelyClean') }}</text>
					<public-svg class="right-icon" icon="icon_Arrow">
					</public-svg>
				</view>
			</view>
		</div>


		<!-- 	<view class="setting-team  padding">
			<view class="setting-title">
				<text>{{$t('pageSettingSecure.we')}}</text>
			</view>
			<view class="setting-select xxx-btn" @click="$open('/brief')">
				<text class="value">{{$t('pageSettingSecure.immediately')}}</text>
				<img class="setting-select-icon-right" src="@/assets/index/arrow-no-dis.png" mode=""></img>
			</view>
		</view>
		
		<view class="setting-team  padding">
			<view class="setting-title">
				<text>{{$t('pageSettingSecure.help')}}</text>
			</view>
			<view class="setting-select xxx-btn" @click="$open('/help')">
				<text class="value">{{$t('pageSettingSecure.immediately')}}</text>
				<img class="setting-select-icon-right" src="@/assets/index/arrow-no-dis.png" mode=""></img>
			</view>
		</view> -->

	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import PublicSvg from '../components/public-svg.vue';
import { ref } from 'vue';
import { onLoad } from '../router/routes';
import { dbGet, dbSet } from '../uilts/db';
import { hint } from '../uilts/ui';
import { languageIcon } from '../uilts/async.var';
// pageSettingSecure.cleanOk

const lang = ref<string>('')

const switchSign = ref<boolean>(true)

const switchUp = () => {
	if (switchSign.value === false) {
		switchSign.value = true
		dbSet('msg', true)
	} else {
		switchSign.value = false
		dbSet('msg', false)
	}
}

onLoad(() => {
	dbGet('language').then(name => {
		dbGet('init').then(init => {
			let arr = init.language.filter((v) => name == v.lang);
			if (arr[0]) {
				lang.value = arr[0].remark;
			}
		})
	})

	dbGet('msg').then(name => {
		switchSign.value = name
	})
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.page-k {
	// padding: 0.6250rem;
}

.flex {
	display: flex;
}
.icon-k{
	margin-right: 5px;
	width: 1.1250rem;
	height: 1.1250rem;
}
.border {
	border-bottom: 0.0313rem solid #2C2F34;
}

.padding {
	padding-bottom: 0.9375rem;
}

.setting-team {
	display: flex;
	justify-content: space-between;
	padding: 1.1250rem 0.7500rem;
	margin-bottom: 0.5000rem;
	border-radius: 0.1875rem;
	background: #231D4E;

	.setting-title {
		height: 2.1875rem;
		line-height: 2.1875rem;
		display: flex;

		.word-icon {
			display: block;
			width: 0.9550rem;
			height: 0.9550rem;
			margin-top: 0.5625rem;
			margin-right: 0.3125rem;
		}

		text {

			color: var(--MENU, #8E90CD);
font-family: PingFang SC;
font-size: 0.8750rem;
font-style: normal;
font-weight: 400;
line-height: 40px; /* 142.857% */
		}
	}

	.setting-select {
		// background-color: #2D2D35;
		display: flex;
		align-items: center;
		font-size: 0.7813rem;
		border-radius: 0.1084rem;
		// width: 12.1875rem;
		// height: 2.0625rem;
		// line-height: 2.0625rem;
		display: flex;


		.value {
			color: var(--MENU, #8E90CD);
font-family: PingFang SC;
font-size: 0.8750rem;
font-style: normal;
font-weight: 400;
line-height: 40px; /* 142.857% */
		}

		.setting-select-icon-top {
			display: block;
			margin-top: 0.8281rem;
			width: 0.7375rem;
			height: 0.4063rem;
			margin-left: auto;
			margin-right: 0.4063rem;
		}

		.right-icon {
			width: 0.7500rem;
			height: 0.7500rem;
			fill: #8E90CD;
		}
	}

	.setting-select:active {
		background-color: #494958;
	}

	.setting-select:active {
		background-color: #78806a;
	}

	.setting-switch {
		background-color: #787880;
		width: 2.8000rem;
		height: 1.2153rem;
		border-radius: 19.44px;
		margin-top: 0.4375rem;
		margin-left: auto;
		position: relative;
	}

	.setting-switch-sign {
		background-color: #00FFFF;
		width: 2.8000rem;
		height: 1.2153rem;
		border-radius: 19.44px;
		margin-top: 0.4375rem;
		margin-left: auto;
		position: relative;
	}

	.setting-switch-sign::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		width: 1.2153rem;
		height: 1.2153rem;
		border-radius: 50%;
		background-color: #231d4e;
	}

	.setting-switch::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 1.2153rem;
		height: 1.2153rem;
		border-radius: 50%;
		background-color: #FFFFFF;
	}
}</style>