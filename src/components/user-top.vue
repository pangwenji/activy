<template>
	<view class="user-top">
		<view class="user-head-top">
			<img class="user-icon" :src="user.portrait" />
			<text>{{ 'VIP' + user.level}}</text>
			<!-- <image v-if="medalha" class="user-medalha" src="@/assets/user/medalha.png" mode=""></image> -->
		</view>
		<text class="name">{{ user.user_nick ? user.user_nick : user.username }}</text>
		<text class="id">ID：{{ user.id }}</text>
	</view>
</template>

<script setup lang="ts">
import { onUnmounted, reactive } from 'vue';
import { addListener, dbGet, removeListener } from '../uilts/db';
import userPortrait from '@/assets/user/user.png'
import { onLoad, onShow } from '../router/routes';

	const user = reactive({
		level:'',
		user_nick:'',
		username:'',
		id:'',
		portrait:''
	})
	
	const setUser = (type:any,ret:any) => {
		if(type === 'set'){
			user.level = ret.level;
			user.user_nick = ret.user_nick;
			user.username = ret.username;
			user.id = ret.id;
			user.portrait = ret.portrait || userPortrait;
		}
	}
	onUnmounted( () => {
		removeListener('user',setUser)
	})
	onLoad(()=>{
		dbGet('user').then(ret => setUser('set',ret));
		addListener('user',setUser)
	})
	onShow(()=>{
		dbGet('user').then(ret => setUser('set',ret));
		addListener('user',setUser)
	})
</script>

<style lang="scss" scoped>
	.user-top{
		margin: 0 auto;
		text-align: center;
	}
	.user-icon{
		width: 4.3750rem;
		height: 4.3750rem;
		border-radius: 50%;
	}
	.name{
		display: block;
		font-size: 1.0425rem;
		font-family: Source Han Sans SC, Source Han Sans SC-Medium;
		font-weight: 500;
		color: #FEFEFE;
		// width: 4.3750rem;
		margin: auto;
		margin-top: 0.3125rem;
		overflow: hidden; /*隐藏溢出部分*/
		text-overflow: ellipsis; /*超出部分显示省略号*/
		white-space: nowrap; /*禁止换行*/
	}
	.id{
		font-size: 0.6516rem;
		font-family: Source Han Sans SC, Source Han Sans SC-Normal;
		font-weight: normal;
		color: #9BA6B3;
	}
	.user-head-top{
		margin: auto;
		width: 4.3750rem;
		position: relative;
		text{
			background: rgba(0, 0, 0, 0.5);
			color: #FFFFFF;
			font-size: 0.7500rem;
			display: inline-block;
			padding: 0.0625rem 0.6250rem;
			border-radius: 1.5625rem;
			position: absolute;
			bottom: 0;
			right: -0.6250rem;
		}
	}
	.user-medalha{
		width: 1.1719rem;
		height: 1.5625rem;
		position: absolute;
		bottom: 0.2500rem;
		right: 0.2500rem;
	}
</style>