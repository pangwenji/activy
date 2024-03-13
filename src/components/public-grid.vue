<template>
	<view class="public-grid" :style="{
		gridTemplateColumns:'repeat(' + max + ', calc(100% / ' + max + ' - ' + ((margin || 0) / 32) + 'rem))',
	}">
		<slot></slot>
	</view>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	defineProps<{
		margin?:number;
		max?:number
	}>()
	
</script>

<style lang="scss" scoped>
	.public-grid {
		display: grid;
		justify-content: space-between;
		grid-gap:0 1px;
	}
	// gridTemplateColumns:'repeat(' + max + ', calc(100% / ' + max + ' - ' + margin + 'upx))',
</style>