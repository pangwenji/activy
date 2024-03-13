import type { RouterConfigs, RouterTabs } from '../@types/router.config.d'
// import tab1 from '@/assets/tab/tab1.png';
// import tab1Click from '@/assets/tab/tab1-active.png';
// import tab2 from '@/assets/tab/tab2.png';
// import tab2Click from '@/assets/tab/tab2-active.png';
// import tab3 from '@/assets/tab/tab3.png';
// import tab3Click from '@/assets/tab/tab3-active.png';
// import tab4 from '@/assets/tab/tab4.png';
// import tab4Click from '@/assets/tab/tab4-active.png';
// import center from '@/assets/tab/center.png';
import tab1 from '@/assets/new/tabler/game.png'
import tab1Click from '@/assets/new/tabler/game-on.png'
import tab2 from '@/assets/new/tabler/agent.png'
import tab2Click from '@/assets/new/tabler/agent-on.png'
import tab3 from '@/assets/new/tabler/active.png'
import tab3Click from '@/assets/new/tabler/active-on.png'
import tab4 from '@/assets/new/tabler/me.png'
import tab4Click from '@/assets/new/tabler/me-on.png'
import center from '@/assets/new/tabler/share.png'
// import { t } from '../uilts/i18n'

/**
 * 路由列表
 */
