<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue';
import PublicSvg from '../components/public-svg.vue';
import { back, router } from '../router/routes';
import { isPc } from '../uilts/async.var';
let prop = withDefaults(defineProps<{
	title?: string;
	closeLocation?: "left" | "right",
	backingOut?: Function,
	leftCilck?: () => void,
	box?: Array<'left' | 'content' | 'right'>,
	rightCilck?: () => void,
	bgColor?: string,
	headStyle?: AnyObject,
	closeCustomStyle?: Partial<CSSStyleDeclaration>,
}>(), {
	title: '',
	backingOut: () => back(),
});
const name = router.currentRoute.value.meta.title;

let cl = computed(() => {
	return prop.closeLocation || isPc.value ? "right" : "left";
});


</script>

<template>
	<div class="page-head" :style="{
		...(headStyle || {}),
		backgroundColor: bgColor
	}">
		<template v-if="!box || box.includes('left')">
			<div class="icon-btn" @click="backingOut()" v-if="cl == 'left'">
				<!-- <img src="@/assets/new/back-btn.png" class="icon"> -->
				<span class="iconfont iconto"></span>
			</div>
			<div class="icon-btn" v-else @click="() => leftCilck && leftCilck()">
				<slot name="icon-left"></slot>
			</div>
		</template>
		<template v-if="!box || box.includes('content')">
			<div class="name">
				<slot name="content" v-if="$slots['content']"></slot>
				<div v-else-if="title">{{ title }}</div>
				<div v-else>{{ $t(name || '') }}</div>
			</div>
		</template>

		<template v-if="!box || box.includes('right')">
			<div class="icon-btn" @click="backingOut()" v-if="cl == 'right'">
				<public-svg class="icon" :style="closeCustomStyle" icon="icon_Close"></public-svg>
			</div>
			<div class="icon-btn" v-else @click="() => rightCilck && rightCilck()">
				<slot name="icon-right"></slot>
			</div>
		</template>
	</div>
</template>

<style lang="scss" scoped>
@import '../scss/public.scss';
.iconto{
	font-size: 1.5rem;
	font-weight: 300;
	&::before{
		content: "\e64b";
	}
}
.page-head {
	width: 100%;
	height: var(--headers-height);
	display: flex;
	align-items: center;
	justify-content: space-between;
	// background-color:#181538;
	box-sizing: border-box;
	position: relative;
	z-index: calc(var(--I1) + 1);
	// color: #8E90CD;
	color: #ffffff;
	font-weight: 600;
	font-size: 1.0625rem;
	position: relative;
	@include pc {
		background-color: transparent;
		font-size: 24px;
		padding: 0 36px;
	}

	.icon {
		width: 1.25rem;
		height: 1.25rem;
		fill: #FFFFFF;

		@include pc {
			fill: #625EA8;
			width: 28px;
			height: 28px;

			&:hover {
				fill: #00FFFF;
			}
		}
	}

	.icon-btn {
		min-width: 3.1250rem;
		height: var(--headers-height);
		@extend %flex-center;
		cursor: pointer;

		// transform: rotate(180deg);
		@include pc {
			height: 28px;
			width: 28px;
			min-width: 28px;
		}

		&:active .icon {
			fill: #FFF;
		}
	}

}
</style>
