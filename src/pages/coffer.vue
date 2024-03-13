<template>
	<page class="page" :head-box="isPc ? ['content', 'right'] : undefined" :disable-scrollbar="isPc" :content-style="isPc ? {
		overflow: 'visible',
		zIndex: 'calc(var(--I1) + 2)'
	} : ''">
		<div class="body page-pading">
			<img src="@/assets/new/coffer/bg.png" class="bg-img" />
			<div class="content-box">
				<template v-if="!isPc">
					<div class="rebate">
						<div class="icon-value">{{ $t("pageCofferPass.totalAssets") }}：<span>{{ unit }}{{ money.toFixed(2)
						}}</span></div>
					</div>
					<div class="rebate">
						<div class="icon-value">{{ $t("pageCofferPass.storeAssets") }}：<span>{{ unit }}{{
							strongboxAmount.toFixed(2) }}</span>
						</div>
					</div>
					<div style="height: 0.15rem;background: #2A2A2A;margin:1.12rem 0;"></div>
				</template>
				<template v-else>
					<div class="flex title2">
						<div>{{ $t("pageCofferPass.totalAssets") }}</div>
						<div @click="$open('/coffer-record')" class="text-btn">{{ $t("pageCofferPass.accessLog") }}</div>
					</div>
					<div class="input2">
						{{ unit }}{{ money.toFixed(2) }}
					</div>
					<div class="flex title2">
						<div>{{ $t("pageCofferPass.storeAssets") }}</div>
					</div>
					<div class="input2">
						{{ unit }}{{ strongboxAmount.toFixed(2) }}
					</div>
				</template>

				<div class="tab-btns flex">
					<div class="flex">
						<div class="tab-btn" :class="{ active: menu == 1 }" @click="menu = 1">{{ $t("pageCofferPass.tab1")
						}}</div>
						<div class="tab-btn" :class="{ active: menu == 2 }" @click="menu = 2">{{ $t("pageCofferPass.tab2")
						}}</div>
					</div>
					<div v-if="!isPc" @click="$open('/coffer-record')" class="text-btn">{{ $t("pageCofferPass.accessLog") }}
					</div>
				</div>

				<div v-if="menu == 1">
					<div class="title">{{ $t("pageCofferPass.depositAmount") }}</div>
					<div class="input">
						<div class="unit">{{ unit }}</div>
						<input type="number" maxlength="12" v-model="store"
							:placeholder="$t('pageCofferPass.placeholder')" />
					</div>
				</div>

				<div v-else>
					<div class="title">{{ $t("pageCofferPass.withdrawalAmount") }}</div>
					<div class="input">
						<div class="unit">{{ unit }}</div>
						<input type="number" maxlength="12" v-model="distinguish"
							:placeholder="$t('pageCofferPass.withdrawalPlaceholder')" />
					</div>
				</div>
				<div class="flex">
					<text class="tips">{{ $t("pageCofferPass.tips") }}</text>
					<text class="text-btn" @click="$open('/coffer-pass-up')">{{ $t('pageSettingInfo.alterarSuaSenha')
					}}</text>
				</div>

				<border-gradient @click="boxAccess" :border="1" :border-color="['#F155FE', '#2AACC9']" class="submint-btn"
					:show-border="false" bg-color="#009d81">
					<public-loading v-show="isSubmit"></public-loading>
					<text v-show="!isSubmit">{{ $t("pageCofferPass.submintButton") }}</text>
				</border-gradient>
			</div>
		</div>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import PublicLoading from '../components/public-loading.vue'
import BorderGradient from '../components/border-gradient.vue'

import { ref } from "vue"
import { t } from "../uilts/i18n";
import { hint, alert } from "../uilts/ui";
import { onLoad, onShow, onlyOpen } from "../router/routes";
import { dbGet } from "../uilts/db";
import { isPc, restMoney, unit } from '../uilts/async.var';

