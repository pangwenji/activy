<template>
	<page :on-pullup="onReachBottom" :on-pulldown="onPullDownRefresh" class="page" :show-scrollbar="true"
		title-bg-color="#000000"  :mouse-wheel="true" :show-header="true" :head-box="isPc ? ['content', 'right'] : undefined">

		<div class="body page-pading">
			<div class="tab-datas-box">
				<div class="table-top-content">

					<div class="title">{{ $t('pageCofferPass.timeTip') }}</div>
					<div class="select-card" v-click-outside="clickOutSide">
						<div class="select-name" @click.stop="onckType()">
							<span class="ellipsis">{{ meun }}</span>
							<img src="@/assets/new/member-asset/down.png" :class="{ 'down-xz': heightStyleType != '0' }"
								alt="">
						</div>

						<div class="select-option" :style="{ height: heightStyleType }">
							<scroll-view class="scroll-view" :scroll-y="true" :show-scrollbar="true" :mouse-wheel="true">
								<div>
									<div class="option-team ellipsis" v-for="v in typeArray" @click.stop="onSelect(v)">
										{{ v.desc }}</div>
								</div>
							</scroll-view>
						</div>

					</div>
				</div>
				<div class="tab-datas head">
					<div>{{ $t('pageCofferPass.time') }}</div>
					<div>{{ $t('pageActivityNew.taskType') }}</div>
					<div>{{ $t('pageActivityNew.status') }}</div>
					<div>{{ $t('pageActivityNew.receiveMoeny') }}</div>
				</div>
				<div class="empty" :data-empty="$t('ui.empty')" v-if="!list.length"></div>
				<div class="tab-datas" v-for="item in list">
					<div>{{ item.receive_at }}</div>
					<div v-show="item.type != 'Invite'">
						{{ item.type }}
					</div>
					<div>{{ $t(`pageActivityNew.statuses[${item.status}]`) }}</div>
					<div>{{ unit }}{{ (item.money - 0).toFixed(2) }}</div>
				</div>

			</div>
		</div>
	</page>
</template>

<script setup lang="ts">
import Page from "../components/page.vue"
import { ref } from "vue"
import { dbGet } from "../uilts/db";
import { onLoad, onShow } from "../router/routes";
import { isPc, unit } from "../uilts/async.var";
import { t } from "../uilts/i18n";
const heightStyleType = ref('0')

const heightStyle = ref('0')
const meun = ref<string>(t('pageMemberAsset.select1'));
const list = ref<ActivityReceiveRecord['response']['list']>([])
const limit = 30
const pages = ref(1)
const lastPage = ref(1)
const showMore = ref(false)
const array = ref<GetActRecordTypes['response']>([])
const index = ref(0)
const type = ref<PageData["/activity-record"]['code']>('')

const types = ref<number>(0)

const typeArray = ref<Array<{
	desc: string;
	type: number;
}>>([
	{ desc: t('pageActivityRecord.m1'), type: 2 },
	{ desc: t('pageActivityRecord.m2'), type: 3 },
	{ desc: t('pageActivityRecord.m3'), type: 4 }
])

const clickOutSide = () => {
	heightStyleType.value = '0'
}


const getActRecordTypes = () => {
	'/api/activity/getActRecordTypes'.GET<GetActRecordTypes>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		array.value.length = 0
		ret.forEach((v, i) => {
			array.value.push(v)
			if (v.type == type.value) {
				index.value = i
			}
		})
	})
}

const getList = async (p: number) => {
	let ret = await '/api/activity/receiveRecord'.POST<ActivityReceiveRecord>({
		page: p,
		limit: limit,
		type: type.value || '',
		status: types.value
	}, {
		Authorization: async () => await dbGet('token')
	});

	lastPage.value = Math.ceil(ret.totalCount / limit);
	if (ret.list.length > 0) {
		ret.list.forEach(v =>{
			list.value.push(v)
		})
	} else {
		list.value = []
	}
	showMore.value = false
}


const onSelect = (e?: any) => {
	pages.value = 1
	list.value = []
	if (e) {
		types.value = e.type
		meun.value = e.desc
	} else {
		meun.value = t('pageMemberAsset.select1')
		types.value = 0
	}
	heightStyleType.value = '0'
	getList(pages.value)
}

const onckType = () => {
	if (heightStyleType.value == '0') {
		heightStyleType.value = isPc.value ? '240px' : '6.4rem'
	} else {
		heightStyleType.value = '0'
	}
	heightStyle.value = '0'
}


