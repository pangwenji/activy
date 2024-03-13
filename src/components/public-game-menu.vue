<template>
	<scroll-view class="public-game-menu" :show-scrollbar="false" :scroll-x="true">
		<view class="item x-btn" v-if="isAll" :class="{ active: 0 === activeId }" :style="{ '--abc': 98 }"
			@click="selectItem(0)">
			<view class="item-content">
				<public-svg class="icon min-icon" icon="icon_PicksForYou"></public-svg>
				<text>{{ $t('pageActivity.dt') }}</text>
			</view>
		</view>
		<view class="item x-btn" v-if="isHot" :class="{ active: -1 === activeId }" :style="{ '--abc': 97 }"
			@click="selectItem(-1)">
			<view class="item-content">
				<public-svg class="icon" icon="icon_Chip"></public-svg>
				<text>{{ $t('pageActivity.hot') }}</text>
			</view>
		</view>
		<view class="item x-btn" v-for="item, index in list" :class="{ active: item.id == activeId }"
			:style="{ '--abc': 98 - index }" @click="selectItem(item.id)">
			<view class="item-content">
				<img class="icon" :src="item.icon" />
				<img class="icon active" :src="item.icon_click" />
				<text>{{ item.name }}</text>
			</view>
		</view>
	</scroll-view>
</template>

<script setup lang="ts">
import PublicSvg from "./public-svg.vue";
import ScrollView from "./scroll-view.vue";

import { ref, withDefaults, defineEmits, onMounted, watch } from "vue"

const props = withDefaults(defineProps<{
	isHot: boolean,
	isAll: boolean,
	modelValue: number,
	list?: Array<GetGameTypeListItem>
}>(), {
	isHot: false,
	isAll: false,
	modelValue: 0
})
const emit = defineEmits(['change', 'update:modelValue']);
const list = ref<Array<GetGameTypeListItem>>(props.list ?? []);
const activeId = ref(props.modelValue);
watch(props, (value, _oldValue) => {
	activeId.value = value.modelValue;
	emit('change', value.modelValue);
})
const selectItem = (id: number) => {
	activeId.value = id;
	emit('change', id);
	emit('update:modelValue', id);
}
const getGameCategory = () => {
	'/api/game/getGameTypeList'.POST<GetGameTypeList>().then(arr => {
		for (let item of arr) {
			list.value.push(item);
		}
	})
}
onMounted(() => {
	if (!props.list) {
		getGameCategory()
	}
})

</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.public-game-menu {
	@include h5 {
		height: 1.5625rem;
	}

	@include pc {
		height: 56px;
		padding-top: 64px;
		// padding-bottom: 32px;
	}

	white-space: nowrap;

	// overflow-x:scroll;
	.item-content {
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		// background-color: #1E2024;
		padding: 0 0.625rem;
		vertical-align: top;

		&>div {
			display: flex;
			align-items: center;
		}

		color: #c4c4c4;

		@include pc {
			color: #c4c4c4;
		}
	}

	.item {
		display: inline-block;
		color: #c4c4c4;
		box-sizing: content-box;
		height: 100%;
		text-align: center;
		// padding-right: 0.6250rem;
		font-size: 0.8750rem;
		position: relative;
		// padding: 0 1rem;
		z-index: calc(var(--I1) + 0);
		border-radius: 0.25rem;

		@include h5 {
			background-color: #3A3A3A;
			color: #c4c4c4;
			// background-image: url(@/assets/new/game/tab-back-no.png);
			// background-size: 100% 100%;
			// background-repeat: no-repeat;
			cursor: pointer;

			.icon {
				width: 0.9375rem;
				height: 0.9375rem;
				margin-right: 0.3125rem;
				fill: #c4c4c4;
			}

		}

		@include pc {
			border-radius: 8px;
			border: 1px solid #434176;
			margin-right: 40px;
			height: 56px;
			padding: 0 18px 0 20px;
			transform: skew(-5deg);

			// box-sizing: border-box;
			.icon,
			text {
				transform: skew(5deg);
			}

			.icon {
				width: 32px;
				height: 32px;
				fill: #c4c4c4;
				margin-right: 8px;
				// filter: brightness(0.4) sepia(1) hue-rotate(245deg);
				opacity: 0.2;
			}

			.min-icon {
				width: 28px;
				height: 28px;

			}

			text {

				font-family: Montserrat;
				font-size: 20px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
			}
		}


		.active {
			display: none;
		}

		~.item {
			margin-left: 0.3125rem;
		}

		// &:last-child{
		// 	// padding:0;
		// }
		&:hover,
		&.active {
			@include h5 {
				z-index: calc(var(--I1) + 0);
				background-color: #009d80;
				// background-image: url(@/assets/new/game/tab-back.png);
			}

			@include pc {
				background: linear-gradient(146deg, #2E2C5E 19.52%, #2E2C5E 79.82%);

				text {
					background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}

			.item-content {
				// background-color:#2D3034;
				border-radius: 0.1250rem;
				color: #FFFFFF;
			}

			.icon {
				fill: #FFFFFF;
				opacity: 1;
			}

			img {
				display: none;

			}

			.active {
				display: block;
			}
		}
	}
}
</style>