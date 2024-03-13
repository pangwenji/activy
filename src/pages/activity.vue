<template>
	<!-- <page 
	   :show-header="!isPc" 
	   :show-scrollbar="true" 
	   style="background-color:#181538;"
	   
	   > -->

	<div class="body page-padding">
		<div class="total-reward total-reward-item">
			<div  class="panel-top">
				<div class="flex">
					<img class="pc" src="@/assets/new/activity/total-reward-pc.png" />
					<img class="h5" src="@/assets/new/activity/total-reward.png" />
					<div>
						<div class="name">{{ $t('pageActivityNew.totalBonusClaim') }}</div>
						<div class="value" :data-unit="unit">{{ pageData.total_activity_bonus }}</div>
					</div>
				</div>
				<div class="total-reward-all pc">
					<div class="item">
						<div class="name">{{ $t('pageActivityNew.totalVIPBonus') }}</div>
						<div class="value" :data-unit="unit">{{ pageData.total_gif }}</div>
					</div>
					<div class="item">
						<div class="name">{{ $t('pageActivityNew.generalBonusPool') }}</div>
						<div class="value" :data-unit="unit">{{ pageData.total_common_bonus }}</div>
					</div>
					<div class="item">
						<div class="name">{{ $t('pageActivityNew.missionBonusTotal') }}</div>
						<div class="value" :data-unit="unit">{{ pageData.total_special_bonus }}</div>
					</div>
				</div>
			</div>
			<div  class="custom-btn"  @click="$open('/activity-record', {})">
				<!-- 记录 -->
				{{ $t('pageActivityNew.record') }}
			</div>
		</div>

		<div class="total-reward-all h5">
			<div class="item">
				<div class="name">{{ $t('pageActivityNew.totalVIPBonus') }}</div>
				<div class="value" :data-unit="unit">{{ pageData.total_gif }}</div>
			</div>
			<div class="item">
				<div class="name">{{ $t('pageActivityNew.generalBonusPool') }}</div>
				<div class="value" :data-unit="unit">{{ pageData.total_common_bonus }}</div>
			</div>
			<div class="item">
				<div class="name">{{ $t('pageActivityNew.missionBonusTotal') }}</div>
				<div class="value" :data-unit="unit">{{ pageData.total_special_bonus }}</div>
			</div>
		</div>
		<scroll-view class="tab-btns h5" :scroll-x="true" :show-scrollbar="false">
			<div class="btn-group">
				<div class="tab-btn" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0">
					{{ $t('pageIndex.viewAll') }}
				</div>
				<div class="tab-btn" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">
					{{ $t('pageActivityNew.missionBonusTotal') }}
				</div>
				<div class="tab-btn" :class="{ active: tabIndex == 2 }" @click="tabIndex = 2">
					{{ $t('pageActivityNew.generalBonusPool') }}
				</div>
				<div class="tab-btn" :class="{ active: tabIndex == 3 }" @click="tabIndex = 3">
					{{ $t('pageActivityNew.totalVIPBonus') }}
				</div>
			</div>

		</scroll-view>
		<!-- <div class="tab-btns h5">
			<div class="tab-btn" :class="{ active: tabIndex == 0 }" @click="tabIndex = 0">
				{{ $t('pageIndex.viewAll') }}
			</div>
			<div class="tab-btn" :class="{ active: tabIndex == 1 }" @click="tabIndex = 1">
				{{ $t('pageActivityNew.missionBonusTotal') }}
			</div>
			<div class="tab-btn" :class="{ active: tabIndex == 2 }" @click="tabIndex = 2">
				{{ $t('pageActivityNew.generalBonusPool') }}
			</div>
			<div class="tab-btn" :class="{ active: tabIndex == 3 }" @click="tabIndex = 3">
				{{ $t('pageActivityNew.totalVIPBonus') }}
			</div>
		</div> -->
		<template v-if="tabIndex === 1 || tabIndex === 0 || isPc">
			<div class="title">{{ $t('pageActivityNew.missionBonusTotal') }}</div>
			<div class="task-list special-bonus">
				<div class="task" v-for="v in pageData.special_activity">
					<div class="task-item">
						<div class="icon-task"></div>
						<div class="flex">
							<div class="task-info">
								<div class="name">
									{{ v.activity_title }}
									<template v-if="v.activity_type === 'Turntable'">
										{{ unit }}{{ v.reward_money }}
									</template>
								</div>
								<template v-if="v.activity_type === 'Invite'">
									<div class="describe">{{ $t('pageActivityNew.invite') }}</div>
								</template>
								<template v-else-if="v.activity_type === 'LossReversal'">
									<div class="value">
										{{ $t('pageActivityNew.lossReversal1') }}
										<span>{{ v.rate }}%</span>
										{{ $t('pageActivityNew.lossReversal2') }}
									</div>
								</template>
								<template v-else-if="v.activity_type === 'MoneyIsLikeRain'">
									<div class="value">
										<span>{{ v.begin_time }}</span>
										{{ $t('pageActivityNew.moneyIsLikeRain') }}
									</div>
								</template>
								<template v-else-if="v.activity_type === 'Turntable'">
									<div class="value">
										{{ $t('pageActivityNew.turntable1') }}
										<span>{{ v.can_turn_num }}</span>
										{{ $t('pageActivityNew.turntable2') }}
									</div>
								</template>
	
							</div>
						</div>
					</div>
					<div>
						<template v-if="v.activity_type === 'Invite'">
							<div class="custom-btn" @click="$open('/recommend')">
								{{ $t('pageActivityNew.inviteBtn') }}
							</div>
						</template>
						<template v-else-if="v.activity_type === 'LossReversal'">
							
							<div class="custom-btn" @click="$open('/cash-back-on-losses')">
								<span v-if="v.start_apply_time * 1000 > Date.now()">{{ kfTimeView }}</span>
								<span v-if="v.start_apply_time * 1000 < Date.now() && v.end_apply_time * 1000  > Date.now()">{{ $t('pageActivityNew.qsq') }}</span>
								<span v-if="v.start_apply_time * 1000 < Date.now() && v.end_apply_time * 1000 < Date.now()">{{ $t('pageActivityNew.yjjs') }}</span>
							</div>
						</template>
						<template v-else-if="v.activity_type === 'MoneyIsLikeRain'">
							<div class="custom-btn" @click="$open('/money-is-like-rain')">
								{{ $t('pageActivityNew.moneyIsLikeRainBtn') }}
							</div>
						</template>
						<template v-else-if="v.activity_type === 'Turntable'">
							<div class="custom-btn" @click="$open(!v.start_time ? '/turntable-alert' : '/turntable', {
									title: v.activity_title + unit + v.reward_money
								})">
								{{ $t('pageActivityNew.inviteBtn') }}
							</div>
							
						</template>
					</div>
				</div>
			</div>


		</template>
		<template v-if="tabIndex === 2 || tabIndex === 0 || isPc">
			<div class="title">{{ $t('pageActivityNew.generalBonusPool') }}</div>

			<div class="task-list general-bonus">
				<div class="task" v-for="v in pageData.common_activity_list">
					<div class="task-item">

						<div class="icon-task"></div>
						<div class="flex">
							<div class="task-info">
								<div class="name">{{ v.activity_name }}</div>
								<template v-if="v.activity_type === 'FirstDeposit'">
									<div class="value">{{ $t('pageActivityNew.cz') }} <span :data-unit="unit">{{ v.task_money
									}}</span></div>
									<div class="value">{{ $t('pageActivityNew.bonus') }} <span :data-unit="unit">{{ v.bonus
									}}</span></div>
								</template>
								<template v-else-if="v.activity_type === 'SignIn'">
									<div class="value">{{ $t('pageActivityNew.qd') }} <span>{{ v.total_sign_count }}</span>
										{{ $t('pageActivityNew.tian') }}</div>
								</template>
								<template v-else-if="v.activity_type === 'WeekTask'">
									<div class="value">{{ $t('pageActivityNew.jxz') }} <span>{{ v.week_task_count }}</span>
									</div>
								</template>
								<template v-else-if="v.activity_type === 'DayTask'">
									<div class="value">{{ $t('pageActivityNew.jxz') }} <span>{{ v.day_task_count }}</span></div>
								</template>
								<template v-else-if="v.activity_type === 'GiveBack'">
									<div class="value">{{ $t('pageActivityNew.jxz') }} <span>{{ v.give_back_count }}</span>
									</div>
								</template>
							</div>
						</div>
					</div>
					<div>
						<template v-if="v.activity_type === 'FirstDeposit'">
							<div class="receive-btn "  @click="$open('/recharge')" v-if="v.is_receive == 0">
								{{ $t('pageActivityNew.topUpNow') }}
							</div>
							<div class="receive-btn" @click="receiveTask(v)" v-else-if="v.is_receive == 1">
								{{ $t('pageActivityNew.receive') }}
							</div>
							<div class="receive-btn disable" v-else-if="v.is_receive == 2">
								{{ $t('pageActivityNew.receiveOk') }}
							</div>
						</template>
						<template v-else-if="v.activity_type === 'SignIn'">
							<div class="custom-btn"  :class="{disable:v.is_sign_today != 0}" @click="$open('/seven-sign')">
								{{ $t('pageActivityNew.qd') }}
							</div>
						</template>
						<template v-else-if="v.activity_type === 'WeekTask'">
							<div class="custom-btn" @click="$open('/mission-center', { tabIndex: 'WeekTask' })">
								{{ $t('pageActivityNew.ckrw') }}
							</div>
						</template>
						<template v-else-if="v.activity_type === 'DayTask'">
							<div class="custom-btn" @click="$open('/mission-center', { tabIndex: 'DayTask' })">
								{{ $t('pageActivityNew.ckrw') }}
							</div>
						</template>
						<template v-else-if="v.activity_type === 'GiveBack'">
							<div class="custom-btn" @click="$open('/mission-center', { tabIndex: 'GiveBack' })">
								{{ $t('pageActivityNew.ckrw') }}
							</div>
						</template>

					</div>
				</div>
			</div>

		</template>
		<template v-if="tabIndex === 3 || tabIndex === 0 || isPc">
			<div class="title">
				<div>{{ $t('pageActivityNew.totalVIPBonus') }}</div>
				<div class="select-btn" @click="selectVipLevel">
					<span>{{ array[index] }}</span>
					<svg width="15" height="8" viewBox="0 0 15 8" fill="none">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M0.792893 0.292893C1.18342 -0.0976311 1.81658 -0.0976311 2.20711 0.292893L7.5 5.58579L12.7929 0.292893C13.1834 -0.0976311 13.8166 -0.0976311 14.2071 0.292893C14.5976 0.683417 14.5976 1.31658 14.2071 1.70711L8.20711 7.70711C7.81658 8.09763 7.18342 8.09763 6.79289 7.70711L0.792893 1.70711C0.402369 1.31658 0.402369 0.683417 0.792893 0.292893Z"
							fill="#ffffff" />
					</svg>
				</div>

				<div class="select-option pc" style="height:320px" v-if="showSelect">
					<scroll-view style="height:100%" :scroll-y="true" :show-scrollbar="true" :mouse-wheel="true">
						<div>
							<div v-for="(item, i) in array" class="option-team" @click="changeVipLevel(i)"
								:class="{ 'active': i === index }">
								{{ item }}
							</div>
						</div>
					</scroll-view>
				</div>

			</div>
			<div class="task-list VIP-bonus">
				<div class="task" v-for="v in pageData.vip_activity_list">
					<div class="task-item">
						<div class="icon-task"></div>
						<div class="flex">
							<div class="task-info">
								<div class="name">{{ v.title }}</div>
								<div class="describe">
									<span v-if="v.task_id === 1">{{ $t('pageActivityNew.jjklq') }}</span>
									<span v-if="v.task_id === 2">{{ $t('pageActivityNew.mrtz') }}{{ unit }}{{ v.bet_money
									}}</span>
									<span v-if="v.task_id === 3">{{ $t('pageActivityNew.mztz') }}{{ unit }}{{ v.bet_money
									}}</span>
									<span v-if="v.task_id === 4">{{ $t('pageActivityNew.mytz') }}{{ unit }}{{ v.bet_money
									}}</span>
								</div>
								<div class="value">{{ $t('pageActivityNew.rewards') }}<span :data-unit="unit">{{ v.money
								}}</span>
								</div>
							</div>
	
						</div>
					</div>
					<div class="receive-btn"  :class="{ disable: v.is_receive != 1 }" @click="receiveGif(v)">
						<span v-if="v.is_receive === 1">
							{{ $t('pageVip.tab1Button') }}
						</span>
						<span v-else-if="v.is_receive === 0">
							{{ $t('pageVip.tab1Button') }}
						</span>
						<span v-else-if="v.is_receive === 2">
							{{ $t('pageAgentPromotion.receiveOk') }}
						</span>
					</div>
				</div>
			</div>

		</template>

	</div>
	<!-- </page> -->
