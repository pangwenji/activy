<template>
	<page :mouseWheel="true" :on-pullup="next" contentStyle="height:calc(100% - 2.5rem - var(--headers-height))">
		<div class="page-k page-pading">
			<view class="tab">
				<text class="item" :class="{ 'item-active': show == 'deixe' }"
					@click="switchMeun('deixe')">{{ $t('pageNoticeMessage.leave') }}</text>
				<text class="item" :class="{ 'item-active': show == 'not' }" @click="switchMeun('not')"><span
						class="red" v-if="soketData.new_user_message > 0">{{ Math.min(99, soketData.new_user_message) }}</span> {{ $t('pageNoticeMessage.message') }}</text>
			</view>
			<view class="deixe-view" v-if="show == 'deixe'">
				<view class="deixe-lable">{{ $t('pageNoticeMessage.label') }}</view>
				<view class="deixe-input">
					<textarea maxlength="200" class="deixe-input-textarea" placeholder-class="placeholder" v-model="content"
						:placeholder="$t('pageNoticeMessage.placeholder')" @input="bindTextAreaBlur" />
					<text class="input-num">{{ num }}/200</text>
				</view>
				<div class="bt-card" @click="sendMessage">
					<view class="btn">
						<public-loading v-show="isSubmit"></public-loading>
						<text v-show="!isSubmit">{{ $t('pageNoticeMessage.leave') }}</text>
					</view>
				</div>


				<text class="tp1">{{ $t('pageNoticeMessage.tips1') }}</text>
				<text class="tp2">{{ $t('pageNoticeMessage.tips2') }} <span>{{ config.kf_email }}</span></text>
			</view>

			<template v-else>

				<view class="public-loadings" v-if="loadingShow">
					<public-loading></public-loading>
				</view>
				<view class="empty" :data-empty="$t('ui.empty')" v-if="list.length <= 0 && !loadingShow"></view>
				<view v-for="v, i in list" :key="i">
					<view class="msg-view" v-if="v.data_status !== 1">
						<view class="msg-head right">
							<div class="kf">
								<img class="kf-png" src="@/assets/new/message/kf.png" mode="">
							</div>

							<!-- <text class="vip-num">V{{userInfo.level}}</text> -->
						</view>

						<view class="msg-content">
							<view class="msg-content-top ">


								<text class="msg-content-time">{{ v.create_time }}</text>
								<text class="msg-content-name-2  right">系统消息</text>
							</view>
							<view class="msg-content-text">
								{{ v.message }}
							</view>
						</view>

					</view>

					<view class="msg-view" v-if="v.data_status === 1">
						<!-- <view class="msg-head right">
			<image src="@/assets/user/user.png" mode=""></image>
			<text class="vip-num">V0</text>
		</view> -->
						<view class="msg-content">
							<view class="msg-content-top t-left">
								<text class="msg-content-time">{{ v.create_time }}</text>
								<text class="msg-content-name left">{{ v.username }}</text>

							</view>
							<view class="msg-content-text msg-right">
								{{ v.message }}
							</view>
						</view>

						<view class="msg-head left">
							<img :src="v.portrait ? v.portrait : userTop" mode="" />
							<div class="vip-num">
								<img src="@/assets/new/user/icon-vip.png" alt="">
								<span>VIP{{ userInfo.level }}</span>
							</div>
							<!-- <text class="vip-num">V{{ userInfo.level }}</text> -->
							<!-- <text class="vip-num">V0</text> -->
						</view>
					</view>
				</view>
			</template>
		</div>


	</page>
</template>

<script setup lang="ts">
import BorderGradient from "../components/border-gradient.vue"
// import ScrollView from "../components/scroll-view.vue";
import Page from '../components/page.vue'
import PublicLoading from '../components/public-loading.vue'
import { ref, nextTick } from 'vue';
import { dbGet } from '../uilts/db';
import { t } from '../uilts/i18n';
import { hint } from '../uilts/ui';
import { open, onLoad, onShow } from '../router/routes';
import { config } from '../uilts/async.var';
import userTop from '@/assets/user/user.png'
import { soketData } from "../uilts/socket";

const userInfo = ref<UserModel>({})
const num = ref<number>(0)
const show = ref<string>('deixe')//deixe not
const content = ref<string>("")
const pages = ref<number>(1)
const limit = 10
const lastPage = ref<number>(1)
const list = ref<MessageList["response"]["list"]>([])
const sceollTop = ref<number>(-1)
const loadingShow = ref<boolean>(false)
const isSubmit = ref<boolean>(false)

const bindTextAreaBlur = () => {
	num.value = content.value.length
}

