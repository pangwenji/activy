<template>
	<div class="public-image">
		<img v-if="imgUrl" v-lazy="imgUrl" />
	</div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch ,nextTick } from 'vue';
	const prop = defineProps<{
		src:string,
		mode?:string
	}>()
	const imgUrl = ref(prop.src)

	watch(prop,(newData,_oldData)=>{
		imgUrl.value = ''
		nextTick(()=>{
			imgUrl.value = newData.src
		})
	})
</script>

<style lang="scss" scoped>
.public-image{
	display:inline-flex;
	align-items:center;
	justify-content:center;
	width:inherit;
	height:inherit;
	overflow: hidden;
}
	uni-image{
		height:auto;
	}
	img{
		display:block;
		width:inherit;
		height:inherit;
		user-select: none;
		-webkit-user-drag: none;
		// position: static !important;
		// opacity:1 !important;
	}
	.image{
		display:flex;
		align-items:center;
		justify-content:center;
		// background-color:#FFF;
		// height:100%;
		margin:0 auto;
		svg{
			width:50%;
			height:50%;
			fill:#222222;
		}
	}
</style>