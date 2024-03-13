<template>
	<page :show-header="!isPc" :on-pullup="onReachBottom" :on-pulldown="onPullDownRefresh">
		<div class="content page-pading" @click.stop="heightStyleType = '0', heightStyle = '0'">
			
			
			<div class="head">
				<border-gradient class="avatar" :border-color="['#FFA67E', '#FF52FE']" bg-color="#2E2C5E" :angle="180">
					<public-image :src="user.portrait" class="avatar-img"></public-image>
					<div class="vip" v-if="isPc"><img src="@/assets/new/user/icon-vip.png" />VIP{{ user.level }}</div>
				</border-gradient>
				<div class="user-information">
					<div class="name">
						<div>{{ user.user_nick ? user.user_nick : user.username }}</div>
						<div class="vip"> <img src="@/assets/new/user/icon-vip.png"/> <span>VIP{{ user.level }}</span></div>
					</div>
					<div class="id">{{ user.id }}</div>
				</div>
			</div>

			<div class="asset-card">

				
				<div class="asset-team">
					<div>
						<div class="name">{{ $t('pageMemberAsset.card1') }}</div>
						<div class="num" :data-unit="unit">{{ numberData.total_recharge }}</div>
					</div>
				</div>

				<div class="asset-team">
					<div>
						<div class="name">{{ $t('pageMemberAsset.card2') }}</div>
						<div class="num" :data-unit="unit">{{ numberData.total_withdraw }}</div>
					</div>
				</div>

				<div class="asset-team">
					<div>
						<div class="name">{{ $t('pageMemberAsset.card3') }}</div>
						<div class="num" :data-unit="unit">{{ numberData.total_rebate }}</div>
					</div>
				</div>

				<div class="asset-team">
					<div>
						<div class="name">{{ $t('pageMemberAsset.card4') }}</div>
						<div class="num" :data-unit="unit">{{ numberData.has_receive_commission }}</div>
					</div>
				</div>

				<div class="asset-team">
					<div>
						<div class="name">{{ $t('pageMemberAsset.card5') }}</div>
						<div class="num" :data-unit="unit">{{ numberData.total_gif }}</div>
					</div>
				</div>

				<div class="asset-team">
					<div>
						<div class="name">{{ $t('pageMemberAsset.card6') }}</div>
						<div class="num" :data-unit="unit">{{ numberData.total_bonus }}</div>
					</div>
				</div>

			</div>

			<div class="fund-details-view" ref="fund">
				
				<div class="select-div">
					<div v-if="isPc" class="flex">
						<div class="option-team" @click.stop="changeMenu('today',$t('pageRebateRatio.menu'))"
							:class="{ 'active': time == 'today' }">{{$t('pageRebateRatio.menu')}}</div>
						<div class="option-team" @click.stop="changeMenu('yesterday',$t('pageRebateRatio.menu1'))"
							:class="{ 'active': time == 'yesterday' }">{{$t('pageRebateRatio.menu1')}}</div>
						<div class="option-team" @click.stop="changeMenu('month',$t('pageRebateRatio.menu4'))"
							:class="{ 'active': time == 'month' }">{{$t('pageRebateRatio.menu4')}}</div>
						<div class="option-team" @click.stop="changeMenu('last_month',$t('pageRebateRatio.menu5'))"
							:class="{ 'active': time == 'last_month' }">{{$t('pageRebateRatio.menu5')}}</div>
					</div>
					<div class="select-div-team" v-else>
						<div class="select-div-title">{{$t('pageMemberAsset.tabName1')}}:</div>
						<div class="select-card">
							<div class="select-name" @click.stop="typePop('time')">
								<span class="ellipsis">{{ timeString }}</span>
								<img src="@/assets/new/member-asset/down.svg" :class="{ 'down-xz': heightStyle != '0' }"
									alt="">
							</div>

							<!-- <div class="select-option" :style="{ height: heightStyle }">
								<scroll-view class="scroll-view" :scroll-y="true" :show-scrollbar="false">
									<div>
										<div class="option-team ellipsis" @click.stop="changeMenu('today',$t('pageRebateRatio.menu'))"
											:class="{ 'active': time == 'today' }">{{$t('pageRebateRatio.menu')}}</div>
										<div class="option-team ellipsis" @click.stop="changeMenu('yesterday',$t('pageRebateRatio.menu1'))"
											:class="{ 'active': time == 'yesterday' }">{{$t('pageRebateRatio.menu1')}}</div>
										<div class="option-team ellipsis" @click.stop="changeMenu('month',$t('pageRebateRatio.menu4'))"
											:class="{ 'active': time == 'month' }">{{$t('pageRebateRatio.menu4')}}</div>
										<div class="option-team ellipsis" @click.stop="changeMenu('last_month',$t('pageRebateRatio.menu5'))"
											:class="{ 'active': time == 'last_month' }">{{$t('pageRebateRatio.menu5')}}</div>
									</div>
								</scroll-view>
							</div> -->

						</div>
					</div>
					<div class="select-div-team">
						<div class="select-div-title" v-if="!isPc">{{$t('pageVipRecord.type')}}:</div>
						<div class="select-card">
							<div class="select-name" @click.stop="typePop('type')">
								<span class="ellipsis">{{meun}}</span>
								<img src="@/assets/new/member-asset/down.svg" :class="{ 'down-xz': heightStyleType != '0' }"
									alt="">
							</div>

							<!-- <div class="select-option" :style="{ height: heightStyleType }">
								<scroll-view class="scroll-view" :scroll-y="true" :show-scrollbar="true" :mouse-wheel="true">
									<div>
										<div class="option-team ellipsis" @click.stop="onSelect()"
											:class="{ 'active': time == 'today' }">{{$t('pageMemberAsset.menu1')}}</div>
										<div class="option-team ellipsis" v-for="v in typeArray" @click.stop="onSelect(v)"
											:class="{ 'active': type == v.type }">{{v.desc}}</div>
									</div>
								</scroll-view>
							</div> -->

						</div>
					</div>

				</div>

				<record-table id="fund-details-meun" res="box" class="tab-box" :tableMenu="tableMenu"
					:list="list">
				</record-table>
				<!-- <arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage"
					@click.stop="onReachBottomBtn()"></arrow-more> -->

				<ui-pagination v-if="isPc && list.length" v-model="pages" :pages="lastPage" @change="getUserMoneyDetailsSearch()"></ui-pagination>

			</div>
			
		
		</div>
	</page>
	<UiAssetSheet @change-select="changeFilter" :title="shellTitle" :shellData="shellData" ref="showType"/>
