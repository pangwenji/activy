<template>
	<page :head-box="isPc ? ['content', 'right'] : undefined">
		<div class="page-k page-pading">
            <public-loading v-if="collectLoading" style="min-height:16.2500rem;"></public-loading>
			<public-grid v-else :max="isPc ? 2 : 2" :margin='isPc ? 40 : 12' class="empty" :data-empty="$t('ui.empty')">
				<div class="company-card xx-btn" v-for="item in collect"
					@click="changeCompany(item.code, item.name)">
					<img :src="item.image" alt="">
				</div>

			</public-grid>
        </div>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import PublicLoading from '../components/public-loading.vue'
import PublicGrid from '../components/public-grid.vue'
import { onMounted, ref } from 'vue';
import { back, open } from '../router/routes';
import { companyType, isPc } from '../uilts/async.var';
import { dbGet } from '../uilts/db';

let collect = ref<Array<GetCompanyListItem>>([])

const nextCollect = (action: number) => {
	let page = Math.max(collectPage.value + action, 1);
	if (page < 0 || page > collectLastPage.value) {
		return
	}
	if (page == collectPage.value) {
		return
	}
	collectPage.value = page;
	getCollect()
}

const collectPage = ref(1)
const collectLastPage = ref(1)
const collectTotal = ref(0)
//获取厂商列表
const collectLoading = ref(false);
let collectPro: Promise<GetCompanyListPage['response']>;
const getCollect = () => {
	collectLoading.value = true;
	collectPro && collectPro.abort();
	collectPro = '/api/page/getCompanyList'.GET<GetCompanyListPage>();
	collectPro.then(ret => {
		collect.value.length = 0;
		ret.list.forEach((v) => collect.value.push(v))
		collectLastPage.value = Math.ceil(ret.totalCount / (isPc.value ? 6 : 3))
		collectTotal.value = ret.totalCount
	}).finally(() => {
		collectLoading.value = false;
	})
}

const changeCompany = (code: string, name: string) => {
	companyType.value = {
		code,
		name
	}

	open('/game', { game_company_code: code, n: name })
}

onMounted(() => {
	getCollect()
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.page-k {

}


.company-card {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 0.5000rem;
	background: #201E47;
	padding: 1.1563rem 0;
	margin-bottom: 0.6250rem;

	img {
		width: auto;
		height: 1.6875rem;

	}
}

</style>