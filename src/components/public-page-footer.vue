<template>
	<div class="public-page-footer">
		<!-- <template v-if="collect.length">
			<view class="title sb">

				<view class="title-left" @click="open('/company')">
					<img class="title-icon" src="@/assets/new/home/game_type-an.png" alt="">
					<span>{{ $t('footer.gamec') }}</span>
				</view>
				<view class="btns">
					<view class="all" @click="open('/company')">
						{{ $t('footer.all') }}
						<span class="h5">{{ collectTotal }}</span>
					</view>
					<view class="upper" @click="nextCollect(-1)" :class="{ 'dis': collectPage <= 1 }"></view>
					<view class="next " @click="nextCollect(1)" :class="{ 'dis': collectLastPage <= collectPage }">
					</view>
				</view>
			</view>

			<public-loading v-if="collectLoading" style=""></public-loading>
			<public-grid v-else :max="isPc ? 6 : 2" :margin='isPc ? 40 : 12' class="empty" :data-empty="$t('ui.empty')">
				<div class="company-card xx-btn" v-for="item in collect" @click="changeCompany(item.code, item.name)">
					<img :src="item.image" alt="">
				</div>

			</public-grid>

			<div class="divider h5"></div>
		</template> -->
		<div class="footer-card h5">
			<!-- <div class="footer-logo">
				<img src="@/assets/new/logo.png" alt="">
			</div> -->
			<div class="menu-new">
				<span @click="$open('/help',{})">{{ $t('footer.new1') }}</span>
				<span @click="$open('/emil')">{{ $t('footer.new2') }}</span>
				<span @click="$open('/waiter')">{{ $t('footer.new3') }}</span>
			</div>

			<div class="lxwm">
				<img @click="openLink('https://t.me/pgnbet')" src="@/assets/new/help/persons.webp" alt="">
				<img @click="openLink('https://direct.lc.chat/17143491/')" src="@/assets/new/help/service.webp" alt="">
			</div>
			<div class="footer-tips2">
				<span>{{ $t('footer.new4') }}</span>
			</div>
			<div class="hlep-card">
				<div>
					<span class="hlep-team" @click="$open('/help',{type:'terms_of_service'})">{{ $t('footer.f1') }}</span>
					<span class="hlep-team" @click="$open('/help',{type:'privacy_policy'})">{{ $t('footer.f2') }}</span>
				</div>
				<!-- <br/> -->
				<div>
					<span class="hlep-team" @click="$open('/help',{type:'sports_terms'})">{{ $t('footer.f3') }}</span>
					<span class="hlep-team" @click="$open('/help',{type:'faq'})">{{ $t('footer.f4') }}</span>
				</div>
				<div>
					<span class="hlep-team" @click="$open('/help',{type:'bonus_policy'})">{{ $t('footer.f5') }}</span>
					<span class="hlep-team" @click="$open('/help',{type:'responsible_gaming'})">{{ $t('footer.f6') }}</span>
				</div>
			</div>
			<div class="fgx">
				PGNEW
			</div>
			<div class="footer-tips">
				<span>{{ $t('footer.rule_one') }}</span>
        <span>{{ $t('footer.rule_two') }}</span>
        <span>{{ $t('footer.rule_three') }}</span>
			</div>
			<div class="top" @click="isGoTop = !isGoTop">
				<div>
					<span class="iconfont iconto"></span>
				<span>Top</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import PublicLoading from '../components/public-loading.vue'
import PublicGrid from '../components/public-grid.vue'
import { onMounted, ref } from 'vue';
import { back, open } from '../router/routes';
import { casinoClassify, casinoType, companyType, config, isGoTop, isPc } from '../uilts/async.var';
import { dbGet } from '../uilts/db';

let collect = ref<Array<GetCompanyListItem>>([])

