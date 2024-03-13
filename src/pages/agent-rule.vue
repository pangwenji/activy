<template>
	<page :head-box="isPc ? ['content', 'right'] : undefined" :show-scrollbar="true" :mouse-wheel="true">
		<div class="page-k page-pading">
			<table-card>
				<template #name>
					<table-cell class="cell name-cell">
						<template #cell>
							{{ t('pageRule.table1') }}
						</template>
					</table-cell>
					<table-cell class="cell name-cell">
						<template #cell>
							{{ t('pageRule.table2') }}
						</template>
					</table-cell>
				</template>
				<template #row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.t5', { num: 331 }) }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								2500
							</template>
						</table-cell>
					</table-row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.table3') }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.table4') }}
							</template>
						</table-cell>
					</table-row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.t5', { num: 12 }) }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								1320
							</template>
						</table-cell>
					</table-row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.table5') }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.table4') }}
							</template>
						</table-cell>
					</table-row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.t5', { num: 4 }) }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								440
							</template>
						</table-cell>
					</table-row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.table6') }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.table4') }}
							</template>
						</table-cell>
					</table-row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.t5', { num: 2 }) }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								220
							</template>
						</table-cell>
					</table-row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.table7') }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.table4') }}
							</template>
						</table-cell>
					</table-row>

					<table-row class="table-row">
						<table-cell class="cell">
							<template #cell>
								{{ t('pageRule.t5', { num: 313 }) }}
							</template>
						</table-cell>
						<table-cell class="cell">
							<template #cell>
								520
							</template>
						</table-cell>
					</table-row>
				</template>
			</table-card>
		</div>


		<view class="tree">
			<view class="tree-data ">
				<view class="img-head-0" :style="isPc ? 'left: 1rem;' : 'left: 0.7rem;'"></view>
				<view class="tree-bottom" :style="isPc ? 'left: 1rem;' : 'left: 0.7rem;'"><text class="tt tt1">A</text>
				</view>
				<!-- <img src="@/assets/agent/sx.png" mode="widthFix" /> -->
				<view class="tree trees tree2-2">
					<view class="tree-data tree1">
						<view class="img-head-1"></view>
						<view class="tree-bottom"><text class="tt tt2">B1</text></view>
						<view class="tree trees ">
							<view class="tree-data tree-data1">
								<view class="img-head-2"></view>
								<view class="tree-bottom">
									<text class="tt">C1</text>
									<div class="call">
										<div class="c1">{{ t('pageRule.t2') }}<span class="c3">{{ t('pageRule.t5', {
											num: 10
										}) }}</span></div>
										<div>{{ t('pageRule.t3') }}<span class="c2"> B1 </span>{{ t('pageRule.t4') }}<span
												class="c3">700</span></div>
										<div>{{ t('pageRule.t3') }}<span class="c4"> A </span>{{ t('pageRule.t4') }}<span
												class="c3">400</span></div>
									</div>
								</view>
								<!-- <div>
                                    <div>有效投注300万</div>
                                    <div>为 B3 贡献：3.3万</div>
                                    <div>为 A 贡献：0</div>
                                </div> -->
							</view>

							<view class="tree-data tree-data2">
								<view class="img-head-2"></view>
								<view class="tree-bottom">
									<text class="tt">C2</text>
									<div class="call">
										<div class="c1">{{ t('pageRule.t2') }}<span class="c3">{{ t('pageRule.t5', {
											num: 3
										}) }}</span></div>
										<div>{{ t('pageRule.t3') }}<span class="c2"> B1 </span>{{ t('pageRule.t4') }}<span
												class="c3">210</span></div>
										<div>{{ t('pageRule.t3') }}<span class="c4"> A </span>{{ t('pageRule.t4') }}<span
												class="c3">120</span></div>
									</div>
								</view>
								<!-- <div>
                                    <div>有效投注300万</div>
                                    <div>为 B3 贡献：3.3万</div>
                                    <div>为 A 贡献：0</div>
                                </div> -->
							</view>
						</view>
					</view>
					<view class="tree-data tree2">
						<view class="img-head-1"></view>
						<view class="tree-bottom"><text class="tt tt2">B2</text></view>
					</view>
					<view class="tree-data tree3">
						<view class="img-head-1"></view>
						<view class="tree-bottom"><text class="tt tt2">B3</text></view>
						<view class="tree4">
							<view class="tree-data">
								<view class="img-head-2"></view>
								<view class="tree-bottom">
									<text class="tt">C3</text>
									<div class="call">
										<div class="c1">{{ t('pageRule.t2') }}<span class="c3">{{ t('pageRule.t5', {
											num:
												300
										}) }}</span></div>
										<div>{{ t('pageRule.t3') }}<span class="c2"> B3 </span>{{ t('pageRule.t4') }}<span
												class="c3">{{ t('pageRule.t5', { num: 3.3 }) }}</span></div>
										<div>{{ t('pageRule.t3') }}<span class="c4"> A </span>{{ t('pageRule.t4') }}<span
												class="c3">0</span></div>
									</div>
								</view>

							</view>

						</view>
					</view>
				</view>
			</view>
		</view>

		<div class="tips-card">
			<div class="tips-title">{{ t('pageRule.t1') }}</div>
			<div class="tips-content">
				<div class="tips-team">
					{{ t('pageRule.c1') }}
				</div>
				<div class="tips-team">
					{{ t('pageRule.c2') }}</div>
				<div class="tips-team">
					{{ t('pageRule.c3') }}
					<div class="tips-z">
						{{ t('pageRule.c4') }}
					</div>
					<div class="tips-z">
						{{ t('pageRule.c5') }}
					</div>
					<div class="tips-z">
						{{ t('pageRule.c6') }}
					</div>
				</div>
				<div class="tips-team">
					{{ t('pageRule.c7') }}
					<div class="tips-z">
						{{ t('pageRule.c8') }}
					</div>
					<div class="tips-z">
						{{ t('pageRule.c9') }}
					</div>
				</div>
				<div class="tips-team">
					{{ t('pageRule.c10') }}
					<div class="tips-z">
						{{ t('pageRule.c11') }}
					</div>
					<div class="tips-z">
						{{ t('pageRule.c12') }}
					</div>
					<div class="tips-z">
						{{ t('pageRule.c13') }}
					</div>
					<div class="tips-z">
						{{ t('pageRule.c15') }}
					</div>
				</div>
				<div class="tips-team"></div>
			</div>
		</div>

	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import TableCard from "../components/table-card.vue";
