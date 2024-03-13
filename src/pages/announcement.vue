<script setup lang="ts">
import BorderGradient from "../components/border-gradient.vue"
import Page from '../components/page.vue'
import PublicLoading from '../components/public-loading.vue';
import PublicSvg from '../components/public-svg.vue';
import ScrollView from '../components/scroll-view.vue'
import { RouterKeys } from '../@types/router.config';
import { back, open } from '../router/routes';
import { isPc, popupNotice } from '../uilts/async.var';
import { openGame } from '../uilts/public.function';
import { onMounted, ref, watch, onActivated } from 'vue';
import { dbGet, dbSet } from '../uilts/db';

/**打开链接 */
const openLink = async (noticeLink: GetPopupNotice['response']['link']) => {
  //  open('/cash-back-on-losses')
  // return false
  let link_type = noticeLink.pathType
  let link = noticeLink.pathValue

  if (!link) {
    return
  }
  if (link_type === 3) {
    openGame(JSON.parse(link))
    return
  }
  dbGet('user')
    .then((_user) => {
      // console.log(link);
      // open('/cash-back-on-losses')
      if (/^\//.test(link)) {
        open<'/'>(link as RouterKeys as '/')
        return
      }

      window.open(link)
    })
    .catch(() => {
      open<'/login'>('/login' as RouterKeys as '/login')
    })
}

const disableNoticePopup = ref(false);
const toggleNoticePopup = () => {
    disableNoticePopup.value = !disableNoticePopup.value;
    if (disableNoticePopup.value) {
        const date = new Date().getTime()
        dbSet("noticePopup", { expires: date });
        back()
    }
};


const isLoading = ref(true)
watch(() => popupNotice.value, (news, _old) => {
    if (news) {
        isLoading.value = false
    }
})
onActivated(() => {
    if (popupNotice.value) isLoading.value = false
})
</script>

<template>
    <page :mouse-wheel="true" :close-location="'right'" :showHeader="true" :show-scrollbar="true" title-bg-color="#1F1F1F"
        :head-style="{
            color: isPc ? '#8E90CD' : '#BDBDBD',
            paddingLeft: isPc ? '36px' : '0.625rem',
            fontSize: isPc ? '24px' : '0.75rem',
            borderTopLeftRadius: '0.625rem',
            borderTopRightRadius: '0.625rem',
        }" :head-box="['content', 'right']" :contentStyle="{
    background: '#1F1F1F',
    height: '100%',
}" v-if="popupNotice">
        <public-loading class="public-loading" v-if="isLoading"></public-loading>
        <div v-else class="alert-notice">

            <!-- <scroll-view :show-scrollbar="false" class="scroll-view introduce-meun-view menu-card" :scroll-y="true"> -->
            <div class="notice-content">
                <img v-if="popupNotice.image" class="pop-up-image x-btn"
                    @click="popupNotice.img_link ? openLink(popupNotice.img_link) : false" :src="popupNotice.image" alt="">
                <div v-if="popupNotice.title" class="pop-up-title">{{ popupNotice.title }}</div>
                <div v-if="popupNotice.title" class="pop-up-time">
                    <img class="pc" src="@/assets/new/index/history.png" alt="">
                    <span>{{ popupNotice.create_time }}</span>
                </div>
                <div v-if="popupNotice.content" class="rich-text pop-up-content" v-html="popupNotice.content"></div>
                <!-- <div class="notice-more" @click="openLink(popupNotice.link)">
                    了解更多
                </div> -->
            </div>
            <!-- </scroll-view> -->

        </div>

        <template #footer>
            <div class="footer">
                <div v-if="popupNotice.link_title" class="pop-up-link x-btn h5 " @click="openLink(popupNotice.link)">
                    <border-gradient class="border-gradient-btn" :contentStyle="{ background: '#009d80' }"
                        :border-color="['transparent', 'transparent']" :border="1">
                        <div class="diamond-get-btn">
                            <span>{{ $t('announcementPage.t1') }}</span>
                        </div>
                    </border-gradient>
                </div>
                <div v-if="popupNotice.link_title" class="pop-up-link-pc x-btn pc" @click="openLink(popupNotice.link)">
                    <span>{{ popupNotice.link_title }}</span>
                    <img src="@/assets/new/index/jt.png" alt="">
                </div>
                <div class="not-popup row-center all-center" @click="toggleNoticePopup">
                    <div class="radio-box">
                        <public-svg class="icon" :icon="disableNoticePopup ? 'icon_Check' : ''"></public-svg>
                    </div>
                    <span>{{ $t('announcementPage.t2') }}</span>
                </div>
            </div>

        </template>
    </page>
