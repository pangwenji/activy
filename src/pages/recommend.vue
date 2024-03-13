<template>
	<page :show-header="!isPc">
		<div class="content page-pading">
			<public-loading class="page-loading" v-if="isApiOk"></public-loading>
			<div v-show="!isApiOk">
				<div class="empty empty-card" :data-empty="$t('ui.empty')" v-show="!InviteList.length"></div>
				<div v-show="InviteList.length">
					<div class="card">
						<view class="title no-icon" v-if="isPc">
							{{ $t('recommend') }}
						</view>

						<view class="washing-card">

							<view class="washing-card-head">
								<div class="washing-card-head-k">
									<img class="washing-card-head-m pc" src="@/assets/new/recommend/peppc.png" mode="" />
									<img class="washing-card-head-m h5" src="@/assets/new/recommend/pep.png" mode="" />
									<view class="washing-card-head-num">
										<text class="washing-card-head-title">{{ $t('pageRecommend.totalNumber') }}</text>
										<text class="washing-card-head-mon">{{ totalNumber }}<span>{{ $t('pageRecommend.pip') }}</span></text>
									</view>
								</div>
							</view>

							<view class="washing-card-head">
								<div class="washing-card-head-k">
									<img class="washing-card-head-m m2" src="@/assets/new/recommend/money.png" mode="" />

									<view class="washing-card-head-num">
										<text class="washing-card-head-title">{{ $t('pageRecommend.totalRewards') }}</text>
										<text class="washing-card-head-mon"><span>{{ unit }}</span>{{ totalRewards }}</text>
									</view>
								</div>
								<border-gradient class="btn cl-btn"  :border="0" :bg-color="'#009d81'">
									<div class="washing-card-bottom-but" @click="$open('/recommend-record')">
										<public-loading v-show="isSubmit"></public-loading>
										<text v-show="!isSubmit">{{ $t('pageRecommend.record') }}</text>
									</div>
								</border-gradient>

							</view>

						</view>

						<div class="add-card h5">

							<div class="title-card">
								<div class="title-name">{{ $t('pageRecommend.endTime') }}</div>
								<div class="time-card">
									<span class="time-num">{{ kfTimeView.d[kfTimeView.d.length - 2] }}</span>
									<span class="time-num">{{ kfTimeView.d[kfTimeView.d.length - 1] }}</span>
									<span class="time-t">d</span>
									<span class="time-num">{{ kfTimeView.h[kfTimeView.h.length - 2] }}</span>
									<span class="time-num">{{ kfTimeView.h[kfTimeView.h.length - 1] }}</span>
									<span class="time-t">h</span>
									<span class="time-num">{{ kfTimeView.m[kfTimeView.m.length - 2] }}</span>
									<span class="time-num">{{ kfTimeView.m[kfTimeView.m.length - 1] }}</span>
									<span class="time-t">m</span>
									<span class="time-num">{{ kfTimeView.s[kfTimeView.s.length - 2] }}</span>
									<span class="time-num">{{ kfTimeView.s[kfTimeView.s.length - 1] }}</span>
									<span class="time-t">s</span>
								</div>
							</div>

							<div class="add-content">

								<div class="add-content-left">
									<div class="p1">
										{{ $t('pageRecommend.tips11') }}
									</div>
									<div class="p2">
										<span>{{ unit }}</span>{{ totalBonus }}
									</div>
								</div>

								<img class="add-content-right" src="@/assets/new/recommend/removebg-preview.png" alt="">
							</div>

						</div>

						<div class="task-card h5">
							<template v-for="v, i in InviteList" :key="i">
								<div class="task-team">
									<div class="task-left" :class="{
										's-c': i > 0 && InviteList[i - 1].is_receive > 0,
										's-h': i > 0 && InviteList[i - 1].is_receive === 0,
										'x-h': v.is_receive === 0 && i < InviteList.length - 1,
										'x-c': v.is_receive > 0 && i != InviteList.length - 1
									}">
										<img v-if="v.is_receive === 2" src="@/assets/new/recommend/lw1.png" alt="">
										<img v-if="v.is_receive === 1" src="@/assets/new/recommend/lw2.png" alt="">
										<img v-if="v.is_receive === 0" src="@/assets/new/recommend/lw3.png" alt="">
										<div><span>{{ unit }}</span>{{ v.is_receive > 1 ? v.bonus : '???' }}</div>
									</div>
									<div class="task-rigt">
										<div class="p1">
											<div class="p1-1">{{ $t('pageRecommend.task3') }}</div>
											<div class="p1-2">(<span>{{ v.reachNum }}</span>/{{ v.peopleNum }})</div>
										</div>
										<div class="p2">{{ $t('pageRecommend.task4', { num: v.peopleNum }) }}</div>
										<div class="p3">{{ $t('pageRecommend.task5') }}{{ v.conditions == 'bet' ?
											$t('pageRecommend.task6') : $t('pageRecommend.task7') }}:{{ unit }}{{
		v.task_money
	}}/{{ $t('pageRecommend.pip') }}
										</div>

										<div class="btn-card">
											<div class="diamond-ok-btn" v-if="v.is_receive === 2">
												<span>{{ $t('pageRecommend.task10') }}</span>
											</div>
											<div class="diamond-btn" v-if="v.is_receive === 1"
												@click="receiveActivity(v.activity_id, v.task_id)">
												<span>{{ $t('pageRecommend.task9') }}</span>
											</div>
											<div class="diamond-ok-btn" v-if="v.is_receive === 0">
												<span>{{ $t('pageRecommend.task9') }}</span>
											</div>
											<!-- <div class="diamond-get-btn" v-if="v.is_receive ===0" @click="$open('/share')">
										<span>去完成</span>
									</div> -->
										</div>
									</div>
								</div>
							</template>


						</div>

					</div>

					<div class="card h5">

						<view class="qr-card">
							<view class="url-box" v-if="userTeam && userTeam.domain">
								<view class="url-copy-team">
									<view class="url-copy-team-name">{{ $t('pageAgent.c1') }}</view>
									<view class="url-copy-team-view xx-btn">
										<text class="ellipsis">{{ userTeam.domain[0].url + '?invite_code=' +
											userTeam.inviteCode
										}}</text>
										<div class="copy-svg"
											@click="$copy(userTeam.domain[0].url + '?invite_code=' + userTeam.inviteCode)">
											<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33"
												viewBox="0 0 33 33" fill="none">
												<g opacity="0.9" clip-path="url(#clip0_1792_4186)">
													<path
														d="M10.1249 25.0559H22.1931V29.5559C22.1931 30.9059 21.0885 32.0105 19.7385 32.0105H3.17037C1.82037 32.0105 0.71582 30.9059 0.71582 29.5559V12.9877C0.71582 11.6377 1.82037 10.5332 3.17037 10.5332H7.67037V22.6014C7.67037 23.9514 8.77491 25.0559 10.1249 25.0559Z"
														fill="var(--SVG,#00FFFF)" />
													<path
														d="M32.2156 3.37447V19.9426C32.2156 21.2926 31.111 22.3972 29.761 22.3972H13.1928C11.8428 22.3972 10.7383 21.2926 10.7383 19.9426V3.37447C10.7383 2.02447 11.8428 0.919922 13.1928 0.919922H29.761C31.111 0.919922 32.2156 2.02447 32.2156 3.37447Z"
														fill="var(--SVG,#00FFFF)" />
												</g>
												<defs>
													<clipPath id="clip0_1792_4186">
														<rect width="32.7273" height="32.7273" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									</view>
								</view>
								<view class="url-copy-team">
									<view class="url-copy-team-name">{{ $t('pageAgent.c2') }}</view>
									<view class="url-copy-team-view xx-btn">
										<text class="ellipsis">{{ userTeam.inviteCode }}</text>
										<div class="copy-svg" @click="$copy(userTeam.inviteCode)">
											<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33"
												viewBox="0 0 33 33" fill="none">
												<g opacity="0.9" clip-path="url(#clip0_1792_4186)">
													<path
														d="M10.1249 25.0559H22.1931V29.5559C22.1931 30.9059 21.0885 32.0105 19.7385 32.0105H3.17037C1.82037 32.0105 0.71582 30.9059 0.71582 29.5559V12.9877C0.71582 11.6377 1.82037 10.5332 3.17037 10.5332H7.67037V22.6014C7.67037 23.9514 8.77491 25.0559 10.1249 25.0559Z"
														fill="var(--SVG,#00FFFF)" />
													<path
														d="M32.2156 3.37447V19.9426C32.2156 21.2926 31.111 22.3972 29.761 22.3972H13.1928C11.8428 22.3972 10.7383 21.2926 10.7383 19.9426V3.37447C10.7383 2.02447 11.8428 0.919922 13.1928 0.919922H29.761C31.111 0.919922 32.2156 2.02447 32.2156 3.37447Z"
														fill="var(--SVG,#00FFFF)" />
												</g>
												<defs>
													<clipPath id="clip0_1792_4186">
														<rect width="32.7273" height="32.7273" fill="white" />
													</clipPath>
												</defs>
											</svg>
										</div>
									</view>
								</view>
							</view>

						</view>
					</div>

					<!-- <div class="divider h5"></div> -->

					<div class="pc-card pc">
						<div class="left-card">

							<div class="top-card">

								<div class="add-card">
									<div class="title-card">
										<div class="title-name">{{ $t('pageRecommend.endTime') }}</div>
										<div class="time-card">
											<span class="time-num">{{ kfTimeView.d[kfTimeView.d.length - 2] }}</span>
											<span class="time-num">{{ kfTimeView.d[kfTimeView.d.length - 1] }}</span>
											<span class="time-t">d</span>
											<span class="time-num">{{ kfTimeView.h[kfTimeView.h.length - 2] }}</span>
											<span class="time-num">{{ kfTimeView.h[kfTimeView.h.length - 1] }}</span>
											<span class="time-t">h</span>
											<span class="time-num">{{ kfTimeView.m[kfTimeView.m.length - 2] }}</span>
											<span class="time-num">{{ kfTimeView.m[kfTimeView.m.length - 1] }}</span>
											<span class="time-t">m</span>
											<span class="time-num">{{ kfTimeView.s[kfTimeView.s.length - 2] }}</span>
											<span class="time-num">{{ kfTimeView.s[kfTimeView.s.length - 1] }}</span>
											<span class="time-t">s</span>
										</div>
									</div>

									<div class="add-content">

										<div class="add-content-left">
											<div class="p1">
												{{ $t('pageRecommend.tips11') }}
											</div>
											<div class="p2">
												<span>{{ unit }}</span>{{ totalBonus }}
											</div>
										</div>

										<img class="add-content-right" src="@/assets/new/recommend/removebg-preview.png"
											alt="">
									</div>
								</div>

								<div class="slider-card" v-if="InviteList.length > 0">
									<slider :invite="InviteList" @click-task="receiveActivity"></slider>
								</div>
							</div>


							<view class="qr-card">
								<view class="url-box">
									<view class="url-copy-team">
										<view class="url-copy-team-name">
											<img class="pc" src="@/assets/new/agent/link-one.png" alt="">

											<span>{{ $t('pageAgent.c1') }}</span>
										</view>
										<view class="url-copy-team-view xx-btn ds">
											<text class="ellipsis">{{ userTeam.domain[0].url + '?invite_code=' +
												userTeam.inviteCode
											}}</text>
											<div class="copy-svg"
												@click="$copy(userTeam.domain[0].url + '?invite_code=' + userTeam.inviteCode)">
												<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33"
													viewBox="0 0 33 33" fill="none">
													<g opacity="0.9" clip-path="url(#clip0_1792_4186)">
														<path
															d="M10.1249 25.0559H22.1931V29.5559C22.1931 30.9059 21.0885 32.0105 19.7385 32.0105H3.17037C1.82037 32.0105 0.71582 30.9059 0.71582 29.5559V12.9877C0.71582 11.6377 1.82037 10.5332 3.17037 10.5332H7.67037V22.6014C7.67037 23.9514 8.77491 25.0559 10.1249 25.0559Z"
															fill="var(--SVG,#00FFFF)" />
														<path
															d="M32.2156 3.37447V19.9426C32.2156 21.2926 31.111 22.3972 29.761 22.3972H13.1928C11.8428 22.3972 10.7383 21.2926 10.7383 19.9426V3.37447C10.7383 2.02447 11.8428 0.919922 13.1928 0.919922H29.761C31.111 0.919922 32.2156 2.02447 32.2156 3.37447Z"
															fill="var(--SVG,#00FFFF)" />
													</g>
													<defs>
														<clipPath id="clip0_1792_4186">
															<rect width="32.7273" height="32.7273" fill="white" />
														</clipPath>
													</defs>
												</svg>
											</div>
										</view>
									</view>
									<view class="url-copy-team">
										<view class="url-copy-team-name">
											<img class="pc" src="@/assets/new/agent/pay-code-two.png" alt="">
											<span>{{ $t('pageAgent.c2') }}</span>
										</view>
										<view class="url-copy-team-view xx-btn ds">
											<text class="ellipsis">{{ userTeam.inviteCode }}</text>
											<div class="copy-svg" @click="$copy(userTeam.inviteCode)">
												<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33"
													viewBox="0 0 33 33" fill="none">
													<g opacity="0.9" clip-path="url(#clip0_1792_4186)">
														<path
															d="M10.1249 25.0559H22.1931V29.5559C22.1931 30.9059 21.0885 32.0105 19.7385 32.0105H3.17037C1.82037 32.0105 0.71582 30.9059 0.71582 29.5559V12.9877C0.71582 11.6377 1.82037 10.5332 3.17037 10.5332H7.67037V22.6014C7.67037 23.9514 8.77491 25.0559 10.1249 25.0559Z"
															fill="var(--SVG,#00FFFF)" />
														<path
															d="M32.2156 3.37447V19.9426C32.2156 21.2926 31.111 22.3972 29.761 22.3972H13.1928C11.8428 22.3972 10.7383 21.2926 10.7383 19.9426V3.37447C10.7383 2.02447 11.8428 0.919922 13.1928 0.919922H29.761C31.111 0.919922 32.2156 2.02447 32.2156 3.37447Z"
															fill="var(--SVG,#00FFFF)" />
													</g>
													<defs>
														<clipPath id="clip0_1792_4186">
															<rect width="32.7273" height="32.7273" fill="white" />
														</clipPath>
													</defs>
												</svg>
											</div>
										</view>
									</view>
								</view>

							</view>

						</div>
						<div class="right-card">
							<div class="right-title">{{ $t('pageRecommend.task1') }}</div>
							<div class="right-min-title">{{ $t('pageRecommend.task2') }}</div>

							<div class="task-card">
								<template v-for="v in InviteList">
									<div class="task-team">
										<div class="task-left">
											<div class="chart" ref="chart" :data-task="v.peopleNum"
												:data-complete="v.reachNum">
											</div>
										</div>
										<div class="task-rigt">
											<div class="p1">
												<div class="p1-1">{{ $t('pageRecommend.task3') }}</div>
											</div>
											<div class="p2">{{ $t('pageRecommend.task4', { num: v.peopleNum }) }}</div>
											<div class="p3">{{ $t('pageRecommend.task5') }}{{ v.conditions == 'bet' ?
												$t('pageRecommend.task6') : $t('pageRecommend.task7') }}:{{ unit }}{{
		v.task_money
	}}/人
											</div>
										</div>
										<div class="end" :class="{ 'wc': v.is_receive == 2 }">
											{{ $t('pageRecommend.task8') }}<span v-if="v.is_receive != 2">？？？</span><span
												v-else>{{ v.bonus }}</span>
										</div>
									</div>
								</template>

							</div>


						</div>
					</div>
				</div>


				<public-page-footer class="pc"></public-page-footer>
			</div>


		</div>
	</page>
