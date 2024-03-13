<template>
	<page :show-header="!isPc">
		<div class="body page-pading">
			<!-- <public-banner position="vip_banner"></public-banner> -->
			<div class="vip-user-info">
				<div class="vip-user-level">
					<border-gradient class="avatar pc" :border-color="['#FFA67E', '#FF52FE']" bg-color="#2E2C5E" :angle="180">
						<public-image style="width:100%;height:100%" :src="user.portrait"></public-image>
					</border-gradient>
					<div>VIP {{ user.level }}</div>
				</div>
				<div>
					<div class="vip-user-schedule">
						<div>VIP {{ user.level }}</div>
						<div><span v-if="!userData.is_max_level">VIP </span>{{ userData.is_max_level ? $t('head.mj') : Number(userInfo.level) + 1 }}</div>
					</div>
					<div class="vip-schedule" v-if="userData.user_group">
						<div class="vip-schedule-value" :style="{
							width: ((Number(userData.level_up_advance) / Number(userData.next_user_group.level_condition)) * 100) + '%'
						}"></div>
					</div>
					<div class="level-value" v-if="userData.is_max_level == 1">{{ $t('pageVip.levelD') }}</div>
					<div class="level-value" v-else-if="userData.user_group">
						{{ $t('pageVip.tips') }}: {{ userData.level_up_advance }}<span>/{{
							userData.next_user_group.level_condition }}</span>
					</div>
				</div>
				<div class="rules-btn" @click="$open('/vip-rule')">
					{{ $t('pageVip.rulesBtn') }}
				</div>
			</div>
			<div class="title">
				<div>
					<img class="icon pc" src="@/assets/new/vip/vip-icon-pc.png">
					{{ $t('pageVip.titlePrivileges') }}
				</div>
				
				<view class="btns pc">
					<view class="upper" @click="scrollX = 0" ></view>
					<view class="next" @click="scrollX = -999">
					</view>
				</view>
			</div>
			<template v-if="list.length">
				<scroll-view :scroll-x="true" v-model:x="scrollX" class="vip-level-scroll">
					<div class="scroll-view">
						<div v-for="item, i in list" class="vip-btn" :class="{ active: index == i }" @click="index = i">
							<span>{{ item.name }}</span>
						</div>
					</div>
				</scroll-view>
				<div class="task-list">
					
					<div class="task">
									<div>
										<div class="task-name">{{ $t("pageVip.task1") }}</div>
										<div class="task-value">{{ $t("pageVip.task1Value") }}: <span>{{ list[index].level_condition
										}}EXP</span></div>
									</div>
									<img src="@/assets/new/vip/vip-task-1.png">
								</div>


								<div class="task">
									<div>
										<div class="task-name">{{ $t("pageVip.task2") }}</div>
										<div class="task-value">{{ $t("pageVip.task2Value") }}: <span>{{ unit }}{{ list[index].level_up_gift
										}}</span></div>
									</div>
									<img src="@/assets/new/vip/vip-task-2.png">
								</div>


								<div class="task">
									<div>
										<div class="task-name">{{ $t("pageVip.task3") }}</div>
										<div class="task-value">{{ $t("pageVip.task2Value") }}: <span>{{ unit }}{{
											list[index].level_day_gift }}</span></div>
									</div>
									<img src="@/assets/new/vip/vip-task-3.png">
								</div>


								<div class="task">
									<div>
										<div class="task-name">{{ $t("pageVip.task4") }}</div>
										<div class="task-value">{{ $t("pageVip.task2Value") }}: <span>{{ unit }}{{
											list[index].level_week_gift }}</span></div>
									</div>
									<img src="@/assets/new/vip/vip-task-4.png">
								</div>


								<div class="task">
									<div>
										<div class="task-name">{{ $t("pageVip.task5") }}</div>
										<div class="task-value">{{ $t("pageVip.task2Value") }}: <span>{{ unit }}{{
											list[index].level_month_gift }}</span></div>
									</div>
									<img src="@/assets/new/vip/vip-task-5.png">
								</div>
				</div>

			</template>

			<div class="vip-user-info bg2" v-if="false">
				<div class="flex">
					<div>
						<div class="vip-user-level cc">
							VIP {{ user.level }}
						</div>
						<div class="next-vip" v-if="userData.next_user_group && userData.is_max_level != 1">
							<div>{{ $t("pageVip.deposit") }}<span>{{ (userData.next_user_group.level_condition / rechargeRate).toFixed(2) }}</span>{{
								$t("pageVip.or") }}</div>
							<div>{{ $t("pageVip.bet") }}<span>{{ (userData.next_user_group.level_condition / betRate).toFixed(2) }}</span>{{
								$t("pageVip.promotedTo") }}VIP {{ userData.next_user_group.level }}</div>
						</div>
						<div class="next-vip" v-else>{{ $t('pageVip.levelD') }}</div>
					</div>
					<div class="btns">
						<block-btn class="go-game-btn pc" @click="$open('/casino')">{{ $t('pageActivityNew.goToGame') }}</block-btn>
						<block-btn class="go-game-btn pc" @click="$open('/recharge')">{{ $t('pageActivityNew.topUpNow') }}</block-btn>
						<div class="go-game-btn h5" @click="$open('/casino')">{{ $t('pageActivityNew.goToGame') }}</div>
						<div class="go-topup-btn h5" @click="$open('/recharge')">{{ $t('pageActivityNew.topUpNow') }}</div>
					</div>
				</div>
			</div>

			<div class="title">
				<div>
				<img class="icon pc xx-btn" src="@/assets/new/vip/vip-icon-2-pc.png">
				{{ $t('pageVip.help') }}</div>
			</div>
			<div class="help-QA" v-for="i in 4">
				<div class="Q">{{ $t('pageVip.question' + i) }}</div>
				<div class="A">{{ $t('pageVip.answer' + i) }}</div>
			</div>
			<public-page-footer class="pc"></public-page-footer>
		</div>
	</page>
