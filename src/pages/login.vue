<template>
	<page :mouse-wheel="true">
		<template #header-content>
			<div class="header-content-auto">
				<div class="iconlang" @click="open('/language')">
					<img :src="languageIcon" v-lazy="languageIcon" @click="open('/language')" alt="">
				</div>
				<span @click="open('/language')">{{ languageName }}</span>
				<span class="go-edit" @click="open('/language')">{{ $t('pageLoginSignIn.goEdit') }}</span>
				<i class="iconTo" @click="open('/language')"></i>
			</div>
		</template>
		<template #header-icon-right>
			<span class="iconfont iconhomeempty" @click="$back(-1)"></span>
		</template>
		<view class="content ">

			<div class="title">{{ $t('pageLoginSignIn.tipsTop') }}</div>

			<div class="icons">
				<div class="gg-btn">
					<img src="@/assets/new/login/gg.svg" alt="">
					<span>{{ $t('pageLoginSignIn.loginGg') }}</span>
				</div>
			</div>
			<div class="login-directly">
				<div> OU </div>
			</div>



			<div class="input-card">
				<!-- <img class="left-icon" src="@/assets/new/login/login_user.png" alt=""> -->
				<input maxlength="64" type="text" v-model="username" :placeholder="$t('pageRegister.er3')"
					placeholder-class="input-placeholder" @focus="inputFocus = 1" @blur="inputFocus = 0" :style="{
						 pointerEvents:inputFocus != 2 ? 'auto' : 'none'
					}" @confirm="signIn(username, password, code)" />
			</div>
			
			<div class="tips" v-show="usernameCode">{{ usernameCode }}</div>

			<div class="input-card">
				<!-- <img class="left-icon" src="@/assets/new/login/login_password.png" alt=""> -->
				<div class="input-box-flex">
					<input maxlength="12" :type="showPassword ? 'text' : 'password'" v-model="password"
						:placeholder="$t('pageRegister.er4')" @focus="inputFocus = 2" @blur="inputFocus = 0" :style="{
						 pointerEvents:inputFocus != 1 ? 'auto' : 'none'
					}" placeholder-class="input-placeholder"
						@confirm="signIn(username, password, code)" />

					<span @click="showPassword = !showPassword" class="iconfont"
						:class="{ 'iconnoeyes': !showPassword, 'iconeyes': showPassword }"></span>
				</div>
			</div>

			<div class="tips" v-show="passCode">{{ passCode }}</div>

			<div class="input-card" v-if="config.login_verification_code == '1'">
				<img class="left-icon" src="@/assets/new/login/login_aq.png" alt="">
				<view class="input-box-flex">
					<input maxlength="6" class="code-input" type="text" v-model="code"
						:placeholder="$t('pageRegister.code')" placeholder-class="input-placeholder"
						@confirm="signIn(username, password, code)"  />
					<img class="code-img" @click="reCode()" :src="codeKey" mode="heightFix" />

				</view>
			</div>

			<div class="tips" v-show="codeCode">{{ codeCode }}</div>

			<!-- <view class="forgot x-btn">
				<span @click="$open('/waiter')">{{$t("pageLoginSignIn.forgotYouerPassword")}}</span>
			</view> -->

			<div class="btn2" :class="{ 'btn': isLoginT === false }" @click="signIn(username, password, code)">
				{{ $t("pageLoginSignIn.signIn") }}
			</div>

			<view class="create-account">
				<div class="create-account-left" @click="$open('/waiter')">
					<span>{{ $t('pageLoginSignIn.kf') }}</span>
				</div>
				<div class="create-account-right">
					{{ $t("pageLoginSignIn.newTo") }} PGNEW? <text @click="openRegister" class="x-btn">{{
						$t("pageLoginSignIn.createAccount") }}</text>
				</div>
			</view>

			<div class="bg">
				<img src="@/assets/setting/profile_star.png" alt="">
			</div>

		</view>

	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import PublicLoading from '../components/public-loading.vue';
import PublicSvg from '../components/public-svg.vue';
import { onBeforeUnmount, ref, watch, nextTick } from 'vue';
import { bindKeyboard, randomString, removeKeyboard } from '../uilts/base';
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';
import { dbDelete, dbGet, dbSet } from '../uilts/db';
import { config, restMoney, popupNotice, isPc, isCollectApi, languageIcon, languageName } from '../uilts/async.var';
import { open, back, onLoad, onShow, onlyOpen } from '../router/routes';
import BorderGradient from '../components/border-gradient.vue'

