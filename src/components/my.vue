<template>
	<div class="head-top">
		<div class="user-top-view">
			<div class="head-img">
				<border-gradient class="head-img-btn" :border-color="['#FF92FF', '#00FFFF']" :border="2">
					<img v-if="!userInfo.portrait" src="@/assets/new/user/user.png" alt="">
					<img v-else :src="userInfo.portrait" alt="">
				</border-gradient>
			</div>
			<div class="user-content">
				<div class="user-name-card">
					<div class="user-vip">
						<img src="@/assets/new/user/icon-vip-bs.png" alt="">
						<span>VIP{{ userInfo.level }}</span>
					</div>
				</div>
				<div class="user-name ellipsis">{{ userInfo.user_nick ? userInfo.user_nick : userInfo.username }}</div>
				<div class="user-moeny"><span>{{ unit }}</span>{{ balance }}</div>

			</div>
			<div style="width:100%;">
				<div class="vip-user-schedule">
					<div>VIP {{ userInfo.level }}</div>
					<div><span v-if="!userData.is_max_level">VIP </span>{{ userData.is_max_level ? $t('head.mj') :
						Number(userInfo.level) + 1 }}</div>
				</div>
				<div class="vip-schedule-card">
					<div class="vip-schedule" v-if="userData.user_group">
						<div class="vip-schedule-value" :style="{
							width: ((Number(userData.level_up_advance) / Number(userData.next_user_group.level_condition)) * 100) + '%'
						}"></div>
					</div>

					<span>{{
						userData.is_max_level ?
						$t('head.mj') :
						((Number(userData.level_up_advance) / Number(userData.next_user_group.level_condition)) *
							100).toFixed(0)
						+ '%'
					}}</span>
				</div>

			</div>
		</div>
	</div>
	<div class="page-k">

		<div class="user-top-card">
			<div class="user-top-team" @click="$open('/recharge')">
				<img class="icon" src="@/assets/new/user/icon_user_recharge_hoverh.svg" alt="">
				<img class="icon-hover" src="@/assets/new/user/icon_user_recharge_hoverb.svg" alt="">
				<span>{{ $t('head.cz') }}</span>
			</div>
			<div class="user-top-team" @click="$open('/withdraw-money')">
				<img class="icon" src="@/assets/new/user/icon_user_draw_hoverh.svg" alt="">
				<img class="icon-hover" src="@/assets/new/user/icon_user_draw_hoverb.svg" alt="">
				<span>{{ $t('head.qk') }}</span>
			</div>
			<div class="user-top-team" @click="$open('/washing')">
				<img class="icon" src="@/assets/new/user/currencyh.svg" alt="">
				<img class="icon-hover" src="@/assets/new/user/currencyb.svg" alt="">
				<span>{{ $t('head.fs') }}</span>
			</div>

		</div>

		<div class="meun-card-k">
			<meun-card :src="walletIcon" :icon-hovar="walletHover" :name="$t('pageSettingInfo.carteira')"
				@click="open('/deposit')"></meun-card>
			<meun-card :src="menuIcon" :icon-hovar="menuIconHover" :name="$t('pageSettingInfo.detalhes')"
				@click="open('/member-asset')"></meun-card>
			<meun-card :src="recordIcon" :icon-hovar="recordIconHover" :name="$t('pageSettingInfo.personalData')"
				@click="open('/member-record')"></meun-card>
			<meun-card :src="editIcon" :icon-hovar="editIconHovar" :name="$t('memberGen')"
				@click="open('/member-gen')"></meun-card>

		</div>

		<div class="out-btn" @click="outLogin">
			<img class="out-icon" src="@/assets/new/user/tc.png" alt="">
			<img class="out-icon-hover" src="@/assets/new/user/tc2.png" alt="">
			<span>{{ $t('head.out') }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">

import walletIcon from '@/assets/new/icon/wallet1.png';
import walletHover from '@/assets/new/icon/wallet2.png';

import menuIcon from '@/assets/new/icon/menu1.png';
import menuIconHover from '@/assets/new/icon/menu2.png';


import recordIcon from '@/assets/new/icon/record1.png';
import recordIconHover from '@/assets/new/icon/record2.png';

import editIcon from '@/assets/new/icon/edit1.png';
import editIconHovar from '@/assets/new/icon/edit2.png';

import BorderGradient from '../components/border-gradient.vue'
import MeunCard from '../components/menu-card.vue';

import { onMounted, ref } from 'vue';
import { back, onlyOpen, open } from '../router/routes';
import { t } from '../uilts/i18n';
import { alert } from '../uilts/ui';
import { dbDelete, dbGet, dbSet } from '../uilts/db';
import { balance, unit } from '../uilts/async.var';

// import { restSocket } from '@/uilts/socket';
const userInfo = ref<UserModel>({})
const userData = ref<VipInfo["response"]["user"]>({
	is_max_level: 0,
	level_up_advance: 0,
	user_group: {
		name: '',
		level: 0,
		level_condition: 0.0
	},
	next_user_group: {
		name: '',
		level: 0,
		level_condition: 0.0
	},
	vip: []
})

const getVipInfo = () => {
	'/api/vip/info'.GET<VipInfo>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		userData.value = ret.user
		// console.log(ret);

		// ret.vip.forEach((v: VipLevelRules["response"][number], i: number) => {
		// 	list.value.push(v)
		// 	if (v.level == userInfo.value.level) {
		// 		index.value = i
		// 	}
		// 	array.value.push(v.name)
		// })
	})
}


