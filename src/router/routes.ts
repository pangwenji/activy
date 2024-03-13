import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

import utf8 from 'utf8'
import base64 from 'base-64'
import { backTabIndex, lodingPages, showTabIndex, rootQuery} from '../uilts/async.var'
import { ref, onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'
import { dbGet } from '../uilts/db'
import { hint } from '../uilts/ui'

import config, {
  authenticationRoute,
  defaultTabIndex,
  defaultTransition,
  routerBackTabs,
  routerTabs,
  windowStyle,
} from './config'

import type { OpenDatas, RConfig, RouterConfigs, RouterKeys } from '../@types/router.config'
import type { TransitionProps } from '@vue/runtime-dom'
import type { NavigationFailure, RouteRecordRaw } from 'vue-router'
import { flutterCommunicate } from '../uilts/flutter-in-app-web-view'

export const baseRouterPath = import.meta.env.VITE_APP_BAES_ROUTER

export const noKeepAlivePage = ref<Array<string>>([])

for (let c in config) {
  if (config[c as RouterKeys]?.noKeepAlive === true) {
    noKeepAlivePage.value.push(c.replace('/', ''))
  }
}
const pages = import.meta.glob('../pages/*.vue')

const routerTabsPath = routerTabs.map((e) => e.path)

export const routes: Array<RouteRecordRaw> = Object.keys(pages)
  .filter((path) => {
    const name = path.match(/\/pages(.*)\.vue/)![1]
    if ('/index' === name) return false
    const src = name === '/index' ? '/' : name
    return !routerTabsPath.includes(src as RouterKeys)
  })
  .map((path) => {
    const name = path.match(/\/pages(.*)\.vue/)![1]
    const src = name === '/index' ? '/' : name
    let meta: RConfig = {
      transition: defaultTransition,
      pcIsPopup: false,
      ...(src in config ? (config as RouterConfigs)[src as RouterKeys] : {}),
    } as RConfig
    if (meta.pcIsPopup) {
      return {
        path: baseRouterPath + src + '/:data?',
        name: src,
        components: {
          default: pages['../pages/index.vue'],
          modal: pages[path],
        },
        meta: {
          ...meta,
          _t: meta.transition || defaultTransition,
          transition: meta.transition || defaultTransition,
          key: src,
        },
      }
    }
    return {
      path: baseRouterPath + src + '/:data?',
      name: src,
      component: pages[path],
      meta: {
        ...meta,
        _t: meta.transition || defaultTransition,
        transition: meta.transition || defaultTransition,
        key: src,
      },
    }
  })
let children = routerTabsPath.map((src) => ({
  path: baseRouterPath + src,
  name: src,
  component: pages[`../pages${src}.vue`],
  meta: {
    key: baseRouterPath + src,
    transition: defaultTransition,
    _t: defaultTransition,
    ...(config[src] || {}),
  },
}))
children.unshift({
  path: '' as RouterKeys,
  name: '' as RouterKeys,
  component: pages[`../pages${routerTabsPath[defaultTabIndex]}.vue`],
  meta: {
    transition: defaultTransition,
    key: 'root' as RouterKeys,
    _t: defaultTransition,
    ...(config['/'] || {}),
  },
})
children.unshift({
  path: '/',
  name: '/',
  component: pages[`../pages${routerTabsPath[defaultTabIndex]}.vue`],
  meta: {
    transition: defaultTransition,
    key: 'root' as RouterKeys,
    _t: defaultTransition,
    ...(config['/'] || {}),
  },
})
routes.unshift({
  path: baseRouterPath || '/',
  name: baseRouterPath || '/',
  alias: baseRouterPath && '/',
  component: pages['../pages/index.vue'],
  meta: {
    key: '/',
    transition: defaultTransition,
    _t: defaultTransition,
    ...(config['/'] || {}),
  },
  redirect: (baseRouterPath + routerTabsPath[0]) as RouterKeys,
  children: children,
})

if (baseRouterPath) {
  children.unshift({
    path: baseRouterPath + '/',
    name: '/',
    component: pages[`../pages${routerTabsPath[defaultTabIndex]}.vue`],
    meta: {
      transition: defaultTransition,
      key: 'root' as RouterKeys,
      _t: defaultTransition,
      ...(config['/'] || {}),
    },
  })
  routes.unshift({
    path: '/',
    name: '/',
    alias: baseRouterPath && '/',
    component: pages['../pages/index.vue'],
    meta: {
      key: '/',
      transition: defaultTransition,
      _t: defaultTransition,
      ...(config['/'] || {}),
    },
    redirect: (baseRouterPath + routerTabsPath[0]) as RouterKeys,
    children: children,
  })
}
export const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
  scrollBehavior(_to, _from, _savedPosition) {
    return { top: 0 }
  },
})

