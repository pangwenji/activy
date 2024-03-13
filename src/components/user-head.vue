<template>
	<img class="user-head" :style="{'width':px,'height':px}" :src="src || user.portrait || defineUrl" mode="aspectFill" />
	<!-- <public-image class="user-head" :src="src || user.portrait || defineUrl" :style="{'width':px,'height':px}" mode="aspectFill"></public-image> -->
</template>

<script setup lang="ts">
	import { defineProps,onBeforeMount,ref } from 'vue';
	import { dbGet } from '../uilts/db';
	import userHead from '@/assets/user/user.png'
	defineProps<{
		src:string,
		px?:string
	}>()
	const defineUrl = userHead;
	const user = ref<UserModel>({})
	dbGet('user').then((ret:UserModel)=>{
		 user.value = ret
	})
	onBeforeMount(()=>{
		dbGet('user').then((ret:UserModel)=>{
			 user.value = ret
		})
	})
</script>

<style lang="scss" scoped>
	.user-head{
		border-radius: 50%;
		aspect-ratio:1;
		height:auto;
		width:auto;
	}
</style>