</template>

<script setup lang="ts">

// import ScrollView from "../components/scroll-view.vue";
import Page from "../components/page.vue"
import UiPagination from "../components/ui-pagination.vue"
// import RecordTableMenu from "../components/record-table-menu.vue"
import RecordTable from "../components/record-table.vue"
import BorderGradient from "../components/border-gradient.vue"
import PublicImage from "../components/public-image.vue"
// import ScrollView from "../components/scroll-view.vue"
import { onUnmounted, reactive, ref } from 'vue';
import { t } from "../uilts/i18n";
import { isPc, unit } from "../uilts/async.var";
import { onLoad, onShow } from "../router/routes";
import { addListener, dbGet, removeListener } from "../uilts/db";
import userPortrait from '@/assets/new/user/user.png'

import UiAssetSheet from '../components/ui-asset-sheet.vue';

const showType = ref()

const shellData = ref()

const shellTitle = ref()

const curDrop = ref()

const timeList = ref([
	{type: 'today', desc: t('pageRebateRatio.menu')},
	{type: 'yesterday', desc: t('pageRebateRatio.menu1')},
	{type: 'month', desc: t('pageRebateRatio.menu4')},
	{type: 'last_month', desc: t('pageRebateRatio.menu5')},
])

const typePop = (drop: string) => {
	curDrop.value = drop
	shellData.value = drop === 'time'? timeList.value : typeArray.value
	showType.value.openPopup()
	shellTitle.value = drop==='time'? t('pageMemberAsset.tabName1') : t('pageVipRecord.type')
}

const changeFilter = (payload: any) => {
	if(!payload) return
	list.value.length = 0
	pages.value = 1
	if (curDrop.value === 'time') {
		timeString.value = payload?.value.desc
		time.value = payload?.value.type
	} else {
		type.value = payload?.value.type
		meun.value = payload?.value.desc
	}
	getUserMoneyDetailsSearch()
	
}

