<template>
	<page :mouse-wheel="true" :show-scrollbar="true">
		<div class="content page-pading">
			<div>

				<div class="title2">
					<template v-if="fromData.type === 'CPF'">{{ $t('pageAddBankCard.t1_1') }}</template>
					<template v-if="fromData.type === 'CNPJ'">{{ $t('pageAddBankCard.t1_2') }}</template>
					<template v-if="fromData.type === 'PHONE'">{{ $t('pageAddBankCard.t1_3') }}</template>
					<template v-if="fromData.type === 'EVP'">{{ $t('pageAddBankCard.t1_4') }}</template>
					<template v-if="fromData.type === 'EMAIL'">{{ $t('pageAddBankCard.t1_5') }}</template>
				</div>
				<div class="pcres">
					<div class="currency-type">
						<border-gradient class="btn" v-for="item, index in networkTypes.map(e => e.type)" :border="1"
							:border-color="['#009d81', '#009d81']" :bg-color="index === networkTypesIndex
								? '#494949'
								: undefined
								" :class="{ active: index === networkTypesIndex }"
							@click="networkTypesIndex = index; fromData.type = item; selectStatus = false; fromData.bank_account = ''">
							<div class="name">{{ item }}</div>
						</border-gradient>
					</div>
				</div>

				<div>
					<div class="title2">{{ $t('pageAddBankCard.t2') }} <span>*</span> </div>
					<div class="code">
						<input class="address" v-model="fromData.real_name" type="text"
							:placeholder="$t('pageAddBankCard.t3')" />
					</div>
				</div>
				<div>
					<div class="title2">
						<template v-if="fromData.type === 'CPF'">{{ $t('pageAddBankCard.t10_1') }}</template>
						<template v-if="fromData.type === 'CNPJ'">{{ $t('pageAddBankCard.t10_2') }}</template>
						<template v-if="fromData.type === 'PHONE'">{{ $t('pageAddBankCard.t10_3') }}</template>
						<template v-if="fromData.type === 'EVP'">{{ $t('pageAddBankCard.t10_4') }}</template>
						<template v-if="fromData.type === 'EMAIL'">{{ $t('pageAddBankCard.t10_5') }}</template>
						<span> *</span>
					</div>
					<div class="code-card">
						<div class="code" v-if="fromData.type === 'PHONE'">
							<text class="area-code-btn" @click="getQh()">{{ areaCode }}</text>

						</div>
						<div class="code" :class="{ 'on-phone': fromData.type !== 'PHONE' }">

							<input class="address" type="string" @input="inputHandler" v-model="fromData.bank_account"
								:placeholder="tips" />
						</div>
					</div>

				</div>
				<div class="btn-submint" :class="{
					disabled: !fromData.real_name || !fromData.bank_account
				}
					" @click="submint()">{{ $t('pageAddBankCard.t12') }}</div>

			</div>
		</div>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import PublicSvg from '../components/public-svg.vue';
import UiModal2 from '../components/ui-modal2.vue';
import BorderGradient from "../components/border-gradient.vue";
import { h, reactive, ref, watch } from 'vue';
import { dbGet } from '../uilts/db';
import { alert, showActionSheet } from '../uilts/ui';
import { onLoad, back } from '../router/routes';
import success from '@/assets/new/withdraw-money/success.png';
import { t } from '../uilts/i18n';

const networkTypes = ref<Array<WithdrawalConfigItme>>([]);

const networkTypesIndex = ref<number>(0);

const selectStatus = ref(false);
const selectNetwork = () => {
	selectStatus.value = !selectStatus.value;
	// let arr = networkTypes.value.map(e => e.type);
	// showActionSheet(arr).then((e) => {
	// 	networkTypesIndex.value = e.tapIndex;
	// 	fromData.type = arr[e.tapIndex]
	// })
}