const switchMeun = (e: string) => {
	show.value = e
	if (list.value.length == 0) getMessageList()
}

//获取消息列表
const getMessageList = async () => {
	loadingShow.value = true
	try {
		let ret = await '/api/personal/messageList'.POST<MessageList>({
			status: "",
			page: pages.value,
			limit: limit
		}, {
			Authorization: async () => await dbGet('token')
		});

		// collect.splice(0,collect.length)
		ret.list.forEach((v) => {
			list.value.unshift(v)
		})
		lastPage.value = Math.ceil(ret.totalCount / limit)
		nextTick(() => {
			if (pages.value == 1) sceollTop.value = 100000
		})
	} catch (error) {

	}
	soketData.new_user_message = 0
	loadingShow.value = false
}

//发送消息
const sendMessage = () => {
	if (isSubmit.value) return;
	if (!content.value.trim()) return hint(t('pageNoticeMessage.msg'))
	isSubmit.value = true
	'/api/personal/message'.POST<Message>({
		send_content: content.value
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		// collect.splice(0,collect.length)
		hint(t('pageNoticeMessage.hint'))
		content.value = ""
		sceollTop.value = -1
		list.value.length = 0
		pages.value = 1
		num.value = 0
		// getMessageList()
	}).finally(() => {
		isSubmit.value = false;
	})
}

const next = async () => {
	if (lastPage.value > pages.value) {
		pages.value += 1
		await getMessageList()
	}
}


onLoad(() => {
	dbGet('user').then(user => {
		userInfo.value = user
	});
})