</template>

<script setup lang="ts">
import page from '../components/page.vue'
import Slider from '../components/slider.vue'
import PublicLoading from '../components/public-loading.vue'
import PublicPageFooter from "../components/public-page-footer.vue"
import BorderGradient from "../components/border-gradient.vue"
import { ref, reactive, computed, nextTick, onUnmounted } from "vue"
import { addListener, dbGet } from "../uilts/db";
import { isPc, restMoney, rootFontSize, unit } from "../uilts/async.var";
import { hint, alert } from "../uilts/ui";
import { t } from "../uilts/i18n";
import { back, onLoad, onShow } from "../router/routes";
import * as echarts from 'echarts'

const chart = ref();
const isApiOk = ref<boolean>(true)
const InviteList = reactive<Array<taskData>>([]);
const isSubmit = ref<boolean>(false)
const totalRewards = ref<string>("0")
const totalNumber = ref<number>(0)
const totalBonus = ref<string>("0")
const userTeam = reactive<{ domain: Array<any>, inviteCode: string }>({
	domain: [{
		url: ''
	}], inviteCode: ''
})

let chartEls: Array<{
	option: any;
	el: echarts.ECharts
}> = [];
const refreshChart = () => {
	let width = document.documentElement.clientWidth;
	for (let c of chartEls) {
		c.option.title.textStyle.fontSize = (((width <= 9999) ? width : 375) / 23.4375) * 0.625;
		c.el.setOption(c.option, true)
		c.el.resize();
	}
}
const charts = () => {
	// console.log(chart.value);

	for (let c of chart.value) {
		let myChart = echarts.init(c);
		let option = {
			tooltip: {
				show: false
			},
			title: {
				text: c.dataset.complete + "/" + c.dataset.task,
				left: 'center',
				top: 'center',
				textStyle: {
					color: "#B5EBFF",
					fontSize: rootFontSize.value * 0.625,
					fontFamily: 'Akrobat-ExtraBold'
				}
			},
			color: [
				"#00FFFF",
				"#181538",
			],
			series: [
				{
					hoverAnimation: false,
					label: {
						show: false,
					},
					type: 'pie',
					radius: ['90%', '75%'],
					startAngle: 135,
					data: [
						{ value: c.dataset.complete, name: 'Direct' },
						{ value: c.dataset.task - c.dataset.complete, name: 'Search Engine' },
					]
				}
			]
		};
		chartEls.push({
			option: option,
			el: myChart
		});
		myChart.setOption(option, true)
	}
}



