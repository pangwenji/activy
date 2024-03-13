<template>
	<view>
		<view class="more-btn pc" v-show="showMore || lastPage > page">
			<view class="loading" v-show="showMore && lastPage >= page" data-empty="正在加载中...">
				<svg viewBox="0 0 84 24" :fill="color || '#3BC117'">
					<circle cx="18" cy="12" r="6"></circle>
					<circle cx="18" cy="12" r="6"></circle>
					<circle cx="42" cy="12" r="6"></circle>
					<circle cx="66" cy="12" r="6"></circle>
				</svg>
			</view>
			
			<view v-show="!showMore && lastPage > page" class="arrow" :class="{active:showMore}" >
				<text >{{$t('ui.showMore')}}</text>
			</view>
		</view>
		<view class="loading h5" v-show="showMore && lastPage >= page" data-empty="正在加载中...">
			<svg viewBox="0 0 84 24" :fill="color || '#3BC117'">
				<circle cx="18" cy="12" r="6"></circle>
				<circle cx="18" cy="12" r="6"></circle>
				<circle cx="42" cy="12" r="6"></circle>
				<circle cx="66" cy="12" r="6"></circle>
			</svg>
		</view>
	</view>
</template>

<script setup lang="ts" scoped>
	import { defineProps, withDefaults } from 'vue';
	withDefaults(defineProps<{
		showMore : boolean,
		lastPage : number,
		page : number,
		color?: string
	}>(),{
		showMore:false,
		lastPage : 1,
		page : 1,
	})

</script>

<style lang="scss" scoped>

@import "../scss/public.scss";
	.more-btn{
		width: 7.8125rem;
		height: 2.0000rem;
		background-color: #1C1E22;
		border-radius: 0.1375rem;
		display: flex;
		justify-content: center;
		line-height: 2.5000rem;
		padding: 0.2188rem 0;
		margin: 0.6250rem auto;
	}

	.arrow{
		// background-color:#24262A;
		width:7.8125rem;
		height:2.0000rem;
		@extend %flex-center;
		color:#9BA6B3;
		font-size:0.8125rem;
		margin:0 auto;
		// margin-top:0.6250rem;
		&::after{
			content: '';
			display:block;
			width:0.7500rem;
			height:0.5000rem;
			background:url(@/assets/index/arrow-bottom.png);
			background-size:100%;
			margin-left:0.8125rem;
		}
		&.active::after{
			transform:rotateX(180deg);
		}
	}
	
	@-webkit-keyframes loading1 {
	    0% {
	        -webkit-transform: scale(.4) translateX(28.57%);
	        -ms-transform: scale(.4) translateX(28.57%);
	        transform: scale(.4) translate(28.57%);
	        opacity: .3;
	    }
	
	    to {
	        -webkit-transform: scale(1) translateX(0%);
	        -ms-transform: scale(1) translateX(0%);
	        transform: scale(1) translate(0);
	        opacity: 1
	    }
	}
	
	@keyframes loading1 {
	    0% {
	        -webkit-transform: scale(.4) translateX(28.57%);
	        -ms-transform: scale(.4) translateX(28.57%);
	        transform: scale(.4) translate(28.57%);
	        opacity: .3
	    }
	
	    to {
	        -webkit-transform: scale(1) translateX(0%);
	        -ms-transform: scale(1) translateX(0%);
	        transform: scale(1) translate(0);
	        opacity: 1
	    }
	}
	
	@-webkit-keyframes loading2 {
	    0% {
	        -webkit-transform: translateX(0%);
	        -ms-transform: translateX(0%);
	        transform: translate(0)
	    }
	
	    to {
	        -webkit-transform: translateX(28.57%);
	        -ms-transform: translateX(28.57%);
	        transform: translate(28.57%)
	    }
	}
	
	@keyframes loading2 {
	    0% {
	        -webkit-transform: translateX(0%);
	        -ms-transform: translateX(0%);
	        transform: translate(0)
	    }
	
	    to {
	        -webkit-transform: translateX(28.57%);
	        -ms-transform: translateX(28.57%);
	        transform: translate(28.57%)
	    }
	}
	
	@-webkit-keyframes loading3 {
	    0% {
	        -webkit-transform: scale(1) translateX(0%);
	        -ms-transform: scale(1) translateX(0%);
	        transform: scale(1) translate(0);
	        opacity: 1
	    }
	
	    to {
	        -webkit-transform: scale(.4) translateX(-28.57%);
	        -ms-transform: scale(.4) translateX(-28.57%);
	        transform: scale(.4) translate(-28.57%);
	        opacity: .3
	    }
	}
	
	@keyframes loading3 {
	    0% {
	        -webkit-transform: scale(1) translateX(0%);
	        -ms-transform: scale(1) translateX(0%);
	        transform: scale(1) translate(0);
	        opacity: 1
	    }
	
	    to {
	        -webkit-transform: scale(.4) translateX(-28.57%);
	        -ms-transform: scale(.4) translateX(-28.57%);
	        transform: scale(.4) translate(-28.57%);
	        opacity: .3
	    }
	}
	.loading {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-align-items: center;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    -webkit-justify-content: center;
	    -ms-flex-pack: center;
	    justify-content: center;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    height: 100%;
	    -webkit-align-self: stretch;
	    -ms-flex-item-align: stretch;
	    align-self: stretch;
	    box-sizing: border-box
	}
	
	.loading svg {
	    height: 40%;
	    max-height: 1.25rem;
	    max-width: 80%;
	    stroke: transparent
	}
	
	.loading circle {
	    -webkit-transform-origin: center;
	    -ms-transform-origin: center;
	    transform-origin: center;
	    will-change: transform;
	    -webkit-animation-timing-function: linear;
	    animation-timing-function: linear;
		&:nth-child(1) {
			-webkit-animation: loading1 .6s infinite;
			animation: loading1 .6s infinite
		}
		&:nth-child(2) {
			-webkit-animation: loading2 .6s infinite;
			animation: loading2 .6s infinite
		}
		&:nth-child(3) {
			-webkit-animation: loading2 .6s infinite;
			animation: loading2 .6s infinite
		}
		&:nth-child(4) {
			-webkit-animation: loading3 .6s infinite;
			animation: loading3 .6s infinite
		}
	}
	
</style>