<template>
	<view class="chart-content" v-show="chartProps.length > 0">
		<view class="chart-name">
			<slot name="name"></slot>
		</view>
		<view class="chart-view">
			<div ref="chart"  class="chart"></div>
			<!-- <canvas canvas-id="myid" id="myid" class="charts" /> -->
			<!-- <qiun-data-charts :type="isPc ? 'column' : 'pie'" :opts="isPc ? optsColumn : optsPie" :chartData="isPc ? chartDataColumn : chartDataPie" /> -->
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, defineProps, watch, onMounted } from 'vue';
	import * as echarts from 'echarts'
	import { t } from '../uilts/i18n';
import { isPc } from '../uilts/async.var';
	const define = defineProps<{
			chartProps : Array<any>,
			categories ?: Array<any>
	}>()
	const chart = ref()

	watch(define, (v, _old) => {
		let myChart = echarts.init(chart.value)

		if(isPc.value){
			myChart.setOption({
				tooltip: {},
				xAxis: {
					data: v.categories
				},
				yAxis: {},

				series: [
					{
						name: t('ui.number'),
						type: 'bar',
						data: v.chartProps,
						barWidth: '40px'
					}
				]
			});


		}else{
			myChart.setOption({
				series: [
					{
					type: 'pie',
					data: v.chartProps
					}
				]
			})
		}
	})

	onMounted(()=>{
		
	})
</script>

<style lang="scss" scoped>
	.chart-name {
		margin: 2.5000rem 0.6250rem;
		font-size: 0.7813rem;
		color: #9BA6B3;
	}

	.chart-view {
		// margin-top: 0.9375rem;
		// margin-left: 0.6250rem;
		// margin-right: 0.6250rem;
		height: 300px;
		
	}

	.chart-content {
		max-width: 23.4375rem;
		margin: auto;
		padding-bottom: 3.1250rem;
	}

	
	
	@media (min-width: 9999px){
		.chart-content {
			max-width: 50.0000rem !important;
			width: 80% !important;
		}

		.chart{
			width: 50.0000rem;
			height: 20rem;
		}
	}

	@media (max-width: 9999px){

		.chart{
			width: 80vw;
			height: 20rem;
			margin: auto;
		}
	}
</style>