const strongboxAmount = ref(0)
const money = ref(0)
const store = ref("")//存款金额
const distinguish = ref("")//取款金额

const isSubmit = ref(false)
const menu = ref(1)
//存取款
const boxAccess = () => {
	if (isSubmit.value) return;
	const inputMoney = ref(0)
	inputMoney.value = Number(menu.value == 1 ? store.value : distinguish.value)

	if (inputMoney.value <= 0) return hint(t('pageCofferPassUp.moenyEmpty'))
	if (menu.value == 1 && inputMoney.value - 0 > money.value - 0) {
		hint(t('pageCofferPass.moenyNo'))
		return
	}

	if (!inputMoney.value) {
		if (menu.value == 1) {
			hint(t('pageCofferPass.placeholder'))
		} else {
			hint(t('pageCofferPass.withdrawalPlaceholder'))
		}

		return
	}

	if (menu.value == 2 && strongboxAmount.value - 0 < inputMoney.value - 0) {
		hint(t('pageCofferPass.insufficient'))
		return
	}
	isSubmit.value = true
	'/api/user/boxAccess'.POST<BoxAccess>({
		money: inputMoney.value.toString(),
		type: menu.value
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_re => {
		if (menu.value == 1) {
			hint(t('pageCofferPass.putSuccessfully'))
		} else {
			hint(t('pageCofferPass.putSuccessfully2'))
		}
		restMoney.value = !restMoney.value
		store.value = ''
		getInfo()
	}).finally(() => {
		isSubmit.value = false
	})

}

//获取用户信息
const getInfo = () => {
	'/api/user/getInfo'.GET<GetInfo>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		strongboxAmount.value = Number(ret.strong_box_amount)
		money.value = Number(ret.money)
	})
}

// 验证是否设置密码
const verifySetPass = () => {
	'/api/user/isBoxAccessPassword'.POST<IsBoxAccessPassword>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		if (ret.box_pwd == 0) {
			alert({
				title: t('ui.uniShowModalTitle'),
				content: t('ui.setCofferPass'),
				showCancel: false,
			}).then(() => {
				onlyOpen('/coffer-pass', {})
			})
		} else {
			getInfo()
		}
	})
}


onLoad<{
	m: number
}>((e) => {
	if (e.m == 1 || e.m == 2) menu.value = e.m
	verifySetPass()
	getInfo()
	store.value = ""
	distinguish.value = ""
})
onShow<{
	m: number
}>((e) => {
	menu.value = 1
	if (e.m == 1 || e.m == 2) menu.value = e.m
	verifySetPass()
	getInfo()
	store.value = ""
	distinguish.value = ""
})

</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.page {

	@include pc {
		background-color: #231D4E;

		.title2 {
			font-size: 20px;
			color: #5B6DA1;
		}

		.input2 {
			border-radius: 4px;
			background: #201E47;
			height: 46px;
			display: flex;
			align-items: center;
			font-size: 24px;
			color: #14D03D;
			padding-left: 16px;
			width: 100%;
			box-sizing: border-box;
		}
	}
}


.body {

	// padding:0 0.75rem;
	@include pc {
		// padding:0;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 10px;
		background: #181538;
		// padding:18px 50px 32px 0;
		position: relative;

		.content-box {
			width: 412px;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			position: relative;

			&>div {
				width: 100%;
			}
		}
	}
}

.bg-img {
	display: block;
	margin: 1.25rem auto;
	width: 17.875rem;
	height: 11.59375rem;

	@include pc {
		width: 417px;
		height: 270px;
		margin: 0;
	}
}

