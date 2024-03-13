<script setup lang="ts">
import PublicLoading from './components/public-loading.vue'
import RootFooters from './root-footers.vue'
import PopupPages from './popup-pages.vue'
import FixedArea from './fixed-area.vue'
import { onMounted, watch } from 'vue'
import {
  appData,
  casinoClassify,
  config,
  il8nList,
  inviteCode,
  isOpenThrowCoins,
  isPc,
  languageIcon,
  languageName,
  locationHref,
  lodingPages,
  noticeArray,
  popupNotice,
  publicHeadIsShow,
  rootFontSize,
  unit,
  moneyRainOpen,
  moneyRainData,
  isLogin,
  rootQuery,
balance,
restMoney,
} from './uilts/async.var'
import { addListener, dbGet, dbSet } from './uilts/db'
import { webSoketInit } from './uilts/socket'
import { baseRouterPath, open, router, onlyOpen, noKeepAlivePage } from './router/routes'
import { clientInit } from './uilts/client.var'
import routerConfig, { windowStyle } from './router/config'
import { alert } from './uilts/ui'
import { t } from './uilts/i18n'
import i18n from './uilts/i18n'
import { appCookieInit } from './uilts/flutter-in-app-web-view'

import { gtmInit, kwaiqInit } from './uilts/statistics'

import type { RouterKeys } from './@types/router.config'
import { useRoute } from 'vue-router'

const route = useRoute()
let app_data = router.currentRoute.value.query
rootQuery.value = JSON.parse(JSON.stringify(app_data))

inviteCode.value = appData.invite_code = (app_data['invite_code'] as string) || ''

if (import.meta.env.VITE_APP_AES_KEY === '') {
  appData.development = 'no key'
}

if (import.meta.env.VITE_APP_DEVELOPMENT === '1' && import.meta.env.VITE_APP_AES_KEY != '') {
  appData.development = (app_data['development'] as string) || ''
}

if (app_data['gtm'] && typeof window !== 'undefined') {
  appData.gtm = app_data['gtm'] as string
  dbSet('gtm', appData.gtm)
  gtmInit(appData.gtm)
}
if (app_data['kwaiq'] && typeof window !== 'undefined') {
  appData.kwaiq = app_data['kwaiq'] as string
  dbSet('kwaiq', appData.kwaiq)
  kwaiqInit(appData.kwaiq)
}

let pro: Promise<any>;
//获取用户余额
const getUserMoney = () => {
	pro && pro.abort();
	pro = '/api/user/getUserMoney'.GET<GetUserMoney>(null, {
		Authorization: async () => await dbGet('token')
	});
	pro.then(ret => {
		balance.value = ret.money;
	}).finally(() => {
	})
}

watch(restMoney, (_v, _o) => {
	getUserMoney()
})

const init = (name?: string, fn?: (lang: DBModels['language']) => void) => {
  let i = '/api/public/init'
    .GET<Init>({
      // visit_link: locationHref.value
    })
    .then((ret) => {
      if (ret.config) {
        config.value.invite_register = ret.config.invite_register
        config.value.kf_email = ret.config.kf_email
        config.value.mobile_register = ret.config.mobile_register
        config.value.login_verification_code = ret.config.login_verification_code
        config.value.email_register = ret.config.email_register
        config.value.web_site_notice = ret.config.web_site_notice
        config.value.withdraw_fee_proportion = ret.config.withdraw_fee_proportion
        noticeArray.value.push(ret.config.web_site_notice)
      }
      // console.log(ret.language);
      console.log(name, ret.language)

      let language = ret.language[0]
      if (name) {
        let lang = ret.language.filter((item) => item.lang === name)[0]
        unit.value = lang ? lang.unit : language.unit
        languageIcon.value = lang.lang_icon
        languageName.value = lang.remark
        i18n.global.locale = lang.lang
      } else {
        unit.value = language.unit
        languageIcon.value = language.lang_icon
        languageName.value = language.remark
        i18n.global.locale = language.lang
      }
      // dbSet('init', ret)
      il8nList.value = ret.language
      fn && fn(language.lang)
    })
  i.finally(() => {
    if (window.closeStartup) {
      window.closeStartup()
    }
  })

  '/api/public/getPopupNotice'
    .GET<GetPopupNotice>({
      visit_link: locationHref.value,
    })
    .then(async (ret) => {
      // console.log(ret);
      popupNotice.value = ret
      // await back(-2)
      // if(popupNotice.value) await open('/announcement')
    })

  '/api/game/getGameTypeList'.POST<GetGameTypeList>().then((list) => {
    casinoClassify.value.length = 0
    for (let item of list) {
      casinoClassify.value.push(item)
    }
  })

  addListener('token', (type) => {
    if (type === 'set') {
      throwCoins()
    } else {
      clearTimeout(throwCoinsTime)
    }
  })

  throwCoins()
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      throwCoins()
    }
  })
  window.addEventListener('focus', function () {
    throwCoins()
  })
}

