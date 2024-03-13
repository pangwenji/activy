<template>
	<page>
		<view class="content page-pading">
			<text class="tips">{{$t('pageChatRule.t1')}}</text>
			<text class="tips">{{$t('pageChatRule.t2')}}</text>
			<text class="tips">{{$t('pageChatRule.t3')}}</text>
			<text class="tips">{{$t('pageChatRule.t4')}}</text>
			<text class="tips">{{$t('pageChatRule.t5')}}</text>
			<text class="tips">{{$t('pageChatRule.t6')}}</text>
			<text class="tips">{{$t('pageChatRule.t7')}}</text>
			<text class="tips">{{$t('pageChatRule.t8')}}</text>
			<text class="tips">{{$t('pageChatRule.t9')}}</text>
			<text class="tips">{{$t('pageChatRule.t10')}}</text>
		</view>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
</script>

<style lang="scss" scoped>
	// .container{
	// 	// border-top: 0.0313rem solid #2C2F34;
	// 	// padding-top: 0.6250rem;
	// }
	.content{
		// padding-top: 0.6250rem;
	}
	.tips{
		display: block;
		font-size: 0.7813rem;
		color: #808185;
		padding: 0.3125rem 0;
	}
</style>