import TableCell from "../components/table-cell.vue";
import TableRow from "../components/table-row.vue";
import { isPc } from '../uilts/async.var';
import { t } from '../uilts/i18n';
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';


.call {
	color: #5B6DA1;

	.c1 {
		color: #8E90CD;
	}

	.c2 {
		color: #E85FF4;
	}

	.c3 {
		color: #14D03D;
	}

	.c4 {
		color: #0FF;
	}
}

.page-k {
	// padding: 0.6250rem;

	@include pc {
		// padding: 0 32px;

		.table-row {
			height: 60px;
			font-size: 16px;
		}

		.name-cell {
			background-color: #181538;
		}
	}
}

.cell {
	&:nth-child(1) {
		color: #5B6DA1;
	}

	&:nth-child(2) {
		color: #5B6DA1;
	}
}

.tips-card {
	padding: 0.6250rem;

	@include pc {
		padding: 0 32px;
	}

	.tips-title {
		color: var(--MENU, #8E90CD);
		font-family: PingFang SC;
		font-size: 0.8750rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;

		@include pc {
			font-size: 20px;
		}
	}

	.tips-content {
		color: var(--TAB-, #5B6DA1);
		font-family: PingFang SC;
		font-size: 0.7500rem;
		font-style: normal;
		font-weight: 300;
		line-height: normal;

		@include pc {
			font-size: 14px;
		}
	}

	.tips-team {
		padding: 0.6250rem 0;
	}
}

[class*='img-head-'] {
	width: 2.9688rem;
	height: 2.9688rem;
	display: block;
	margin: 0 auto;
	position: relative;
	z-index: calc(var(--I1) + 0);
}

@for $i from 0 through 2 {
	.img-head-#{$i} {
		background-image:url(@/assets/new/agent/u#{$i+1}.png);
		background-size: cover;
		border-radius: 50%;
	}
}

.tree {
	// @extend %flex-center;
	display: flex;
	flex: 1;
	position: relative;
	border-radius: 0.1084rem;
	margin: 0 0.7813rem;
	margin-top: 0.6250rem;
	padding: 0.6250rem 0.1563rem 0.1563rem 0.1563rem;

	@include pc {
		padding: 32px;
	}

	.ellipsis {
		max-width: 5.0000rem;
		display: inline-block;
	}

	.tree {
		margin: 0;
		margin-top: 3.1250rem;
		padding-top: 0;
	}

	.tree1 {
		position: relative;
		left: 0.8rem;

		.tree-data1 {
			position: relative;
			right: -0.3rem;
		}

		.tree-data2 {
			position: relative;
			right: -0.6rem;
		}

		@include pc {
			.tree-data1 {
				position: relative;
				right: 0.5rem;
			}

			.tree-data2 {
				position: relative;
				right: -1.6rem;
			}
		}
	}

	.tree2 {
		position: relative;
		left: -1.7rem;

		@include pc {
			left: -1.6rem;
		}
	}

	.tree3 {
		position: relative;
		left: -1.6rem;

		@include pc {
			left: -1.6rem;
		}
	}

	.tree2::before {
		content: '';
		display: block;
		position: absolute;
		width: 2px;
		left: 50%;
		right: 25%;
		top: -1.5625rem;
		height: 1.8750rem;
		background-color: #FFF;
		// border:2px solid #FFF;
		border-bottom-style: none;
		z-index: calc(var(--I1) + 0);
	}

	.tree4 {
		position: relative;
		top: 3rem;
	}

	.tree4::before {
		content: '';
		display: block;
		position: absolute;
		width: 2px;
		left: 50%;
		right: 25%;
		top: -3rem;
		height: 3.75rem;
		background-color: #FFF;
		// border:2px solid #FFF;
		border-bottom-style: none;
		z-index: calc(var(--I1) + 0);
	}

	.img-head-0 {
		width: 3.7500rem;
		height: 3.7500rem;
		position: relative;
	}

	.img-head-1::after,
	.img-head-2::after,
	.img-head-3::after {
		content: '';
		display: block;
		width: 0.8750rem;
		height: 0.8750rem;
		background: url(@/assets/agent/a1.png);
		background-size: cover;
		position: absolute;
		right: 0;
		bottom: 0;
		transform: translate(30%);
	}

	.img-head-2::after {
		width: 1.0000rem;
		height: 1.0625rem;
		background-image: url(@/assets/agent/a2.png);
	}

	.img-head-3::after {
		width: 1.4063rem;
		height: 0.9375rem;
		background-image: url(@/assets/agent/a3.png);
	}

	[class*='img-head-']+view {
		// line-height:1.3125rem;
		padding: 0.3125rem 0;
	}

	.tree-data {
		flex: 1;
		text-align: center;
		font-size: 0.7500rem;
		color: #98A7B5;
		// padding:0 0.1563rem;
		width: 100%;
		box-sizing: border-box;
		word-break: normal;
		white-space: nowrap;
		vertical-align: middle;
	}

	.trees::before {
		content: '';
		display: block;
		position: absolute;
		width: 50%;
		left: 28%;
		right: 25%;
		top: -1.5625rem;
		height: 1.8750rem;
		border: 2px solid #FFF;
		border-bottom-style: none;
		z-index: calc(var(--I1) + 0);
	}

	.tree .tree .trees::before {
		display: none;
	}

	.tree::after {
		content: '';
		display: block;
		position: absolute;
		width: 2px;
		left: 50%;
		top: -3.1250rem;
		height: 1.5625rem;
		background-color: #FFF;
		z-index: calc(var(--I1) + 0);
	}

	.tree2-2::after {
		left: 53.2%;
	}

	.tree .tree .trees::after {
		height: 3.1250rem;
	}
}

.tree-bottom {
	position: relative;

	.tt {
		position: relative;
		z-index: calc(var(--I1) + 0);
		width: 1.875rem;
		display: block;
		margin: -0.5rem auto 0;
		padding: 0 0.1875rem;
		border-radius: 0.5625rem;
		color: rgba(38, 35, 80, 1);
		background: #6D85FF;

		&.tt1 {
			background: #0FF;
		}

		&.tt2 {
			background: #E85FF4;
		}
	}
}
</style>
