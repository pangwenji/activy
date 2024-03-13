<template>
    <transition name="opacity" mode="out-in">
        <teleport to="#interaction" :disabled="true">
            <div class="mask"></div>
            <div class="content">
                <img src="@/assets/new/components/turntable-alert-icon.png" />
                <div class="title">{{title}}</div>
                <div class="msg">{{content}}</div>
                <div class="btn" @click="emit('ok')">{{ confirmText }}</div>
            </div>
        </teleport>
    </transition>
</template>

<script setup lang="ts">
import { defineProps,defineEmits } from 'vue';
const emit = defineEmits(['close', 'ok']);
defineProps<{
    title:string;
    content:string;
    cancelText?:string;
    confirmText?:string;
    showCancel?:boolean
}>()
</script>
<style scoped lang="scss">
.mask{
    background-color: rgba(0, 0, 0, 0.5);
}
.content{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index:calc(var(--I3) + 1);
    display: flex;
    width: 15rem;
    padding: 3.1875rem 1.5rem 1.5rem 1.5rem;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border-radius: 1rem;
    background:#353535;
    img{
        width: 9.09375rem;
        height: 9rem;
        position:absolute;
        top:-5rem;
        left:0;
        right:0;
        margin:0 auto;
    }
    .title{
        color:#8E90CD;
        font-size: 0.875rem;
    }
    .msg{
        color: #FFEEB4;
        font-size: 2.5rem;
        font-weight: 700;
        padding-bottom:1rem;
        padding-top:0.25rem;
    }
    .btn{
        display: flex;
        align-items:center;
        justify-content:center;
        width: 6.6rem;
        height: 2.5rem;
        flex-shrink: 0;
        border-radius: 1.25rem;
        background-color: #009d81;
        // background:linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
        color: #fff;
        text-align: center;
        font-size: 1rem;
        font-weight: 700;
    }
}
</style>