</template>

<script setup lang="ts">

import ScrollView from "../components/scroll-view.vue";
import BorderGradient from "../components/border-gradient.vue"
import BlockBtn from "../components/block-btn.vue"
import PublicPageFooter from "../components/public-page-footer.vue"
import PublicImage from "../components/public-image.vue"
import Page from '../components/page.vue';
import { ref, onBeforeUnmount, onBeforeMount, onUnmounted, reactive, computed } from 'vue';
import { addListener, dbGet, dbSet, removeListener } from '../uilts/db';
import { onLoad, onShow, open } from '../router/routes';
import { isPc, unit } from '../uilts/async.var';
import userPortrait from '@/assets/user/user.png'
const scrollX = ref(0);
const list = ref<VipLevelRules["response"]>([])
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

/**投注比 */
const betRate = computed(() => {
    try {
        return Number((list.value.filter(e => e.level == Math.max(userData.value.user_group.level,1))[0].bet_rate / 100).toFixed(2))
    } catch (error) {
        return 0;
    }
})
/**充值比 */
const rechargeRate = computed(() => {
    try {
        return Number((list.value.filter(e => e.level == Math.max(userData.value.user_group.level,1))[0].recharge_rate / 100).toFixed(2))
    } catch (error) {
        return 0;
    }
})



const array = ref<Array<any>>([])
const index = ref<number>(0)
const userInfo = ref<UserModel>({})
//获取vip信息
const getVipInfo = () => {
	'/api/vip/info'.GET<VipInfo>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		userData.value = ret.user
		list.value.length = 0
		ret.vip.forEach((v: VipLevelRules["response"][number], i: number) => {
			list.value.push(v)
			if (v.level == userInfo.value.level) {
				index.value = i
			}
			array.value.push(v.name)
		})
	})
}

const vipLevelRules = () => {
	// '/api/vip/vipLevelRules'.GET<VipLevelRules>(null, {
	// 	Authorization: async () => await dbGet('token')
	// }).then(ret => {
	// 	ret.forEach((v, i) => {
	// 		list.value.push(v)
	// 		if (v.level == userInfo.value.level) {
	// 			index.value = i
	// 		}
	// 		array.value.push(v.name)
	// 	})
	// })
}

// const numFilter = (value: number) => {
// 	let realVal = Number(value).toFixed(1)
// 	return realVal
// }