const fromData = reactive<Bank>({
	id: undefined,
	type: '',
	real_name: '',
	bank_name: '',
	bank_code: '',
	bank_account: '',
	bank_info: '',
	is_default: 0,
	status: 1
})


const tips = ref('')

watch(fromData, (_n, _o) => {
	if (fromData.type === 'CPF') tips.value = t('pageAddBankCard.t14_1');
	if (fromData.type === 'CNPJ') tips.value = t('pageAddBankCard.t14_2');
	if (fromData.type === 'PHONE') tips.value = t('pageAddBankCard.t14_3');
	if (fromData.type === 'EVP') tips.value = t('pageAddBankCard.t14_4') + 'joao@pagamento';
	if (fromData.type === 'EMAIL') tips.value = t('pageAddBankCard.t14_5') + '[name]@[dominio].com';
})
const areaCode = ref<string>('+55')
const array: string[] = []
const getQh = () => {
	showActionSheet(array).then(ret => {
		areaCode.value = array[ret.tapIndex]
	})
}
const getAreaCode = () => {
	'/api/public/getCountryList'.GET<GetCountryList>().then(ret => {
		ret.forEach(v => {
			array.push(v.countryCode)
		})
	})
}

const insertCharacterInMiddle = (originalString, characterToInsert, position) => {
	const firstPart = originalString.substring(0, position)
	const secondPart = originalString.substring(position)
	return firstPart + characterToInsert + secondPart
}
const formatBankAccount = (str: string, type: string) => {
	console.log(type);

	if (type === 'CPF') {
		if (str[3] !== undefined && str[3] !== '.') {
			str = insertCharacterInMiddle(str, '.', 3)
		}

		if (str[7] !== undefined && str[7] !== '.') {
			str = insertCharacterInMiddle(str, '.', 7)
		}

		if (str[11] !== undefined && str[11] !== '-') {
			str = insertCharacterInMiddle(str, '-', 11)
		}
	 	// 原始字符串
		if (!/\d$/.test(str)) { // 利用正则表达式判断最后一位是否为数字
			str = str.slice(0, -1); // 若不是数字，则将其切片删除最后一位
		}
	}

	if (type === 'CNPJ') {
		if (str[2] !== undefined && str[2] !== '.') {
			str = insertCharacterInMiddle(str, '.', 2)
		}

		if (str[6] !== undefined && str[6] !== '.') {
			str = insertCharacterInMiddle(str, '.', 6)
		}

		if (str[10] !== undefined && str[10] !== '/') {
			str = insertCharacterInMiddle(str, '/', 10)
		}
		if (str[15] !== undefined && str[15] !== '-') {
			str = insertCharacterInMiddle(str, '-', 15)
		}
		if (!/\d$/.test(str)) { // 利用正则表达式判断最后一位是否为数字
			str = str.slice(0, -1); // 若不是数字，则将其切片删除最后一位
		}
	}

	if (type === 'PHONE') {
		if (str[2] !== undefined && str[2] !== ' ') {
			str = insertCharacterInMiddle(str, ' ', 2)
		}

		if (str[8] !== undefined && str[8] !== ' ') {
			str = insertCharacterInMiddle(str, ' ', 8)
		}
		if (!/\d$/.test(str)) { // 利用正则表达式判断最后一位是否为数字
			str = str.slice(0, -1); // 若不是数字，则将其切片删除最后一位
		}
	}

	return str
}

