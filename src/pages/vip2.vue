<template>
	<page :show-header="!isPc">
		<public-banner position="vip_banner" v-if="isPc"></public-banner>
		<view class="head-box" v-if='!isPc'>
			<user-top class="user-top-v"></user-top>
			<view class="level" v-if="userData?.next_user_group">
				<view class="level-name">{{$t('pageVip.tips')}}</view>
				<view class="level-value" v-if="userData.is_max_level == 1">{{$t('pageVip.levelD')}}</view>

				<view class="level-value" v-else>
					{{(numFilter(userData.next_user_group.level_condition - (userData.level_up_advance || 0)))}}
				</view>
			</view>
			<!-- <view class="btn" @click="$open('/pages/vipRecord/vipRecord')">
				{{$t('pageVip.btn')}}
			</view> -->
		</view>
		
		<view v-else class="head-box">
			<view>
				<view class="pc-user">
					<view class="user-head">
						<img :src="userInfo.portrait || userHead" mode="widthFix" />
					</view>
					<view class="user-content">
						<text class="user-name">{{userInfo.user_nick ? userInfo.user_nick : userInfo.username}}</text>
						<text class="user-id">User ID：{{ userInfo.id }}</text>
						<text class="user-level">VIP{{ userInfo.level }}</text>
					</view>
				</view>
				<view class="level-name">
					<text class="level-name-1">VIP1</text>
					<text class="level-name-2" :style="{'--progress-bar-width': '9.3750rem'}">300xp</text>
					<text class="level-name-3">VIP2</text>
				</view>
				<view :style="{'--progress-bar-width': '9.3750rem'}" class="progress-bar" ></view>
				<view class="level" v-if="userData?.next_user_group">
					<view class="level-name">
						<text v-if="userData?.is_max_level == 1"> {{$t('pageVip.levelD')}}</text>
						<text v-else>VIP2 {{$t('pageVip.tips')}} {{(numFilter(userData.next_user_group.level_condition - userData.level_up_advance))}}</text>
					</view>
					<view class="level-but">
						升级规则
					</view>
				</view>
			</view>
			<view class="vip-back">VIP{{ userInfo.level }}</view>
		</view>
		
		<public-banner position="vip_banner" v-if="!isPc"></public-banner>

		<!-- <view class="vip-menu">
			<view :class="{'vip-menu-sign':menu == 1}" @click="menu = 1">{{$t('pageVip.tab1')}}</view>
			<view :class="{'vip-menu-sign':menu == 2}" @click="menu = 2">{{$t('pageVip.tab2')}}</view>
		</view> -->

		<!-- <view v-if="menu == 1" class="card-box">
			<view class="title no-icon">
				{{$t('pageVip.tab1Title2')}}
				<view class="picker" @click="selectVipLevel">
					<view class="vip-list">
						<view>{{array[index]}}</view>
						<public-svg class="right-icon" :style="{width:32+'upx',fill:'#9ba6b2',height:32+'upx'}"
							icon="icon_Arrow"></public-svg>
					</view>
				</view>

			</view>
			<view class="card-box-list">
				<view class="miss-card miss1" v-for="v,i in gifList">
					<view class="miss-title">{{v.title}}</view>
					<view>
						<view class="miss-intro">{{v.desc}}</view>
						<view class="miss-team">
							<view>{{$t('pageVip.tab1Name2')}}</view>
							<view class="left">{{unit}}{{v.money}}</view>
						</view>
					</view>
					<button type="default" v-if="v.is_receive === 1"
						@click="receiveGif(list[index].id,v.task_id,v.money)"
						class="button-f">
						<text v-show="!isSubmit">{{$t('pageVip.tab1Button')}}</text>
						<public-loading v-show="isSubmit"></public-loading>
						
						</button>
					<button type="default" v-if="v.is_receive === 0"
						class="button-b">{{$t('pageVip.tab1ButtonBan')}}</button>
					<button type="default" v-if="v.is_receive === 2"
						class="button-b">{{$t('pageAgentPromotion.receiveOk')}}</button>

				</view>
			</view>


		</view> -->
		
		<view class="vip-introduce-card" v-if="isPc">
			<view class="vip-menu-card">
				<img class="title-icon" src="@/assets/vip/title-icon.png" alt="">
                <span>贵宾权益</span>
			</view>

            <div class="vip-btn">
                <div class="vip-btn-team btn-left">
                    <public-svg class="public-svg" icon="icon_Arrow"></public-svg>
                </div>
                <div class="vip-btn-team btn-right public-svg-selected">
                    <public-svg class="public-svg" icon="icon_Arrow"></public-svg>
                </div>
            </div>
		</view>

        <div class="equity-conetnt">
            <div class="equity-view">
                <public-grid class="grid" :max="3" :margin="30">

                <div class="equity-card vip-back1">
                    <div class="equity-card-title">VIP1晋级经验</div>
                    <div class="equity-card-bonus">
                        <span class="equity-card-bonus-title">奖金</span>
                        <span class="equity-card-bonus-number">R$10.00</span>
                    </div>
                </div>

                <div class="equity-card vip-back2">
                    <div class="equity-card-title">晋级奖励</div>
                    <div class="equity-card-bonus">
                        <span class="equity-card-bonus-title">奖金</span>
                        <span class="equity-card-bonus-number">R$10.00</span>
                    </div>
                </div>

                <div class="equity-card vip-back3">
                    <div class="equity-card-title">每日奖励</div>
                    <div class="equity-card-bonus">
                        <span class="equity-card-bonus-title">奖金</span>
                        <span class="equity-card-bonus-number">R$10.00</span>
                    </div>
                </div>

                <div class="equity-card vip-back4">
                    <div class="equity-card-title">每周奖励</div>
                    <div class="equity-card-bonus">
                        <span class="equity-card-bonus-title">奖金</span>
                        <span class="equity-card-bonus-number">R$10.00</span>
                    </div>
                </div>

                <div class="equity-card vip-back5">
                    <div class="equity-card-title">每月奖励</div>
                    <div class="equity-card-bonus">
                        <span class="equity-card-bonus-title">奖金</span>
                        <span class="equity-card-bonus-number">R$10.00</span>
                    </div>
                </div>

                <div class="equity-card vip-back6">
                    <div class="equity-card-title">每年奖励</div>
                    <div class="equity-card-bonus">
                        <span class="equity-card-bonus-title">奖金</span>
                        <span class="equity-card-bonus-number">R$10.00</span>
                    </div>
                </div>
				</public-grid>
                
            </div>
        </div>

        
		
		<view class="tel2" v-if="menu == 2 && !isPc">
			<view class="title no-icon">
				<text>{{$t('pageVip.tab2Title')}}</text>
			</view>
			<scroll-view class="table-scroll-view" :scroll-x="true">
				<view class="table-view">

					<view class="tabs">

						<view class="tabs-view">
							<public-loading class="loading" v-if="!list.length"></public-loading>
							<view class="table" v-else>
								<view class="table-row head">
									<view class="table-cell">{{$t('pageVip.tab2name1')}}</view>
									<view class="table-cell">{{$t('pageVip.tab2name2')}}</view>
									<view class="table-cell">{{$t('pageVip.tab2name21')}}</view>
									<view class="table-cell">{{$t('pageVip.tab2name22')}}</view>
									<view class="table-cell">{{$t('pageVip.tab2name3')}}</view>
									<view class="table-cell">{{$t('pageVip.tab2name4')}}</view>
									<view class="table-cell">{{$t('pageVip.tab2name5')}}</view>
									<view class="table-cell">{{$t('pageVip.tab2name6')}}</view>
									<view class="table-cell">{{$t('pageVip.tab2name7')}}</view>
								</view>
								<view class="table-row" v-for="item,index in list" :key="index">
									<view class="table-cell">
										<view>
											{{item.name}}
										</view>
									</view>
									<view class="table-cell">
										<view>
											{{item.level_condition}}
										</view>
									</view>
									<view class="table-cell">
										<view>
											{{item.bet_rate + '%'}}
										</view>
									</view>
									<view class="table-cell">
										<view>
											{{item.recharge_rate + '%'}}
										</view>
									</view>
									<view class="table-cell">
										<view>
											{{unit}}{{item.level_up_gift}}
										</view>
									</view>
									<view class="table-cell">
										<view>
											{{unit}}{{item.level_day_gift}}
										</view>
									</view>
									<view class="table-cell" :class="{add:index%2 === 0}">

										<view>
											<!-- <img src="@/assets/vip/w.png" mode="aspectFill" /> -->
											<text>{{unit}}{{item.level_week_gift}}</text>
										</view>
									</view>
									<view class="table-cell" :class="{add:index%2 === 0}">

										<view>
											<!-- <img src="@/assets/vip/w.png" mode="aspectFill" /> -->
											<text>{{unit}}{{item.level_month_gift}}</text>
										</view>
									</view>
									<view class="table-cell" :class="{add:index%2 === 0}">

										<view>
											<!-- <img src="@/assets/vip/w.png" mode="aspectFill" /> -->
											<text>{{unit}}{{item.level_year_gift}}</text>
										</view>
									</view>
								</view>

							</view>
							<!-- <view class="arrow" :class="{active:showMore}" @click="showMore = !showMore">
							Mostre mais
						</view> -->
						</view>
					</view>
				</view>
			</scroll-view>

		</view>
	</page>