//获取用户信息
const getInfo = () => {
	'/api/user/getInfo'.GET<GetInfo>(null, {
		Authorization: async () => await dbGet('token')
	}).then(async ret => {

		await dbSet("user", ret);
	})
}

const languageListener = (type: any, _name: any) => {
	if (type === 'set') {
		getVipInfo()
		vipLevelRules()
	}
}

onBeforeMount(() => {
	dbGet('user').then(user => {
		userInfo.value = user
	})
	getInfo()
})

onBeforeUnmount(() => {
	removeListener('language', languageListener)
})

const user = reactive({
	level: '',
	user_nick: '',
	username: '',
	id: '',
	portrait: ''
})

const setUser = (type: any, ret: any) => {
	if (type === 'set') {
		user.level = ret.level;
		user.user_nick = ret.user_nick;
		user.username = ret.username;
		user.id = ret.id;
		user.portrait = ret.portrait || userPortrait;
	}
}
onUnmounted(() => {
	removeListener('user', setUser)
})
onShow(() => {
	getVipInfo()
	vipLevelRules()
	dbGet('user').then(ret => setUser('set', ret));
})
onLoad(() => {
	getVipInfo()
	vipLevelRules()
	addListener('language', languageListener)
	dbGet('user').then(ret => setUser('set', ret));
	addListener('user', setUser)
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

$bg-item:#3f3f3f;
$fff:#fff;
$sub-c2:#c2c2c2;
$bg:#000;

:deep(.page-head){
  background-color: var(--body-background-color);
  .name{
    color: $fff;
  }
}
:deep(.page-pading){
  padding-top: 0;
}
.vip-user-info {
	background:#420DA3 url(@/assets/new/vip/vip-bg.png) no-repeat center top;
	background-size: 100%;
	height: 7.6rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0.66rem;
	box-sizing: border-box;
	position: relative;
	border-radius: 0.5rem;
	margin-bottom: 0.8rem;

	&.bg2 {
		background-image: url(@/assets/new/vip/vip-bg-2.png);
		padding: 0 1.12rem;
		margin-top: 0.91rem;
		height: 7rem;
		padding-bottom: 0.6rem;
	}

	.next-vip {
		color: #999;
		font-size: 0.8125rem;
		padding-bottom: 0.4rem;

		span {
			color: #fff;
			font-size: 0.8125rem;
		}
	}

	.btns {
		display: flex;

		div {
			width: 4.15625rem;
			height: 1.1875rem;
			border-radius: 0.1875rem;
			background: rgba(255, 255, 255, 0.20);
			color: #fff;
			text-align: center;
			font-size: 0.625rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 1.06rem;
		}
	}

	.vip-user-level {
		display: inline-block;
		font-size: 2rem;
		font-weight: 900;
		background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

		&.cc{
			font-size: 1.8rem;
		}
	}

	.vip-user-schedule {
		font-size: 0.6875rem;
		color: #8E90CD;
		display: flex;
		width: 12.3125rem;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 0.2rem;
	}

	.vip-schedule {
		width: 12.3125rem;
		height: 0.1875rem;
		border-radius: 1.5625rem;
		background: rgba(0, 0, 0, 0.50);
	}

	.vip-schedule-value {
		height: 100%;
		border-radius: 1.5625rem;
		background: #C414E0;
		position: relative;

		&::after {
			content: '';
			border-radius: 50%;
			background: #C414E0;
			width: 0.4375rem;
			height: 0.4375rem;
			position: absolute;
			right: 0;
			top: -0.109375rem;
		}
	}

	.level-value {
		color: #FFF;
		font-size: 0.6875rem;
		padding: 0.3rem 0;

		span {
			color: #999;
		}
	}

	.rules-btn {
       background: rgba(255, 255, 255, 0.20);
	   font-size: 1rem;
		border-radius: 0.1875rem;
		position: absolute;
		right: 0.5rem;
		top: 0.5rem;
		font-size: 0.5rem;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		height: .9688rem;
		padding: 0 0.5rem;
		//  width: 3.2813rem;
	}
	@include pc {
		height: 236px;
		background: url(@/assets/new/vip/vip-bg-pc-2.png) no-repeat, 
		url(@/assets/new/vip/vip-bg-pc.png) no-repeat;
		background-size: 328px auto, 100% 100%;
		background-position:calc(100% - 124px) 0, 0 0;
		border-radius: 10px;
		margin-bottom:64px;
		margin-top:66px;
		padding-left:168px;
		.vip-user-level{
			font-size: 64px;
			font-weight:400;
			display:flex;
			gap:25px;
			align-items: center;
		}
		.vip-schedule{
			height: 12px;
			border-radius: 50px;
			width: 504px;
		}
		.vip-user-schedule{
			font-size: 22px;
			padding-bottom:4px;
			width: 504px;
		}
		.vip-schedule-value {
			border-radius: 50px;
			background:linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
			&::after {
				background: $bg-item;
				width: 20px;
				height: 20px;
				top: -5px;
				right:-10px;
			}
		}
		.level-value {
			font-size: 22px;
			padding:9px 0;
		}
		.rules-btn{
			height: 31px;
			border-radius: 6px;
			padding:0 8px;
			top:17px;
			right:20px;
			font-size: 16px;
		}
		.flex{
			display:flex;
			align-items: center;
			gap: 94px;
		}
		&.bg2 {
			height: 258px;
			background: url(@/assets/new/vip/vip-bg-2-pc-2.png) no-repeat, 
			url(@/assets/new/vip/vip-bg-2-pc.png) no-repeat;
			background-size: 386px 240px, 100% 100%;
			background-position:calc(100% - 32px) 18px, 0 0;
			border-radius: 10px;
			margin-bottom:64px;
			margin-top:64px;
			padding:51px 0;
			padding-left:88px;
		}
		.next-vip{
			font-size: 26px;
			span{
				font-size: 26px;
			}
		}
		.btns div{
			height:60px;
			border-radius:10px;
			background:none;
			font-size: 24px;
			margin-right:64px;
			min-width:220px;
		}
	}
}

.avatar {
	width: 4.6875rem;
	height: 4.6875rem;
	border-radius: 50%;
	stroke: #FFA67D;
	filter: drop-shadow(0px 4px 4px rgba(255, 107, 218, 0.15));
	@include pc {
		width:68px;
		height:68px;
		margin-left:-2px;
	}
	img {
		max-width: 100%;
		max-height: 100%;
	}
}

.title {
	color: $fff;
	font-size: 0.625rem;
	padding-bottom: 0.63rem;
	display: flex;
	align-items: center;
justify-content: space-between;
	div{
		display: flex;
		gap: 8px;
		align-items: center;
	}
	@include pc {
		font-size: 24px;
		padding-bottom:35px;
		display:flex;
		align-items: center;
		gap:8px;
	}
}
.icon.pc {
	@include pc {
		width: 40px;
		height: 40px;
	}
}
.vip-level-scroll{
	overflow:hidden;
	margin-bottom:0.69rem;
	@include pc {
		margin-bottom:64px;
	}
}
.task-list{
	@include pc {
		display: grid;
  		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap:20px;
		grid-row-gap:20px;
	}
}
.scroll-view {
	flex-wrap: nowrap;
	word-break: normal;
	white-space: nowrap;
	vertical-align: middle;
}

.vip-btn {
	display: inline-block;
	line-height: 1.437rem;
	padding: 0 0.62rem;
	border-radius: 0.1875rem;
	border: 1px solid #3a3a3a;
	background: #3a3a3a;
	text-align: center;
	color: #c4c4c4;
	font-size: 0.75rem;
	margin-right: 0.62rem;
	font-weight: 900;

	&::before {
		content: '';
		display: inline-block;
		width: 0.84375rem;
		height: 0.84375rem;
		background: url("@/assets/new/vip/vip-icon.png") no-repeat center;
		background-size: 100%;
		vertical-align: top;
		margin-top: 0.25rem;
		margin-right: 0.3rem;
	}

	&:hover,
	&.active {
		border: 1px solid #009d80;
		background: #009d80;
    color:$fff;
		&::before {
			background-image: url("@/assets/new/vip/vip-icon-active.png");
		}

		//span {
		//	background:#fff; //linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
		//	background-clip: text;
		//	-webkit-background-clip: text;
		//	-webkit-text-fill-color: transparent;
		//}
	}
	@include pc {
		display:inline-flex;
		height: 46px;
		padding:0 11px;
		font-size: 24px;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		border: 1px solid #2F2A5C;
		margin-right:20px;
		&::before {
			width: 27px;
			height: 27px;
			margin:0;
		}
	}
}

.task {
	display: flex;
	height: 4.9375rem;
	padding: 0.5rem 0.6875rem;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.5rem;
	border: 1px solid #5a5a5a;
	background:$bg-item; //linear-gradient(175deg, #201E47 -7.47%, rgba(37, 34, 86, 0.08) 121.58%);
	margin-bottom: 0.56rem;

	.task-name {
		color: $fff;
		font-size: 0.875rem;
		font-weight: 700;
		line-height: 1.25rem;
		padding-bottom: 0.38rem;
	}

	.task-value {
		color: $sub-c2;
		font-size: 0.75rem;
		line-height: 1.25rem;

		span {
			color: #eccf4c;
			padding-left: 0.5rem;
		}
	}

	img {
		display: block;
		width: 5rem;
		height: 5rem;
	}
	@include pc {
		margin:0;
		padding:20px;
		flex-direction: row-reverse;
		height: auto;
		gap:20px;
		justify-content: flex-end;
		img {
			width: 160px;
			height: 160px;
		}
		.task-name{
			font-size: 28px;
			font-weight: 600;
			line-height:normal;
			padding-bottom:12px;
		}
		.task-value {
			font-size: 24px;
			line-height:normal;
		}
	}
}

.help-QA {
	min-height: 4.9375rem;
	box-sizing: border-box;
	padding: 0.5rem 0.6875rem;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.5rem;
	border: 1px solid #5a5a5a;
	background: $bg-item;//linear-gradient(175deg, #201E47 -7.47%, rgba(37, 34, 86, 0.08) 121.58%);
	color: $fff;
	margin-bottom: 0.63rem;

	.Q {
		font-size: 0.875rem;
		padding-bottom: 0.38rem;
	}

	.A {
		font-size: 0.625rem;
		line-height: 0.89063rem;
    color: $sub-c2;
	}
	@include pc {
		border-radius: 16px;
		background: #201E47;
		padding:15px 25px;
		margin-bottom:10px;
		border:none;
		.Q {
			font-size: 20px;
			padding-bottom:8px;
		}
		.A {
			font-size: 16px;
			line-height:normal;
			color:#5B6DA1;
		}
	}
}





.btns {
	font-weight: normal;
	display: flex;
	align-items:center;

	.all {
		min-width: 3.156rem;
		padding: 0 0.25rem;
		height: 1.25rem;
		border-radius: 0.25rem;
		background-color: #3C3E6D;
		font-size: 0.75rem;
		font-weight: 400;
		align-items: center;
		color: #8E90CD;
		margin-right: 0;
		@extend %flex-center;

		@include pc {
			min-width: 87px;
			height: 40px;
			border-radius: 8px;
			border: 1px solid #2E2B4F;
			// opacity: 0.2;
			background: #2E2B4F;
			box-sizing: border-box;
			font-size: 16px;
		}

		span {
			color: #B5EBFF;
			margin-left:0.25rem;
		}
	}

	.upper,
	.next {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 0.25rem;
		margin-left: 5px;
		background-image: url(@/assets/new/index/arrow-no-dis.png);
		background-color: #2E2B4F;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.8rem;
		border: 1px solid #2E2B4F;

		@include pc {
			width: 40px;
			height: 40px;
			background-color: #2E2B4F;
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 20px;
			border-radius: 8px;
			border: 1px solid #2E2B4F;
			box-sizing: border-box;
		}

		&.dis {
			background-image: url(@/assets/new/index/arrow-dis.png);
			background-color: #1E1B3B;
			border: 1px solid #282547;
		}
	}

	.upper:not(.dis),
	.next.dis {
		transform: rotate(180deg);
	}
}







</style>