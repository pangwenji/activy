<template>
    <!-- style="max-width:100%;" -->
    <page title-bg-color="transparent"  page-style="height:calc(100% - var(--headers-height));overflow:hidden;" :content-style="{
        overflow:'visible',
        height:'calc(100% - var(--headers-height))'
    }">
        <template #header v-if="showThrowCoins">
            <div class="header-card">
                <!-- <div class="left-icon" @click="onBack()">
                    <img src="@/assets/new/back-btn.png" class="icon">
                </div> -->
                <border-gradient class="award" :border-color="isPc ? ['#292547','#292547'] : ['#FFC8C6', '#57B6FE']"
                    :bg-color="isPc ? '#201E47' : 'linear-gradient(90deg, #DE12FF 0%, #5849FF 100%)'"
                    :contentStyle="{
                        justifyContent: 'flex-start',
                        paddingRight:isPc ? '50px' : '1.47rem'
                    }">
                    <img src="@/assets/new/throw-coins/icon-title.png" class="icon-title" />
                    <div>
                        <div>{{ $t('pageActivityNew.yhdjj') }}</div>
                        <div class="n-money">{{ unit }}{{ awardMoney.toFixed(2) }}</div>
                    </div>
                </border-gradient>
            </div>
        </template>
        <template v-if="showThrowCoins">
            <div ref="moneys" class="moneys">
                <div class="center" ref="countdown">
                    <div class="start" :class="{ active: timeIndex == 0 }" @animationend="start">{{ $t('pageActivityNew.ydbjqy') }}
                    </div>
                    <template v-for="i in time">
                        <div class="numbers">
                            <div class="number" :class="{started:startedToRain}" @animationend="timeEnd" v-if="timeIndex == i">{{ i }}</div>
                        </div>
                    </template>
                </div>
            </div>
            <img class="bg-img h5" src="@/assets/new/throw-coins/throw-coins-bottom.png" />
            <img class="bg-img pc" src="@/assets/new/throw-coins/throw-coins-bottom-pc.png" />

        </template>
        
    </page>
</template>

<script setup lang="ts">
import BorderGradient from '../components/border-gradient.vue';
import TurntableAlert from '../components/turntable-alert.vue';
import { ref } from 'vue';
import Page from '../components/page.vue';
import { back, onHidden, onLoad, onShow } from '../router/routes';
import { fireworks, alert } from '../uilts/ui';
import { getRandomInt } from '../uilts/base';
import { balance, isOpenThrowCoins, isPc, unit } from '../uilts/async.var';
import { dbGet } from '../uilts/db';
import { t } from '../uilts/i18n';
const countdown = ref();
const moneys = ref();
const time = ref(3);
const timeIndex = ref(time.value);
/**开始下雨 */
const startedToRain = ref(false);

const timeEnd = (e: AnimationEvent) => {
    timeIndex.value--;
    fireworks(e)
}

const start = () => {
    countdown.value.remove();
    interval = setInterval(createMoney, getRandomInt(60, 300));
}

// const onBack = () => {
//     isOpenThrowCoins.value = 4;
//     back()
// }

const awardMoney = ref(0);
const showThrowCoins = ref(false)
let end_time = 0

let interval: NodeJS.Timeout | null;

// 红包总数
let rain_count = -1;
let create_rain_count = -1;
//可抢红包数
// let user_count = 0;
// 中奖奖品
let winningPrizes:GetRedMoneyData['response'] = [];
// 中奖奖品以获得的
let winningPrizesActive:GetRedMoneyData['response'] = [];



let isOver = false;
const gameOver = () => {
    if(!isOver){
        isOver = true;
        "/api/activity/receiveRainOfMoney".POST<ReceiveRainOfMoney>({
            ids:winningPrizesActive.map(e => e.id)
        },{
            Authorization: async () => await dbGet('token')
        }).then(() => {
            balance.value = (Number(balance.value) + Number(awardMoney.value)).toFixed(2);
            alert({
                title:t('pageTurntable.zjl'),
                content:unit.value + awardMoney.value.toFixed(2)
            },TurntableAlert).finally(() => {
                back();
            })
        })
    }
}