//领取活动奖励
const receiveActivity = (activity_id: number, task_id: number) => {
	if (isSubmit.value) return false;
	isSubmit.value = true
	'/api/activity/receive'.POST<ActivityReceive>({
		activity_id,
		task_id
	}, {
		Authorization: async () => await dbGet('token')
	}).then(_ret => {
		restMoney.value = !restMoney.value
		getInviteActivity()
		hint(t('pageAgentPromotion.success'))
	}).finally(() => {
		isSubmit.value = false;
	})
}
const kfTime = ref(0);
setInterval(() => {
	kfTime.value = (new Date(kfTime.value).getTime() - 1);
}, 1000)


const kfTimeView = computed<{
	d: string,
	h: string,
	m: string,
	s: string,
}>(() => {
	let t = kfTime.value;
	return {
		d: "0" + Math.floor(t / 60 / 60 / 24),
		h: "0" + Math.floor(t / 60 / 60 % 24),
		m: "0" + Math.floor(t / 60 % 60),
		s: "0" + Math.floor(t % 60),
	};
})



let Invite: Promise<GetInviteActivity["response"]>;
const getInviteActivity = () => {
	Invite && Invite.abort();
	Invite = '/api/activity/getInviteActivity'.GET<GetInviteActivity>(null, {
		Authorization: async () => await dbGet('token')
	})
	Invite.then(ret => {
		// console.log(ret.end_time * 1000);
		// console.log(new Date().getTime());

		kfTime.value = (ret.end_time * 1000 - new Date().getTime()) / 1000
		// console.log(kfTime.value);

		totalRewards.value = ret.receiveMoney
		totalNumber.value = ret.recommendNum
		totalBonus.value = ret.totalBonus
		userTeam.domain = ret.inviteLink;
		userTeam.inviteCode = ret.inviteCode;
		InviteList.length = 0
		ret.taskData.forEach((v) => {
			InviteList.push(v)
		})
		nextTick(() => {
			// console.log(InviteList);

			charts();
		})
	}).finally(() => {
		isApiOk.value = false;

	}).catch(() => {
		isApiOk.value = true;
		alert({ title: '', content: t('pageRecommend.alert') }).then(async () => {
			back(-1)
		})
	})
}

