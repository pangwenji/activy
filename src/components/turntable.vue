<template>
  <div class="turntable">
    <img src="@/assets/new/turntable/spin-light.png" alt="" class="spin-light" />
    <img src="@/assets/new/turntable/spin-bg.png" alt="" class="spin-bg" />
    <img class="light light1" src="@/assets/new/turntable/light1.png" alt="" v-show="shineFlg" />
    <img class="light light2" src="@/assets/new/turntable/light2.png" alt="" v-show="!shineFlg" />
    <div
      class="turntable-content-run"
      :class="{ run: spinState == 1, runEnd: spinState != 1 }"
      :style="spinState == 1 ? '' : 'animation-iteration-count:1;'"
    >
      <div
        class="turntable-content"
        :style="{
          transition: turntableTransition,
          transform: 'rotate(' + turntableRotate + 'deg)',
        }"
        @transitionend="transitionend"
      >
        <div
          class="item"
          v-for="(item, i) in datas"
          :style="{ transform: 'translateX(-50%) rotate(' + ((i * 360) / datas.length + 180 / datas.length) + 'deg)' }"
        >
          <div class="name" v-if="i === 0 || i === 1 || i === 6 || i === 2">{{ item.title }}</div>
          <img
            v-if="i === 2 || i === 3 || i === 4 || i === 5 || i === 7"
            class="icon"
            :class="'type' + item.type"
            :src="item.title === '??' ? icon5 : typeImgs[item.type]"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="this" @click="spin">
      <div class="number">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, onUnmounted } from 'vue'
import { t } from '../uilts/i18n'
import { hint } from '../uilts/ui'

import icon1 from '@/assets/new/components/turntable-icon-1.png'
import icon2 from '@/assets/new/components/turntable-icon-2.png'
import icon3 from '@/assets/new/components/turntable-icon-3.png'
import icon5 from '@/assets/new/components/turntable-icon-5.png'
const typeImgs = {
  1: icon1,
  2: icon2,
  3: icon3,
  4: icon3,
}

const emit = defineEmits(['spin', 'update:modelValue'])
const props = withDefaults(
  defineProps<{
    datas: Array<TurntableConfig>
    modelValue: number
  }>(),
  {
    modelValue: 0,
  },
)
const value = ref(props.modelValue)

const shineFlg = ref(false)
// const timer = ref(null)

watch(props, (newProps, _oldProps) => {
  value.value = newProps.modelValue
})
// 0：没开始转  1：一直转不停 2：要停下来的转
const spinState = ref(0)

let oldTurntableRotate = 0
const turntableRotate = ref(0)

const turntableTransition = computed(() => {
  return 'transform ' + (Math.floor(Math.random() * (5 - 3 + 1)) + 3) + 's ease-out'
})

const getTurntableRotate = (spinIndex: number) => {
  if (!props.datas.length) {
    return oldTurntableRotate
  }
  let baseDeg = 0 - (spinIndex * (360 / props.datas.length) + 180 / props.datas.length)
  oldTurntableRotate += 360 * 5
  turntableRotate.value =
    oldTurntableRotate +
    baseDeg +
    (Math.floor(Math.random() * ((360 / props.datas.length) * 0.9)) - (180 / props.datas.length) * 0.9)
}

