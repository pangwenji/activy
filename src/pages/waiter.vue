<template>
  <page class="contents" :head-box="isPc ? ['content', 'right'] : undefined" :show-scrollbar="true" :mouse-wheel="true">
    <div class="page-k page-pading">
      <view v-if="init.customer && menu == 1">
        <view class="url-copy-team" v-if="init.customer.site_wx">
          <view class="url-copy-team-name">
            <img src="@/assets/waiter/wode_wechat.png" mode="widthFix" alt="" />
            weChat
          </view>
          <view class="url-copy-team-view">
            {{ init.customer.site_wx }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.customer.site_wx_url)" />
          </view>
        </view>

        <view class="url-copy-team" v-if="init.customer.site_qq">
          <view class="url-copy-team-name">
            <img src="@/assets/waiter/wode_qq.png" mode="widthFix" alt="" />
            QQ
          </view>
          <view class="url-copy-team-view">
            {{ init.customer.site_qq }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.customer.site_qq_url)" />
          </view>
        </view>

        <view class="url-copy-team" v-if="init.customer.site_email">
          <view class="url-copy-team-name">
            <img src="@/assets/new/kf/mi_email.png" mode="widthFix" alt="" />
            Email
          </view>
          <view class="url-copy-team-view">
            {{ init.customer.site_email }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.customer.site_email_url)" />
          </view>
        </view>

        <view class="url-copy-team" v-if="init.customer.site_skype">
          <view class="url-copy-team-name">
            <img src="@/assets/new/kf/ri_skype-line.png" mode="widthFix" alt="" />
            Skype
          </view>
          <view class="url-copy-team-view">
            {{ init.customer.site_skype }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.customer.site_skype_url)" />
          </view>
        </view>

        <view class="url-copy-team" v-if="init.customer.site_telegram">
          <view class="url-copy-team-name">
            <img src="@/assets/new/kf/ph_telegram-logo.png" mode="widthFix" alt="" />
            Telegram
          </view>
          <view class="url-copy-team-view">
            {{ init.customer.site_telegram }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.customer.site_telegram_url)" />
          </view>
        </view>

        <view class="url-copy-team" v-if="init.customer.site_whatsapp">
          <view class="url-copy-team-name">
            <img src="@/assets/new/kf/basil_whatsapp-outline.png" mode="widthFix" alt="" />
            Whatsapp
          </view>
          <view class="url-copy-team-view">
            {{ init.customer.site_whatsapp }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.customer.site_whatsapp_url)" />
          </view>
        </view>
      </view>

      <view v-if="init.partners && menu == 2">
        <view class="url-copy-team">
          <view class="url-copy-team-name">
            <img src="@/assets/waiter/wode_wechat.png" mode="widthFix" alt="" />
            weChat
          </view>
          <view class="url-copy-team-view">
            {{ init.partners.site_hz_wx }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.partners.site_hz_wx)" />
          </view>
        </view>

        <view class="url-copy-team">
          <view class="url-copy-team-name">
            <img src="@/assets/waiter/wode_qq.png" mode="widthFix" alt="" />
            QQ
          </view>
          <view class="url-copy-team-view">
            {{ init.partners.site_hz_qq }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.partners.site_hz_qq)" />
          </view>
        </view>

        <view class="url-copy-team">
          <view class="url-copy-team-name">
            <img src="@/assets/new/kf/ph_telegram-logo.png" mode="widthFix" alt="" />
            Telegram
          </view>
          <view class="url-copy-team-view">
            {{ init.partners.site_hz_telegram }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.partners.site_hz_telegram)" />
          </view>
        </view>

        <view class="url-copy-team">
          <view class="url-copy-team-name">
            <img src="@/assets/new/kf/ri_skype-line.png" mode="widthFix" alt="" />
            Skype
          </view>
          <view class="url-copy-team-view">
            {{ init.partners.site_hz_skype }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.partners.site_hz_skype)" />
          </view>
        </view>

        <view class="url-copy-team">
          <view class="url-copy-team-name">
            <img src="@/assets/new/kf/mi_email.png" mode="widthFix" alt="" />
            Email
          </view>
          <view class="url-copy-team-view">
            {{ init.partners.site_hz_email }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.partners.site_hz_email)" />
          </view>
        </view>

        <view class="url-copy-team">
          <view class="url-copy-team-name">
            <img src="@/assets/waiter/wode_wed.png" mode="widthFix" alt="" />
            Phone
          </view>
          <view class="url-copy-team-view">
            {{ init.partners.site_hz_tel }}
            <img src="@/assets/new/kf/Group.png" alt="" @click="openUrl(init.partners.site_hz_tel)" />
          </view>
        </view>
      </view>
    </div>
  </page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import { onMounted, reactive, ref } from 'vue'