const init = () => {
	getInviteActivity()
}


onUnmounted(() => {

	window.removeEventListener('resize', refreshChart)
})
onLoad(() => {
	init();
	addListener('language', (type, _name) => {
		if (type === 'set') {
			init();
		}
	})
})
onShow(() => {
	isApiOk.value = true;
	init();
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
@import "@/assets/font/font.css";
.page-pading{
	background-color: rgb(31, 31, 31);
}
.empty-card {
	height: 68vh;
}

.top-card {
	background-color: #1D1A3F;
	border-radius: 24px;

	.slider-card {
		padding: 40px 0;
	}

	margin-bottom: 24px;
}

.pc-card {
	padding: 35px 24px;
	margin-top: 30px;
	border-radius: 24px;
	background: #19173A;
	display: flex;
	justify-content: space-between;

	.left-card {
		width: calc(50% - 12px);
	}

	.right-card {
		width: calc(50% - 60px);
		padding: 24px;
		border-radius: 24px;
		border: 1px solid #292547;
		margin-left: 24px;

		.right-title {
			color: #8E90CD;
			font-family: PingFang SC;
			font-size: 20px;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
			padding-bottom: 8px;
		}

		.right-min-title {
			color: #8E90CD;
			font-family: PingFang SC;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}


		.chart {
			width: 5.30625rem;
			height: 5.30625rem;

			@include pc {

				width: 100px;
				height: 100px;

			}
		}
	}
}

.task-card {
	padding: 1.5625rem 0 0.6250rem;

	@include pc {
		padding: 0;
	}

	.task-team {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.3125rem;
		position: relative;
		overflow: hidden;

		@include pc {
			background-color: #201E47;
			margin-top: 16px;
			border-radius: 8px;

			.end {
				color: #0FF;
				text-align: center;
				font-family: PingFang SC;
				font-size: 20px;
				font-style: normal;
				font-weight: 900;
				line-height: normal;
				margin-left: auto;
				height: 80px;
				display: flex;
				align-items: center;

				&.wc {
					background: url(@/assets/new/recommend/ds.png);
					background-repeat: no-repeat;
					background-size: 80px;
				}
			}
		}

		.task-left {
			color: #B5EBFF;
			width: 4.0000rem;
			margin-right: 0.6250rem;
			justify-content: center;
			text-align: center;
			height: inherit;

			@include pc {
				width: 100px;
				height: 100px;
			}

			&.x-c::after {
				content: "";
				position: absolute;
				width: 0.1250rem;
				height: 40%;
				background: linear-gradient(180deg, rgba(0, 255, 255, 0.70) 0%, rgba(255, 146, 255, 0.70) 99.77%);
				left: 2.1rem;
				transform: translateX(-50%);
			}

			&.x-h::after {
				content: "";
				position: absolute;
				width: 0.1250rem;
				height: 40%;
				background: rgba(255, 255, 255, 0.05);
				left: 2.1rem;
				transform: translateX(-50%);
			}

			&.s-c::before {
				content: "";
				position: absolute;
				top: 0;
				left: 2.1rem;
				width: 0.1250rem;
				height: 30%;
				background: linear-gradient(180deg, rgba(0, 255, 255, 0.70) 0%, rgba(255, 146, 255, 0.70) 99.77%);
				transform: translateX(-50%);
			}

			&.s-h::before {
				content: "";
				position: absolute;
				top: 0;
				left: 2.1rem;
				width: 0.1250rem;
				height: 30%;
				background: rgba(255, 255, 255, 0.05);
				transform: translateX(-50%);
			}

			img {
				width: 1.8750rem;
				height: 1.8750rem;
			}

			div {
				font-family: DIN Medium;
				font-size: 0.8750rem;
				font-style: normal;
				font-weight: 500;
				line-height: normal;

				span {
					font-size: 0.6250rem;
				}
			}
		}

		.task-rigt {
			width: calc(100% - 4.6250rem - 1.8750rem);
			padding: 0.9375rem;
			color: #FFFFFF;
			border-radius: 0.5000rem;
			// background: #201E47;
background: #494949;
			@include pc {
				background: none;
				width: auto;
			}

			.p1 {
				display: flex;
				justify-content: space-between;
				font-size: 0.8750rem;

				.p1-1 {
					@include pc {
						color: #8E90CD;
						font-family: PingFang SC;
						font-size: 20px;
						font-style: normal;
						font-weight: 700;
						line-height: normal;
						padding-bottom: 16px;
					}
				}

				.p1-2 {
					color: #FFFFFF;

					span {
						color: #FFFFFF;
					}

				}
			}

			.p2 {
				font-size: 0.7500rem;
				padding: 0.2500rem 0;
				font-weight: 300;

				@include pc {
					color: var(--MENU, #8E90CD);
					font-family: PingFang SC;
					font-size: 14px;
					font-style: normal;
					font-weight: 700;
					line-height: normal;
				}
			}

			.p3 {
				font-size: 0.7500rem;
				font-weight: 300;

				@include pc {
					color: var(--MENU, #8E90CD);
					font-family: PingFang SC;
					font-size: 14px;
					font-style: normal;
					font-weight: 700;
					line-height: normal;
				}
			}

			.btn-card {
				display: flex;
				justify-content: center;
				padding: 0.6250rem 0 0;

				.diamond-ok-btn {
					color: #FFFFFF;
					width: 6.8750rem;
					height: 1.9750rem;

					border-radius: 6px;
					position: relative;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					transform: skew(-5deg);
					font-size: 14px;
					color: #707070;
			background: #3E3E3E;
					span {
						transform: skew(5deg);
					}

					&::before {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						// background-image: radial-gradient(#90ffff, rgba(0, 224, 255, 0.00));
					}
				}

				.border-gradient-btn {
					transform: skew(-5deg);

				}

				.diamond-get-btn {
					color: #FFFFFF;
					width: 6.8750rem;
					height: 1.9750rem;
					border-radius: 6px;

					--bg: linear-gradient(to right, #201E47 39%, #201E47 100%);
					--border: linear-gradient(to right, #626FFF, #B4C9FF, #97B9FF, #FFFFFF, #97B9FF, #B4C9FF, #626FFF 100%);

					// margin-right: 5px;
					border: 1px solid transparent;
					background-image: var(--bg), var(--border);
					background-origin: border-box;
					background-clip: content-box, border-box;
					border-radius: 6px;
					box-shadow: 0px 2px 2px 0px rgba(255, 107, 218, 0.15);
					border-bottom: 3px solid transparent;
					transform: skew(-5deg);
					position: relative;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					// transform: skew(-5deg);
					font-size: 14px;

					span {
						transform: skew(5deg);
					}

					&::before {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						// background-image: radial-gradient(#90ffff, rgba(0, 224, 255, 0.00));
					}
				}

				.diamond-btn {

					color: #FFFFFF;
					width: 6.8750rem;
					height: 1.9750rem;
					// background-image: linear-gradient(180deg, #7368ff, #5f6fff 63%, #7084ff 100%);
					// border: 0.5px solid;
					// border-image: linear-gradient(180deg, #b7f2ff, #cae9ff 47%, #bae2ff 100%) 1 1;
					border-radius: 6px;
					// box-shadow: 0px 0px 10px 0px #ffffff inset;
					position: relative;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					transform: skew(-5deg);
					font-size: 14px;
					background: #009d81;
					span {
						transform: skew(5deg);
					}

					&::before {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						// background-image: radial-gradient(#90ffff, rgba(0, 224, 255, 0.00));

					}
				}


			}

		}
	}
}



.add-card {
	background-color: #1e2543;
	background: #494949;
	padding: 0.6250rem 0.6250rem;
	position: relative;
	border-radius: 0.5rem;
	background-image: linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0.16%, rgba(255, 146, 255, 0.1) 99.84%);

	@include pc {
		background-color: #201E47;
		border-radius: 24px 24px 0px 0px;
		padding: 0;
	}

	&::before {
		@include h5 {
			content: "Referral Rewards";
			position: absolute;
			bottom: 0.9375rem;
			color: var(--MENU, #8E90CD);
			font-family: Alibaba PuHuiTi 2.0;
			font-size: 0.3125rem;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			letter-spacing: 1.1187rem;
			text-transform: uppercase;
			left: 0.9375rem;
		}

	}

	.title-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0.6250rem;
		border-bottom: 1px solid #362d4e;

		@include pc {
			height: 80px;
			background: rgba(32, 30, 71, 1);
			border-radius: 24px 24px 0px 0px;
			justify-content: center;
		}

		.title-name {
			color: #FFFFFF;
			font-family: PingFang SC;
			font-size: 0.7500rem;
			font-style: normal;
			font-weight: 400;
			line-height: normal;

			@include pc {
				font-size: 20px;
				padding-right: 20px;
			}
		}

		.time-card {
			display: flex;
			align-items: center;

			span {
				margin-left: 0.1875rem;
			}

			.time-t {
				color: #FFFFFF;
				text-align: center;
				font-family: Montserrat;
				font-size: 0.8750rem;
				font-style: normal;
				font-weight: 300;
				line-height: normal;

				@include pc {
					font-size: 26px;
				}
			}

			.time-num {
				display: flex;
				justify-content: center;
				padding: 0.2188rem 0;
				width: 1rem;
				background: #342A35;
				border-radius: 0.1563rem;
				color: #FFFFFF;
				text-align: center;
				font-family: DS-Digital;
				font-size: 1.1250rem;
				font-style: normal;
				font-weight: 700;
				line-height: normal;

				@include pc {
					width: 25px;
					font-size: 36px;
					background: #3A3276;
				}
			}
		}
	}

	.add-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.3125rem;
		position: relative;

		&::after {
			content: "Rew ards";
			position: absolute;
			opacity: 0.05;
			color: var(--MENU, #8E90CD);
			font-family: Alibaba PuHuiTi 2.0;
			font-size: 3.7500rem;
			font-style: normal;
			font-weight: 1000;
			line-height: 84.7%;
			/* 101.64px */
			text-transform: uppercase;

			@include pc {
				font-size: 120px;
			}
		}

		@include pc {
			padding: 0 30px;
			min-height: 332px;
			overflow: hidden;
		}


		.add-content-left {
			.p1 {
				color: #FFFFFF;
				font-family: Alibaba PuHuiTi 2.0;
				font-size: 1.0000rem;
				font-style: normal;
				font-weight: 600;
				line-height: normal;

				@include pc {
					font-size: 32px;
				}
			}

			.p2 {
				padding-top: 0.3125rem;
				color: #0FF;
				font-family: DIN;
				font-size: 2.6563rem;
				font-style: normal;
				font-weight: 700;

				@include pc {
					font-size: 85px;

				}

				span {
					font-size: 1.1875rem;

					@include pc {
						font-size: 38px;
					}
				}
			}
		}

		.add-content-right {
			width: 7.5625rem;
			height: 7.5625rem;

			@include pc {
				width: 260px;
				height: 260px;
			}
		}
	}
}

.content {
	min-height: 100vh;

	// padding: 1.5625rem 0 1.5rem;
	@include pc {
		// padding: 56px 66px;
	}
}


.card {
	padding: 0 0 0;

	@include pc {
		padding: 0;
	}
}

.page-loading {
	@include h5 {
		margin-top: 100%;
	}

	@include pc {
		padding-top: 20%;
		// margin-top: 100%;
	}
}

.card-box {
	width: 100%;
}

.title {
	font-size: 1.0000rem;
	color: #FFFFFF;
	font-weight: bold;
	padding: 0;
	position: relative;
	// height: 4.6875rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	@include pc {
		color: #8E90CD;
		font-family: PingFang SC;
		font-size: 20px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		padding-bottom: 24px;
	}

	.picker {
		position: absolute;
		right: 0;
		top: -0.3125rem;
	}

	.vip-list {
		top: -0.3125rem;
		font-size: 0.7813rem;
		font-weight: 500;
		background-color: #2d2d35;
		width: 6.2500rem;
		height: 1.8750rem;
		text-align: center;
		line-height: 1.8750rem;

		.right-icon {
			transform: rotate(90deg);
			position: absolute;
			right: 0.4688rem;
			top: 0.4375rem;
		}
	}
}

.washing-card {
	padding: 0.6250rem 0;
	// margin: 0.9375rem 0.0000rem 0.9375rem;
	// background-color: #1C1E22;
	border-radius: 0.1084rem;

	@include pc {
		border-radius: 24px;
		background: #1D1A3F;
		display: flex;
		padding: 32px 24px;
	}

	.washing-card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 3.125rem;
		border-radius: 0.5rem;
		background: #494949;

		@include pc {
			width: 50%;
			background: transparent;
		}

		.cl-btn {
			border-radius: 0.25rem;
            margin-right: 12px;
			@include pc {
				border-radius: 8px;
			}
		}

		.washing-card-head-k {
			display: flex;
			align-items: center;

			@include pc {
				padding: 0;
			}
		}

		.washing-card-head-m {
			width: 1.5625rem;
			height: 1.875rem;
			margin-right: 0.62rem;
			margin-left: 1.63rem;

			@include pc {
				width: 74px;
				height: 60px;

				&.m2 {
					width: 80px;
					margin-right: 30px;
					margin-left: 0;
				}
			}
		}

		&~.washing-card-head .washing-card-head-m {
			width: 2.3125rem;
			height: 1.875rem;
			margin-left: 1.25rem;
			margin-right: 0.5rem;

			@include pc {
				width: 74px;
				height: 60px;
				margin-right: 30px;
				margin-left: 0;
			}
		}

		.washing-card-head-num {
			text {
				display: block;
			}

			.washing-card-head-title {
				color: var(--TAB-, #5B6DA1);
				color: #ffffff;
				font-family: PingFang SC;
				font-size: 0.7500rem;
				font-style: normal;
				font-weight: 400;
				line-height: normal;

				@include pc {
					font-size: 14px;
				}
			}

			.washing-card-head-mon {
				color: #FFF;
				font-family: DIN Medium;
				font-size: 1.0000rem;
				font-style: normal;
				font-weight: 500;

				@include pc {
					font-size: 30px;
				}

				span {

					font-family: SF Pro;
					font-size: 0.6875rem;
					font-style: normal;
					font-weight: 274;

					@include pc {
						font-size: 14px;
					}
				}

			}
		}

		&.border-none {
			border: none;
			margin-top: 1.4063rem;
			padding-bottom: 0.3125rem;

			.washing-card-head-mon {
				color: #FFF;
				font-family: DIN Medium;
				font-size: 1.0000rem;
				font-style: normal;
				font-weight: 500;

				span {

					font-family: SF Pro;
					font-size: 0.6875rem;
					font-style: normal;
					font-weight: 274;

				}
			}
		}

		.washing-card-bottom-but {
			width: 4.2500rem;
			height: 1.5625rem;
			flex-shrink: 0;
			text-align: center;
			display: flex;
			align-items: center;
			border-radius: 0.3125rem;
			justify-content: center;
			color: #FFFFFF;
			font-size: 0.6875rem;

			@include pc {
				width: 130px;
				height: 44px;
				border-radius: 8px;
				font-size: 20px;
			}
		}

		&:last-child {
			margin-top: 0.5000rem;
		}
	}

	.washing-card-bottom {
		padding: 1.0625rem 0 0.6250rem;
		margin-left: 1.0938rem;
		margin-right: 1.0938rem;
		display: flex;

		.washing-card-bottom-nao {
			text {
				display: block;
			}

			.washing-card-bottom-nao-num {
				font-size: 1.5625rem;
				color: #65BE3D;
			}

			.washing-card-bottom-nao-title {
				font-size: 1.0313rem;
				color: #FFFFFF;
			}
		}

		.washing-card-bottom-button {
			width: 4.2500rem;
			height: 1.5625rem;
			flex-shrink: 0;
			text-align: center;
			display: flex;
			align-items: center;
			border-radius: 0.3125rem;

		}

	}
}

.miss-card {
	background-color: #24262b;
	// width: calc(100% - 0.9375rem);
	margin: 0 0 1.0938rem;
	padding-bottom: 0.9375rem;
	border-radius: 0.3125rem;

	.miss-title {
		padding: 0 0.9375rem;
		// background-color: #3e4147;
		// background-image: url(@/assets/recommend/3.png);
		background-repeat: no-repeat;
		background-size: auto;
		background-position: 0.7813rem;
		display: block;
		// width: 100%;
		border-top-left-radius: 0.3125rem;
		border-top-right-radius: 0.3125rem;
		// height: 4.6250rem;
		font-size: 0.8750rem;
		color: #FFFFFF;
		// margin-left: 1.4063rem;
		padding-top: 0.9375rem;
		// padding-bottom: 0.9375rem;
		// text-indent: 3.1250rem;
	}

	.miss-bottom {
		padding: 0 0.9375rem;
	}

	.miss-intro {
		width: 60%;
		font-size: 0.7813rem;
		color: #9BA6B3;
		margin-left: 1.4063rem;
		margin-top: 0.9375rem;
	}

	.miss-team {
		width: 60%;
		// margin-top: 0.9375rem;
		// margin-left: 1.4063rem;
		padding: 0.4688rem 0;
		display: flex;
		// justify-content: space-around;

		font-size: 0.7813rem;
		color: #9BA6B3;

		.left {
			color: #FFFFFF;
			margin-left: auto;
		}

		.lm {
			color: #d0a608 !important;
		}

		.white {
			color: #FFFFFF;
		}
	}
}

.button-b {
	width: 100%;
	height: 2.3438rem;
	background-color: #303239;
	font-weight: bold;
	color: #828B97;
	font-size: 0.7813rem;
	line-height: 2.3438rem;
	border-radius: 0.1250rem;
	margin-top: 0.9375rem;
	text-align: center;
}

.button-f {
	width: 85%;
	height: 2.3438rem;
	background-color: #2AE035;
	font-weight: bold;
	color: #000000;
	font-size: 0.7813rem;
	line-height: 2.3438rem;
	border-radius: 0.1250rem;
	margin-top: 0.9375rem;
	text-align: center;
}


.miss2 {
	background-position: 100% 60%;
	background-repeat: no-repeat;
	background-size: 100%;
	background-image: url('@/assets/vip/1.png');
}

.miss1 {

	background: #1C1E22 url(@/assets/recommend/team/1.png) no-repeat right 20%;
	background-size: auto 60%;

	// background-image: url('@/assets/vip/vip1.png');
	&:nth-child(9n+2) {
		background-image: url(@/assets/recommend/team/2.png);
	}

	&:nth-child(9n+3) {
		background-image: url(@/assets/recommend/team/3.png);
	}

	&:nth-child(9n+4) {
		background-image: url(@/assets/recommend/team/4.png);
	}

	&:nth-child(9n+5) {
		background-image: url(@/assets/recommend/team/5.png);
	}

	&:nth-child(9n+6) {
		background-image: url(@/assets/recommend/team/6.png);
	}

	&:nth-child(9n+7) {
		background-image: url(@/assets/recommend/team/7.png);
	}

	&:nth-child(9n+8) {
		background-image: url(@/assets/recommend/team/8.png);
	}

	&:nth-child(9n+9) {
		background-image: url(@/assets/recommend/team/9.png);
	}
}

.title.no-icon {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.picker {
		position: assets;
	}

	.vip-list {
		width: 9.4375rem;
		height: 2.3750rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.6250rem;

		.right-icon {
			position: assets;
		}
	}
}

// .card-box-list {
// 	background-color: #1C1E22;
// 	padding: 0.9375rem 0 0.0000rem;
// }

.ad-card {
	padding: 0 1.0625rem;
	display: flex;
	justify-content: space-between;
	// background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
	background: #222343;
	border-radius: 0.5000rem;
	position: relative;

	.ddk {
		position: absolute;
		// text-align: center;
		bottom: 0.8125rem;
		color: var(--MENU, #8E90CD);
		font-family: Alibaba PuHuiTi 2.0;
		// font-size: 0.7500rem;
		font-size: 0.3125rem;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 1.1187rem;
		text-transform: uppercase;
		// transform: scale(0.416);
	}

	.ad-card-text {
		width: 50%;
		padding-top: 1.3438rem;

		.p1 {
			color: var(--TAB-3, #FFF);
			font-family: PingFang SC;
			font-size: 0.8750rem;
			font-style: normal;
			font-weight: 600;
			line-height: normal;
		}

		.p2 {
			color: var(--MENU, #8E90CD);
			padding-top: 0.9375rem;
			font-family: PingFang SC;
			font-size: 0.7500rem;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}
	}

	.ad-card-img {
		width: 7.5625rem;
		height: 7.5625rem;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.icon {
		width: 1.8750rem;
		margin-left: auto;
		cursor: pointer;
		fill: #9BA6B3;

		&:active {
			fill: #21DC2D;
		}
	}
}

.qr-card {
	// background-color: #1C1E22;
	// margin: 0.6250rem;
	// padding: 0.6250rem 0;
	border-radius: 0.1087rem;
	padding-top: 0.625rem;

	@include pc {
		border-radius: 24px;
		border: 1px solid #302B59;
		padding: 24px;

		.qr-title {
			color: #8E90CD;
			font-family: PingFang SC;
			font-size: 20px;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
			margin-bottom: 32px;
		}
	}

	.qr-card-view {
		padding-top: 0.6250rem;
		text-align: center;

		.uv-qrcode {
			margin: auto;
			// padding: 0.6250rem ;
			// background-color: #FFFFFF;
		}

		img {
			width: 7.7750rem;
			height: 7.7750rem;
		}

		.botton-view {
			margin-left: 1.0000rem;
			margin-right: 1.0000rem;
			display: flex;
			justify-content: space-around;
			margin-top: 1.2500rem;

			.button {
				// width: 8.9688rem;
				padding: 0 0.6250rem;
				height: 2.6563rem;
				border-radius: 0.1087rem;
				line-height: 2.6563rem;
				text-align: center;
				font-size: 0.7813rem;
				margin-left: 0;
				margin-right: 0;
				font-weight: bold;
			}

			.receber {
				@include button(#21DD2D);
			}


		}
	}
}

.url-copy-team {
	padding-bottom: 0.625rem;
	font-size: 0.7813rem;

	@include pc {
		padding-bottom: 20px;
		// background-color: #1D1A3F;
	}

	.url-copy-team-name {
		// color: var(--MENU, #8E90CD);
		color: #ffffff;
		padding-bottom: 0.4688rem;

		@include pc {
			color: var(--TAB-, #5B6DA1);
			font-family: PingFang SC;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 18px;
			padding-bottom: 12px;
			display: flex;
			align-items: center;

			img {
				width: 20px;
				height: 20px;
				margin-right: 12px;
			}

			/* 112.5% */
		}
	}


	.url-copy-team-view {
		color: var(--INPUT-TEXT, #B5EBFF);
		// line-height: 2.6250rem;
		display: flex;
		// text-indent: 0.9375rem;
		border-radius: 0.5000rem;
		align-items: center;

		@include h5 {
			padding: 0.6250rem;
			justify-content: space-between;
			// background: var(--INPUT, #231D4E);
			background: #494949;
		}

		@include pc {
			gap: 12px;

			&.ds {
				padding: 0.6250rem;
				justify-content: space-between;
				// background: var(--INPUT, #231D4E);
				background: #494949;
			}
		}

		text {
			width: calc(100% - 3.8750rem);

			@include pc {
				font-size: 16px;
				font-style: normal;
				font-weight: 500;
			}
		}

		.copy-svg {
			width: 1.8750rem;
			height: 1.8750rem;
			display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;
			background: #2E2C5E;
			border-radius: 0.3750rem;

			svg {
				width: 1.0313rem !important;
				height: 1.0313rem !important;
			}
		}

		.share-team {
			padding: 0.625rem 0;
			// display: flex;
			justify-content: center;
			text-align: center;
			width: 3.6250rem;

			@include pc {
				width: 80px;
				padding: 15px 0 20px;
				border-radius: 16px;
				background: #201E47;
			}

			svg {
				width: 1.8750rem;
				height: 1.8750rem;

			}

			span {
				display: block;
				color: var(--MENU, #8E90CD);
				font-family: PingFang SC;
				font-size: 0.5625rem;
				font-style: normal;
				font-weight: 300;
				line-height: normal;
				padding-top: 0.2500rem;

				@include pc {
					text-align: center;
					font-size: 14px;
				}
			}
		}
	}
}

@media (max-width: 9999px) {}

@media (max-width: 9999px) {}</style>
