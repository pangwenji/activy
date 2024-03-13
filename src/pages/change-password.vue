<template>
	<page class="change-password" :head-box="isPc ? ['content', 'right'] : undefined">

		<view class="content page-pading">

			<!-- <div class="title-larger">
				{{ $t('changePassword') }}
			</div> -->
			<view class="title" v-if="false">
				{{ $t('pageChangePassword.oldPass') }}
			</view>
			<view class="input-box">
				<input maxlength="12" :type="showOldPassword ? 'text' : 'password'" v-model="oldPassword"
					:placeholder="$t('pageChangePassword.inputOldPassword')" placeholder-class="input-placeholder" />
				<public-svg class="icon" @click="showOldPassword = !showOldPassword"
					:icon="(!showOldPassword ? 'icon_Hide' : 'icon_View')"></public-svg>
			</view>
			<view class="title" v-if="false">
				{{ $t('pageChangePassword.newPass') }}
			</view>
			<view class="input-box">
				<input maxlength="12" :type="showNeWPassword ? 'text' : 'password'" v-model="newPassword"
					:placeholder="$t('pageChangePassword.inputNewPassword')" placeholder-class="input-placeholder" />
				<public-svg class="icon" @click="showNeWPassword = !showNeWPassword"
					:icon="(!showNeWPassword ? 'icon_Hide' : 'icon_View')"></public-svg>
			</view>
			<view class="title" v-if="false">
				{{ $t('pageChangePassword.qPass') }}
			</view>
			<view class="input-box">
				<input maxlength="12" :type="showPassword ? 'text' : 'password'" v-model="surePassword"
					:placeholder="$t('pageChangePassword.inputSurePassword')" placeholder-class="input-placeholder" />
				<public-svg class="icon" @click="showPassword = !showPassword"
					:icon="(!showPassword ? 'icon_Hide' : 'icon_View')"></public-svg>
			</view>

			<view class="title" v-if="false">
				{{ $t('pageChangePassword.code') }}
			</view>
			<view class="input-box-flex">
				<input class="code-input" maxlength="6" type="text" v-model="code"
					:placeholder="$t('pageChangePassword.inputCode')" placeholder-class="input-placeholder" />
				<img class="code-img" @click="reCode()" :src="codeKey" mode="heightFix" />


			</view>
			<view class="forgot pc">
				{{ $t("pageChangePassword.tips") }}
			</view>


			<view class="submint-btn" @click="submit()">
				<public-loading v-show="isSubmit"></public-loading>
				<text v-show="!isSubmit">{{ $t("pageChangePassword.submintButton") }}</text>
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
import Page from '../components/page.vue'
import PublicLoading from '../components/public-loading.vue'
import PublicSvg from '../components/public-svg.vue'
import BorderGradient from '../components/border-gradient.vue'
import { ref, onUnmounted } from 'vue';
import { bindKeyboard, randomString, removeKeyboard } from '../uilts/base';
import { back, onLoad, onShow, open } from '../router/routes';
import { dbDelete, dbGet } from '../uilts/db';
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';
import { isPc } from '../uilts/async.var';
// import { load } from '@/uilts/routes'

const showPassword = ref<boolean>(false);
const showOldPassword = ref<boolean>(false);
const showNeWPassword = ref<boolean>(false);
const oldPassword = ref<string>('');
const newPassword = ref<string>('');
const surePassword = ref<string>('');
const code = ref<string>('');
const codeKey = ref<string>('')
const isSubmit = ref<boolean>(false)

/**
 * 获取验证码
 * returns { string } src 图片地址
 */
const codeValueGet = (): string => randomString(16);
const codeValue = ref(codeValueGet())
const reCode = (): string => codeKey.value = import.meta.env.VITE_APP_BAES_URL + '/api/public/captcha?code_value=' + (codeValue.value = codeValueGet());