</template>

<script setup lang="ts">
// import ScrollView from "../components/scroll-view.vue";
// import Page from '../components/page.vue';
import ScrollView from "../components/scroll-view.vue"
import UiVipSheet from '../components/ui-vip-sheet.vue';
import { ref, reactive, computed } from "vue"
import { t } from "../uilts/i18n";
import { dbGet } from "../uilts/db";
import { hint, showActionSheet } from "../uilts/ui";
import { balance, isPc, unit } from "../uilts/async.var";
import { clonetabIndex, onLoad, onShow } from '../router/routes';
import { activityInit } from '../uilts/emit';

const tabIndex = ref(0);
const list = ref<VipLevelRules['response']>([]);
const pageData = reactive<GetActivityList['response']>({
	total_activity_bonus: '',
	total_gif: 0,
	total_task_bonus: '',
	total_common_bonus: '',
	total_special_bonus: '',
	special_activity: [],
	common_activity_list: [],
	vip_activity_list: []
})
const userInfo = ref<UserModel>({});
// vip 下标
const index = ref(0);
// vip 名字
const array = ref<Array<string>>([]);

const selectVipLevel = () => {
	if (isPc.value) {
		showSelect.value = !showSelect.value;
	} else {
		showActionSheet(array.value, UiVipSheet, {
			title: t('ui.vipSheet'),
			selectedIndex: index.value,
		}).then(ret => {
			changeVipLevel(ret.tapIndex)
		})
	}
}

