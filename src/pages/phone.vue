<template>
    <page>
        <div class="content page-pading">
            <img class="img1" src="@/assets/new/phone/1.png" alt="">
            <div class="title">{{ t('pagePhone.p1') }}</div>

            <div class="card">
                <div class="txt">
                    <div class="p1">{{ t('pagePhone.p2') }}</div>
                    <div class="p2">{{ t('pagePhone.p3') }}<span>“pgnew.com”</span></div>
                </div>
                <img src="@/assets/new/phone/2.png" alt="">
            </div>

            <div class="card">
                <img src="@/assets/new/phone/3.png" alt="">
                <div class="txt">
                    <div class="p1">{{ t('pagePhone.p4') }}</div>
                    <div class="p2">{{ t('pagePhone.p5') }}</div>
                </div>
                
            </div>

            <div class="card">
                <div class="txt">
                    <div class="txt">
                        <div class="p1">{{ t('pagePhone.p6') }}</div>
                        <div class="p2">{{ t('pagePhone.p7') }}<span>“pgnew.com”</span>{{ t('pagePhone.p8') }}</div>
                    </div>
                </div>
                <img src="@/assets/new/phone/4.png" alt="">
            </div>
        </div>
    </page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import { ref } from "vue"
import { t } from '../uilts/i18n';
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";

.content {
    // padding: 1.25rem 0.75rem;
    background: repeating-linear-gradient(-45deg,#2a2a2a,#2a2a2a 0.02rem,rgba(0,0,0,0) 0,rgba(0,0,0,0) 0.08rem), rgb(48, 48, 48);
}

.img1 {
    display: block;
    width: 16.9375rem;
    height: 13.40625rem;
    margin: auto;
}

.title {
    text-align: center;
    font-family: Alibaba PuHuiTi 2.0;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    // background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
    // background-clip: text;
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    margin-top: 2.5rem;
    color: #fcde26;
    padding: 0.1rem 0.24rem;
    text-align: center;
}

.card {
    margin-top: 0.625rem;
    padding: 0.75rem 0.625rem;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 0.625rem;

    .img {
        width: 4.23569rem;
        height: 9.17313rem;
    }

    .txt {
        padding: 1rem 0.625rem;
        border-radius: 0.5rem;
        background: #2a2a2a;

        .p1 {
            font-size: 0.875rem;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            color: #B5EBFF;
            color: #009d81;
        }

        .p2 {
            color: #5B6DA1;
            text-align: center;
            font-family: PingFang SC;
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 400;
            line-height: 1.25rem;
            color: #fff;

            span {
                color: #8E90CD;
                font-family: PingFang SC;
                font-size: 0.75rem;
                font-style: normal;
                font-weight: 600;
                line-height: 1.25rem;
                color: #009d81;
            }
        }
    }
}
</style>