const onPullDownRefresh = async () => {
	list.value.splice(0, list.value.length)
	pages.value = 1
	await getList(pages.value)
}

const onReachBottom = async () => {
	if (lastPage.value > pages.value) {
		showMore.value = true
		pages.value += 1
		await getList(pages.value)
	}
}

onLoad<PageData["/activity-record"]>(async (get) => {
	if (get.code) type.value = get.code
	getActRecordTypes()
	return await getList(1)
})
onShow<PageData["/activity-record"]>(async (get) => {
	if (get.code) {
		type.value = get.code
	}
	list.value.splice(0, list.value.length)
	pages.value = 1
	getActRecordTypes()
	return await getList(1)
})

</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.page {
	background-color: #1f1f1f;
	overflow: hidden;
}

.body {

	border-radius: 0.1875rem;

	@include pc {
		border-radius: 8px;
	}
}

.down-xz {
	transform: rotate(180deg);
}

.select-card {
	position: relative;
	margin-left: 0.44rem;
	width: 5.32rem;
	height: 2rem;
	font-size: 0.75rem;
	background: #2A2A2A;
	border-radius: .25rem;

	.select-option {
		overflow: hidden;
		height: 0;
		position: absolute;
		top: 2.1rem;
		right: 0;
		background-color: var(--body-background-color);

		@include pc {
			top: 50px;
			background-color: transparent;

			.option-team {
				margin-top: 3px;
			}
		}
	}

	.select-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: calc(5rem - 1.25rem);
		height: 2rem;
		padding: 0 0.625rem;
		font-size: 0.75rem;
		font-style: normal;
		font-weight: 400;
		border-radius: 0.25rem;
		box-sizing: border-box;
		cursor: pointer;
		color: #fff;

		img {
			width: 0.75rem;
			height: 0.75rem;
		}

		@include pc {
			min-width: 220px;
			height: 48px;
			border-radius: 8px;
			font-size: 16px;
			font-weight: 600;
			padding: 8px 24px;

			img {
				width: 28px;
				height: 28px;
			}
		}
	}

}

.option-team {
	margin: auto;
	width: 5.32rem;
	height: 2rem;
	padding: 0 0.625rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	border-radius: 0.25rem;
	border-radius: 0.05rem;
	background: #1a1a1a;
	background: rgb(31, 31, 31);
	margin-top: 0.1rem;
	color: #c4c4c4;
	font-size: 0.75rem;
	font-weight: 400;
	white-space: nowrap;
	word-break: keep-all;
	cursor: pointer;
	box-sizing: border-box;

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
		min-width: 120px;
		height: 48px;
		padding: 8px 30px;
		font-size: 16px;
		border-radius: 8px;
		// border: 1px solid #292547;
		margin: 0;

		&:active,
		&.active,
		&:hover {
			// border: 1px solid #2E2C5E;
		}
	}


}

.tab-datas-box {
	// border-radius: 8px;
	// overflow: hidden;  

	.table-top-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: .5rem 0;

		.title {
			color: #B2B3BD;
			font-size: 0.75rem;
		}

	}

}

.scroll-view {
	height: 100%;
	overflow: hidden;
}

.tab-datas {
	display: flex;
	padding: 0.375rem 0.625rem;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	// color: #5B6DA1;
	color: #ffffff;
	text-align: center;
	font-size: 0.75rem;
	border-bottom: 0.03rem solid;
	border-color: rgba(255, 255, 255, 0.4);

	div {
		flex: 1;
	}


	&.head {
		font-size: .75rem;
		color: #B2B3BD;
		background: #2A2A2A;
		border-bottom: none;
	}

	&:not(.head) div {
		&:nth-child(2) {
			color: #FFF;
		}

		&:last-child {
			color: #14D03D;
		}
	}

	@include pc {
		height: 60px;
		padding: 0;
		font-size: 14px;
		color: #FFF;
		background: #1D1A41;

		&.head {
			background: #231D4E;
			color: #FFF;
		}

		&:nth-child(2n) {
			background: #181538;
		}

		&:not(.head) div {

			&:nth-child(2),
			&:nth-child(3) {
				color: #FFF;
			}

			&:last-child {
				color: #14D03D;
			}
		}

		&:hover {
			background-color: #181538;
		}
	}
}</style>
