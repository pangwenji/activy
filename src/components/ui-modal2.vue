<template>
    <transition name="opacity" mode="out-in">
        <teleport to="#interaction" :disabled="true">
            <div class="mask" @click="emit('close')"></div>
            <div class="ui-modal">
                <slot name="title" v-if="$slots['title']"></slot>
                <div class="ui-modal__hd" v-else><strong class="ui-modal__title">{{title}}</strong></div>
                <slot name="content" v-if="$slots['content']"></slot>
                <div class="ui-modal__bd" v-else>{{content}}</div>
                <div class="ui-modal__ft">
                    <!-- <div v-if="showCancel" class="ui-modal__btn ui-modal__btn_default" @click="emit('close')">{{ cancelText }}</div> -->
                    <border-gradient :border="0" v-if="showCancel" :bg-color="'#009d80'"  class="ui-modal-btn" @click="emit('close')">{{ cancelText }}</border-gradient>
                    <border-gradient :border="0" :bg-color="'#009d80'" class="ui-modal-btn" @click="emit('ok')">{{ confirmText }}</border-gradient>
                </div>
            </div>
        </teleport>
    </transition>
</template>

<script setup lang="ts">
import { defineProps,defineEmits } from 'vue';
import BorderGradient from './border-gradient.vue'
const emit = defineEmits(['close', 'ok']);
defineProps<{
    title:string;
    content:string;
    cancelText?:string;
    confirmText?:string;
    showCancel?:boolean
}>()
</script>
<style lang="scss" scoped>
@import "../scss/public.scss";
.mask{
    background-color: rgba(0, 0, 0, 0.5);
    z-index:calc(var(--I4) + 0);
}
.ui-modal {
    position: fixed;
    z-index:calc(var(--I4) + 1);
    width: 90%;
    max-width: 20rem;
    top: 50%;
    left: 50%;
    padding: 0.6250rem;
    transform: translate(-50%, -50%);
    background-color:#1f1f1f;
    color: #FFF;
    text-align: center;
    border-radius:0.5rem;
    overflow: hidden;
    @include pc{
        border-radius: 24px;
       padding: 24px;
    }
}

.ui-modal * {
    box-sizing: border-box;
}

.ui-modal__hd {
    padding: 1em 1.6em 0.3em;
}


.ui-modal__title {
    font-weight: 400;
    font-size: 18px;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color:#8E90CD;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.ui-modal__bd {
    font-size: 1rem;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    color: #B5EBFF;
    overflow-x: hidden;
    overflow-y: auto;
    @include pc{
        color: #8E90CD;
    }
}

.ui-modal__textarea {
    resize: none;
    border: 0;
    margin: 0;
    width: 90%;
    padding: 10px;
    font-size: 20px;
    outline: none;
    border: none;
    background-color: #eee;
    text-decoration: inherit;
}

.ui-modal__ft {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: flex;
    align-items:center;
    justify-content:center;
    padding-top:1.25rem;
}

// .ui-modal__ft:after {
//     content: ' ';
//     position: absolute;
//     left: 0;
//     top: 0;
//     right: 0;
//     height: 1px;
//     border-top: 1px solid #4b4b4b;
//     color: #d5d5d6;
//     transform-origin: 0 0;
//     transform: scaleY(0.5);
// }

.ui-modal__btn {
    display: block;
    flex: 1;
    color: #3cc51f;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
    cursor: pointer;
}

.ui-modal__btn:active {
    background-color: #303135;
}

.ui-modal__btn:after {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #4b4b4b;
    color: #d5d5d6;
    transform-origin: 0 0;
    transform: scaleX(0.5);
}

.ui-modal__btn:first-child:after {
    display: none;
}

.ui-modal__btn_default {
    color: #FFF;
}
.ui-modal-btn{
    flex:1;
    border-radius:0.5rem;
}

</style>
