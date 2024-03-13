<template>
    <div>
        <div class="slider-card">

            <div class="slider">
                <div class="slides" :style="`transform: translateX(calc(-${currentIndex} * (100% / 3)))`">
                    <div class="slide-box" v-for="(slide, index) in invite" :key="index" >
                        <div class="slide">
                            <div class="box-team">
                                <div>
                                    <img class="xx-btn" v-if="slide.is_receive === 2" src="@/assets/new/recommend/bxpc1.png"
                                        alt="">
                                    <img class="xx-btn" @click="clickTask(slide.activity_id,slide.task_id)" v-if="slide.is_receive === 1" src="@/assets/new/recommend/bxpc2.png"
                                        alt="">
                                    <img class="xx-btn" v-if="slide.is_receive === 0" src="@/assets/new/recommend/bxpc3.png"
                                        alt="">
                                    <div class="money">
                                        {{ unit }}{{ slide.is_receive != 2 ? '???' : slide.bonus }}
                                    </div>
                                    <div class="tips" v-if="slide.is_receive === 2">
                                        {{ $t('pageActivityNew.receiveOk') }}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="left-btn" @click="nextSlide(false)">
                <img src="@/assets/new/recommend/z.png" alt="">
            </div>
            <div class="right-btn" @click="nextSlide(true)">
                <img class="img" src="@/assets/new/recommend/z.png" alt="">
            </div>
        </div>
        <div class="index-card">
            <!-- <div class="line">
                <div class="line-value" :style="{
                    width:currentIndex
                }"></div>
            </div> -->
            <div class="index-div">
                <div class="index" :style="`transform: translateX(calc(-${currentIndex} * (100% / 3)))`">
                    <template v-for="(slide, index) in invite">
                        <div class="index-team" :style="{
                        zIndex:999 - index
                    }"
                        :class="{ 'selected': slide.is_receive === 2,'end':invite.filter(item => item.is_receive == 2).length - 1 == index}"
                        ></div>
                    </template>
                        <div class="index-team"></div>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps, ref, defineEmits } from 'vue';
import { unit } from '../uilts/async.var';

let prop = defineProps<{
    invite: Array<taskData>
}>()
const currentIndex = ref(0)
const translateX = ref(0)

const nextSlide = (type: boolean) => {
    if (currentIndex.value < 1  && type === false) return;
    if (prop.invite.length < 4  && type === true) return;
    type === true ? currentIndex.value++ : currentIndex.value--

    if (currentIndex.value >= prop.invite.length) {
        currentIndex.value = 0;
       
        translateX.value = 0;
    } else {
        translateX.value = - (currentIndex.value * (190.6 + 16));
    }
    // console.log(prop.invite);
    
}

const emit = defineEmits(['clickTask'])


const clickTask = (activity_id:number,task_id:number) => {
    emit('clickTask', activity_id,task_id)
}

</script>
  
<style scoped>
.box-team {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;

    .money {
        color: #0FF;
        text-align: center;
        font-family: D-DIN;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: 24px;
        padding: 24px 0;
        /* 80% */
    }

    .tips {
        color: var(--TAB-, #5B6DA1);
        text-align: center;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        /* 171.429% */
    }
}

.slider-card {
    display: flex;
    position: relative;
    justify-content: center;

    .left-btn {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .right-btn {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }


    .img {
        width: 40px;
        height: 40px;
        transform: rotate(180deg);
    }

}

.index-card {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    .index-div {
        width: calc(100% - 100px);
        height: 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        border-radius:20px;
        

        .index {
            width: 100%;
            transition: transform 0.5s;
            height: 4px;
            border-radius: 2px;
            background: #201E47;
            position: relative;
            flex-wrap: nowrap;
            word-break: normal;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
            /* overflow: hidden; */
            font-size: 0;
            align-items: center;
            border-radius:20px;
            background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);

            .index-team {
                --lll:calc((100%) / 3);
                font-size: 0;
                display: inline-block;
                width:var(--lll);
                height: 4px;
                text-align: center;
                position: relative;
                background: #19173A;
                letter-spacing: 0;
                border-radius:20px;
                &:last-child::after{
                    display:none;
                }
                &:last-child{
                    --lll:calc((100%) / 3 / 2);
                }
                &:first-child{
                    --lll:calc((100%) / 3 / 2);
                }
            } 

            .selected {
                background: #0FF;

                &::after {
                    background-color: #0FF;
                }
                &.end{
                    background:linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
                }

            }


            .index-team::after {
                content: '';
                width: 10px;
                height: 10px;
                position: absolute;
                border-radius: 50%;
                bottom: -75%;
                right: -5px;
                /* transform: translateX(-50%); */
                background-color: #3C3972;
            }
        }
    }


}

.slider {
    width: calc(100% - 100px + 16px);
    margin-right:-16px;
    overflow: hidden;
    /* background-color: aliceblue; */
}

.slides {
    width: calc(100%);

    /* justify-content: space-between; */
    transition: transform 0.5s;
    white-space: nowrap;
}
.slide-box{
    display: inline-block;
    width: calc(100% / 3);
    padding-right:16px;
    box-sizing: border-box;
    vertical-align:top;
}
.slide {
    display: inline-block;
    width:100%;
    box-sizing:border-box;
    height: 406px;
    border-radius: 16px;
    border: 1px solid #292547;
    background: #201E47;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.line{
    width: calc(100% - 100px);
    height: 4px;
    border-radius: 2px;
    background: #201E47;
}

</style>