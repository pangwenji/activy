<template>
	<page :head-box="isPc ? ['content', 'right'] : undefined" :show-scrollbar="true" :mouse-wheel="true">


		<view class="page-k page-pading">
			<!-- <view class="url-copy-team">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/mail.png" mode="widthFix" />
					Email
				</view>
				<view class="url-copy-team-view">
					<input type="text" maxlength="15"  id="email" disabled>
					<img class="p-y" src="@/assets/new/tel/p-yy.png" alt="">
				</view>

			</view> -->
			<view class="url-copy-team cursor" @click="inputConfirm('weixin')">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/wechat.png" mode="widthFix" />
					Wechat
				</view>
				<view class="url-copy-team-view">
					<input type="text" maxlength="15" id="wechat" v-model="user.weixin" @blur="inputConfirm('weixin')"
						@confirm="inputConfirm('weixin')">
					<img class="p-y" src="@/assets/new/tel/p-yy.png" alt="">
				</view>
			</view>

			<view class="url-copy-team cursor" @click="inputConfirm('qq')">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/tencent-qq.png" mode="widthFix" />
					QQ
				</view>
				<view class="url-copy-team-view">

					<input type="text" maxlength="15" id="qq" v-model="user.qq" @blur="inputConfirm('qq')"
						@confirm="inputConfirm('qq')">
					<img class="p-y" src="@/assets/new/tel/p-yy.png" alt="">
				</view>

			</view>

			<view class="url-copy-team cursor" @click="inputConfirm('telegram')">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/te.png" mode="widthFix" />
					Telegram
				</view>
				<view class="url-copy-team-view">

					<input type="text" maxlength="15" id="telegram" v-model="user.telegram" @blur="inputConfirm('telegram')"
						@confirm="inputConfirm('telegram')">
					<img class="p-y" src="@/assets/new/tel/p-yy.png" alt="">
				</view>

			</view>



			<view class="url-copy-team cursor" @click="inputConfirm('email')">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/email.png" mode="widthFix" />
					Email
				</view>
				<view class="url-copy-team-view">

					<input type="text" maxlength="15" id="email" v-model="user.email" @blur="inputConfirm('email')"
						@confirm="inputConfirm('email')">
					<img class="p-y" src="@/assets/new/tel/p-yy.png" alt="">
				</view>

			</view>

			<view class="url-copy-team cursor" @click="inputConfirm('whatsapp')">
				<view class="url-copy-team-name">
					<img src="@/assets/new/tel/wapp.png" mode="widthFix" />
					Whatsapp
				</view>
				<view class="url-copy-team-view">

					<input type="text" maxlength="15" id="whatsapp" v-model="user.whatsapp" @blur="inputConfirm('whatsapp')"
						@confirm="inputConfirm('whatsapp')">
					<img class="p-y" src="@/assets/new/tel/p-yy.png" alt="">
				</view>

			</view>
		</view>

	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import { ref } from "vue";
import { dbGet, dbSet } from '../uilts/db';
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';
import { open, onLoad, onShow } from '../router/routes';
import { isPc } from '../uilts/async.var';

const user = ref<UserModel>({})
// const 


const updateContact = (key: string, value: string) => {
	if (key == 'weixin') key = 'wechat'
	'/api/user/updateContact'.POST<UpdateContact>({
		[key]: value
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		hint(t('pageMemberAvatar.setSuccessful'))
		getInfo()
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
	// console.log('我在这里', e);
	// console.log(e, user.value[e], user.value);
	open('/information-form', { type: e })
	// updateContact(e, user.value[e])
}

//获取用户信息
const getInfo = () => {
	'/api/user/getInfo'.GET<GetInfo>(null, {
		Authorization: async () => await dbGet('token')
	}).then(async ret => {
		user.value = ret
		await dbSet("user", ret);
	})
}

onLoad(() => {
	dbGet('user').then((ret) => {
		user.value = ret
	}).catch(() => {

	})
})
onShow(() => {
	getInfo();
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
@import "../scss/common.scss";

// .content{
// 	// padding-top:1.0938rem;
// }
.page-k {
	// padding:0.75rem;

	@include pc {
		// padding: 0 36px 36px;
	}
}

.icon {
	width: 2.5rem;
	height: 2.5rem;
	fill: white;
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
	display: flex;
	align-items: center;
	padding: 0 0.75rem;
	color: #FFFFFF;
	font-size: 0.875rem;
	justify-content: space-between;
	height: 3.5rem;
	border-bottom: .0625rem solid $borderBottomColor;

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
		flex: 1;
		margin-left: 1.25rem;
		// text-indent: 0.9375rem;
		// border-radius: 0.1087rem;
		// margin-top: 0.4688rem;
		// background-color: #202226;
		// background-image: url(@/assets/agent/copy.png);
		background-repeat: no-repeat;
		background-size: 2.6250rem 2.6250rem;
		background-position: right;
		color: white;
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
			color: white;

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