function createMoney() {
    if (rain_count == 0) {
        clearInterval(interval as NodeJS.Timeout);
        return interval = null;
    } else if (rain_count > 0) {
        rain_count--;
    }

    const money = document.createElement('div');
    money.className = 'money money' + getRandomInt(1, 7);
    // money.dataset.money = `+${unit.value}10.3`;
    money.style.animationName = ['drop', 'fall', 'drop1', 'fall1', 'drop2', 'fall2'][getRandomInt(0, 5)];
    money.style.animationDuration = getRandomInt(2, 5) + 's';
    
    
    money.style.animationTimingFunction = ['linear', 'ease-in-out', 'ease', 'ease-in', 'ease-out', 'cubic-bezier(0, -3.92, 0, 2.18)'][getRandomInt(0, 5)];
    money.addEventListener('animationend',() => {
        create_rain_count--;
        if(!create_rain_count){
            gameOver();
        }
    })
    money.onclick = (e) => {
        let wmoney = {
            id:0,
            money:"0.00",
        };
        if(winningPrizes.length){
            wmoney = winningPrizes[Math.max(winningPrizes.length - 1,0)];
        }
        money.className = (money.className + ' active');
        
        winningPrizesActive.push(wmoney);
        winningPrizes.length = Math.max(winningPrizes.length - 1,0);
        awardMoney.value += Number(wmoney.money);
        money.dataset.money = `+${unit.value}${wmoney.money}`;
        fireworks(e, {
            money: `+${unit.value}${wmoney.money}`,
            animationend: () => {
                create_rain_count--;
                if(winningPrizes.length <= 0 || create_rain_count <= 0){
                    gameOver();
                }
                money.remove();
            }
        });
    }
    for (let k in moneys.value.dataset) {
        money.dataset[k] = moneys.value.dataset[k];
    }
    money.style.left = `${Math.random() * (moneys.value.offsetWidth * 0.8)}px`;
    moneys.value.appendChild(money);
    if(end_time * 1000 < new Date().getTime()) gameOver()
    money.onanimationend = () => money.remove()
}


const init = (data:PageData['/throw-coins']) => {
    showThrowCoins.value = true;
    time.value = 3;
    timeIndex.value = 3;
    // 中奖奖品
    winningPrizes = [];
    // 中奖奖品以获得的
    winningPrizesActive = [];
    startedToRain.value = false;
    awardMoney.value = 0;
    isOver = false;
    end_time = data.end_time
    isOpenThrowCoins.value = isOpenThrowCoins.value ? 2 : 1;
    rain_count = data.rain_count;
    create_rain_count = data.rain_count;
    "/api/activity/getRedMoneyData".GET<GetRedMoneyData>(null,{
        Authorization: async () => await dbGet('token')
    }).then(ret => {
        winningPrizes = ret;
        startedToRain.value = true;
    }).catch(() => {
        back();
    })
}
onHidden(() => {
    showThrowCoins.value = false;
    isOpenThrowCoins.value = 4;
    clearInterval(interval as NodeJS.Timeout);
    interval = null;
})
onLoad<PageData['/throw-coins']>((data) => {
    init(data);
})
onShow<PageData['/throw-coins']>((data) => {
    init(data);
})

</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.header-card{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--headers-height);
    padding-right:0.625rem;
	position: relative;
	z-index: calc(var(--I1) + 1);
    .left-icon{
        min-width: 3.125rem;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor: pointer;
        img{
            width: 1.25rem;
		    height: 1.25rem;
        }
    }
    
    @include pc {
        .left-icon{
            width:80px;
            img{
                width: 24px;
                height: 24px;
            }
        }
    }
}


@keyframes await-start {
    0% {
        -webkit-transform:scale3d(1, 1, 1);
        -ms-transform:scale3d(1, 1, 1);
        transform: scaleZ(1)
    }

    50% {
        -webkit-transform:scale3d(1.1, 1.1, 1.1);
        -ms-transform:scale3d(1.1, 1.1, 1.1);
        transform:scale3d(1.1, 1.1, 1.1)
    }

    100% {
        -webkit-transform: scale3d(1, 1, 1);
        -ms-transform:scale3d(1, 1, 1);
        transform:scaleZ(1)
    }
}

