<template>
	<page :on-pulldown="onPullDownRefresh" :on-pullup="onReachBottom" style="background-color:#16122F;" :head-box="isPc ? ['content','right'] : undefined">
		
		<div class="body page-pading">
			<div class="tab-datas head">
				<div>{{$t('pageCofferPass.time')}}</div>
				<div>{{$t('pageActivityNew.receiveMoeny')}}</div>
			</div>
			<div class="empty empty-card" :data-empty="$t('ui.empty')" v-if="list.length  === 0">
					</div>
			<div class="tab-datas" v-for="item in list">
				<div>{{item.receive_at}}</div>
				<div>{{unit}}{{item.money - 0}}</div>
			</div>
		</div>

<!-- 		
	<div class="container">
		
		<div class="title no-icon" v-if="type !='Invite'">
		
			<div><text>{{$t('pageActivityNew.recordTitle')}}</text></div>
		
			
			<div class="select-right" v-if="array.length > 0">
				<div class="select-right-botton" @click="clickSelect">
					<text>{{array[index].title}}</text>
					<img src="@/assets/icon/arrow-bottom-y.png" mode="" />
				</div>
			
				<div class="select-right-drawer" :scroll-y="true" v-show="isSelect">
			
					<text v-for="v,i in array" @click="onSelect(v.type,i)" class="ellipsis" :class="{'select-right-drawer-sign':v.type == type}"
						 :key="i">{{v.title}}</text>
			
				</div>
			</div>
		</div>
		<div class="table-div">

			<div class="tabs">

				<div class="tabs-div">
					<div class="table empty" :data-empty="$t('ui.empty')" v-if="!list.length"></div>
					<div class="table empty" :data-empty="$t('ui.empty')" v-else>
						<div class="table-row head">
							<div class="table-cell">{{$t('pageCofferPass.time')}}</div>
							<div class="table-cell" ><span v-if="type !='Invite'">{{$t('pageActivityNew.taskType')}}</span></div>
							<div class="table-cell">{{$t('pageActivityNew.receiveMoeny')}}</div>
						</div>

						<div class="table-row" v-for="item,index in list" :key="index">
							
							<div class="table-cell">
								<div class="ellipsis">
									{{item.receive_at}}
								</div>
							</div>
							<div class="table-cell" >
								<div class="ellipsis" v-show="type !='Invite'">
									{{item.type}}
								</div>
							</div>
							<div class="table-cell" :class="{add:index%2 === 0}">
							
								<div class="ellipsis">
									{{item.money - 0}}
								</div>
							</div>
							
						</div>

					</div>
				</div>

				<arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage" @click="onReachBottomBtn()">
				</arrow-more>
			</div>
		</div>
	</div> -->
</page>
</template>

<script setup lang="ts">
	import Page from "../components/page.vue"
	import { ref } from "vue"
	import { dbGet } from "../uilts/db";
	import { onLoad, onShow } from "../router/routes";
	import { isPc, unit } from "../uilts/async.var";
	
	const list = ref<ActivityReceiveRecord['response']['list']>([])
	const limit = 10
	const pages = ref(1)
	const lastPage = ref(1)
	const showMore = ref(false)
	const array = ref<GetActRecordTypes['response']>([])
	const index = ref(0)
	// const meun = ref(t('pageMemberAsset.select1'));
	const type = ref<PageData["/activity-record"]['code']>('')
	
	
	
	const getActRecordTypes = () => {
		'/api/activity/getActRecordTypes'.GET<GetActRecordTypes>(null, {
			Authorization: async () => await dbGet('token')
		}).then(ret => {
			array.value.length = 0
			ret.forEach((v,i) => {
				array.value.push(v)
				if(v.type == type.value){
					index.value = i
				}
			})
		})
	}

	const getList = async (p: number) => {
		let ret = await '/api/activity/receiveRecord'.POST<ActivityReceiveRecord>({
			page: p,
			limit: limit,
			type: ['Invite']
		}, {
			Authorization: async () => await dbGet('token')
		});
		lastPage.value = Math.ceil(ret.totalCount / limit);
		ret.list.forEach((v) => {
			list.value.push(v)
		})
		showMore.value = false
	}
	
	const onReachBottomBtn = () => {
		if (lastPage.value > pages.value) {
			showMore.value = true
			pages.value += 1
			getList(pages.value)
		}
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
		if(get.code) type.value = get.code
		getActRecordTypes()
		return await getList(1)
	})
	onShow<PageData["/activity-record"]>(async (get) => {
		if(get.code){
			type.value = get.code
		}
		list.value.splice(0, list.value.length)
		pages.value = 1
		getActRecordTypes()
		return await getList(1)
	})
</script>

<style lang="scss" scoped>
	@import "../scss/public.scss";
.body{
    // margin:0 0.63rem;
    // padding: 1.25rem 0;
    border-radius: 0.1875rem;
	@include pc{
		border-radius: 24px;
	}
}
.tab-datas{
	display: flex;
	padding: 0.375rem 0.625rem;
	justify-content: space-between;
	align-items: flex-start;
	align-self: stretch;
	// color: #5B6DA1;
	color: #ffffff;
	text-align: center;
	font-size: 0.6875rem;
	@include pc{
		font-size: 14px;
	}
	div{
		flex:1;
		padding: 0.375rem 0;
	}
	&.head{
		// background: #201E47;
		background: #494949;
		border-radius: 0.3rem;
	}
	&:not(.head) div{
		&:nth-child(2){
			color:#FFF;
		}
		&:last-child{
			color:#14D03D;
		}
	}
}
</style>
