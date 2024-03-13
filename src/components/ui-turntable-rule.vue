<template>
    <transition @after-leave="afterLeave">
      <div class="ios-actionsheet-overlay" v-if="showModal" @click="deactivate">

        <div class="ios-actionsheet">
          <div class="title">
            <span>{{ title }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.39052 4.89052C4.91122 4.36983 5.75544 4.36983 6.27614 4.89052L16 14.6144L25.7239 4.89052C26.2446 4.36983 27.0888 4.36983 27.6095 4.89052C28.1302 5.41122 28.1302 6.25544 27.6095 6.77614L17.8856 16.5L27.6095 26.2239C28.1302 26.7446 28.1302 27.5888 27.6095 28.1095C27.0888 28.6302 26.2446 28.6302 25.7239 28.1095L16 18.3856L6.27614 28.1095C5.75544 28.6302 4.91122 28.6302 4.39052 28.1095C3.86983 27.5888 3.86983 26.7446 4.39052 26.2239L14.1144 16.5L4.39052 6.77614C3.86983 6.25544 3.86983 5.41122 4.39052 4.89052Z" fill="#5B6DA1"/>
            </svg>
          </div>
          <div class="group" v-for="group in groups">
            <div class="item" v-for="item in group">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script lang="ts" setup>
import { ref,defineProps,computed } from 'vue';

interface Props {
    buttons:Array<{
        text:string;
        label:boolean;
        color:boolean;
        bold:boolean;
        disable:boolean;
        handle:(arg:{button:Props['buttons'][number], selectedIndex:number, selectedGroupIndex:number}) => void
    }>
}

const props = defineProps<{
    selectedIndex:number,
    title:string,
    closeAfter?:Function;
    isShow?:boolean;
    buttons:Array<{
        text:string;
        label:boolean;
        color:boolean;
        bold:boolean;
        disable:boolean;
        handle:(arg:{button:Props['buttons'][number], selectedIndex:number, selectedGroupIndex:number}) => void
    }>
}>()

const showModal = ref(props.isShow || false);

const groups = computed(() => {
    if(!props.buttons){
        return [];
    }
    return [props.buttons.map((group) => {
        return group;
    })];
})


const deactivate = () => {
    showModal.value = false;
}

const afterLeave = () => {
    if(props.closeAfter){
        props.closeAfter();
    }
}
  </script>
  
<style lang="scss" scoped>
.ios-actionsheet{
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  background: #16122F;
  padding:0 0.75rem;
}
.title{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:1rem 0;
  color: #8E90CD;
  font-size: 0.875rem;
  font-weight: 700;
  svg{
    width: 1rem;
    height: 1rem;
  }
}
.group{
  padding-bottom:1rem;
}
.item{
  color:#5B6DA1;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
}
</style>