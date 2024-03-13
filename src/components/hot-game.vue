<template>
	<view class="hot">
		<view class="title sb">
			<view class="title-left">
				<!-- <img class="title-icon" src="@/assets/new/game/hot.png" alt=""> -->
				<span>{{ $t('hotGame') }}</span>
			</view>
			<!-- <view class="btns">
				<view class="all ellipsis" @click="toCasino()">{{ $t('pageIndex.viewAll') }} <span class="h5">{{ totalCount
				}}</span>
				</view>
				<view class="upper" @click="next(-1)" :class="{ 'dis': page == 1 }"></view>
				<view class="next " @click="next(1)" :class="{ 'dis': lastPage <= page }"></view>
			</view> -->
		</view>
		<!-- <view class="slot-list">
		</view> -->
		<public-loading v-if="loading" style="min-height:16.2500rem;"></public-loading>
		<public-grid v-else :max="isPc ? 5 : 3" :margin='isPc ? 40 : 20'>
			<public-game v-for="item in hotGameList" :item="item" @collectGame="collectGame"></public-game>
		</public-grid>

		<!-- <div class="divider"></div> -->
	</view>
</template>

<script setup lang="ts">
import PublicLoading from './public-loading.vue';
import PublicGrid from './public-grid.vue';
import PublicGame from './public-game.vue';
import { onMounted, ref } from 'vue';
import { isPc } from '../uilts/async.var';
import { dbGet } from '../uilts/db';
import { open } from '../router/routes';



const page = ref<number>(1)
const lastPage = ref<number>(2)
const loading = ref<boolean>(false)
const totalCount = ref(0)
const hotGameList = ref<GetGameList["response"]["list"]>([])
const emit = defineEmits(['collectGame'])

const collectGame = (id: Number) => {
	emit('collectGame', id)
}
let pro: Promise<GetGameList["response"]>;
const getGameList = async () => {
	pro && pro.abort();
	let limit = isPc.value ? 10 : 9;
	loading.value = true;
	pro = '/api/game/getGameList'.POST<GetGameList>({
		page: page.value,
		limit: limit,
		is_hot: 1,
		is_mobile: isPc.value ? 0 : 1
	}, {
		Authorization: async () => {
			try {
				return await dbGet('token')
			} catch (e) {
				return undefined
			}
		}
	});
	pro.then((ret) => {
		hotGameList.value.length = 0;
		ret.list.forEach((v) => {
			hotGameList.value.push(v)
		})
		totalCount.value = ret.totalCount
		lastPage.value = Math.ceil(ret.totalCount / limit)
	}).finally(() => {
		loading.value = false;
	})
}

const next = (action: number) => {
	let pages = Math.max(page.value + action, 1);
	if (pages < 0 || pages > lastPage.value) {
		return
	}
	if (pages == page.value) {
		return
	}
	page.value = pages;
	getGameList()
}

const toCasino = () => {
	open('/game', { "t": -1, "n": "热门" });
	// back(-2)
	// uni.$emit('changeCategory', -1)
}
onMounted(() => {
	getGameList()
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

%title-font {
	color: #FFFFFF;
	font-size: 14px;
	// font-weight:700;
}

.hot{
	background-color: #1a1a1a;
	padding: 0.625rem 0.625rem 0.25rem;
}

.title {
	@extend %title-font;
	background: url(@/assets/index/title-icon.png) no-repeat left center;
	background-size: 0.8750rem;

	@include h5 {
		padding-left: 1.3125rem;
		margin-bottom: 0.6250rem;
	}

	@include pc {
		margin: 32px 0;
	}

	&.no-icon,
	&.sb {
		background: none;
		padding: 0;
	}

	&.sb {
		display: flex;
		justify-content: space-between;
	}

	.title-left {
		display: flex;
		align-items: center;

		@include h5 {
			img {
				width: 0.8750rem;
				height: 1.0625rem;
			}

			span {
				padding: 0 5px;
			}
		}

		@include pc {
			img {
				width: 30px !important;
				height: 37px !important;
			}

			span {
				color: #FFFFFF;
				font-family: PingFang SC;
				font-size: 24px;
				font-style: normal;
				font-weight: 500;
				line-height: 40px;
				/* 166.667% */
				padding: 0 13px;
			}
		}

	}
}

.bg {
	$color-1: #622ae0;
	$color-2: #2AE035;
	$color-end: #1e1e22;
	background: -webkit-linear-gradient(to bottom, $color-1, $color-end);
	background: linear-gradient(to bottom, $color-1, $color-end);
	border-radius: 0.1250rem;

	&.bg2 {
		background: -webkit-linear-gradient(to bottom, $color-2, $color-end);
		background: linear-gradient(to bottom, $color-2, $color-end);
	}

	.bg-img {
		height: 10.4688rem;
		width: 100%;
		@extend %flex-center;
	}

	img {
		height: 9.3750rem;
		width: 16.1250rem;
		margin-top: 2.4375rem;
	}

	.bg-content {
		min-height: 6.5625rem;
		background: rgba(0, 0, 0, 0.20);
		padding: 0.6250rem 0.8125rem;
		box-sizing: border-box;
		@extend %flex-center;
		flex-direction: column;
	}

	.txt {
		font-size: 0.7500rem;
		color: #9BA6B3;
		margin-bottom: 0.6250rem
	}

	.btn {
		@include button($color-1);
		width: 100%;
		height: 2.5000rem;

		&.btn2 {
			@include button-color($color-2);
		}
	}
}

.deposit {
	--left-bg: url(@/assets/index/ball_2.2adeb099.png);
	--right-bg: url(@/assets/index/ball_3.21626868.png);
	border-radius: var(--border-radius);
	background: var(--left-bg), var(--right-bg);
	background-color: var(--bgcolor);
	background-repeat: no-repeat, no-repeat;
	background-size: auto 35%, auto 50%;
	background-position: left 3.125rem, 15.625rem center;
	min-height: 20.6250rem;
	display: flex;
	flex-direction: column;

	.top-center {
		height: 9.3750rem;
		@extend %flex-center;
		flex-direction: column;
	}

	.list {
		@extend %flex-center;

		&~.list {
			margin-top: 0.6250rem;
		}
	}

	img {
		width: 4.6875rem;
		height: 1.8750rem;
		padding: 0 0.6250rem;
	}

	.bottom-center {
		flex: 1;
		@extend %flex-center;
		flex-direction: column;
		color: #FFF;
		-webkit-backdrop-filter: blur(6px);
		backdrop-filter: blur(6px);
	}

	.payment-title {
		line-height: 1.6;
		font-weight: 600;

		text {
			color: #FFBF39;
		}

		~.payment-title {
			font-weight: 400;
		}
	}

	.btn {
		@include button(#5617cb);
		width: 7.5000rem;
		height: 2.5000rem;
		margin-top: 1.2500rem;
	}
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
			// font-size: 16px;
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

.slot-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.public-game {
		&:last-child {
			margin: 0;
		}
	}

}
</style>