export const tabIndex = ref(0)
export const clonetabIndex = ref(0)

let isOpen: boolean = false
router.beforeEach(async (to, _from, next) => {
  let path = to.name || to.path
  let delta = routerTabs.findIndex((item) => item.path === path)
  let isTabView = routerTabs.findIndex((item) => item.path === path) > -1
  if (isTabView) {
    if (config[routerTabsPath[delta]]?.unlogin || routerTabsPath[delta] === authenticationRoute) {
      next()
    } else {
      try {
        await dbGet('user')
        next()
      } catch (error) {
        router.replace({
          name: authenticationRoute,
        })
        flutterCommunicate.returnKey = 1
      }
    }
  } else if (to.meta.unlogin || path === authenticationRoute) {
    next()
  } else {
    try {
      await dbGet('user')
      next()
    } catch (error) {
      next({
        name: authenticationRoute,
      })
    }
  }
})
router.beforeEach((to, from, next) => {
  if (
    pages[
      `../pages${
        (to.name || (to.path === baseRouterPath ? '/' : to.path)) === '/' ? '/index' : String(to.name || to.path)
      }.vue`
    ]
  ) {
    to.meta.transition = JSON.parse(JSON.stringify(to.meta._t || {}))
    if (!isOpen) {
      from.meta.transition = JSON.parse(JSON.stringify(from.meta._t || {}))
      ;(to.meta.transition as TransitionProps).name =
        ((from.meta.transition as TransitionProps).name || defaultTransition.name) + '-close'
    } else {
      ;(to.meta.transition as TransitionProps).name =
        ((to.meta.transition as TransitionProps).name || defaultTransition.name) + '-open'
      ;(from.meta.transition as TransitionProps).name =
        ((to.meta.transition as TransitionProps).name || defaultTransition.name) + '-close'
    }
    if (to.meta.pcIsPopup) {
      if (from.matched[0] && from.matched[0].components) {
        to.matched[0].components!.default = from.matched[0].components!.default
      }
    }
    next()
  } else {
    // console.logerror(404)
  }
})
/**打开新路由 */
export const open = async <A extends RouterKeys>(
  ...arg: OpenDatas<A>
): Promise<void | NavigationFailure | undefined> => {
  let st = setTimeout(() => {
    lodingPages.value = true
  }, 300)
  try {
    isOpen = true
    let [url, data] = arg
    let delta = routerTabs.findIndex((item) => item.path === url)
    if (routerTabs.findIndex((item) => item.path === url) > -1) {
      let t = switchTab(delta)
      t.finally(() => {
        clearTimeout(st)
        lodingPages.value = false
      })
      return await t
    }
    let p = router.push({
      name: url,
      params: data && {
        data: base64.encode(utf8.encode(JSON.stringify(data))),
      },
      query: rootQuery.value,
    })
    p.finally(() => {
      clearTimeout(st)
      lodingPages.value = false
      flutterCommunicate.returnKey++
    })
    return await p
  } catch (error) {
    clearTimeout(st)
    lodingPages.value = false
    hint(error as string)
    throw error
  }
}

/**替换当前路由 */
export const onlyOpen = async <A extends RouterKeys>(
  ...arg: OpenDatas<A>
): Promise<void | NavigationFailure | undefined> => {
  let st = setTimeout(() => {
    lodingPages.value = true
  }, 300)
  try {
    isOpen = true
    let [url, data] = arg
    let delta = routerTabs.findIndex((item) => item.path === url)
    if (routerTabs.findIndex((item) => item.path === url) > -1) {
      let t = switchTab(delta)
      t.finally(() => {
        clearTimeout(st)
        lodingPages.value = false
        flutterCommunicate.returnKey = 0
      })
      return await t
    }
    let p = router.replace({
      name: url,
      params: data && {
        data: base64.encode(utf8.encode(JSON.stringify(data))),
      },
    })
    p.finally(() => {
      clearTimeout(st)
      lodingPages.value = false
      flutterCommunicate.returnKey = 1
    })
    return await p
  } catch (error) {
    clearTimeout(st)
    lodingPages.value = false
    hint(error as string)
    throw error
  }
}
/**返回上一个路由 */
export const back = async (delta?: number) => {
  isOpen = false
  // console.log(delta);

  if (delta && delta < 0) {
    await switchTab(~delta)
  } else {
    delta = !delta ? -1 : 0 - delta
    let backPath = ((router.options.history.state.back as RouterKeys) || '').replace(/(\?.*)/, '') as RouterKeys

    // console.log(routerTabs.findIndex(item => item.path === router.currentRoute.value.name),router.currentRoute.value.name);

    if (routerTabs.findIndex((item) => item.path === router.currentRoute.value.name) > -1) {
      if (routerTabs.findIndex((item) => item.path === router.currentRoute.value.name) === clonetabIndex.value) {
        await switchTab(0)
        return
      }
      await switchTab(clonetabIndex.value)
      return
    }

    if (!backPath) {
      await switchTab(0)
    } else if (routerBackTabs.findIndex((item) => item === backPath) > -1) {
      if (config[backPath]?.unlogin || backPath === authenticationRoute) {
        router.go(delta)
      } else {
        try {
          await dbGet('token')
          router.go(delta)
        } catch (error) {
          // console.log(2121);

          await switchTab(0)
        }
      }
    } else if (config[backPath]?.unlogin || backPath === authenticationRoute) {
      router.go(delta)
    } else {
      router.go(delta)
    }

    flutterCommunicate.returnKey = Math.max(flutterCommunicate.returnKey - Math.abs(delta), 0)
  }
}

