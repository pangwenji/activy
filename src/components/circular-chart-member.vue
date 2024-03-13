<template>
    <view class="chart-content" v-show="chartProps.length > 0">
        <view class="chart-name">
            <slot name="name"></slot>
        </view>
        <view class="chart-view">
            <div ref="chart" class="chart"></div>
            <!-- <canvas canvas-id="myid" id="myid" class="charts" /> -->
            <!-- <qiun-data-charts :type="isPc ? 'column' : 'pie'" :opts="isPc ? optsColumn : optsPie" :chartData="isPc ? chartDataColumn : chartDataPie" /> -->
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from 'vue';
import * as echarts from 'echarts'
const define = defineProps<{
    chartProps: Array<any>,
    categories?: Array<any>
}>()
const chart = ref()

watch(define, (v, _old) => {
    if(v.chartProps.length < 1) return;
    // console.log('sdsad');
    
    let myChart = echarts.init(chart.value)
    let chartData: any = []
    v.chartProps.forEach(v => {
        if (v > 0) {
            chartData.push({
                value: v,
                itemStyle: {
                    color: {
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#19149C' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#18CFCF' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }

                }
            })
            // fill: var(---, linear-gradient(178deg,  -6.35%,  98.27%));
        } else {
            chartData.push({
                value: v,
                itemStyle: {
                    color: {
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#FF007A' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#9E2433' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }

                }
            })
            // fill: var(---, linear-gradient(176deg, #9E2433 -0.8%, #FF007A 107.8%));
        }

    })

    myChart.setOption({
        tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
        xAxis: {
            type: 'category',
            data: v.categories
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: chartData,
                type: 'bar'
            }
        ]
    });
})

onMounted(() => {

})
</script>

<style lang="scss" scoped>
.chart-name {
    margin: 2.5000rem 0;
    font-size: 0.7813rem;
    color: #9BA6B3;
}

.chart-content {
    // max-width: 23.4375rem;
    margin: auto;
    padding-bottom: 3.1250rem;
}



@media (min-width: 9999px) {
    .chart-content {
        // max-width: 50.0000rem !important;
        // width: 80% !important;
        width: 100%;
        height: 510px;
    }

    .chart {
        width: 100%;
        width: 1402px;
        height: 510px;
    }
}

@media (max-width: 9999px) {

    .chart {
        // width: 80vw;
        width: 100%;
        height: 510px;
        margin: auto;
    }
}
</style>