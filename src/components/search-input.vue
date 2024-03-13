<template>
	<view class="search-view">
		<!-- <img src="@/assets/new/game/Frame.png" alt=""> -->
		<span class="iconfont iconsearch"></span>
		<input class="search-input" :class="{ disabled: disabled, 'input2': type }" v-model="value" @keyup.enter="input"
			@confirm="confirm" confirm-type="search" :placeholder="placeholder" :disabled="disabled" />

	</view>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
const props = defineProps<{
	placeholder?: string;
	modelValue?: string;
	disabled?: boolean;
	type?: boolean;
}>()
const value = ref(props.modelValue || '');
const emit = defineEmits(['input', 'confirm', 'update:modelValue']);
watch(value, (v, _) => {
	emit('update:modelValue', v);
})
const input = (e: Event) => {
	emit('input', e)
}

const confirm = (e: any) => {
	emit('confirm', e)
}
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.iconsearch{
	font-family: iconfont;
	font-size: 1.1rem;
	color: #6e6e6e;
	&::before {
		content: "\e69b";
	}
}

.search-view {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #191919;
	height: 2.2500rem;
	padding: 0 0.6250rem;
	// position: relative;
	border-radius: 0.25rem;

	@include pc {
		height: 60px;
		padding: 0 20px;
	}

	img {
		// position: absolute;
		// left: 0.6250rem;
		width: 1.0000rem;
		height: 1.0000rem;

		@include pc {
			width: 28px;
			height: 28px;
			margin-right: 8px;
		}
	}

	.search-input {
		font-size: 0.8125rem;
		color: #FFFFFF;
		width: calc(100% - 1.8rem);

		@include pc {
			font-size: 18px;
			font-style: normal;
			font-weight: 600;
			line-height: normal;
			color: #B5EBFF;
		}

		&.disabled {
			pointer-events: none;
		}

		&::placeholder {
			color: #6e6e6e;
		}
	}

	.icon {
		width: 1.2500rem;
		fill: #6e6e6e;
		margin-right: 0.6250rem;
	}

	.input2 {
		font-size: 0.8125rem;
		color: #FFFFFF;
		width: calc(100% - 1.8rem);

		@include pc {
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			color: #B5EBFF;
		}

		&.disabled {
			pointer-events: none;
		}

		&::placeholder {
			color: #6e6e6e;
		}
	}
}
</style>