.rebate {
	display: flex;
	padding: 0.625rem;
	align-items: center;
	border-radius: 0.5rem;
	background: #2A2A2A;
	// color: #5B6DA1;
	color: #fff;
	font-size: 0.6875rem;
	margin-bottom: 0.62rem;
	justify-content: space-between;
	align-items: center;

	.icon-value {
		display: flex;
		gap: 0.38rem;
		align-items: center;

		span {
			color: #14D03D;
		}
	}

	.icon-value::before {
		content: "";
		display: block;
		width: 1.96875rem;
		height: 1.625rem;
		background: url(@/assets/new/washing/icon-day.png) no-repeat center;
		background-size: 100%;
		margin: 0 0.62rem;
	}

	&~.rebate .icon-value::before {
		background-image: url(@/assets/new/washing/icon-yes.png);
	}

	.receive-btn {
		display: flex;
		width: 4.25rem;
		height: 1.6875rem;
		flex-shrink: 0;
		border-radius: 0.5rem;
		background: linear-gradient(271deg, #29ACC9 0.61%, #F355FF 99.69%);
		justify-content: center;
		align-items: center;
		font-size: 0.875rem;
		color: #FFF;
	}
}

.flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.tab-btns {
	// color: #5B6DA1;
	color: #868686;
	font-size: 0.75rem;
	gap: 0.3125rem;
	margin-bottom: 0.6rem;

	.tab-btns {
		margin: 0;
	}

	.tab-btn {
		flex: 1;
		display: flex;
		min-width: 4.875rem;
		padding: 0.25rem 0.25rem;
		justify-content: center;
		align-items: center;
		border-radius: 0.25rem;
		// border: 1px solid rgba(73, 70, 118, 0.50);
		// background: rgba(32, 30, 71, 0.32);
		background: transparent;
		border: 1px solid #494949;
		margin-right: 0.25rem;

		&.active {
			color: #0FF;
			font-size: 0.75rem;
			// background: #2E2C5E;
			border-color: #009d81;
		}
	}

	@include pc {
		position: absolute;
		top: -18px;
		right: 0;
		transform: translate(0, -100%);

		.tab-btn {
			min-width: 132px;
			height: 34px;
			padding: 0 40px;
			box-sizing: border-box;
			border-radius: 8px 8px 0px 0px;
			border-bottom: none;
			font-size: 16px;

			&.active {
				font-size: 16px;
			}
		}

		.flex {
			gap: 10px;
		}
	}
}

.text-btn {
	font-size: 0.75rem;
	color: #0FF;
	white-space: nowrap;

	@include pc {
		font-size: 16px;
	}
}


.title {
	// color: #5B6DA1;
	color: #fff;
	font-size: 0.75rem;
	padding: 0.62rem 0;

	@include pc {
		font-size: 20px;
		padding-bottom: 10px;
	}
}


.input {
	font-size: 0.7500rem;
	color: #FFF;
	word-break: break-all;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.71875rem 0;
	margin: 0.375rem 0;
	border-radius: 0.1250rem;
	border-bottom: 2px solid #2A2A2A;

	.unit {
		font-size: 0.75rem;
		color: #B5EBFF;
		padding-right: 0.38rem;
		white-space: nowrap;
	}

	input {
		width: 100%;
		cursor: text;
		user-select: text;
		height: 1.2rem;
		color: #B5EBFF;
		font-size: 1rem;

		&::-webkit-input-placeholder {
			// color: #5B6DA1;
			color: #868686;
		}
	}

	@include pc {
		width: 100%;
		height: 46px;
		font-size: 16px;
		margin: 0;
		padding: 0 16px;
		border-radius: 4px;
		background: #201E47;
		box-sizing: border-box;

		input {
			font-size: 16px;
			line-height: normal;
		}
	}
}

.tips {
	font-size: 0.75rem;
	// color:#5B6DA1;
	color: #9da6c0;

	&::before {
		content: "* ";
		color: #FF007A;
	}

	@include pc {
		font-size: 16px;
	}
}

.submint-btn {
	height: 2.5rem;
	font-size: 0.875rem;
	font-weight: 900;
	color: #FFF;
	margin-top: 1.8rem;
	border-radius: 0.5rem;

	@include pc {
		border-radius: 8px;
		font-size: 18px;
		width: 100%;
		height: 48px;
	}
}
</style>