const submit = () => {
	if (isSubmit.value) return;
	if (!oldPassword.value) return hint(t('pageChangePassword.inputOldPassword'))
	if (!newPassword.value) return hint(t('pageCofferPass.newPassMsg'))
	if (newPassword.value.length < 6) return hint(t('pageRegister.er2'))
	if (newPassword.value != surePassword.value) return hint(t('pageCofferPass.passNoEq'))
	isSubmit.value = true
	// /api/public/modifyPassword
	"/api/public/modifyPassword".POST<ModifyPassword>({
		old_password: oldPassword.value,
		password: newPassword.value,
		code: code.value,
		code_value: codeValue.value
	}, {
		Authorization: async () => await dbGet('token')
	}).then((_ret) => {
		hint(t('pageMemberAvatar.setSuccessful'))
		setTimeout(() => {
			oldPassword.value = ''
			newPassword.value = ''
			surePassword.value = ''
			code.value = ''
			codeValue.value = ''
			// getApp().$back()
			dbDelete('user')
			dbDelete('token')
			back(-1)
		}, 1000)
	}).finally(() => {
		isSubmit.value = false;
	})
}

let keyboardKey: string = '';
onUnmounted(() => {
	removeKeyboard(keyboardKey)
});
onLoad(() => {
	reCode();
	keyboardKey = bindKeyboard("Enter", submit)
})
onShow(() => {
	oldPassword.value = ''
	newPassword.value = ''
	surePassword.value = ''
	code.value = ''
	reCode();
	keyboardKey = bindKeyboard("Enter", submit)
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
@import '../scss/common.scss';

page {
	color: #FFF;
}

input::placeholder {
	color: var(--TAB-, #5B6DA1);
}

.change-password {
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
	margin-bottom: -1.5625rem;
}

.title-larger {
	color: #fcde26;
	font-size: 1.125rem;
	font-weight: 600;
	text-align: center;
}

.content {

	// padding: 0 0.6250rem;
	@include pc {
		// padding: 0 26px 44px;
	}
}

.title {
	padding-top: 1.1250rem;
	padding-bottom: 0.3750rem;
	color: $inputTipColor ;
	font-family: PingFang SC;
	font-size: 0.7500rem;
	font-style: normal;
	font-weight: 300;
	line-height: normal;

	@include pc {
		font-size: 18px;
	}
}

input {
	height: 2.8125rem;
	width: 100%;
	font-size: 0.7500rem;
	box-sizing: border-box;
	padding: 0 0.6250rem;
	border-radius: 0.5000rem;
	background: $inputBackgroundColor;
	margin-top: 1.125rem;
	border-radius: 0.1250rem;

	@include pc {
		font-size: 18px;
		height: 60px;
		border-radius: 8px;
	}

	&:active,
	&:focus,
	&.active {
		border: 1px solid #2AE035;
	}
}

.input-placeholder {
	color: $inputTipColor;
	font-size: 0.7813rem;
}


.submint-btn {
	@include flexButton();
	height: 2.5rem;

	/* 按钮 */
	font-family: PingFang SC;
	font-size: 0.8750rem;
	font-style: normal;
	font-weight: 900;
	line-height: normal;
	text-align: center;
	display: flex;
	align-items: center;
	margin-top: 1.8750rem;

	@include pc {
		font-size: 18px;
		height: 60px;
		margin-top: 90px;
	}
}

.input-box {
	position: relative;

	input {
		padding-right: 2.1875rem;

		@include pc {
			padding: 0 20px;
		}

		&::placeholder {
			color: $inputTipColor;
		}
	}

	.icon {
		position: absolute;
		right: 0.6250rem;
		top: 0;
		width: 0.9375rem;
		height: 2.3750rem;
		fill: #000;

		@include pc {
			display: none;
		}
	}
}

.input-box-flex {
	display: flex;
	align-items: center;
	margin-top: .9375rem;

	input {
		margin: 0;
		margin-right: 0.6250rem;

		&::placeholder {
			color: $inputTipColor;
		}
	}

	.code-input {
		width: calc(100% - 9.5000rem);

		@include pc {
			padding: 0 20px;
		}
	}

	.code-img {
		display: block;
		height: 2.8125rem;

		@include pc {
			height: 60px;
		}
	}
}

.forgot {
	font-size: 0.7813rem;
	margin: 1.2500rem 0;
	text-align: right;

	@include pc {
		font-size: 16px;
		color: rgba(255, 0, 122, 1);
		text-align: left;
		margin-top: 26px;
		margin-bottom: 0;
	}
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
