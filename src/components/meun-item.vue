<template>
	<view class="public-meun-team" :class="{'none': none !== true}" @click="onClick">
			<view class="meun-icon">
				<public-svg class="icon" 
				v-if="icon" 
				:style="{width:iconSize+'upx',fill:iconColor,height:iconSize+'upx'}" 
				:icon="icon" ></public-svg> 
				<img v-if="src" :src="src" />
			</view>
			<view class="meun-text">
				<slot v-if="$slots['text']" name="text"></slot>
				<text v-else :style="{color:nameColor}">{{ name }}</text>
			</view>
			<view class="meun-right-icon" v-if="right !== true">
				<text v-if="value">{{ value }}</text>
				<public-svg class="right-icon" icon="icon_Arrow" v-if="icon && !value && num <= 0"
					:style="{width:iconSize+'upx',fill:iconColor,height:iconSize+'upx'}">
				</public-svg>
				<text v-if="num > 0" class="red">{{num}}</text>
			</view>
	</view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, ref } from 'vue';
import PublicSvg from '../components/public-svg.vue';
	let prop = defineProps<{
		icon?:string,
		name?:string,
		nameColor?:string,
		value?:string,
		none?:boolean,
		src?:string,
		iconSize?:number,
		iconColor?:string,
		right?:boolean,
		num ?: number
	}>()
	const num = ref<number>(0)
	let numbers = prop.num ? prop.num : 0
	num.value = numbers > 99 ? 99 : numbers
	watch(prop, (_o, _n) => {
		num.value = prop.num as number > 99 ? 99 : prop.num as number

		// console.log(n.get_system_notice)
		// isNotice.value = n.get_system_notice
	})
	const emit = defineEmits(['click'])
	const onClick = (e:Event) => {
		emit('click',e);
	}
	
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
	.public-meun-team{
		display: flex;
		height: 2.8750rem;
		align-items:center;
		margin-bottom:0.1875rem;
		cursor: pointer;
		justify-content: space-between;
		font-size: 0.8750rem;
		font-weight:400;
		color:#98A7B5;
		@extend %ellipsis;
		overflow:hidden;
		.meun-icon{
			width:3.1250rem;
			height:100%;
			@extend %flex-center;
		}
		
		.meun-right-icon{
			min-width:1.8750rem;
			height:100%;
			@extend %flex-center;
			text{
				margin-right:0.6250rem;
			}
			.right-icon{
				width:1.0000rem;
				height:1.0000rem;
				fill:#67707B;
			}

			.red{
				display: inline-block;
				font-size: 0.7500rem;
				color: #FFFFFF;
				background-color: red;
				position: absolute;
				padding: 0.1563rem 0.1563rem;
				text-align: center;
				min-width: 0.9375rem;
				line-height: 0.9375rem;
				// height: 0.6250rem;
				border-radius: 1.2500rem;
			}
		}
		.meun-text{
			flex:1;
			  white-space: nowrap;
			  overflow: hidden;
			  text-overflow: ellipsis;
			  word-break: keep-all;
		}
		.icon{
			width:1.1875rem;
			height:100%;
			fill:#9BA6B3;
		}
		
		&:active{
			background-color:#2d3035;
			color:#FFF;
			.icon{
				fill:#FFF;
			}
			.right-icon{
				fill:#FFF;
			}
		}
	}
</style>