<template>
	<view>
		<scroll-view :show-scrollbar="false" class="scroll-view introduce-meun-view" :scroll-x="true">
			<view v-if="isIndex || isAll" class="introduce-meun-team" @click="onChange(0)"
				:class="{'introduce-meun-team-sign':minMenu == 0}">
				<img src="@/assets/casino/cd.png" v-if="minMenu == 0" />
				<img src="@/assets/casino/wanfa_quanbu2.png" v-else />
				{{$t('pageActivity.whole')}}
			</view>
			<view v-if="isIndex" class="introduce-meun-team " @click="onChange(-1)"
				:class="{'introduce-meun-team-sign':minMenu == -1}">
				<img src="@/assets/casino/wanfa_remen1.png" v-if="minMenu == -1" />
				<img src="@/assets/casino/wanfa_remen2.png" v-else />
				{{$t('pageActivity.hot')}}
			</view>
			<view class="introduce-meun-team" v-for="value,index in list" :key="index" @click="onChange(value.id)"
				:class="{'introduce-meun-team-sign':minMenu == value.id}">
				<img :src="value.icon_click" v-if="minMenu == value.id" />
				<img :src="value.icon" v-else mode=""/>
				{{value.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
	import { ref, defineExpose,onMounted } from "vue"
import { addListener } from "../uilts/db";
import ScrollView from "./scroll-view.vue";
	const props = defineProps<{
		isIndex ?: boolean,
		isAll ?: boolean,
	}>()
	const minMenu = ref(0)

	const list = ref<GetGameTypeList['response']>([])
	const emit = defineEmits(['onChange', 'defaultValue'])
	const onChange = (e: number) => {
		minMenu.value = e
		emit('onChange', e)
	}

	const getGameCategory = () => {
		'/api/game/getGameTypeList'.POST<GetGameTypeList>().then(ret => {
			list.value.length = 0;
			ret.forEach((v, i) => {
				if (i == 0) minMenu.value = v.id
				list.value.push(v)
			})
			if (props.isIndex || props.isAll) minMenu.value = 0
			emit('defaultValue', minMenu.value)
		})
	}

	defineExpose({
		minMenu
	})
	
	addListener('language', (type, _name) => {
		if (type === 'set') {
			getGameCategory()
		}
	})
	onMounted(() => {
		getGameCategory()
	})
</script>

<style lang="scss" scoped>
	.scroll-view {
		// ::-webkit-scrollbar {width: 0;height: 0;background-color: transparent;} 
		white-space: nowrap;
		width: 100%;
		// margin: 0 0.9375rem;
		height: 2.6250rem;
		line-height: 2.6250rem;
		// background-color: #1C1E22;
		border-radius: 0.1087rem;
		margin-top: 0.9375rem;

		.introduce-meun-team {
			cursor: pointer;
			display: inline-block;
			font-size: 0.7819rem;
			color: #FFFFFF;
			padding: 0 0.9375rem;
			height: 2.6250rem;
			margin-right: 0.6250rem;
			// background-color: #1E2024 !important;

			img {
				position: relative;
				top: 0.0625rem;
				width: 0.7813rem;
				height: 0.7813rem;
			}
		}

		.introduce-meun-team-sign {
			background-color: #2D3034 !important;
		}
	}
</style>