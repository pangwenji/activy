interface DBModels {
	/**
	 * 用户信息
	 */
	user:UserModel,
	/**
	 * 登录令牌
	 */
	token:string,
	/**
	 * 语言
	 */
	language:"pt_BR" | "zh_CN",
	/**
	 * 初始化
	 */
	init:Init['response'],
	/**
	 * 消息通知开关
	 */
	msg:boolean,
	/**
	 * unit 货币符号 
	*/
	unit:string,
	/**
	 * moneyCode 货币类型
	*/
	moneyCode:string,
	/**
	 * 上次登录账号
	*/
	usernameLogin:string,
	/**
	 * 版本号
	 */
	version:string,
	/**埋点 */
	gtm:string,
	/**埋点 */
	kwaiq:string,
	/**搜索历史 */
	historySearch:Array
	/**是否弹通知 */
	noticePopup: noticePopupModel,
}

interface noticePopupModel {
	expires: number,
}

interface UserModel {
    [key:string]:any,
	id?:number,
	recommender_id?:number,
	invite_code?:string,
	username?:string,
	money?:string,
	/**
	 * 头像
	 */
	portrait?:string,
	current_level_bet?:string,
	user_group_id?:number,
	bet_money?:string,
	need_bet_money?:string,
	user_nick?:string,
	email?:string,
	mobile?:string,
	qq?:string,
	weixin?:string,
	level?:number,
	skype?:string,
	telegram?:string,
	whatsapp?:string,
	reg_time?:string,
	reg_ip?:string,
	reg_source?:string,
	login_time?:string,
	login_ip?:string,
	login_count?:number,
	remark?:string,
	login_error_count?:number,
	login_error_time?:number,
	is_online?:number,
	login_limit?:number,
	online_client?:string,
	strong_box_amount?:string,
	strong_box_status?:number,
	status?:number,
	box_pwd?:number,
	box_status?:number,
	site_user_group?:Array<{
		id:number,
		name:string,
		level:number,
		level_condition:number,
	}>
}

type ListenerType = "set" | "delete";

type Listener<K extends keyof DBModels> = (t:ListenerType,v?:DBModels[K]) => void;

type DBData = {
	[K in keyof DBModels]: Array<Listener<K>>;
};