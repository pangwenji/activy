<template>
	<page>
		<view class="container page-pading" :head-box="isPc ? ['content','right'] : undefined">
			<public-loading class="public-loading" v-if="!isLoding"></public-loading>
			<view v-else class="container-content">
				<view class="days-card">

					<text class="sign-title">{{ $t('pageSevenSign.t1') }}</text>
					<!-- <text
						class="sign-title">{{ signTotal.is_sign_today === true ? $t('pageSevenSign.signtitleOk') : $t('pageSevenSign.signtitleNo') }}</text> -->
					<public-grid class="grid" :max="4" :margin="isPc ? 16 : 10">
						<border-gradient :border="1" :angle="90" :border-color="[
							 'rgba(243, 85, 255, 1)','rgba(41, 172, 201, 1)',
						]" :show-border="false && i == signTotal.sign_day" :content-style="{
							flexDirection:'column',
							padding:isPc ? '16px 0' : '0.5rem 0',
							background:i == signTotal.sign_day ? '#009d81' : '#494949'
						}" class="days-team x-btn" @click="i == signTotal.sign_day ? signIn(v.sign_day) : ''"
							:class="{ 'click': i == signTotal.sign_day }" v-for="v, i in signConfig"
							:key="i">
							<text class="t1" :style="{color:v.is_sign === 1 ? '#999999':'#ffffff'}" >{{ $t('pageSevenSign.t4') }}{{ v.sign_day }}{{ $t('pageSevenSign.t5') }}</text>
							<img src="@/assets/sevenSign/qiridiandao_jinbi.png" mode="widthFix" />
							<text v-if="v.is_sign != 1 ">{{ unit }}{{ v.reward_money }}</text>
							<text v-else style="color: #999999;">{{  $t('pageSevenSign.t3')  }}</text>
						</border-gradient>
					</public-grid>
				</view>

				<view class="tips-card">
					<text class="tips-title">{{ $t('pageSevenSign.t2') }}</text>
					<!-- <text class="tips-label">{{ $t('pageSevenSign.tipsLable') }}</text> -->
					<text class="tips-team">{{ $t('pageSevenSign.tips1') }}</text>
					<text class="tips-team">{{ $t('pageSevenSign.tips2') }}</text>
					<text class="tips-team">{{ $t('pageSevenSign.tips3') }}</text>
					<text class="tips-team">{{ $t('pageSevenSign.tips4') }}</text>
					<text class="tips-team">{{ $t('pageSevenSign.tips5') }}</text>
					<text class="tips-team">{{ $t('pageSevenSign.tips6') }}</text>
				</view>
			</view>
		</view>
	</page>
</template>

<script setup lang="ts">

import Page from '../components/page.vue';
import PublicGrid from '../components/public-grid.vue';
import PublicLoading from '../components/public-loading.vue';
import BorderGradient from '../components/border-gradient.vue';

import { ref } from 'vue';
import { dbGet } from '../uilts/db';
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';
import { isPc, restMoney, unit } from '../uilts/async.var';
import { onLoad } from '../router/routes';
import { activityInit } from '../uilts/emit';


const signConfig = ref<Array<any>>([])
const signTotal = ref<{
	sign_day: number;
	is_sign_today: boolean;
}>({
	sign_day: 0,
	is_sign_today: false
})
const isSubmit = ref<boolean>(false)
const isLoding = ref<boolean>(false)

//获取签到配置
const getSignConfig = () => {
	// console.log(2);
	'/api/sign/signData'.GET<SignConfig>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		// console.log(ret);
		isLoding.value = true
		signConfig.value.length = 0

		ret.config.forEach((v) => {
			signConfig.value.push(v)
		})

		signTotal.value.is_sign_today = ret.data.is_sign_today == 1 ? true : false;
		signTotal.value.sign_day = ret.data.sign_day

	})
}

