<template>
	<page :on-pullup="nextPage" :on-pulldown="onPullDownRefresh" :show-header="!isPc">
		<div class="content page-pading">
			<view class="title sb pc">

				<view class="title-left">
					<img class="title-icon" src="@/assets/new/hall/sc.png" alt="">
					<span>{{ $t('collect') }}</span>
				</view>
				<view class="btns">
					<!-- <view class="all">
						全部
						<span class="h5">{{ collectTotal }}</span>
					</view> -->
					<view class="upper" @click="next(-1)" :class="{ 'dis': collectPage <= 1 }"></view>
					<view class="next " @click="next(1)" :class="{ 'dis': collectLastPage <= collectPage }">
					</view>
				</view>
			</view>
			<view class="slot-card">
				<view class="empty" :data-empty="$t('ui.empty')">
					<public-grid v-if="collect.length > 0" :max="isPc ? 5 : 3" :margin='isPc ? 40 : 12' class="empty"
						:data-empty="$t('ui.empty')">
						<public-game v-for="item, index in collect" :item="{
							...item.gameData,
							is_collect: 1
						}" :isCollectList="true" @delGame="delGame(index)"></public-game>
					</public-grid>
				</view>
			</view>
		</div>


		<!-- <view class="pad">
			<hot-game></hot-game>
		</view> -->
	</page>
</template>

<script setup lang="ts">
import Page from "../components/page.vue"
import ArrowMore from "../components/arrow-more.vue"
import PublicGrid from '../components/public-grid.vue'
import PublicGame from '../components/public-game.vue'
import { ref } from 'vue';
import { isPc } from '../uilts/async.var';
import { dbGet } from '../uilts/db';
import { onLoad, onShow } from "../router/routes";



let collect = ref<GameList["response"]["list"]>([])
const collectTotal = ref(0)
const collectPage = ref<number>(1)
const collectLastPage = ref<number>(1)
const showMore = ref<boolean>(false)

//获取收藏列表
const getCollect = async () => {
	let limit = isPc.value ? 10 : 12
	let ret = await '/api/game/gameList'.POST<GameList>({
		page: collectPage.value,
		limit: limit
	}, {
		Authorization: async () => await dbGet('token')
	})

	if (collectPage.value === 1) {
		collect.value.length = 0;
	}
	if(isPc.value) collect.value.length = 0;
	ret.list.forEach((v) => {
		collect.value.push(v)
	})
	showMore.value = false
	collectTotal.value = ret.totalCount
	collectLastPage.value = Math.ceil(ret.totalCount / limit)
}
const next = (action: number) => {
	let pages = Math.max(collectPage.value + action, 1);
	if (pages < 0 || pages > collectLastPage.value) {
		return
	}
	if (pages == collectPage.value) {
		return
	}
	collectPage.value = pages;
	getCollect()
}
const nextPage = async () => {
	if (collectLastPage.value > collectPage.value) {
		showMore.value = true
		collectPage.value += 1
		await getCollect()
	}
}

const delGame = (e: number) => {

	collect.value.splice(e, 1)
	collect.value = JSON.parse(JSON.stringify(collect.value))
}

const onPullDownRefresh = async () => {
	collect.value.length = 0
	collectPage.value = 1
	await getCollect()
}

// const onReachBottom = nextPage()