export const switchTab = async (delta: number, _data?: AnyObject): Promise<void | NavigationFailure | undefined> => {
  let st = setTimeout(() => {
    lodingPages.value = true
  }, 300)

  if (config[routerTabsPath[delta]]?.unlogin) {
    clonetabIndex.value = backTabIndex.value
    showTabIndex.value = delta
    let r = router.replace({
      path: baseRouterPath + routerTabsPath[delta],
    })
    r.finally(() => {
      clearTimeout(st)
      lodingPages.value = false
      flutterCommunicate.returnKey = 0
    })
    return await r
  } else {
    let u = dbGet('user')
      .then(() => {
        clonetabIndex.value = backTabIndex.value
        showTabIndex.value = delta
        return router.replace({
          path: baseRouterPath + routerTabsPath[delta],
        })
      })
      .catch(() => {
        return open(authenticationRoute)
      })
    u.finally(() => {
      clearTimeout(st)
      lodingPages.value = false
      dbGet('user')
        .then(() => {
          flutterCommunicate.returnKey = 0
        })
        .catch(() => {
          flutterCommunicate.returnKey++
        })
    })
    return await u
  }
}

export const changeWindow = (type: WindowType) => {
  document.documentElement.style.setProperty(
    `--${type}-width`,
    windowStyle[type]!.isOpen ? windowStyle[type]!.closeWidth : windowStyle[type]!.openWidth,
  )
  windowStyle[type]!.isOpen = !windowStyle[type]!.isOpen
}
export const onLoad = <T>(callback: PageCallBack<T>) => {
  onMounted(() => {
    let data = {} as T
    try {
      data = JSON.parse(utf8.decode(base64.decode(router.currentRoute.value.params.data as string))) as T
    } catch (error) {}
    let loadData = callback(data)
    if (loadData instanceof Promise) {
      lodingPages.value = true
      loadData.finally(() => {
        lodingPages.value = false
      })
    }
  })
}
export const onHidden = <T>(call: PageCallBack<T>) => {
  onDeactivated(() => {
    let data = {} as T
    try {
      if (router.currentRoute.value.params.data)
        data = JSON.parse(utf8.decode(base64.decode(router.currentRoute.value.params.data as string))) as T
    } catch (error) {
      // console.logerror(error)
    }
    let loadData = call(data)
    if (loadData instanceof Promise) {
      lodingPages.value = true
      loadData.finally(() => {
        lodingPages.value = false
      })
    }
  })
  onUnmounted(() => {
    let data = {} as T
    try {
      data = JSON.parse(utf8.decode(base64.decode(router.currentRoute.value.params.data as string))) as T
    } catch (error) {}
    let loadData = call(data)
    if (loadData instanceof Promise) {
      lodingPages.value = true
      loadData.finally(() => {
        lodingPages.value = false
      })
    }
  })
}

export const onShow = <T>(call: PageCallBack<T>) => {
  onMounted(() => {
    onActivated(() => {
      let data = {} as T
      try {
        data = JSON.parse(utf8.decode(base64.decode(router.currentRoute.value.params.data as string))) as T
      } catch (error) {}
      let loadData = call(data)
      if (loadData instanceof Promise) {
        lodingPages.value = true
        loadData.finally(() => {
          lodingPages.value = false
        })
      }
    })
  })
}
