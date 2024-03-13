<template>
	<view class="public-loading">
		<svg viewBox="0 0 84 24" :fill="color || '#009D80'">
			<circle cx="18" cy="12" r="6"></circle>
			<circle cx="18" cy="12" r="6"></circle>
			<circle cx="42" cy="12" r="6"></circle>
			<circle cx="66" cy="12" r="6"></circle>
		</svg>
	</view>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	defineProps<{
		color?:string
	}>()
	
</script>

<style lang="scss" scoped>

.public-loading {
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

/* #ifdef H5 */

@-webkit-keyframes loading1 {
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
.public-loading svg {
    height: 100%;
    max-height: 1.25rem;
    max-width: 80%;
    stroke: transparent
}

.public-loading circle {
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
/* #endif */

/* #ifndef H5 */

@-webkit-keyframes loading {
    0% {
        -webkit-transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
    }

    to {
        -webkit-transform:rotate(360deg);
        -ms-transform:rotate(360deg);
        transform:rotate(360deg);
    }
}
@keyframes loading {
    0% {
        -webkit-transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
    }

    to {
        -webkit-transform:rotate(360deg);
        -ms-transform:rotate(360deg);
        transform:rotate(360deg);
    }
}
image{
	display: block;
	margin:0 auto;
	height:2.5000rem;
	max-height:60%;
    -webkit-transform-origin: center;
    -ms-transform-origin: center;
    transform-origin: center;
    will-change: transform;
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
	animation: loading 1s infinite
}
/* #endif */

</style>