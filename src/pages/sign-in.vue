<template>
	<page>
		<div class="content container">
			<!-- <view class="tag">
			<view class="btn spin-btn1" :class="{active:tagIndex === 0}" @click="tagIndex = 0"></view>
			<view class="btn spin-btn2" :class="{active:tagIndex === 1}" @click="tagIndex = 1"></view>
			<view class="btn spin-btn3" :class="{active:tagIndex === 2}" @click="tagIndex = 2"></view>
			<view class="level">
				<view class="name">{{levelName[tagIndex]}}</view>
				<view class="above">Level {{levelValue[tagIndex]}} or Above</view>
			</view>
		</view> -->
		<!-- <view class="banner">
			<image src="@/assets/roulette/banner.png" mode="widthFix"></image>
		</view> -->
		<view class="flex-box">
			<view class="registos -btn" @click="$open('/sign-record')">
				{{$t('pageMenuSignIn.todayRecord')}}
			</view>
			<view class="registos -btn" @click="$open('/sign-rule')">
				{{$t('menuSignInBtn')}}
			</view>
		</view>
		
		<view style="transform: scale(0.88);">
			<view class="sign-in">
				<view class="turntable" :style="{transform:'rotate('+ turntableRotate +'deg)'}" @transitionend="transitionend">
					<view class="item" v-for="v,i in signConfig" :key="i">
						<text>{{ v.reward_money }}</text>
						<img class="cion" :src="v.icon" mode="aspectFill" />
					</view>
				</view>
				<view class="lamp"></view>
				<view class="target"></view>
				<view class="spin" @click="spin()"></view>
			</view>
			<img class="mega-win" src="@/assets/roulette/banner_diamond.png" mode="widthFix" />
		</view>
		<view class="button" v-if="!signTotal.is_sign_today" @click="signIn">
			<text v-show="!isSubmit">{{$t('pageMenuSignIn.sign')}}</text>
			<public-loading v-show="isSubmit"></public-loading>
		</view>
		<view class="button isSign" v-else>{{$t('pageMenuSignIn.signedIn')}}</view>

		<view class="tag2">
			<view>
				<view class="stotal">
					{{$t('pageMenuSignIn.sign')}}
				</view>
				<view class="day">
					{{signTotal.count ?? 0}}
				</view>
			</view>
			<view>
				<view class="stotal">
					{{$t('pageMenuSignIn.rewards')}}
				</view>
				<view class="day">
					{{unit}}{{signTotal.total_money ?? 0}}
				</view>
			</view>
		</view>
		</div>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
	import { computed, reactive, ref } from 'vue';
