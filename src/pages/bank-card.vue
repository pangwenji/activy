<template>
    <page :show-scrollbar="true" :mouse-wheel="true" :head-box="isPc ? ['content', 'right'] : undefined">
        <div class="body page-pading">
            <div class="bank-card" v-for="(item, index) in list">
                <div class="info-box">
                    <div class="info">
                        <div>{{ item.type }}</div>
                        <div v-if="item.real_name">{{ item.real_name }}</div>
                        <div v-if="item.bank_code">{{ item.bank_code }}</div>
                        <div v-if="item.bank_name">{{ item.bank_name }}</div>
                    </div>
                    <div class="numbers">{{  showIndex.indexOf(index) > -1 ? item.bank_account : hiddenNumbers(item.bank_account) }}</div>
                </div>
                <div class="btns">
                    <div class="icon-btn" v-if="showIndex.indexOf(index) > -1" @click="showCilke(index,0)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M0.542766 26.8464C-0.0869687 27.3667 -0.182688 28.3077 0.328971 28.9481C0.84063 29.5884 1.76591 29.6858 2.39565 29.1655L31.4572 5.15357C32.087 4.63326 32.1827 3.69233 31.671 3.05195C31.1594 2.41156 30.2341 2.31422 29.6044 2.83454L25.4423 6.2734C22.7983 4.34895 19.5005 3.05194 15.9258 3.05194C7.35832 3.05194 0.394643 10.5062 0.328885 16.2211C0.433229 18.5487 1.88885 21.3828 4.24775 23.7852L0.542766 26.8464ZM6.51985 21.9079L10.5281 18.5961C9.94972 17.7112 9.61373 16.7602 9.57928 15.9256C9.48052 13.5309 12.2598 10.1779 15.9258 10.1779C17.2029 10.1779 18.3979 10.6034 19.4068 11.2602L23.1482 8.16884C21.1644 6.88079 18.776 6.03549 16.2467 6.03549C9.24618 6.03549 3.25955 11.8071 3.27844 16.137C3.28677 17.9157 4.51989 20.078 6.51985 21.9079ZM16.8129 13.4033C16.5879 13.351 16.3568 13.3224 16.1233 13.3224C13.9289 13.3224 12.343 14.8508 12.3483 16.0824C12.3496 16.3178 12.4469 16.5886 12.626 16.8627L16.8129 13.4033Z"
                                fill="#FFFFFF" />
                            <path
                                d="M15.9258 28.9481C13.2022 28.9481 10.6572 28.1805 8.44513 26.9685L11.0857 24.7867C12.6778 25.4328 14.4267 25.8228 16.2467 25.8228C22.84 25.8228 28.4894 20.0689 28.4825 16.137C28.4804 14.7342 27.895 13.1877 26.8818 11.7354L29.1284 9.87906C30.6836 11.9412 31.61 14.1951 31.6709 16.2211C31.6052 21.3769 24.5117 28.9481 15.9258 28.9481Z"
                                fill="#FFFFFF" />
                            <path
                                d="M14.9511 21.5929L22.4005 15.438C22.4256 15.6037 22.4387 15.7667 22.4387 15.9256C22.4423 18.3303 19.5026 21.6733 15.9258 21.6733C15.5915 21.6733 15.2663 21.6454 14.9511 21.5929Z"
                                fill="#FFFFFF" />
                        </svg>
                    </div>
                    <div class="icon-btn" v-if="showIndex.indexOf(index) === -1" @click="showCilke(index,1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M15.9244 30C7.1769 30 0.235171 22.3749 0 17.222C0.0671916 11.4842 7.1769 4 15.9244 4C24.6904 4 31.8249 11.512 32 17.222C31.9328 22.3985 24.6904 30 15.9244 30ZM16.252 6.99552C9.10446 6.99552 2.99213 12.7903 3.01144 17.1376C3.03034 21.0675 9.10446 26.8623 16.252 26.8623C22.9837 26.8623 28.7517 21.0852 28.7446 17.1376C28.7378 12.7625 22.9837 6.99552 16.252 6.99552ZM15.9244 22.696C12.1814 22.696 9.54541 19.3296 9.44462 16.9253C9.34383 14.521 12.1814 11.1546 15.9244 11.1546C19.5763 11.1546 22.5701 14.505 22.5739 16.9253C22.5776 19.3397 19.5763 22.696 15.9244 22.696ZM16.126 14.3117C13.8856 14.3117 12.2662 15.8462 12.2717 17.0827C12.2767 18.0382 13.8856 19.5727 16.126 19.5727C17.8675 19.5727 19.4835 18.0428 19.4814 17.0827C19.4797 15.839 17.8675 14.3117 16.126 14.3117Z"
                                fill="#FFFFFF" />
                        </svg>
                    </div>
                    <div class="icon-btn" @click="$open('/add-bank-card', {
                        bank: item
                    })">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M26.4116 3.3335C26.8539 3.33341 27.278 3.50911 27.5907 3.82191L33.6781 9.91199C34.3286 10.5628 34.3286 11.6177 33.6781 12.2685L16.4425 29.5117C16.1299 29.8245 15.7058 30.0002 15.2637 30.0002H9.16602C8.24554 30.0002 7.49935 29.254 7.49935 28.3335V22.2667C7.49935 21.8251 7.67467 21.4014 7.9868 21.0889L25.2327 3.82236C25.5453 3.50944 25.9694 3.33358 26.4116 3.3335ZM26.4124 7.35815L10.8327 22.9565V26.6668H14.5731L30.1428 11.0902L26.4124 7.35815ZM4.16602 35.0002C4.16602 34.0797 4.91221 33.3335 5.83268 33.3335H35.8327C36.7532 33.3335 37.4993 34.0797 37.4993 35.0002C37.4993 35.9206 36.7532 36.6668 35.8327 36.6668H5.83268C4.91221 36.6668 4.16602 35.9206 4.16602 35.0002Z"
                                fill="#FFFFFF" />
                        </svg>
                    </div>
                    <div class="icon-btn" @click="deleteBank(item, index)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path
                                d="M16.666 14.9998C17.5865 14.9998 18.3327 15.746 18.3327 16.6665V27.4998C18.3327 28.4203 17.5865 29.1665 16.666 29.1665C15.7455 29.1665 14.9993 28.4203 14.9993 27.4998V16.6665C14.9993 15.746 15.7455 14.9998 16.666 14.9998Z"
                                fill="#FFFFFF" />
                            <path
                                d="M24.9993 16.6665C24.9993 15.746 24.2532 14.9998 23.3327 14.9998C22.4122 14.9998 21.666 15.746 21.666 16.6665V27.4998C21.666 28.4203 22.4122 29.1665 23.3327 29.1665C24.2532 29.1665 24.9993 28.4203 24.9993 27.4998V16.6665Z"
                                fill="#FFFFFF" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M16.0735 1.6665C15.4649 1.6665 14.9046 1.9983 14.612 2.53203L12.3456 6.6665H3.33268C2.41221 6.6665 1.66602 7.4127 1.66602 8.33317C1.66602 9.25365 2.41221 9.99984 3.33268 9.99984H5.83268V36.6665C5.83268 37.587 6.57887 38.3332 7.49935 38.3332H32.4993C33.4198 38.3332 34.166 37.587 34.166 36.6665V9.99984H36.666C37.5865 9.99984 38.3327 9.25365 38.3327 8.33317C38.3327 7.4127 37.5865 6.6665 36.666 6.6665H27.6627L25.4485 2.5445C25.1581 2.00382 24.594 1.6665 23.9803 1.6665H16.0735ZM23.8789 6.6665L22.9836 4.99984H17.0606L16.1469 6.6665H23.8789ZM9.16602 9.99984V34.9998H30.8327V9.99984H9.16602Z"
                                fill="#FFFFFF" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="submit-btn" @click="$open('/add-bank-card', {})">
                <text>{{ $t('pageBankCard.submintBtn') }}</text>
            </div>
        </div>
    </page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Page from '../components/page.vue'

