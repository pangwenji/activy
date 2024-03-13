
import type { TransitionProps } from '@vue/runtime-dom'
import type { StyleValue } from 'vue'
export type RouterKeys = "/activity-game" | "/activity-record" | "/activity-rule" | "/activity" | "/add-bank-card" | "/agent v1" | "/agent-details" | "/agent-level" | "/agent-my" | "/agent-rebate" | "/agent-receive" | "/agent-rule" | "/agent-team" | "/agent" | "/announcement" | "/bank-card" | "/brief" | "/cash-back-on-losses" | "/casino" | "/change-info" | "/change-password" | "/chat-rule" | "/chat" | "/coffer-pass-up" | "/coffer-pass" | "/coffer-record" | "/coffer" | "/collect" | "/commission-detail" | "/company" | "/customer-service" | "/deposit" | "/emil" | "/extract" | "/game-open" | "/game" | "/hall" | "/help" | "/history" | "/home" | "/home2" | "/" | "/information-form" | "/information" | "/language" | "/login" | "/member-asset" | "/member-avatar" | "/member-gen" | "/member-record" | "/message" | "/mission-center" | "/mission-details" | "/mission-illustrate" | "/money-is-like-rain" | "/notice" | "/open-red" | "/phone" | "/privacy-policy" | "/promotion-details" | "/ranking" | "/recharge" | "/recommend-record" | "/recommend" | "/record-red" | "/register" | "/rule-description" | "/secure" | "/send-red" | "/setting-pc" | "/setting" | "/seven-sign" | "/share-friends" | "/share" | "/sign-in" | "/sign-record" | "/sign-rule" | "/test" | "/throw-coins" | "/turntable-alert" | "/turntable" | "/vip-record" | "/vip-rule" | "/vip" | "/vip2" | "/waiter" | "/washing-details" | "/washing" | "/webview" | "/withdraw-money";
export interface RConfig {
    /**
     * 路由动画 Transition 组件属性
     */
    transition?:TransitionProps;
    /**
     * 在pc打开是否是弹窗
     */
    pcIsPopup?:boolean;
    /**
     * 页面标题
     */
    title?:string;
    /**
     * 不需要登陆？
     */
    unlogin?:boolean;
    /**
     * 弹窗样式
     */
    popupStyle?:StyleValue;
    /**
     * 在手机打开样式
    */
    mobilePopupStyle?:StyleValue;
    /**
     * 不使用缓存
     */
    noKeepAlive?:boolean;
    /**
     * 弹窗遮罩层是否可以关闭页面
     */
    popupBack?:boolean;
}
export type RouterConfigs = Partial<Record<RouterKeys, RConfig>>;

export interface RouterTabs {
    
    /**
     * tab 默认图标
     */
    icon:string;
    /**
     * tab 跳转地址
     */
    path:RouterKeys;
    /**
     * tab 选中图标
     */
    iconClick?:string;
    /**
     * tab 名称
     */
    name?:string;
}

export type HaveData<K> = [url:K,data:PageData[K]];
export type NoData<K> = [url:K];
export type OpenDatas<K> = K extends keyof PageData ? HaveData<K> : NoData<K>