onLoad(() => {
	getCollect()
})
onShow(() => {
	collect.value.length = 0
	collectPage.value = 1
	getCollect()
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.content {
	min-height: 100vh;

	@include pc {
		min-height: 886px;
		// padding: 32px 68px;
	}
}

// page{
// 	// background-color:var(--body-background-color);
// }
.slot-card {
	// padding: 0.7813rem;

	@include pc {
		padding: 0;
	}
}

.empty {
	@include h5 {
		// padding: 0.625rem;
	}
}

.pad {
	padding: 0.9375rem;
	box-sizing: border-box;
}

.slot-list {
	display: flex;
	flex-wrap: wrap;

	// justify-content:space-between;
	.public-game {
		margin-right: 0.6250rem;

		&:last-child {
			margin: 0;
		}
	}
}

%title-font {
	color: #FFF;
	font-size: 1.0000rem;
	// font-weight:700;
}

.title {
	padding: 3.7500rem 0.6250rem 2.5000rem;
	@extend %title-font;
	font-weight: bold;
	// background:url(@/assets/index/title-icon.png) no-repeat left center;
	// background-size:0.8750rem;
	// padding-left:1.3125rem;
	// margin-bottom: 1.2500rem;
	// &.no-icon,&.sb{
	// 	background:none;
	// 	padding:0;
	// }
	// &.sb{
	// 	display:flex;
	// 	justify-content:space-between;
	// }
}

.title-max {
	@extend %title-font;
	background-size: 0.8750rem;
	padding: 3.7500rem 0.6250rem 0;
	font-size: 1.8750rem;
	font-weight: bold;
	text-align: center;

	&.no-icon,
	&.sb {
		background: none;
		padding: 0;
	}

	&.sb {
		display: flex;
		justify-content: space-between;
	}

}

.arrow {
	background-color: #2D3035;
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

%title-font {
	color: #00FFFF;
	font-size: 14px;
	// font-weight:700;
}


.btns {
	font-weight: normal;
	display: flex;

	.all {


		@extend %flex-center;
		margin-right: 0;
		color: #8E90CD;

		@include h5 {
			min-width: 3.1250rem;
			padding: 0 0.3125rem;
			height: 1.5625rem;
			background-color: #231d4e;
			font-size: 0.6rem;
			// font-size: 12px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			align-items: center;
		}

		@include pc {
			color: #8E90CD;
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
			color: #00FFFF;
			font-size: 0.6rem;
			padding: 0 0.5rem;
		}
	}

	.upper,
	.next {
		margin-left: 5px;
		background-image: url(@/assets/new/index/arrow-no-dis.png);

		@include h5 {
			width: 1.5625rem;
			height: 1.5625rem;
			background-color: #231d4e;
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 1rem;
		}

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
		}
	}

	.upper:not(.dis),
	.next.dis {
		transform: rotate(180deg);
	}

	.upper:hover {
		background-image: url(@/assets/new/index/arrow-no-dis.png);
		background-color: #2E2B4F;
		border: 1px solid #2E2B4F;
		transform: rotate(180deg);
	}

	.next:hover {
		background-image: url(@/assets/new/index/arrow-no-dis.png);
		background-color: #2E2B4F;
		border: 1px solid #2E2B4F;
		transform: rotate(0deg);
	}
}



.title {
	@extend %title-font;
	background: url(@/assets/index/title-icon.png) no-repeat left center;
	background-size: 1.2500rem;
	display: flex;
	align-items: center;

	// padding-left: 1.8750rem;
	margin-bottom: 0.6250rem;

	@include pc {
		font-size: 24px;
		padding: 32px 0 !important;
	}

	&.no-icon,
	&.sb {
		background: none;
		padding: 0;
	}

	&.sports {
		// background-size:1.8750rem;
		background-image: url(@/assets/index/1.png);
	}

	&.sb {
		display: flex;
		justify-content: space-between;
	}

	.title-icon {
		@include h5 {
			width: 1.0000rem;
			height: 1.0000rem;
			margin-right: 0.3125rem;
		}

		@include pc {
			width: 40px;
			height: 40px;
			margin-right: 8px;
		}
	}

	.title-left {
		display: flex;
		align-items: center;

		img {
			@include h5 {
				width: 0.8750rem;
				height: 1.0625rem;
				margin-right: 0.3125rem;
			}

			@include pc {
				width: 40px;
				height: 40px;
				margin-right: 8px;
			}

		}

		span {
			color: #8E90CD;

			@include pc {
				color: #8E90CD;
			}

			padding: 0 5px;
		}
	}
}</style>
