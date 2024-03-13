<script setup lang="ts">
import { ref } from 'vue'

defineProps<{shellData:any, title: string}>()

const showModal = ref(false)

const openPopup = () => {
  curValue.value = ''
  showModal.value = true
}

const curValue = ref()

const selectChange = (item: any) => curValue.value = item

const submitSelect = () => {
  if (curValue.value) emits('changeSelect', curValue)
  showModal.value = false
}

const emits = defineEmits(['changeSelect'])

defineExpose({
  openPopup,
})

// const afterLeave = () => {}
</script>
<template>
  <!-- <transition @after-leave="afterLeave"> -->
    <div class="ios-actionsheet-overlay" v-if="showModal">
      <div class="ios-actionsheet container">
        <div class="sheet-title">
          <span class="cancel" @click="showModal=false">{{$t('pageGame.qx')}}</span>
          <span class="title">{{ title }}</span>
          <div @click="submitSelect" class="submit">{{$t('pageMemberAvatar.yes')}}</div>
        </div>
        <div class="sheet-content">
          <div @click="selectChange(item)"
            :class="item.type===curValue?.type && 'active'"
           class="li" v-for="item in shellData">{{item.desc}}</div>
        </div>
      </div>
    </div>
  <!-- </transition> -->
</template>

<style scoped lang="scss">
.container {
  border-radius: 0.66rem 0.66rem 0 0;
  background: #1a1a1a;
  .sheet-title {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:1rem 0;
    color: #ffffff;
    font-size: 0.775rem;
    padding: .68rem 0.9rem;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(255,255,255,.08);
    position: relative;
    .cancel {
      color: #C1C1C1;
    }
    .title {
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .submit {
      color: #009d81;
    }
  }
  .sheet-content {
    width: 100%;
    overflow-y: scroll;
    min-height: 8rem;
    max-height: 12rem;
    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }
    .li {
      height: 2.4rem;
      padding: 0 0.9rem;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(255,255,255,.08);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,.8);
      &.active {
        color: #009d81;
      }
    }
  }
}
</style>
