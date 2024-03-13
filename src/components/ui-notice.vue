<template>
	<div class="ui-notice">
		<div class="ui-notice-team">
			<div class="notice-icon"></div>
			<div class="txt-box">
				<span  class="txt" :class="{
					running:running
				}" :style="{
					animationDuration:times + 's'
				}">{{ msagess }}</span>
				
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps,onMounted, ref } from 'vue';
const props = defineProps({
	msg: {
    type: String,
    default: ''
  },
  time: {
    type: Number,
    default: 3
  },
  symbol: {
    type: String,
    default: ','
  },
  datas: {
    type: Array<string>,
    default: () => []
  },
  pause: {
    type: Number,
    default:0
  },
});


const times = computed(() => {
	return  props.time * Math.max(props.datas.length,1);
})

const msagess = computed(() => {
	if(props.datas.length){
		if(!times.value){
			return props.datas.join(props.symbol);
		}else{
			return props.datas.join(props.symbol) + props.symbol + props.datas.join(props.symbol)
		}
	}else{
		return props.msg;
	}
})

const running = ref(true);

onMounted(() => {
	if(props.pause){
		setInterval(() => {
			running.value = !running.value;
		},props.time * 1000)
	}
})

</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
@import "@/assets/font/font.css";

.notice-icon{
	font-family: iconfont;
	font-size: 0.8625rem;
	color: #ffeb4c;
	&::before{
		content: '\e696';
	}
}

.ui-notice-team {
	display: flex;
	align-items: center;
	height: 1.68rem;
	gap: 0.625rem;
	color: #0FF;
	font-size: 0.75rem;
	font-weight: 400;
}

svg {
	width: 1rem;
	height: 1rem;
	fill: #FFEB4C;
}

.ui-notice {
	overflow: hidden;
	height: 1.68rem;
}

.ui-notice {
	font-size:0.75rem;;
	font-weight: bold;
	// color: #B8DCE5;
	white-space: nowrap;
	position: relative;
}
.txt-box{
	flex:1;
	overflow: hidden;
	animation:colorAm-data 6s infinite;
}

@keyframes colorAm-data {
    0% {
        color: #4aff00
    }

    20% {
        color: #cd00ff
    }

    40% {
        color: #fff500
    }

    60% {
        color: #00b1ff
    }

    80% {
        color: #ff0006
    }

    99.99% {
        color: #4aff00
    }
}
.txt {
	display: inline-block;
    animation: wordsLoop 20s linear infinite;
    animation-play-state: paused;
	&.running{
		animation-play-state: running;
	}
}

@keyframes wordsLoop {
	0% {
		transform: translateX(0%);
		-webkit-transform: translateX(0%);
	}
	100% {
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
	}
}
</style>