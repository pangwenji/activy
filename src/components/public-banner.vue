
<script setup lang="ts">
import UiNotice from './ui-notice.vue'
import { Swiper, SwiperSlide } from "swiper/vue";

import { defineProps, ref, onMounted, computed, watch } from 'vue';
import { open } from '../router/routes'

import type { Swiper as TypeSwiper } from 'swiper';

import { Controller, Autoplay } from 'swiper/modules';
import { openGame } from "../uilts/public.function";
import { isPc, noticeArray } from "../uilts/async.var";

const props = defineProps<{
	position: GetBanner['request']['position'];
	isBottom?: boolean
}>();
const current = ref(0);
const bannerSwiper = ref()

const banners = ref<GetBanner['response']>([]);

let controlledSwiper = ref<TypeSwiper>();
const setControlledSwiper = (swiper: TypeSwiper) => {
	controlledSwiper.value = swiper;

	swiper.autoplay.start();
}
const setAutoplayStop = (swiper: TypeSwiper) => {
	swiper.autoplay.start()
}
watch(current, (value, _oldVlaue) => {
	if (controlledSwiper) {
		controlledSwiper.value?.slideTo(value);
	}
})

/**指示灯数量 */
const dotsLenth = computed(() => isPc.value ? banners.value.length : banners.value.length)
/**切换banner */
const bannerChange = (e: TypeSwiper) => {
	current.value = e.activeIndex;
}
/**打开链接 */
const openlink = (swiper: TypeSwiper) => {

	let link_type = banners.value[swiper.clickedIndex].link_type;
	let link = banners.value[swiper.clickedIndex].link;
	let param = banners.value[swiper.clickedIndex].param;

	if (!link) {
		return;
	}
	if (link_type === 3) {
		openGame(JSON.parse(link))
		return;
	}
	if (/^\//.test(link)) {
		open<'/turntable'>(link as '/turntable', param as PageData['/turntable'])
		return;
	}
	window.open(link);
}

onMounted(() => {
	'/api/page/getBanner'.GET<GetBanner>({
		position: props.position
	}).then(arr => {
		for (let item of arr) {
			banners.value.push(item)
		}
	})
})

</script>


<template>
	<div>
		<div class="public-banner">
			<div class="banner-box">
				<swiper ref="bannerSwiper" class="swiper" :modules="[Controller, Autoplay]"
					:controller="{ control: controlledSwiper }" :slides-per-view="isPc ? 1 : 1" :space-between="0"
					:data-swiper-autoplay="100" :disableOnInteraction="false" @slideChange="bannerChange"
					@swiper="setControlledSwiper" @autoplayStop="setAutoplayStop" @click="openlink">
					<swiper-slide class="swiper-item" v-for="item in banners" :data-type="item.link_type"
						:data-link="item.link">
						<div class="img-box x-btn">
							<img class="public-image" :src="isPc ? item.image : item.small_image" mode="widthFix"
								error="@/asstes/new/home/error.png" loading="@/asstes/new/home/error.png">
							<!-- <public-image class="public-image" :src="item.image" mode="widthFix"></public-image> -->
						</div>
					</swiper-slide>
				</swiper>
				<div class="indicator-dots" v-if="banners.length && dotsLenth > 1">
					<div class="indicator-dots-item" v-for="(_, i) in dotsLenth" :class="{ active: current === i }"
						@click="current = i"></div>
				</div>
			</div>

		</div>

		<div class="banner-tips h5" v-show="isBottom">
			<ui-notice :symbol="'⠀⠀⠀'" :datas="noticeArray" :time="5" style="width: 100%;"></ui-notice>
			<!-- <img src="@/assets/new/home/home_notice.png" alt="">
		<span>{{config.web_site_notice}}</span> -->
		</div>

	</div>
</template>

<style lang="scss" scoped>
@import '../scss/public.scss';

.divider {
	padding: 10px 0;
}

.public-banner {
	min-height: 120px;
	position: relative;
	overflow: hidden;

	.banner-box {
		margin: -0.6250rem;
	}

	.swiper-item {
		// border-radius: 24px;
	}

	// .swiper,.swiper-item{
	// 	height:17.0667rem;
	// }
	.indicator-dots {
		// height:2rem;
		bottom: 20px;
		z-index: calc(var(--I1) + 0);
		left: 50%;
		transform: translateX(-50%);
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;

		@include pc {
			left: auto;
			right: 0;
			display: grid;
			right: 30px;
			transform: translateX(0);
			top: 50%;
			transform: translateY(-50%);
		}

		.indicator-dots-item {
			width: 0.6250rem;
			height: 0.6250rem;
			border-radius: 0.3125rem;

			background-color: #ffffff;
			margin: 0 0.3125rem;
			transition: all 0.3s ease-out;
			cursor: pointer;

			@include pc {
				margin: 0 auto;
			}

			&.active {
				width: 12px;
				height: 12px;
				background-color: transparent;
				border: 0.5px solid #ffffff;
				border-radius: 50%;

				position: relative;
			}

			&.active::before {
				content: '';
				position: absolute;
				background-color: #ffffff;
				border-radius: 50%;
				width: 8px;
				height: 8px;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}

	.img-box {
		width: 100%;
		height: 100%;
		padding: 0.6250rem;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		@include pc {
			// border-radius: 24px;
		}
	}

	img {
		width: 100%;
		// border-radius: 0.5rem;

		@include pc {
			max-height: 466px;
			// border-radius: 24px;
		}
	}
}

@media (max-width: 9999px) {
	.banner {
		padding-top: 0.6250rem;

		.swiper,
		.swiper-item {
			width: 100%;
			// height:12.8000rem;
		}

		img {
			width: 100%;
		}
	}
}

.swiper-horizontal {
	height: auto;
}

.banner-tips {
	display: flex;
	padding:0.3125rem 0 0.3125rem;

	img {
		width: 16px;
		height: 16px;
	}

	span {
		display: block;
		color: #00FFFF;
		font-size: 12px;
		margin-left: 8px;
		// line-height: 16px;
	}
}</style>