const inputHandler = (e: any) => {
	let v = e.target.value
	const lastLetter = v.at(-1)
	if (fromData.type === 'CPF') {
		if (lastLetter === undefined) {
			fromData.bank_account = ''
			e.target.value = ''
			return
		}

		if (lastLetter === '-' || lastLetter === '.') {
			const newV = v.substring(0, v.length - 1)
			e.target.value = newV
			fromData.bank_account = newV
			return
		}
		// if (!/\d/.test(lastLetter)) {

		//   e.target.value = fromData.bank_account
		//   return
		// }

		v = formatBankAccount(v, fromData.type)

		if (v.length > 14) {
			v = v.substring(0, 14)
			e.target.value = v
		}
	}
	if (fromData.type === 'CNPJ') {
		if (lastLetter === undefined) {
			fromData.bank_account = ''
			e.target.value = ''
			return
		}

		if (lastLetter === '-' || lastLetter === '.' || lastLetter === '/') {
			const newV = v.substring(0, v.length - 1)
			e.target.value = newV
			fromData.bank_account = newV
			return
		}

		// if (!/\d/.test(lastLetter)) {
		//   e.target.value = fromData.bank_account
		//   return
		// }

		v = formatBankAccount(v, fromData.type)

		if (v.length > 18) {
			v = v.substring(0, 18)
			e.target.value = v
		}
	}
	if (fromData.type === 'PHONE') {
		if (lastLetter === undefined) {
			fromData.bank_account = ''
			e.target.value = ''
			return
		}

		if (lastLetter === ' ') {
			const newV = v.substring(0, v.length - 1)
			e.target.value = newV
			fromData.bank_account = newV
			return
		}

		// if (!/\d/.test(lastLetter)) {
		//   e.target.value = fromData.bank_account
		//   return
		// }

		v = formatBankAccount(v, fromData.type)

		if (v.length > 13) {
			v = v.substring(0, 13)
			e.target.value = v
		}
	}
	fromData.bank_account = v
	// console.log(fromData.bank_account);

}


let qq: Promise<any>;
const getConfig = () => {
	qq && qq.abort();
	qq = "/api/withdrawal/config".GET<WithdrawalConfig>({
		// currency_code: currency.value
	}, {
		Authorization: async () => await dbGet('token')
	});
	qq.then(config => {
		networkTypes.value = config;
		console.log(fromData.type);

		if (config.length && !fromData.type) {
			console.log(211);

			fromData.type = config[0].type;
			networkTypesIndex.value = 0;
		} else {
			config.forEach((v: any, i: number) => {
				if (v.type === fromData.type) networkTypesIndex.value = i;
			})
		}
	})
}

