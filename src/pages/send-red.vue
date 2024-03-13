<template>
	<page>
		<view class="name-card">
			<picker class="picker" @change="bindPickerChange" :value="index" :range="array">
				<text>{{array[index]}}</text>
				
				<img src="@/assets/red/arrow-down.png" mode="" />
			</picker>
		</view>
		
		<view class="input-card">
			<img src="@/assets/red/red-cion-min.png" />
			<text>{{$t('pageSendRed.numberOfRedEnvelopes')}}</text>
			<input type="text" placeholder="1um">
		</view>
		
		<view class="input-card">
			<img src="@/assets/red/red-cion-min.png"  />
			<text>{{$t('pageSendRed.single')}}</text>
			<input type="text" placeholder="$100">
		</view>
		
		<view class="input-card grzy">
			
			<input type="text" :placeholder="$t('pageSendRed.msg')">
		</view>
		
		<text class="red-num">$100.00</text>
		
		<view class="but-red" @click="$open('/record-red')">{{$t('pageSendRed.insertMoney')}}</view>
		
		<text class="t4">{{$t('pageSendRed.tips')}}</text>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
	import { ref,reactive } from "vue"
import { t } from "../uilts/i18n";
	
	let array = reactive([t('pageSendRed.ordinaryRed'), t('pageSendRed.fortune')])
	let index = ref(0)
	
	const bindPickerChange = (e: { detail: { value: number; }; }) => {
		index.value = e.detail.value
	}
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
	.name-card{
		display: flex;
		padding-top: 0.9375rem;
		font-size: 0.7813rem;
		color: #B99A4A;
		text-indent: 0.8750rem;
		img{
			width: 0.7500rem;
			height: 0.4063rem;
			margin-left: 0.2500rem;
			// margin-top: 0.3125rem;
		}
	}
	
	.input-card{
		margin: 0.7813rem 0.6250rem;
		height: 3.2188rem;
		line-height: 3.2188rem;
		font-size: 0.7813rem;
		color: #FFFFFF;
		display: flex;
		background-color: #24262A;
		img{
			width: 1.1875rem;
			height: 1.3125rem;
			margin-top: 0.9531rem;
			margin-left: 0.6250rem;
		}
		text{
			margin-left: 0.9375rem;
			white-space: nowrap;
		}
		input{
			margin-left: auto;
			margin-right: 0.6250rem;
			line-height: 3.2188rem;
			height: 3.2188rem;
			text-align: right;
			max-width: 4.6875rem;
			color: #FFFFFF;
		}
		
	}
	.grzy{
		color: #9BA6B3 !important;
		
		input{
			margin-left: 0.6250rem;
			font-size: 0.7813rem;
			text-align: left;
			min-width: calc(100% - 1.2500rem) !important;
			max-width:calc(100% - 1.2500rem) !important;
		}
	}
	
	.t4{
		font-size: 0.7813rem;
		color: #9BA6B3;
		text-align: center;
		margin: auto;
		width: calc(100% - 3.1250rem);
		display: block;
		padding:0 1.5625rem 0.0000rem;
		position: absolute;
		bottom: 1.2500rem;
	}
	
	.red-num{
		text-align: center;
		display: block;
		font-size: 2.1875rem;
		font-weight: 500;
		color: #CFCFCF;
		margin-top: 2.1875rem;
	}
	
	.but-red{
		
		color: #FFFFFF;
		background-color: #ED6B51;
		width: 10.1250rem;
		height: 2.3438rem;
		line-height: 2.3438rem;
		white-space: nowrap;
		font-size: 0.7813rem;
		border-radius: 0.1084rem;
		margin: auto;
		text-align: center;
		margin-top: 1.2500rem;
		// padding: 0.3125rem;
	}
	
	// .picker{
	// 	background-color: #2B2B2B;
	// 	color: #FFFFFF;
	// }
</style>
