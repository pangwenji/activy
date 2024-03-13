<template>
	<view class="popup" v-if="isAdd">
		<view class="pop-up">
			<public-svg @click="buttonClick" class="right-icon -btn" icon="icon_Close"
				:style="{ width: '1.0000rem', fill: '#656d77', height: '1.0000rem' }">
			</public-svg>
			<slot name="content"></slot>
		</view>
	</view>
</template>

<script setup lang="ts">
import PublicSvg from '../components/public-svg.vue';
import { isAdd } from '../uilts/async.var';

const buttonClick = (_e: any) => {
	isAdd.value = false
}
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.popup {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: 0;
	z-index: calc(var(--I1) + 0);
	background-color: rgba(0, 0, 0, 0.75);
	@extend %flex-center;
}

.pop-up {
	// background-color: rgba(0, 0, 0, 0.75);
	position: relative;
	width: 18.3750rem;
	border-radius: 0.1084rem;

	.right-icon {
		position: absolute;
		right: 0.6250rem;
		top: 0.6250rem;
		z-index: calc(var(--I1) + 0);
	}

	.pop-up-title {
		font-size: 1.1250rem;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		margin: 0.7813rem;
	}

	.pop-up-content {
		color: #9BA6B3;
		font-size: 0.8750rem;
		width: 15.8750rem;
		margin: 0.7813rem;
		padding: 0.4688rem;
		height: 17.8125rem;
		// background-color: #151617;
		border-radius: 0.1084rem;
	}
}

.bootom-y {
	width: 75%;
	height: 2.3438rem;
	background-color: #01ac0b;
	background-image: conic-gradient(from 1turn, #2AE035, #01ac0b);
	color: #FFFFFF;
	font-size: 0.7813rem;
	line-height: 2.3438rem;
	border-radius: 0.1250rem;
	margin-top: 0.7813rem;
	font-weight: bold;
}

@media (min-width:9999px) {
	.pop-up {
		width: 21.8750rem;
		height: 60vh;
	}

	.pop-up-content {
		width: 19.3750rem !important;
		height: 52vh !important;
	}
}
</style>