const changeVipLevel = (i: number) => {
	index.value = i;
	getGiftTask();
	showSelect.value = false;
}
const showSelect = ref(false);

const kfTime = ref(0);
const nowTime = ref(Date.now());
setInterval(() => {
	nowTime.value = Date.now();
}, 1000)

const kfTimeView = computed(() => {
	console.log(kfTime.value);
	
	let t = kfTime.value - Date.now();
	let d = Math.max(Math.floor(t / 86400000), 0);
	let h = Math.max(Math.floor(t / 3600000 % 24), 0);
	let m = Math.max(Math.floor(t / 60000 % 60), 0);
	return (d ? (d + 'D') : '') +
		(h || d ? (h + 'H') : '') +
		(m || d || h ? (m + 'M') : '')
})

/**领取一般活动奖励 */
const receiveTask = (item: GetActivityList['response']['common_activity_list'][number]) => {
	"/api/activity/receive".POST<ReceiveTask>({
		activity_id: item.activity_id,
		task_id: item.task_id
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		item.is_receive = 2;
		pageData.common_activity_list = pageData.common_activity_list;
		pageData.total_common_bonus = (Number(pageData.total_common_bonus) + (item.bonus as unknown as number - 0)).toFixed(2);
		balance.value = Number(Number(balance.value) + (item.bonus as unknown as number - 0)).toFixed(2);
		init()
		hint(t('pageAgentPromotion.success'));
	})
}

