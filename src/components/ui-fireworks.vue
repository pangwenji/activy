<template>
	<div class="ui-fireworks" @animationend="animationend" :style="{
        left:x + 'px',
        top:y + 'px',
    }" :data-money="money"></div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
withDefaults(defineProps<{
	x: number;
	y: number;
    money:string;
    animationend:() => void
}>(), {
    x: 0,
    y: 0,
    money:''
})
</script>

<style lang="scss" scoped>
    @keyframes fireworks{
        @for $i from 0 through 11 {
            $n:$i * -200;
            $b:$i * 9.090909090909092;
            #{$b}%{
                background-position: #{$n}px 0;
            }
        }
    }
    
    @keyframes showMoney {
        0% {
            top:0;
            opacity:0;
        }
        50% { 
            top:-50px;
            opacity:1;
        }
        100% { 
            top:-100px;
            opacity:0;
        }
    }

    .ui-fireworks{
        position:fixed;
        width:200px;
        height:200px;
        background-image:url(@/assets/new/throw-coins/fireworks.png);
        background-position: 0 0;
        background-size:1100% 100%;
        animation-name: fireworks;
        animation-iteration-count:1;
        animation-timing-function:step-start; 
        animation-duration:500ms;
        transform: translate(-50%,-50%);
        pointer-events:none;
        &::before{
            content: attr(data-money);
            position: absolute;
            top:0;
            left:50%;
            white-space:nowrap;
            transform: translate(-50%,50%);
            background: linear-gradient(90deg, #FED68D -1.61%, #FFEFD3 50.25%, #FFCF96 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0px 16px 45.6px rgba(82, 82, 82, 0.79);
            font-size: 1.25rem;
            font-weight: 700;
            animation:showMoney 0.6s linear 1;
        }
    }
</style>