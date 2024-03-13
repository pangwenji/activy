<template>
	<page :backing-out="() => $back(-1)" :mouse-wheel="true" :onPulldown="onPulldown" :onPullup="onPullup">
		<template #header-content>
			<div class="header-content-auto">
				{{ $t('agentNew') }}-{{ $t('agentNewMin') }}{{ unit }}10000
			</div>
		</template>
		<template #header-icon-right>
			<span class="iconfont iconhomeempty" @click="$back(-1)"></span>
		</template>
		<div class="page-pading column-center">
			<!-- <div class="top-mark"></div> -->
			<div class="tab-box row-center">
				<!-- <div class="line" :style="{
					transform: `translateX(${tabOffset}px)`,
					width: `${lineWidth}px`,
				}"></div> -->

				<div class="tab cursor" ref="tabDom" :class="{ 'active': 0 === tabIndex }" @click="switchTab(0)">
					{{ t('pageAgent.d1') }}</div>
				<div class="tab cursor" ref="tabDom" :class="{ 'active': 1 === tabIndex }" @click="switchTab(1)">
					{{ t('pageAgent.d2') }}</div>
				<div class="tab cursor" ref="tabDom" :class="{ 'active': 2 === tabIndex }" @click="switchTab(2)">
					{{ t('pageAgent.d3') }}</div>
				<div class="tab cursor" ref="tabDom" :class="{ 'active': 3 === tabIndex }" @click="switchTab(3)">
					{{ t('pageAgent.d4') }}</div>
				<div class="tab cursor" ref="tabDom" :class="{ 'active': 4 === tabIndex }" @click="switchTab(4)">
					{{ t('pageAgent.d5') }}</div>
			</div>

			<div style="margin-top: 5px; flex: 1">
				<KeepAlive>
					<component @switchTab="switchTab" v-model:isPulldown="isPulldown" v-model:isPullup="isPullup"
						:is="tabList[tabIndex].component"></component>
				</KeepAlive>
			</div>
		</div>
	</page>
</template>

<script setup lang="ts">
import { onLoad, onShow, open } from '../router/routes';
import { ref, nextTick, provide } from "vue"
import AgentRule from "../components/9f/agent-rule.vue"
import Page from "../components/page.vue"
// import AgentFAQ from "../components/9f/agent-faq.vue"
import AgentFAQ from "../components/9f/agent-level.vue"
import Commission from "../components/9f/agent-commission.vue"
import RebateMy from "../components/rebate-my.vue"
import RebateTeam from "../components/rebate-team.vue"
import { unit } from "../uilts/async.var"
import { t } from '@/uilts/i18n';
import { dbGet } from '@/uilts/db'

// const tabDom = ref('');

let tabList = ref([
	{ title: t('pageAgent.d1'), component: Commission, },
	{ title: t('pageAgent.d2'), component: RebateTeam, },
	{ title: t('pageAgent.d3'), component: RebateMy, },
	{ title: t('pageAgent.d4'), component: AgentFAQ, },
	{ title: t('pageAgent.d5'), component: AgentRule, },
])

const isPulldown = ref(false)
const isPullup = ref(false)

const useTabSwitch = (index: number = 0, els?: HTMLElement[]) => {
	const tabIndex = ref(index)
	const tabOffset = ref(0);
	const lineWidth = ref(4.375);

	const switchTab = (index: number) => {
		// const dom = els.value[index] as HTMLElement;
		tabIndex.value = index;
		// lineWidth.value = dom.offsetWidth;
		// tabOffset.value = dom.offsetLeft;
		// tabOffset.value = 4.375 * index;
	}
	// nextTick(() => {
	// 	const dom = els.value[tabIndex.value];
	// 	lineWidth.value = dom.offsetWidth;
	// 	tabOffset.value = dom.offsetLeft;
	// })
	return { tabIndex, switchTab, tabOffset, lineWidth }
}

const { tabIndex, switchTab, tabOffset, lineWidth } = useTabSwitch(0,);


const onPulldown = () => {
	isPulldown.value = true;
}
const onPullup = () => {
	isPullup.value = true;
}

provide('switchTab', switchTab);
onLoad(() => {

})
onShow(() => {


})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';


