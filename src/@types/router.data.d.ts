
type recordCode = "Task" | "FirstDeposit" | "DayTask" | "WeekTask" | "GiveBack" | "Vip_Gift" | "Invite" | "";

interface PageData {
    "/activity-game":GetActivityDetail['request'];
    "/activity-record":{
        code?:recordCode | Array<recordCode>
    };
    "/customer-service":{
        url?:string;
        reg?:number;
        html?:string;
        id?:number;
    };
    "/game":{
		c?:number;
        game_company_code?:string;
		t?:number;
        n?:string;
	};
    "/game-open":{
        img:string;
        id:number;
        name:string;
        code:string;
    },
    "/coffer":{
        m?:number;
    }
    "/coffer-pass":{
        type?:number;
        money?:string;
    },
    '/washing-details':{
        id?:any;
        r?:any;
        c?:any;
    },
    "/agent-details":{
        id:number;
        date:string;
    },
    "/mission-center":{
        tabIndex?:"DayTask" | "WeekTask" | "GiveBack";
    }
    "/mission-details":{
        activity_id:number;
        task_id:string;
    },
    "/information-form":{
        /**
         * 修改的字段
         */
        type:string;
    },
    "/rule-description":{
        money:string
    },
    "/turntable":{
        title:string
    },
    "/turntable-alert":{
        title:string
    },
    "/throw-coins":{
        /**本次降雨红包总数 -1 无限  */
        rain_count: number;
        /**本次降雨用户可抢红包数 -1 无限   */
        user_count: number;
        end_time: number;
    },
    "/privacy-policy":{
        type: "sports_terms" | "privacy_policy" | "terms_of_service" | "faq" | "bonus_policy" | "registration_and_login" | "support" | "fees" | "coin_precision_limitations" | "responsible_gaming" 
    },
    "/add-bank-card":{
        bank?:Bank
    },
    "/help":{
        /**类型 */
        type?:string
    }
}

