<template>
	<page
	class="page"
	:head-box="isPc ? ['content','right'] : undefined"
	:disable-scrollbar="isPc"
	:mouse-wheel="true"
	>

		<div class="body page-pading">
			<img src="@/assets/new/coffer/bg.png" class="bg-img" />

			<div class="content-box">

					<div>
						<div class="title">{{$t('pageCofferPass.oldPass')}}:</div>
							<div class="input">
								<input type="password" v-model="pass[0]" maxlength="12" :placeholder="$t('pageRegister.er4')">
							</div>
							
							<div class="title">{{$t('pageCofferPassUp.newPass')}}:</div>
							<div class="input">
								<input type="password" v-model="pass[1]" maxlength="12" :placeholder="$t('pageCofferPassUp.placeholderPass')">
							</div>
							
							<div class="title">{{$t('pageCofferPass.ComPass')}}:</div>
							<div class="input">
									<input type="password" v-model="pass[2]" maxlength="12" :placeholder="$t('pageCofferPassUp.placeholderComPass')">
							</div>


							
							<div class="tab-btns">
								<text class="tips">{{ $t("pageCofferPass.tipsPass") }}</text>
							</div>
					</div>

				
				<border-gradient @click="onSubmitPass" :border="1" :border-color="['#F155FE','#2AACC9']" class="submint-btn" :show-border="false" bg-color="#009d81">
					<public-loading v-show="isSubmit"></public-loading>
					<text v-show="!isSubmit">{{ $t("pageCofferPass.submintButton") }}</text>
				</border-gradient>

			</div>
		</div>




<!-- 
		<div class="content">
			<view class="low-view">
			<view class="l-d">
				<img class="l-d" src="@/assets/coffer/t.png" mode="" />
				<view class="name">{{$t("pageCofferPass.name")}}</view>
			</view>
			<img class="b-d" src="@/assets/coffer/d.png" mode="" />

			<view class="decollate"></view>

			<view class="deposit-view-input">
				<text class="deposit-title">{{$t('pageRegister.loginPassword')}}:</text>
				<view class="deposit-num">
					<input type="password" v-model="pass[0]" maxlength="12" placeholder-class="placeholder"
						:placeholder="$t('pageRegister.er4')">
				</view>
			</view>

			<view class="deposit-view-input">
				<text class="deposit-title">{{$t('pageCofferPassUp.newPass')}}:</text>
				<view class="deposit-num">
					<input type="password" v-model="pass[1]" maxlength="12" placeholder-class="placeholder"
						:placeholder="$t('pageCofferPassUp.placeholderPass')">
				</view>
			</view>

			<view class="deposit-view-input">
				<text class="deposit-title">{{$t('pageCofferPass.ComPass')}}:</text>
				<view class="deposit-num">
					<input type="password" v-model="pass[2]" maxlength="12" placeholder-class="placeholder"
						:placeholder="$t('pageCofferPassUp.placeholderComPass')">
				</view>
			</view>

			<text class="explain text-left">{{$t("pageCofferPass.tipsPass")}}</text>

			<view class="btn" @click="onSubmitPass">
				<public-loading v-show="isSubmit"></public-loading>
				<text v-show="!isSubmit">{{$t("pageCofferPass.submintButton")}}</text>
			</view>
		</view>
		</div>
	 -->
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import PublicLoading from '../components/public-loading.vue'
import BorderGradient from '../components/border-gradient.vue'
	import { ref } from "vue"
	import { back, onLoad, onShow } from '../router/routes'
	import { t } from '../uilts/i18n'