let throwCoinsTime: NodeJS.Timeout
const throwCoins = () => {
  clearTimeout(throwCoinsTime)
  '/api/activity/checkWhetherRainOfMoney'
    .GET<CheckWhetherRainOfMoney>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then(async (ret) => {
      if (ret.status === 0) {
        isOpenThrowCoins.value = 1
        open('/throw-coins', ret)
      } else if (ret.next_start_time > 0) {
        throwCoinsTime = setTimeout(() => {
          throwCoins()
        }, 30000)
      }

      '/api/activity/getMoneyIsLikeRainDetails'
        .GET<GetMoneyIsLikeRainDetails>(null, {
          Authorization: async () => await dbGet('token'),
        })
        .then((ret) => {
          if (Array.isArray(ret) && !ret.length) {
            moneyRainOpen.value = false
          } else {
            moneyRainOpen.value = true
            moneyRainData.value = ret
          }
        })
        .catch(() => {
          moneyRainOpen.value = false
        })
    })
}

onMounted(() => {
  let title = 'PGNEW'
  if (
    routerConfig[router.currentRoute.value.name as RouterKeys] &&
    routerConfig[router.currentRoute.value.name as RouterKeys]?.title
  ) {
    title = t(routerConfig[router.currentRoute.value.name as RouterKeys]!.title!)
  }
  document.title = title
  router.beforeEach((to, _from, next) => {
    if (routerConfig[(to.name || to.path) as RouterKeys] && routerConfig[(to.name || to.path) as RouterKeys]?.title) {
      title = t(routerConfig[(to.name || to.path) as RouterKeys]!.title!)
    }
    document.body.dataset.pagePath = (to.name || '') as string
    document.title = title
    document.body.style.overflow = 'auto'
    if (to.meta.pcIsPopup) {
      document.body.style.overflow = 'hidden'
    }
    next()
  })
  //
  setTimeout(async () => {
    const registerFlg = route.path.includes('/register')
    if (registerFlg) return
    const token = await dbGet('token').catch((e) => {
      // console.log(e)
    })
    if (!token) {
      const oneHourFlg = getLastExecutionFlg()
      if (!oneHourFlg) return
      await open('/turntable-alert', { title: '' })
    }
  }, 2000)

  if (
    routerConfig[router.currentRoute.value.name as RouterKeys] &&
    routerConfig[router.currentRoute.value.name as RouterKeys]?.title
  ) {
    title = t(routerConfig[router.currentRoute.value.name as RouterKeys]!.title!)
  }
  document.title = title
  router.beforeEach((to, _from, next) => {
    if (routerConfig[(to.name || to.path) as RouterKeys] && routerConfig[(to.name || to.path) as RouterKeys]?.title) {
      title = t(routerConfig[(to.name || to.path) as RouterKeys]!.title!)
    }
    document.title = title
    const dom = document.querySelector('body > .body-main') as HTMLElement
    // dom.style.overflowY = 'auto'

    if (to.meta.pcIsPopup) {
      dom.style.overflowY = 'hidden'
    }
    next()
  })
  // const
  addListener('user', (type, data) => {
    if (type === 'delete') {
      onlyOpen('/login')
    }
  })

  dbGet('gtm')
    .then((gtmId) => {
      gtmInit(gtmId)
    })
    .catch(() => {
      gtmInit(appData.gtm)
    })

  dbGet('kwaiq')
    .then((kwaiqId) => {
      kwaiqInit(kwaiqId)
    })
    .catch(() => {
      kwaiqInit(appData.kwaiq)
    })

  dbGet('language')
    .then((lang) => {
      init(lang)
      addListener('language', (type, name) => {
        if (type === 'set') {
          init(name)
        }
      })
    })
    .catch(() => {
      init(undefined, (lang: DBModels['language']) => {
        dbSet('language', lang).finally(() => {
          addListener('language', (type, name) => {
            if (type === 'set') {
              init(name)
            }
          })
        })
      })
    })

  let width = document.documentElement.clientWidth

  rootFontSize.value = (width <= 600 ? width : 375) / 23.4375
  window.addEventListener('resize', () => {
    rootFontSize.value = (width <= 600 ? width : 375) / 23.4375
    clientInit()
    if (
      baseRouterPath + windowStyle.left?.target == router.currentRoute.value.path ||
      baseRouterPath + windowStyle.right?.target == router.currentRoute.value.path
    ) {
      if (isPc.value) {
        router.replace('/')
      }
    }
  })
  clientInit()
  webSoketInit()

  if (!import.meta.env.DEV) {
    let upIn = setInterval(() => {
      '/updates/app'.VERSION().then(async (vs) => {
        // console.log(vs)
        try {
          let version = await dbGet('version')
          if (version != vs) {
            clearInterval(upIn)
            alert({
              title: t('updata.title'),
              content: t('updata.content'),
            }).finally(() => {
              window.location.reload(true)
            })
          }
        } catch (error) {}
      })
    }, 6000)
  }

  if (rootQuery.value['isapp'] == '1') {
    appCookieInit()
  }
})
const hasHash = (name: string) => router.currentRoute.value.name === name

