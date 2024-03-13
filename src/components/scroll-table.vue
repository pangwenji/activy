<template>
  <scroll-view class="table-scroll-view" :scroll-x="true" >
  	<view class="table-view">
  	
  		<view class="tabs">
  	
  			<view class="tabs-view">
				<view class="empty" :data-empty="$t('ui.empty')" v-if="!list.length"></view>
  				<!-- <public-loading class="loading" v-if="!list.length"></public-loading> -->
  				<view class="table" v-else>
  					<view class="table-row head">
						<view class="table-cell" v-for="v,i in tableMenu" :key="i">
							{{v}}
						</view>
  					</view>
					
					<view class="table-row" v-for="item,index in list" :key="index">
						
						<view class="table-cell" v-for="v,i in item" :key="i">
							<view  @click="v['url'] ? $open(v['url'],v['data']) : ''" :style="{color:v['color']}">
								{{v.value}}
							</view>
						</view>
						
					</view>
  					
  	
  				</view>
  				<arrow-more v-if="lastPage" :showMore="showMore" :page="page" :lastPage="lastPage" @click="onReachBottomBtn()">
  				</arrow-more>
  			</view>
  		</view>
  	</view>
  </scroll-view>
</template>

<script setup lang="ts">
import ScrollView from "../components/scroll-view.vue";
	import ArrowMore from "../components/arrow-more.vue"
	import { defineProps } from "vue";
	
	defineProps<{
		tableMenu:Array<any>,
		list:Array<any>,
		modelValue?:boolean,
		showMore ?: boolean,
		page ?: number,
		lastPage ?: number,
	}>()
	const emit = defineEmits(['onReachBottomBtn','update:modelValue'])
	const onReachBottomBtn = () => {
		emit('onReachBottomBtn')
	}
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
	.table-scroll-view{
		width: 100%;
		background-color: #13171d;
	}
	
	.table-view {
		flex-wrap: nowrap;
		word-break: normal;
		white-space: nowrap;
		vertical-align: middle;
	}
	
	.tabs {
		background-color: var(--bgcolor);
		padding: 0.6250rem 0;
		font-size: 0.7500rem;
	
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
		min-width: 100%;
		color: #98A7B5;
		font-size: 0.7500rem;
		text-align: center;
		font-weight: 600;
	
		.ellipsis {
			max-width: calc((100vw - 1.2500rem) / 4);
		}
	
		.table-cell {
			direction: unset;
			min-width:20%;
			padding:0 0.6250rem;
			height: 2.8750rem;
			vertical-align: middle;
	
			&:nth-child(1) {
				text-align: left;
				direction: ltr;
				padding-left: 0.6250rem;
			}
	
			&:last-child {
				text-align: right;
				// direction: rtl;
				padding-right: 0.6250rem;
			}
		}
	
		.table-row {
			cursor: pointer;
			// display: flex;
			&:not(.head):active {
				background-color: #2D3034;
			}
	
			&:not(.head) .table-cell {
				color: #98A7B5;
	
				&:last-child {
					position: relative;
					// color: #3BC117;
				}
	
				&:last-child::after {
					content: "";
					bottom: 0;
					right: 0;
					width: 3.1250rem;
					height: 0.3125rem;
					background-color: #2AE035;
				}
	
				// &:nth-child(2) {
				// 	color: #FFF;
				// }
			}
	
			image {
				width: 0.8125rem;
				height: 0.8125rem;
				display: inline-block;
				vertical-align: middle;
				margin-top: -0.3125rem;
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
	
</style>