</template>


<style lang="scss" scoped>
@import "../scss/public.scss";

.page {
    // width: 900px;
}

:deep(.page-head) {

    .icon-btn {
        .icon {
            fill: #BDBDBD;
        }
    }
}

.page-view {
    background: red !important;
}

.pop-up-link-pc {
    color: #B5EBFF;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 3px;
    display: flex;
    justify-content: space-between;
    width: 100%;

    img {
        width: 28px;
        height: 28px;
    }
}

.scroll-view {
    height: 45vh;
    overflow: hidden;

    @include pc {
        height: 700px;
    }
}

.public-loading {
    margin-top: 30%;
}

.header-card {
    padding: 0.6250rem;
    color: #5B6DA1;
    font-size: 0.7500rem;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
        width: 1.2500rem;
        height: 1.2500rem;
        fill: #00FFFF;
    }
}

.pop-up-link {
    display: flex;
    justify-content: center;
    align-items: center;
}

.border-gradient-btn {
    box-sizing: border-box;
    width: 100%;
    margin: 0 1.25rem;
    border-radius: 0.5rem;
}

.diamond-get-btn {
    color: #FFFFFF;
    width: 6.8750rem;
    height: 2.125rem;
    border-image: linear-gradient(180deg, #b7f2ff, #cae9ff 47%, #bae2ff 100%) 1 1;
    border-radius: 6px;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;

    span {
        // transform: skew(5deg);
    }

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}

.alert-notice {
    color: #FFFFFF;
    padding: 1rem 0.75rem 0;

    .notice-content {
        border-radius: 0.3125rem;
        background: #1F1F1F;

        .notice-more {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            width: 100%;
            padding: .125rem;
            background: #009D80;
            border-radius: 1rem;
            font-size: 1rem;
            color: white;
            margin-bottom: 3.125rem;
        }
    }

    @include pc {
        padding: 0 36px;

        .notice-content {
            background-color: transparent;
        }
    }
}

.pop-up-time {
    color: #7D8397;
    font-size: 0.7500rem;
    padding: 0 0.6250rem;

    @include pc {
        font-size: 16px;
        display: flex;
        align-items: center;
        padding: 0;

        img {
            width: 18px;
            height: 18px;
            margin-right: 6px;
        }
    }
}

.pop-up-title {
    font-size: 1.0000rem;
    display: inline-block;
    font-weight: bold;
    color: #BDBDBD;
    text-align: left;
    margin: 0.6250rem;


    @include pc {
        font-size: 24px;
        margin: 40px 0 6px;
    }
}

.pop-up-image {
    border-radius: .5rem;
    width: 100%;

    @include pc {
        width: 904px;
        height: 378px;
    }
}

.pop-up-content {
    color: #BDBDBD;
    padding: 0.6250rem;
    border-radius: 0.1084rem;
    font-size: .8125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    @include pc {
        font-size: 18px;
        padding: 20px 0;
    }
}

.footer {
    padding: 1rem 0 1rem 0;
    background: #1F1F1F;
    border-radius: 0 0 0.5rem 0.5rem;

    .not-popup {
        margin-top: 1rem;


        .radio-box {
            position: relative;
            width: .875rem;
            height: 0.875rem;
            margin-right: .3125rem;
            border-radius: .125rem;
            background: rgba($color: #7D8397, $alpha: .1);

            .icon {
                position: absolute;
                fill: white;
                width: .625rem;
                height: .625rem;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }

        span {
            color: #7D8397;
            font-size: .75rem;
        }
    }

    @include pc {
        background-color: var(--body-background-color);
        border-radius: 0 0 24px 24px;
        border: 1px solid #292547;
        border-top: none;
        margin: 0 -1px;
        color: #B5EBFF;
        padding: 0 36px;
        height: 84px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #231E48;
    }
}
</style>