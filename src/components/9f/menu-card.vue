<template>
    <div class="public-meun-team" :class="{ 'none': none !== true }" @click="onClick">
        <div class="meun-icon" v-if="src && iconHovar">
            <img class="icon" v-if="src" :src="src" />
            <img class="icon-hover" v-if="iconHovar" :src="iconHovar" alt="">
        </div>
        <div class="meun-text">
            <slot v-if="$slots['text']" name="text"></slot>
            <text v-else :style="{ color: nameColor }">{{ name }}</text>
        </div>
        <div class="meun-right-icon" v-if="right !== true">
            <public-svg class="right-icon" icon="icon_Arrow"
                :style="{ width: iconSize + 'upx', fill: iconColor, height: iconSize + 'upx' }">
            </public-svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, ref } from 'vue';
import PublicSvg from '@/components/public-svg.vue';

let prop = defineProps<{
    icon?: string,
    iconHovar?: string
    name?: string,
    nameColor?: string,
    value?: string,
    none?: boolean,
    src?: string,
    iconSize?: number,
    iconColor?: string,
    right?: boolean,
    num?: number
}>()
const num = ref<number>(0)
let numbers = prop.num ? prop.num : 0
num.value = numbers > 99 ? 99 : numbers
watch(prop, (_o, _n) => {
    num.value = prop.num as number > 99 ? 99 : prop.num as number

    // console.log(n.get_system_notice)
    // isNotice.value = n.get_system_notice
})
const emit = defineEmits(['click'])
const onClick = (e: Event) => {
    emit('click', e);
}

</script>

<style lang="scss" scoped>
@import '@/scss/public.scss';

.public-meun-team {
    display: flex;
    height: 2.8750rem;
    align-items: center;
    margin-bottom: 0.1875rem;
    cursor: pointer;
    justify-content: space-between;
    font-size: 0.8750rem;
    color: white;
    @extend %ellipsis;
    overflow: hidden;
    border-bottom: .0625rem solid #3f3f3f;

    .meun-icon {
        width: 3.1250rem;
        height: 100%;
        @extend %flex-center;

        img {
            width: 1.1250rem;
            height: 1.1250rem;
        }

        .icon-hover {
            display: none;
        }

    }

    .meun-right-icon {
        min-width: 1.8750rem;
        height: 100%;
        @extend %flex-center;

        text {
            margin-right: 0.6250rem;
        }

        .right-icon {
            width: 0.7500rem;
            ;
            width: 0.7500rem;
            ;
            fill: white;
        }

        .red {
            display: inline-block;
            font-size: 0.7500rem;
            color: #FFFFFF;
            background-color: red;
            position: absolute;
            padding: 0.1563rem 0.1563rem;
            text-align: center;
            min-width: 0.9375rem;
            line-height: 0.9375rem;
            // height: 0.6250rem;
            border-radius: 1.2500rem;
        }
    }

    .meun-text {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all;
        color: white;
    }

    .icon {
        width: 1.1875rem;
        height: 100%;
        fill: #9BA6B3;
    }

    &:active {
        background-color: #2E2B4F;
        color: #81F4FF;

        .icon {
            // fill: #81F4FF;
        }

        .right-icon {
            // fill: #81F4FF;
        }
    }

    &:hover {
        .icon {
            display: none;
        }

        .icon-hover {
            display: block;
        }

        .meun-text {
            color: #81F4FF;
        }

        .right-icon {
            fill: #81F4FF;
        }
    }
}
</style>