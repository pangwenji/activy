<template>
	<page class="rule" title-bg-color="transparent" close-location="right">
        <template #header-content>
            <border-gradient class="tips-btn" padding="0 3rem" :border-color="['#FFCAC4','#55B6FE']" :border="1" :content-style="{
                    background:'linear-gradient(90deg, #DE12FF 0%, #5849FF 100%)'
                }">{{ $t("pageMoneyIsLikeRain.gzsm") }}</border-gradient>
        </template>
        <div class="body">
            <div>{{ $t("pageMoneyIsLikeRain.g1") }}{{unit}}{{ money }} </div>
            <div>{{ $t("pageMoneyIsLikeRain.g2") }} </div>
            <div>{{ $t("pageMoneyIsLikeRain.g3") }}</div>
            <div>{{ $t("pageMoneyIsLikeRain.g4") }}</div>
        </div>
	</page>
</template>

<script setup lang="ts">
	import Page from '../components/page.vue';
	import BorderGradient from '../components/border-gradient.vue';
    
	import { onLoad } from '../router/routes';
    import { ref } from 'vue';
import { unit } from '../uilts/async.var';
    const money = ref('');
	onLoad<PageData['/rule-description']>((get) => {
        money.value = get.money;
	})

</script>

<style lang="scss" scoped>
.rule{
    // background:transparent;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    background-color:#231D4E;
}
.body{
    color: #8E90CD;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding:0 1.25rem;
}
.tips-btn{
    height: 2.5rem;
    border-radius: 2rem;
    color: #FFF;
    font-size: 1rem;
    font-weight: 700;
    margin:0 auto;
    transform:translate(0,-50%);
}
</style>