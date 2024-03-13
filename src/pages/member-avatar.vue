<template>
	<page :head-box="isPc ? ['content', 'right'] : undefined">
		<div class="page-k page-pading">
			<view class="input-team">
				<view class="input-name">
					{{ $t('pageChangePassword.ahead') }}
				</view>
			</view>
			<div class="pc-card">
				<div class="top-card" @click="upload">
					<border-gradient class="head-img-btn" :border-color="['#FF92FF', '#00FFFF']" :border="2">
						<!-- <input type="file" id="file" class="hide" @click.stop accept="image/*" @change="onUpload"> -->
						<public-image style="border-radius: 50%;" :src="headUrl"></public-image>
						<div class="pc vip-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
								<path
									d="M13.3683 5.90471L11.5299 2.32644C11.4874 2.24372 11.4229 2.17432 11.3435 2.12586C11.2642 2.0774 11.173 2.05176 11.0799 2.05176H3.94739C3.85481 2.05176 3.76402 2.07716 3.68488 2.1252C3.60575 2.17324 3.54132 2.24207 3.49861 2.3242L1.63911 5.89933C1.59037 5.99303 1.57219 6.09964 1.5871 6.2042C1.60202 6.30876 1.64929 6.40603 1.72229 6.48236L7.1318 12.1393C7.17899 12.1887 7.23567 12.228 7.29845 12.2548C7.36122 12.2817 7.42878 12.2955 7.49706 12.2956H7.4974C7.56562 12.2956 7.63313 12.2818 7.69588 12.255C7.75863 12.2283 7.81532 12.1891 7.86253 12.1398L13.2835 6.48597C13.3564 6.40997 13.4037 6.31311 13.4189 6.20891C13.4341 6.10472 13.4164 5.99837 13.3683 5.90471ZM10.4915 6.47417L7.86549 9.21298C7.81827 9.26222 7.76159 9.3014 7.69884 9.32817C7.63609 9.35494 7.56857 9.36874 7.50035 9.36874H7.50001C7.43173 9.36869 7.36417 9.35483 7.3014 9.32797C7.23862 9.30112 7.18194 9.26183 7.13475 9.21249L4.51433 6.47218C4.32124 6.27026 4.32841 5.95005 4.53033 5.75696C4.73225 5.56386 5.05246 5.57104 5.24554 5.77296L7.50086 8.13145L9.76123 5.77398C9.95458 5.57232 10.2748 5.56559 10.4765 5.75894C10.6781 5.95229 10.6848 6.27251 10.4915 6.47417Z"
									fill="white" />
							</svg>
							VIP {{ user.level }}
						</div>
					</border-gradient>
				</div>

				<div class="head-card" :data-empty="$t('ui.empty')">
					<border-gradient class="min-head" :border="1" :padding="isPc ? '7px' : '0.16rem'"
						:bg-color="isPc ? '#16122F' : undefined" v-for="v in headList" :showBorder="headUrl == v.url">
						<public-image style="border-radius: 50%;" @click="clickHead(v)" :src="v.url"></public-image>
					</border-gradient>
				</div>
			</div>

			<div class="input-name">
				{{ $t('pageMemberAvatar.username') }}
			</div>
			<div class="input-view">
				<input type="text" v-model="name" maxlength="8" class="textarea">
				<svg xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
					<path
						d="M24.2415 15.1994L9.93993 30H5V24.9343L19.2998 10.1338M24.2415 15.1994L19.2998 10.1338M24.2415 15.1994L28.0102 11.333C28.5319 10.7998 28.5319 9.99896 28.0102 9.46766L25.0224 6.39923C24.5005 5.86692 23.7218 5.86692 23.1998 6.39923L19.2998 10.1338M16 28L14.1009 30H31V28H16Z"
						stroke="#5B6DA1" stroke-width="2" />
				</svg>
			</div>

			<view class="bootom-y btn" @click="onSubmit">
				<text v-show="!isSubmit">{{ $t('pageMemberAvatar.yes') }}</text>
				<public-loading v-show="isSubmit"></public-loading>
			</view>
		</div>

	</page>
</template>

<script setup lang="ts">
import PublicImage from '../components/public-image.vue'
import BorderGradient from '../components/border-gradient.vue'
// import ScrollView from "../components/scroll-view.vue";
import Page from '../components/page.vue'
import PublicLoading from '../components/public-loading.vue'
// import UserHead from "../components/user-head.vue"
import { ref } from 'vue';
import { back, onLoad } from '../router/routes';
import { dbGet, dbSet } from '../uilts/db';
import { t } from '../uilts/i18n';
import { hint } from '../uilts/ui';
import userHead from '@/assets/new/user/user.png'
import { isPc } from '../uilts/async.var';
const headUrl = ref<string>(userHead)
const name = ref<string>("")
const isSubmit = ref<boolean>(false)
const headList = ref<Array<any>>([])
const headIndex = ref(0)
const user = ref<UserModel>({})