const runFn = ref<(value: void | PromiseLike<void>) => void>()
const spin = () => {
  if (spinState.value > 0) {
    return hint(t('components.turntable.error'))
  }
  if (value.value <= 0) {
    return hint(t('pageTurntable.tips'))
  }

  emit('spin', (p: Promise<any>) => {
    value.value = value.value - 1
    emit('update:modelValue', value.value)
    return new Promise<{
      item: TurntableConfig
      index: number
      data: any
    }>((resolve, reject) => {
      spinState.value = 1
      let index = { value: 0, data: null }
      runFn.value = () => {
        resolve({
          item: props.datas[index.value],
          index: index.value,
          data: index.data,
        })
      }
      p.then((obj) => {
        index.data = obj
        for (let i = 0; i < props.datas.length; i++) {
          if (obj.task_id === props.datas[i].task_id) {
            spinState.value = 2
            getTurntableRotate((index.value = i))
            break
          }
        }
      }).catch((err) => {
        spinState.value = 0
        value.value = value.value + 1
        emit('update:modelValue', value.value)
        reject(err)
      })
    })
  })
}
const transitionend = () => {
  spinState.value = 0
  runFn.value && runFn.value()
}
let timer: any
onMounted(() => {
  timer = setInterval(() => {
    shineFlg.value = !shineFlg.value
  }, 600)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
.turntable {
  width: 18.6875rem;
  height: 17.6875rem;
  margin: 7rem auto 0;
  position: relative;

  .spin-light {
    width: pxToRem(404);
    height: pxToRem(577);
    position: absolute;
    top: pxToRem(-156);
    left: pxToRem(-74);
    animation: light-rotate 20s linear infinite;
  }
  .spin-bg {
    width: pxToRem(430);
    height: pxToRem(614);
    top: pxToRem(-216);
    left: 50%;
    margin-left: pxToRem(-215);
    position: absolute;
  }
  .light {
    position: absolute;
    width: 15.8rem;
    height: 15.8rem;
    top: pxToRem(8);
    left: 50%;
    right: 0;
    z-index: 1;
    transform: translateX(-50%);
  }
}

.turntable-content-run {
  width: 13.4rem;
  height: 13.4rem;
  position: absolute;
  top: pxToRem(26);
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center center;
  animation: awaitRun 0.5s linear infinite;
  animation-play-state: paused;

  &.run {
    animation-play-state: running;
  }
  &.runEnd {
    animation-play-state: running;
  }
  &.ok {
    transform: translateX(-50%) rotate(0deg);
  }
}

.turntable-content {
  width: 100%;
  height: 100%;
  border-radius: 15.0625rem;

  transform-origin: center center;
  position: relative;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('@/assets/new/turntable/spin-table.png') no-repeat;
    background-size: cover;
    transform: rotate(67.5deg);
  }

  .item {
    position: absolute;
    left: 50%;
    top: 0;
    height: 50%;
    padding-bottom: pxToRem(52);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform-origin: center bottom;
    color: gold;
    text-align: center;
    font-size: pxToRem(28);
    font-weight: 700;

    .icon {
      width: pxToRem(22.5);
      &.type2 {
        transform: rotate(0deg);
      }
      &.type1,
      &.type3 {
        width: pxToRem(44);
      }
    }
    &:nth-child(2) {
      color: red;
    }
    &:nth-child(3) {
      font-size: pxToRem(14);
      padding-bottom: pxToRem(46);
      .icon {
        margin-top: pxToRem(6);
      }
    }
    //&:nth-child(5){
    //  .icon{
    //    width: pxToRem(44);
    //  }
    //}
    //&:nth-child(4){
    //  .icon{
    //    width: pxToRem(44);
    //  }
    //}
    //&:nth-child(6){
    //  .icon{
    //    width: pxToRem(44);
    //  }
    //}
    //&:nth-child(8){
    //  .icon{
    //    width: pxToRem(44);
    //  }
    //}
  }

  .turntable-line {
    width: 0.125rem;
    height: 50%;
    position: absolute;
    right: 50%;
    top: 0;
    transform-origin: center bottom;
    pointer-events: none;
  }
}

@keyframes awaitRun {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }

  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

@keyframes swing {
  0% {
    transform: scaleZ(1);
  }

  50% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    transform: scaleZ(1);
  }
}

.this {
  width: 4.875rem;
  height: 6.125rem;
  background: url(@/assets/new/turntable/spin.png) no-repeat;
  background-size: 100%;
  position: absolute;
  top: 4.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: calc(var(--I1) + 0);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  cursor: pointer;

  .number {
    display: flex;
    padding-top: 8px;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: pxToRem(36);
  }
}
.swing {
  animation: swing 1s infinite;
}
@keyframes light-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
