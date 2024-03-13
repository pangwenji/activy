<template>
  <div class="share">
    <div class="title">
      {{ t('pageAgent.f25') }}
    </div>
    <div class="share-list">
      <div class="item cursor" v-for="(item, index) in shareList" :key="index" @click="openUrl(item.url)">
        <img :src="item.img" alt="img" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="cursor" v-for="item in shareItems" @click="$copy(item.shareContent ?? '')">
      <div class="tip">
        {{ item.tip }}
      </div>
      <div class="input-copy-item">
        {{ item.shareContent }}
        <button class="btn">{{ t('pageAgent.f26') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, onActivated } from "vue";
import { t } from '@/uilts/i18n';
import Telegram from "@/assets/oauth/Telegram.png"
import Facebook from "@/assets/oauth/Facebook.png"
import WhatsApp from "@/assets/oauth/WhatsApp.png"
import Twiter from "@/assets/oauth/Twiter.png"
import Email from "@/assets/oauth/Email.png"
const emit = defineEmits(['openShare'])

interface ShareIcons {
  url: string,
  img: string,
  name: string,
}

const props = defineProps({
  userInfo: {
    default: {},
  },
})

const shareItems = ref([
  {
    shareContent: '\u00A0',
    tip: t('pageAgent.f27'),
  },
  {
    shareContent: '\u00A0',
    tip: t('pageAgent.f28'),
  },
]);

const shareList = ref<ShareIcons[]>([
  {
    name: "Facebook",
    img: Facebook,
    url: `https://www.facebook.com/sharer/sharer.php?u=`,
  },
  {
    name: "WhatsApp",
    img: WhatsApp,
    url: 'https://api.whatsapp.com/send?text=',
  }, {
    name: "Telegram",
    img: Telegram,
    url: `https://t.me/share/url?url=`,
  },
  {
    name: "Twiter",
    img: Twiter,
    url: `https://twitter.com/intent/tweet?text%20&url=`,
  }, {
    name: "Email",
    img: Email,
    url: '',
  }
])


watch(() => props.userInfo, (val) => {
  const shareUrl = val.domain[0].url + '?invite_code=' + val.inviteCode;
  shareItems.value[0].shareContent = shareUrl;
  shareItems.value[0].tip = t('pageAgent.f27');
  shareItems.value[1].shareContent = val.inviteCode;
  shareItems.value[1].tip = t('pageAgent.f28')
  shareList.value = [
    {
      name: "Facebook",
      img: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      name: "WhatsApp",
      img: WhatsApp,
      url: `whatsapp://send/?text=${shareUrl}`,
    }, {
      name: "Telegram",
      img: Telegram,
      url: `https://t.me/share/url?text=${shareUrl}`,
    },
    {
      name: "Twiter",
      img: Twiter,
      url: `https://twitter.com/intent/tweet?text=${shareUrl}`,
    }, {
      name: "Email",
      img: Email,
      url: `mailto:?subject=9F&body=${shareUrl}`
    }
  ]
})


</script>

<style lang="scss" scoped>
.share {
  padding: .625rem;
  background: #fff;
  font-size: 1rem;
  border-radius: .25rem;
  font-family: SWISSC;

  .title {
    font-size: .75rem;
    padding-top: 0.06rem;
    color: grey;
    font-family: SWISSC-BT;
  }

  .share-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin-bottom: .9375rem;


    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 2.75rem;
      margin-top: 1rem;

      p {
        font-size: .6rem;
        color: #383838;
        margin-top: .375rem;
      }
    }

    img {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  .tip {
    color: #383838;
    font-size: .6rem;
    margin-top: .5rem;
  }

  .input-copy-item {
    position: relative;
    height: 1.9375rem;
    border-radius: .25rem;
    font-size: .6rem;
    color: grey;
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.19rem;
    margin-top: .3125rem;
    padding: .3125rem;
    font-family: SWISSC;
    font-weight: 600;
  }

  .btn {
    width: 3rem;
    height: 1.875rem;
    background: none;
    border: none;
    color: #40a1de;
    font-family: SWISSC;
    font-size: .625rem;
    font-weight: 600;
  }
}
</style>