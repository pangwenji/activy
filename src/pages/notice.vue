<template>
  <page
    :on-pullup="onReachBottom"
    :on-pulldown="onPullDownRefresh"
    :head-box="isPc ? ['content', 'right'] : undefined"
    :mouse-wheel="true"
    :show-scrollbar="true"
  >
    <template #header-content>
      <div>{{ $t('noticeSystem') }}</div>
      <div class="title pc">
        <div class="menu-btn left-btn" @click="changeMenu(1)" :class="{ selected: menu == 1 }">
          {{ $t('pageNoticeMessage.m1') }}
        </div>
        <div class="menu-btn right-btn" @click="changeMenu(2)" :class="{ selected: menu == 2 }">
          {{ $t('pageNoticeMessage.m2') }}
        </div>
      </div>
    </template>

    <div class="content page-pading">
      <public-loading v-if="loading" style="margin-top: 75%"></public-loading>
      <view class="empty" :data-empty="$t('ui.empty')" v-else>
        <template v-if="menu == 1">
          <div v-for="(v, i) in list" :key="i">
            <view class="system-time h5">{{ v.create_time }}</view>
            <view class="system-card">
              <view class="system-title">
                <text class="system-title-content">{{ v.title }}</text>
              </view>
              <view class="system-time pc">
                <img src="@/assets/new/message/history.png" alt="" />
                <span>{{ v.create_time }}</span>
              </view>
              <view class="system-cover" v-if="v.image" @click="openLink(v.img_link)">
                <img :src="v.image" mode="widthFix" alt="" />
              </view>

              <view class="system-content" v-if="v.content">
                <view class="system-content-one">
                  <view
                    class="system-content-text"
                    :style="{ height: isShow == i ? 'auto' : isPc ? '56px' : '0.9375rem' }"
                  >
                    <div class="rich-text" v-html="v.content"></div>
                  </view>
                  <view class="system-content-botton top" v-if="isShow != i" @click="expand(i)">
                    <text>{{ $t('pageNoticeSystem.show') }}</text>
                    <img class="h5" src="@/assets/new/message/p-x.png" mode="widthFix" alt="" />
                  </view>
                </view>

                <view class="system-content-botton bottom" v-if="isShow == i" @click="close()">
                  <text>{{ $t('pageNoticeSystem.hide') }}</text>
                  <img class="h5" src="@/assets/new/message/p-s.png" mode="widthFix" alt="" />
                </view>
              </view>

              <view class="short-title" v-if="v.link_title" @click="openLink(v.link)">
                <text>
                  <div v-html="v.link_title"></div>
                </text>
                <img class="h5" src="@/assets/new/message/p-y.png" mode="widthFix" alt="" />
                <img class="pc" src="@/assets/new/message/jt.png" mode="widthFix" alt="" />
              </view>
            </view>
          </div>
        </template>

        <template v-else>
          <view class="public-loadings" v-if="loadingShow">
            <public-loading></public-loading>
          </view>
          <view class="empty empty-e" :data-empty="$t('ui.empty')" v-if="msglist.length <= 0 && !loadingShow"></view>
          <view v-for="(v, i) in msglist" :key="i">
            <view class="msg-view" v-if="v.data_status !== 1">
              <view class="msg-head right">
                <div class="kf">
                  <img class="kf-png" src="@/assets/new/message/kf.png" mode="" alt="" />
                </div>
              </view>

              <view class="msg-content">
                <view class="msg-content-top">
                  <text class="msg-content-name-2 right">{{ $t('pageNoticeMessage.name1') }}</text>
                  <text class="msg-content-time">{{ v.create_time }}</text>
                </view>
                <view class="msg-content-text">
                  {{ v.message }}
                </view>
              </view>
            </view>

            <view class="msg-view" v-if="v.data_status === 1">
              <view class="msg-content">
                <view class="msg-content-top t-left">
                  <text class="msg-content-name left">{{ v.username }}</text>
                  <text class="msg-content-time">{{ v.create_time }}</text>
                </view>
                <view class="msg-content-text msg-right">
                  {{ v.message }}
                </view>
              </view>

              <view class="msg-head left">
                <img :src="v.portrait ? v.portrait : userTop" mode="" alt="" />
                <div class="vip-num">
                  <img src="@/assets/new/user/icon-vip.png" alt="" />
                  <span>VIP{{ userInfo['level'] }}</span>
                </div>
                <!-- <text class="vip-num">V{{ userInfo.level }}</text> -->
                <!-- <text class="vip-num">V0</text> -->
              </view>
            </view>
          </view>
        </template>
      </view>
    </div>
  </page>
