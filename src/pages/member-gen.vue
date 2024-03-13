<template>
	<page :head-box="isPc ? ['content', 'right'] : undefined" :title="isPc ? ' ' : undefined">
		<div class="page-k page-pading">

			<div class="user-card">
				<div class="head-card">
					<div class="head-img-btn" :border-color="['#FF92FF', '#00FFFF']" :border="1"
						:show-border="!isPc" :bg-color="isPc ? '' : undefined">
						<public-image class="user-head" v-if="!userInfo?.portrait" :src="normImg"></public-image>
						<public-image class="user-head" v-else :src="userInfo?.portrait"></public-image>
				</div>
					<div class="vip-box" :style="{
						inset: 1 + 'px'
					}">
						<div class="user-vip">
							<img class="h5" src="@/assets/new/user/icon-vip.png" alt="">
							<img class="pc" src="@/assets/new/member-gen/fb.png" alt="">
							<span>VIP{{ userInfo?.level }}</span>
						</div>
					</div>
				</div>
				<div class="name-card">
					<span>{{ userInfo?.user_nick ?? userInfo?.username }}</span>
					<img class="h5" @click="$open('/member-avatar')" src="@/assets/new/member-gen/edit-03.png" alt="">
				</div>
				<div class="id-card">ID:{{ userInfo?.id }}</div>
			</div>


			<view class="setting-team">
				<view class="setting-title">
					<img class="word-icon" src="@/assets/new/member-gen/login_user.png" mode="" />
					<text>{{ $t('pageMemberGen.m1') }}</text>
				</view>
				<view class="setting-select xxx-btn" @click="$copy(userInfo?.username ?? '')">
					<text class="value">{{ userInfo?.username }}</text>

					<img class="setting-select-icon-top" src="@/assets/new/member-gen/intersection.png" mode="" />
				</view>
			</view>

			<view class="setting-team" @click="$open('/change-password')">
				<view class="setting-title">
					<img class="word-icon" src="@/assets/new/member-gen/login_password.png" mode="" />
					<text>{{ $t('pageMemberGen.m2') }}</text>
				</view>
				<view class="setting-select xxx-btn ">
					<!-- <text class="value ellipsis">{{ $t('pageSettingSecure.immediatelyClean') }}</text> -->
					<public-svg class="right-icon" icon="icon_Arrow">
					</public-svg>
				</view>
			</view>

			<view class="setting-team  padding" @click="$open('/information')">
				<view class="setting-title">
					<img class="word-icon" src="@/assets/new/member-gen/notebook-one.png" mode="" />
					<text>{{ $t('pageMemberGen.m3') }}</text>
				</view>
				<view class="setting-select xxx-btn ">
					<!-- <text class="value ellipsis">{{ $t('pageSettingSecure.immediatelyClean') }}</text> -->
					<public-svg class="right-icon" icon="icon_Arrow">
					</public-svg>
				</view>
			</view>

			<view class="setting-team  padding" @click="$open('/bank-card')">
				<view class="setting-title">
					<img class="word-icon" src="@/assets/new/member-gen/notebook-one.png" mode="" />
					<text>{{ $t('pageMemberGen.m4') }}</text>
				</view>
				<view class="setting-select xxx-btn ">
					<!-- <text class="value ellipsis">{{ $t('pageSettingSecure.immediatelyClean') }}</text> -->
					<public-svg class="right-icon" icon="icon_Arrow">
					</public-svg>
				</view>
			</view>
		</div>

	</page>
</template>

<script setup lang="ts">
import walletIcon from '@/assets/new/icon/wallet.png';
import loginUser from '@/assets/new/member-gen/login_user.png'
import { back, onLoad, onShow, onlyOpen, open } from '../router/routes';

import Page from '../components/page.vue';
import PublicSvg from '../components/public-svg.vue';
import PublicImage from '../components/public-image.vue';
import MeunCard from '../components/9f/menu-card.vue';

import BorderGradient from '../components/border-gradient.vue'
import { ref, onUnmounted } from 'vue';
import { dbGet, addListener, removeListener } from '../uilts/db';
import { isPc } from '../uilts/async.var';
import normImg from '@/assets/new/user/user.png';
// pageSettingSecure.cleanOk

const lang = ref<string>('')

const userInfo = ref<UserModel>();

const setUserInfo = (type: string, data: UserModel | undefined) => {
	if (type === 'set') {
		userInfo.value = data;
	}
}

onUnmounted(() => {
	removeListener('user', setUserInfo);
})
onLoad(() => {
	dbGet('language').then(name => {
		dbGet('init').then(init => {
			let arr = init.language.filter((v) => name == v.lang);
			if (arr[0]) {
				lang.value = arr[0].remark;
			}
		})
	})

	addListener('user', setUserInfo)

	dbGet('user').then(user => {
		userInfo.value = user
	})

})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
@import "../scss/common.scss";

