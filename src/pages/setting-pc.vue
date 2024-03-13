<template>
	<page>
		<view v-if="!hidden" class="head-top">
			<view class="user-top-view">
				<user-top @click="open('/member-avatar')"></user-top>
				<view class="edit-bottom -btn" @click="open('/member-avatar')">
					<public-svg class="icon" icon="icon_Edit"></public-svg>
				</view>
			</view>
		</view>
		<template v-if="!setting">
			<view class="meun-curto-card" v-if="!hidden">
				<view class="meun-curto-team m-btn" @click="open('/message')">
					<img src="@/assets/user/cart.png" mode="" />
				</view>
				<view class="meun-curto-team m-btn" @click="open('/notice')">
					<img src="@/assets/user/ld.png" mode="" />
				</view>
			</view>
		</template>
		<view class="meun-view" v-if="!hidden">
			<meun-item :name="$t('pageSettingInfo.conta')" icon="icon_UserProfile" :value="userInfo.username"></meun-item>
			<meun-item :name="$t('pageSettingInfo.alterarSuaSenha')"
				@click="open('/change-password')" icon="icon_Locked"></meun-item>
			<meun-item :name="$t('pageHall.vip')" @click="open('/vip')" icon="icon_Medal" :none="true">
			</meun-item>
		</view>

		<template v-if="!setting">
			<view class="meun-view">
					<meun-item class="pc" :name="$t('pageSettingInfo.settingData')" @click="open('/setting')"
						icon="icon_UserProfile" :none="true" :right="hidden"></meun-item>
				<meun-item :name="$t('pageSettingInfo.carteira')" @click="open('/deposit')"
					icon="icon_Wallet" :right="hidden"></meun-item>
					<meun-item class="h5"  :name="$t('pageSettingInfo.detalhes')" @click="open('/member-asset')"
						icon="icon_Rules" :right="hidden"></meun-item>
				<meun-item :name="$t('pageSettingInfo.personalData')" @click="open('/member-record')"
					icon="icon_Analyze" :right="hidden"></meun-item>
				<meun-item :name="$t('pageSettingInfo.shareMoney')" @click="open('/share')" icon="icon_Link"
					:right="hidden"></meun-item>
				<meun-item :name="$t('pageSettingInfo.informationSettings')"
					@click="open('/information')" icon="icon_Setting" :right="hidden"></meun-item>
				<meun-item class="h5" :name="$t('pageSettingInfo.securitySettings')" @click="open('/secure')"
					icon="icon_Verification" :none="true" :right="hidden"></meun-item>
			</view>


			<view class="meun-view">
				<meun-item :name="$t('pageSettingInfo.quit')" @click="outLogin" icon="icon_Logout" :none="true"
					:right="hidden"></meun-item>
			</view>

		</template>

	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import MeunItem from '../components/meun-item.vue';
import PublicSvg from '../components/public-svg.vue'
import UserTop from '../components/user-top.vue'
import { onBeforeMount, ref } from 'vue';
import { open, onLoad, onShow, switchTab } from '../router/routes';
import { t } from '../uilts/i18n';
import { alert } from '../uilts/ui';
import { dbDelete, dbGet, dbSet } from '../uilts/db';

	// import { restSocket } from '@/uilts/socket';
	const userInfo = ref<UserModel>({})

	
	let hidden = false;
	let setting = true;
	const outLogin = () => {
		alert({title: '', content:t('pageSettingInfo.outLoginTips'), showCancel:true  }).then(async ()=>{
			'/api/public/logout'.POST<Logout>(null, {
					Authorization: async () => await dbGet('token')
				})
				// #ifdef H5
				try {
						dbGet('kwaiq').then(kwaiqId => {
							kwaiq.instance(kwaiqId).track('initiatedCheckout')
						})
						dataLayer.push({'event':'logout'});
					} catch (error) {
						
				}
				// #endif
				await dbDelete('user');
				await dbDelete('token');
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

	onBeforeMount(() => {
		dbGet('user').then(user => {
		
			userInfo.value = user;
			getInfo();
		})
	})

	onLoad(() => {
		dbGet('user').then(user => {
		
			userInfo.value = user;
			getInfo();
		})
	})
	onShow(() => {
		dbGet('user').then(user => {
		
			userInfo.value = user;
			getInfo();
		})
	})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
	.content-page {
		background-color: #17181B;
		padding: 0 0.6250rem;
		min-height: 100%;
	}

	.head-top {
		padding-top: 0.6250rem;
		padding-top: calc(0.6250rem + constant(safe-area-inset-top));
		padding-top: calc(0.6250rem + env(safe-area-inset-top));
	}

	.content {
		/* #ifdef APP */
		padding:1.2500rem 0.6250rem 0.6250rem 0.6250rem;
		/* #endif */
	}

	.user-top-view {
		position: relative;
		margin-left: 0.7813rem;
		margin-right: 0.7813rem;
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
		border-bottom: 1px solid #2d3034;

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
			width: calc(50% - 0.6250rem);
			text-align: center;
			height: 2.6063rem;
			line-height: 2.6063rem;
			background-color: #1E2024;
			border-radius: 0.1087rem;
		}

		img {
			margin-top: 0.6250rem;
			width: 1.3750rem;
			height: 1.3750rem;
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