import { hint } from '../uilts/ui';
import { dbGet } from '../uilts/db';
import { isPc } from '../uilts/async.var'
	const pass = ref<Array<string>>([])

	const setPass = ref(1)

	let moneyData = ref<any>({})
	const isSubmit = ref(false)

	// 修改保险箱密码
	const onSubmitPass = () => {
		if (isSubmit.value) return;
		if (!pass.value[0]) {
			hint(t('pageCofferPass.loginPass'))
			return
		}
		if (pass.value[0].length < 6) return hint(t('pageRegister.er2'))
		if (!pass.value[1]) return hint(t('pageCofferPass.newPassMsg'))

		if (pass.value[1].length < 6) {
			hint(t('pageCofferPass.passNoLenght'))
			return
		}

		if (!pass.value[2]) {
			hint(t('pageCofferPass.placeholderComPass'))
			return
		}

		if (pass.value[1] != pass.value[2]) {
			hint(t('pageCofferPass.passNoEq'))
			return
		}

		isSubmit.value = true

		'/api/user/editBoxAccessPassword'.POST<EditBoxAccessPassword>({
			oldPassword: pass.value[0],
			newPassword: pass.value[1]
		}, {
			Authorization: async () => await dbGet('token')
		}).then(_ret => {
			hint(t('pageCofferPassUp.successfully'))
			setTimeout(() => {
				back(1)
			}, 500)
		}).finally(() => {
			isSubmit.value = false;
		})

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

	onLoad((e) => {
		verifySetPass()
		moneyData.value = e
	})

	onShow((e) => {
		pass.value = []
		verifySetPass()
		moneyData.value = e
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
	color: #FFF;
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
		margin-bottom:24px;
		box-sizing: border-box;
		input{
			font-size: 16px;
			line-height:normal;
		}
	}
}
.tips{
	font-size: 0.75rem;
	color:#fff;
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



// .body{
// 	padding:0 0.75rem;
// }
// .bg-img{
// 	display: block;
// 	margin:1.25rem auto;
// 	width: 17.875rem;
// 	height: 11.59375rem;
// }


// .title{
// 	font-size:0.75rem;
// 	color:#5B6DA1;
// }

// .input {
// 	background-color: #231D4E;
// 	font-size:0.875rem;
// 	color: #FFF;
// 	word-break: break-all;
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// 	padding: 0.6250rem;
// 	margin: 0.6250rem 0;
// 	border-radius: 0.5rem;

// 	input {
// 		width: 15.6250rem;
// 		cursor: text;
// 		user-select: text;
// 		font-size: 0.875rem;
// 		height:1.2rem;
// 		color:#B5EBFF;
// 		&::-webkit-input-placeholder{
// 			color:#5B6DA1;
// 		}
// 	}

// 	textarea.address {
// 		width: 100%;
// 		height: 3.1250rem;
// 	}
// }
// .tips{
// 	font-size: 0.75rem;
// 	color:#5B6DA1;
// 	&::before{
// 		content: "* ";
// 		color: #FF007A;
// 	}
// }

// .submint-btn{
// 	height: 2.5rem;
// 	font-size: 0.875rem;
// 	font-weight: 900;
// 	color:#FFF;
// 	border-radius: 0.5rem;
// 	margin-top:1.8rem;
// }























// @import '../scss/public.scss';
// 	.content {
// 		padding: 0.6250rem 0.9375rem;
// 	}
	
// 	.btn {
// 		@include button(#2AE035);
// 		width: calc(100% - 1.2500rem);
// 		margin: 1.5625rem auto 0;
// 		height: 2.3750rem;
// 		// margin-top: 0.6250rem;
// 	}

// 	.vip-menu {
// 		margin-top: 1.0938rem;

// 		display: flex;
// 		justify-content: space-around;
// 		font-size: 0.7813rem;
// 		color: #9BA6B3;
// 		font-weight: bold;
// 		text-align: center;

// 		&>view {
// 			width: 50%;
// 			height: 1.9063rem;
// 			line-height: 1.9063rem;
// 			border-bottom: 0.0938rem solid #828282;
// 		}

// 		.vip-menu-sign {
// 			opacity: 1;
// 			background: linear-gradient(0deg, rgba(42, 224, 53, 0.3) 0%, rgba(42, 224, 53, 0) 100%);
// 			color: #FFFFFF;
// 			border-bottom: 0.0938rem solid #2AE035;
// 		}
// 	}

// 	.low-view {
// 		padding: 0.1563rem;
// 		padding-bottom: 3.8125rem;
// 		// background-image: url('@/assets/coffer/d.png');
// 		min-height: 12.5000rem;
// 		position: relative;
// 		background-color: #1C1E22;

// 		// background-size: 100%;
// 		// background-repeat: no-repeat;
// 		.l-d {
// 			position: absolute;
// 			width: 5.0000rem;
// 			height: 5.0000rem;
// 			left: -0.1563rem;
// 			top: -0.1563rem;
// 		}

// 		.name {
// 			color: #FFF;
// 			position: absolute;
// 			width: 5.0000rem;
// 			text-align: center;
// 			left: -0.8750rem;
// 			top: 1.0000rem;
// 			font-weight: 700;
// 			font-size: 0.9375rem;
// 			transform: rotateZ(-45deg);
// 		}

// 		.b-d {
// 			width: 16.1459rem;
// 			height: 10.4375rem;
// 			display: block;
// 			margin: 0.9375rem auto;
// 		}

// 		.registos {
// 			color: #2AE035;
// 			font-size: 0.7813rem;
// 			position: absolute;
// 			right: 0.7813rem;
// 			top: 0.7813rem;
// 		}

// 		.registos:before {
// 			content: "";
// 			position: absolute;
// 			bottom: -0.1875rem;
// 			left: 0.0000rem;
// 			width: 100%;
// 			height: 0.0625rem;
// 			background-color: #2AE035;
// 		}

// 		.deposit-view {
// 			margin: 0.7813rem;

// 			.deposit-title {
// 				font-size: 0.7813rem;
// 				color: #9BA6B3;
// 			}

// 			.deposit-num {
// 				font-size: 1.5625rem;
// 				font-weight: 700;
// 				color: #F5C155;
// 				height: 2.6875rem;
// 				line-height: 2.6875rem;
// 				text-align: center;
// 				background-color: #25272B;
// 				margin-top: 0.4688rem;
// 			}
// 		}

// 		.deposit-view-input {
// 			margin: 0.7813rem;

// 			.deposit-title {
// 				font-size: 0.7813rem;
// 				color: #9BA6B3;
// 			}

// 			.deposit-num {
// 				font-size: 1.5625rem;
// 				font-weight: 700;
// 				color: #F5C155;
// 				height: 2.6875rem;
// 				line-height: 2.6875rem;
// 				// text-align: center;
// 				background-color: #25272B;
// 				margin-top: 0.4688rem;

// 				.placeholder {
// 					font-size: 0.7813rem;
// 					color: #FFFFFF;
// 				}

// 				input {
// 					font-size: 0.7813rem;
// 					color: #FFFFFF !important;
// 					height: 100%;
// 					width: 100%;
// 					text-indent: 0.6250rem;
// 				}
// 			}
// 		}

// 		.decollate {
// 			margin-top: 1.5625rem;
// 			margin-bottom: 1.5625rem;
// 			height: 0.0625rem;
// 			margin-left: 0.7813rem;
// 			margin-right: 0.7813rem;
// 			// width: 100%;
// 			background-color: #24262A;
// 		}

// 		.explain {
// 			display: block;
// 			margin-left: 0.7813rem;
// 			margin-right: 0.7813rem;
// 			color: #9BA6B3;
// 			font-size: 0.7813rem;
// 			text-align: center;
// 		}

// 		.text-left {
// 			text-align: left;
// 		}

// 		.bootom-y {
// 			margin-left: 0.7813rem;
// 			margin-right: 0.7813rem;
// 			height: 2.3438rem;
// 			background-color: #2AE035;
// 			color: #000000;
// 			font-size: 0.7813rem;
// 			line-height: 2.3438rem;
// 			border-radius: 0.1250rem;
// 			margin-top: 2.4063rem;
// 			font-weight: bold;
// 		}
// 	}
</style>