const openLink = (url:string) => {
	window.open(url)
}

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
	collectPro = '/api/page/getCompanyList'.GET<GetCompanyListPage>({
		page: collectPage.value,
		limit: isPc.value ? 6 : 4
	});
	collectPro.then(ret => {
		collect.value.length = 0;
		ret.list.forEach((v) => collect.value.push(v))
		collectLastPage.value = Math.ceil(ret.totalCount / (isPc.value ? 6 : 4))
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
const changeType = (type: number) => {
	/** 去赌场 */
	casinoType.value = type
	back(-1)
	/**去游戏详情 */
	// gameType.value = type
	// open('/game', { t: type })
}
onMounted(() => {
	getCollect()
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.top{
	width: 2.5875rem;
	height: 2.5875rem;
	border-radius: 0.1125rem;
	background: rgb(37, 39, 44);
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FFF;
	font-size: 0.675rem;
	margin: auto;
	span{
		display: block;
	}
	.iconto{
		color: rgb(255, 106, 1);
		font-size: 0.5625rem;
		-webkit-font-smoothing: antialiased;
		transform:rotate(90deg);
		
		&::before{
			content: ""
		}
	}
}
.hlep-card {
	padding-top: 1rem;
	color: #adadad;
	font-size: 0.75rem;
	// display: flex;
	// justify-content: center;
	// flex-wrap: wrap;
	text-align: center;

	.hlep-team:nth-child(2n) {
		margin-left: 1rem;
		// flex: 50%;
		// text-align: center;
	}
}

.fgx {
	text-align: center;
	color: #adadad;
	border-bottom: 0.1rem solid gray;
	padding: 0.625rem 0 0.3125rem;
}

.footer-tips2 {
	vertical-align: inherit;
	color: #adadad;
	font-size: 0.75rem;
	text-align: center;
}

.lxwm {
	padding: 1.25rem 0 0.625rem;
	display: flex;
	justify-content: center;

	img {
		display: block;
		width: 2.4rem;
		height: 2.4rem;
	}

	img:first-child {

		margin-right: 1rem;
	}
}

.menu-new {
	display: flex;
	justify-content: space-between;
	color: #FFFFFF;
	font-size: 0.75rem;

	span {
		text-align: center;
		width: 33.33%;
		display: block;

		&:nth-child(2) {
			border-left: 1px solid grey;
			border-right: 1px solid grey;
		}
	}
}

.public-page-footer {
	padding: 0.625rem 1.75rem  1.5rem;
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

.footer-menu {
	display: flex;
	flex-wrap: wrap;

	.menu-team {
		width: 50%;
		font-size: 12px;
		padding-top: 0.6250rem;

		.menu-title {
			color: #8E90CD;
			padding-top: 0.3125rem;
		}

		.menu-min {
			color: #595A84;
			padding-top: 0.5625rem;
		}
	}
}

.footer-tips {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
	color: #adadad;
	font-size: 0.625rem;
	padding: 0.7813rem 0;
}

.footer-logo {
	height: 1.5000rem;
	width: auto;

	img {
		height: 1.5000rem;
		width: auto;
	}
}

%title-font {
	color: #00FFFF;
	font-size: 14px;
	// font-weight:700;
}



.btns {
	font-weight: normal;
	display: flex;
	align-items: center;

	.all {
		min-width: 3.156rem;
		padding: 0 0.25rem;
		height: 1.25rem;
		border-radius: 0.25rem;
		background-color: #3C3E6D;
		font-size: 0.75rem;
		font-weight: 400;
		align-items: center;
		color: #8E90CD;
		margin-right: 0;
		@extend %flex-center;

		@include pc {
			min-width: 87px;
			height: 40px;
			border-radius: 8px;
			border: 1px solid #2E2B4F;
			// opacity: 0.2;
			background: #2E2B4F;
			box-sizing: border-box;
			font-size: 16px;
		}

		span {
			color: #B5EBFF;
			margin-left: 0.25rem;
		}
	}

	.upper,
	.next {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 0.25rem;
		margin-left: 5px;
		background-image: url(@/assets/new/index/arrow-no-dis.png);
		background-color: #2E2B4F;
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.8rem;
		border: 1px solid #2E2B4F;

		@include pc {
			width: 40px;
			height: 40px;
			background-color: #2E2B4F;
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 20px;
			border-radius: 8px;
			border: 1px solid #2E2B4F;
			box-sizing: border-box;


		}

		&.dis {
			background-image: url(@/assets/new/index/arrow-dis.png);
			background-color: #1E1B3B;
			border: 1px solid #282547;
		}


	}


	.upper:not(.dis),
	.next.dis {
		transform: rotate(180deg);
	}


	.upper:hover {
		background-image: url(@/assets/new/index/arrow-no-dis.png);
		background-color: #2E2B4F;
		border: 1px solid #2E2B4F;
		transform: rotate(180deg);
	}

	.next:hover {
		background-image: url(@/assets/new/index/arrow-no-dis.png);
		background-color: #2E2B4F;
		border: 1px solid #2E2B4F;
		transform: rotate(0deg);
	}
}



.title {
	@extend %title-font;
	background: url(@/assets/index/title-icon.png) no-repeat left center;
	background-size: 1.2500rem;
	display: flex;
	align-items: center;

	// padding-left: 1.8750rem;
	margin-bottom: 0.6250rem;

	@include pc {
		font-size: 24px;
		padding: 32px 0 !important;
	}

	&.no-icon,
	&.sb {
		background: none;
		padding: 0;
	}

	&.sports {
		// background-size:1.8750rem;
		background-image: url(@/assets/index/1.png);
	}

	&.sb {
		display: flex;
		justify-content: space-between;
	}

	.title-icon {
		@include h5 {
			width: 1.0000rem;
			margin-right: 0.35rem;
		}

		@include pc {
			width: 40px;
			height: 40px;
			margin-right: 8px;
		}
	}

	.title-left {
		display: flex;
		align-items: center;

		img {
			@include h5 {
				width: 1rem;
				margin-right: 0.35rem;
			}

			@include pc {
				width: 40px;
				height: 40px;
				margin-right: 8px;
			}

		}

		span {
			color: #8E90CD;

			@include pc {
				color: #8E90CD;
			}

			padding: 0 5px;
		}
	}
}</style>