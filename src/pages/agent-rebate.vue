<template>
    <page :head-box="isPc ? ['content', 'right'] : undefined">
        <div class="page-k page-pading">
            <div class="money-card">
                <span>{{t("pageAgentR.t1")}}</span>
                <span>{{ unit }} {{ userTeam.commission.receive_commission }}</span>
            </div>
            <view class="input-team">
                <view class="input-name">
                    {{t("pageAgentR.t2")}}
                </view>
                <view class="input-view">
                    <div>{{ unit }}</div>
                    <input v-model="name" maxlength="8" class="textarea" placeholder-style="" :placeholder="t('pageAgentR.t3')" />
                </view>
                <div class="input-tips">{{t("pageAgentR.t4")}} <span>{{ unit }}10.00</span></div>
            </view>
            
            <div class="btn-k">
                <view @click="onSubmit" class="bootom-btn" :class="{
                    disabled:!name
                }">
                    <text v-show="!isSubmit">{{t("pageAgentR.t5")}}</text>
                    <public-loading v-show="isSubmit"></public-loading>
                </view>
            </div>
        </div>

    </page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import PublicLoading from '../components/public-loading.vue'
import { ref } from 'vue';
import { onLoad, onShow } from '../router/routes';
import { dbGet } from '../uilts/db';
import { hint } from '../uilts/ui';
import { isPc, restMoney, unit } from "../uilts/async.var";
import { t } from '../uilts/i18n';
import { agentInit } from '../uilts/emit';

const name = ref<number>()
const isSubmit = ref<boolean>(false)
const isApiOk = ref(true)
const userTeam = ref<UserTeam['response']>({
	/**
		 * 推荐码
		*/
	inviteCode: '',
	/**
	 * 分享下载链接地址
	*/
	domain: [],
	/**
	 * 分享页背景图
	 */
	image: [],
	/**
	 * 可领取和已领取佣金数据 
	*/
	commission: {
		/**
		 * 可领取佣金
		*/
		receive_commission: 0,
		/**
		 * 已领取佣金
		*/
		has_receive_commission: 0,
	},
	/**
	 * 代理团队数据（总计）
	*/
	agent_sub_data: {
		/**
		 * 用户ID
		*/
		user_id: 0,
		/**
		 * 团队注册人数  
		*/
		team_reg_num: 0,
		/**
		 * 新玩家数
		*/
		new_reg_num: 0,
		/**
		 * 总佣金
		*/
		team_commission: 0,
		/**
		 * 游戏投注量
		*/
		team_bet_money: 0,
	},
	agent_sub_data_today: {
		/**
		* 用户ID
		*/
		user_id: 0,
		/**
		 * 团队注册人数  
		*/
		team_reg_num: 0,
		/**
		 * 新玩家数
		*/
		new_reg_num: 0,
		/**
		 * 总佣金
		*/
		team_commission_money: 0,
		/**
		 * 游戏投注量
		*/
		team_bet_money: 0,
	},

	/**
	 * 卡片展示位置的代理数据
	*/
	agent_show_data: {
		/**
		 * 本月团队返佣  
		 */
		team_commission_month: 0,
		/**
		 * 本月我的返佣  
		 */
		my_commission_month: 0,
		/**
		 * 新玩家数
		*/
		max_agent_bonus: {
			/**
			 * 奖励类型 为rate时为百分百
			 */
			bonus_type: '',
			/**
			 * 最高比例或最高奖励  
			*/
			bonus: 0,
		},
		/**
		 * 每月最高返佣  
		*/
		max_commission_month: 0,
	}
})

const onSubmit = () => {
    if (isSubmit.value) return;

    isSubmit.value = true
    '/api/agent/drawCommission'.POST<DrawCommission>({
        money: name.value
    }, {
        Authorization: async () => await dbGet('token')
    }).then(_ret => {
        hint(t('pageAgentPromotion.success'))
        restMoney.value = !restMoney.value
        getUserTeam()
        agentInit();
    }).finally(() => {
        isSubmit.value = false;
    })
}

const getUserTeam = () => {
	'/api/agent/team'.GET<UserTeam>(null, {
		Authorization: async () => await dbGet('token')
	}).then(ret => {
		userTeam.value = ret

	}).finally(() => {
		isApiOk.value = false;
	})
}


