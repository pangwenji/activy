<template>
	<page :head-box="isPc ? ['content', 'right'] : undefined">
		<template #header-icon-right>
			<div class="right-icon" @click="inputConfirm(key)">{{ $t('pageMemberGen.a2') }}</div>
		</template>
		<view class="page-k page-pading">
			<view class="url-copy-team" v-if="key == 'weixin'">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/wechat.png" mode="widthFix" />
					Wechat
				</view>
				<view class="url-copy-team-view">

					<input type="text" maxlength="15" :placeholder="$t('pageMemberGen.a1')" id="wechat"
						v-model="user.weixin">
				</view>

			</view>

			<view class="url-copy-team" v-if="key == 'qq'">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/tencent-qq.png" mode="widthFix" />
					QQ
				</view>
				<view class="url-copy-team-view">

					<input type="text" maxlength="15" :placeholder="$t('pageMemberGen.a1')" id="qq" v-model="user.qq">

				</view>

			</view>

			<view class="url-copy-team" v-if="key == 'telegram'">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/te.png" mode="widthFix" />
					Telegram
				</view>
				<view class="url-copy-team-view">
					<input type="text" maxlength="15" :placeholder="$t('pageMemberGen.a1')" id="telegram"
						v-model="user.telegram">

				</view>

			</view>

			<view class="url-copy-team" v-if="key == 'email'">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/email.png" mode="widthFix" />
					Email
				</view>
				<view class="url-copy-team-view">
					<input type="text" maxlength="15" :placeholder="$t('pageMemberGen.a1')" id="email" v-model="user.email">
				</view>

			</view>

			<view class="url-copy-team" v-if="key == 'skype'">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/skp.png" mode="widthFix" />
					Skype
				</view>
				<view class="url-copy-team-view">

					<input type="text" maxlength="15" :placeholder="$t('pageMemberGen.a1')" id="skype" v-model="user.skype">

				</view>

			</view>

			<view class="url-copy-team" v-if="key == 'whatsapp'">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/wapp.png" mode="widthFix" />
					Whatsapp
				</view>
				<view class="url-copy-team-view">

					<input type="text" maxlength="15" :placeholder="$t('pageMemberGen.a1')" id="whatsapp"
						v-model="user.whatsapp">

				</view>

			</view>

		</view>


		<!-- <button @tap="onSubmit" type="default" class="bootom-y">{{$t('pageMemberAvatar.yes')}}</button> -->
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import { ref } from "vue";
import { dbGet, dbSet } from '../uilts/db';
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';
import { back, onLoad, onShow } from '../router/routes';
import { isPc } from '../uilts/async.var';


const user = ref<UserModel>({})
// const 
const key = ref<string>('')

const updateContact = (key: string, value: string) => {
	if (key == 'weixin') key = 'wechat'
	'/api/user/updateContact'.POST<UpdateContact>({
		[key]: value
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		hint(t('pageMemberAvatar.setSuccessful'))
		// getInfo()
		back();
	})
}

// const onSubmit = () => {
// 	'/api/user/updateContact'.POST<UpdateContact>({
// 		[key]:value
// 	},{
// 		Authorization:async () => await dbGet('token')
// 	}).then(_ret => {
// 		hint(getApp().$t('pageMemberAvatar.setSuccessful'))
// 		getInfo()
// 	})
// }

const inputConfirm = (e: string) => {
	// console.log(e, user.value[e], user.value);
	updateContact(e, user.value[e])
}

//获取用户信息
const getInfo = () => {
	'/api/user/getInfo'.GET<GetInfo>(null, {
		Authorization: async () => await dbGet('token')
	}).then(async ret => {
		await dbSet("user", ret);
	})
}