const clickHead = (v: any) => {
	headUrl.value = v.url;
	headIndex.value = v.index;
}

const onSubmit = () => {
	if (isSubmit.value) return;

	isSubmit.value = true
	'/api/user/updateUserInfo'.POST<UpdateUserInfo>({
		portrait_index: headIndex.value,
		user_nick: name.value
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		hint(t('pageMemberAvatar.setSuccessful'))
		getInfo()
	}).finally(() => {
		isSubmit.value = false;
	})
}
//获取默认头像
const getDefaultAvatar = () => {
	'/api/user/getDefaultAvatar'.GET<GetDefaultAvatar>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		ret.forEach(v => {
			headList.value.push(v)
		})
	})
}

//获取用户信息
const getInfo = () => {
	'/api/user/getInfo'.GET<GetInfo>(null, {
		Authorization: async () => await dbGet('token')
	}).then(async ret => {
		await dbSet("user", ret);
		await back()
	})
}
const uploadInput = ref()
// getInfo()
const upload = () => {

	uploadInput.value = document.getElementById("file")
	uploadInput.value.click()
}

const onUpload = (e: any) => {
	if (e.target.files && e.target.files[0]) {
		'/admin/upload/image'.POST<UploadOSS>({
			type: 'image/*'
		}, {
			Authorization: async () => await dbGet('token')
		}).then(ret => {
			ret.action.UP(e.target.files[0], ret.args).then(_res => {
				headUrl.value = ret.url as string;
				headList.value.push(ret.url)
			}).catch(() => {
			})
		})
	}
}


onLoad(() => {
	dbGet('user').then((ret) => {
		user.value = ret
		headUrl.value = ret.portrait || headUrl.value
		name.value = ret.user_nick || "";
	})
	getDefaultAvatar()
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
@import "../scss/common.scss";

@include pc {
	.pc-card {
		display: flex;
		gap: 44px;
		margin-top: 25px;
		margin-bottom: 48px;
	}
}

.head-img-btn {
	width: 6.875rem;
	height: 6.875rem;
	border-radius: 6.875rem;
	position: relative;

	img {
		width: 100%;
		height: 100%;
	}

	@include pc {
		.vip-btn {
			position: absolute;
			display: flex;
			align-items: center;
			border-radius: 14px;
			background: #FF8A00;
			height: 24px;
			padding: 0 10px;
			font-size: 14px;
			color: #FFF;
			bottom: -11px;
		}

		svg {
			width: 14px;
			height: 14px;
		}
	}
}

.head-card {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	grid-column-gap: 0.88rem;
	grid-row-gap: 0.88rem;
	margin-top: 1.87rem;
	justify-items: center;
	margin-bottom: 1.88rem;

	.min-head {
		width: 3.285rem;
		height: 3.285rem;
		border-radius: 3.125rem;
		cursor: pointer;
	}

	// display: flex;
	img {
		width: 100%;
		height: 100%;
	}

	@include pc {
		margin: 0;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-column-gap: 26px;
		grid-row-gap: 0;

		.min-head {
			width: 90px;
			height: 90px;
			border-radius: 90px;
		}
	}
}

.page-k {

	// padding: 1.2500rem 0.6250rem;
	@include pc {
		// padding:0 36px 36px;
	}
}


.input-name {
	font-size: 0.75rem;
	color: $inputTipColor;

	@include pc {
		font-size: 18px;
	}
}

.top-card {
	display: flex;
	justify-content: center;
	margin-top: -1rem;

	@include pc {
		margin: 0;
	}
}

.input-view {
	padding: 0 0.625rem;
	border-radius: 0.5rem;
	height: 2.656rem;
	background: $inputBackgroundColor;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 0.38rem;
	margin-bottom: 1.88rem;

	input {
		color: $inputColor;
		font-size: 0.875rem;
	}

	svg {
		fill: white;
		width: 1.125rem;
		height: 1.125rem;
	}

	@include pc {
		margin-top: 24px;
		height: 60px;
		padding: 0 20px;
		margin-bottom: 72px;

		svg {
			width: 24px;
			height: 24px;
		}

		input {
			font-size: 18px;
		}
	}
}

.bootom-y {
	@include flexButton();
	height: 2.5rem;
	font-size: 0.875rem;

	@include pc {
		height: 60px;
		border-radius: 8px;
		font-size: 18px;
	}
}
</style>