<template>
	<page 
	:on-pullup="onReachBottom" 
	:on-pulldown="onPullDownRefresh" 
	class="page"
	title-bg-color="transparent"
	close-location="right" 
	:show-scrollbar="true"
	:mouse-wheel="true"

	:head-box="isPc ? ['content','right'] : undefined">
		
		<div class="body page-pading">
			<div class="tab-datas head">
				<div class="table-cell">{{$t('pageCofferPass.time')}}</div>
				<div class="table-cell">{{$t('pageCofferPass.access')}}</div>
				<div class="table-cell">{{$t('pageCofferPass.residue')}}</div>
			</div>
			<view class="table empty" :data-empty="$t('ui.empty')" v-if="!list.length"></view>
			<div class="tab-datas" v-else v-for="item,index in list" :key="index">
				<div>{{item.create_time}}</div>
				<div>
					{{item.money}}
				</div>
				<div>{{item.residue_money}}</div>
			</div>
		</div>

		<!-- <view class="table-view">
			
			<view class="tabs">
				
				<view class="tabs-view">
			
					<view class="table empty" :data-empty="$t('ui.empty')" v-if="!list.length"></view>
					<view class="table" v-else>
						<view class="table-row head">
							<view class="table-cell">{{$t('pageCofferPass.time')}}</view>
							<view class="table-cell">{{$t('pageCofferPass.access')}}</view>
							<view class="table-cell">{{$t('pageCofferPass.residue')}}</view>
							
						</view>
						<view class="table-row" v-for="item,index in list" :key="index">
							<view class="table-cell">
								<view class="ellipsis">
									{{item.create_time}}
								</view>
							</view>
							<view class="table-cell" >
								
								<view class="ellipsis">
									{{item.money}}
								</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">
									{{item.residue_money}}
								</view>
							</view>
						</view>
					</view>
					
					<arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage" @click="onReachBottomBtn()"></arrow-more>
				</view>
			</view>
		</view> -->
	</page>
</template>

<script setup lang="ts">
	import Page from '../components/page.vue'
	import { ref } from "vue"
import { dbGet } from '../uilts/db';
import { onLoad, onShow } from '../router/routes';
import { isPc } from '../uilts/async.var';

	const list = ref<BoxAccessList["response"]["list"]>([])
	const limit = 15
	const pages = ref<number>(1)
	const lastPage = ref<number>(1)
	const showMore = ref<boolean>(false)
	
	const getList = async (p:number) =>{
		let ret = await '/api/user/boxAccessList'.POST<BoxAccessList>({
			type:"",
			page:p,
			limit:limit
		},{
			Authorization:async () => await dbGet('token')
		})
		lastPage.value = Math.ceil(ret.totalCount/limit)
		showMore.value = false
		ret.list.forEach((v)=>{
			list.value.push(v)
		})
	}
	
	const onPullDownRefresh= async () => {
		list.value.length = 0
		pages.value = 1
		await getList(pages.value)
	}
	
	const onReachBottom = async () => {
		if(lastPage.value > pages.value){
			showMore.value = true
			pages.value  +=1
			await getList(pages.value)
		}
	}
	
	onLoad(() => {
		getList(1)
	})
	onShow(() => {
		pages.value = 1
		list.value.length = 0
		getList(1)
	})
</script>

<style lang="scss" scoped>

@import '../scss/public.scss';
.page{
	// background-color:#2E2C5E;
	background-color:#1e1e1e;
	overflow: hidden;
}
.body{
    // margin:0 0.63rem;
    // padding: 0.625rem;
    border-radius: 0.1875rem;
}

.table{
	height:100%;
	display:flex;
	align-items:center;
	justify-content:center;
}

.tab-datas {
	display: flex;
	padding: 0.375rem 0.625rem;
	justify-content: space-between;
	align-self: stretch;
	color: #FFF;
	text-align: center;
	font-size:0.8125rem;
    align-items: center;
	div{
		flex:1;
	}
	&.head{
		padding: 0.375rem 0;
		color:#B2B3BD;
		// background: #201E47;
		background: #2a2a2a;
	}
	&:not(.head){
		padding:1rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
	}
	&:last-child{
		border:none;
	}
	&:not(.head) div{
		&:nth-child(2){
			color:#14D03D;
		}
	}
	@include pc {
		height: 60px;
		padding:0;
		font-size: 14px;
		color: #FFF;
		background:#1D1A41;
		&.head{
			background: #231D4E;
			color:#FFF;
		}
		&:nth-child(2n) {
			background: #181538;
		}

		&:not(.head) div {
			&:nth-child(2),&:nth-child(3) {
				color: #FFF;
			}

			&:last-child {
				color: #14D03D;
			}
		}
		&:hover{
			background-color: #181538;
		}
	}
}
</style>