<template>
	<div class="ui-pagination" v-if="pages > 1">
        <div class="pagination-btn" @click="change(page - 1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M16.2071 5.29289C16.5976 5.68342 16.5976 6.31658 16.2071 6.70711L10.9142 12L16.2071 17.2929C16.5976 17.6834 16.5976 18.3166 16.2071 18.7071C15.8166 19.0976 15.1834 19.0976 14.7929 18.7071L8.79289 12.7071C8.40237 12.3166 8.40237 11.6834 8.79289 11.2929L14.7929 5.29289C15.1834 4.90237 15.8166 4.90237 16.2071 5.29289Z" fill="white" fill-opacity="0.85"/>
            </svg>
        </div>
        <div class="pagination-btn" :class="{
            active:page == 1
        }" @click="change(1)">1</div>

        <div class="pagination-btn" v-if="pages > 6 && pagination[0] > 2">...</div>
         <template  v-if="pages > 6" v-for="i in pagination">
            <div class="pagination-btn"  v-if="i > 1 && i < pages" :class="{
                active:page == i
            }" @click="change(i)">{{ i }}</div>
         </template>
		<div class="pagination-btn" v-else-if="pages < 7" v-for="i in (pages - 1)" :class="{
            active:page == i + 1
        }" @click="change(i + 1)">{{ i + 1 }}</div>
         <div class="pagination-btn" v-if="pages > 6 && pagination[pagination.length - 1] < pages-1">...</div>
        <div class="pagination-btn" v-if="pages > 6" :class="{
            active:page == pages
        }" @click="change(pages)">{{ pages }}</div>
        <div class="pagination-btn" @click="change(page + 1)">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M8.79289 5.29289C8.40237 5.68342 8.40237 6.31658 8.79289 6.70711L14.0858 12L8.79289 17.2929C8.40237 17.6834 8.40237 18.3166 8.79289 18.7071C9.18342 19.0976 9.81658 19.0976 10.2071 18.7071L16.2071 12.7071C16.5976 12.3166 16.5976 11.6834 16.2071 11.2929L10.2071 5.29289C9.81658 4.90237 9.18342 4.90237 8.79289 5.29289Z" fill="white" fill-opacity="0.85"/>
            </svg>
        </div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineProps,onMounted, ref, watch } from 'vue';
const props = defineProps({
	modelValue: {
        type: Number,
        default: 1
    },
    pages:{
        type: Number,
        default: 1
    }
});

const page = ref(props.modelValue);

const pagination = computed<Array<number>>(() => {
    let arr:Array<number> = [];
    let len = (page.value == 1 ? 4 : 3);
    let i = (props.pages - page.value > 3 ? 0 : -2);
    for(i;i < len;i++){
        arr.push(page.value + i)
    }
    return arr;
})

watch(props,(newProps,_oldProps) => {
    page.value = newProps.modelValue;
})

const emit = defineEmits(['change','update:modelValue']);

const change = (p:number) => {
    page.value = Math.max(1,Math.min(props.pages,p));
    // console.log(page.value)
    emit('update:modelValue',page.value);
    emit('change',page.value);
}


onMounted(() => {
	
})

</script>

<style lang="scss" scoped>
.ui-pagination{
    display:flex;
    height:40px;
    align-items:center;
    justify-content:center;
}
.pagination-btn{
    width: 46px;
    height: 34px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#8E8C9F;
    svg{
        width: 24px;
        height: 24px
    }
    &.active{
        color:#FFF;
        border-radius: 4px;
        background:linear-gradient(90deg, #3D35C6 0%, #6C4FE0 100%);
    }
}
</style>