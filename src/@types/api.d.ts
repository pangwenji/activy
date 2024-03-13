type CustomizeType<T> = CustomizeType<T>;

/**
 * 登录
 */
interface Login extends Api {
	request: {
		/**
		 * 用户名  
		 */
		username: string;
		/**
		 * 密码    
		 */
		password: string;
		/**
		 * 验证码    
		 */
		code: string;
		/**
		 * 来源 [APP|WAP|WEB]     
		 */
		source: 'APP' | 'WAP' | 'WEB';
		code_value: string;
	};
	response: {
		token: string
	}
}

/**
 * 登录
 */
interface Game {
	id: number;
	game_platform_id: number;
	game_company_id: number;
	name: string;
	image: string;
	game_type: number;
	cate?: string;
	sort: number;
	status: number;
	is_new: number;
	is_hot: number;
	is_recommend: number;
	system_status: number;
	support_devices: string;
	config?: string;
	is_collect?: number;

	/**
	 * 游戏平台code
	*/
	game_company_code: string;
	/**
	 * 游戏平台名字
	*/
	game_platform_name: string;
	/**
	 * url
	*/
	url: string;
}
/**
 * 大厅初始化数据
 */
interface Init extends Api {
	response: {
		config: {
			email_register: string;
			invite_register: string;
			kf_email: string;
			login_verification_code: string;
			mobile_register: string;
			web_site_notice: string;
			withdraw_fee_proportion:string;
			site_hz_telegram:string;
		};
		language: Array<{
			code: string;
			decimal: number;
			id: number;
			lang: DBModels['language'];
			remark: string;
			unit: string;
			icon: string;
			lang_icon: string;
		}>;
	}
}

/**
 *弹窗公告
 */
interface GetPopupNotice extends Api {
	// response: Array<{
	// 	content: string;
	// 	create_time: string;
	// 	id: number;
	// 	image: string;
	// 	link: string;
	// 	title: string;
	// 	is_show: boolean;
	// }>
	response:{
		id: number;
		title: string;
		link: {
			pathType: number;
			pathValue: string;
		};
		link_title: string;
		img_link: {
			/*pathType值分为 1=外部链接 2内部路由 3跳转游戏 */
			pathType: number;
			pathValue: string;
		},
		create_time: string;
		image: string;
		content: string;
		is_show: boolean
	}
}

/**
 *登出
 */
interface Logout extends Api {
	header: {
		/**
		 * ss 
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 *刷新token
 */
interface Logout extends Api {
	header: {
		/**
		 * ss 
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 注册用户
 */
interface Register extends Api {
	request: {
		username: string;
		password: string;
		phone_number: string;
		invite_code?: string;
		code: string;
		app_version?: string;
		code_value: string,
		visit_link?: string;
		source: 'APP' | 'WAP' | 'WEB';
	},
	response: {
		token: string
	}
}

/**
 * 手机注册
*/
interface RegisterMobile extends Api {
	request: {
		phone_number: string;
		password: string;
		invite_code?: string;
		code: string;
		app_version?: string;
		code_value: string,
		visit_link?: string;
		source: 'APP' | 'WAP' | 'WEB';
		area_code: string;
	},
	response: {
		token: string
	}
}

/**
 * 邮箱注册
*/
interface RegisterEmail extends Api {
	request: {
		email: string;
		password: string;
		invite_code?: string;
		code: string;
		app_version?: string;
		code_value: string,
		visit_link?: string;
		source: 'APP' | 'WAP' | 'WEB';
	},
	response: {
		token: string
	}
}

/**
 * 合作伙伴
 */
interface Partners extends Api {
	response: {
		site_hz_wx: string,
		site_hz_qq: string,
		site_hz_telegram: string,
		site_hz_skype: string,
		site_hz_email: string,
		site_hz_tel: string
	}
}

/**
 * 客服
 */
interface Customer extends Api {
	response: {
		site_agent_qq: string;
		site_agent_qq_url: string;
		site_agent_wx: string;
		site_agent_wx_url: string;
		site_email: string;
		site_email_url: string;
		site_qq: string;
		site_qq_url: string;
		site_skype: string;
		site_skype_url: string;
		site_tel: string;
		site_tel_url: string;
		site_telegram: string;
		site_telegram_url: string;
		site_whatsapp: string;
		site_whatsapp_url: string;
		site_wx: string;
		site_wx_url: string;
	}
}

/**
 * 获取用户信息
 */
interface GetInfo extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},

	response: UserModel
}

/**
 * 获取OSS信息
 */
interface UploadOSS extends Api {
	request: {
		/**
		 * 文件类型 
		*/
		type: string;
	}
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		action: string;
		name?: string;
		path?: string;
		url?: string;
		args?: any;
	}
}

/**
 * 发送短信验证码/api/public/sendSms S
 */
interface SendSms extends Api {
	request: {
		/**
		 * 客户端验证码标识 
		 */
		code_value: string;
		/**
		 * 发送手机号
		 */
		phone_number: string;
		/**
		 * 区号
		*/
		area_code: string;
	}
}

/**
 * 发送邮箱验证码
 */
interface SendEmailCode extends Api {
	request: {
		/**
		 * 客户端验证码标识 
		 */
		code_value: string;
		/**
		 * 发送邮箱
		 */
		email: string;
	}
}

interface GetCountryList extends Api {