@mixin cardWrap {
	display: flex;
	background: white;
	flex-direction: column;
	padding: 0 .625rem;
	margin-bottom: .625rem;
	border-radius: .125rem;

	.title {
		color: grey;
		font-size: .75rem;
		padding: .3125rem 0;
	}

	.line {
		background: #bdbdbd;
		width: 100%;
		height: 1px;

	}
}


.page-pading {
	position: relative;
	min-height: calc(100vh - var(--headers-height));
	background: rgb(237, 237, 237);
	overflow-y: auto;

	@media (min-width: 750px) {
		// height: calc(100vh - var(--headers-height));
	}

	&::-webkit-scrollbar {
		display: none;
	}
}

.top-mark {
	position: absolute;
	top: 0;
	left: 0;
	height: 2.5rem;
	width: 100%;
	background: linear-gradient(to bottom, rgba(#000, 0.6), rgba(#000, 0.3), rgba(#000, 0.1), rgb(237, 237, 237), rgb(237, 237, 237, .8), rgb(237, 237, 237.5), rgb(237, 237, 237, .1));
}

.tab-box {
	position: relative;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
	width: 100%;

	.tab {
		font-family: SWISSC;
		font-size: .8125rem;
		color: grey;
		margin-bottom: .3125rem;
	}

	.active {
		border-bottom: .125rem solid #009d80;
		color: #009d81;
		padding-bottom: .0625rem;
	}

	.line {
		position: absolute;
		left: 0;
		bottom: 0;
		height: .125rem;
		transition: all .3s ease;
		background: #009d80;
	}
}

.public-loading-top {
	margin-top: 100%;
}

.content {}

.tips-card-k {
	padding: 0.5000rem 0 0.6250rem;

	@include pc {
		padding: 0;
	}

	.tips-card {
		background: #231D4E;
		border-radius: 0.5000rem;
		display: flex;
		padding: 0.6250rem;

		@include pc {
			padding: 20px;
			height: 265px;
			background: #231D4E;
			display: flex;
			align-items: center;
			width: calc(100% - 40px);
			border-radius: 16px;
		}

		.tips-card-img {
			width: 8.0313rem;
			height: 7.7500rem;

			@include pc {
				width: 285px;
				height: 265px;
			}

			img {
				width: 100%;
				height: 100%;
			}
		}

		.tips-card-v {
			padding-left: 0.6250rem;
			width: calc(100% - 1.2500rem - 7.7188rem - 0.3125rem);

			@include pc {
				width: auto;
			}

			.p1 {
				@include pc {
					display: flex;
					min-height: 40px;
					line-height: 40px;
					// align-items: center;
				}

				.p1-1 {
					color: var(--MENU, #8E90CD);
					font-family: PingFang SC;
					font-size: 0.7500rem;
					font-style: normal;
					font-weight: 600;
					line-height: normal;

					@include pc {
						font-size: 24px;
						line-height: 44px;
					}
				}

				.p1-2 {
					opacity: 0.8;
					color: var(--SVG);
					font-family: PingFang SC;
					font-size: 0.8750rem;
					font-style: normal;
					font-weight: 600;
					line-height: normal;
					padding-top: 0.3125rem;

					@include pc {
						padding-top: 0;
						font-size: 28px;
						padding-left: 20px;
					}
				}
			}

			.p2 {
				color: var(--MENU, #8E90CD);
				font-family: PingFang SC;
				font-size: 0.5625rem;
				font-style: normal;
				font-weight: 400;
				line-height: normal;

				@include pc {
					font-size: 16px;
					padding: 10px 0;
				}
			}

			.p3 {
				color: var(--TAB-, #5B6DA1);
				font-family: PingFang SC;
				font-size: 0.5625rem;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				padding: 0.6250rem 0;

				@include pc {
					font-size: 16px;
					padding: 0;
				}
			}

			.p4 {
				display: flex;
				justify-content: flex-end;
			}

			.btn {
				border-radius: 0.5rem;
			}

			.kf-btn {
				color: #FFFFFF;
				text-align: center;
				font-family: PingFang SC;
				font-size: 0.8750rem;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0.2500rem 1.2500rem;
			}
		}

		@include pc {

			.kf-btn {
				color: #FFFFFF;
				text-align: center;
				font-family: PingFang SC;
				font-size: 18px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				display: flex;
				justify-content: center;
				align-items: center;
				display: flex;
				width: 111px;
				height: 50px;
				padding: 8px 40px;
				justify-content: center;
				align-items: center;
				flex-shrink: 0;


			}

			.p4-btn {
				margin-left: 122px;

				.btn {
					border-radius: 8px;
				}
			}
		}
	}
}

.ddv {
	@include pc {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-bottom: 64px;

		.menu-team-k {
			padding-bottom: 20px;
			width: calc(50% - 13px);
		}
	}
}

.menu-team-k {
	@include h5 {
		padding-bottom: 0.6250rem;
	}
}

.menu-team {
	padding: 0.6250rem;
	border-radius: 0.5000rem;
	background: #201E47;
	display: flex;
	align-items: center;

	@include pc {
		padding: 20px;
		border-radius: 16px;
	}

	.menu-icon {
		width: 2.7500rem;
		height: 2.7500rem;

		@include pc {
			width: 80px;
			height: 80px
		}

		img {
			width: 100%;
			height: 100%;
		}
	}

	.menu-right {
		padding-left: 0.6250rem;
		width: calc(100% - 2.7500rem);

		@include pc {
			padding-left: 20px;
			padding-right: 20px;
			width: calc(100% - 160px - 116px);
		}

		.menu-right-top {
			// display: flex;
			// align-items: center;

			.menu-right-top-p1 {
				font-size: 0.7500rem;
				color: var(--MENU, #8E90CD);
				vertical-align: middle;
				white-space: nowrap;
				display: block;

				@include pc {
					font-size: 20px;
				}
			}

			.menu-right-top-p2 {
				font-size: 0.5625rem;
				color: #5B6DA1;
				font-weight: 300;
				// margin-left: 0.5000rem;
				padding: 0.1rem 0;
				vertical-align: middle;

				@include pc {
					font-size: 14px;
				}
			}
		}

		.menu-right-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 0.6250rem;

			.menu-right-bottom-left {
				font-size: 0.6875rem;

				@include pc {
					font-size: 18px;
				}

				.p1 {
					color: var(--TAB-, #5B6DA1);

					@include pc {
						padding-right: 8px;
					}
				}

				.p2 {
					color: #14D03D;
				}
			}

			.menu-btn {
				padding: 0.2500rem 1.2500rem;
				border-radius: 0.5000rem;
				// border: 1px solid #29ACC9;
				color: #FFF;
				text-align: center;
				font-family: PingFang SC;
				font-size: 0.8750rem;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				background: var(--H5-, #201E47);

				@include pc {
					padding: 11px;
					min-width: 114px;
					font-size: 16px;
					font-style: normal;
					font-weight: 600;
				}
			}

			.btn {
				border-radius: 0.5000rem;

				@include pc {
					border-radius: 8px;
				}
			}
		}
	}

	@include pc {
		.btn {
			border-radius: 8px;
		}
	}

	.menu-btn {


		@include pc {
			border-radius: 8px;
			// border: 1px solid #29ACC9;
			color: #FFF;
			text-align: center;
			font-family: PingFang SC;
			font-style: normal;
			font-weight: 600;
			line-height: normal;
			background: var(--H5-, #201E47);
			padding: 11px;
			min-width: 114px;
			font-size: 16px;
			font-style: normal;
			font-weight: 600;
			margin-left: auto;
		}
	}
}

.card {
	@include h5 {
		padding: 0.625rem 0.625rem 0;
	}
}


.total-card-wrap,
.today-card-wrap {
	@include cardWrap();

	.item-wrap {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: .3125rem .625rem;
		box-sizing: border-box;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: .125rem 0;

			span:nth-child(1) {
				font-size: .9375rem;
				color: #383838;
				white-space: nowrap;
				font-weight: 600;
			}

			span:nth-child(2) {
				font-size: .625rem;
				text-align: center;
				color: grey;
				white-space: nowrap;
			}
		}
	}
}

.commission-box {
	@include cardWrap();

	.hint-box {
		padding: .625rem 0rem;

		.high-tip {
			color: #442729;
			font-size: .9375rem;
			text-align: center;
		}

		span {
			color: #442729;
			font-size: .9375rem;
		}


		.rule-box {
			margin-top: .625rem;

			.can-get {
				display: flex;
				flex-direction: column;
			}

			img {
				width: 4.375rem;
				height: 4.375rem;
			}
		}

		.down-line {
			font-size: .875rem;
			text-align: center;
		}

		.down-line-img {
			width: 100%;
		}

		.tip {
			margin-top: .625rem;

			span {
				font-size: .75rem;
			}
		}
	}

}

.withdrawal-card-wrap {
	@include cardWrap();

	.content-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: .625rem 0;

		.vip-img {
			width: 5rem;
			height: 5rem;
			background: #f5f5f5;
			border-radius: .625rem;
			margin-right: 1.25rem;
		}

		.right-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;

			.income-box {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: space-around;

				.income {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: .625rem;
					flex: 1;
					color: #000;
					font-weight: 600;
					font-size: .875rem;

					span:last-child {
						font-weight: 450;
						color: grey;
						font-size: .625rem;
					}
				}
			}

			.withdrawal-box {
				.btn {
					border-radius: .3125rem;
					padding: .3125rem .625rem;
					font-size: .75rem;
					border: 1px solid rgba(grey, .5);
					color: rgba(grey, .8);
				}

				.tip {
					font-size: .625rem;
					margin-top: .3125rem;
				}
			}
		}
	}

	.high-tip {
		font-size: .9375rem;
		color: #442729;
		padding: .625rem;
		padding-bottom: 0;
	}


}


.canvasQRcode {
	display: none;
}

page {
	// 
	background-color: #24262B;
	min-height: 100%;
}

.ratio-title {
	color: #FFFFFF;
	padding-left: 0.6250rem;
	padding-top: 0.6250rem;
}

.agentTab3 {
	padding: 0 0.6250rem;
}

.statistics-card {
	// background-color: #1C1E22;
	border-radius: 0.1087rem;
	display: flex;
	flex-wrap: wrap;
	// padding: 0.4688rem 0;
	justify-content: space-around;
	margin-bottom: 0.625rem;

	@include pc {
		padding: 0 0 32px;
	}

	.statistics-card-title {
		padding: 0 0 0.625rem;
		color: var(--MENU);
		font-family: PingFang SC;
		font-size: 0.7500rem;
		font-style: normal;
		font-weight: 300;
		line-height: normal;
		text-align: left;
		width: 100%;

		@include pc {
			color: #8E90CD;
			font-family: PingFang SC;
			font-size: 24px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			padding-bottom: 32px;
		}
	}

	.statistics-card-div {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 0.31rem;
		grid-row-gap: 0.31rem;
		font-size: 0.75rem;
		color: #5B6DA1;

		span {
			font-size: 1rem;
			font-weight: 500;
			color: #0FF;
		}

		@include pc {
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-gap: 20px;
			width: 100%;
			padding-bottom: 32px;
			justify-content: space-between;

			span {
				font-size: 24px;
			}
		}
	}

	.statistics-card-team {
		padding: 0.6250rem;
		border-radius: 0.3750rem;
		background: #201E47;

		@include pc {
			// width: calc(361px - 40px);
			padding: 20px;
		}

		text {
			display: block;
		}

		.statistics-num {

			@include pc {
				padding-bottom: 8px;
				font-size: 24px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				text-align: center;
			}
		}

		.statistics-name {
			span {
				padding-left: 1rem;
			}

			@include pc {
				text-align: center;
				font-size: 20px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;

				span {
					padding-left: 0;
					display: block;
					font-size: 24px;
					padding-bottom: 8px;
				}
			}
		}
	}
}

.border-bottom {
	display: flex;
	justify-content: space-around;
	border-bottom: 0.0313rem solid #2C2F34;
	width: 100%;

	+.border-bottom {
		border: none;
	}
}

.statistics-user {
	border-radius: 0.1087rem;
	padding-bottom: 0.6250rem;

	@include pc {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 64px;
	}

	.statistics-card-user {
		margin: auto;
		text-align: center;
		padding: 0.9375rem 0;
		border-bottom: 0.0313rem solid #2C2F34;
	}

	.head-img {
		width: 4.3438rem;
	}

	.statistics-card-integral {
		// margin-top: 0.6250rem;
		padding: 0.6250rem;
		border-radius: 0.5000rem;
		display: flex;
		justify-content: space-between;
		background: #201E47;

		@include pc {
			width: calc(50% - 55px);
			border-radius: 24px;
			padding: 20px;
			height: calc(201px - 40px);
		}

		.left-statistics-card-integral {
			display: flex;
			align-items: center;
		}

		text {
			display: block;
		}

		.icon-div {
			display: flex;
			align-items: center;

			@include h5 {
				width: 2.6563rem;
				height: 1.6563rem;
				text-align: center;
			}

			@include pc {
				padding-right: 40px;
			}
		}

		.icon-1 {
			width: 1.9688rem;
			height: 1.6250rem;

			@include pc {
				width: 96.9px;
				height: 80px;
			}
		}

		.icon-2 {
			width: 2.0313rem;
			height: 1.2813rem;

			@include pc {
				width: 127.761px;
				height: 80px;
			}
		}

		.statistics-card-integral-team {
			display: flex;
			align-items: center;

			// width: 50%;
			@include pc {
				display: block;
			}

			@include h5 {
				text-align: center;
			}
		}

		.statistics-card-integral-team-name {
			font-size: 0.6875rem;
			color: var(--TAB-);

			@include pc {
				color: var(--TAB-, #5B6DA1);
				font-family: PingFang SC;
				font-size: 22px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}
		}

		.statistics-card-integral-team-num {

			color: #14D03D;
			font-size: 0.6875rem;

			@include h5 {
				padding-left: 0.3750rem;
			}

			@include pc {
				color: #14D03D;
				font-family: PingFang SC;
				font-size: 22px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
				padding-top: 8px;
			}
		}

		&:last-child {
			@include h5 {
				margin-top: 0.625rem;
			}
		}
	}

	.botton-view {
		// margin-left: 0.6250rem;
		// margin-right: 0.6250rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

		@include pc {
			padding-right: 1px;
		}

		.button {
			width: 8.9688rem;
			height: 2.6563rem;
			border-radius: 0.1087rem;
			line-height: 2.6563rem;
			text-align: center;
			font-size: 0.8750rem;
			margin-left: 0;
			margin-right: 0;
			font-weight: 400 !important;
			display: flex;
			justify-content: center
		}

		.receber {
			// color: #000000;
			// background-color: #21DD2D;
			@include button(#21DD2D);
			width: 4.2500rem;
			height: 1.6875rem;
			border-radius: 0.5000rem;
			background: var(--Linear);

			@include pc {
				padding: 13px 48px;
				font-size: 20px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
				border-radius: 8px;
			}
		}

		.btn {
			border-radius: 0.5000rem;

			@include pc {
				border-radius: 8px;

			}
		}

		.registo {
			@include button(#21DD2D);
			width: calc(4.2500rem - 2px);
			height: calc(1.6875rem - 2px);
			border-radius: 0.5000rem;
			background: var(--H5-);
			// border: 1px solid #29ACC9;

			// box-sizing: border-box;
			@include pc {
				padding: 12px 47px;
				font-size: 20px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}
		}
	}
}

.bb-card {
	@include pc {
		display: flex;
		justify-content: space-between;
		padding-bottom: 64px;
	}
}

.ad-card {

	display: flex;
	justify-content: space-between;
	// background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
	background: #222343 linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0.16%, rgba(255, 146, 255, 0.1) 99.84%);
	border-radius: 0.5000rem;
	position: relative;

	@include pc {
		width: calc(50% - 70px);
		border-radius: 16px;
		padding: 30px;
		background-image: url(@/assets/new/agent/rrpc.png);
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: calc(0% + 30px) calc(100% - 30px);
	}

	@include h5 {
		padding: 0 1.0625rem;
	}


	.ddk {
		position: absolute;
		// text-align: center;
		bottom: 0.8125rem;
		color: var(--MENU, #8E90CD);
		font-family: Alibaba PuHuiTi 2.0;
		// font-size: 0.7500rem;
		font-size: 0.3125rem;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		letter-spacing: 1.1187rem;
		text-transform: uppercase;

		// transform: scale(0.416);
		@include pc {
			color: var(--MENU, #8E90CD);
			font-family: Alibaba PuHuiTi 2.0;
			font-size: 10px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
			letter-spacing: 35.8px;
			text-transform: uppercase;
			opacity: 0.3;
		}
	}

	.ad-card-text {
		width: 50%;
		padding-top: 1.3438rem;

		@include pc {}

		.p1 {
			color: var(--TAB-3, #FFF);
			font-family: PingFang SC;
			font-size: 0.8750rem;
			font-style: normal;
			font-weight: 600;
			line-height: normal;

			@include pc {
				color: #88A2EB;
				font-family: PingFang SC;
				font-size: 28px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;
			}
		}

		.p2 {
			color: var(--MENU, #8E90CD);
			padding-top: 0.9375rem;
			font-family: PingFang SC;
			font-size: 0.7500rem;
			font-style: normal;
			font-weight: 400;
			line-height: normal;

			@include pc {
				padding-top: 23px;
				color: #0FF;
				font-family: PingFang SC;
				font-size: 20px;
				font-style: normal;
				font-weight: 400;
				line-height: normal;
			}
		}
	}

	.ad-card-img {
		width: 7.5625rem;
		height: 7.5625rem;

		@include pc {
			width: 260px;
			height: 260px;
		}

		img {
			width: 100%;
			height: 100%;
		}
	}

	.icon {
		width: 1.8750rem;
		margin-left: auto;
		cursor: pointer;
		fill: #9BA6B3;

		&:active {
			fill: #21DC2D;
		}
	}
}

.qr-card {
	// background-color: #1C1E22;
	// margin: 0.6250rem;
	// padding: 0.6250rem 0;
	border-radius: 0.1087rem;
	padding-top: 0.625rem;

	@include pc {
		width: calc(50% - 70px);
		background-color: #19173A;
		border-radius: 16px;
		padding: 30px;
	}

	.qr-card-view {
		padding-top: 0.6250rem;
		text-align: center;

		.uv-qrcode {
			margin: auto;
			// padding: 0.6250rem ;
			// background-color: #FFFFFF;
		}

		img {
			width: 7.7750rem;
			height: 7.7750rem;
		}

		.botton-view {
			margin-left: 1.0000rem;
			margin-right: 1.0000rem;
			display: flex;
			justify-content: space-around;
			margin-top: 1.2500rem;

			.button {
				// width: 8.9688rem;
				padding: 0 0.6250rem;
				height: 2.6563rem;
				border-radius: 0.1087rem;
				line-height: 2.6563rem;
				text-align: center;
				font-size: 0.7813rem;
				margin-left: 0;
				margin-right: 0;
				font-weight: bold;
			}

			.receber {
				@include button(#21DD2D);
			}


		}
	}
}

.url-copy-team {
	padding-bottom: 0.625rem;
	font-size: 0.7813rem;

	@include pc {
		padding-bottom: 20px;
	}

	.url-copy-team-name {
		color: var(--MENU, #8E90CD);
		padding-bottom: 0.4688rem;

		@include pc {
			color: var(--TAB-, #5B6DA1);
			font-family: PingFang SC;
			font-size: 16px;
			font-style: normal;
			font-weight: 400;
			line-height: 18px;
			padding-bottom: 12px;
			display: flex;
			align-items: center;

			img {
				width: 20px;
				height: 20px;
				margin-right: 12px;
			}

			/* 112.5% */
		}
	}


	.url-copy-team-view {
		color: var(--INPUT-TEXT, #B5EBFF);
		// line-height: 2.6250rem;
		display: flex;
		// text-indent: 0.9375rem;
		border-radius: 0.5000rem;
		align-items: center;

		@include h5 {
			padding: 0.6250rem;
			justify-content: space-between;
			background: var(--INPUT, #231D4E);
		}

		@include pc {
			gap: 12px;

			&.ds {
				padding: 0.6250rem;
				justify-content: space-between;
				background: var(--INPUT, #231D4E);
			}
		}

		text {
			width: calc(100% - 3.8750rem);

			@include pc {
				font-size: 16px;
				font-style: normal;
				font-weight: 500;
			}
		}

		.copy-svg {
			width: 1.8750rem;
			height: 1.8750rem;
			display: flex;
			text-align: center;
			justify-content: center;
			align-items: center;
			background: #2E2C5E;
			border-radius: 0.3750rem;

			svg {
				width: 1.0313rem !important;
				height: 1.0313rem !important;
			}
		}

		.share-team {
			padding: 0.625rem 0;
			// display: flex;
			justify-content: center;
			text-align: center;
			width: 3.6250rem;

			@include pc {
				width: 80px;
				padding: 15px 0 20px;
				border-radius: 16px;
				background: #201E47;
			}

			svg {
				width: 1.8750rem;
				height: 1.8750rem;

			}

			span {
				display: block;
				color: var(--MENU, #8E90CD);
				font-family: PingFang SC;
				font-size: 0.5625rem;
				font-style: normal;
				font-weight: 300;
				line-height: normal;
				padding-top: 0.2500rem;

				@include pc {
					text-align: center;
					font-size: 14px;
				}
			}
		}
	}
}
</style>