import { isPc } from '../uilts/async.var'

let menu = ref(1)
const init = reactive<{
  customer: Customer['response']
  partners: Partners['response']
}>({
  partners: {
    site_hz_wx: 'string',
    site_hz_qq: 'string',
    site_hz_telegram: 'string',
    site_hz_skype: 'string',
    site_hz_email: 'string',
    site_hz_tel: 'string',
  },
  customer: {
    site_agent_qq: '',
    site_agent_qq_url: '',
    site_agent_wx: '',
    site_agent_wx_url: '',
    site_email: '',
    site_email_url: '',
    site_qq: '',
    site_qq_url: '',
    site_skype: '',
    site_skype_url: '',
    site_tel: '',
    site_tel_url: '',
    site_telegram: '',
    site_telegram_url: '',
    site_whatsapp: '',
    site_wx: '',
    site_wx_url: '',
    site_whatsapp_url: '',
  },
})

const openUrl = (url: string) => {
  window.open(url, '_blank')
}
const getCustomer = () => {
  '/api/public/customer'.GET<Customer>().then((ret) => {
    init.customer = ret
  })
}
const getPartners = () => {
  '/api/public/partners'.GET<Partners>().then((ret) => {
    init.partners = ret
  })
}

onMounted(() => {
  getPartners()
  getCustomer()
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
.contents {
  background-color: rgb(36, 38, 43);
}
.vip-menu {
  display: flex;
  justify-content: space-around;
  font-size: 0.7813rem;
  color: #9ba6b3;
  font-weight: bold;
  text-align: center;

  & > view {
    width: 50%;
    height: 1.9063rem;
    line-height: 1.9063rem;
    border-bottom: 0.0938rem solid #828282;
  }

  .vip-menu-sign {
    opacity: 1;
    background: linear-gradient(0deg, rgba(42, 224, 53, 0.3) 0%, rgba(42, 224, 53, 0) 100%);
    color: #ffffff;
    border-bottom: 0.0938rem solid #2ae035;
  }
}

.url-copy-team {
  padding-bottom: 0.9375rem;
  color: #8795b1;
  font-family: PingFang SC sans-serif;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  @include pc {
    margin: 0;
    padding-top: 0;
    padding-bottom: 23px;
    font-size: 24px;
  }

  .url-copy-team-name {
    padding: 0.0313rem;
    display: flex;
    align-items: center;
    @include pc {
      padding: 0;
      align-items: center;
    }

    img {
      display: block;
      width: 0.9375rem;
      height: 0.9375rem;
      margin-top: 0rem;
      margin-right: 0.4688rem;

      @include pc {
        width: 40px;
        height: 40px;
      }
    }
  }

  .url-copy-team-view {
    color: #fff;
    font-family: PingFang SC sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    line-height: normal;
    background: #202124;
    padding: 0 0.625rem;
    height: 2.625rem;
    font-weight: 500;
    margin-top: 0.4688rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include pc {
      font-size: 28px;
      color: #0ff;
      padding: 13px 20px;
      height: auto;
    }

    img {
      width: 1.875rem;
      height: 1.875rem;

      @include pc {
        width: 60px;
        height: 60px;
      }
    }

    cursor: pointer;
  }
}
</style>