const outLogin = () => {

	alert({ title: t('pageSettingInfo.quit'), content: t('pageSettingInfo.outLoginTips'), showCancel: true }).then(async () => {
		'/api/public/logout'.POST<Logout>(null, {
			Authorization: async () => await dbGet('token')
		})
		// #ifdef H5
		try {
			dbGet('kwaiq').then(kwaiqId => {
				kwaiq.instance(kwaiqId).track('initiatedCheckout')
			})
			dataLayer.push({ 'event': 'logout' });
		} catch (error) {

		}
		await dbDelete('user');
		await dbDelete('token');
		await back(-1);
		await onlyOpen('/login')
	})

}

//获取用户信息
const getInfo = () => {
	'/api/user/getInfo'.GET<GetInfo>(null, {
		Authorization: async () => await dbGet('token')
	}).then(async ret => {
		userInfo.value = ret;
		await dbSet("user", ret);
	})
}
onMounted(() => {
	dbGet('user').then(user => {
		userInfo.value = user;
		getInfo();
		getVipInfo()
	});

})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.user-top-card {
	display: flex;
	justify-content: space-between;
	padding: 12px 24px;
	border-radius: 12px;
	background: #181538;
	margin-bottom: 12px;

	.user-top-team {
		text-align: center;

		img {
			width: 24px;
			height: 24px;
		}

		span {
			display: block;
			color: var(--MENU, #8E90CD);
			font-family: PingFang SC;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}

		.icon-hover {
			display: none;
		}

		&:hover {
			.icon {
				display: none;
			}

			.icon-hover {
				display: inline-block;
			}

			span {
				color: #81F4FF;
			}
		}
	}
}

.page-k {
	padding: 0 0.625rem 0.6250rem;
}

.meun-card-k {
	padding: 0.625rem 0;

	border-radius: 12px;
	background: #181538;
}

.vip-user-schedule {
	font-size: 0.6875rem;
	color: #9895CE;
	display: flex;
	justify-content: space-between;
	// width: 12.3125rem;
	align-items: center;
	padding: 7px 6px;
	font-size: 12px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;

	div:first-child {
		color: #FF5000;
		;
	}
}

.vip-schedule-card {
	border-radius: 12px;
	// background: #181538;
	padding: 8px;
	display: flex;
	border-radius: 66px;
	background: #181538;
	font-size: 12px;
	color: #FFF;
	align-items: center;
	justify-content: space-between;
}

.vip-schedule {
	flex: 1;
	height: 8px;
	border-radius: 1.5625rem;
	background: #231D4E;
}

.vip-schedule-value {
	height: 8px;
	border-radius: 1.5625rem;
	background: radial-gradient(81.43% 50% at 50% 0%, #90FFFF 0%, rgba(0, 224, 255, 0.00) 100%), linear-gradient(180deg, #00E0FF 0%, #00F0FF 62.5%, #6CFFFF 100%);
	position: relative;


	&::after {
		content: '';
		width: 23px;
		height: 23px;
		background: url(@/assets/new/user/lb.png);
		background-size: 23px 23px;
		background-repeat: no-repeat;
		position: absolute;
		right: -10px;
		top: -8px;
	}
}

.out-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.6250rem;
	color: #9895CE;
	text-align: center;
	/* 按钮 */
	font-family: PingFang SC;
	font-size: 0.8750rem;
	font-style: normal;
	font-weight: 900;
	line-height: normal;

	// border-radius: 0.5000rem;
	// border: 1px solid #29ACC9;
	// background: var(--H5-, #201E47);
	img {
		width: 24px;
		height: 24px;
	}

	.out-icon {}

	.out-icon-hover {
		display: none;
	}

	&:hover {
		color: #81F4FF;

		.out-icon-hover {
			display: block;
		}

		.out-icon {
			display: none;
		}
	}

	// margin-top: 6.38rem;
}

.content-page {
	background-color: #17181B;
	padding: 0 0.6250rem;
	min-height: 100%;
}

.head-top {
	// background-image: url(@/assets/new/member/bg.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background: #231D4E;
	padding: 0.6250rem;
	padding-top: calc(0.6250rem + constant(safe-area-inset-top));
	padding-top: calc(0.6250rem + env(safe-area-inset-top));
}

.content {
	/* #ifdef APP */
	padding: 1.2500rem 0.6250rem 0.6250rem 0.6250rem;
	/* #endif */
	background: #231D4E;
}

.user-top-view {
	position: relative;
	padding-top: 12px;
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;

	.head-img {
		position: relative;
		z-index: 1;

		.head-img-btn {
			border-radius: 50%;
		}

		img {
			width: 5.6250rem;
			height: 5.6250rem;
			border-radius: 50%;
		}
	}

	.user-content {
		padding: 0 0.6250rem;

		.user-name-card {
			// display: flex;
			position: relative;
			z-index: 2;
			margin-top: -10px;
			align-items: center;



			.user-vip {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FFFFFF;
				font-family: PingFang SC;
				font-size: 14px;
				font-style: normal;
				font-weight: 600;
				height: 24px;
				padding: 2px 10px;
				line-height: 12px;
				/* 85.714% */
				border-radius: 0.5625rem;
				background: #FF5000;
				border-radius: 14px;

				// line-height: 24px;
				/* 114.286% */
				img {
					width: 0.8438rem;
					height: 0.8438rem;
				}
			}
		}

		.user-name {
			color: #FFB800;
			// max-width: 6rem;
			font-family: Montserrat;
			font-size: 1.3125rem;
			font-style: normal;
			font-weight: 600;
			line-height: normal;
			padding-right: 0.3750rem;
			padding-top: 8px;
			justify-content: center;
			text-align: center;
		}

		.user-moeny {
			color: #8574D1;
			font-family: Montserrat;
			font-size: 16px;
			font-style: normal;
			font-weight: 600;
			line-height: 18px;
			padding-top: 8px;

			span {
				color: #8574D1;
				font-family: Montserrat;
				font-size: 12px;
				font-style: normal;
				font-weight: 600;
				line-height: 18px;
				/* 150% */
			}
		}

		.user-id {
			padding-top: 0.6250rem;

			span {
				color: var(--TAB-, #5B6DA1);
				font-family: PingFang SC;
				font-size: 0.8750rem;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}

			color: var(--MENU, #8E90CD);
			font-family: PingFang SC;
			font-size: 0.8750rem;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}

	.user-top-edit-btn {
		border-radius: 0.5000rem;
		border: 1px solid #29ACC9;
		background: var(--H5-, #201E47);
		padding: 0 1.2500rem;
		height: 1.6875rem;
		color: #FFFFFF;
		font-family: PingFang SC;
		font-size: 0.8750rem;
		font-style: normal;
		font-weight: 900;
		line-height: normal;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}

.edit-bottom {
	position: absolute;
	top: 0;
	right: 0;
	width: 2.1875rem;
	height: 2.1875rem;
	border-radius: 0.1563rem;
	text-align: center;
	background-color: #1E2024;

	.icon {
		margin-top: 0.7813rem;
	}
}

.icon {
	width: 0.9375rem;
	height: 0.9375rem;
	fill: #9BA6B3
}

.meun-view {
	// width: 21.8750rem;
	border-radius: 0.1087rem;
	background-color: #1E2024;
	// margin: 1.2500rem 0.7813rem 0;
	margin-bottom: 1.2500rem;
}

.public-meun-team {
	// border-bottom: 1px solid #2d3034;

	&:last-child {
		border: none;
	}
}

.vip-meun-view {
	// width: 21.8750rem;
	background-color: #1E2024;
	border-radius: 0.1087rem;
	margin: 0.8438rem 0.7813rem 0;

	.scroll-view_H {
		white-space: nowrap;
		width: calc(100% - 1.5625rem);
		margin: 0 0.7813rem;

		img {
			width: 2.0313rem;
			height: 2.8750rem;
		}
	}

}

.meun-curto-card {
	display: flex;
	justify-content: space-between;
	margin: 1.2500rem 0;

	view {
		display: flex;
		width: calc(50% - 0.3125rem);
		text-align: center;
		justify-content: center;
		align-items: center;
		height: 2.6063rem;
		line-height: 2.6063rem;
		background-image: linear-gradient(to bottom, #2F2C61, #312E63, #4741A3);
		border-radius: 0.1087rem;
		transform: skew(-5deg);
		border-radius: 0.5000rem;

		img {
			transform: skew(5deg);
		}

		span {
			display: block;
			color: var(--MENU, #8E90CD);
			text-shadow: 0px 1.367px 0px #000;
			/* PingFang/Medium 28 */
			font-family: PingFang SC;
			font-size: 0.8750rem;
			font-style: normal;
			font-weight: 400;
			transform: skew(5deg);
			padding-left: 0.3125rem;
			/* 142.857% */
		}
	}

	img {
		width: 1.1250rem;
		height: 1.1250rem;
	}
}

@media (min-width: 9999px) {
	.public-meun-team {
		border-bottom: none;
	}

	.meun-view {
		margin: 0;
	}

	page {
		background: var(--body-background-color) !important;
		padding: 0 0.6250rem;
	}
}
</style>