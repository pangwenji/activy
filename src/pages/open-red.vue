<template>
	<page>
		<view style="background-color: #1E2024;">
			<view class="head">
				
			</view>
			<view class="user-card">
				<img src="@/assets/user/user.png" mode="" />
				<text>Aehjtuy</text>
			</view>
			<text class="t1">{{$t('pageChatSingle.issueRed')}}</text>
			<text class="t2">{{$t('pageChatSingle.redgxfc')}}</text>
			<view class="moneys-view">
				<text class="m1">0.01</text>
				<text class="m2">$</text>
			</view>
			<text class="t3">{{$t('pageChatSingle.tips')}}</text>
			
			<text class="list-tips">{{ 10 + $t('pageChatSingle.statistics_1') + '4分钟' + $t('pageChatSingle.statistics_2')}}</text>
		</view>
		
		
		<view class="list-view">
			
			<view class="list-team" v-for="i in 2">
				<img class="list-icon" src="@/assets/user/user.png" mode="" />
				<view class="list-team-content">
					<view class="list-team-content-top">
						<text>Ordinary</text>
						<text>$23</text>
					</view>
					<view class="list-team-content-bottom">
						<text>2023.07.24</text>
						<img v-if="i == 1" class="zan" src="@/assets/red/zan.png" mode="" />
					</view>
				</view>
			</view>
		</view>
		
		
	</page>
</template>

<script setup lang="ts">
	import Page from '../components/page.vue'
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
	// page{
	// 	background-color: #232529;
	// }
	.head{
		
		background-color: #E1604C;
		overflow: hidden;
		width: 120%;
		margin-left: -10%;
		height: 3.1250rem;
		border-radius: 0 0 50% 50% / 0 0 100% 100%;
	}
	
	.user-card{
		display: flex;
		height: 2.1563rem;
		line-height: 2.1563rem;
		justify-content: center;
		padding: 0.9375rem 0;
		img{
			width: 2.1563rem;
			height: 2.1563rem;
		}
		text{
			font-size: 1.0313rem;
			color: #D1D1D1;
			margin-left: 0.2500rem;
		}
	}
	
	.t1{
		font-size: 1.0313rem;
		color: #D1D1D1;
		text-align: center;
		display: block;
		padding:0 0.9375rem 0.6250rem;
	}
	
	.t2{
		font-size: 0.7813rem;
		color: #535353;
		text-align: center;
		display: block;
		padding:0 0.9375rem 0.6250rem;
	}
	
	.t3{
		font-size: 0.7813rem;
		color: #BDA475;
		text-align: center;
		display: block;
		padding:0 0.9375rem 0.6250rem;
	}
	
	.t4{
		font-size: 0.7813rem;
		color: #9BA6B3;
		text-align: center;
		display: block;
		padding:3.1250rem 1.5625rem 1.5625rem;
		
		// position: absolute;
		// bottom: 1.2500rem;
	}
	
	.moneys-view{
		padding:0.3125rem 0.9375rem 0.0000rem;
		font-size: 0.7813rem;
		color: #BDA475;
		text-align: center;
		.m1{
			font-size: 3.4688rem;
		}
		.m2{
			font-size: 1.0313rem;
		}
	}

	.list-tips{
		font-size: 0.7813rem;
		display: block;
		padding: 0.7813rem 0.3125rem 0.3125rem;
		color: #535353;
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
					.zan{
						width: 0.9375rem;
						height: 0.9375rem;
						margin-left: auto;
					}
				}
			}
		}
		.list-team:last-child{
			border-bottom: none;
		}
	}
</style>
