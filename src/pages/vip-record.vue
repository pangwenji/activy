<template>
	<page :on-pullup="onReachBottom" :on-pulldown="onPullDownRefresh">
		<view class="table-view">
			
			<view class="tabs">
				
				<view class="tabs-view">
			
					<view class="table empty" :data-empty="$t('ui.empty')" v-if="!list.length"></view>
					<view class="table" v-else>
						<view class="table-row head">
							<view class="table-cell">{{$t('pageCofferPass.time')}}</view>
							<view class="table-cell">{{$t('pageVipRecord.type')}}</view>
							<view class="table-cell">{{$t('pageVipRecord.number')}}</view>
							
						</view>
						<view class="table-row" v-for="item,index in list" :key="index">
							<view class="table-cell">
								<view class="ellipsis">
									{{item.receive_at}}
								</view>
							</view>
							<view class="table-cell" :class="{add:index%2 === 0}">
								
								<view class="ellipsis">
									<!-- <image src="@/assets/vip/w.png" mode="aspectFill"></image> -->
									{{item.type}}
								</view>
							</view>
							<view class="table-cell">
								<view class="ellipsis">
									{{item.money}}
								</view>
							</view>
						</view>
					</view>
					
					<arrow-more :showMore="showMore" :page="pages" :lastPage="lastPage" @click="onReachBottomBtn()"></arrow-more>
				</view>
			</view>
		</view>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import ArrowMore from '../components/arrow-more.vue';
import { ref } from 'vue';
import { dbGet } from '../uilts/db';
import { onLoad } from '../router/routes';


	const list = ref<GetReceiveRecord["response"]["list"]>([])
	const limit = 15
	const pages = ref<number>(1)
	const lastPage = ref<number>(1)
	const showMore = ref<boolean>(false)
	
	const getList = async (p:number) =>{
		let ret = await '/api/vip/getReceiveRecord'.GET<GetReceiveRecord>({
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
	
	const onReachBottomBtn = async () => {
		if(lastPage.value > pages.value){
			showMore.value = true
			pages.value  +=1
			await getList(pages.value)
		}
	}

	const onPullDownRefresh = async () => {
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
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
	.table-view{
		margin-left: 0.7813rem;
		margin-right: 0.7813rem;
		// margin-top: 0.6250rem;
		// background-color: #1C1E22;
	}
	
	
	.tabs{
		background-color:var(--bgcolor);
		// padding:0.6250rem 0;
		font-size:0.7500rem;
		.tabs-scroll{
			// padding:0 0.6250rem;
			// height:2.9688rem;
			width:calc(100% - 1.2500rem);
			margin:0 auto;
		}
		.tabs-navs{
			// margin:0 0.6250rem;
			display: flex;
			background-color:#24262A;
			white-space:nowrap;
			// overflow-x: auto;
			// justify-content: space-between;
		}
		.tabs-nav{
			flex-shrink: 0;
			width:7.6875rem;
			height:2.9688rem;
			@extend %flex-center;
			color:#98A7B5;
			background-color:#24262A;
			&.active{
				background-color:#2D3034;
				font-weight: 700;
				color:#f5f6f7;
			}
		}
	}
	.table{
		width:100%;
		color:#98A7B5;
		font-size:0.7500rem;
		text-align:center;
		font-weight:600;
		.ellipsis{
			max-width:calc((100vw - 0.0000rem) / 3);
		}
		.table-cell{
			direction:unset;
			height:2.8750rem;
			vertical-align: middle;
			&:nth-child(1){
				text-align:left;
				direction: ltr;
				padding-left:0.6250rem;
			}
			
			&:last-child{
				text-align:right;
				direction: rtl;
				padding-right:0.6250rem;
			}
			&.add{
				text-align:right;
			}
		}
		.table-row{
			// display: flex;
			cursor: pointer;
			&:not(.head):active{
				background-color:#2D3034;
			}
			&:not(.head) .table-cell{
				color:#98A7B5;
				&:last-child{
					color:#FFF;
				}
				&:last-child::after{
					content: "";
					bottom: 0;
					right: 0;
					width: 3.1250rem;
					height: 0.3125rem;
					background-color: #2AE035;
				}
				&:nth-child(2){
					position: relative;
					color:#3BC117;
				}
			}
			image{
				width:0.8125rem;
				height:0.8125rem;
				display:inline-block;
				vertical-align:middle;
				margin-top: -0.3125rem;
			}
		}
		.head{
			color:#98A7B5;
			font-size:0.7500rem;
			font-weight:normal;
		}
	}
	.loading{
		min-height:9.3750rem;
	}
	.arrow{
		background-color:#24262A;
		width:7.8125rem;
		height:2.0000rem;
		@extend %flex-center;
		color:#9BA6B3;
		font-size:0.8125rem;
		margin:0 auto;
		margin-top:0.6250rem;
		&::after{
			content: '';
			display:block;
			width:0.7500rem;
			height:0.5000rem;
			background:url(@/assets/index/arrow-bottom.png);
			background-size:100%;
			margin-left:0.8125rem;
		}
		&.active::after{
			transform:rotateX(180deg);
		}
	}
</style>