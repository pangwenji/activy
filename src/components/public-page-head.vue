<template>
	<view class="public-page-head">

		<view class="public-page-head-content">

		

			<view class="icon-bn " v-if="!isPc" style="margin:0">
				<span class="iconfont iconmenu" :class="{'red':soketData.new_user_message > 0}" @click="handleClickMenu"></span>
				<!-- <public-svg class="icon x-btn" icon="icon_Tighten" @click="handleClickMenu"></public-svg> -->
				<img class="logo-icon x-btn" src="@/assets/new/logo.png" @click="tabChange(-1)" alt="">
				<view class="lang-box">
					<view class="icon-btn btn-t" @click="open('/language')">
						<img class="icon-language" :src="languageIcon" v-lazy="languageIcon" @click="open('/language')" alt="">
					</view>
					<i class="iconTo" @click="open('/language')"></i>
				</view>
			</view>

			<view class="icon-bns" v-if="!isPc">
				<view style="display:flex;" v-if="isLogin">

					<div class="user-login">
						<!-- <border-gradient :border="1" class="user-login-top" @click="$open('/member-avatar')">
							<img v-if="!userInfo.portrait" src="@/assets/new/user/user.png" alt="">
							<img v-else :src="userInfo.portrait" alt="">
						</border-gradient> -->
						<div class="user-login-content">
							<!-- <div class="user-name ellipsis">{{ userInfo.user_nick ? userInfo.user_nick : userInfo.username
							}}</div> -->
							<div class="user-integral">
								<span class="iconfont iconpeople"></span>
								<span class="user-balance" @click="$back(-4)">{{ balance }}</span>
								<span class="user-unit" @click="$back(-4)">{{ unit }}</span>
								<!-- <public-svg class="icon-translate" icon="icon_Clear" @click="getUserMoney()"></public-svg> -->
								<!-- <svg class="icon-translate" @click="getUserMoney()" xmlns="http://www.w3.org/2000/svg"
									width="20" height="20" viewBox="0 0 20 20" fill="none">
									<path
										d="M4.76641 15.9218C6.21172 17.1801 8.06745 17.8755 9.98969 17.8792C11.9159 17.8811 13.7773 17.1882 15.2275 15.9294C16.6776 14.6706 17.6178 12.9316 17.8732 11.0359C17.8937 10.883 17.8522 10.7282 17.7578 10.6056C17.6634 10.483 17.5238 10.4027 17.3698 10.3823C17.2158 10.3619 17.0599 10.4031 16.9364 10.4969C16.813 10.5906 16.7321 10.7292 16.7116 10.8821C16.4969 12.4983 15.698 13.9819 14.4635 15.0566C13.229 16.1313 11.6431 16.7239 10.0013 16.7239C8.35948 16.7239 6.77363 16.1313 5.53914 15.0566C4.30465 13.9819 3.50568 12.4983 3.29105 10.8821C3.28088 10.8064 3.25579 10.7334 3.21721 10.6673C3.17862 10.6012 3.1273 10.5433 3.06618 10.4969C3.00506 10.4505 2.93532 10.4165 2.86097 10.3968C2.78661 10.3772 2.70908 10.3722 2.63281 10.3823C2.55653 10.3924 2.48301 10.4173 2.41644 10.4557C2.38176 10.4756 2.34932 10.499 2.3196 10.5254C2.31008 10.5337 2.30081 10.5423 2.29181 10.5512C2.18288 10.6594 2.12169 10.8061 2.12169 10.959V14.0346C2.12169 14.1876 2.18288 14.3343 2.29181 14.4424C2.40073 14.5506 2.54846 14.6113 2.7025 14.6113C2.85654 14.6113 3.00427 14.5506 3.11319 14.4424C3.18912 14.367 3.24185 14.2729 3.26683 14.171C3.67478 14.8192 4.17854 15.41 4.76641 15.9218Z"
										fill="#FFFFFF" />
									<path
										d="M16.9081 9.14193C16.9996 9.19873 17.1059 9.22918 17.2149 9.22898C17.251 9.23276 17.2873 9.23276 17.3233 9.22898C17.3991 9.21516 17.4714 9.18651 17.5359 9.14469C17.6005 9.10287 17.656 9.04871 17.6992 8.98538C17.7425 8.92204 17.7726 8.8508 17.7878 8.77579C17.7997 8.71715 17.8024 8.65713 17.7957 8.59788V5.57667C17.7957 5.42372 17.7345 5.27704 17.6256 5.1689C17.5167 5.06075 17.369 4.99999 17.2149 4.99999C17.0609 4.99999 16.9131 5.06075 16.8042 5.1689C16.6953 5.27704 16.6341 5.42372 16.6341 5.57667V5.69351C16.2032 5.03775 15.673 4.44468 15.0573 3.93714C13.6332 2.76333 11.8405 2.12083 9.98969 2.12083C8.13882 2.12083 6.34621 2.76333 4.9221 3.93714C3.49799 5.11094 2.53203 6.74217 2.19139 8.54849C2.16794 8.69707 2.20388 8.84886 2.29153 8.97151C2.37919 9.09415 2.51163 9.17795 2.66062 9.20503C2.80961 9.2321 2.96335 9.20032 3.08908 9.11646C3.21481 9.0326 3.30257 8.90329 3.33365 8.7561C3.62492 7.2148 4.44962 5.82306 5.66507 4.82163C6.88051 3.8202 8.41026 3.27208 9.98969 3.27208C11.5691 3.27208 13.0989 3.8202 14.3143 4.82163C15.5181 5.81347 16.3386 7.18818 16.6372 8.71186C16.6509 8.84292 16.7095 8.96605 16.8042 9.06007C16.8358 9.09145 16.8707 9.11885 16.9081 9.14193Z"
										fill="#FFFFFF" />
									<path fill-rule="evenodd" clip-rule="evenodd"
										d="M9.98945 18C8.03778 17.9963 6.15362 17.2903 4.68618 16.0127C4.14671 15.543 3.67701 15.0078 3.28583 14.4233C3.26063 14.4606 3.23169 14.4956 3.19924 14.5278C3.0675 14.6587 2.88881 14.7321 2.7025 14.7321C2.51619 14.7321 2.3375 14.6587 2.20576 14.5278C2.07401 14.397 2 14.2196 2 14.0346V10.959C2 10.774 2.07401 10.5966 2.20576 10.4658C2.2165 10.4551 2.22757 10.4448 2.23892 10.4349C2.2747 10.4032 2.31372 10.3751 2.35542 10.3511C2.43582 10.3048 2.52461 10.2748 2.61672 10.2626C2.70884 10.2504 2.80247 10.2563 2.89227 10.28C2.98207 10.3038 3.06628 10.3448 3.1401 10.4009C3.21392 10.4569 3.2759 10.5269 3.32249 10.6067C3.36909 10.6865 3.3994 10.7747 3.41168 10.8662C3.62245 12.4533 4.40707 13.9104 5.61937 14.9658C6.83167 16.0211 8.389 16.603 10.0013 16.603C11.6136 16.603 13.1709 16.0211 14.3832 14.9658C15.5955 13.9104 16.3801 12.4534 16.5909 10.8663C16.6157 10.6816 16.7134 10.5141 16.8625 10.4009C17.0116 10.2877 17.1999 10.2379 17.3859 10.2626C17.5719 10.2872 17.7405 10.3842 17.8545 10.5322C17.9685 10.6802 18.0186 10.8672 17.9938 11.0519C17.7345 12.9766 16.7799 14.7423 15.3075 16.0204C13.8352 17.2985 11.9452 18.002 9.98945 18ZM2.3196 10.5254L2.23892 10.4349C2.23877 10.4351 2.23907 10.4348 2.23892 10.4349C2.23877 10.4351 2.23862 10.4352 2.23846 10.4353L2.3196 10.5254ZM3.29105 10.8821C3.28088 10.8064 3.25579 10.7334 3.21721 10.6673C3.17862 10.6012 3.1273 10.5433 3.06618 10.4969C3.00506 10.4505 2.93532 10.4165 2.86097 10.3968C2.78661 10.3772 2.70908 10.3722 2.63281 10.3823C2.55653 10.3924 2.48301 10.4173 2.41644 10.4557C2.38176 10.4756 2.34932 10.499 2.3196 10.5254C2.31008 10.5337 2.30081 10.5423 2.29181 10.5512C2.18288 10.6594 2.12169 10.8061 2.12169 10.959V14.0346C2.12169 14.1876 2.18288 14.3343 2.29181 14.4424C2.40073 14.5506 2.54846 14.6113 2.7025 14.6113C2.85654 14.6113 3.00427 14.5506 3.11319 14.4424C3.15266 14.4032 3.18586 14.359 3.21216 14.3112M3.26683 14.171C3.29453 14.215 3.32267 14.2588 3.35124 14.3022C3.74357 14.8991 4.21845 15.4448 4.76641 15.9218C6.21172 17.1801 8.06745 17.8755 9.98969 17.8792C11.9159 17.8811 13.7773 17.1882 15.2275 15.9294C16.6776 14.6706 17.6178 12.9316 17.8732 11.0359C17.8937 10.883 17.8522 10.7282 17.7578 10.6056C17.6634 10.483 17.5238 10.4027 17.3698 10.3823C17.2158 10.3619 17.0599 10.4031 16.9364 10.4969C16.813 10.5906 16.7321 10.7292 16.7116 10.8821C16.4969 12.4983 15.698 13.9819 14.4635 15.0566C13.229 16.1313 11.6431 16.7239 10.0013 16.7239C8.35948 16.7239 6.77363 16.1313 5.53914 15.0566C4.30465 13.9819 3.50568 12.4983 3.29105 10.8821M3.33365 8.7561C3.30257 8.90329 3.21481 9.0326 3.08908 9.11646C2.96335 9.20032 2.80961 9.2321 2.66062 9.20503C2.51163 9.17795 2.37919 9.09415 2.29153 8.97151C2.20388 8.84886 2.16794 8.69707 2.19139 8.54849C2.53203 6.74217 3.49799 5.11094 4.9221 3.93714C6.34621 2.76333 8.13882 2.12083 9.98969 2.12083C11.8405 2.12083 13.6332 2.76333 15.0573 3.93714C15.6174 4.39885 16.1067 4.93134 16.515 5.51742C16.5287 5.53711 16.5423 5.55686 16.5558 5.57667C16.5823 5.61539 16.6084 5.65434 16.6341 5.69351V5.57667C16.6341 5.5463 16.6365 5.51617 16.6412 5.48654C16.6603 5.36699 16.7169 5.25557 16.8042 5.1689C16.9131 5.06075 17.0609 4.99999 17.2149 4.99999C17.369 4.99999 17.5167 5.06075 17.6256 5.1689C17.7345 5.27704 17.7957 5.42372 17.7957 5.57667V8.59788C17.8024 8.65713 17.7997 8.71715 17.7878 8.77579C17.7726 8.8508 17.7425 8.92204 17.6992 8.98538C17.656 9.04871 17.6005 9.10287 17.5359 9.14469C17.4714 9.18651 17.3991 9.21516 17.3233 9.22898C17.2873 9.23276 17.251 9.23276 17.2149 9.22898C17.1059 9.22918 16.9996 9.19873 16.9081 9.14193C16.8707 9.11885 16.8358 9.09145 16.8042 9.06007C16.7095 8.96605 16.6509 8.84292 16.6372 8.71186C16.3386 7.18818 15.5181 5.81347 14.3143 4.82163C13.0989 3.8202 11.5691 3.27208 9.98969 3.27208C8.41026 3.27208 6.88051 3.8202 5.66507 4.82163C4.44962 5.82306 3.62492 7.2148 3.33365 8.7561ZM16.5168 8.72996C16.2227 7.23564 15.4175 5.88755 14.2366 4.91461C13.043 3.93118 11.5407 3.39291 9.98969 3.39291C8.43864 3.39291 6.93638 3.93118 5.74278 4.91461C4.54917 5.89804 3.7393 7.26478 3.45325 8.77838L3.45278 8.7809C3.41519 8.95892 3.30901 9.11532 3.15694 9.21676C3.00487 9.31819 2.81891 9.35663 2.63871 9.32388C2.4585 9.29113 2.29831 9.18977 2.19229 9.04143C2.08627 8.89309 2.04281 8.70949 2.07117 8.52979L2.07173 8.52625C2.41759 6.69222 3.39842 5.03598 4.84437 3.84417C6.29032 2.65236 8.11044 2 9.98969 2C11.8689 2 13.6891 2.65236 15.135 3.84417C15.6738 4.28826 16.148 4.79683 16.5488 5.35505C16.583 5.25367 16.6406 5.16048 16.7182 5.08346C16.8499 4.95265 17.0286 4.87916 17.2149 4.87916C17.4012 4.87916 17.5799 4.95265 17.7117 5.08346C17.8434 5.21426 17.9174 5.39168 17.9174 5.57667V8.59149C17.9245 8.66088 17.9211 8.73107 17.9071 8.79968C17.8887 8.8904 17.8523 8.97658 17.8 9.05318C17.7476 9.12979 17.6805 9.19529 17.6025 9.24587C17.5244 9.29646 17.437 9.33111 17.3453 9.34782L17.3407 9.34865L17.3361 9.34913C17.2938 9.35359 17.2511 9.3538 17.2086 9.34979C17.0789 9.34883 16.9527 9.31207 16.8437 9.24446C16.7985 9.21655 16.7564 9.18344 16.7182 9.14551C16.605 9.03313 16.5344 8.88638 16.5168 8.72996Z"
										fill="#FFFFFF" />
								</svg> -->
							</div>
						</div>
					</div>
				</view>
				<template v-if="!isLogin">
					<view class="login-btn sign-in" @click="open('/login')">
						<span>{{ $t('components.public-page-head.signIn') }}</span>
					</view>
					<view class="login-btn register" @click="open('/register')">
						<span>{{ $t('components.public-page-head.signUp') }}</span>
					</view>
					
				</template>

				<view class="iconflex" v-if="isLogin">
					

					<view class="login-btn register" @click="open('/recharge')">
						<span>{{ $t('tabName1') }}</span>
					</view>

					<!-- <public-svg class="icon-notice" icon="icon_Notice"  @click="open('/notice')"></public-svg> -->

					<!-- <view class="icon-btn btn-t" @click="open('/language')">
						<img class="icon-language" :src="languageIcon" v-lazy="languageIcon" @click="open('/language')" alt="">
					</view> -->
					<!-- <i class="iconTo"></i> -->
				</view>
				
			</view>
		</view>
		<view class="public-page-head-placeholder"></view>




		<!-- <pop-up v-for="v in popupNotice" :id="v.id" v-show="v.is_show">
			<template #title>
				<view>{{ v.title }}</view>
			</template>
			<template #content>
				<div class="rich-text" v-html="v.content" @itemclick="openUrl"></div>
			</template>
		</pop-up> -->
	</view>