</template>

<script setup lang="ts">
import Page from "../components/page.vue"
import PublicBanner from "../components/public-banner.vue"
import PublicLoading from "../components/public-loading.vue"
import PublicSvg from "../components/public-svg.vue"
import UserTop from "../components/user-top.vue"
import ScrollView from "../components/scroll-view.vue";
import PublicGrid from "../components/public-grid.vue"
import userHead from "@/assets/user/user.png"
import { onUnmounted, ref } from "vue";
import { addListener, dbGet, dbSet, removeListener } from "../uilts/db";
import { onLoad, onShow } from "../router/routes";
import { isPc, unit } from "../uilts/async.var";

	const list = ref<VipLevelRules["response"]>([])
	const menu = ref(2)
	const userData = ref<VipInfo["response"]["user"]>()
	const array = ref<Array<string>>([])
	const index = ref(0)
	const userInfo = ref<UserModel>({})
	//获取vip信息
	const getVipInfo = () => {
		'/api/vip/info'.GET<VipInfo>(null, {
			Authorization: async () => await dbGet('token')
		}).then(ret => {
			userData.value = ret.user
		})
	}
    

	const vipLevelRules = () => {
		'/api/vip/vipLevelRules'.GET<VipLevelRules>(null, {
			Authorization: async () => await dbGet('token')
		}).then(ret => {
			ret.forEach((v, i) => {
				list.value.push(v)
				if (v.level == userInfo.value.level) {
					index.value = i
				}
				array.value.push(v.name)
			})
		})
	}


	const numFilter = (value:number) => {
		let realVal = Number(value).toFixed(1)
		// console.log(realVal)
		return realVal
	}

	//获取用户信息
	const getInfo = () => {
		'/api/user/getInfo'.GET<GetInfo>(null, {
			Authorization: async () => await dbGet('token')
		}).then(async ret => {

			await dbSet("user", ret);
		})
	}
    const languageListener = (type:any, _name:any) => {
		if (type === 'set') {
			getVipInfo()
			vipLevelRules()
		}
	}
	
	onUnmounted(() => {
		removeListener('language', languageListener)
	})
	onLoad(() => {
		getVipInfo()
		vipLevelRules()
		addListener('language', languageListener)
		
	})
    onShow(() => {
		dbGet('user').then(user => {
			userInfo.value = user
			// console.log(userInfo.value);
		}).catch(() => {
			open('/pages/login/login')
		});
		getInfo()
	})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

    .vip-introduce-card{
        display: flex;
        justify-content: space-between;
        padding: 1.8750rem 0;
        .vip-menu-card{
            color: #FFFFFF;
            font-size: 16px;
            img{
                width: 1.0000rem;
                height: 0.7500rem;
                margin-right: 0.3250rem;
            }
        }

        .vip-btn{
            display: flex;
            .vip-btn-team{
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 5px;
                background-color: #32353B;
                fill: #74787E;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .public-svg{
                width: 16px;
                height: 16px;
                font-size: 16px;
                font-weight: 100;
            }

            .public-svg-selected{
                fill: #FFFFFF;
                background-color: #4B4F58;
            }

            .btn-left{
                transform: rotate(180deg);
                margin-right: 0.6125rem;
            }
        }
    }

    .equity-conetnt{
        padding: 1.8750rem;
        background-color: #2c2e34;
        border-radius: 5px;
    }

    .equity-view{
        .public-grid{
            grid-row-gap:1.4375rem;
        }
        .equity-card{

            border: 2px solid #4a4d55;
            border-radius: 5px;
            padding: 1.8750rem 3.1250rem;
            background-repeat: no-repeat;
            background-position: right;
            .equity-card-title{
                font-size: 18px;
                font-weight: bold;
                color: #F2BD02;
            }
            .equity-card-bonus{
                padding-top: 1.2500rem;
                font-size: 14px;
                .equity-card-bonus-title{
                    color: #9C9C9C;
                }

                .equity-card-bonus-number{
                   
                    color: #F2BD02;
                }
            }
        }

        .vip-back1{
            background-image: url(@/assets/vip/g1.png);
        }

        .vip-back2{
            background-image: url(@/assets/vip/g2.png);
        }

        .vip-back3{
            background-image: url(@/assets/vip/g3.png);
        }

        .vip-back4{
            background-image: url(@/assets/vip/g4.png);
        }

        .vip-back5{
            background-image: url(@/assets/vip/g5.png);
        }

        .vip-back6{
            background-image: url(@/assets/vip/g6.png);
        }
    }

	page {
		// padding-bottom: 3.1250rem;
		background-color: #24262A;
	}

	.table-scroll-view {
		width: 100%;
		background-color: #1C1E22;
	}

	.head-body {
		width: 100%;
		padding-top: 0.9375rem;
		padding-bottom: 0.3125rem;
		position: relative;

		.big-bola {
			width: 7.7750rem;
			height: 7.7969rem;
			left: 0.8438rem;
		}

		.min-bola {
			width: 5.3125rem;
			height: 5.3125rem;
			right: 0.6875rem;
			bottom: 0;
		}

		.user-top-v {
			margin-top: 1.5625rem;
		}

		&>img {
			position: absolute;
		}
	}

	.menu-card {
		margin-left: 0.7813rem;
		margin-right: 0.7813rem;
		background-color: #1C1E22;
		border-radius: 0.1087rem;
		margin-top: 0.6250rem;
		margin-bottom: 1.1250rem;
	}

	.vip-menu {
		margin-top: 1.0938rem;
		margin-left: 0.7813rem;
		margin-right: 0.7813rem;
		display: flex;
		justify-content: space-around;
		font-size: 0.7813rem;
		color: #9BA6B3;
		font-weight: bold;
		text-align: center;

		&>view {
			width: 48%;
			height: 1.9063rem;
			line-height: 1.9063rem;
			border-bottom: 0.0938rem solid #828282;
		}

		.vip-menu-sign {
			opacity: 1;
			background: linear-gradient(0deg, rgba(42, 224, 53, 0.3) 0%, rgba(42, 224, 53, 0) 100%);
			color: #FFFFFF;
			border-bottom: 0.0938rem solid #2AE035;
		}
	}

	.title {
		font-size: 1.0313rem;
		
		width: auto;
		color: #FFFFFF;
		font-weight: bold;
		text{
			background-color: #34363b;
			padding: 0.9375rem 0.9375rem;
			border-radius: 0.3125rem;
		}
		
		position: relative;
		height: 4.6875rem;
		display: flex;
		align-items: center;
		justify-content: space-between;

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

	.table-view {
		// display:inline-block;
		// margin-left: 0.7813rem;
		// margin-right: 0.7813rem;
		flex-wrap: nowrap;
		word-break: normal;
		white-space: nowrap;
		vertical-align: middle;
	}


	.tabs {
		background-color: var(--bgcolor);
		padding: 0.0000rem 0 0.6250rem;
		font-size: 0.7500rem;

		.tabs-scroll {
			// padding:0 0.6250rem;
			// height:2.9688rem;
			width: calc(100% - 1.2500rem);
			margin: 0 auto;
		}

		.tabs-navs {
			// margin:0 0.6250rem;
			display: flex;
			background-color: #24262A;
			white-space: nowrap;
			// overflow-x: auto;
			// justify-content: space-between;
		}

		.tabs-nav {
			flex-shrink: 0;
			width: 7.6875rem;
			height: 2.9688rem;
			@extend %flex-center;
			color: #98A7B5;
			background-color: #24262A;

			&.active {
				background-color: #2D3034;
				font-weight: 700;
				color: #f5f6f7;
			}
		}
	}

	.table {
		min-width: 100%;
		color: #98A7B5;
		font-size: 0.7500rem;
		text-align: center;
		font-weight: 600;
		.head{
		background-color: #282a30 !important;
			
		}
		.ellipsis {
			max-width: calc((100vw - 1.2500rem) / 4);
		}

		.table-cell {
			direction: unset;
			min-width: 20%;
			padding: 0 0.6250rem;
			height: 2.8750rem;
			vertical-align: middle;

			&:nth-child(1) {
				text-align: left;
				direction: ltr;
				padding-left: 0.6250rem;
			}

			&:last-child {
				text-align: right;
				// direction: rtl;
				padding-right: 0.6250rem;
			}
		}

		.table-row {
			// display: flex;
			cursor: pointer;

			&:not(.head):active {
				background-color: #2D3034;
			}

			&:not(.head) .table-cell {
				color: #98A7B5;

				&:last-child {
					position: relative;
					// color: #3BC117;
				}

				&:last-child::after {
					content: "";
					bottom: 0;
					right: 0;
					width: 3.1250rem;
					height: 0.3125rem;
					background-color: #2AE035;
				}

				// &:nth-child(2) {
				// 	color: #FFF;
				// }
			}

			img {
				width: 0.8125rem;
				height: 0.8125rem;
				display: inline-block;
				vertical-align: middle;
				margin-top: -0.3125rem;
			}
		}

		.head {
			color: #98A7B5;
			font-size: 0.7500rem;
			font-weight: normal;
		}
	}

	.loading {
		min-height: 9.3750rem;
	}

	.arrow {
		background-color: #24262A;
		width: 7.8125rem;
		height: 2.0000rem;
		@extend %flex-center;
		color: #9BA6B3;
		font-size: 0.8125rem;
		margin: 0 auto;
		margin-top: 0.6250rem;

		&::after {
			content: '';
			display: block;
			width: 0.7500rem;
			height: 0.5000rem;
			background: url(@/assets/index/arrow-bottom.png);
			background-size: 100%;
			margin-left: 0.8125rem;
		}

		&.active::after {
			transform: rotateX(180deg);
		}
	}

	.miss-card {
		background-color: #1C1E22;
		margin: 0 0.7813rem 1.0938rem;
		padding-bottom: 0.9375rem;

		.miss-title {
			font-size: 1.0313rem;
			color: #FFFFFF;
			margin-left: 1.4063rem;
			padding-top: 0.9375rem;
		}

		.miss-intro {
			width: 60%;
			font-size: 0.7813rem;
			color: #9BA6B3;
			margin-left: 1.4063rem;
			margin-top: 0.9375rem;
		}

		.miss-team {
			margin-top: 0.9375rem;
			margin-left: 1.4063rem;
			width: 60%;
			display: flex;
			// justify-content: space-around;

			font-size: 0.7813rem;
			color: #9BA6B3;

			.left {
				margin-left: auto;
			}

			.white {
				color: #FFFFFF;
			}
		}
	}

	.button-b {
		width: 85%;
		height: 2.3438rem;
		background-color: #24262A;
		font-weight: bold;
		color: #2AE035;
		font-size: 0.7813rem;
		line-height: 2.3438rem;
		border-radius: 0.1250rem;
		margin-top: 2.4063rem;
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
		margin-top: 2.4063rem;
	}


	.miss2 {
		background-position: 100% 60%;
		background-repeat: no-repeat;
		background-size: 100%;
		background-image: url('@/assets/vip/d1.png');
	}

	.miss1 {
		background: #1C1E22 url(@/assets/vip/vip1.png) no-repeat right center;
		background-size: auto 120%; 
		// background-image: url('@/assets/vip/vip1.png');
		&:nth-child(2) {
			background-image: url(@/assets/vip/vip2.png);
		}
		
		&:nth-child(3) {
			background-image: url(@/assets/vip/vip3.png);
		}
		&:nth-child(4) {
			background-image: url(@/assets/vip/vip4.png);
		}
		
		&:nth-child(5) {
			background-image: url(@/assets/vip/vip5.png);
		}
	}

	.head-box {
		--left-bg: url(@/assets/index/ball_2.2adeb099.png);
		--right-bg: url(@/assets/index/ball_3.21626868.png);
		border-radius: var(--border-radius);
		background: var(--left-bg), var(--right-bg);
		background-color: var(--bgcolor);
		background-repeat: no-repeat, no-repeat;
		background-size: auto 70%, auto 50%;
		background-position: 10% center, right 10% top;
		box-sizing: border-box;
	}

	.level {
		display: flex;
		color: #FFF;
		justify-content: space-between;
		padding: 0.6250rem;
		background-color: #1C1E22;
		margin: 0 0.6250rem;
		margin-top: 0.6250rem;
		font-size: 0.7500rem;

		.level-value {
			display: flex;
			align-items: center;
			color: #9BA6B3;
		}
	}

	.btn {
		display: none;
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
	
	.level-name{
		width: 33.7500rem;
		padding: 0 0.0000rem;
		margin: 0.6250rem 0.6250rem;
		display: flex;
		font-size: 0.7500rem;
		.level-name-1{
			color: #FEFEFF;
			
		}
		.level-name-2{
			color: #A6CC11;
			margin-left: calc(var(--progress-bar-width) - 2.6563rem);
			display: inline-block;
		}
		.level-name-3{
			color: #FEFEFF;
			margin-left: auto;
		}
	}

	.progress-bar{
		width: 31.2500rem;
		height: 0.6250rem;
		padding: 0 1.2500rem;
		margin: 0.6250rem 0.6250rem;
		background-color: #24262B;
		position: relative;
		border-radius: 0.1563rem;
		&::after{
			content: "";
			position: absolute;
			width: 0.9375rem;
			height: 0.9375rem;
			border-radius: 50%;
			left: calc(var(--progress-bar-width) - 0.4688rem);
			top: -0.1563rem;
			background-color: #5FE116;
		}
		&::before{
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: var(--progress-bar-width);
			height: 100%;
			background-color: #4BA519;
			border-radius: 0.1563rem;
		}
	}
	
	.level-but{
		white-space: nowrap;
		padding: 0.3125rem 0.9375rem;
		background-color: #4BA519;
		border-radius: 0.3125rem;
		font-size: 0.8750rem;
		display: flex;
		align-items: center;
	}

	@media (max-width: 9999px) {
		.tel2{
			padding: 0.0000rem 0.6250rem;
		}
		.level-name{
			margin: 0.6250rem 0;
		}
	}
	@media (min-width: 9999px) {
		page{
			padding-top: 0.9375rem;
		}
		.head-box {
			background-color: #2C2E34;
			background-image: none;
			// height: 100%;
		// 	display: flex;
			padding: 1.5625rem 0.9375rem;
		// 	align-items: center;
			// justify-content: center;
			position: relative;
			.vip-back{
				position: absolute;
				right: 0;
				top:0;
				width: 50%;
				height: 100%;
				background-image: url(@/assets/vip/level.png);
				background-size: auto 100%;
				background-repeat: no-repeat;
				background-position: center;
				font-size: 1.8750rem;
				font-weight: bold;
				font-style: italic;
				display: flex;
				align-items: center;
				text-align: center;
				justify-content: center;
				color: #FFFFFF;
			}
			.pc-user{
				width: 9.3750rem;
				display: flex;
				margin-left: 0.6250rem;
				.user-head{
					width: 5.0000rem;
					height: 5.0000rem;
					img{
						width: 5.0000rem;
						border-radius: 50%;
					}
				}
				.user-content{
					margin-left: 0.6250rem;
					text{
						display: block;
						white-space: nowrap;
						color: #FFFFFF;
					}
					.user-name{
						font-size: 1.1250rem;
					}
					.user-id{
						font-size: 0.7500rem;
					}
					.user-level{
						font-size: 1.8750rem;
						font-weight: bold;
						font-style: italic;
					}
				}
			}
			.user-top{
				// width: 0%;
				margin: 0;
			}
			.level-name{
				font-size: 0.8750rem;
			}
			
			.level-value{
				color: #FFFFFF;
			}
			
			.level {
				width: 31.2500rem;
				// flex: 1;
				// display: block;
				font-size: 1.1250rem;
				padding-left: 6.8750rem;
				background-color: #404247;
				background-image: url(@/assets/washing/m.png);
				background-repeat: no-repeat;
				background-position: 0.9375rem 50%;
				padding: 1.2500rem;
				border-radius: 0.3125rem;
				background-size: 3.7500rem;
				// margin-left: 9.0625rem;
				// margin: auto;
				margin-top: 0.9375rem;
				.level-name{
					margin-left: 3.7500rem;
				}
			}

			.btn {
				background-color: #24262B;
				color: #2AE035;
				font-size: 1.1250rem;
				width: 17.1875rem;
				height: 4.3125rem;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.card-box-list {
			display: flex;
			flex-wrap: wrap;

			&~.card-box-list {
				padding-bottom: 1.2500rem;
			}
		}

		.miss1 {
			width: calc(33.3% - 0.6250rem);
			height: 15.6250rem;
			margin: 0;
			margin-right: 0.6250rem;
			margin-bottom: 0.6250rem;
			border-radius: 0.3125rem;
			padding: 0.9375rem;
			box-sizing: border-box;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			flex-direction: column;
			background: #1C1E22 url(@/assets/vip/vip1.png) no-repeat right center;

			&:nth-child(2) {
				background-image: url(@/assets/vip/vip2.png);
			}

			&:nth-child(3) {
				background-image: url(@/assets/vip/vip3.png);
			}

			&:nth-child(4) {
				background-image: url(@/assets/vip/vip4.png);
			}
			
			&:nth-child(5) {
				background-image: url(@/assets/vip/vip5.png);
			}

			&:last-child {
				margin: 0;
			}

			.miss-title {
				font-size: 1.0000rem;
			}

			.miss-title,
			.miss-team,
			.white,
			.miss-intro {
				margin: 0;
				padding: 0;
				width: auto;
			}

			.miss-team,
			.miss-intro {
				padding-top: 0.6250rem;
			}

			.button-b,
			.button-f {
				margin: 0;
				width: 100%;
				height: 3.1250rem;
				background-color: rgba(36, 38, 43, 0.6);
				display: flex;
				align-items: center;
				justify-content: center;

				&::after {
					display: none;
				}
			}

			.button-f {
				background-color: #2AE035;
				color: #FFF;
			}
		}

		.vip-menu {
			justify-content: flex-start;
			padding-top: 1.2500rem;
			position: assets;

			&>view {
				width: 13.1875rem;
				height: 4.5000rem;
				display: flex;
				align-items: center;
				justify-content: center;
				border: none;
				cursor: pointer;
				background: #1C1E22;
				font-size: 1.0000rem;
			}

			.vip-menu-sign {
				background: #34363B;
				border: none;
			}
		}

		.first-place-card {
			background-size: 5.8750rem 6.0625rem, 3.8750rem 3.8750rem;
			background-position: 6.5625rem 4.0625rem, 80% 9.3750rem;
		}
	}
</style>