.user-card {
	padding: 1.25rem;

	.head-card {
		display: flex;
		justify-content: center;
		width: 6.72rem;
		border-radius: 50%;
		position: relative;
		margin: auto;

		@include h5 {
			overflow: hidden;
		}

		@include pc {}

		.head-img-btn {
			border-radius: 50%;
			width: 6.72rem;
			height: 6.72rem;

			.user-head {

				@include pc {
					width: 100px;
					height: 100px;
				}
			}
		}

		.vip-box {
			position: absolute;
			margin: auto;
			border-radius: 50%;
		}

		.user-vip {
			width: 100%;
			position: absolute;
			height: 1.625rem;
			bottom: 0;
			border-radius: 0rem 0rem 0.5rem 0.5rem;
			background: rgba(2, 6, 16, 0.70);
			backdrop-filter: blur(3px);
			display: flex;
			align-items: center;
			justify-content: center;
			left: 50%;
			transform: translateX(-50%);

			@include pc {
				border-radius: 14px;
				background: #FF8A00;
				padding: 2px 10px;
				width: auto;
			}

			span {
				color: #FF6B00;
				font-size: 0.65625rem;
				font-style: normal;
				font-weight: 400;

				@include pc {
					font-size: 14px;
					color: #FFF;
				}

				/* 114.286% */
			}

			img {
				width: 0.84375rem;
				height: 0.84375rem;
				margin-right: 0.19rem;

				@include pc {
					width: 14px;
					height: 14px;
					margin-right: 8px;
				}
			}
		}
	}

	.name-card {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 0.31rem;
		margin-right: -2.125rem;

		span {
			color: #fff;
			font-size: 0.75rem;
			font-weight: 400;

			@include pc {
				font-size: 20px;
			}
		}

		img {
			width: 0.75rem;
			height: 0.75rem;
			margin-left: 1rem;
			cursor: pointer;
			filter: brightness(100%);
			@include pc {
				width: 16px;
				height: 16px;
			}
		}

		@include pc {
			font-size: 20px;
			margin-right: -28px;

			span {
				color: #FFF;
				font-size: 20px;
			}

			img {
				width: 16px;
				height: 16px;
				margin-left: 12px;
			}
		}
	}

	.id-card {
		padding: 0.31rem;
		text-align: center;
		color: #fff;
		font-family: PingFang SC;
		font-size: 0.75rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;

		@include pc {
			color: #B2B3BD;
			font-family: PingFang SC;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}
}

.page-k {
	// padding: 0.6250rem;

	@include pc {
		// padding: 0 36px;
	}

}

.flex {
	display: flex;
}


.padding {
	padding-bottom: 0.9375rem;
}

.setting-team {
	display: flex;
	justify-content: space-between;
	height: 2.656rem;
	align-items: center;
	padding: .3125rem 0.625rem;
	border-radius: 0.5rem;
	cursor: pointer;
	background: #2A2A2A;
	margin-bottom: .75rem;
	border-radius: .5rem;

	@include pc {
		padding: 16px 26px;
		background: #1B1839;
		margin-bottom: 20px;
		font-size: 18px;
		font-weight: 600;
	}

	.setting-title {
		height: 2.1875rem;
		line-height: 2.1875rem;
		display: flex;
		align-items: center;

		.word-icon {
			display: block;
			width: 0.9550rem;
			// margin-top: 0.5625rem;
			margin-right: 0.38rem;

			@include pc {
				display: none;
			}
		}

		text {

			color: #C4C4C4;
			font-size: 0.75rem;
			font-style: normal;

			@include pc {
				font-size: 18px;
			}

			/* 142.857% */
		}
	}

	.setting-select {
		// background-color: #2D2D35;
		display: flex;
		align-items: center;
		font-size: 0.7813rem;
		border-radius: 0.1084rem;
		// width: 12.1875rem;
		// height: 2.0625rem;
		// line-height: 2.0625rem;
		display: flex;

		.value {
			color: white;
			font-size: 0.875rem;

			@include pc {
				font-size: 18px;
				color: #B5EBFF;
			}

			/* 142.857% */
		}

		.setting-select-icon-top {
			display: block;
			// margin-top: 0.8281rem;
			width: 1.125rem;
			height: 1.125rem;
			margin-left: 0.5rem;

			// margin-right: 0.4063rem;
			@include pc {
				width: 20px;
				height: 20px;
			}
		}

		.right-icon {
			width: .9375rem;
			height: .9375rem;
			fill: #C4C4C4;

			@include pc {
				width: 20px;
				height: 20px;
			}
		}
	}

	.setting-select:active {
		background-color: #494958;
	}

	.setting-select:active {
		background-color: #78806a;
	}

	.setting-switch {
		background-color: #787880;
		width: 2.8000rem;
		height: 1.2153rem;
		border-radius: 19.44px;
		margin-top: 0.4375rem;
		margin-left: auto;
		position: relative;
	}

	.setting-switch-sign {
		background-color: #00FFFF;
		width: 2.8000rem;
		height: 1.2153rem;
		border-radius: 19.44px;
		margin-top: 0.4375rem;
		margin-left: auto;
		position: relative;
	}

	.setting-switch-sign::after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		width: 1.2153rem;
		height: 1.2153rem;
		border-radius: 50%;
		background-color: #231d4e;
	}

	.setting-switch::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 1.2153rem;
		height: 1.2153rem;
		border-radius: 50%;
		background-color: #FFFFFF;
	}
}
</style>