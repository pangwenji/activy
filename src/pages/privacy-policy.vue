<template>
	<page :title="datas.title">
        <div class="body page-pading">
            <div v-html="datas.content"></div>
        </div>
	</page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import { ref } from 'vue';
import { onLoad } from '../router/routes';

let datas = ref<Help["response"]>({
	content: '',
	title: ''
})

onLoad<PageData["/privacy-policy"]>((data)=>{
	'/api/article/getData'.GET<Help>({
		type: data.type
	}).then(ret => {
		datas.value = ret;
	})
})
</script>

<style lang="scss" scoped>
.body{
    // padding: 0.65625rem;
    font-size: 0.75rem;
    color:#5B6DA1;
}
</style>