</template>

<script setup lang="ts">
import PublicSvg from './public-svg.vue';
import My from './my.vue';
import Language from './language.vue';
import BlockBtn from "./block-btn.vue";
import BorderGradient from "./border-gradient.vue";


import { ref, computed, reactive, onUnmounted, watch, onMounted, onServerPrefetch } from 'vue';
import { balance, downloadBtnShow, isPwa, restMoney, unit, languageIcon, isLeft, isLogin, isPc } from '../uilts/async.var';
import { back, open, router, changeWindow } from '../router/routes';
import { addListener, dbGet, removeListener } from '../uilts/db';
import { soketData } from '../uilts/socket';
import { gameInit } from '../uilts/emit';

const isNotice = ref(false)
const isMsg = ref(0)
const getMoneyLoading = ref(false);
// console.log(popupNotice.value);

if (isPwa.value) downloadBtnShow.value = false

const hasHash = (name: string) => router.currentRoute.value.name === name;
const tabChange = (n: number) => back(n);
const tabIndex = computed(() => {
	if (hasHash('/casino') || hasHash('/')) {
		return 1;
	} else if (hasHash('/agent')) {
		return 2;
	}
	return 0;
});

const goGame = () => {
	// console.log(allRouter.value);
	if (router.currentRoute.value.name === '/game') {
		gameInit()
	} else {
		open('/game', {})
	}
}