</template>

<script setup lang="ts">
import PublicLoading from '../components/public-loading.vue'
import Page from '../components/page.vue'
import { nextTick, ref } from 'vue'
import { open, back, onLoad, onShow } from '../router/routes'
import { soketData } from '../uilts/socket'
import { dbGet } from '../uilts/db'
import { openGame } from '../uilts/public.function'
import { RouterKeys } from '../@types/router.config'
import { isPc } from '../uilts/async.var'

let msglastPage = ref<number>(1)
let msgpages = ref<number>(1)
let msglimit = 10
const msglist = ref<MessageList['response']['list']>([])
const userInfo = ref<UserModel>({})
const loadingShow = ref<boolean>(false)
const showMore = ref<boolean>(false)
const sceollTop = ref<number>(-1)
const menu = ref(1)
// fold-content:hover
let elementStyle = ref<{
  height: string
}>({
  height: '1.0938rem',
})
let isShow = ref<number>(-1)
const expand = (a: number) => {
  elementStyle.value.height = 'auto'
  isShow.value = a
}
const close = () => {
  elementStyle.value.height = '1.0938rem'
  isShow.value = -1
}
const onReachBottomBtn = () => {
  if (lastPage.value > pages.value) {
    pages.value += 1
    getList()
  }
}

const changeMenu = (type: number) => {
  menu.value = type
  if (msglist.value.length == 0) getMessageList()
}

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

const list = ref<NoticeList['response']['list']>([])
let lastPage = ref<number>(1)
let pages = ref<number>(1)
let limit = 10
const loading = ref(true)

const getList = async () => {
  let api = '/api/notice/list'.GET<NoticeList>(
    {
      page: pages.value,
      limit,
      type: 1,
    },
    {
      Authorization: async () => await dbGet('token'),
    },
  )

  let ret = await api
  ret.list.forEach((v) => {
    list.value.push(v)
  })
  api.finally(() => {
    loading.value = false
  })
  // console.log(list.value)

  showMore.value = false
  lastPage.value = Math.ceil(ret.totalCount / limit)
}

const onPullDownRefresh = async () => {
  list.value.length = 0
  pages.value = 1
  await getList()
}

const onReachBottom = async () => {
  if (menu.value === 1) {
    if (lastPage.value > pages.value) {
      pages.value += 1
      await getList()
    }
  } else {
    if (msglastPage.value > msgpages.value) {
      msgpages.value += 1
      await getMessageList()
    }
  }
}

//获取消息列表
const getMessageList = async () => {
  loadingShow.value = true
  try {
    let ret = await '/api/personal/messageList'.POST<MessageList>(
      {
        status: '',
        page: msgpages.value,
        limit: msglimit,
      },
      {
        Authorization: async () => await dbGet('token'),
      },
    )

    // collect.splice(0,collect.length)
    ret.list.forEach((v) => {
      msglist.value.unshift(v)
    })
    msglastPage.value = Math.ceil(ret.totalCount / limit)
    nextTick(() => {
      if (msgpages.value == 1) sceollTop.value = 100000
    })
  } catch (error) {}
  soketData.new_user_message = 0
  loadingShow.value = false
}

