<template>
	<page>
	
		<iframe :src="url"  id="iframe" class="web-view"></iframe>
	</page>
</template>

<script setup lang="ts">
	import Page from '../components/page.vue';
	import { ref } from 'vue';
	import { onLoad } from '../router/routes';


	const url = ref<string>('')

	
	interface Option {
		url : string;
		name ?: string;
	}

	onLoad<Option>((_get) => {
		
		url.value = 'http://www.baidu.com'
	})

</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
	page{
		height: 100%;
	}

	.content{
		width: 100%;
		height: 100%;
	}

	.web-view{
		width: 100%;
		height: 100%;
	}
	
	.btn{
		position:fixed;
		left:calc(var(--status-bar-height) + env(safe-area-inset-top));
		top:calc(var(--status-bar-height) + env(safe-area-inset-top));
		display:flex;
		align-items:center;
		justify-content:space-between;
		width:1.8750rem;
		height:1.8750rem;
	}
	.portrait{
		left:calc(var(--status-bar-height) + env(safe-area-inset-top) + 2.5000rem);
	}
	
	
</style>