const userInfo = reactive<UserModel>({
	id: 0,
	recommender_id: 0,
	invite_code: '',
	username: '',
	money: '',
	current_level_bet: '',
	user_group_id: 0,
	bet_money: '',
	site_user_group: [],
	portrait: ''
})


let pro: Promise<any>;
//获取用户余额
const getUserMoney = () => {
	getMoneyLoading.value = true;
	pro && pro.abort();
	pro = '/api/user/getUserMoney'.GET<GetUserMoney>(null, {
		Authorization: async () => await dbGet('token')
	});
	pro.then(ret => {
		balance.value = ret.money;
	}).finally(() => {
		getMoneyLoading.value = false;
	})
}
const userListener = (type: ListenerType, user?: UserModel) => {
	isLogin.value = (type === 'set');
	if (type === 'set') {
		balance.value = Number(user?.money ?? 0).toFixed(2);
		for (let k in user) {
			userInfo[k] = user[k];
		}
	}
}
const languageListener = (type: ListenerType, _lan?: string) => {
	if (type === 'set') {
		getUserMoney()
	}
}

const handleClickMenu = () => {
	isLeft.value = !isLeft.value
	changeWindow('left')
}


addListener('user', userListener)
addListener('language', languageListener)

// watch(restMoney, (_v, _o) => {
// 	getUserMoney()
// })
// watch(soketData, (_o, n) => {
// 	isNotice.value = n.get_system_notice
// 	isMsg.value = n.new_user_message
// })



