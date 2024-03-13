<template>
	<page>
		
		<view class="head">
			
			<img class="user-head" src="@/assets/user/user.png" mode="" />
			
			<text class="t1">{{ '张三' + $t('pageChatSingle.issueRed')}}</text>
			
			<text class="t1-num">1987.26</text>
			
			
			<view class="head-bottom">
				
				<view class="head-bottom-left">
					<text>67</text>
					<text>{{$t('pageRrecordRed.receiveRed')}}</text>
				</view>
				
				<view class="head-bottom-right">
					<text>6</text>
					<text>{{$t('pageRrecordRed.best')}}</text>
				</view>
				
			</view>
			
			
			<view class="tab-view tab-left">
				<text>{{$t('pageRrecordRed.receive')}}</text>
				<img src="@/assets/red/arrow-down.png" mode="" />
			</view>
			
			<view class="tab-view tab-right">
				<text>{{'2023' + $t('pageRrecordRed.years')}}</text>
				<img src="@/assets/red/arrow-down.png" mode="" />
			</view>
		</view>
		<view class="list-view">
			<view class="list-team" v-for="i in 5" :key="i">
				<!-- <img class="list-icon" src="@/assets/user/user.png" mode=""></img> -->
				<view class="list-team-content">
					<view class="list-team-content-top">
						<text>Ordinary</text>
						<text>$23</text>
					</view>
					<view class="list-team-content-bottom">
						<text>2023.07.24</text>
						<text>0/10</text>
					</view>
				</view>
			</view>
		</view>
		
		
		
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";


	.head{
		padding-top: 2.1875rem;
		padding-bottom: 1.8750rem;
		background-color: #1E2024;
		text-align: center;
		position: relative;
		.tab-view{
			position: absolute;
			color: #AD8C51;
			font-size: 0.7813rem;
			img{
				display: block;
				width: 0.7188rem;
				height: 0.4063rem;
				margin: 0.3125rem auto;
			}
		}
		.tab-left{
			top:0.9375rem;
			left:0.9375rem;
		}
		.tab-right{
			top:0.9375rem;
			right:0.9375rem;
		}
		.user-head{
			display: block;
			margin: auto;
			width: 3.0000rem;
			height: 3.0000rem;
		}
		.t1{
			display: block;
			color: #D1D1D1;
			font-size: 0.7813rem;
			margin-top: 1.0938rem;
		}
		
		.t1-num{
			display: block;
			font-size: 2.6031rem;
			font-weight: 500;
			color: #FFFFFF;
			margin-top: 1.2500rem;
		}
		
		.head-bottom{
			margin-top: 2.0313rem;
			display: flex;
			text{
				color: #9BA6B3;
				display: block;
			}
			.head-bottom-left,.head-bottom-right{
				width: 50%;
				text:first-child{
					font-size: 2.1688rem;
				}
				text:last-child{
					margin: auto;
					text-align: center;
					width: 80%;
					font-size: 0.7813rem;
				}
			}
		}
	}
	
	.list-view{
		padding-bottom: 3.1250rem;
		.list-team{
			display: flex;
			padding: 0.7813rem;
			
			border-bottom: 0.1250rem solid #363940;
			.list-icon{
				width: 2.1563rem;
				height: 2.1563rem;
			}
			.list-team-content{
				margin-left: 0.3125rem;
				width: calc(100% - 1.5625rem);
				.list-team-content-top{
					width: 100%;
					display: flex;
					text{
						display: block;
						color: #FFFFFF;
						font-size: 0.7813rem;
					}
					text:last-child{
						margin-left: auto;
						margin-right: 0;
					}
				}
				.list-team-content-bottom{
					width: 100%;
					margin-top: 0.3125rem;
					display: flex;
					text{
						display: block;
						color: #9BA6B3;
						font-size: 0.7813rem;
					}
					text:last-child{
						margin-left: auto;
						margin-right: 0;
					}
				}
			}
		}
		.list-team:last-child{
			border-bottom: none;
		}
	}
</style>