onLoad(() => {
    getUserTeam()
})
onShow(()=>{
    getUserTeam()
})
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
.page-k{

}

.money-card {
    display: flex;
    padding: 0.7188rem 0.6250rem;
    justify-content: space-between;
    background: #494949;
    border-radius: 0.5000rem;
    @include pc{
        padding: 16px 20px;
    }
    span:nth-child(1) {
        color: #FFFFFF;
        font-family: PingFang SC;
        font-size: 0.8750rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        @include pc{
            font-size: 16px;
        }
    }

    span:nth-child(2) {
        color: #FFFFFF;
        font-family: PingFang SC;
        font-size: 0.8750rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        @include pc{
            font-size: 16px;
        }
    }
}

.hide {
    display: none;
}

.btn {
    @include button(#2AE035);
    height: 2.3750rem;
    margin-top: 0.6250rem;
}

.input-name {
    font-size: 0.9125rem;
    // color: var(--MENU, #8E90CD);
    color: #FFFFFF;
    @include pc{
        font-size: 18px;
    }
}

.top {
    margin: 0.9375rem auto 2.0938rem;
    text-align: center;
}

.scroll-view {
    // ::-webkit-scrollbar {width: 0;height: 0;background-color: transparent;} 
    white-space: nowrap;
    width: calc(100% - 1.8750rem);
    margin: 0 0.9375rem;
    height: 2.6250rem;
    line-height: 2.6250rem;
    border-radius: 0.1087rem;
    margin-top: 0.9375rem;

    .fund-details-meun-team {
        display: inline;
        font-size: 0.7819rem;
        color: #FFFFFF;
        padding: 0.3125rem;
        height: 2.6250rem;
    }

    .fund-details-meun-team-sign {
        background-color: #2D3034 !important;
    }

    .min-head {
        width: 2.5000rem;
        height: 2.5000rem;
        border-radius: 50%;
        margin-left: 0.3125rem;
    }

    .sign {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border: 0.1250rem solid #65be3d;
    }
}

.input-tips{
    text-align: right;
    padding: 0.3750rem 0;
    // color: #5B6DA1;
    color: #FFFFFF;
    font-size: 0.7500rem;
    font-weight: 300;
    span{
        color:#8E90CD;
    }
}

.input-team {

    color: #5B6DA1;
    padding-top: 0.9375rem;
    
    .input-view {
        margin-top: 0.8125rem;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #201E47;
        div{
            width: 1.0000rem;
            text-align: center;
            // height: 1.0000rem;
            color: #FFFFFF;
        }
        .textarea {

            width: calc(100% - 1.5625rem);
            height: 2.0000rem;
            line-height: 2.0000rem;
            // background-color: #323335;
            box-sizing: content-box;
            font-size: 0.75rem;
            padding: 0.4688rem;
        }
        .textarea::placeholder{
            color:#5B6DA1;
        }
    }
}

.bootom-y {
    margin-left: 1.2500rem;
    margin-right: 1.2500rem;
    height: 2.3438rem;
    border-radius: 0.1250rem;
    color: #FFF;
    margin-top: 2.4063rem;
    @include button-color(#2AE035);
}
.btn-k{
    padding-top: 2rem;
}

.bootom-btn{
    
	@extend %button;
    height: 3.125rem;
    &.disabled{
        @extend %button-disabled
    }
    // padding: 0.5rem 0;
    // border-radius: 0.5000rem;
    // color: #FFF;
    // opacity: 0.5;
    // text-align: center;
    // font-size: 0.8750rem;
    // font-style: normal;
    // font-weight: 400;
    // line-height: 38px;
    // background: linear-gradient(0deg, rgba(32, 30, 71, 0.72) 0%, rgba(32, 30, 71, 0.72) 100%), radial-gradient(50% 50% at 50% 0%, rgba(144, 255, 255, 0.50) 0%, rgba(144, 255, 255, 0.00) 100%), linear-gradient(180deg, #7368FF 0%, #5F6FFF 57.39%, #7084FF 100%);

    @include pc{
        font-size: 16px;
    }
}
</style>