onServerPrefetch(async () => {
	userListener('set', await dbGet('user'))
})

onUnmounted(() => {
	removeListener('user', userListener)
	removeListener('language', languageListener)
})
onMounted(() => {
	dbGet('user').then(user => {
		userListener('set', user)
	}).catch(() => {

	});
	// getUserMoney()
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.red {
  &::after {
			content: '';
			display: block;
			width: 0.50rem;
			height: 0.50rem;
			position: absolute;
			left: 1rem;
			top: 0.25rem;
      // transform: translateY(-50%);
			background-color: #FF0000;
			border-radius: 100%;
	}
}

.iconmenu{
	font-size: 1.35rem;
	color: #606060;
	cursor: pointer;
	&::before{
		content: "\e655";
	}
}

.iconpeople{
	font-size: 0.675rem;
	color: #FFFFFF;
	padding-right: 0.25rem;
	&::before{
		content: "\e646";
	}
}
.iconflex{
	display: flex;
	align-items: center;
}
.iconTo{
	border: 0.35rem solid #4b3d0e;
    border-color: #4b3d0e transparent transparent transparent;
    border-width: 0.3rem;
    border-radius: 0.1rem;
    border-bottom: 0;
    width: 0;
    height: 0;
    margin-left: .06rem;
}
.icon-lang {
	position: relative;

	.language-card {
		position: absolute;
		overflow: hidden;
		top: 0;
		right: -15px;
		transform: skew(5deg);

		max-height: 0;
		border-radius: 8px;
		background: rgba(35, 29, 78, 1);
		backdrop-filter: blur(2px);
		transition: max-height 0.5s linear;
	}

	&:hover {
		.language-card {
			max-height: 1000px;
		}
	}
}

.head-right-btn {

	.user-login:hover,
	.icon-btn:hover {
		// background: radial-gradient(70.67% 70.18% at 56.72% 138.26%, rgba(255, 251, 251, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(180deg, #2F2C61 0%, #3C3789 100%);

		svg {

			fill: #0FF;
		}

		.menu-name-team-left {
			color: #0ff;
		}

		.icon-click {
			display: block;
		}

		.icon {
			display: none;
		}
	}
}

.head-menu-btn {

	.log-icon {
		width: 64.77px;
		height: 48px;
		margin-left: 40px;
	}
}

.block-btn {
	border-radius: 13px;
	height: 49.737px;
	min-width: 220.017px;
	filter: brightness(0.5);

	img {
		position: absolute;
		left: 14px;
		width: 66px;
		height: 66px;
	}

	span {
		padding-left: 95px;
		padding-right: 30px;
		font-size: 20px;
	}

	&:hover,
	&.selected {
		filter: brightness(1);
	}
}

.user-login {
	display: flex;
	align-items: center;
	margin-right: 5px;

	@include pc {
		border-radius: 8px;
		border: 1px solid #292547;
		background: #231D4E;
		transform: skew(-5deg);
		position: relative;
		width: 217.25px;
		height: 44px;
		justify-content: space-between;

		.xl-btn {
			width: 28px;
			height: 28px;
			margin-right: 10px;
			transform: skew(5deg);
		}


	}

	.user-login-top {
		width: 1.8125rem;
		height: 1.8125rem;
		border-radius: 50%;
		box-shadow: 0px 2px 2px 0px rgba(255, 107, 218, 0.15);
		margin-right: 0.28rem;
		position: relative;
		z-index: var(--I1);

		&:hover {
			// background-color: #1C1E22;
			// border-radius: 0.3125rem;

			&~.meun-view {
				min-height: 617px;
				// padding-top: 20px;

			}
		}

		img {
			// transform: skew(5deg);
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}

		@include pc {
			--bg: linear-gradient(179deg, #2e2c5e 39%, #2e2c5e 100%);
			--border: linear-gradient(180deg, #ffa67d, #ff52ff 100%);
			width: 56px;
			height: 56px;
			position: absolute;
			left: -10px;
			top: -6px;

			border: 1px solid transparent;
			background-image: var(--bg), var(--border);
			background-origin: border-box;
			background-clip: content-box, border-box;
			border-radius: 50%;
			box-shadow: 0px 2px 2px 0px rgba(255, 107, 218, 0.15);
			// transform: skew(-5deg);
			transform: skew(5deg);
		}
	}

	.user-login-content {
		.user-name {
			color: #FFB800;
			font-size: 0.75rem;
			font-weight: 600;
		}

		.user-integral {
			font-size: 0.865rem;
			color: #FFFFFF;
			font-weight: 700;
			display: flex;
			align-items: center;
			padding-right: 0.5rem;
			.user-unit {
				font-size: 0.865rem;
				text-align: center;
			}
		}

		.icon-translate {
			width: 0.625rem;
			height: 0.625rem;
			fill: #5B6DA1;
			margin-left: 0.25rem;
			// transition: transform 1s ease;
		}

		.icon-translate:active {
			animation: rotate 1s linear infinite;
			/*动画效果*/
		}

		@include pc {
			transform: skew(5deg);
			padding-left: 55px;

			.user-name {
				font-size: 16px;
			}

			.user-integral {
				color: #8574D1;
				font-family: Montserrat;
				font-size: 12px;
				font-style: normal;
				font-weight: 500;
				line-height: normal;
				color: #8574D1;

				display: flex;
				align-items: center;

				.user-unit {
					font-size: 12px;
					// display: block;
					width: 0.750rem;
					text-align: center;
				}
			}
		}




	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
		/*从0度开始旋转*/
	}

	to {
		transform: rotate(720deg);
		/*转到360度停止旋转*/
	}
}

.kf {
	width: 3.1250rem;
	height: 3.1250rem;
	position: fixed;
	z-index: calc(var(--I2) + 0);
	right: 0.6250rem;
	bottom: 0.6250rem;
}

.public-page-head,
.public-page-head-content,
.public-page-head-placeholder {
	min-height: calc(var(--headers-height) + var(--status-bar-height));
	min-height: calc(var(--headers-height) + constant(safe-area-inset-top) + var(--status-bar-height));
	min-height: calc(var(--headers-height) + env(safe-area-inset-top) + var(--status-bar-height));
	background-color: #000000;
}

.public-page-head-content,
.public-page-head-placeholder {
	box-sizing: border-box;
	padding: 0 0.6250rem;
	padding-top: calc(constant(safe-area-inset-top) + var(--status-bar-height));
	padding-top: calc(env(safe-area-inset-top) + var(--status-bar-height));
	display: flex;
	position: fixed;
	// top: 0;
	z-index: calc(var(--I1) + 2);
	max-width: var(--content-max-width);
	margin: 0 auto;
	align-items: center;
	justify-content: space-between;
}

.public-page-head-content {
	// left: var(--left-width);
	// right: var(--right-width);
	top: var(--download-height);
	width: 100%;
	max-width: 600px;

	@include pc {
		padding: 0 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	// transition: all 0.5s ease;
}

.public-page-head-placeholder {
	z-index: calc(var(--I1) + 0);
	width: auto;
	left: 0;
	right: 0;
	// max-width: none;
	background-color: var(--body-background-color);
	// box-shadow: 0 0.3125rem 0.9375rem #101010;
}

.icon {
	width: 1.2500rem;
	height: 1.2500rem;
	fill: #606060;
	cursor: pointer;
}

.icon-language {
	@include h5 {
		width: auto;
		height: 1rem;
	}

	@include pc {
		width: 32px;
		height: 32px;
	}

	// border-radius: 50%;
	fill: #5B6DA1;
	cursor: pointer;
	// transform: skew(5deg);
}

.icon-search {
	width: 20px;
	height: 20px;
	transform: skew(5deg);
	fill: #606060;
}

.icon-notice {
	@include h5 {
		width: 0.8rem;
		height: 0.8rem;
	}

	@include pc {
		width: 24px;
		height: 24px;
	}

	fill: #FFFFFF;
	cursor: pointer;
	// transform: skew(5deg);
	margin-left: 0.625rem;
}

.icon-bns {
	display: flex;
	align-items: center;
	margin-left: -10px;
}

.ava {
	width: 2.1875rem;
	height: 2.1875rem;
	border-radius: 100%;
	background-color: #98A7B5;
}

.logo-icon {
	// width: 4.6876rem;
	height: 1.25rem;
	margin-left: 0.5rem;

}

.login-btn {
	@include pc {
		background-image: linear-gradient(180deg, #7368ff, #5f6fff 63%, #7084ff 100%);
		// border: 0.5px solid;
		border-image: linear-gradient(180deg, #b7f2ff, #cae9ff 47%, #bae2ff 100%) 1 1;
		border-radius: 8px;
		box-shadow: 0px 0px 10px 0px #ffffff inset;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: skew(-5deg);
		width: 108px;
		height: 46px;

		span {
			transform: skew(5deg);
			color: #FFF;
			text-align: center;
			font-family: PingFang SC;
			font-size: 14px;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
		}
	}

	@include h5 {
		// background-image: linear-gradient(180deg, #7368ff, #5f6fff 63%, #7084ff 100%);
		// border: 0.5px solid;
		// border-image: linear-gradient(180deg, #b7f2ff, #cae9ff 47%, #bae2ff 100%) 1 1;
		// border-radius: 6px;
		// box-shadow: 0px 0px 10px 0px #ffffff inset;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		// transform: skew(-5deg);
		color: #FFFFFF;
		font-size: 0.675rem;
		padding: 0.25rem 0.75rem;
		// height: 1.875rem;
		box-sizing: border-box;
		font-weight: 700;

		span {
			// transform: skew(5deg);
		}
	}
}

.icon-bn {
	display: flex;
	align-items: center;
	justify-content: center;
	// flex-direction: row-reverse;
	// padding: 0.3rem;
	color: #9BA6B3;
	margin-left: 0.5000rem;
	position: relative;
}

.lang-box {
	display: flex;
	align-items: center;
}

.icon-btn {

	@include pc {
		display: flex;
		align-items: center;
		justify-content: center;
		// flex-direction: row-reverse;
		padding: 0.3rem;
		color: #9BA6B3;
		margin-left: 0.5000rem;
		position: relative;

		&.btn-t {
			@include h5 {
				width: 2.10938rem;
				height: 1.875rem;
				border-radius: 0.25rem;
			}

			@include pc {
				width: 54px;
				height: 44px;
				border-radius: 8px;
				padding: 0;
			}

			transform: skew(-5deg);

			background-color: #231D4E;
			font-size: 12px;
		}

		text+.icon {
			margin-right: 0.50rem;
		}

		&:active {
			background-color: #1C1E22;
			color: #FFF;

			.icon {
				fill: #FFF;
			}
		}


		&.active {
			background-color: #1C1E22;
			color: #3bc117;

			.icon {
				fill: #3bc117;
			}
		}

		&.red::after {
			content: '';
			display: block;
			width: 0.6250rem;
			height: 0.6250rem;
			position: absolute;
			right: 0rem;
			top: 0rem;
			background-color: #FF0000;
			border-radius: 100%;
		}
	}

	@include h5 {
		display: flex;
		align-items: center;
		justify-content: center;
		// flex-direction: row-reverse;
		padding: 0.3rem;
		color: #9BA6B3;
		margin-left: 0.5000rem;
		position: relative;

		&.btn-t {
			// width: 2.10938rem;
			// height: 1.875rem;
			// transform: skew(-5deg);
			// border-radius: 0.25rem;
			// background-color: #231D4E;
			box-sizing: border-box;
		}

		text+.icon {
			margin-right: 0.50rem;
		}

		&:active {
			// background-color: #1C1E22;
			// color: #FFF;

			.icon {
				// fill: #FFF;
			}
		}


		&.active {
			// background-color: #1C1E22;
			color: #3bc117;

			.icon {
				fill: #3bc117;
			}
		}

		&.red::after {
			content: '';
			display: block;
			width: 0.6250rem;
			height: 0.6250rem;
			position: absolute;
			right: 0rem;
			top: 0rem;
			background-color: #FF0000;
			border-radius: 100%;
		}
	}
}

.sign-in {
	margin-left: 0.6250rem;
}

.register {
	background-color: #009d80;
	// background: linear-gradient(180deg,#ff9323,#ff6a01);
	border-radius: 0.25rem;
}

@keyframes lamp-rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.integral {
	min-width: 6.8750rem;
	height: 2.1875rem;
	box-sizing: border-box;
	background-color: #1E2024;
	font-size: 0.7500rem;
	font-weight: 700;
	padding-left: 0.4688rem;
	display: flex;
	align-items: center;
	padding-right: 0.3125rem;
	justify-content: space-between;
	color: #eb870b;
	position: relative;
	cursor: pointer;

	&.loading {
		svg {
			animation: lamp-rotate 0.8s infinite;
			fill: #FFF;
		}
	}

	&:active svg {
		fill: #FFF;
	}
}

.btn {
	@include button(#2AE035);
	padding: 0 1.2500rem;
	height: 2.1875rem;
	font-weight: normal;
	margin-left: 0.6250rem;

	&.white {
		background: none;
		color: #98A7B5;
		font-weight: normal;
	}
}

/* #ifdef H5 */

.meun-view {
	width: 240px;
	height: 0px;
	min-height: 0px;
	position: absolute;
	z-index: calc(var(--I1) + 1);
	transform: skew(5deg);
	right: -50px;
	top: 0px;
	// transition: all 0.2s ease-out;
	transition: min-height 0.2s linear;
	padding-top: 0;
	box-sizing: border-box;

	.meun-items {
		background: #231D4E;
		border-radius: 0.3125rem;
		box-shadow: 0 0 1.2500rem #111415;
		height: 100%;
		overflow: hidden;
		position: relative;

		// &::after {
		// 	content: '';
		// 	display: block;
		// 	width: 100%;
		// 	height: 1px;
		// 	background-color: #2d3035;
		// 	position: absolute;
		// 	bottom: 3.0000rem;
		// 	left: 0;
		// 	right: 0;
		// }
	}

	&:hover {
		min-height: 617px;
		;
		// padding-top: 20px;
	}
}

.portrait {
	@extend %flex-center;
	margin-left: 0.6250rem;

	&:hover {
		background: var(--body-background-color);
		border-radius: 0.3125rem;

		&~.meun-view {
			height: 19.5000rem;
			padding-top: 1.2500rem;
		}
	}
}

/* #endif */
</style>