@keyframes swing {
    0% {
        -webkit-transform: scale3d(1, 1, 1);
        -ms-transform:scale3d(1, 1, 1);
        transform: scaleZ(1)
    }

    25% {
        -webkit-transform: rotate(0deg) scale3d(1.1, 1.1, 1.1);
        -ms-transform: rotate(0deg) scale3d(1.1, 1.1, 1.1);
        transform: rotate(0) scale3d(1.1, 1.1, 1.1)
    }

    50% {
        -webkit-transform: scale3d(1, 1, 1);
        -ms-transform:  scale3d(1, 1, 1);
        transform: scaleZ(1)
    }

    100% {
        -webkit-transform: rotate(0) scale3d(3, 3, 3);
        -ms-transform: rotate(0) scale3d(3, 3, 3);
        transform: rotate(0) scale(3);
        opacity: 0;
    }
}


@keyframes swing2 {

    to {
        transform: scale(0);
        opacity: 0;
    }
}

@keyframes explode {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.moneys {
    height: 100%;
    position: relative;
    margin-top:calc(0px - var(--headers-height))
}

.money {
    position: absolute;
    width: 5rem;
    height: 3rem;
    z-index:calc(var(--I4) + 0);
    // animation:drop 2s ease-in-out 1;
    background: url(@/assets/new/throw-coins/money1.png) no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;
    // $moneyWH: (
    //     5rem,
    //     3rem),
    //     (7.0595rem, 6.67269rem),
    //     (6.9375rem, 6.5625rem),
    //     (7.84375rem, 5.96875rem),
    //     (6.59375rem, 5.9375rem),
    //     (3.96875rem, 3.40625rem),
    //     (7.84375rem, 5.96875rem
    // );
    $moneyWH: (3.83666rem, 2.92797rem),
        (4.08138rem, 3.97975rem),
        (2.58619rem, 2.1805rem),
        (3.09375rem, 2.78125rem),
        (3.5625rem, 2.71875rem),
        (3.28125rem, 3.09375rem),
        (3.1875rem, 2.6875rem);
    $moneyPCWH: (122.773px, 93.695px),
        (130.604px, 127.352px),
        (82.758px, 69.776px),
        (99px, 89px),
        (114px, 87px),
        (105px, 99px),
        (102px, 86px);

    @each $wh in $moneyWH {
        $i: index($moneyWH, $wh);

        &.money#{$i} {
            width: nth($wh, 1);
            height: nth($wh, 2);
            background-image:url(@/assets/new/throw-coins/money#{$i}.png);
        }
    }
    @include pc {
        @each $wh in $moneyPCWH {
            $i: index($moneyPCWH, $wh);

            &.money#{$i} {
                width: nth($wh, 1);
                height: nth($wh, 2);
            }
        }
    }

    &.active {
        animation-play-state: paused;
        pointer-events: none;
        
    }

    &.await {
        animation: explode 0.5s ease forwards;
        animation-play-state: running;
    }
}

.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.start {
    width: 18.5rem;
    background: linear-gradient(90deg, #FED68D -1.61%, #FFEFD3 50.25%, #FFCF96 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    text-shadow: 0px 16px 45.6px rgba(146, 23, 177, 0.79);
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 999;
    line-height: normal;
    animation: swing2 1s 1;
    animation-play-state: paused;

    &.active {
        animation-play-state: running;
    }
}

.number {
    color: #FFF;
    text-align: center;
    font-size: 8.125rem;
    font-style: normal;
    font-weight: 999;
    line-height: normal;
    animation: swing 1s 1;
    animation-play-state: paused;
    &.started{
        animation-play-state: running;
    }
}
.numbers{
    animation: await-start 1s infinite;
}

.award {
    min-width: 8.09375rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    box-shadow: 0px 10px 20px 0px rgba(14, 11, 33, 0.42);
    font-size: 0.625rem;
    color: #FFF;

    .icon-title {
        width: 3.21875rem;
    }

    .n-money {
        font-size: 0.75rem;
        font-weight: 700;
    }
    @include pc {
        min-width:259px;
        height: 80px;
        border-radius: 84px;
        font-size: 20px;
        color: #8E90CD;
        .n-money {
            font-size: 24px;
            font-weight: 600;
        }
        .icon-title{
            width: 103px;
        }
    }
}
.bg-img{
    display: block;
    position:absolute;
    width:100%;
    left:0;
    bottom:0;
    right:0;
    @include pc {
        width: 100%;
    }
}
</style>