import { ref, watch, reactive, computed } from "vue";
import { dbGet, dbSet } from "./db";
import { defaultTabIndex } from "../router/config";
import { router } from "../router/routes";
import base64 from "base-64";
import utf8 from "utf8";
/**
 * 用户余额
 */
export const balance = ref<string>("0.00");
watch(balance, (v, _o) => {
  dbGet("user").then((user) => {
    user.money = v;
    dbSet("user", user);
  });
});

/**
 * 赌场分类
 */
export const casinoClassify = ref<Array<GetGameTypeListItem>>([]);
/**
 * 平台分类
 */
export const casinoCom = ref<Array<GetCompanyListItem>>([]);
/**
 * 单位
 */
export const unit = ref("");
/**
 * 语言icon
 */
export const languageIcon = ref("");
/**
 * 语言名字
 */
export const languageName = ref("");
/**
 * 渠道号
 */
export const inviteCode = ref("");
/**
 * 弹窗公告
 */
export const popupNotice = ref<GetPopupNotice["response"]>();
/**
 * 刷新余额
 */
export const restMoney = ref(false);
/**
 * isAdd显示收藏提示
 */
export const isAdd = ref(true);
/**
 * 配置
 */
export const config = ref<{
  /**
   * 邀请码注册控制  1开启
   */
  invite_register: string;
  kf_email: string;
  mobile_register: string;
  login_verification_code: string;
  email_register: string;
  site_hz_telegram:string;
  /**
   * 首页跑马灯
   */
  web_site_notice: string;
  withdraw_fee_proportion:string;
}>({
  invite_register: "",
  kf_email: "",
  mobile_register: "",
  login_verification_code: "",
  email_register: "",
  web_site_notice: "",
  withdraw_fee_proportion:"",
  site_hz_telegram:""
});
/*** 显示下载*/
export const isDown = ref(false);
/*** PC下载*/
export const deferredPrompt = ref();
/*** 最大请求数*/
export const maxNetwork = reactive<{ [k: string]: any }>({});
/*** 网页客服token*/
export const kfToken = 16335852;
/** 显示下载条*/
export const downloadBtnShow = ref(false);
/*** 是否登录*/
export const isLogin = ref(false);
/*** 显示充值提示*/
export const isReTips = ref(false);
/**是否是pc */
export const isPc = ref(!isMobileDevice);
/**是否是pwa */
export const isPwa = ref(isMedia);
/**设备名称 */
export const platform = ref(MediaName);
/**location.href */
export const locationHref = ref("");
/**location.origin */
export const locationOrigin = ref("");
/**location.hash */
export const locationHash = ref("");
/**安卓下载地址 */
export const androidUrl = ref("");
/**ios下载地址 */
export const iosUrl = ref("");
/**入口参数 */
export const appData = reactive<{
  invite_code?: string;
  gtm: string;
  kwaiq: string;
  development: string;
}>({
  development: "",
  gtm: import.meta.env.VITE_GTM_ID,
  kwaiq: import.meta.env.VITE_KWAIQ_ID,
});
/**tab */
export const showTabIndex = ref(defaultTabIndex);
/**tab */
export const backTabIndex = ref(defaultTabIndex);
/**全局页面加载状态 */
export const lodingPages = ref(false);
/**第一次打开或者刷新 */
export const isFirstOpenApp = ref(true);
/**index是否载入缓存 */
export const isIndexKeepAlive = ref(false);

/**是pc pwa */
export const isPrompt = ref(false);
/**是 安卓 */
export const isAndroid = ref(false);
/**是ios */
export const isIOS = ref(false);
/**根节点字体大小 */
export const rootFontSize = ref(14);
/**是否打开了红包雨 0:没打开 1：自动打开 2：手动打开 3：自动关闭了 4：手动关闭 */
export const isOpenThrowCoins = ref<0 | 1 | 2 | 3 | 4>(0);
/**首页跑马灯数据 */
export const noticeArray = ref<Array<string>>([]);
/** 是否短左边栏*/
export const isLeft = ref(false);
/** 游戏类型 */
export const gameType = ref(0);
/** 当前路由数据 */
export const allRouter = computed(() => {
  return {
    name: router.currentRoute.value.name,
    data: JSON.parse(
      utf8.decode(
        base64.decode(router.currentRoute.value.params.data as string)
      )
    ),
  };
});
/** 收藏操作 */
export const isCollectApi = ref(false);
/** 收藏操作 */
export const il8nList = ref<Init["response"]["language"]>([]);
/** 厂商id */
export const companyType = ref({
  name: "",
  id: 0,
});

export const publicHeadIsShow = ref(false);
/** 赌场当前类型 */
export const casinoType = ref(0);

export const isShowMoneyRainPopup = ref(false)

/** tab页是否在滚动 */
export const indexIsScroll = ref(false);

// 红包雨活动
export const moneyRainOpen = ref(false)
export const moneyRainData = ref<{begin_time: string}>({begin_time: ''})

/** 屏幕是否在滚动 */
export const screenScroll = ref(false);
/** 跳转顶部page */
export const isJumpToTop = ref(0);
/** 跳转顶部index */
export const isGoTop = ref(true);

export const rootQuery = ref<AnyObject>({});