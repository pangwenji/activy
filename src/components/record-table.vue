<template>
	<public-loading v-if="modelValue && page == 1"></public-loading>
	<div class="table-view" v-else>
		<div class="tabs">
			<div class="tabs-view">
				<div class="table empty" :data-empty="$t('ui.empty')" v-if="!list.length"></div>
				<div class="table" v-else>
					<div class="table-row head">
						<div class="table-cell" v-for="i in tableMenu">
							<div class="ellipsis">
								{{i}}
							</div>
						</div>
					</div>
					<div class="table-row " v-for="item in list">

						<div class="table-cell" v-for="v in item" :class="{add:item%2 === 0}">

							<div class="ellipsis" @click="v['url'] ? $open(v['url']) : ''"
								:class="{
									textDecoration:v['textDecoration'],
									number1:v['value'] > 0,
									number2:v['value'] < 0,
								}">
								{{v['value']}}
								<img v-if="v['icon']" @click="$open(v['url'])" :src="v['icon']" mode="aspectFill" />
							</div>
						</div>

					</div>
				</div>

				<arrow-more :showMore="showMore" :page="page" :lastPage="lastPage" @click="onReachBottomBtn()">
				</arrow-more>
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import PublicLoading from "../components/public-loading.vue"
	import ArrowMore from "../components/arrow-more.vue"
	import { defineProps } from "vue";
	
	
	// defineProps<{
	// 	tableMenu : any
	// 	list : any
	// 	showMore : boolean,
	// 	page : number,
	// 	lastPage : number,
	// }>()

	defineProps<{
		tableMenu : Array<any>,
		list : Array<any>,
		modelValue ?: boolean,
		showMore ?: boolean,
		page ?: number,
		lastPage ?: number,
	}>()
	// watch(props,(v,old) => {
	// 	emit('update:modelValue', false);
	// })
	const emit = defineEmits(['onReachBottomBtn', 'update:modelValue'])
	const onReachBottomBtn = () => {
		emit('onReachBottomBtn')
	}
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
	.textDecoration {
		text-decoration: underline
	}


	.tabs {
		background-color: var(--bgcolor);
		// padding: 0.6250rem 0;
		font-size: 0.7500rem;

		.tabs-scroll {
			// padding:0 0.6250rem;
			// height:2.9688rem;
			width: calc(100% - 1.2500rem);
			margin: 0 auto;
		}

		.tabs-navs {
			// margin:0 0.6250rem;
			display: flex;
			background-color: #24262A;
			white-space: nowrap;
			// overflow-x: auto;
			// justify-content: space-between;
		}

		.tabs-nav {
			flex-shrink: 0;
			width: 7.6875rem;
			height: 2.9688rem;
			@extend %flex-center;
			color: #98A7B5;
			background-color: #24262A;

			&.active {
				background-color: #2D3034;
				font-weight: 700;
				color: #f5f6f7;
			}
		}
	}

	.table {
		width: 100%;
		color: #5B6DA1;
		font-size: 0.75rem;
		text-align: center;

		.table-row {
			width: 100%;
			&:nth-of-type(2n){
				background-color:#201E47;
			}
		}

		.ellipsis {
			// max-width: calc((100% - 1.2500rem) / 4);
			box-sizing: border-box;
			// text-align:center;
		}

		.table-cell {
			width: calc((100% - 1.2500rem) / 4);
			box-sizing: border-box;
			direction: unset;
			height: 2.8750rem;
			vertical-align: middle;

			&:nth-child(1) {
				text-align: left;
				direction: ltr;
				padding-left: 0.6250rem;
				// width: 3.1250rem;
			}

			&:last-child {
				margin-left: auto;
				text-align: right;
				// direction: rtl;
				// unicode-bidi: bidi-override;
				padding-right: 0.6250rem;
				// width: 3.1250rem;
			}

			// &.add{
			// 	text-align:right;
			// }
		}

		.table-row {
			cursor: pointer;
			// display: flex;
			&:not(.head):active {
				background-color: #2D3034;
			}

			&:not(.head) .table-cell {
				color: #8E90CD;
				&:last-child{
					color:#FF7E43;
					background: linear-gradient(180deg, #FF7E43 0%, #FF5000 62.5%, #FF8D59 100%);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					font-weight: 600;
				}
				&:nth-last-child(2){
					color:#FF3EFF;
					background: linear-gradient(180deg, #FF3EFF 0%, #F0F 62.5%, #FF6FFF 100%);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					font-weight: 600;
				}
			}

			img {
				width: 0.8125rem;
				height: 0.8125rem;
				display: inline-block;
				vertical-align: middle;
				margin-top: -0.1563rem;
			}
		}

		.head {
			color: #5B6DA1;
		}
		
		@include pc {
			font-size: 14px;
			background:#231D4E;
			.head {
				background:#231D4E;
			}
			.table-cell{
				height:60px;
			}
			.table-row {
				&:nth-of-type(2n){
					background-color:#181538;
				}
			}
			
			.table-cell {
				&:nth-child(1) {
					text-align: center;
					padding:0;
				}

				&:last-child {
					text-align: center;
					padding:0;
				}
				.number1{
					color:#14D03D;

				}
				.number2{
					color:#BF1552;
					background:none;

				}
			}
		}
	}

	.loading {
		min-height: 9.3750rem;
	}

	.arrow {
		background-color: #24262A;
		width: 7.8125rem;
		height: 2.0000rem;
		@extend %flex-center;
		color: #9BA6B3;
		font-size: 0.8125rem;
		margin: 0 auto;
		margin-top: 0.6250rem;

		&::after {
			content: '';
			display: block;
			width: 0.7500rem;
			height: 0.5000rem;
			background: url(@/assets/index/arrow-bottom.png);
			background-size: 100%;
			margin-left: 0.8125rem;
		}

		&.active::after {
			transform: rotateX(180deg);
		}
	}

	@media (min-width: 9999px) {

		.tabs {
			.ellipsis {
				width: 100% !important;
				box-sizing: border-box;
				padding-right: 0.6250rem;
			}
		}
	}
</style>