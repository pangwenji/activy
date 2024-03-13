<template>
	<page>
		<div class="page-pading">
			<view class="logo-icon">
				<image class="logo-icon-let" src="@/assets/logo.png" mode=""></image>
				<image class="logo-icon-txt" src="@/assets/759.png" mode=""></image>
			</view>

			<view class="brief-name">{{ $t('pageSettingBrief.briefName') }}</view>


			<text class="tips">
				<text class="tips-title">{{ $t('pageSettingBrief.a1') }}</text>
				{{ $t('pageSettingBrief.a2') }}
			</text>
			<text class="tips">
				<text class="tips-title">{{ $t('pageSettingBrief.a3') }}</text>
				{{ $t('pageSettingBrief.a4') }}
			</text>
			<text class="tips">
				<text class="tips-title">{{ $t('pageSettingBrief.a5') }}</text>
				{{ $t('pageSettingBrief.a6') }}
			</text>
			<text class="tips">
				<text class="tips-title">{{ $t('pageSettingBrief.a7') }}</text>
				{{ $t('pageSettingBrief.a8') }}
			</text>
		</div>


	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.logo-icon {
	margin: 1.5625rem auto 1.2500rem;
	text-align: center;

	.logo-icon-let {
		width: 1.2500rem;
		height: 1.4688rem;
	}

	.logo-icon-txt {
		width: 7.1375rem;
		height: 1.1875rem;
		margin-left: 0.6250rem;
	}
}

.brief-name {
	font-size: 0.7813rem;
	color: #FEFEFE;
	text-align: center;
}

.brief-content {
	margin-left: 0.9375rem;
	margin-right: 0.9375rem;
	margin-top: 0.9375rem;
	text-align: center;
	font-size: 0.7813rem;
	color: #808185;
}

.tips {
	display: block;
	font-size: 0.7813rem;
	color: #808185;
	padding: 0.6250rem 0.7813rem;

	.tips-title {
		display: block;
	}
}</style>