	response: [
		{
			countryCode: string;
		}
	]
}

/**
 *验证保险箱是否设置密码是否禁用
 */
interface IsBoxAccessPassword extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		box_status: number;
		box_pwd: number;
	}
}

/**
 * 余额 
 */
interface GetUserMoney extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		box_status: number;
		box_pwd: number;
	}
}

/**
 *设置保险箱密码
 */
interface SetBoxPassword extends Api {
	request: {
		password: String;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 *修改保险箱密码
 */
interface EditBoxAccessPassword extends Api {
	request: {
		oldPassword: String;
		newPassword: String;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 *验证保险箱密码
 */
interface CheckBoxPassword extends Api {
	request: {
		password: String;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 *存取保险箱余额1-存款 2-取款
 */
interface BoxAccess extends Api {
	request: {
		type: Number;
		money: String;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 *存取记录 1-存款 2-取款
 */
interface BoxAccessList extends Api {
	request: {
		type: "1" | "2" | "";
		page: Number;
		limit: Number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		totalCount: number;
		list: Array<{
			create_time: string;
			money: string;
			residue_money: string;
		}>
	}
}

interface GetGameTypeListItem {
	name: string,
	id: number,
	icon: string,
	icon_click: string
}
/**
 * 获取游戏分类
 */
interface GetGameTypeList extends Api {
	response: Array<GetGameTypeListItem>
}

interface GetCompanyListItem {
	name: string,
	id: number,
	code: string,
	image: string,
	icon: string
}

/**
 * 获取游戏厂商
 */
interface GetCompanyList extends Api {
	response: Array<GetCompanyListItem>
}

/**
 * 获取游戏厂商-分页
 */
interface GetCompanyListPage extends Api {
	response: {
		page: number;
		totalCount: number;
		list: Array<GetCompanyListItem>
	}
}

/**
 * 获取游戏列表
 */
interface GetGameList extends Api {
	request: {
		page: Number;
		limit: Number;
		name?: string;
		type?: Number;//	游戏类型ID
		is_hot?: Number;//是否热门：0=否，1=是
		is_new?: Number;//是否最新：0=否，1=是
		is_recommend?: Number;//是否推荐：0=否，1=是
		game_company_code?: string;
		game_platform_id?: number;
		is_mobile: number;
		/**
		 * 厂商id
		*/
		code?: string;
	},
	header?: {
		/**
		 * token
		 */
		"Authorization"?: CustomizeType<string>;
	};

	response: {
		list: Array<Games>;
		page: number;
		totalCount: number;
	}
}
/**
 *  游戏
 */
interface Games {
	/**
	 * 游戏id
	 */
	id: number;
	/**
	 * 是否收藏
	 */
	is_collect: number;
	/**
	 * 游戏封面
	 */
	image: string;
	/**
	 * 游戏名称
	 */
	name: string;
	/**
	 * 游戏平台code
	*/
	game_company_code: string;
	/**
	 * 游戏平台名字
	*/
	game_platform_name: string;
	/**
	 * url
	*/
	url: string;
	/**
	 * 厂商图片
	*/
	game_company_image: string;
	/**
	 * 厂商名字
	*/
	game_company_name: string;
}
/**
 * 获取全部游戏列表
 */
interface GroupGameList extends Api {
	request: {
		limit: Number;
		hot_limit?: Number;
		is_mobile: 0 | 1;
	};
	header?: {
		"Authorization": CustomizeType<string>;
	};
	response: Array<{
		icon_click: string;
		icon: string;
		totalCount: any;
		id: number;
		list: Array<Games>
		name: string;
		total_count: number;
		game_platform_name:string;
		game_platform_id:number;
		game_platform_icon:string;
		game_platform_image:string;
	}>
}
/**
 * 获取分类全部游戏列表
 */
interface GetGameByCompanyGroup extends Api {
	request: {
		limit: Number;
		game_type: Number;
		is_mobile: Number;
	};
	header?: {
		"Authorization": CustomizeType<string>;
	};
	response: Array<{
		[x: string]: number;
		totalCount: any;
		game_platform_image: string;
		game_platform_name: any;
		[x: string]: any;
		id: number;
		list: Array<Games>
		name: string;
		total_count: number;
	}>
}

/**
 * 获取单个游戏信息
 */
interface GetGameData extends Api {
	request: {
		id: Number;
	};
	header?: {
		"Authorization": CustomizeType<string>;
	};
	response: Games
}

/**
 * 获取VIP活动规则
*/
interface GetActivityData extends Api {
	request: {
		type: "Task_Day" | "Task_sign_In";//	活动类型：Task_Day=每日任务,Task_sign_In=签到任务
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 获取vip活动和每日任务数据
*/
interface GetTaskAndGif extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 获取vip专属任务
*/
interface GetVipTask extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 领取vip晋级礼金
*/
interface ReceiveVipTask extends Api {
	request: {
		task_id: string
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 领取vip晋级礼金
*/
interface ReceiveGif extends Api {
	request: {
		task_id: number,
		receive_group_id: number
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 获取vip晋级礼金
*/
interface GetGiftTask extends Api {
	request: {
		group_id: number
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: Array<{
		money: number;
		title: string;
		desc: string;
		is_receive: number;
		task_id: number;
		is_receive: number;
		bet_money: number;
	}>
}
interface ReceiveTask extends Api {
	request: {
		activity_id: number,
		task_id: string,
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 获取VIP信息
*/
interface VipInfo extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		[x: string]: any;
		id: number;
		level: number;
		name: string;
		user: {
			is_max_level: number;
			level_up_advance: number;
			user_group: {
				name: string,
				level: number,
				level_condition: number
			},
			next_user_group: {
				name: string,
				level: number,
				level_condition: number
			},
			vip: VipLevelRules["response"]
		}
	}
}

/**
 * 获取VIP等级信息
*/
interface VipLevelRules extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Array<{
		id: number;
		level: number;
		name: string;
		level_condition: string;
		bet_rate: number;
		recharge_rate: number;
		level_up_gift: string;
		level_day_gift: string;
		level_week_gift: string;
		level_month_gift: string;
		level_year_gift: string;
	}>
}



/**
 * 获取会员最新下注和盈利数据
 */
interface BetRecord extends Api {
	request: {
		page: Number;
		limit: Number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 盈利排行榜
 */
interface GetTopUsers extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Array<{
		username: string;
		level: number;
		score: number;
		portrait: string;
	}>
}

/**
 * 推广排行榜
 */
interface GetAgentTopUsers extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Array<{
		username: string;
		level: number;
		score: number;
		portrait: string;
	}>
}

/**
 * 留言列表
 */
interface MessageList extends Api {
	request: {
		status: String;//状态筛选 0已提交   1已回复  为空返回全部
		page: Number;
		limit: Number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		totalCount: number;
		list: Array<{
			/**
			 * 内容
			*/
			message: string;
			/**
			 * 发送时间
			*/
			create_time: string;
			/**
			 * 名称
			*/
			username: string;
			/**
			 * 头像
			*/
			portrait: string;
			/**
			 * 消息类型 1-用户 2-客服
			*/
			data_status: number;
		}>
	}
}

/**
 * 留言
 */
interface Message extends Api {
	request: {
		send_content: String;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}


/**
 * 删除留言
 */
interface DelMessage extends Api {
	request: {
		id: Number;//留言列表id
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 收藏游戏
 */
interface CollectGame extends Api {
	request: {
		gid: Number;//游戏id
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 收藏列表
 */
interface GameList extends Api {
	request: {
		page: Number;
		limit: Number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		totalCount: number;
		list: Array<{
			gameData: Game;
			is_collect: number;
			gid: number;
		}>
	}
}

/**
 * 取消收藏
 */
interface DelGame extends Api {
	request: {
		game_id: number;//收藏游戏的列表id
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 获取页面数据对应的数量
 */
interface GetUserPageCount extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		/**
		 * 游戏收藏数量
		 */
		game_collect_count: number;
		/**
		 * 游戏历史数量  
		 */
		game_record_count: number;
	}
}

/**
 * 登录游戏
 */
interface GameLogin extends Api {
	request: {
		game_id: Number;//游戏id
		game_company_code: string;//游戏id
		home_url: string,
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Games
}

/**
 * 登出游戏
 */
interface GameLoginOut extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 足迹
 */
interface AddRecordGame extends Api {
	request: {
		gid: number;//游戏的id
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 足迹列表
 */
interface RecordGameList extends Api {
	request: {
		page: Number;
		limit: Number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 我的推广
 */
interface UserTeam extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		/**
		 * 推荐码
		*/
		inviteCode: string;
		/**
		 * 分享下载链接地址
		*/
		domain: Array<{
			url: string;
		}>;
		/**
		 * 分享页背景图
		 */
		image: Array<string>;
		/**
		 * 可领取和已领取佣金数据 
		*/
		commission: {
			/**
			 * 可领取佣金
			*/
			receive_commission: number;
			/**
			 * 已领取佣金
			*/
			has_receive_commission: number;
		};
		/**
		 * 代理团队数据（总计）
		*/
		agent_sub_data: {
			/**
			 * 用户ID
			*/
			user_id: number;
			/**
			 * 团队注册人数  
			*/
			team_reg_num: number;
			/**
			 * 新玩家数
			*/
			new_reg_num: number;
			/**
			 * 总佣金
			*/
			team_commission: number;
			/**
			 * 游戏投注量
			*/
			team_bet_money: number;
		};
		agent_sub_data_today: {
			/**
			* 用户ID
			*/
			user_id: number;
			/**
			 * 团队注册人数  
			*/
			team_reg_num: number;
			/**
			 * 新玩家数
			*/
			new_reg_num: number;
			/**
			 * 总佣金
			*/
			team_commission_money: number;
			/**
			 * 游戏投注量
			*/
			team_bet_money: number;
		};

		/**
		 * 卡片展示位置的代理数据
		*/
		agent_show_data: {
			/**
			 * 本月团队返佣  
			 */
			team_commission_month: number;
			/**
			 * 本月我的返佣  
			 */
			my_commission_month: number;
			/**
			 * 新玩家数
			*/
			max_agent_bonus: {
				/**
				 * 奖励类型
				 */
				bonus_type: string;
				/**
				 * 最高比例或最高奖励  
				*/
				bonus: number;
			};
			/**
			 * 每月最高返佣  
			*/
			max_commission_month: number;
		};
	}
}

/**
 * 领取佣金
 * */
interface DrawCommission extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 佣金领取记录
 * */
interface GetCommissionLog extends Api {
	request: {
		/**
		 * 日期条件  today今天, yesterday昨天, month本月, last_month上月 不传默认全部  
		*/
		time_range: "yesterday" | "today" | "month" | "last_month";
		page: Number;
		limit: Number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: {
		totalCount: number;
		list: Array<{
			/**
			 * 返佣时间 
			*/
			create_time: string;
			/**
			 * 返佣金额
			*/
			team_commission: number;
			/**
			 * 有效投注
			*/
			team_bet: number;
			/**
			 * 返佣计算类型
			*/
			compute_type: number;
			/**
			 * 返佣计算比例
			*/
			compute_rate: number;
		}>
	}
}

/**
 * 佣金领取记录
 * */
interface AgentLevel extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: {
		/**
		 * 返佣计算类型 
		*/
		rules_type: string;
		rules: Array<{
			/**
			 * 代理等级   
			*/
			level: number;
			/**
			 * 有效投注金  
			*/
			bet_money: number;
			/**
			 * 返佣金额  
			*/
			bonus: number;
			/**
			 * 返佣比例  
			*/
			rate: number;
		}>
	}
}

/**
 * 获取推广规则数据
 * */
interface GetAgentRule extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: {
		/**
		 * 每日最大返佣  
		*/
		max_commission_day: string;
	}
}

/**
 * 团队返佣报表
*/
interface GetTeamCommissionLog extends Api {
	request: {
		/**
		 * 日期条件  today今天, yesterday昨天, month本月, last_month上月 不传默认全部
		*/
		time_range?: "yesterday" | "today" | "month" | "last_month";
		/**
		 * 查询账号或者账号ID  
		*/
		user?: string;
		page: number;
		limit: number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: {
		totalCount: number;
		list: Array<{
			/**
			 * 返佣时间  
			 */
			create_time: string;
			/**
			 * 用户名
			 */
			user_name: string;
			/**
			 * 有效投注 
			 */
			self_bet: number;
			/**
			 * 总返佣 
			 */
			team_commission: number;
		}>
	}
}


/**
 *  推广-提取记录
*/
interface GetReceiveCommissionLog extends Api {
	request: {
		/**
		 * 日期条件  today今天, yesterday昨天, month本月, last_month上月 不传默认全部  
		*/
		time_range?: "yesterday" | "today" | "month" | "last_month";
		page: Number;
		limit: Number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: {
		totalCount: number;
		list: Array<{
			/**
			 * 领取时间
			*/
			create_time: string;
			/**
			 * 领取金额
			 */
			amount: string;
			/**
			 * 钱包余额
			*/
			after_money: number;
		}>
	}
}

/**
 * 业绩查询 	日期条件  [yesterday|昨天, week|本周, last_week|上周, month|本月, last_month|上月]  
 */
interface GetPerformance extends Api {
	request: {
		dateType: "yesterday" | "week" | "last_week" | "month" | "last_month" | "today"
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Array<{
		name: string;
		totalCommission: string;
		selfCommission: string;
		selfPerformance: string;
		subPerformance: string;
	}>
}

/**
 * 返佣规则 
 */
interface CommissionRate extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		rules: {
			[k: string]: Array<{
				min_amount: string;
				team1_commission: string;
				team2_commission: string;
				team3_commission: string;
			}>
		}
	}

}

/**
*搜索玩家
*/
interface FindUserMess extends Api {
	request: {
		username?: string;
		user_id?: number;
		dateType: "today" | "yesterday" | "month" | "last_moon" | "";
		page: number,
		limit: number
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	};
	response: {
		totalCount: number;
		list: Array<{
			user_id: number;
			proffer_parent_id: number;
			total_performance: string;
			create_time: string;
			amount: string;
			game_type_name: string;
		}>
	}
}

/**
*玩家查询-团队级别佣金
*/
interface GetTeamCommission extends Api {
	request: {
		dateType: "today" | "yesterday" | "month" | "last_moon"
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Array[{
		level1_game_bet_total: string;
		level2_game_bet_total: string;
		level3_game_bet_total: string;
		level1_team_commission_total: string;
		level2_team_commission_total: string;
		level3_team_commission_total: string;
	}]
}
interface Banner {
	image: string;
	id: number;
	link: string;
	small_image: string;
	/**
	 * 1:asdasd 2:asd 3:游戏链接
	 */
	link_type: 1 | 2 | 3,
	param?:AnyObject
}
/**
 * 轮播图 轮播图位置:1=主页轮播，2=主页推广，3=主页推广2，4=主页推广3，5=主页推广4,6=推广系统banner，7=vipbanner,8=个人banner,9=洗码banner,10=赌场banner
 */
interface GetBanner extends Api {
	request: {
		position: 'home_banner' | 'promotion_banner' | 'vip_banner' | 'person_banner' | 'rabate_banner' | 'casino_banner'
	};
	response: Array<Banner>
}

/**
 * 签到配置
 */
interface SignConfig extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: {
		config: Array<{

		}>;
		data: {
			count: number;
			is_sign_today: number;
			total_money: string;
			sign_day: number;
		}
	}

}

/**
 * 签到
 */
interface SignIn extends Api {
	request: {
		/**
		 * 签到天数
		*/
		sign_day?: number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 签到记录
 */
interface SignList extends Api {
	request: {
		page: number;
		limit: number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		totalCount: number,
		list: Array<{
			sign_at: string;
			lottery_draw_money: string;
			balance: string;
		}>,
	}

}

/**
 * 抽奖
 */
interface Draw extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		id: number;
		reward_money: string;
	}
}

/**
 * 抽奖
 */
interface GetSignTotal extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		total_money: String,
		count: Number,
		is_sign_today: Boolean
	}
}

/**
 * getGameDataStatistics
 */
interface GetGameDataStatistics extends Api {
	request: {
		time_range: "0" | "yesterday" | "today" | "last_week" | "week" | "month" | "last_month"//查询时间区间：yesterday=昨日，today=今日，last_week=上周，week=本周，month=本月，last_month=上月
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: {
		game_details: Array<{
			game_type_name: string;
			count: number;
			total_bet: number;
		}>
	}
}

/**
 * 获取最近30天统计数据
*/
interface GetGameDataByType extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: Array<{
		/**
		 * 日期    
		*/
		date: number;
		/**
		 * 用户id    
		*/
		user_id: number;
		/**
		 * 游戏类型    
		*/
		game_type: number;
		/**
		 * 获胜的金额   
		*/
		win_money: number;
		/**
		 * 输掉的金额  
		*/
		loss_money: number;
		/**
		 * 利润
		 */
		profit_money: number
	}>
}

/**
 * 自动洗码
 */
interface GetAutoRecord extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Array<{
		game_type: number;
		rate: number;
		status: number;
		total_bet: String;
		total_money: String
		game_type_name: String;
		game_platform_name: string;
	}>
}

/**
 * 洗码记录
 */
interface GetRecord extends Api {
	request: {
		time_range: "yesterday" | "today" | "last_week" | "week" | "month" | "last_month";
		page: number;
		limit: number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		totalCount: number;
		list: Array<{
			show_receive_time: string;
			game_type_name: string;
			total_bet: number;
			total_money: string;
			game_type: number;
			receive_time: string;
			create_time: string;
			game_platform_name: string;
			game_platform_id: number;
			receive_day: number
		}>
	}
}

/**
 * 洗码记录详情
 */
interface GetRecordDetail extends Api {
	request: {
		page: Number;
		limit: Number;
		game_platform_id: Number;
		receive_day: Number;
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		totalCount: number;
		list: Array<{
			game_name: string;
			bet: string;
			rate: number;
			money: string;
		}>
	}
}

/**
* 洗码比例
*/
interface GetRatio extends Api {
	request: {
		page: number,
		limit: number,
		game_type: Number
	},
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		totalCount: number;
		list: Array<{
			name: string;
			rate: number;
		}>
	}
}

/**
* 洗码比例
*/
interface GetRecentMonthRebateMoney extends Api {
	header: {
		/**
		 * token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Array<{
		create_time: string;
		total_money: number;
	}>
}

/**
 * 获取洗码总金额
 */
interface GetTotalMoney extends Api {
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		total_money: string;
		toady_money:string;
	}
}

/**
 * 洗码一键领取
 */
interface Receive extends Api {
	request: {
		time_range: "yesterday" | "today" | "last_week" | "week" | "month" | "last_month"
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		is_receive: Boolean
	}
}

interface TaskActivity {
	/**
	 * 活动id  
	*/
	activity_id: number;
	/**
	 * 任务id  
	*/
	task_id: string;
	/**
	 * 开启活动的游戏类型（为空表示所有类型都开启）   
	*/
	game_ids: Array<{}>;
	/**
	 * 开启活动的游戏类型（为空表示所有类型都开启）   
	*/
	game_platforms: Array<{}>;
	/**
	 * 开启活动的游戏类型（为空表示所有类型都开启）   
	*/
	game_types: Array<{}>;
	/**
	 * 活动开始时间
	*/
	begin_time: string;
	/**
	 * 活动结束时间
	*/
	end_time: string;
	start_time:number;
	/**
	 * 活动标题 
	*/
	title: string;
	/**
	 * 活动奖励
	*/
	bonus: string;
	/**
	 * 活动进度  
	*/
	advance: string;
	/**
	 * 活动任务金额  
	*/
	task_money: string;
	/**
	 * 领取状态 0不可领取 1可领取 2已领取  
	*/
	is_receive: number;
	/**
	 * 奖金类型(0=所有奖金Task=任务奖金FirstDeposit=首存奖金 GiveBack=回馈奖金Vip_Gift=贵宾奖金Invite=邀请奖金)  
	*/
	type: string;
	
	show_end_time:string;

	payTimeEnd: number;
	payTimeEndName: string;
	complete_money: string;
	task_type: string;
	show_type_name: string;
	activity_name: string;
	conditions: string;
	activity_type: string;
	reward_money: string;
	activity_title: string;
	rate: number;
	can_turn_num: number;
	money: number;
	desc: string;
	total_sign_count: number;
	week_task_count: number;
	day_task_count: number;
	give_back_count: number;
	is_sign_today: 0 | 1,
	start_apply_time: number;
	end_apply_time: number;
}


/**
 * 获取活动中心列表
 * */
interface GetTaskDetails extends Api {
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		total_activity_bonus: string,
		activity_list: Array<{

			is_receive: number,
			/**
			 * 任务需要完成的金额
			 */
			task_money: string,
			/**
			 * 当前完成金额
			 */
			complete_money: string,
			bonus: string,
			game_ids: Array<number>,
			game_platforms: Array<number>,
			game_types: number,
			show_type_name: string,
			begin_time: number,
			end_time: number,
			activity_id: number,
			task_id: string,
			activity_type: string,
			activity_name: string,
			title: string,
			desc: string
		}>
	}
}

/**
 * 获取活动中心列表
 * */
interface GetActivityList extends Api {
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		/**
		 * 用户领取奖金总额  
		*/
		total_activity_bonus: string;
		/**
		 * 贵宾奖金总额   
		*/
		total_gif: number;
		/**
		 * 任务奖金总额  
		*/
		total_task_bonus: string;
		/**
		 * 一般奖金总额  
		*/
		total_common_bonus: string;
		/**
		 * 特别活动奖金
		 */
		total_special_bonus: string;
		/**
		 *任务奖励 
		*/
		special_activity: Array<TaskActivity>;
		/**
		 *一般奖励
		*/
		common_activity_list: Array<TaskActivity>;
		vip_activity_list: GetGiftTask['response'];
	}
}

/**
 * 获取活动任务
 * */
interface GetTaskList extends Api {
	request: {
		game_type: Number
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 获取活动任务
 * */
interface GetActivityData2 extends Api {
	request: {
		type: "Task_Day" | "Task";
		game_type: Number
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 活动领取
 */
interface ActivityReceive extends Api {
	request: {
		activity_id: number;
		task_id: number;
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 * 获取领取的活动总金额
 */
interface GetReceiveTotal extends Api {
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		total_money: number
	}
}

/**
 * 获取领取的活动总金额
 */
interface ActivityReceiveRecord extends Api {
	request: {
		page: Number;
		limit: Number;
		type: PageData['/activity-record']['code'];
		status?:Number;
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		list: Array<{
			id: number;
			user_id: number;
			status: number;
			receive_at: string;
			money: number;
			type: string;
			activity_id: number;
			task_index: number;
			receive_way: number;
		}>;
		totalCount: number;
		page: number;
	}
}


/**
 *更改头像和昵称 
 */
interface UpdateUserInfo extends Api {
	request: {
		portrait_index: number;
		user_nick: string;
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 *修改密码
 */
interface ModifyPassword extends Api {
	request: {
		old_password: string;
		password: string;
		code: string;
		code_value: string;
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 *用户资金明细
 */
interface GetUserMoneyDetails extends Api {
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		total_recharge: string;
		total_withdraw: string;
		total_rebate: string;
		agent_commiss_total: string;
		total_gif: string;
		total_bonus: string;
		has_receive_commission: string;
	}
}

/**
 *获取资金明细筛选交易类型
 */
interface GetUserMoneyDetailsType extends Api {
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	}
	response: {
		[key: string]: {
			desc: string;
			type: string;
		}
	}
}

/**
 *获取资金明细筛选交易类型
 */
interface GetUserMoneyDetailsSearch extends Api {
	request: {
		dateType: "yesterday" | "week" | "last_week" | "month" | "last_month" | "today";
		type: string;
		page: number;
		limit: number;
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		totalCount: number;
		list: Array<{
			create_time: string;
			desc: string;
			income_expenses: string;
			after_money: string;
		}>
	}
}

/**
 *修改联系方式 
 */
interface UpdateContact extends Api {
	request: {
		wechat?: string;
		qq?: string;
		email?: string;
		skype?: string;
		whatsapp?: string;
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	}
}

/**
 *修改联系方式 
 */
interface Help extends Api {
	request:PageData['/privacy-policy'],
	response: {
		content: string;
		title: string;
		intro: string;
	}
}

/**
 *系统通知 
 */
interface NoticeList extends Api {
	response: {
		totalCount: number;
		list: Array<{
			/**
			 * 链接标题
			*/
			link_title: string;
			/**
			 * link
			 */
			link: {
				pathType: number;
				pathValue: string;
			};
			/**
			 * 内容
			*/
			content: string;
			/**
			 * image背景图
			*/
			image: string;
			/**
			 * 发布时间
			*/
			create_time: string;
			/**
			 * 标题
			*/
			title: string;
			img_link: {
				pathType: number;
				pathValue: string;
			}
		}>
	}
}
interface WithdrawalConfigItme {
	/**
	 * 币种：1USDT 2法币  
	 */
	currency: 1 | 2;
	/**
	 * 类型|网络  
	 */
	type: string;
	/**
	 * 费率
	 */
	rate: number;
	/**
	 * 1 rate 比例
	 * 
	 * 2 fixed 固定手续费
	 */
	fee_type: 1 | 2;
	/**
	 * 手续费比例
	 */
	fee_amount: number;
	/**
	 * 最低提现金额
	 */
	min_money: number;
	/**
	 * 最高提现金额
	 */
	max_money: number;
	/**
	 * 洗码量不足是否允许提现
	 */
	is_withdraw: string;
}
/**
 * 获取提现配置信息
 */
interface WithdrawalConfig extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	request: {
		/**
		 * 提现货币
		 */
		currency_code?: string;
	};

	response: Array<WithdrawalConfigItme>
}


/**
 * 申请提现
 */
interface withdrawalApply extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: {
		/**
		 * 币种
		 */
		currency_code: string;
		/**
		 * 类型|网络  
		 */
		type: string;
		/**
		 * 提现金额
		 */
		money: string;
		/**
		 * 账户名称 
		 */
		account: 1 | 2;
		/**
		 * 卡号或USDT地址
		 */
		account_number: string;
		/**
		 * 实际转账金额
		 */
		real_money: string;
	};
}

/**
 * etReceiveRecord
 */
interface GetReceiveRecord extends Api {
	request: {
		page: number;
		limit: number;
	};
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: {
		totalCount: number;
		list: Array<{
			money: string;
			type: string;
			receive_at: string;
		}>
	}
}


interface RechargeListsItme {
	/**
	 * 支付id
	 */
	id: number;
	/**
	 * 支付类型：1.跳转 2.扫码 3.转账 4.虚拟币  
	 */
	pay_cate: 1 | 2 | 3 | 4;
	/**
	 * 最小存款  
	 */
	min_deposit: number;
	/**
	 * 最大存款  
	 */
	max_deposit: number;
	/**
	 * 额外配置（每种不同类型有不同的配置）,exchange_rates:虚拟币换算汇率(目前直接是固定为USDT 兑 BRL )  
	 */
	extras_config: AnyObject;
	/**
	 * 固定金额（有的话显示固定金额，为空则不显示）  
	 */
	fixed_amount: number;
	/**
	 * 是否可以自己输入金额 (1：开启；2：关闭)  
	 */
	self_define: 1 | 2;
	/**
	 * 展示名称  
	 */
	show_name: string;
	show_icon: string;
	/**
	 * 模板名（备用）  
	 */
	template: string;
}
/**
 * 充值列表
 */
interface RechargeLists extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: Array<RechargeListsItme>;
}
/**
 * 充值下单
 */
interface RechargeSave extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	request: {
		/**
		 * 	支付id  
		 */
		channel_id: number;
		/**
		 * 	付金额/数量（pix支付表示金额，虚拟币表示充值数量）  
		 */
		money: string;
		/**
		 * 支付单号 （前端生成订单号，防止重复提交，导致生成多笔单子 生成规则：R（字母R:表示充值） + 年月日时分秒(20230819120000) + 6位随机数(000000)）  
		 */
		sn: string;
		/**
		 * 额外参数 (每个支付有不同的参数，额外的参数就放到这 暂时备用)  
		 */
		extras_data?: string;
	};
	response: {
		/**
		 * 付款类型(1.表示跳转或iframe地址，目前只有这一种类型)  
		 */
		pay_type: 1;
		/**
		 * 跳转到指定地址 
		 */
		url: string;
	};
}
/**
 * 获取默认头像
 */
interface GetDefaultAvatar extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: Array<{
		index: number;
		url: string;
	}>;
}

interface GetAppLeastVersion extends Api {
	response: {
		android: {
			url: string
		};
		ios: {
			url: string
		}
	};
}


interface CurrencyList extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: Array<{
		currency_code: string;
		show_icon: string;
	}>;
}

interface Statistics extends Api {
	request: {
		version: string,
		app_url: string,
		source: string,
		download_url: string
	};
}

interface taskData {
	/**
	 * 	活动id 
	 */
	activity_id: number;
	/**
	 * 	任务id  
	 */
	task_id: number;
	/**
	 * 	推荐人数   
	 */
	peopleNum: number;
	/**
	 * 	已推荐且任务完成人数  
	 */
	reachNum: number;
	/**
	 * 	奖励金额  
	 */
	bonus: string;
	/**
	 *  下注金额  
	 */
	task_money: string;
	/**
	 * 	领取状态 0不可领取 1可领取 2已领取  
	 */
	is_receive: number;
	/**
	 * 类型
	*/
	conditions: string;
	/**
	 * 介绍
	*/
	desc: string;
}

/**
 * 获取邀请活动列表
*/
interface GetInviteActivity extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: {
		/**
		 * 活动id
		*/
		activity_id: number;
		/**
		 * 	获得的总奖励   
		 */
		receiveMoney: string;
		/**
		 * 	好友总数 
		 */
		recommendNum: number;
		/**
		 * 	可获得奖励  
		 */
		totalBonus: string;
		/**
		 *  推广链接 
		 */
		inviteLink: Array<any>;
		/**
		 *  邀请码 
		 */
		inviteCode: string;
		/**
		 * 结束时间
		*/
		end_time: number;
		/**
		 * 	邀请任务列表  
		 */
		taskData: Array<taskData>;
	}
}

/**
 * 获取邀请活动列表
*/
interface GetInviteActivity extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: {
		/**
		 * 	获得的总奖励   
		 */
		receiveMoney: string;
		/**
		 * 	好友总数 
		 */
		recommendNum: number;
		/**
		 * 	可获得奖励  
		 */
		totalBonus: string;
		/**
		 * 	邀请任务列表  
		 */
		taskData: Array<taskData>;
	}
}

/**
 * 获取活动奖励类型
 */
interface GetActRecordTypes extends Api {
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: Array<{
		type: string;
		title: string;
	}>
}

/**
 * 获取领取的活动总金额
 */
interface ActivityReceiveRecord extends Api {
	request: {
		page: Number;
		limit: Number;
		type: string;
	},
	header: {
		/**
		* token
		 */
		"Authorization": CustomizeType<string>;
	},
	response: {
		list: Array<{
			id: number;
			user_id: number;
			status: number;
			receive_at: string;
			money: number;
			type: string;
			activity_id: number;
			task_index: number;
			receive_way: number;
		}>;
		totalCount: number;
		page: number;
	}
}

/**
 * 获取每日，每周，回馈奖励详情
 */
interface GetActivityDetail extends Api {
	request: {
		activity_id: number;
		task_id: string;
	};
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: {
		name: string;
		type_id: number;
		platform_data: Array<{
			name: string;
			platform_id: number;
			game_data: Array<{
				name: string;
				game_id: number;
				game_company_code: string;
			}>
		}>
	}
}

interface GetMoneyIsLikeRainDetails extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response: {
		activity_id: number,
		activity_type: string,
		activity_title: string,
		"activity_name": string,
		"extra_date": Array<number>,
		"extra_week": Array<number>,
		"begin_time": string,
		"today_times": Array<Array<string>>,
		"extra_times": Array<Array<string>>,
		"next_times": Array<string>,
		"next_start_time": number,
		"user_reward_money": string,
		"user_max_money": string
	}
}

interface GetTurntableDetails extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:{
        "activity_id": number,
        "activity_title": string,
        "activity_name": string,
        "start_time": number,
        "end_time": number,
        "status": number,
        "can_turn_num": number,
        "reward_money": number,
        "record_money":number,
        "record_id": number,
        "win_user": Array<{
			"username": string,
			"money": number,
			"receive_at": number
		}>,
        "invitation": Array<{
			"username": string,
			"is_register": number,
			"is_complete": number
		}>,
        "config":Array<TurntableConfig>
    }
}


interface DrawTurnTable extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:{
        "money": number,
        "task_id": number,
        "can_turn_num": number,
        "status": number,
        "record_id": number,
    }
}



interface TurntableConfig {
	/** 任务id  */
	task_id:number;
	/** 转盘类型 1=谢谢 2=去除 3=随机金额 4=固定金额    */
	type:1 | 2 | 3 | 4;
	/**转盘标题   */
	title:string;
}

interface GetLossActivityDetails extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:{
        "activity_id": number,
        "activity_type": string,
        "activity_title": string,
        "activity_name": string,
        "begin_time": string,
        "end_time": string,
        "rule": {
            "list": Array<{
				"rate": number,
				"task_id": string,
				"bet_money": number,
				"vip_level": number
			}>,
            "applyDate": string,
            "max_money": string,
            "bet_double": number,
            "applyDate_start":string
        },
        "in_use_rate": number,
        "max_rate": {
            "rate": number,
            "task_id":string,
            "bet_money": number,
            "vip_level": number
        },
        "now_group_level":number,
        "next_group_level": number,
        "level_up_advance": number,
        "leave_advance": number,
		"level_condition": number,
        "cashback_amount": number,
        "is_max_level": number,
        "is_can_apply": number
    }
}

interface ReceiveTurntable extends Api {
	request: {
		record_id: number;
	};
	header: {
		"Authorization": CustomizeType<string>;
	};
}



interface GetShareInfo extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:{
        "invite_code": string;
        "domain":Array<{
			"url": string
		}>;
        "mobile_list":Array<{
			"id":number;
			"mobile": string;
			"area_code":string;
		}>;
        "sms_template": string;
    }
}

interface CheckWhetherRainOfMoney extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:{
        rain_count:number,
        user_count:number,
		/**	下次开抢时间 大于0才是今日有效时间   */
		next_start_time:number;
		/**	状态 0正常下雨 1已抢完 2用户已抢金额达到限制 3用户已抢数量达到限制 4用户条件未达到 5不在可抢时间段内 6抢红包失败更新金额错误  */
        status:0 | 1 | 2 | 3 | 4 | 5 | 6,
    }
}

interface ReceiveRainOfMoney extends Api {
	request:{
		ids:Array<number>
	}
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:{
        money:string,
		/**	状态 0正常下雨 1已抢完 2用户已抢金额达到限制 3用户已抢数量达到限制 4用户条件未达到 5不在可抢时间段内 6抢红包失败更新金额错误  */
        status:0 | 1 | 2 | 3 | 4 | 5 | 6,
    }
}


interface GetRedMoneyData extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:Array<{
		id:number,
		money:string,
	}>
}
interface Bank{
	id?:number;
	/**	类型 */
	type:string;
	/**	账户名   */
	real_name:string;
	/**银行名称   */
	bank_name:string;
	/**银行卡代码   */
	bank_code:string;
	/**银行帐号   */
	bank_account:string;
	/**开户行   */
	bank_info:string;
	/**是否默认 0否 1是   */
	is_default:0 | 1;
	/**1正常2删除   */
	status:1 | 2;

}
interface Banks extends Api {
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:Array<Bank>
}
interface SaveBank extends Api {
	request:Bank;
	header: {
		"Authorization": CustomizeType<string>;
	};
	response:Bank
}
