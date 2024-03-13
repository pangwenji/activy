<template>
	<div class="border-gradient" :style="borderGradientStyle">
        <div class="border-gradient-box" :style="{
            background:bgColor,
            padding:padding,
            ...contentStyle
        }"><slot></slot></div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
const props = defineProps({
  bgColor: {
    type: String,
    default: 'rgb(31, 31, 31)'
  },
  border: {
    type: Number,
    default: 2
  },
  borderUnit: {
    type: String,
    default: ''
  },
  borderColor: {
    type: Array,
    default: () => ['#00FFFF', '#FF92FF']
  },
  showBorder:{
    type:Boolean,
    default: true
  },
  angle:{
    type:Number,
    default:45
  },
  padding:{
    type: String,
    default: 'none'
  },
  contentStyle:{
    type:Object,
    default:{}
  }
});
const borderGradientStyle = computed(() => ({
    padding:props.borderUnit || (props.border + 'px'),
    background:props.showBorder ? `linear-gradient(${props.angle}deg, ${props.borderColor.join(',')})` : props.bgColor
}))
</script>

<style lang="scss" scoped>
    .border-gradient{
        --border-width:2px;
        position: relative;
        box-sizing:border-box;
        .border-gradient-box{
            width:100%;
            height:100%;
            display:flex;
            box-sizing:border-box;
            border-radius:inherit;
		        align-items:center;
            justify-content:center;
        }
    }
</style>