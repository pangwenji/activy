<template>
	<view :show-scrollbar="false" class="scroll-view_H" scroll-x="true">
		<view class="scrollber-content" :class="{ 'sc-style': all }">
			<view class="fund-details-meun-team xxx-btn" v-if="all" @click="onChange('0')"
				:class="{ 'fund-details-meun-team-sign': menu == '0' }">{{ $t('pageRebateRatio.all') }}</view>

			<view class="fund-details-meun-team xxx-btn" v-if="today" @click="onChange('today')"
				:class="{ 'fund-details-meun-team-sign': menu == 'today' }">{{ $t('pageRebateRatio.menu') }}</view>
			<view class="fund-details-meun-team xxx-btn" @click="onChange('yesterday')"
				:class="{ 'fund-details-meun-team-sign': menu == 'yesterday' }">{{ $t('pageRebateRatio.menu1') }}</view>
			<!-- <view class="fund-details-meun-team" @click="onChange('last_week')" :class="{'fund-details-meun-team-sign':menu =='last_week'}">{{$t('pageRebateRatio.menu2')}}</view> -->
			<!-- <view class="fund-details-meun-team" @click="onChange('week')" :class="{'fund-details-meun-team-sign':menu =='week'}">{{$t('pageRebateRatio.menu3')}}</view> -->
			<view class="fund-details-meun-team xxx-btn" @click="onChange('month')"
				:class="{ 'fund-details-meun-team-sign': menu == 'month' }">{{ $t('pageRebateRatio.menu4') }}</view>
			<view class="fund-details-meun-team xxx-btn" @click="onChange('last_month')"
				:class="{ 'fund-details-meun-team-sign': menu == 'last_month' }">{{ $t('pageRebateRatio.menu5') }}</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue"
const menu = ref('today')

const emit = defineEmits(['menu'])
const onChange = (e: any) => {
	menu.value = e
	emit('menu', e)
}

const props = defineProps<{
	today?: Boolean
	all?: Boolean
}>()

if (props.today) menu.value = 'today'
if (props.all) menu.value = '0'
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.scrollber-content {
	flex-wrap: nowrap;
	word-break: normal;
	white-space: nowrap;
	vertical-align: middle;
	display: flex;
	font-size: 0;
	width: 100%;

	@include h5 {
		justify-content: space-between;
	}
}

.sc-style {
	.fund-details-meun-team {
		@include h5 {
			min-width: calc(20% - 0.3125rem - 0.3125rem) !important;
		}

		@include pc {
			padding: 8px 30px;
		}
	}
}

.scroll-view_H {
	white-space: nowrap;
	font-size: 0;
	display: flex;

	line-height: 1.562rem;
	border-radius: 0.1087rem;

	@include h5 {
		height: 1.562rem;
		justify-content: space-between;
	}

	.fund-details-meun-team {
		display: inline-flex;

		@include h5 {
			min-width: calc(25% - 0.3125rem - 0.3125rem);
		}

		@include pc {
			padding: 8px 30px;
			margin-right: 20px;
		}

		border-radius: 0.25rem;
		// border: 1px solid rgba(73, 70, 118, 0.50);
		border: 1px solid #494949;
		// background:#201E47;
		background: transparent;
		// box-sizing:border-box;
		height: 1.562rem;
		justify-content: center;
		align-items: center;
		line-height:1.562rem;
		color:#fff;
		font-size: 0.75rem;
		text-align:center;
		// padding:0 0.9rem;
		// margin-right:0.38rem;
		text-align: center;
	}

	.fund-details-meun-team-sign {
		// color: #0FF;
		// background-color: #2E2C5E;
		// font-weight: 600;
		color: #0FF;
		font-size: 0.75rem;
		// background: #2E2C5E;
		border-color: #009d81;
	}
}
</style>