<template>
	<page :head-box="isPc ? ['content','right'] : undefined">
		<view class="content page-pading">
			<div class="title-box">
				<img v-if="isPc" src="@/assets/new/deposit/icon.png" />
				<div class="title">
					{{ $t('pageDeposit.balance') }}
					<div class="money" :data-value="unit">{{ balance }}</div>
				</div>
			</div>
			 
			<meun-btn class="btn" @click="$open('/recharge')">
				<img src="@/assets/new/components/meun-btn-zz.png" class="icon">
				<span>{{$t('pageDeposit.recharge')}}</span>
			</meun-btn>
			
			<meun-btn class="btn" @click="$open('/withdraw-money')">
				<img src="@/assets/new/components/meun-btn-tk.png" class="icon">
				<span>{{$t('pageDeposit.withdrawMoney')}}</span>
			</meun-btn>

			<meun-btn class="btn" @click="$open('/bank-card')">
				<img src="@/assets/new/components/meun-btn-yh.png" class="icon">
				<span>{{$t('pageDeposit.bankCard')}}</span>
			</meun-btn>
		</view>
	</page>
</template>

<script setup lang="ts">
	import MeunBtn from '../components/meun-btn.vue';
	import Page from '../components/page.vue'; 
	import { balance, isPc, unit } from '../uilts/async.var';
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
.content{
	// padding:0 0.75rem;
	@include pc {
		// padding: 0 36px;
		.title-box{
			display:flex;
			height: 84px;
    		align-items: center;
			padding-left:20px;
			border-radius: 8px;
			border: 1px solid #292547;
			margin-bottom:64px;
			img{
				width: 44px;
				height: 36px;
				margin-right:12px;
			}
		}
		
	}
}
.title{
	color:#FFF;
	font-size: 0.875rem;
	text-align:center;
	padding-bottom:1.8rem;
	padding-top:1.25rem;
	@include pc {
		color:#8E90CD;
		font-size: 14px;
		padding:0;
	}
	.money{
		font-size: 1.875rem;
		font-weight: 600;
		margin-top:0.6rem;
		&::before{
			content: attr(data-value);
			font-size: 1.125rem;
		}
		@include pc {
			font-size: 20px;
			color:#B5EBFF;
			margin:0;
			&::before{
				font-size: 14px;
			}
		}
	}
}
.btn{
	font-size: 0.875rem;
	@include pc {
		height: 60px;
		font-size: 18px;
	}
}
</style>
