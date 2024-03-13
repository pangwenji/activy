<template>
	<page close-location="left">
		<view class="banner-box">
			<img class="banner" src="@/assets/new/login/frame.png" mode="widthFix" />
			<!-- <view class="txt">
				{{$t('pageRegister.welcome')}} <text>PGNEW</text>
				<view>{{$t('pageRegister.gameGo')}}</view>
			</view> -->
		</view>
		<view class="content">
			<view class="title">
				{{$t("pageSignIn.title")}}
			</view>
			<input maxlength="32" type="text" v-model="username" :placeholder="$t('pageRegister.er3')"
				placeholder-class="input-placeholder" @confirm="signIn(username,password,code)" />
			<view class="input-box">
				<input maxlength="12" :type="showPassword ? 'text' : 'password'" v-model="password"
					:placeholder="$t('pageRegister.er4')" placeholder-class="input-placeholder"
					@confirm="signIn(username,password,code)"/>
				<public-svg class="icon" @click="showPassword = !showPassword"
					:icon="(!showPassword? 'icon_Hide':'icon_View')"></public-svg>
			</view>

			<view class="input-box-flex" v-if="config.login_verification_code == '1'">
				<input maxlength="6" class="code-input" type="text" v-model="code"
					:placeholder="$t('pageRegister.code')" placeholder-class="input-placeholder"
					@confirm="signIn(username,password,code)" />
				<img class="code-img" @click="reCode()" :src="codeKey" mode="heightFix" />

			</view>
			<view class="forgot x-btn">
				<span @click="$open('/waiter')">{{$t("pageLoginSignIn.forgotYouerPassword")}}</span>
			</view>

			<view class="btn" @click="signIn(username,password,code)">
				<public-loading v-show="isSubmit"></public-loading>
				<text v-show="!isSubmit">{{$t("pageLoginSignIn.signIn")}}</text>
			</view>
			<view class="create-account">
				{{$t("pageLoginSignIn.newTo")}} PGNEW? <text
					@click="openRegister" class="x-btn">{{$t("pageLoginSignIn.createAccount")}}</text>
			</view>

			<!-- <view class="login-directly">
				<view>{{$t('pageRegister.loginDirectlyWith')}}</view>
			</view>
			<view class="icons">
				<view class="icon-1"></view>
				<view class="icon-2"></view>
				<view class="icon-3"></view>
				<view class="icon-4"></view>
				<view class="icon-5"></view>
			</view> -->

		</view>

	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import PublicLoading from '../components/public-loading.vue';
import PublicSvg from '../components/public-svg.vue';
import { onBeforeUnmount, ref } from 'vue';
import { bindKeyboard, randomString, removeKeyboard } from '../uilts/base';
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';
import { dbGet, dbSet } from '../uilts/db';
import { config, restMoney, popupNotice } from '../uilts/async.var';
import { open, back, onLoad, onShow, onlyOpen } from '../router/routes';

	// let isPopup = inject<boolean>('isPopup') || false;
	const showPassword = ref(false);
	const username = ref('');
	const password = ref('');
	const code = ref('');
	const codeKey = ref('')
	const register = ref(0)
	const isSubmit = ref(false)
	// const usernameLogin = ref('');
	// const form = reactive<Login['request']>({
	// 	code:'',
	// })
	/**
	 * 获取验证码
	 * returns { string } src 图片地址
	 */
	const codeValueGet = () : string => randomString(16);
	const codeValue = ref(codeValueGet())
	const reCode = () : string => codeKey.value = import.meta.env.VITE_APP_BAES_URL + '/api/public/captcha?code_value=' + (codeValue.value = codeValueGet());

	/**
	 * 登录
	 * @param { string } username 账号
	 * @param { string } password 密码
	 * @param { string } code 验证码
	 * @returns { string } token 登录令牌
	 */
	const signIn = async (username : string, password : string, code : string) : Promise<any> => {
		if (isSubmit.value) return;
		if (!username) return hint(t('pageRegister.er1'));
		if (!password || password.length < 6) return hint(t('pageRegister.er2'));
		if (!code && config.value.login_verification_code == '1') return hint(t('pageRegister.code'));
		isSubmit.value = true
		let data = await "/api/public/login".POST<Login>({
			username,
			password,
			code,
			source: "WEB",
			code_value: codeValue.value
		}).finally(() => {
			isSubmit.value = false;
		})

		// 根据后台规则拼接Bearer 
		await dbSet("token", "Bearer " + data.token);
		await dbSet("usernameLogin", username);
		
		// 埋点
		// dataLayer.push({ 'event': 'login' });
		// kwaiq.instance(localStorage.getItem("kwaiq")).track('formSubmit')
		// #ifdef H5
		try {
			dbGet('kwaiq').then(kwaiqId => {
				kwaiq.instance(kwaiqId).track('formSubmit')
			})
			dataLayer.push({'event':'login'});
		} catch (error) {
			
		}
		// #endif
		
		restMoney.value = !restMoney.value
		getInfo()
		// restSocket()
	}

	//获取用户信息
	const getInfo = () => {
		'/api/user/getInfo'.GET<GetInfo>(null, {
			Authorization: async () => await dbGet("token")
		}).then(async ret => {
			await dbSet("user", ret);
			await back(-1);
			if(popupNotice.value){
				open('/announcement')
			}
		})
	}

	const openRegister = () => {
		if (register.value) {
			back(1);
		} else {
			onlyOpen('/register')
		}
	}
	let keyboardKey : string = '';
	onBeforeUnmount(() => {
		removeKeyboard(keyboardKey)
	});
	onLoad(() => {
		reCode()
		dbGet('usernameLogin').then(ret => {
			username.value = ret
			// console.log(username.value);
			
		})
		keyboardKey = bindKeyboard("Enter", () => {
			signIn(username.value, password.value, code.value);
		})
	})
	onShow(() => {
		password.value = ''
		reCode()
		dbGet('usernameLogin').then(ret => {
			username.value = ret
			// console.log(username.value);
		})
	})