const config: RouterConfigs = {
  '/': {
    unlogin: true,
  },
  '/home': {
    unlogin: true,
  },
  '/casino': {
    unlogin: true,
  },
  '/hall': {
    unlogin: true,
    title: 'indexHall',
    transition: {
      name: 'scale-slide',
    },
  },
  '/language': {
    // title: 'language',
    pcIsPopup: true,
    popupBack: true,
    unlogin: true,
    mobilePopupStyle: {
      width: '82%',
      height: 'auto',
      backgroundColor: 'transparent',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    transition: {
      name: 'opacity',
    },
  },
  '/register': {
    title: 'register',
    // 
    unlogin: true,
    // popupStyle: {
    //   width: '534px',
    //   height: 'auto',
    //   margin: 'auto',
    //   top: '50%',
    //   bottom: 'auto',
    //   transform: 'translateY(-50%)',
    //   borderRadius: '24px',
    //   border: '1px solid #292547',
    //   overflow: 'hidden',
    // },
  },
  '/activity': {
    title: 'activity',
    
  },
  '/activity-game': {
    title: 'activityGame',
    
    popupBack: true,
  },
  '/help': {
    title: 'help',
    unlogin: true,
  },
  '/emil': {
    title: 'help',
    unlogin: true,
  },
  '/login': {
    title: 'signIn',
    // 
    // popupStyle: {
    //   width: '534px',
    //   height: 'auto',
    //   margin: 'auto',
    //   top: '50%',
    //   bottom: 'auto',
    //   transform: 'translateY(-50%)',
    //   borderRadius: '24px',
    //   border: '1px solid #292547',
    //   overflow: 'hidden',
    // },
  },
  '/announcement': {
    title: 'announcement',
    pcIsPopup:true,
    unlogin: true,
    popupBack: true,
    popupStyle: {
      width: '90vw',
      height: '776',
      borderRadius: '24px 24px 0 0',
      border: '1px solid #292547',
      borderBottom: 'none',
    },
    
    transition: {
      name: 'opacity',
    },
    mobilePopupStyle: {
      width: '90%',
      height: '50vh',
      borderRadius: '0.5rem 0.5rem 0 0',
      margin: 'auto',
      top: '40%',
      bottom: 'auto',
      transform: 'translateY(-50%)',
      background: '#1F1F1F',
      '--headers-height': '2.47rem',
    },
  },
  '/agent-team': {
    title: 'agentTeam',
    pcIsPopup: false,
    popupBack: true,
  },
  '/agent': {
    title: 'agent',
  },
  '/agent-my': {
    title: 'agentMy',
    
    popupBack: true,
  },
  '/game-open':{
    popupBack: true,
    pcIsPopup: true,
    mobilePopupStyle: {
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'transparent'
    },
  },
  '/agent-level': {
    title: 'agentLevel',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '760px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/agent-rebate': {
    title: 'agentRebate',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/agent-rule': {
    title: 'agentRule',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '660px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/sign-record': {
    title: 'signRecord',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/message': {
    title: 'noticeMessage',
    
    popupBack: true,
  },
  '/notice': {
    title: 'noticeSystem',
    
    popupBack: true,
    popupStyle: {
      width: '582px',
      height: '100%',
      position: 'fixed',
      right: 0,
      top: 0,
      bottom: 0,
      left: 'auto',
    },
    transition: {
      name: 'move',
    },
  },
  '/deposit': {
    title: 'deposit',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '586px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/agent-receive': {
    title: 'agentReceive',
    pcIsPopup: false,
    popupBack: true,
  },
  '/information': {
    title: 'information',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '660px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/information-form': {
    title: 'information',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '660px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/setting-pc': {
    title: 'settingInfo',
    
    popupBack: true,
  },
  '/share': {
    title: 'shareTitle',
    
    popupBack: true,
    popupStyle: {
      width: '428px',
      height: 'auto',
      margin: 'auto',
      top: '50%',
      bottom: 'auto',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      overflow: 'hidden',
    },
  },
  '/member-record': {
    title: 'memberRecord',
  },
  '/withdraw-money': {
    title: 'withdrawMoney',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/seven-sign': {
    title: 'sevenSign',
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '700px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/vip': {
    title: 'vip',
    pcIsPopup: false,
    popupBack: true,
  },
  '/vip2': {
    title: 'vip',
    pcIsPopup: false,
    popupBack: true,
  },
  '/recommend': {
    title: 'recommend',
    pcIsPopup: false,
    popupBack: true,
  },
  '/recommend-record': {
    title: 'recommendRecord',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/company': {
    title: 'company',
    
    popupBack: true,
    unlogin: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/change-password': {
    title: 'changePassword',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: 'auto',
      margin: 'auto',
      top: '50%',
      bottom: 'auto',
      transform: 'translateY(-50%)',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/member-asset': {
    title: 'memberAsset',
    pcIsPopup: false,
    popupBack: true,
  },
  '/secure': {
    title: 'settingSecure',
    
    popupBack: true,
  },
  '/collect': {
    title: 'collect',
    pcIsPopup: false,
    popupBack: true,
  },
  '/history': {
    title: 'history',
    pcIsPopup: false,
    popupBack: true,
  },
  '/washing': {
    title: 'washing',
    pcIsPopup: false,
    popupBack: true,
  },
  '/washing-details': {
    title: 'washingDetails',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
    mobilePopupStyle: {
      width: '90vw',
      height: '50vh',
      margin: 'auto',
      borderRadius: '0.5rem',
    },
    transition: {
      name: 'opacity',
    },
  },
  '/agent-details': {
    title: 'agentDetails',
    
    popupBack: true,
  },
  '/coffer': {
    title: 'coffer',
    
    popupBack: true,
    popupStyle: {
      width: '9999px',
      height: '584px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/coffer-pass-up': {
    title: 'cofferPassUp',
    
    popupBack: true,
    popupStyle: {
      width: '9999px',
      height: '584px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/coffer-pass': {
    title: 'cofferPass',
    
    popupBack: true,
    popupStyle: {
      width: '9999px',
      height: '584px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/coffer-record': {
    title: 'cofferRecord',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/waiter': {
    title: 'waiter',
    
    popupBack: true,
    unlogin: true,
    popupStyle: {
      width: '660px',
      height: '660px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/member-avatar': {
    title: 'memberAvatar',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '660px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/member-gen': {
    title: 'memberGen',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '582px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/game': {
    title: 'game',
    pcIsPopup: false,
    popupBack: true,
    unlogin: true,
  },
  '/promotion-details': {
    title: 'record',
    pcIsPopup: false,
    popupBack: true,
  },
  
  '/activity-record': {
    title: 'activityRecord',
    pcIsPopup: false,
    popupBack: true,
    // popupStyle: {
    //   width: '660px',
    //   height: '640px',
    //   borderRadius: '24px',
    //   border: '1px solid #292547',
    //   overflow: 'hidden',
    // },
  },
  '/vip-rule': {
    title: 'vipRule',
    pcIsPopup:true,
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
    mobilePopupStyle: {
      width: '90vw',
      height: '75vh',
      margin: 'auto',
      borderRadius: '0.5rem',
    },
    transition: {
      name: 'opacity',
    },
  },
  '/mission-center': {
    title: 'missionCenter',
    noKeepAlive: true,
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '700px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/mission-details': {
    title: 'missionDetails',
    noKeepAlive: true,
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '700px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/mission-illustrate': {
    title: 'pageActivityNew.sm',
    
    popupBack: true,
    mobilePopupStyle: {
      width: '100%',
      height: '11.71875rem',
      borderRadius: '0.5rem',
      bottom: '0px',
      top: 'auto',
    },
    transition: {
      name: 'opacity',
    },
  },
  '/throw-coins': {
    pcIsPopup: true,
    popupBack: false,
    unlogin: true,
    noKeepAlive: true,
    mobilePopupStyle: {
      width: '100%',
      height: 'calc(100% - var(--download-height))',
      top: 'auto',
      backgroundColor: 'transparent',
    },
    popupStyle: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    transition: {
      name: 'opacity',
    },
  },
  '/money-is-like-rain': {
    pcIsPopup: true,
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '640px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/rule-description': {
    
    popupBack: true,
    mobilePopupStyle: {
      width: '100%',
      height: '11.71875rem',
      borderRadius: '0.5rem',
      bottom: '0px',
      top: 'auto',
    },
    transition: {
      name: 'opacity',
    },
  },
  '/extract': {
    title: 'extract',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '700px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/share-friends': {
    title: 'shareFriends',
    
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '700px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/cash-back-on-losses': {
    title: 'cashBackOnLosses',
    pcIsPopup: false,
    popupBack: true,
    popupStyle: {
      width: '660px',
      height: '700px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/turntable': {
    
    popupBack: true,
    noKeepAlive: true,
    popupStyle: {
      width: '660px',
      height: '700px',
      borderRadius: '24px',
      border: '1px solid #292547',
      transform: 'translateX(333px)',
      overflow: 'hidden',
    },
  },
  '/turntable-alert': {
    pcIsPopup: true,
    popupBack: true,
    unlogin: true,
    noKeepAlive: true,
    // popupStyle: {
    //   width: '800px',
    //   height: '100%',
    //   overflow: 'hidden',
    // },
    mobilePopupStyle: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    transition: {
      name: 'opacity',
    },
  },
  '/privacy-policy': {
    noKeepAlive: true,
    unlogin: true,
  },
  '/bank-card': {
    title: 'bankCard',
    
    popupBack: true,
    noKeepAlive: true,
    popupStyle: {
      width: '660px',
      height: '714px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/add-bank-card': {
    title: 'addBankCard',
    
    popupBack: true,
    noKeepAlive: true,
    popupStyle: {
      width: '660px',
      height: '714px',
      borderRadius: '24px',
      border: '1px solid #292547',
      overflow: 'hidden',
    },
  },
  '/phone': {
    title: 'addToHomeScreen',
  },
}
/**
 * 手机端 tab 中间的按钮 routerTabs 是偶数才有用
 */
export const midButton: RouterTabs = {
  icon: center,
  // iconClick:centerClick,
  path: '/agent',
  name: 'tabName2',
}

export const defaultTabIndex = 0
/**
 * 手机端 tab 按钮
 */
export const routerTabs: Array<RouterTabs> = [
  {
    path: '/casino',
    icon: tab1,
    iconClick: tab1Click,
    name: 'tabName0',
  },
  {
    path: '/recharge',
    icon: tab2,
    iconClick: tab2Click,
    name: 'tabName1',
  },
  {
    path: '/activity',
    icon: tab3,
    iconClick: tab3Click,
    name: 'tabName3',
  },
  {
    path: '/setting',
    icon: tab4,
    iconClick: tab4Click,
    name: 'tabName4',
  },
]

/**
 * 手机端 tab 路径
 */
export const routerBackTabs: Array<string> = [
  import.meta.env.VITE_APP_BAES_ROUTER + '/casino',
  import.meta.env.VITE_APP_BAES_ROUTER + '/recharge',
  import.meta.env.VITE_APP_BAES_ROUTER + '/activity',
  import.meta.env.VITE_APP_BAES_ROUTER + '/setting',
]

/**
 * 鉴权页面
 */
export const authenticationRoute = '/login'

/**
 * 路由默认动画
 */
export const defaultTransition = {
  name: 'scale',
}

/**
 * pc端 其它窗口的配置
 */
export const windowStyle: WindowStyle = {
  left: {
    target: '/hall',
    openWidth: '80%',
    closeWidth: '0px',
    isOpen: false,
  },
  right: {
    target: '',
    openWidth: '0px',
    closeWidth: '0px',
    isOpen: false,
  },
}

export default config