publicHeadIsShow.value = !isPc.value
  ? false
  : !hasHash('/casino') || !hasHash('/agent') || !hasHash('/activity') || !hasHash('/setting')
const setLastExecution = () => {
  localStorage.setItem('lastExecution', String(new Date().getTime()))
}
const getLastExecutionFlg = () => {
  const lastExecution = Number(localStorage.getItem('lastExecution'))
  if (!lastExecution) {
    setLastExecution()
    return true
  } else {
    // 60 * 60 *1000
    const oneHour = 60 * 60 * 1000 // 1小时，以毫秒为单位
    const elapsedTime = new Date().getTime() - lastExecution
    if (elapsedTime >= oneHour) {
      setTimeout(setLastExecution, 300)
    }
    return elapsedTime >= oneHour
  }
}
watch(
  () => isLogin.value,
  (bool) => {
    if (bool) {
      const oneHourFlg = getLastExecutionFlg()
      if (!oneHourFlg) return
      '/api/activity/getActivityList'
        .GET<GetActivityList>(null, {
          Authorization: async () => await dbGet('token'),
        })
        .then((ret) => {
          const special_activity = ret.special_activity
          const item = special_activity.find((i) => i.activity_type === 'Turntable')
          if (item && item.can_turn_num > 0) {
            onlyOpen('/turntable-alert', {
              title: item.activity_title + unit.value + item.reward_money,
            })
          }
        })
        .catch((e) => {
          // console.log(e)
        })
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition v-bind="isPc ? {} : route.meta.transition">
      <keep-alive :exclude="noKeepAlivePage">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <root-footers v-if="isPc"></root-footers>
  <fixed-area></fixed-area>
  <teleport to="#independent">
    <popup-pages></popup-pages>
  </teleport>
  <teleport to="#fixed-area">
    <transition name="opacity">
      <div class="loading-pages" v-if="lodingPages">
        <public-loading></public-loading>
      </div>
    </transition>
    <!-- <public-page-head v-if="publicHeadIsShow"></public-page-head> -->
  </teleport>
</template>

<style lang="scss">
@import './scss/public.scss';
@import './scss/router-animation.scss';
@import '@/assets/font/font.css';

.iconTo {
  border: 0.3rem solid #049b83;
  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #049b83;
  border-width: 0.3rem 0.4rem;
  border-radius: 0.1rem;
}

.iconfont {
  font-family: iconfont;
}

.iconhomeempty {
  font-size: 1.5rem;
  font-weight: 300;

  &::before {
    content: '\e6a4';
  }
}

.header-content-auto {
  width: calc(100vw - 6.25rem);
  max-width: calc(600px - 160px);
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 0.865rem;

  .go-edit {
    color: #049b82;
    margin: 0 0.625rem;
  }

  .iconlang {
    width: auto;
    height: 1.5rem;
    margin-right: 0.25rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.pages {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: calc(var(--I1) + 0);
}

page {
  display: block;
}

/*页面间距*/
.page-pading {
  padding: 0.75rem;

  @include pc {
    padding: 32px;
  }
}

body {
  &::-webkit-scrollbar {
    width: 0px;
    /* 设置滚动条宽度 */
    height: 0;
  }

  &::-webkit-scrollbar-track {
    background-color: #1e2024;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4d565e;
    background-color: red;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
}

.content-pages-box {
  display: block;
  max-width: var(--content-max-width);
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
}

.empty {
  margin: 0 auto;

  &.empty-card {
    @include pc {
      // width: calc(100% - 1.2500rem);
    }

    @include h5 {
      width: calc(100vw - 1.5rem);
      max-width: calc(600px - 1.5rem);
    }
  }

  &:empty {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 3rem;
    padding-top: 3rem;

    &::after {
      content: attr(data-empty);
      font-size: 0.864rem;
      white-space: nowrap;
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      width: 7rem;
      height: 9rem;
      background: url(@/assets/new/empty/empty-1.png);
      background-repeat: no-repeat;
      background-size: 100%;
      margin: 0 auto;
      // color: var(--TAB-, #5B6DA1);
      color: #3b3b3b;
    }
  }
}

:root[style*='--left-width: 64px;'] {
  uni-left-window .content {
    width: 64px;
  }

  .public-meun-team .meun-right-icon,
  .right {
    display: none;
  }

  .meun-short-card {
    margin: 0;
    flex-direction: column;
  }

  .meun-short-card .meun-short-team {
    width: 100%;
  }

  .meun-short-card .compartilhar,
  .meun-short-card .white {
    display: none;
  }
}

[class*='btn'],
[class*='nav'],
.arrow {
  cursor: pointer;
}

.ellipsis {
  @extend %ellipsis;
}
</style>