const inputFocus = ref(0)
// let isPopup = inject<boolean>('isPopup') || false;
const showPassword = ref(false);
const username = ref('');
const password = ref('');
const code = ref('');
const codeKey = ref('')
const register = ref(0)
const isSubmit = ref(false)
const isLoginT = ref(true)

const codeCode = ref('')
const usernameCode = ref('')
const passCode = ref('')
// const usernameLogin = ref('');
// const form = reactive<Login['request']>({
// 	code:'',
// })
watch(username, (_newData, _oldData) => {
	verifyFrom()
})

watch(password, (_newData, _oldData) => {
	verifyFrom()
})

watch(code, (_newData, _oldData) => {
	verifyFrom()
})

const verifyFrom = () => {
	if (config.value.login_verification_code == '1') {
		if (username.value != '' && password.value.length >= 6 && code.value != '') {
			isLoginT.value = false
		} else {
			isLoginT.value = true
		}
	} else {
		if (username.value != '' && password.value.length >= 6) {
			isLoginT.value = false
		} else {
			isLoginT.value = true
		}
	}
}

/**
 * 获取验证码
 * returns { string } src 图片地址
 */
const codeValueGet = (): string => randomString(16);
const codeValue = ref(codeValueGet())
const reCode = (): string => codeKey.value = import.meta.env.VITE_APP_BAES_URL + '/api/public/captcha?code_value=' + (codeValue.value = codeValueGet());

/**
 * 登录
 * @param { string } username 账号
 * @param { string } pass 密码
 * @param { string } code 验证码
 * @returns { string } token 登录令牌
 */
const signIn = async (username: string, pass: string, code: string): Promise<any> => {
	try {
		if (isLoginT.value) return;
		if (isSubmit.value) return;
		if (!username) {
			usernameCode.value = t('pageRegister.er1')
			return;
		} else {
			usernameCode.value = ''
		}
		if (!pass || pass.length < 6) {
			passCode.value = t('pageRegister.er2')
			return;
		} else {
			passCode.value = ''
		}
		if (!code && config.value.login_verification_code == '1') {
			codeCode.value = t('pageRegister.code')
			return;
		} else {
			codeCode.value = ''
		}
		isSubmit.value = true
		let data = await "/api/public/login".POST<Login>({
			username,
			password: pass,
			code,
			source: "WEB",
			code_value: codeValue.value
		})
		password.value = ''
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
			dataLayer.push({ 'event': 'login' });
		} catch (error) {

		}
		// #endif
		restMoney.value = !restMoney.value
		getInfo()
	} catch (error) {

	}
	nextTick(() => {
		isSubmit.value = false;
	})
	// restSocket()
}