// const isSelect = ref<boolean>(false);
const meun = ref<string>(t('pageMemberAsset.select1'));
const numberData = ref<GetUserMoneyDetails["response"]>({
	total_recharge: '',
	total_withdraw: '',
	total_rebate: '',
	agent_commiss_total: '',
	total_gif: '',
	has_receive_commission: "",
	total_bonus: '',
})
const typeArray = ref<GetUserMoneyDetailsType["response"]>()
const type = ref<string>('')
const pages = ref<number>(1)
let limit = 10
const lastPage = ref<number>(1)
const showMore = ref<boolean>(false)
const time = ref<string>('today')
const fundTop = ref<boolean>(false)
// const topHieght = ref("0")
const list = ref<Array<any>>([])
const fund = ref()

const heightStyle = ref('0')
const heightStyleType = ref('0')
// const index= ref(t('pageMemberAsset.select1'))

const onckTime = () => {
	if(heightStyle.value == '0'){
		heightStyle.value = isPc.value ? '240px' : '8rem'
	}else{
		heightStyle.value = '0'
	}
	heightStyleType.value = '0'
}

// const onckType = () => {
// 	if(heightStyleType.value == '0'){
// 		heightStyleType.value = isPc.value ? '240px' : '8rem'
// 	}else{
// 		heightStyleType.value = '0'
// 	}
// 	// console.log(heightStyleType.value,'heightStyleType.value')
// 	heightStyle.value = '0'
// }

// const onSelect = (e?:any) => {
// 	if (e) {
// 		type.value = e.type
// 		meun.value = e.desc
// 	} else {
// 		meun.value = t('pageMemberAsset.select1')
// 		type.value = ""
// 	}

// 	list.value.length = 0
// 	pages.value = 1
// 	onckType()
// 	getUserMoneyDetailsSearch()
// }

const timeString = ref(t('pageRebateRatio.menu'))

const changeMenu = (e: string , name: string) => {
	timeString.value = name
	time.value = e
	list.value.length = 0
	pages.value = 1
	onckTime()
	getUserMoneyDetailsSearch()
}

const tableMenu = ref([
	t('pageMemberAsset.tabName1'),
	t('pageMemberAsset.tabName2'),
	// getApp().$t('pageMemberAsset.tabName3'),
	t('pageMemberAsset.tabName4'),
	t('pageMemberAsset.tabName5')
])

const getUserMoneyDetails = async () => {
	let ret = await '/api/user/getUserMoneyDetails'.POST<GetUserMoneyDetails>(null, {
		Authorization: async () => await dbGet('token')
	})
	numberData.value = ret
}

const getUserMoneyDetailsType = async () => {
	let ret = await '/api/user/getUserMoneyDetailsType'.POST<GetUserMoneyDetailsType>(null, {
		Authorization: async () => await dbGet('token')
	})

	typeArray.value = ret
}
let Log: Promise<GetUserMoneyDetailsSearch["response"]>;
const getUserMoneyDetailsSearch = async () => {
	Log && Log.abort();
	Log = '/api/user/getUserMoneyDetailsSearch'.POST<GetUserMoneyDetailsSearch>({
		dateType: time.value as GetUserMoneyDetailsSearch["request"]["dateType"],
		page: pages.value,
		limit,
		type: type.value
	}, {
		Authorization: async () => await dbGet('token')
	})
	let ret = await Log;
	if(isPc.value){
		list.value.length = 0;
	}
	ret.list.forEach((v) => {
		list.value.push([
			{ value: v.create_time },
			{ value: v.desc.slice(0, 11) + '...', color: "#FFFFFF" },
			// {value:v.expenses},
			{ value: v.income_expenses },
			{ value: v.after_money },
		])
	})
	lastPage.value = Math.ceil(ret.totalCount / limit)
	showMore.value = false

}


const onPullDownRefresh = async () => {
	list.value.length = 0
	pages.value = 1
	await getUserMoneyDetails()
	await getUserMoneyDetailsType()
	await getUserMoneyDetailsSearch()
}

const onReachBottom = async () => {
	if (lastPage.value > pages.value) {
		showMore.value = true
		pages.value += 1
		await getUserMoneyDetailsSearch()
	}
}

