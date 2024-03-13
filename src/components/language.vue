<template>
    <div class="page-k">
        <div class="card" v-for="item in il8nList" :class="{ 'selected': index === item.lang }">
            <view class="item btn" @click="changeLanguage(item)">
                <div class="left-v">
                    <img :src="item.lang_icon" alt="">
                    <span>{{ item.remark }}</span>
                </div>
               
            </view>
        </div>
    </div>
</template>

<script setup lang="ts">

import { onServerPrefetch, ref } from 'vue';
import { dbGet, dbSet } from '../uilts/db';
import { il8nList, languageIcon, unit } from '../uilts/async.var';
import { lang } from '../uilts/base';
import { back, onLoad } from '../router/routes';
let index = ref(lang);
let language = ref<Init['response']['language']>([])
type Item = Init['response']['language'][number];
const changeLanguage = async (item: Item) => {
    unit.value = item.unit;
    languageIcon.value = item.lang_icon
    await dbSet('moneyCode', item.code)
    await dbSet('language', item.lang)
    index.value = item.lang;
    back()
}


onServerPrefetch(async () => {
    language.value = (await dbGet('init')).language;
    index.value = await dbGet('language');
})


// dbGet('init').then(init => {
// 	language.value = init.language
// })
// dbGet('language').then(name => {
// 	index.value = name;
// })
onLoad(() => {
    dbGet('init').then(init => {
        language.value = init.language
    })

    dbGet('language').then(name => {
        index.value = name;
    })
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
.page-k {
    padding: 0.6250rem;
    background: #3a3a3a;
}

.card:hover,
.selected {
    border-radius: 4px;
    // background: radial-gradient(79.83% 70.18% at 64.13% 138.26%, rgba(255, 251, 251, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(180deg, #2F2C61 0%, #3C3789 100%);
    .item{
        color: #009d80;
    }
}

.item {
    // padding: 1.1250rem 0.7500rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #8E90CD;
    font-family: PingFang SC;
    font-size: 0.8750rem;
    font-style: normal;
    font-weight: 400;
    border-radius: 0.1875rem;
    color: #fff;
    // background: #231D4E;

    .left-v {
        display: flex;
        align-items: center;

        img {
            width: 1.1250rem;
            height: 1.1250rem;
            margin-right: 5px;

            @include pc{
                width: 32px;
                height: 32px;
            }
        }
    }

    @include pc{
        padding: 0;
        padding-left: 9px;
        width: 112px;
        height: 48px;
        font-size: 14px;
    }
}

.svg-card {
    width: 0.9375rem;
    height: 0.9375rem;
    background-color: #00FFFF;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        width: 0.4688rem;
        height: 0.6563rem;
    }
}
</style>