onLoad(() => {
  getList()
  soketData.get_system_notice = false
  dbGet('user').then((user) => {
    userInfo.value = user
  })
})

onShow(() => {
  list.value.length = 0
  msglist.value.length = 0
  msgpages.value = 1
  pages.value = 1
  menu.value = 1
  loading.value = true
  getList()
  soketData.get_system_notice = false
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
.content {
  background-color: #1F1F1F;
}
.empty-e {
  margin-top: 50%;
}

.public-loadings {
  margin-top: 75%;
}

.msg-right {
  text-align: right;
}

.msg-list-box {
  width: 100%;
  height: calc(100% - $content-height - var(--window-bottom));
  scrollbar-width: 0;
  scrollbar-color: transparent transparent;
}

.msg-view {
  padding: 0.9375rem 0 0;
  box-sizing: content-box;
  display: flex;

  .msg-head {
    position: relative;

    .kf {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 2px solid #3d35c6;
      display: flex;
      align-items: center;
      justify-content: center;

      @include pc {
        width: 52px;
        height: 52px;
      }

      .kf-png {
        width: 1.5938rem;
        height: 1.5938rem;

        @include pc {
          width: 33px;
          height: 33px;
        }
      }
    }

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;

      @include pc {
        width: 52px;
        height: 52px;
      }
    }

    .vip-num {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;

      // position: absolute;
      top: 1.25rem;
      left: 0;
      width: 2.5rem;
      height: 0.9375rem;
      // background-color: #b1caeb;
      color: #0ff;
      font-size: 0.5rem !important;

      border-radius: 0.5625rem;
      background: rgba(0, 255, 255, 0.1);

      @include pc {
        height: 16px;
        width: 52px;
        font-size: 12px;
        margin-top: -12px;
        border-radius: 18px;
        background: rgba(0, 255, 255, 0.16);
        backdrop-filter: blur(3px);
      }

      // padding: 0.0625rem 0.3125rem;
      img {
        width: 0.5rem;
        height: 0.5rem;

        @include pc {
          width: 10px;
          height: 10px;
        }
      }

      span {
        display: block;
        text-align: center;
      }
    }
  }

  .msg-content {
    width: 100%;

    @include pc {
      border-radius: 16px;
      background: #1b1839;
      padding: 12px;
    }

    .msg-content-top {
      font-size: 0.7813rem;
      color: #a2b2c1;

      @include pc {
        border-bottom: 2px solid #26214e;
        padding-bottom: 12px;
        margin-bottom: 12px;

        text {
          display: block;
        }
      }

      .msg-content-name {
        color: #ffb800;

        @include pc {
          color: #ffb800;
          font-family: PingFang SC sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }

      .msg-content-name-2 {
        color: #0ff;
        margin-left: 0.625rem;

        @include pc {
          color: #b5ebff;
          font-family: PingFang SC sans-serif;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          margin-left: 0;
        }
      }

      .msg-content-time {
        color: #5b6da1;

        @include pc {
          color: var(--TAB-, #5b6da1);
          font-family: PingFang SC sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 300;
          line-height: normal;
          padding-top: 4px;
        }
      }
    }

    .msg-content-text {
      margin-top: 0.4688rem;
      background-color: #231d4e;
      border-radius: 0.2188rem;
      width: calc(100% - 1.25rem);
      padding: 0.625rem;
      color: var(--MENU, #8e90cd);
      text-align: right;
      font-family: PingFang SC;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      white-space: break-word;
      overflow-wrap: break-word;
      word-break: break-all;

      @include pc {
        color: #88a2eb;
        font-family: PingFang SC;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 28px;
        /* 155.556% */
        letter-spacing: 2px;
        background-color: transparent;
        padding: 0;
      }
    }
  }

  .right {
    margin-right: 0.625rem;
  }

  .left {
    margin-left: 0.625rem;
  }

  .t-left {
    text-align: right;
  }
}

.content {
  @include pc {
    padding-top: 50px;
  }
}

.title {
  display: flex;
  justify-content: space-between;
  color: #5b6da1;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 20px;
  position: absolute;
  top: 100%;
  gap: 20px;
  background: var(--body-background-color);

  .menu-btn {
    text-align: center;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid #292547;
    width: 249px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .selected {
    border-radius: 12px;
    background: #2e2c5e;
    color: #b5ebff;
  }
}

.rich-text {
  color: #fff;
  img {
    width: 100%;
    height: auto;
  }
}

.system-time {
  color: #C4C4C4;
  text-align: center;
  font-family: PingFang SC;
  font-size: pxToRem(12);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-bottom: 0.25rem;

  @include pc {
    display: flex;
    padding: 6px 20px 0;
    align-items: center;

    img {
      width: 18px;
      height: 18px;
      margin-right: 6px;
    }

    color: var(--TAB-, #5b6da1);
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    padding-bottom: 0;
  }
}

.system-card {
  margin-bottom: pxToRem(13);
  padding: pxToRem(12);
  border-radius: pxToRem(8);
  background: #2A2A2A;
  //border-top: 0.0313rem solid #24262a;
  //padding-bottom: 0.9375rem;

  @include pc {
    margin-bottom: 36px;
    padding: 20px 0;
    border-radius: 16px;
    background: #1b1839;
  }

  .system-title {
    margin: 0 ;
    //margin-top: 0.625rem;
    color: #fff;
    font-family: PingFang SC sans-serif;
    font-size: pxToRem(14);
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    @include pc {
      background: linear-gradient(90deg, #0ff 0.16%, #ff92ff 99.84%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 24px;
      margin: 0;
      padding: 0 20px;
    }

    img {
      width: 1.1503rem;
      height: 0.9766rem;
    }

    text {
      margin: 0 0.1563rem;
    }
  }

  .system-cover {
    margin: pxToRem(8) 0 0;
    //margin-top: pxToRem(8);

    img {
      width: 100%;
      border-radius: 0.2156rem;
    }
  }

  .system-content {
    //margin: 0 0.9375rem;
    color: var(--MENU, #8e90cd);
    font-family: PingFang SC;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 0.7813rem;
    display: flex;
    flex-wrap: wrap;

    @include pc {
      color: #88a2eb;
      font-family: PingFang SC;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 2px;
    }

    .system-content-one {
      display: flex;
      width: 100%;
    }

    .system-content-text {
      width: 100%;
      overflow: hidden;
      transition: height 0.5s ease;
      margin-right: 0.625rem;
    }

    .system-content-botton {
      display: flex;

      text {
        color: #C4C4C4;
        text-align: right;
        font-family: PingFang SC sans-serif;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        white-space: nowrap;

        @include pc {
          color: var(--TAB-, #b5ebff);
          font-family: PingFang SC sans-serif;
          font-size: 18px;
          font-style: normal;
          font-weight: 600;
          line-height: 28px;
          letter-spacing: 2px;
        }
      }

      img {
        width: 0.7375rem;
        height: 0.4063rem;
        margin-top: 0.3438rem;
        margin-left: pxToRem(4)
      }
    }

    .top {
      margin-left: auto;
    }

    .bottom {
      margin: 0.625rem 0;
      margin-left: auto;
    }
  }

  .short-title {
    //margin: 0 0.9375rem;
    margin-top: 0.625rem;
    color: #C4C4C4;
    font-family: PingFang SC;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 1.0938rem;
    display: flex;
    border-top: pxToRem(1) solid #393939;
    padding-top: 0.625rem;

    @include pc {
      color: #b5ebff;
      font-family: PingFang SC;
      font-size: 16px;
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      letter-spacing: 3px;
    }

    text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    img {
      width: 0.4122rem;
      height: 0.7378rem;
      margin-left: auto;
      margin-top: 0.1563rem;

      @include pc {
        width: 28px;
        height: 28px;
      }
    }
  }
}
</style>