//签到
const signIn = (sign_day: number) => {
	if (isSubmit.value) return false;
	isSubmit.value = true
	'/api/sign/signIn'.POST<SignIn>({
		sign_day
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		// #ifdef H5
		try {
			dbGet('kwaiq').then(kwaiqId => {
				kwaiq.instance(kwaiqId).track('subscribe')
			})
			dataLayer.push({ 'event': 'getDailyReward' });
		} catch (error) {

		}
		// #endif
		hint(t('pageMenuSignIn.signOk'))
		restMoney.value = !restMoney.value
		getSignConfig();
		activityInit();
	}).finally(() => {
		isSubmit.value = false;
	})
}

onLoad(() => {
	// console.log(1);

	getSignConfig()
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.container {
	height: 100%;
	// min-height: calc(100vh - var(--headers-height) - var(--download-height));
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	// padding-bottom: 0.625rem;
}

.container-content {
	// padding: 0.7813rem;
}

.public-loading {
	margin-top: 100%;
	
}

.days-card {
	padding: 1.2500rem 1rem;
	// border-radius: 0.4688rem;
	// background-image: url(@/assets/sevenSign/qiridiandao_bejing.png);
	// background-repeat: no-repeat;
	// background-size: 100% 100%;
	border-radius: 0.5rem;
	background: #1f1f1f;
	// background: #201E47;
	.grid {
		grid-gap: 10px 0;
	}

	.sign-title {
		font-size: 1.1250rem;
		// color: var(--MENU, #8E90CD);
		color: #fff;
		font-weight: bold;
		display: block;
		text-align: left;
		padding: 0 0 0.7500rem;
	}
	@include pc {
		padding:24px;
		border-radius: 8px;
		border: 1px solid #292547;
		background:transparent;
	}
}

.days-team {
	min-height: 5.4375rem;
	border-radius: 0.25rem;
	/* 白色半透明 */
	text-align: center;
	color:#FFFFFF;

	@include pc{
		color:#FFFFFF;
		border-radius: 8px;
		min-height: 156px;
	}

	.t1 {
		font-size: 0.625rem;
		@include pc{
			font-size: 20px;
		}
	}

	&.click {
		// background-image: url(@/assets/sevenSign/qiridiandao_diban1.png);
		// background-repeat: no-repeat;
		// background-size: 100% 100%;
		color: #FFFFFF;
		box-sizing: border-box;
	}

	&.ok {
		position: relative;
	}

	&.ok::before {
		content: "";
		border-radius: 0.4688rem;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		background-image: url(@/assets/sevenSign/yiqiandao.png);
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: 60% 55%;
		z-index:calc(var(--I1) + 0);
	}

	// &:last-child{
	// 	grid-column: 3 / 5;
	// }
	text {
		font-size: 0.8750rem;
		display: block;
		
		&:first-child {
			text-align: left;
		}

		&:last-child {
			font-size: 0.7500rem;
		}
		@include pc{
			font-size: 20px;
			&:last-child {
				font-size: 20px;
				font-weight: 700;
			}
		}
	}

	img {
		width: 1.750rem;
		margin:0.25rem auto;
		z-index:calc(var(--I1) + 0);

		@include pc{
			width: 56px;
			margin:8px auto;
		}
	}
}

.click:active {
	background-image: conic-gradient(from 1turn, fade-out(#c799a5, 1), fade-out(#f5b85c, 1));
}

// .click:hover {
// background-image: conic-gradient(from 1turn,fade-out(#c799a5,1),fade-out(#f5b85c,1));
// }

.tips-card {
	margin-top: 0.9375rem;
	padding: 1.2500rem;
	border-radius: 0.5000rem;
	background: #1f1f1f;
	@include pc{
		font-size: 14px;
		background:transparent;
	}

	text {
		display: block;
	}

	.tips-title {
		// color: var(--MENU, #8E90CD);
		color: #fff;
		font-family: PingFang SC;
		font-size: 1.0000rem;
		font-style: normal;
		font-weight: 700;
		padding-bottom: 0.7500rem;
		line-height: normal;
		@include pc{
			font-size: 16px;
		}
	}

	.tips-team {
		// color: var(--MENU, #8E90CD);
		color: #fff;
		font-family: PingFang SC;
		font-size: 0.8750rem;
		font-style: normal;
		font-weight: 400;
		padding: 0.1563rem 0;
		@include pc{
			font-size: 14px;
		}
	}
}
</style>