const init = () => {
	list.value.length = 0
	meun.value = t('pageMemberAsset.select1')
	time.value = 'today'
	timeString.value = t('pageRebateRatio.menu')
	heightStyle.value = '0'
	heightStyleType.value = '0'
	pages.value = 1
	tableMenu.value = [
		t('pageMemberAsset.tabName1'),
		t('pageMemberAsset.tabName2'),
		// t('pageMemberAsset.tabName3'),
		t('pageMemberAsset.tabName4'),
		t('pageMemberAsset.tabName5')
	]
	getUserMoneyDetails()
	getUserMoneyDetailsType()
	getUserMoneyDetailsSearch()
}

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
onLoad(() => {
	init();
	dbGet('user').then(ret => setUser('set', ret));
	addListener('user', setUser)
	addListener('language', (type: any, _name) => {
		if (type === 'set') {
			init();
		}
	})
	window.addEventListener('scroll', () => {
		if (fund.value) {
			const { top } = fund.value.getBoundingClientRect();
			if (top <= 80) {
				fundTop.value = true
			} else {
				fundTop.value = false
			}
		}
	});
})

onShow(() => {
	init();
	dbGet('user').then(ret => setUser('set', ret));
	addListener('user', setUser)
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
@include pc {
	.content{
		// padding:64px 66px;
	}
}
.tab-box{
	margin-top:0.6250rem;
	:deep(.ellipsis) {
		color: #fff;
	}
	@include pc {
		margin-top:20px;
		border-radius:8px;
		// border: 1px solid #292547;
		// background-color: rgb(31, 31, 31);
		background: #1a1a1a;
		margin-bottom: 30px;
	}
}
.select-div{
	display: flex;
	justify-content: space-between;
	.flex{
		display: flex;
		gap:20px;
	}
	.select-div-team{
		display: flex;
		align-items: center;
	}

	.select-div-title{
		color:#c4c4c4;
		font-size: 0.875rem;
		font-weight: 900;
	}
	
	.select-option {
		overflow: hidden;
		height: 0;
		position: absolute;
		top: 2.1rem;
		right:0;
		background-color: var(--body-background-color);
		@include pc {
			top:50px;
			background-color:transparent;
			.option-team {
				margin-top:3px;
			}
		}
	}
	.option-team {
		margin: auto;
		min-width: calc(5rem - 1.25rem);
		height: 2rem;
		padding: 0 .4rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 0.25rem;
		border-radius: 0.05rem;
    	background: #1a1a1a;
		background: rgb(31, 31, 31);
		margin-top: 0.1rem;
		color:#c4c4c4;
		font-size: 0.75rem;
		font-weight: 400;
		white-space: nowrap;
		word-break:keep-all;
		cursor: pointer;
		box-sizing:border-box;
		&:active,
		&.active {
			color: #fff;
			background: #009d80;
			
		}

		&:hover {
			color: #fff;
			background: #009d80;
		}
		@include pc {
			min-width:120px;
			height: 48px;
			padding: 8px 30px;
			font-size: 16px;
			border-radius: 8px;
			// border: 1px solid #292547;
			margin:0;
			&:active,
			&.active,&:hover {
				// border: 1px solid #2E2C5E;
			}
		}


	}

	.option-team:active {
		// color: #fcde26;
		// background: #2E2C5E;
	}
}
.down-xz {
	transform: rotate(180deg);
}

.scroll-view {
	height: 100%;
	overflow: hidden;
}

.select-card {
	position: relative;
	margin-left:0.44rem;
	.select-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: calc(5rem - 1.25rem);
		height: 2rem;
		padding: 0 0.625rem;
		// color: #fcde26;
		font-size: 0.75rem;
		font-style: normal;
		font-weight: 400;
		border-radius: 0.25rem;
		// border: 1px solid rgba(73, 70, 118, 0.50);
		// background:#201E47;
		box-sizing:border-box;
		cursor: pointer;
		// box-sizing: border-box;
		background: #1a1a1a;;
		color: #fff;
		img {
			width: 0.75rem;
			height: 0.75rem;
		}
		.ellipsis {
			display: block;
			max-width: 5.2rem;
			white-space: nowrap !important;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		@include pc{
			min-width:220px;
			height: 48px;
			border-radius: 8px;
			// border: 1px solid #292547;
			font-size: 16px;
			font-weight: 600;
			// color:#c4c4c4;
			padding:8px 24px;
			img {
				width:28px;
				height:28px;
			}
		}
	}

}


.head {
	padding: 0.75rem 0;
	display: flex;
	align-items: center;
	
	.name {
		color: #FFB800;
		font-size: 1.3125rem;
		font-weight: 600;
		display: flex;
		align-items: center;

		img {
			display: flex;
			width: 0.84375rem;
			height: 0.84375rem;
		}
	}

	.vip {
		display: flex;
		padding: 0.1875rem;
		align-items: center;
		gap: 0.1875rem;
		border-radius: 0.5625rem;
		// background: rgba(0, 255, 255, 0.10);
		margin-left: 0.38rem;
		font-weight: normal;
		color: #FF6B00;
		font-size: 0.65625rem;
	}
	@include pc {
		padding:35px 45px;
		border-radius: 24px;
		// border: 1px solid #292547;
		// background:#1D1A3F;
		.name{
			font-size: 36px;
		}
		.vip{
			display:none;
		}
	}
}

.user-information {
	padding-left: 0.62rem;

	.id {
		color: #fff;
		font-size: 0.875rem;
		padding-top: 0.63rem;
		font-weight: 600;

		&::before {
			content: "ID: ";
			color: rgba(255,255,255,.7);
			font-weight: normal;
		}
	}
	@include pc {
		padding-left:24px;
		.id {
			font-size: 20px;
			padding-top:12px;
			font-weight: 400;
			&::before {
				font-weight: 900;
			}
		}
	}
}

.avatar {
	width: 4.6875rem;
	height: 4.6875rem;
	border-radius: 50%;
	stroke: #FFA67D;
	filter: drop-shadow(0px 4px 4px rgba(255, 107, 218, 0.15));
	.avatar-img {
		border-radius: 50%;
	}
	@include pc {
		width:100px;
		height:100px;
		.vip{
			position:absolute;
			color:#fff;
			margin:0;
			border-radius: 18px;
			background: rgba(0, 255, 255, 0.16);
			backdrop-filter: blur(3px);
			display: flex;
			width: 100px;
			height: 24px;
			padding: 4px;
			justify-content: center;
			align-items: center;
			gap: 6px;
			bottom:-16px;
			font-size: 18px;
			color: #fff;
			img{
				width:18px;
				height: 18px;
			}
		}
	}
	img {
		max-width: 100%;
		max-height: 100%;
	}
}

.user-top-content {
	padding: 1.2500rem 0;
}

.element {
	position: fixed;
	top: var(--headers-height);
	z-index:calc(var(--I1) + 0);
	background-color: #1C1E22;
}

.asset-card {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 0.62rem;
	grid-row-gap: 0.62rem;
	padding: 0.62rem 0;
	@include pc {
		grid-template-columns: 1fr 1fr 1fr;
		grid-column-gap:36px;
		grid-row-gap:36px;
		padding:64px 0;
	}
	.asset-team {
		border-radius: 0.5rem;
		// background: #201E47;
		background: #1a1a1a;
		padding: 0.62rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.name {
			font-size: 0.6875rem;
			color: #fff;
			padding: 0.25rem 0;
		}

		.num {
			font-size: 0.875rem;
			color: #fcde26;
			&::before{
				content: attr(data-unit);
			}
		}
		// &::before {
		// 	content: '';
		// 	display: block;
		// 	width: 7.6875rem;
		// 	height: 3.5rem;
		// 	background-size: cover;
		// 	padding-bottom: 0.25rem;
		// }
		// @for $i from 1 through 6 {
		// 	&:nth-of-type(#{$i}n)::before {
		// 		background-image:url(@/assets/new/member-asset/icon-#{$i}.png);
		// 	}
		// }
		@include pc {
			height:201px;
			padding:0;
			box-sizing:border-box;
			border-radius: 24px;
			// border: 1px solid #292547;
			// background:none;
			flex-direction: row;
			&::before{
				width: 166px;
				height: 75.815px;
				margin-right:20px;
				margin-left:-60px;
			}
			.name {
				font-size: 22px;
				padding:0 0 12px 0;
			}
			.num {
				font-size: 24px;
				&::before{
					font-size:16px;
					font-weight: 700;
				}
			}
		}
	}
}

.fund-details-view {
	padding: 1.2rem 0;
	@include pc {
		// padding: 35px 45px;
		padding: 35px 0;
		border-radius: 24px;
		// background:#1D1A3F;
		// background-color: rgb(31, 31, 31);
	}
	.fund-details-meun {

		// display: flex;
		// align-items: center;
		// justify-content: space-between;
		// padding: 0 0.6250rem;
		// background-color: #24262b;
		.select-right {
			// width: 5.2500rem;
			height: 2.6250rem;
			line-height: 2.6250rem;
			position: relative;
			margin-left: auto;

			.select-right-botton {

				border: none;
				outline: none;
				background-color: #24262b;
				text-align: center;
				width: 6rem;
				height: 2rem;
				display: flex;
				color: #2AE035;
				justify-content: center;

				margin-left: 2rem;

				// position: absolute;
				option {
					padding: 0.5rem 0;
				}
			}

			span {
				color: #2AE035;
				font-size: 0.7813rem;
				// width: 90%;
				// margin: auto;
				display: block;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: center;
				margin-right: 0.1563rem;
			}

			img {
				margin-top: 1.1250rem;
				width: 0.7500rem;
				height: 0.3750rem;
				margin-left: 0.1563rem;
				margin-right: 0;
			}

			.select-right-drawer {
				top: 2.6250rem;
				width: 100%;
				height: 10.0000rem;
				position: absolute;
				color: #2ae035;
				background-color: #1A1C20;
				line-height: 2.0313rem;
				font-size: 0.7813rem;
				z-index:calc(var(--I1) + 0);
				overflow: scroll;
				-webkit-overflow-scrolling: touch;

				/* 关闭垂直滚动条的默认样式 */
				&.select-right-drawer::-webkit-scrollbar {
					width: 0.2rem;
					/* 设置滚动条宽度 */
					height: 0;
				}

				&.select-right-drawer::-webkit-scrollbar-track {
					background-color: transparent;
					/* 设置滚动条轨道背景色 */
				}

				&.select-right-drawer::-webkit-scrollbar-thumb {
					background-color: transparent;
					/* 设置滚动条滑块颜色 */
				}

				text {
					text-align: center;
					width: 90%;
					margin: auto;
					display: block;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					padding: 0 8%;
				}

				text:active {
					background-color: #242e25 !important;
					color: #FFFFFF;
				}

				.select-right-drawer-sign {
					background-color: #242e25 !important;
					color: #FFFFFF;
				}
			}
		}

		.scroll-view_H {
			// ::-webkit-scrollbar {width: 0;height: 0;background-color: transparent;} 
			white-space: nowrap;
			width: calc(100% - 8.0625rem);
			// margin: 0 0.9375rem;
			height: 2.6250rem;
			line-height: 2.6250rem;
			// background-color: #1C1E22;
			border-radius: 0.1087rem;

			// margin-top: 0.9375rem;
			.fund-details-meun-team {
				display: inline;
				font-size: 0.7819rem;
				color: #FFFFFF;
				padding: 0.9375rem;
				height: 2.6250rem;
			}

			.fund-details-meun-team-sign {
				background-color: #2D3034 !important;
			}
		}
	}

}

.record-table-view {
	display: flex;
	justify-content: space-around;
	margin-left: 0.3750rem;
	margin-top: 1.6875rem;
	margin-right: 0.3750rem;

	.record-table-team {
		width: 20%;
	}

	text {
		width: 90%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		text-align: center;
		margin-bottom: 1.2500rem;
		font-size: 0.7813rem;
	}

	.name {
		color: #9BA6B3;
		font-size: 0.7813rem !important;
		margin-bottom: 0.9375rem !important;
	}

	.types-of {
		color: #9BA6B3;

	}

	.entradas {
		color: #FEFEFE;
	}

	.quantidade {
		color: #65BE3D;
	}
}

:deep(.table) {
	background: #1a1a1a;
	border-radius: 0.25rem;
	.head {
		background: none;
		color: #fff;
	}
	.table-row:nth-child(even) {
		// background: none !important;
		background: rgba(255,255,255,.05) !important;
	}
	&:after {
		color: #787878;
	}
	@include pc {
		border-radius: 8px;
	}
}

@media (min-width:9999px) {
	.element {
		top: calc($content-height + var(--status-bar-height));
		// left: calc(50% + var(--window-left) / 2);
		// width: calc(100% - var(--window-left));
		width: calc(100% - var(--left-width));
		max-width: var(--content-max-width);
		display: flex;
		// transform: translateX(-50%);
	}
}

@media (max-width: 9999px) {
	.select-right-botton {
		// appearance:none;

		// -moz-appearance:none;
		// -webkit-appearance:none;
		border: none;
		outline: none;
		background-color: #1c1e22;
		text-align: center;
		width: 6rem;
		height: 2rem;
		display: flex;
		color: #2AE035;
		justify-content: center;

		margin-left: 2rem;

		// position: absolute;
		option {
			padding: 0.5rem 0;
		}
	}

}</style>
