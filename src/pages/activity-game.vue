<template>
	<page>
		<div class="container page-pading" v-if="list.platform_data">
			<view class="title">{{ $t('pageActivityNew.t1') }}</view>

			<view class="min-title">{{ $t('pageActivityNew.t2') }}</view>

			<view class="game-view">
				<view>
					<text class="game-team">
						{{ list.name }}
					</text>
				</view>
			</view>

			<view class="min-title">{{ $t('pageActivityNew.t3') }}</view>

			<view class="game-view">
				<view v-for="v, i in list.platform_data" :key="i" @click="setIndex(i)">
					<text class="game-team" :class="{ 'noOk': index != i }">
						{{ v.name }}
					</text>
				</view>

			</view>

			<view class="min-title" v-if="list.platform_data[index] && list.platform_data[index].game_data.length > 0">
				{{ $t('pageActivityNew.t4') }}</view>

			<view class="game-view" v-if="list.platform_data[index] && list.platform_data[index].game_data.length > 0">
				<text class="game-team" v-for="vv, ii in list.platform_data[index].game_data" :key="ii">
					{{ vv.name }}
				</text>
			</view>
		</div>
	</page>
</template>

<script setup lang="ts">
import Page from "../components/page.vue"
// import arrowMore from "@/components/arrow-more/arrow-more.vue"
import { ref } from "vue"
import { onLoad, onShow } from "../router/routes";
import { dbGet } from "../uilts/db";


const list = ref<GetActivityDetail['response']>({
	platform_data: [],
	name: "",
	type_id: 0
})
const index = ref(0)
// const showMore = ref(false)
const setIndex = (i: number) => {
	index.value = i
}

const getList = (get: GetActivityDetail['request']) => {

	'/api/activity/getActivityDetail'.GET<GetActivityDetail>({
		activity_id: get.activity_id,
		task_id: get.task_id,
	}, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		list.value = ret;
	})
}

onLoad<PageData["/activity-game"]>((get) => {
	getList(get)
})
onShow<PageData["/activity-game"]>(((get) => {
	getList(get)
}))
</script>

<style lang="scss" scoped>
.container {
	
}

.title {
	color: #FFA200;
	font-size: 1.1250rem;
}

.min-title {
	margin-top: 1.2500rem;
	color: #FFA200;
	font-size: 0.8750rem;
}

.game-view {
	padding: 0.0000rem 0;
	display: flex;
	flex-wrap: wrap;
	// justify-content: 
	// grid-template-columns: repeat(3, calc(33.3% - 0.8438rem));
	// // grid-gap 是 row-gap 和 column-gap 的简写形式。
	// grid-gap: 0 1px;
}

.noOk {
	background-color: #24262b !important;
}

.game-team {
	font-size: 0.7500rem;
	color: #909EAB;
	background-color: #3B3F45;
	border-radius: 0.3125rem;
	padding: 0.1563rem 0.3125rem;
	margin-top: 0.6250rem;
	display: inline-block;
	margin-right: 0.6250rem;
}
</style>