import { onLoad } from '../router/routes';
import { isPc } from '../uilts/async.var';
import { dbGet } from '../uilts/db';
import { alert } from '../uilts/ui';
import { t } from '../uilts/i18n';
import { hiddenNumbers } from '../uilts/base';

const showIndex = ref<Array<number>>([])

const showCilke = (index:number,type:number) => {
    if(type){
        showIndex.value.push(index)
    }else{
        showIndex.value.splice(showIndex.value.indexOf(index),1)
    }
}

const list = ref<Array<Bank>>([]);
const deleteBank = (item: Bank, index: number) => {
    alert({
        content: t('pageBankCard.deleteTips'),
        showCancel: true,
        title: t('ui.uniShowModalTitle'),
    }).then(() => {
        "/api/user/saveBank".POST<SaveBank>({
            ...item,
            status: 2
        }, {
            Authorization: async () => await dbGet('token')
        }).then(_ => {
            list.value.splice(index, 1);
            list.value = list.value;
        })
    })
}
onLoad(() => {
    console.log(showIndex.value.indexOf(3));
    
    "/api/user/banks".GET<Banks>(null, {
        Authorization: async () => await dbGet('token')
    }).then(ret => {
        list.value = ret;
    })
})

</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.body {}

svg {
    fill: #FFFFFF;
}

.bank-card {
    padding: 1rem;
    border-radius: 0.5rem;
    background: #494949;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFFFFF;
    margin-bottom: 0.75rem;

    .info-box {
        width: 70%;
    }

    .info {
        display: flex;
        align-items: center;
        // justify-content:space-between;
        padding-bottom: 0.25rem;

        div {
            margin-right: 2.5rem;
        }
    }

    .numbers {
        color: #FFFFFF;
        text-shadow: 0px 1px 0px #000;
        font-size: 1.25rem;
        font-weight: 700;
    }

    .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;

        .icon-btn {
            width: 1.25rem;
            height: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        svg {
            width: 1rem;
            height: 1rem;
        }
    }

    @include pc {

        padding: 25px;
        border-radius: 8px;
        font-size: 18px;
        margin-bottom: 16px;

        .info {
            padding-bottom: 8px;
        }

        .numbers {
            font-size: 32px;
        }

        .btns {
            gap: 0;

            .icon-btn {
                width: 60px;
                height: 60px;
            }

            svg {
                width: 24px;
                height: 24px;
            }
        }
    }
}

.submit-btn {
    @extend %button;
    border: none;
    height: 3.125rem;
    margin: 1.8rem 0;

    @include pc {
        display: flex;
        height: 60px;
        border: none;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        background: linear-gradient(90deg, #00FFFF 0.16%, #FF92FF 99.84%);
    }

    &.disabled {
        filter: brightness(0.5);
        pointer-events: none;
    }
}</style>