onShow(() => {
	list.value.length = 0
	show.value = 'deixe'
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
@import "../scss/common.scss";
// page,
// 	.content {
// 		height: 100%;
// 		box-sizing: border-box;
// 		background-color: #1e2024;
// 		display: flex;
// 		flex-direction: column;
// 	}

.red {
	display: block;
	width: 0.75rem;
	height: 0.75rem;
	position: absolute;
	right: -0.7rem;
	top: 0.2rem;
	font-size: 0.625rem;
	color: #FFF;
	text-align: center;
	// transform: translateY(-50%);
	background-color: #FF0000;
	border-radius: 100%;
}

.bt-card {
	width: 100%;
	display: flex;
	padding-top: 0.625rem;
	justify-content: center;
	align-items: center;

	.border-gradient-btn {
		width: 100%;
		border-radius: 0.5000rem;
	}
}

.tab {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	margin: 0 20rpx;

	.item {
		padding: .3rem 0;
		position: relative;
		color: white;
		font-size: .8rem;
	}

	.item-active {
		color: #009d81;

		&::after {
			content: "";
			position: absolute;
			left: 0;
			bottom: 0rem;
			width: 100%;
			background: #009d81;
			height: .1rem;
		}
	}
}


.page-k {
	// padding: 0.6250rem;
	background: $pageBackgroundColor;
}

.msg-right {
	text-align: right;
	margin-left: auto;
	margin-right: 0;
}

.btn {
	@include flexButton(#009d81);
	height: 2.3750rem;
}

.public-loadings {
	margin: 0.6250rem;
	padding-top: 10rem;
}

.msg-list-box {
	width: 100%;
	height: calc(100% - $content-height - var(--window-bottom));
	scrollbar-width: 0;
	scrollbar-color: transparent transparent;
}

@media (min-width: 9999px) {
	.msg-list-box {
		width: 100%;
		height: calc(100% - $content-height);
	}
}

@media (min-width: 9999px) {
	.message-meun {
		border-bottom: 0.0938rem solid #1C1E22 !important;
		background-color: #2C2F34 !important;
		max-width: 375px;
	}

	.deixe-input-textarea,
	.msg-content-text {
		background-color: #231D4E !important;
	}
}

.message-meun {
	width: 100%;
	display: flex;
	justify-content: space-between;
	font-size: 0.7813rem;
	color: var(--TAB-, $tipColor);
	// height: 2.5000rem;
	// line-height: 2.5000rem;
	// border-radius: 0.2500rem;

	z-index: calc(var(--I1) + 0);

	view {
		width: calc(50% - 0.25rem);
		text-align: center;
		border: 1px solid rgba(73, 70, 118, 0.50);
		background: rgba(32, 30, 71, 0.32);
		padding: 0.2500rem 0;
		border-radius: 0.2500rem;
	}

	.message-meun-sig {
		color: #0FF;
		border-radius: 0.2500rem;
		background: var(--TAB, #2E2C5E);
		border-color: var(--TAB, #2E2C5E);
	}
}

.deixe-view {
	// padding: 0.6250rem;

	.deixe-lable {
		margin: 0.9375rem 0 0.6250rem;
		color: $tipColor;
		font-family: PingFang SC;
		font-size: $fontSize;
		font-style: normal;
		font-weight: 300;
		line-height: normal;
	}

	.deixe-input {
		// margin: 0 0.5625rem;
		position: relative;

		.deixe-input-textarea {
			border-radius: 16px;
			background: $inputBackgroundColor;
			color: $inputColor;
			width: calc(100% - 0.9375rem);
			height: 6.6250rem;
			border-radius: 0.2188rem;
			font-size: 0.7813rem;
			box-sizing: content-box;
			padding: 0.6250rem 0.4688rem 1.5625rem;

			&::placeholder {
				color: $inputColor;
				font-family: PingFang SC;
				font-size: 0.8750rem;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}
		}

		.placeholder {
			color: $tipColor;
		}

		.input-num {
			position: absolute;
			bottom: 0.3125rem;
			right: 0.6250rem;

			font-size: $fontSize;
			color: $highTipColor;
		}
	}

	.bootom-y {
		height: 2.3438rem;
		@include button(#2AE035);
		// color: #000000;
		font-size: 1.0313rem;
		font-weight: bold;
		line-height: 2.3438rem;
		border-radius: 0.1250rem;
		margin-top: 2.4063rem;
	}

	.tp1 {
		// width: 85%;
		display: block;
		font-size: 0.7813rem;
		margin-left: auto;
		margin-right: auto;
		margin-top: 0.9375rem;
		color: $tipColor;
		font-family: PingFang SC;
		font-size: $fontSize;
		font-style: normal;
		font-weight: 300;
		line-height: normal;
	}

	.tp2 {
		margin-top: $textMarginTop;
		// width: 85%;
		display: block;
		font-size: 0.7813rem;
		margin-left: auto;
		margin-right: auto;
		// margin-top: 0.9375rem;
		color: $tipColor;
		font-family: PingFang SC;
		font-size: $fontSize;
		font-style: normal;
		font-weight: 300;
		line-height: normal;

		span {
			color: $highTipColor;
			font-family: PingFang SC;
			font-size: $fontSize;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}


}

.msg-view {
	padding: 0.9375rem 0 0;
	// width: calc(100% - 1.8750rem);
	box-sizing: content-box;
	// margin: 0.9375rem;
	display: flex;

	.msg-head {
		// width: 1.5938rem;
		position: relative;

		// display: flex;
		// flex-wrap: wrap;
		// justify-content: end;
		.kf {
			width: 2.5000rem;
			height: 2.5000rem;
			border-radius: 50%;
			border: 2px solid #3D35C6;
			display: flex;
			align-items: center;
			justify-content: center;

			.kf-png {
				width: 1.5938rem;
				height: 1.5938rem;
			}
		}

		img {
			width: 2.5000rem;
			height: 2.5000rem;
			border-radius: 50%;

		}

		.vip-num {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;

			// position: absolute;
			top: 1.2500rem;
			left: 0;
			width: 2.5000rem;
			height: 0.9375rem;
			// background-color: #b1caeb;
			color: #0FF;
			font-size: 0.5000rem !important;

			border-radius: 0.5625rem;
			background: rgba(0, 255, 255, 0.10);

			// padding: 0.0625rem 0.3125rem;
			img {
				width: 0.5000rem;
				height: 0.5000rem;
			}

			span {
				display: block;
				text-align: center;
			}
		}
	}

	.msg-content {
		width: 100%;

		.msg-content-top {
			font-size: 0.7813rem;
			color: #A2B2C1;

			.msg-content-name {
				color: #FFB800;
			}

			.msg-content-name-2 {
				color: #0FF;
				margin-left: 0.6250rem;
			}

			.msg-content-time {
				color: $tipColor;
			}
		}

		.msg-content-text {
			margin-top: 0.4688rem;
			background-color: #231D4E;
			border-radius: 0.2188rem;
			width: 50%;
			// height: 7.3125rem;
			padding: 0.6250rem;
			color: var(--MENU, #8E90CD);
			text-align: right;
			font-family: PingFang SC;
			font-size: 0.8750rem;
			font-style: normal;
			font-weight: 300;
			line-height: normal;
			white-space: break-word;
			overflow-wrap: break-word;
			word-break: break-all;
		}
	}

	.right {
		margin-right: 0.6250rem;
	}

	.left {
		margin-left: 0.6250rem;
	}

	.t-left {
		text-align: right;
	}
}
</style>