<template>
	<page :content-style="{
        backgroundColor:'rgb(31, 31, 31)'
    }">
		<template #header-content>
			<div class="header-content-auto">
				<div class="iconlang" @click="open('/language')">
					<img :src="languageIcon" v-lazy="languageIcon" @click="open('/language')" alt="">
				</div>
				<span @click="open('/language')">{{ languageName }}</span>
				<span class="go-edit" @click="open('/language')">{{$t('pageLoginSignIn.goEdit')}}</span>
				<i class="iconTo" @click="open('/language')"></i>
			</div>
		</template>
		<template #header-icon-right>
			<span class="iconfont iconhomeempty" @click="$back(-1)"></span>
		</template>
		<div class="content">
            <div class="emil">
                <span class="iconfont iconemail"></span>
                {{ $t('footer.new2') }}:
                <span class="emil-team">{{ config.kf_email }}</span>
            </div>
		</div>

	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue';
import {  open } from '../router/routes';
import { languageName, languageIcon, config } from '../uilts/async.var';

</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
.iconemail{
    font-size: 1.2rem;
    color: #fcde26;
    &::before{
        content: "\e656";
    }
}

.emil{
    padding: 1rem 0.75rem;
    color: #FFFFFF;
}

.emil-team{
    padding-left: 1.2rem;
    color: #009d81;
}
</style>