const submint = () => {
  let { bank_account } = fromData

  if(fromData.type !=='EMAIL' && fromData.type !=='EVP' ){
     bank_account = fromData.bank_account.replace(/[./-\s]/g, '')
  }

	"/api/user/saveBank".POST<SaveBank>({
		id: fromData.id,
		type: fromData.type,
		real_name: fromData.real_name,
		bank_name: fromData.bank_name,
		bank_code: fromData.bank_code,
		bank_account,
		bank_info: fromData.bank_info,
		is_default: fromData.is_default,
		status: fromData.status,
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ => {
		alert({
			title: () => {
				return [h('img', { src: success, style: 'width:5.0625rem;height: 4.375rem;margin-top:1.8rem;margin-bottom:0.5rem;' })];
			},
			content: t('pageAddBankCard.t13'),
			showCancel: false,
		}, UiModal2).finally(() => {
			back();
		})

		// alert({
		// 	title: () => {
		// 		return [h('img', { src: success, style: 'width:5.0625rem;height: 4.375rem;margin-top:1.8rem;margin-bottom:0.5rem;' })];
		// 	},
		// 	content: t('pageAddBankCard.t13'),
		// 	showCancel: false,
		// }).finally(() => {
		//     back()
		// })
	})
}

onLoad<PageData['/add-bank-card']>((data) => {
	getAreaCode()
	if (data.bank) {
		fromData.id = data.bank.id;
		fromData.type = data.bank.type;
		fromData.real_name = data.bank.real_name;
		fromData.bank_name = data.bank.bank_name;
		fromData.bank_code = data.bank.bank_code;
		fromData.bank_info = data.bank.bank_info;
		fromData.is_default = data.bank.is_default;
		fromData.bank_account = formatBankAccount(data.bank.bank_account, data.bank.type)
	}
	getConfig();

})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.area-code-btn {
	color: #FFFFFF;
}

.code-card {
	display: flex;
	justify-content: space-between;

	.on-phone {
		width: 100%;
	}

	.code:nth-child(2) {
		margin-left: 0rem;
		width: 80%;
	}
}

.currency-type {
	display: grid;
	padding: 0.625rem 0;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 0.62rem;
	grid-row-gap: 0.62rem;
	margin-bottom: 1rem;

	@include pc {
		padding: 0;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-column-gap: 12px;
		grid-row-gap: 12px;
		margin-top: 20px;
		margin-bottom: 36px;
	}
}

.btn {
	width: 6.875rem;
	height: 2.8rem;
	color: #FFFFFF;
	text-align: center;
	font-size: 0.6875rem;
	font-weight: 500;
	border-radius: 0.5rem;

	.name {
		text {
			color: #FFFFFF;
			font-size: 0.875rem;
		}
	}

	&.active,
	&.active text,
	&:active {
		color: #fff;
	}

	@include pc {
		font-size: 18px;
		border-radius: 40px;
		height: 54px;
		width: 138px;
	}
}


.loading {
	padding: 10rem;
}

.btn-submint {
	@extend %button;
	height: 3.125rem;
	margin: 1.8rem 0;
	background: #009d81 !important;

	&.disabled {
		@extend %button-disabled;
	}
}

.money {
	text-align: center;
	font-size: 0.7500rem;
	color: #FFF;
	padding-top: 0.6250rem;
}

.qrCode {
	width: 9.3750rem;
	height: 9.3750rem;
	margin: 0.6250rem auto;
	background-color: #FFF;
	border-radius: 0.1250rem;
}

.code2 {
	font-size: 0.7500rem;
	color: #FFF;
	word-break: break-all;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.71875rem 0;
	margin: 0.375rem 0;
	border-radius: 0.1250rem;
	border-bottom: 2px solid #201E47;

	.uits {
		font-size: 0.75rem;
		color: #B5EBFF;
		padding-right: 0.38rem;
	}

	.address {
		width: 100%;
		cursor: text;
		user-select: text;
		height: 1.2rem;
		color: #B5EBFF;
		font-size: 0.75rem;

		&::-webkit-input-placeholder {
			color: #5B6DA1;
		}
	}
}

.code {
	// background-color: #231D4E;
	background: #494949;
	font-size: 0.875rem;
	color: #FFF;
	word-break: break-all;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.6250rem;
	margin: 0.6250rem 0;
	// border-radius: 0.1250rem;
	border-radius: 0.5rem;

	.address {
		width: 15.6250rem;
		cursor: text;
		user-select: text;
		font-size: 0.75rem;
		height: 1.2rem;
		color: #B5EBFF;

		&::-webkit-input-placeholder {
			// color: #5B6DA1;
			color: #ffffff;
		}
	}

	textarea.address {
		width: 100%;
		height: 3.1250rem;
	}

	.copy-btn {
		background-color: #24262b;
		// width:3.7500rem;
		padding: 0 0.6250rem;
		height: 1.8750rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.1250rem;
	}
}

.notice-tips {
	border-radius: 0.5rem;
	background: rgba(60, 62, 109, 0.16);
	padding: 0 0.625rem;
	display: flex;
	height: 6.15rem;
	flex-direction: column;
	justify-content: space-evenly;

	.tips-text {
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 0.75rem;
		color: var(--TAB-, #5B6DA1);
		font-size: 0.75rem;
		align-items: center;

		text {
			font-size: 0.875rem;
		}
	}
}

.notice {
	color: #5B6DA1;
	font-size: 0.7500rem;
	padding-bottom: 1rem;

	.text {
		display: block;
	}

	.text::before {
		content: "*";
		color: #FF007A;
	}
}

.tips {
	display: flex;
	flex-direction: row-reverse;
	color: rgba(153, 164, 176, .6);
	padding: 0.6250rem;
	color: var(--TAB-, #5B6DA1);
	font-family: PingFang SC;
	font-size: 0.75rem;
	font-style: normal;
	font-weight: 300;
	line-height: normal;

	text {
		color: #8E90CD;
		font-size: 0.75rem;
		font-weight: 600;
	}
}

.select {
	// background-color: #231D4E;
	background: #494949;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 0.6250rem;
	border-radius: 0.5rem;
	padding: 0.71875rem 0.625rem;
	cursor: pointer;
	margin-bottom: 1.3rem;
	position: relative;
}

.currency,
.value {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 0.875rem;
	color: #8E90CD;

	.name {
		font-size: 0.875rem;
		color: #ffffff;
	}

	[class*='icon-']+.name {
		padding-left: 0.6250rem;
	}

	text {
		color: #B5EBFF;
	}
}

.icon {
	width: 0.7500rem;
	height: 0.7500rem;
	fill: #67707B;
	margin-left: 0.6250rem;
}

.btn {
	width: 6.875rem;
	height: 2.8rem;
	color: #67707B;
	text-align: center;
	font-size: 0.6875rem;
	font-weight: 500;

	.name {
		text {
			color: #5B6DA1;
			font-size: 0.875rem;
		}
	}

	&.active,
	&.active text,
	&:active {
		color: #FFF;

	}


}

.title {
	color: #FFFFFF;
	font-family: PingFang SC;
	font-size: 0.875rem;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
}

.title2 {
	font-size: 0.8rem;
	// color: #5B6DA1;
	color: #ffffff;

	span {
		color: #0FF;
	}
}

[class*='icon-'] {
	width: 1.2500rem;
	height: 1.2500rem;
	background-size: cover;
	border-radius: 1.2500rem;
	// background-color: #e98a2c;
	display: flex;
	align-items: center;
	justify-content: center;
	// margin-right: 0.6250rem;
	// margin-left: -0.3125rem;

	&::before {
		content: '$';
		font-size: 0.8750rem;
		color: #FFF;
	}
}

$names: 'BTC', 'BNB', 'CRO', 'LTC', 'SHIB', 'SOL', 'TRX', 'XLM', 'XRP', 'USDT', 'ETH', 'PIX', 'BRL';

@each $c in $names {

	// $i: index($names, $c);
	.icon-#{$c} {
		background-image:url(@/assets/public-page-head/#{$c}.webp);
		background-size: 80%;
		background-position: center;
		background-repeat: no-repeat;

		&::before {
			display: none;
		}
	}
}



.select-option {
	overflow: hidden;
	// height: 13.28125rem;
	position: absolute;
	top: 2.1rem;
	left: 0;
	right: 0;
	background-color: var(--body-background-color);
	z-index: var(--I1);

	@include pc {
		top: 42px;
		background-color: transparent;

		.option-team {
			margin-top: 3px;
		}
	}
}

.option-team {
	margin: auto;
	height: 2.65625rem;
	padding: 0 0.625rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 0.25rem;
	background: #1f1f1f;
	margin-top: 0.1rem;
	color: #5B6DA1;
	font-size: 0.875rem;
	font-weight: 400;
	cursor: pointer;
	color: #ffffff;
	box-sizing: border-box;

	&:active,
	&.active {
		background: #1f1f1f;
	}

	&:hover {
		background: #2E2C5E;
	}

	@include pc {
		min-width: 120px;
		height: 48px;
		padding: 8px 30px;
		font-size: 16px;
		border-radius: 8px;
		border: 1px solid #292547;
		margin: 0;

		&:active,
		&.active,
		&:hover {
			border: 1px solid #2E2C5E;
		}
	}


}

.option-team:active {
	background: #1f1f1f;
}
</style>
