<template>
    <view class="public-bottom pc">
        <view class="page-bottom">

            <view class="menu-bottom-card">
                <view class="bottom-introduce-team bottom-introduce-left">
                    <view class="bottom-introduce-team-one">
                        <img class="logo-icon" src="/LOGO88.png" />
                    </view>
                    <view class="bottom-introduce-team-two">
                        {{ $t('publicBottom.tps1') }}
                    </view>
                </view>

                <view class="menu-bottom">
                    <view class="menu-bottom-title">{{ $t('pageFooter.m1') }}</view>
                    <view class="menu-bottom-team">
                        <text class="text-btn" v-for="(item, i) in casinoClassify" @click="changeType(item.id)">{{ item.name
                        }}</text>
                    </view>
                </view>

                <view class="menu-bottom">
                    <view class="menu-bottom-title">{{ $t('pageFooter.m2') }}</view>
                    <view class="menu-bottom-team">
                        <text class="text-btn" @click="$open('/vip')">{{ $t('pageFooter.m21')
                        }}</text>
                        <text class="text-btn" @click="$open('/recommend')">{{ $t('pageFooter.m22')
                        }}</text>
                        <text class="text-btn" @click="$open('/share')">{{ $t('pageFooter.m23')
                        }}</text>
                    </view>
                </view>

                <view class="menu-bottom">
                    <view class="menu-bottom-title">{{ $t('pageFooter.m3') }}</view>
                    <view class="menu-bottom-team">
                        <text class="text-btn" @click="$open('/activity')">{{ $t('pageFooter.m31')
                        }}</text>
                        <text class="text-btn" @click="$open('/vip')">{{ $t('pageFooter.m32')
                        }}</text>
                        <text class="text-btn" @click="$open('/seven-sign')">{{ $t('pageFooter.m33')
                        }}</text>
                    </view>
                </view>

                <view class="menu-bottom">
                    <view class="menu-bottom-title">{{ $t('pageFooter.m4') }}</view>
                    <view class="menu-bottom-team">
                        <text class="text-btn" @click="$open('/help',{type:'terms_of_service'})">{{ $t('pageFooter.m41')
                        }}</text>
                        <text class="text-btn" @click="$open('/help',{type:'privacy_policy'})">{{ $t('pageFooter.m42')
                        }}</text>
                        <text class="text-btn" @click="$open('/help',{type:'terms_of_service'})">{{ $t('pageFooter.m43')
                        }}</text>
                        <text class="text-btn" @click="$open('/help',{type:'registration_and_login'})">{{ $t('pageFooter.m44')
                        }}</text>
                    </view>
                </view>

                <view class="menu-bottom">
                    <view class="menu-bottom-title">{{ $t('pageFooter.m5') }}</view>
                    <view class="menu-bottom-team">
                        <text class="text-btn">{{ config.kf_email
                        }}</text>
                    </view>
                </view>

            </view>


            <view class="cooperate-card">
                <view class="bottom-introduce">

                    <view class="bottom-introduce-team bottom-introduce-right">
                        <view class="bottom-introduce-team-one">
                            <!-- <img class="i1" src="@/assets/public-bottom/license.webp" /> -->
                            <text>
                                {{ $t('publicBottom.tps2') }}
                            </text>
                        </view>
                        <view class="bottom-introduce-team-two">
                            {{ $t('publicBottom.ba') }}
                        </view>
                    </view>
                </view>
            </view>

        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue"
import { addListener, dbGet, removeListener } from "./uilts/db";
import { casinoClassify, casinoType, config, gameType } from "./uilts/async.var";
import { back, open } from "./router/routes";


let isLogin = ref(false);

const changeType = (type: number) => {
	// gameType.value = type
	// open('/game', { t: type })
	/** 去赌场 */
	casinoType.value = type
	back(-1)
}
const userListener = (type: ListenerType, _user?: UserModel) => {
    isLogin.value = (type === 'set');
}

onUnmounted(() => {
    removeListener('user', userListener)
})
onMounted(() => {
    dbGet('user').then(user => {
        userListener('set', user)
    });
    addListener('user', userListener)
})
</script>

<style lang="scss" scoped>
.text-btn:hover{
    color: #0FF !important;
}
.public-bottom {
    background-color: #0D0A24;
    padding: 32px 60px;
    // display: none;
    // padding-top:100px;
}

.page-bottom {
    max-width: var(--content-max-width);
    margin: auto;
}

.bottom-introduce-team {
    // padding: 0.3125rem;
    width: 226px;
    color: #5B6DA1;
    font-size: 0.7500rem;
    line-height: 1.2500rem;
}

.bottom-introduce-team-one {
    display: flex;
    justify-content: center;
    text-align: center;
    // height: 5rem;
    color: #908FA2;

    .logo-icon {
        width: 12.5000rem;
        height: auto;
        margin-bottom: 20px;
    }

    .i1 {
        width: 4.1rem;
        height: auto;
    }

    text {
        margin-left: 0.6250rem;
    }
}

.bottom-introduce {
    display: flex;
    justify-content: space-between;

    .bottom-introduce-team {
        padding: 0.3125rem;
        width: 100%;
        color: #908FA2;
        font-size: 0.7500rem;
        line-height: 1.2500rem;
    }

    .bottom-introduce-team-one {
        display: flex;

        // height: 5rem;
        .logo-icon {
            width: 12.5000rem;
            height: auto;
        }

        .i1 {
            width: 4.1rem;
            height: auto;
        }

        text {
            margin-left: 0.6250rem;
        }
    }

    .bottom-introduce-team-two {
        text-align: center;
        margin-top: 0.9375rem;
        color: #908FA2 !important;
        font-size: 0.7500rem;
        line-height: 1.2500rem;
    }
}


.menu-bottom-card {

    // width: 100%;
    // padding: 2.2500rem 0.6250rem;
    // border: 1px solid #FFFFFF;
    display: flex;
    justify-content: space-between;

    .menu-bottom {
        .menu-bottom-title {
            color: #8E90CD;
            font-size: 0.8750rem;
        }

        .menu-bottom-team {
            margin-top: 2.0000rem;

            text {
                height: 2.0000rem;
                line-height: 2.0000rem;
                display: block;
                color: #5B6DA1;
                font-size: 0.7500rem;
            }

            view {
                width: 9.3750rem;
                display: flex;
                flex-wrap: wrap;
                -webkit-box-pack: justify;
                -webkit-justify-content: space-between;
                -ms-flex-pack: justify;
                justify-content: space-between;
            }

            image {
                width: 2.5000rem;
                height: 2.5000rem;
                border-radius: 50%;
                margin-bottom: 1.0000rem;
            }
        }
    }
}

.cooperate-card {
    .wrap-one {
        display: flex;
        justify-content: space-between;

        image {
            // min-width: 7.5000rem;
            width: auto;
            height: 3.7500rem;
        }
    }

    .wrap-two {
        display: flex;
        justify-content: center;
        padding: 0.9375rem 0 0;

        image {
            // width: auto;
            height: 4.6875rem;
            border-radius: 50%;
        }
    }
}

.card-title {
    font-size: 1.1250rem;
    color: #FFFFFF;
    padding: 2.2500rem 0;
}

.bottom-introduce-left {
    color: #908FA2;
}
</style>