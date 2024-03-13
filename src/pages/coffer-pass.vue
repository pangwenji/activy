<template>
	<page
	class="page"
	:head-box="isPc ? ['content','right'] : undefined"
	:disable-scrollbar="isPc"

	>
		<div class="body page-pading">
			<img src="@/assets/new/coffer/bg.png" class="bg-img" />
			<div class="content-box">
						<div>
							<div class="title">{{$t('pageCofferPass.pass')}}:</div>
							<div class="input">
								<input type="password" v-model="pass[0]" maxlength="12" :placeholder="$t('pageCofferPass.placeholderPass')" />
							</div>
							
							<div class="title" v-if="setPass == 0">{{$t('pageCofferPassUp.ComPass')}}:</div>
							<div class="input" v-if="setPass == 0">
								<input type="password" v-model="pass[1]" maxlength="12" :placeholder="$t('pageCofferPass.placeholderComPass')" />
							</div>
							

							
							<div class="tab-btns">
								<text class="tips">{{ $t("pageCofferPass.tipsPass") }}</text>
							</div>

						</div>
						
						<border-gradient v-if="setPass == 0" @click="onSubmitPass" :border="1" :border-color="['#F155FE','#2AACC9']" class="submint-btn" bgColor="#009d81" :showBorder="false">
							<public-loading v-show="isSubmit"></public-loading>
							<text v-show="!isSubmit">{{ $t("pageCofferPass.submintButton") }}</text>
						</border-gradient>
						<border-gradient v-else @click="onSubmitVerPass" :border="1" :border-color="['#F155FE','#2AACC9']" class="submint-btn" bgColor="#009d81" :showBorder="false">
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
import { ref, reactive } from "vue"
import { hint } from '../uilts/ui';
import { t } from '../uilts/i18n';
import { dbGet } from '../uilts/db';
import { onLoad, onShow, onlyOpen } from '../router/routes';
import { isPc } from '../uilts/async.var';

const pass = ref<Array<string>>([])

const setPass = ref<number>(1)
const isSubmit = ref<boolean>(false)

let moneyData = reactive({
	type: 0,
	money: "0"
})

// 设置保险箱密码
const onSubmitPass = () => {
	if (isSubmit.value) return
	if (!pass.value[0]) {
		hint(t('pageCofferPass.placeholderPass'))
		return
	}

	if (pass.value[0].length < 6) {
		hint(t('pageCofferPass.passNoLenght'))
		return
	}

	if (!pass.value[1]) {
		hint(t('pageCofferPass.placeholderComPass'))
		return
	}

	if (pass.value[0] != pass.value[1]) {
		hint(t('pageCofferPass.passNoEq'))
		return
	}

	isSubmit.value = true


	'/api/user/setBoxPassword'.POST<SetBoxPassword>({
		password: pass.value[0]
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		pass.value.length = 0
		hint(t('pageCofferPass.successfully'))
		openCoffer()
	}).finally(() => {
		isSubmit.value = false;
	})

}

// 验证保险箱密码
const onSubmitVerPass = () => {
	if (isSubmit.value) return
	if (!pass.value[0]) {
		hint(t('pageCofferPass.placeholderPass'))
		return
	}

	if (pass.value[0].length < 6) {
		hint(t('pageCofferPass.passNoLenght'))
		return
	}
	isSubmit.value = true

	'/api/user/checkBoxPassword'.POST<CheckBoxPassword>({
		password: pass.value[0]
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {

		openCoffer()
	}).finally(() => {
		isSubmit.value = false;
	})

}

const openCoffer = () => {
	onlyOpen('/coffer', { m: moneyData.type })
}

// 验证是否设置密码
const verifySetPass = () => {
	'/api/user/isBoxAccessPassword'.POST<IsBoxAccessPassword>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		if (ret.box_pwd == 0) {
			setPass.value = 0
		}
	})
}

onLoad<PageData['/coffer-pass']>((e) => {
	verifySetPass()
	if (e.money) moneyData.money = e.money
	if (e.type) moneyData.type = e.type
})

onShow<PageData['/coffer-pass']>((e) => {
	setPass.value = 1
	pass.value = []
	verifySetPass()
	// console.log(e);

	if (e.money) moneyData.money = e.money
	if (e.type) moneyData.type = e.type
})
</script>

<style lang="scss" scoped>


@import '../scss/public.scss';

@include pc {
	.page{
		background-color:#231D4E;
	}
}

.body{
	// padding:0 0.75rem;
	@include pc {
		// padding:0;
		height:100%;
		box-sizing:border-box;
		display: flex;
		align-items:center;
		justify-content: space-between;
		border-radius: 10px;
		background:#181538;
		// padding:18px 50px 32px 0;
		.content-box{
			width:412px;
			height:100%;
			display:flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: space-between;
			&>div{
				width:100%;
			}
		}
	}
}
.bg-img{
	display: block;
	margin:1.25rem auto;
	width: 17.875rem;
	height: 11.59375rem;
	@include pc {
		width: 417px;
		height: 270px;
		margin:0;
	}
}


.title{
	font-size:0.75rem;
	// color:#5B6DA1;
	color:#fff;
	@include pc {
		font-size: 20px;
		padding-bottom:10px;
	}
}

.input {
	// background-color: #231D4E;
	background-color: #494949;
	font-size:0.875rem;
	// color: #FFF;
	color: #868686;
	word-break: break-all;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.6250rem;
	margin: 0.6250rem 0;
	border-radius: 0.5rem;
	
	input {
		width: 15.6250rem;
		cursor: text;
		user-select: text;
		font-size: 0.875rem;
		height:1.2rem;
		color:#B5EBFF;
		box-sizing:border-box;
		&::-webkit-input-placeholder{
			// color:#5B6DA1;
			color:#868686;
		}
	}

	textarea.address {
		width: 100%;
		height: 3.1250rem;
	}
	@include pc {
		width: 100%;
		height: 46px;
		font-size: 16px;
		margin:0;
		padding:0 16px;
		border-radius: 4px;
		background: #201E47;
		margin-bottom:40px;
		box-sizing: border-box;
		input{
			font-size: 16px;
			line-height:normal;
		}
	}
}
.tips{
	font-size: 0.75rem;
	// color:#5B6DA1;
	color:#9da6c0;
	&::before{
		content: "* ";
		color: #FF007A;
	}
	@include pc {
		font-size: 16px;
		&::before{
			display:none;
		}
	}
}

.submint-btn{
	height: 2.5rem;
	font-size: 0.875rem;
	font-weight: 900;
	color:#FFF;
	border-radius: 0.5rem;
	margin-top:1.8rem;
	@include pc {
		border-radius: 8px;
		font-size: 18px;
		width: 100%;
		height: 48px;
	}
}



</style>