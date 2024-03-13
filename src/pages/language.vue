<template>
	<page   close-location="right">
		<div class="page-k page-pading">
			<div class="title">{{ $t("locationPreference") }}</div>
			<div class="card" v-for="item in il8nList">
				<view class="item btn" @click="changeLanguage(item)">
					<div class="left-v">
						<img :src="item.lang_icon" alt="">
						<span :class="index === item.lang && 'active'">{{ item.remark }}</span>
					</div>
					<!-- <div class="svg-card" v-show="index === item.lang">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="12" viewBox="0 0 16 12" fill="none">
							<path
								d="M0.714286 4.28571C1.22712 3.77288 2.05859 3.77288 2.57143 4.28571L7.21429 8.92857C7.72712 9.44141 7.72712 10.2729 7.21429 10.7857C6.70145 11.2986 5.86998 11.2986 5.35714 10.7857L0.714285 6.14286C0.20145 5.63002 0.20145 4.79855 0.714286 4.28571Z"
								fill="#231D4E" />
							<path
								d="M15.5714 0.571429C16.0843 1.08426 16.0843 1.91574 15.5714 2.42857L7.21429 10.7857C6.70145 11.2986 5.86998 11.2986 5.35714 10.7857C4.84431 10.2729 4.84431 9.44141 5.35714 8.92857L13.7143 0.571428C14.2271 0.0585923 15.0586 0.0585928 15.5714 0.571429Z"
								fill="#231D4E" />
						</svg>
					</div> -->
				</view>
			</div>
		</div>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import { onServerPrefetch, ref } from 'vue';
import { dbGet, dbSet } from '../uilts/db';
import { il8nList, languageIcon, unit } from '../uilts/async.var';
import { lang } from '../uilts/base';
import { back, onLoad } from '../router/routes';
let index = ref(lang);
let language = ref<Init['response']['language']>([])
type Item = Init['response']['language'][number];
const changeLanguage = async (item: Item) => {
	unit.value = item.unit;
	languageIcon.value = item.lang_icon
	await dbSet('moneyCode', item.code)
	await dbSet('language', item.lang)
	index.value = item.lang;
	back()
}


onServerPrefetch(async () => {
	language.value = (await dbGet('init')).language;
	index.value = await dbGet('language');
})


// dbGet('init').then(init => {
// 	language.value = init.language
// })
// dbGet('language').then(name => {
// 	index.value = name;
// })
onLoad(() => {
	dbGet('init').then(init => {
		language.value = init.language
	})
	
	dbGet('language').then(name => {
		index.value = name;
	})
})
</script>

<style lang="scss" scoped>
.page-k {
	margin: 0 auto;
	background-color: #4a4a4a;
	border-radius: .3rem;
	padding: 1.6rem 1.6rem;
	box-sizing: border-box;
}

:deep(.icon-btn) {
	align-items: flex-end;
	padding-top: .7rem;
	box-sizing: border-box;
	min-width: auto !important;
}

.card {
	padding-bottom: 0.64rem;
	box-sizing: border-box;
}

.title {
	color: #FFFFFF;
	font-size: 1.04rem;
	margin-bottom: .6rem;
	box-sizing: border-box;
}

.item {
	padding: .54rem 0.7500rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	// color: var(--MENU, #8E90CD);
	font-family: PingFang SC;
	font-size: 0.8750rem;
	font-style: normal;
	font-weight: 400;
	border-radius: 0.1875rem;
	background-color: #2e2d2d;
	.left-v{
		display: flex;
		align-items: center;
		color: #fff;
		img{
			// width: 1.1250rem;
			height: 1.1250rem;
			margin-right: 16px;
			box-sizing: border-box;
		}
		span {
			// color: rgba(255,255,255,.8)
		}
		.active {
			// color: rgba(255,255,255,1);
		}
	}
}

.svg-card {
	width: 0.9375rem;
	height: 0.9375rem;
	background-color: #00FFFF;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #009d80;

	svg {
		width: 0.4688rem;
		height: 0.6563rem;
	}
}
</style>