onLoad<PageData['/information-form']>((e) => {
	dbGet('user').then((ret) => {
		user.value = ret
	}).catch(() => {

	})
	key.value = e.type
})
onShow<PageData['/information-form']>((e) => {
	dbGet('user').then((ret) => {
		user.value = ret
	}).catch(() => {

	})
	key.value = e.type
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
@import "../scss/common.scss";

.header-card {
	height: var(--headers-height);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 0.6250rem;

	.header-name {
		margin-left: auto;
		margin-right: auto;
		color: #8E90CD;
		font-weight: 600;
		font-size: 1.0625rem;

		@include pc {
			font-size: 24px;
		}
	}

	.left-icon {
		img {
			width: 1.25rem;
			height: 1.25rem;

			@include pc {
				width: 28px;
				height: 28px;
			}
		}
	}

	.right-icon {
		color: var(--MENU, #8E90CD);
		text-align: right;

		/* 顶部标题 */
		font-family: PingFang SC;
		font-size: 1.0625rem;
		font-style: normal;
		font-weight: 900;
		line-height: normal;

		@include pc {
			font-size: 24px;
		}
	}
}


// .content{
// 	// padding-top:1.0938rem;
// }
.page-k {
	// padding:0.75rem;

	@include pc {
		// padding: 0 36px 36px;
	}
}

.p-y {
	width: 1.25rem;
	height: 1.25rem;
	margin-left: 0.250rem;

	@include pc {
		width: 10px;
		height: 18px;
	}
}

input::placeholder {
	color: var(--TAB-, #5B6DA1);
	text-align: right;
	font-family: PingFang SC;
	font-size: 0.8750rem;
	font-style: normal;
	font-weight: 400;
	line-height: 40px;
	/* 142.857% */
}

.vip-menu {


	display: flex;
	justify-content: space-around;
	font-size: 0.7813rem;
	color: #9BA6B3;
	font-weight: bold;
	text-align: center;

	&>view {
		width: 50%;
		height: 1.9063rem;
		line-height: 1.9063rem;
		border-bottom: 0.0938rem solid #828282;
	}

	.vip-menu-sign {
		opacity: 1;
		background: linear-gradient(0deg, rgba(42, 224, 53, 0.3) 0%, rgba(42, 224, 53, 0) 100%);
		color: #FFFFFF;
		border-bottom: 0.0938rem solid #2AE035;
	}
}

.url-copy-team {
	border-radius: 0.1875rem;
	background: $inputBackgroundColor;
	display: flex;
	margin-bottom: 0.5rem;
	align-items: center;
	padding: 0 0.75rem;
	color: #FFFFFF;
	font-size: 0.875rem;
	justify-content: space-between;
	height: 3.5rem;


	@include pc {
		margin-top: 0;
		margin-bottom: 36px;
		border-radius: 8px;
		padding: 0 20px;
		font-size: 18px;
	}

	.url-copy-team-name {
		display: flex;
		align-items: center;

		img {
			display: block;
			width: 1.25rem;
			height: 1.25rem;
			margin-top: 0.0000rem;
			margin-right: 0.4688rem;

			@include pc {
				width: 28px;
				height: 28px;
			}
		}
	}

	.url-copy-team-view {
		// color: #A2B2C1;
		// width: 100%;
		text-align: right;
		// height: 2.6250rem;
		// line-height: 2.6250rem;
		display: flex;
		align-items: center;
		// text-indent: 0.9375rem;
		// border-radius: 0.1087rem;
		// margin-top: 0.4688rem;
		// background-color: #202226;
		// background-image: url(@/assets/agent/copy.png);
		background-repeat: no-repeat;
		background-size: 2.6250rem 2.6250rem;
		background-position: right;
		color: $inputColor;
		text-align: right;
		font-family: PingFang SC;
		font-size: 0.8750rem;
		font-style: normal;
		font-weight: 400;
		line-height: 40px;

		/* 142.857% */
		input {
			width: 95%;
			height: 2.6250rem;
			margin: auto;
			font-size: 0.875rem;
			text-align: right;
			color: $inputColor;

			&::placeholder {
				color: $inputTipColor;
			}

			@include pc {
				border-radius: 8px;
				height: 60px;
				font-size: 18px;
			}
		}
	}
}

.bootom-y {
	margin-left: 1.2500rem;
	margin-right: 1.2500rem;
	// height: 2.3438rem;
	border-radius: 0.1250rem;
	color: #FFF;
	margin-top: 2.4063rem;
	@include button-color(#2AE035);
}
</style>