import { hint } from '../uilts/ui';
import { dbGet } from '../uilts/db';
import { balance, unit } from '../uilts/async.var';
import { t } from '../uilts/i18n';
import { onLoad } from '../router/routes';
	
	const isSubmit = ref<boolean>(false)
	// const tagIndex = ref<NumberOptions>(0);
	// const style = reactive<any>({
	// 	background: "url(/assets/roulette/kaishi2.png)"
	// })
	let isChou = false
	// const levelName = ["Bronze", "Gold", "Diamond"];
	// const levelValue = [0, 22, 70];
	const signConfig = ref<Array<any>>([])
	let signTotal = reactive<{
		total_money:string;
		count: number;
		is_sign_today: number;
	}>({ total_money: "0", count: 0, is_sign_today: 0 })

	const spinIndex = ref(0);

	const turntableRotate = computed(() => {
		return spinIndex.value ? ((24 * 15 - spinIndex.value * 24) + 1800.5) : 0
	})
	let draw = {
		reward_money:"0"
	};
	const spin = () => {
		if (isChou) return;
		isChou = true
		'/api/sign/draw'.POST<Draw>(null, {
			Authorization: async () => await dbGet('token')
		}).then(ret => {
			draw.reward_money = ret.reward_money;
			signConfig.value.forEach((v, i) => {
				if (v.id == ret.id) {
					spinIndex.value = i+1
				}
			})
			balance.value = (Number(balance.value) + Number(ret.reward_money)).toFixed(1)
		}).finally(() => {
			isChou = false
		})
	}
	const transitionend = () => {
		hint(t('pageMenuSignIn.success') + (draw.reward_money + unit.value))
		getSignConfig()
	}

	//签到
	const signIn = () => {
		if(isSubmit.value) return false;
		isSubmit.value = true
		'/api/sign/signIn'.POST<SignIn>({}, {
			Authorization: async () => await dbGet('token')
		}).then(_ret => {
			hint(t('pageMenuSignIn.signOk'))
			getSignConfig()
		}).finally(() => {
			isSubmit.value = false;
		})
	}

	//获取签到配置
	const getSignConfig = () => {
		'/api/sign/signData'.GET<SignConfig>(null, {
			Authorization: async () => await dbGet('token')
		}).then(ret => {
			ret.config.forEach((v) => {
				if (signConfig.value.length < 15) {
					signConfig.value.push(v)
				}
			})
			signTotal.count = ret.data.count
			signTotal.is_sign_today = ret.data.is_sign_today
			signTotal.total_money = ret.data.total_money
		})
	}

	// onNavigationBarButtonTap(function () {
	// 	open('/signRule')
	// })
	
	onLoad(()=>{
		getSignConfig()
	})
	
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
	// page {
		
	// 	// left:auto !important;
	// 	right: 0;
	// 	top: 0;
	// 	bottom: 0;
	// }
	.flex-box{
		display:flex;
		justify-content:space-between;
		align-items:center;
		width:80%;
	}
	page {
		height: 100%;
		position: relative;

		&:before {
			content: "";
			width: 14.3750rem;
			height: 16.5625rem;
			-webkit-filter: blur(26px);
			filter: blur(26px);
			background-image: radial-gradient(circle at 50% 50%, rgba(7, 250, 218, .35), rgba(0, 0, 0, 0) 76%);
			position: absolute;
			top: 4.3750rem;
			right: 0;
		}

		&::after {
			content: "";
			width: 12.5000rem;
			height: 15.0000rem;
			top: 15.3125rem;
			left: 0;
			position: absolute;
			-webkit-filter: blur(26px);
			filter: blur(26px);
			background-image: radial-gradient(circle at 50% 50%, rgba(217, 21, 255, .6), rgba(0, 0, 0, 0) 75%);
		}
	}

	.content {
		height: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		position: relative;
		z-index:calc(var(--I1) + 0);
	}

	.banner {
		padding: 0.9375rem 0.9375rem 0;

		image {
			display: block;
			width: 21.2813rem;
			height: 5.2188rem;
			margin: auto;
		}
	}

	@keyframes swing {
		0% {
			-webkit-transform: rotate(-5deg) scale3d(1, 1, 1);
			-ms-transform: rotate(-5deg) scale3d(1, 1, 1);
			transform: rotate(-5deg) scaleZ(1)
		}

		50% {
			-webkit-transform: rotate(0deg) scale3d(1.1, 1.1, 1.1);
			-ms-transform: rotate(0deg) scale3d(1.1, 1.1, 1.1);
			transform: rotate(0) scale3d(1.1, 1.1, 1.1)
		}

		to {
			-webkit-transform: rotate(-5deg) scale3d(1, 1, 1);
			-ms-transform: rotate(-5deg) scale3d(1, 1, 1);
			transform: rotate(-5deg) scaleZ(1)
		}
	}

	@keyframes lamp-rotate {
		0% {
			transform: rotate(0deg);
		}

		50% {
			transform: rotate(22.5deg);
		}

		100% {
			transform: rotate(45deg);
		}
	}

	.sign-in {
		position: relative;
		width: 21.7500rem;
		margin: 0 auto;
	}

	.turntable {
		width: 21.7500rem;
		height: 21.7500rem;
		margin: 0 auto;

		background: url(@/assets/roulette/spin_key.webp), url(@/assets/roulette/zhuanpan3.png);

		background-position: center center, center center;
		background-repeat: no-repeat, no-repeat;
		background-size: 100% auto, 100% auto;

		transform: rotate(20deg);
		transition: transform 5s ease-out;
	}

	.item {
		position: absolute;
		right: 0;
		top: 50%;
		width: 50%;
		box-sizing: border-box;
		padding-left: 2.1875rem;
		height: 4.3750rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFF;
		font-size: 0.8750rem;
		font-weight: 700;
		transform-origin: left center;

		@for $i from 1 through 15 {
			&:nth-child(#{$i}) {
				transform:translateY(-50%) rotate(#{$i * 24 + 5.6}deg);
			}
		}

	}

	.lamp {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		background: url(@/assets/roulette/spinLight.webp);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 103%;
		animation: lamp-rotate 0.8s step-end infinite;
	}

	// 208
	.target {
		width: 10.0000rem;
		height: 8.0625rem;
		background: url(@/assets/roulette/point_diamond.png) no-repeat center center;
		background-size: 100%;
		position: absolute;
		top: 55%;
		right: 50%;
		transform: translate(12.6250rem, -50%);
	}

	.spin {
		width: 6.5000rem;
		height: 6.5000rem;
		background: url(@/assets/roulette/spin_center.png);
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 100% auto;
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		z-index:calc(var(--I1) + 0);
		cursor: pointer;
		&::after {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			background: url(@/assets/roulette/btn_megaspin.13327da9.png);
			background-position: center center;
			background-repeat: no-repeat;
			background-size: 90% auto;
			animation: swing 2.5s infinite;
			z-index:calc(var(--I1) + 0);
		}
	}

	.mega-win {
		display: block;
		width: 21.7500rem;
		margin: 0 auto;
		margin-top: -2.1875rem;
	}

	.cion {
		width: 1.2500rem;
		height: 1.2500rem;
		display: block;
		margin-left: 0.3125rem;
	}

	.tag {
		width: 100%;
		height: 3.7500rem;
		box-sizing: border-box;
		padding: 0.2500rem;
		background-color: #151617;
		display: flex;
		border-radius: 0.1250rem;

		.btn {
			width: 3.7500rem;
			height: 100%;
			border-radius: 0.1250rem;
			background-size: auto 88%;
			background-repeat: no-repeat;
			background-position: center center;
			filter: grayscale(1);

			&.active {
				filter: none;
				background-color: rgb(105, 14, 224);
			}
		}

		.level {
			flex: 1;
			margin-left: 0.2500rem;
			border-radius: 0.1250rem;
			@extend %flex-center;
			flex-direction: column;

			.name {
				width: 100%;
				height: 1.5625rem;
				padding-bottom: 0.1563rem;
				font-size: 1.0000rem;
				font-weight: 800;
				background-image: url(@/assets/roulette/tag.webp);
				background-position: center top;
				background-repeat: no-repeat;
				background-size: auto 100%;
				text-align: center;
				margin-bottom: -0.1875rem;
			}

			.above {
				font-size: 0.8750rem;
				font-weight: 800;
				color: #FFF;
			}
		}

		$btn-color: rgb(101, 49, 32), rgb(235, 145, 6), rgb(105, 14, 224);

		@each $c in $btn-color {
			$i: index($btn-color, $c);

			.spin-btn#{$i} {
				background-image:url(@/assets/roulette/tag#{$i}.webp);

				&.active {
					filter: none;
					background-color: $c;

					~.level {
						background-color: $c;
						color: $c;
					}
				}
			}
		}
	}

	.button {
		@include button(rgba(255, 158, 106, 1));
		width: 15.0000rem;
		height: 3.0000rem;
	}

	.isSign {
		background-color: rgba(0, 158, 106, 255);
		background-image: conic-gradient(from 1turn, #999999, #666666);
	}

	.isSign:active {
		background-color: rgba(0, 158, 106, 255);
		background-image: conic-gradient(from 1turn, #aaaaaa, #999999);
	}

	.tag2 {
		width: 100%;
		height: 6.2500rem;
		box-sizing: border-box;
		padding: 0.2500rem;
		background-color: #151617;
		display: flex;
		border-radius: 0.1250rem;
		padding: 0.2500rem;
		justify-content: space-between;
		margin-bottom: var(--window-bottom);

		view {
			@extend %flex-center;
			flex-direction: column;
			background-color: #191a1b;
			border-radius: 0.1250rem;
			width: calc(50% - 0.1250rem);

			.stotal {
				color: #767b81;
				font-size: 0.7500rem;
				flex-wrap: nowrap;
				word-break: normal;
				white-space: nowrap;
				vertical-align: middle;
			}

			.day {
				color: #e9d317;
				font-size: 1.1875rem;
				margin-top: 0.3125rem;
				font-weight: 800;
			}
		}
	}

	.registos {
		color: #2AE035;
		font-size: 0.7813rem;
		position: relative;
		margin: 1.5625rem 0;
	}

	.registos:before {
		content: "";
		position: absolute;
		bottom: -0.1875rem;
		left: 0.0000rem;
		width: 100%;
		height: 0.0625rem;
		background-color: #2AE035;
	}
</style>