</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
	.banner-box,.content {
		color: #FFF;
	}

	.banner-box {
		position: relative;
		font-size: 1.0625rem;
		font-weight: 700;
		text-align: center;

		.txt {
			position: absolute;
			width: 60%;
			top: 55%;
			right: 0;

			text {
				color: #2AE035;
			}

			view {
				font-size: 0.7813rem;
				color: #9BA6B3;
				font-weight: normal;
			}
		}
	}

	.banner {
		display: block;
		margin: 0 auto;
		width: 16.7500rem;
		min-height: 12rem;
		margin-bottom: -1.5625rem;
	}

	.content {
		padding: 0 1.5625rem;
		
		color: #FFF;
	}

	.title {
		font-size: 0.7813rem;
		font-weight: 700;
		padding-bottom: 0.6250rem;
	}

	input {
		height: 2.3750rem;
		width: 100%;
		font-size: 0.7500rem;
		box-sizing: border-box;
		padding: 0 0.6250rem;
		background-color: #231d4e;
		border: 1px solid #231d4e;
		margin-top: 0.6250rem;
		border-radius: 0.1250rem;

		&:hover,
		&:focus,
		&.active {
			border: 1px solid #2AE035;
		}
	}

	input::-webkit-input-placeholder {
		color: #8E90CD;
		font-size: 0.7813rem;
	}

	.btn {
		@include button(#2AE035);
		height: 2.3750rem;
		margin-top: 0.6250rem;
	}

	.input-box {
		position: relative;

		input {
			padding-right: 2.1875rem;
		}

		.icon {
			position: absolute;
			right: 0.6250rem;
			top: 0;
			width: 0.9375rem;
			height: 2.3750rem;
			fill: #67707B;
		}
	}

	.input-box-flex {
		display: flex;
		align-items: center;
		margin-top: 0.6250rem;

		input {
			margin: 0;
			margin-right: 0.6250rem;
		}

		.code-input {
			width: calc(100% - 9.5000rem);
		}

		.code-img {
			display: block;
			height: 2.3750rem;
		}
	}

	.forgot {
		font-size: 0.7813rem;
		margin: 1.2500rem 0;
		text-align: right;
	}

	.create-account,
	.login-directly {
		font-size: 0.7813rem;
		color: #9BA6B3;
		margin: 1.2500rem 0;

		text {
			color: #2AE035;
		}
	}

	.login-directly {
		text-align: center;
		@extend %flex-center;

		view {
			margin: 0 0.6250rem;
		}

		&::before,
		&::after {
			content: '';
			flex: 1;
			display: block;
			height: 1px;
			background-color: #A6B2C0;
		}
	}

	.icons {
		@extend %flex-center;
		justify-content: space-between;
	}

	[class*='icon-'] {
		width: 3.4375rem;
		height: 2.6250rem;
		border: 1px solid #A6B2C0;
		border-radius: 0.1250rem;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.9375rem;
	}

	@for $i from 1 through 5 {
		.icon-#{$i} {
			background-image:url(@/assets/login/login-icon#{$i}.png);
		}
	}
</style>