//领取晋级礼金
const receiveGif = (item: GetGiftTask['response'][number]) => {
	'/api/vip/receiveGif'.POST<ReceiveGif>({
		receive_group_id: list.value[index.value].id,
		task_id: item.task_id
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		item.is_receive = 2;
		pageData.vip_activity_list = pageData.vip_activity_list;
		pageData.total_gif = (pageData.total_gif - 0) + (item.money - 0);
		balance.value = Number(Number(balance.value) + (item.money - 0)).toFixed(2);
		init()
		hint(t('pageAgentPromotion.success'));
	})
}
const vipLevelRules = () => {
	'/api/vip/getVipRules'.GET<VipLevelRules>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		list.value.length = 0
		array.value.length = 0;
		ret.forEach((v, i) => {
			list.value.push(v)
			if (v.level == userInfo.value.level) {
				index.value = i
			}
			array.value.push(v.name)
		})
	})
}

//获取vip晋级礼金
let gif: Promise<GetGiftTask['response']>;
const getGiftTask = () => {
	gif && gif.abort();
	gif = '/api/vip/getGiftTask'.POST<GetGiftTask>({
		group_id: list.value[index.value].id
	}, {
		Authorization: async () => await dbGet('token')
	})
	gif.then(ret => {
		pageData.vip_activity_list.length = 0;
		ret.forEach((v) => {
			pageData.vip_activity_list.push(v)
		})
	})
}
const init = () => {
	dbGet('user').then(user => {
		userInfo.value = user;
		vipLevelRules();
	})
	return "/api/activity/getActivityList".GET<GetActivityList>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		pageData.total_activity_bonus = ret.total_activity_bonus;
		pageData.total_gif = ret.total_gif;
		pageData.total_task_bonus = ret.total_task_bonus;
		pageData.total_common_bonus = ret.total_common_bonus;
		pageData.total_special_bonus = ret.total_special_bonus;
		pageData.special_activity = ret.special_activity;
		pageData.common_activity_list = ret.common_activity_list;
		pageData.vip_activity_list = ret.vip_activity_list;
		ret.special_activity.forEach((value,_index) => {
			if(value.activity_type === 'LossReversal'){
				kfTime.value = value.start_apply_time * 1000
			}
		})
	});
}