//获取用户信息
const getInfo = () => {
	'/api/user/getInfo'.GET<GetInfo>(null, {
		Authorization: async () => await dbGet("token")
	}).then(async ret => {
		await dbSet("user", ret);
		await back(-1);
		isCollectApi.value = !isCollectApi.value
		const today = new Date().getDate();
		try {
			const expires = new Date((await dbGet("noticePopup")).expires).getDate();
			if (expires != today) {
				await open('/announcement')
				dbDelete('noticePopup')
			}
		} catch (e) {
			await open('/announcement')
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
let keyboardKey: string = '';
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


.bg {
	width: 100%;

	img {
		width: 100%;
		height: auto;
	}
}

.iconnoeyes {
	font-size: 0.8625rem;
	color: #000;

	&::before {
		content: "\e65f";
	}
}

.iconeyes {
	font-size: 0.8625rem;
	color: #000;

	&::before {
		content: "\e660";
	}
}

.ccc {
	height: inherit;
	display: flex;
	align-items: center;
}

.tips {
	color: #FF007A;
	font-family: PingFang SC;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	padding-top: 0.625rem;
}

.banner-box,
.content {
	box-sizing: border-box;
	padding: 2rem 1rem;
	color: #FFF;
	background-color: rgb(31, 31, 31);
	min-height: 100vh;
}

.banner-box {
	position: relative;
	font-size: 1.0625rem;
	font-weight: 700;
	text-align: center;
	padding: 0 0.9375rem;
	height: 8.6250rem;
	.banner {
		width: 100%;
		height: auto;
	}

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
	// width: 16.7500rem;
	// min-height: 12rem;
	margin-bottom: -1.5625rem;
}

.content {
	// padding: 0.9375rem;


	@include pc {
		// padding: 40px;
	}
}

.title {
	font-size: 1.2rem;
	font-weight: 700;
	padding-bottom: 0.6250rem;
	text-align: center;
	color: #fcde26;
}

.input-card {
	display: flex;
	align-items: center;
	font-size: 0.7500rem;
	box-sizing: border-box;
	margin-top: 1.25rem;
	background-color: #494949;

	// border: 1px solid #231d4e;
	border-radius: 0.25rem;
	padding: 0 0.625rem;
	height: 3.5rem;

	@include pc {
		height: 60px;
		font-size: 16px;
		border-radius: 8px;
		margin-top: 24px;
	}

	&:first-child {
		margin-top: 0;
	}

	.left-icon {
		width: 1.25rem;
		height: 1.25rem;

		@include pc {
			width: 24px;
			height: 24px;
		}
	}

	&:hover,
	&:focus,
	&.active {
		// border: 1px solid #2AE035;
	}
}

input {
	height: 2.5rem;
	width: 100%;
	font-size: 0.875rem;
	box-sizing: border-box;
	padding-left: 0.625rem;
	// color: #868686;

	@include pc {
		height: 60px;
		font-size: 16px;
		border-radius: 8px;
	}
}

input::-webkit-input-placeholder {
	color: #868686;
	font-size: 0.7813rem;
	background-color: transparent !important;

	@include pc {
		font-size: 16px;
		color: #5B6DA1;
	}
}

.btn2 {
	@include button(#2AE035);
	height: 3rem;
	border-radius: 0.25rem;
	background: #009d81;
	opacity: 0.4;
	margin-top: 2.5rem;
	font-size: 0.865rem;

	@include pc {
		height: 50px;
		font-size: 18px;
		margin-top: 32px
	}

	&.btn {
		opacity: 1;
	}
}

.input-box {
	position: relative;
	width: calc(100% - 1.25rem);

	.icon {
		position: absolute;
		right: 0;
		top: 50%;
		width: 0.9375rem;
		height: 2.3750rem;
		fill: #B5EBFF;
		transform: translateY(-50%);
	}
}

.input-box-flex {
	display: flex;
	align-items: center;
	width: calc(100% - .25rem);

	.code-input {
		width: calc(100% - 5.5rem);
	}

	.code-img {
		display: block;
		width: 5.5rem;
	}
}

.forgot {
	font-size: 0.7813rem;
	margin: 1.2500rem 0;
	text-align: right;
}

.create-account {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #fff;
	margin-top: 1rem;
	font-size: 0.625rem;

	@include pc {
		margin-top: 24px;
		font-size: 16px;
	}

	text {
		color: #fff;
	}

	.create-account-left {
		display: flex;
		align-items: center;

		img {
			width: 1.25rem;
			height: 1.25rem;
			margin-right: 0.625rem;

			@include pc {
				width: 24px;
				height: 24px;
			}
		}
	}

	.create-account-right {
		.x-btn {
			color: #009d80;
		}
	}
}

.login-directly {
	@extend %flex-center;
	text-align: center;
	font-size: 0.625rem;
	color: #ddd;
	margin: 0.5rem 0 1.25rem;

	@include pc {
		font-size: 14px;
	}

	text {
		color: var(--MENU, #666);
	}

	view {
		margin: 0 0.6250rem;
	}

	&::before,
	&::after {
		content: '';
		flex: 1;
		display: block;
		height: 1px;
		background-color: #666;
	}
}

.icons {
	@extend %flex-center;
	justify-content: center;

	.gg-btn {
		margin-top: 0.75rem;

		img {
			width: 1.75rem;
			height: 1.75rem;
			margin-right: 1rem;
		}

		background-color: #3f6bb3;
		display: flex;
		justify-content: center;
		text-align: center;
		align-items: center;
		font-size: 0.75rem;
		min-width: 14rem;
		height: 2.8rem;
		border-radius: 0.25rem;
	}
}

[class*='icon-'] {
	width: 3.4375rem;
	height: 2.6250rem;
	// border: 1px solid #A6B2C0;
	border-radius: 50%;
	box-sizing: border-box;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 2.5rem;

	@include pc {
		height: 48px;
		width: 48px;
	}
}

@for $i from 1 through 4 {
	.icon-#{$i} {
		background-image:url(@/assets/new/login/login-icon#{$i}.png);
	}
}
</style>