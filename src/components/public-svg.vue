<template>
	<svg @click="e => emit('click', e)">
		<use :xlink:href="svg + '#' + icon"></use>
	</svg>
</template>

<script setup lang="ts">
import svg from '/icon.svg';
import { defineProps, defineEmits } from 'vue';
defineProps<{
	icon: string
}>()
const emit = defineEmits(['click'])
</script>