onLoad(() => {
	clonetabIndex.value = 2
	activityInit(init);
	return init();
})

onShow(() => {
	init();
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';


.page-padding{
	padding: 0 0.75rem;
	padding-top: 0.75rem;
}
.bg-btn{
	width: 3rem;
}
.flex {
	display: flex;
	align-items: center;
}
.task-item{
	padding: .5rem 1rem;
    display: flex;
}
.custom-btn{
	display: flex; 
	justify-content: center;
	align-items: center;
	width: 100%;
	background: #009d81;
	border-bottom-left-radius: .5rem;
	border-bottom-right-radius: .5rem;
	height: 2.4rem;
    color: #ffffff;
	font-size: .75rem;
	font-weight: 400;
}
.total-reward,
.total-reward-all {
	flex: 1;
	border-radius: 0.5rem;
	background: #494949;
	// padding-top: 1rem;
	// padding-left: 1rem;
	// padding-right: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
    position: relative;
	img {
		display: block;
		width: 2.75rem;
		height: 2.75rem;
		margin-right: 0.9rem;
	}

		.name {
		// color: #8E90CD;
		color: #ffffff;
		font-size: 0.75rem;
		padding-bottom: 0.5rem;
		text-align: center;
		white-space: nowrap;
	}

	.value {
		// color: #0FF;
		color: #ffffff;
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.3125rem;
		text-align: center;
		&::before {
			content: attr(data-unit);
			font-size: 0.75rem;
		}
	}

	.btn {
		color: #FFF;
		font-size: 0.875rem;
		border-radius: 0.5rem;
	}
	&.total-reward-item{
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.panel-top{
		      padding: 1rem;
			}
		}
}
.total-reward {
	@include pc {
		border-radius: 24px;
		background: #494949;

		.flex {
			flex: 1;
			justify-content: center;
		}

		img {
			width: 64px;
			height: 64px;
			margin-right: 14px;
		}

		.name {
			font-size: 20px;
		}

		.value {
			font-size: 24px;

			&::before {
				font-size: 24px;
			}
		}

		.btn {
			height: 44px;
			border-radius: 8px;
			font-size: 20px;
		}
	}
}

.total-reward-all {
	gap: 0.75rem;
	background: none;
	padding: 0;
	margin-top: 0.5rem;
	flex: 3;

	.item {
		flex: 1;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		// background: #201E47;
		background-color: #494949;

		@include pc {
			text-align: center;
			background: transparent;
		}
	}

	.value {
		color: #ffffff;
	}
}

.tab-btns {
	color: #ffffff;
	font-size: 0.75rem;
	margin-bottom: 1rem;
	margin-top: 1.25rem;
	white-space: nowrap;
	overflow: hidden;
	
	.tab-btns {
		margin: 0;
	}
	.btn-group{
           display: flex;
		   justify-content: space-between;
		gap: 5px;
		padding: 0 9px;
		.tab-btn {
			border: 1px solid #494949;
			flex: 1;
			display: inline-block;
			padding: 0.25rem 0.9375rem;
			border-radius: 0.25rem;
			background: #3A3A3A;
			text-align: center;
			&.active {
				color: #ffffff;
				font-size: 0.75rem;
				background: #009D80;
			}
		}
	}
}

.title {
	color: #ffffff;
	font-size: 0.875rem;
	font-weight: 700;
	margin: 0.5rem 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;

	.select-btn {
		display: inline-flex;
		padding: 0.25rem 0.9375rem;
		justify-content: center;
		align-items: center;
		gap: 0.3125rem;
		color: #ffffff;
		text-align: center;
		font-size: 0.625rem;
		border-radius: 0.25rem;
		background: #1a1a1a;
		box-sizing: border-box;

		svg {
			width: 0.6rem;
		}
	}

	@include pc {
		font-size: 24px;
		margin: 0;
		padding-top: 64px;
		padding-bottom: 32px;

		.select-btn {
			border-radius: 8px;
			height: 44px;
			font-size: 20px;
			padding: 0 30px;
			border: 1px solid rgba(73, 70, 118, 0.50);
			width: 136px;

			svg {
				width: 18px;
				height: 18px;
				margin-left: 10px;
			}
		}
	}
}

.icon-task {
	width: 5rem;
	height: 5rem;

	@include pc {
		width: 160px;
		height: 160px;
	}

}

.special-bonus {
	.task .icon-task {
		background-image: url(@/assets/new/activity/icon-1.png);
		background-size: cover;
	}

	@for $i from 1 through 5 {
		.task:nth-child(#{$i}) .icon-task {
			background-image:url(@/assets/new/activity/icon-#{$i}.png);
			background-size: cover;
		}
	}
}

.general-bonus {
	.task .icon-task {
		background-image: url(@/assets/new/activity/icon-5.png);
		background-size: cover;
	}

	@for $i from 1 through 6 {
		$n: $i + 4;

		.task:nth-child(#{$i}) .icon-task {
			background-image:url(@/assets/new/activity/icon-#{$n}.png);
			background-size: cover;
		}
	}
}

.VIP-bonus {
	.task .icon-task {
		background-image: url(@/assets/new/activity/icon-10.png);
		background-size: cover;
	}

	@for $i from 1 through 6 {
		$n: $i + 9;

		.task:nth-child(#{$i}) .icon-task {
			background-image:url(@/assets/new/activity/icon-#{$n}.png);
			background-size: cover;
		}
	}
}

.task-list {
	padding-bottom: 1.25rem;

	.task {
		align-items: center;
		justify-content: space-between;
		border-radius: 0.5rem;
		background: #494949;

		color: #ffffff;
		font-size: 0.75rem;
		margin-bottom: 0.5rem;

		.task-info {
			padding-left: 0.5rem;
		}

		.name {
			font-size: 0.875rem;
			font-weight: 700;
			padding-bottom: 0.38rem;
		}

		.describe {
			padding-bottom: 0.18rem;
		}

		.value {
			span {
                color: #009d81;
				&::before {
					content: attr(data-unit);
				}
			}
		}
	}

	.receive-btn {
		padding: 0.4375rem 1.21875rem;
		border-bottom-left-radius: .5rem;
		border-bottom-right-radius: .5rem;
		width: 3rem;
		background: #009d81;
		color: #ffffff;
		font-size: 0.875rem;
		min-width: 5rem;
		box-sizing: border-box;
		text-align: center;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
        width: 100%;
		&.disable {
			pointer-events: none;
			color: #707070;
			background: #3E3E3E;
		}
	}

	.flex {
		flex: 1;
		justify-content: space-between;
	}

	@include pc {
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap: 32px;
		grid-row-gap: 32px;

		.flex {
			align-items: flex-start;
			flex-direction: column;
			height: 160px;
			padding-left: 16px;
			padding-right: 32px;
		}

		.task {
			margin: 0;
			padding: 0;
			height: 226px;
			box-sizing: border-box;

			.task-info {
				margin: 0;
				padding: 0;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100px;
			}

			.name {
				margin: 0;
				padding: 0;
				font-size: 24px;
			}

			.describe {
				margin: 0;
				padding: 0;
				font-size: 20px;
			}

			.value {
				font-size: 20px;
			}
		}

		.task-btn,
		.receive-btn {
			height: 44px;
			font-size: 20px;
			min-width: 100%;
		}
	}

}

.task-btn {
	color: #FFF;
	font-size: 0.875rem;
	min-width: 5rem;
	border-radius: 0.5rem;
}




.select-option {
	overflow: hidden;
	height: 0;
	position: absolute;
	top: 104px;
	right: 0;
	background-color: transparent;
}

.option-team {
	min-width: 136px;
	height: 48px;
	padding: 8px 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
	background: #201C48;
	margin-top: 3px;
	color: #5B6DA1;
	font-size: 16px;
	font-weight: 400;
	cursor: pointer;
	box-sizing: border-box;
	border: 1px solid #292547;


	&:active,
	&.active {
		color: #0FF;
		background: #2E2C5E;
		border: 1px solid #2E2C5E;
	}

	&:hover {
		color: #0FF;
		background: #2E2C5E;
		border: 1px solid #2E2C5E;
	}
}

.option-team:active {
	color: #0FF;
	background: #2E2C5E;
}</style>
