<template>
  <page :head-box="isPc ? ['content', 'right'] : undefined" :mouse-wheel="true">
    <template #header-content>
      <div class="header-content-auto">
        <div class="iconlang" @click="open('/language')">
          <img :src="languageIcon" v-lazy="languageIcon" @click="open('/language')" alt="" />
        </div>
        <span @click="open('/language')">{{ languageName }}</span>
        <span class="go-edit" @click="open('/language')">{{ $t('pageLoginSignIn.goEdit') }}</span>
        <i class="iconTo" @click="open('/language')"></i>
      </div>
    </template>
    <template #header-icon-right>
      <span class="iconfont iconhomeempty" @click="$back(-1)"></span>
    </template>

    <div class="content page-pading">
      <!-- <div class="tips" v-show="usernameCode">{{ usernameCode }}</div> -->
      <div class="title">{{ $t('pageLoginSignIn.tipsTop') }}</div>

      <div class="icons">
        <div class="gg-btn">
          <img src="@/assets/new/login/gg.svg" alt="" />
          <span>{{ $t('pageLoginSignIn.loginGg') }}</span>
        </div>
      </div>
      <div class="login-directly">
        <div>OU</div>
      </div>

      <div class="title-menu x-btn" @click.stop="false">
        <div class="title-menu-title 7777" @click.stop="false" :class="{ 'title-select': menu == 2 }">
          <span @click="switchMenu(2)">{{ $t('pageRegister.email') }}</span>
        </div>
        <div class="title-menu-title 88888" @click.stop="false" :class="{ 'title-select': menu == 3 }">
          <span @click="switchMenu(3)">{{ $t('pageRegister.phone') }}</span>
        </div>
      </div>

      <!-- 账户 -->
      <div class="input-card" v-if="menu != 3">
        <input
          :maxlength="textlength"
          type="text"
          v-model="username"
          @confirm="submit"
          :placeholder="menuPlaceholder"
          placeholder-class="input-placeholder"
        />
      </div>
      <!-- 手机 -->
      <div class="input-card" v-if="menu == 3">
        <view class="input-box-flex">
          <text class="area-code-btn" @click="getQh()">{{ areaCode }}</text>
          <input
            :maxlength="textlength"
            type="number"
            v-model="username"
            :placeholder="menuPlaceholder"
            placeholder-class="input-placeholder"
            @confirm="submit"
          />
        </view>
      </div>

      <div class="input-card">
        <view class="input-box-flex">
          <input
            maxlength="12"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :placeholder="$t('pageRegister.er2')"
            @confirm="submit"
            placeholder-class="input-placeholder"
          />
          <span
            @click="showPassword = !showPassword"
            class="iconfont"
            :class="{ iconnoeyes: !showPassword, iconeyes: showPassword }"
          ></span>
        </view>
      </div>
      <!-- 密码 -->

      <!-- 邀请码 -->
      <div class="input-card" v-if="config.invite_register == '1'">
        <view class="input-box">
          <input
            maxlength="6"
            :type="'text'"
            v-model="invite_code"
            :placeholder="$t('pageRegister.invitationCode')"
            @confirm="submit"
            placeholder-class="input-placeholder"
          />
        </view>
      </div>

      <div class="input-card" v-if="menu === 1">
        <view class="input-box-flex">
          <text class="area-code-btn" @click="getQh()">{{ areaCode }}</text>
          <input
            maxlength="12"
            type="number"
            v-model="phone_number"
            :placeholder="$t('pageRegister.erTel')"
            placeholder-class="input-placeholder"
            @confirm="submit"
          />
        </view>
      </div>
      <div
        class="input-card"
        v-if="(menu != 2 && config.mobile_register == '1') || (menu == 2 && config.email_register == '1')"
      >
        <view class="input-box-flex">
          <input
            maxlength="4"
            type="text"
            v-model="code"
            :placeholder="$t('pageRegister.code')"
            placeholder-class="input-placeholder"
            @confirm="submit"
          />
          <text class="code-btn" @click="sendSms()">{{ codeText || t('pageRegister.erCode') }}</text>
        </view>
      </div>

      <div class="btn2" :class="{ btn: isLoginT === false }" @click="submit">
        {{ $t('pageRegister.btn') }}
      </div>

      <view class="create-account">
        <div class="create-account-right">
          {{ $t('pageRegister.existingAccount') }}
          <text @click="openLogin" class="x-btn">{{ $t('pageRegister.existingGologin') }}</text>
        </div>
      </view>

      <div class="bg">
        <img src="@/assets/setting/profile_star.png" alt="" />
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import Page from '../components/page.vue'
import { computed, onUnmounted, ref, watch } from 'vue'
import i18n, { t } from '../uilts/i18n'
import { appData, config, inviteCode, isPc, languageIcon, languageName, restMoney } from '../uilts/async.var'
import { bindKeyboard, randomString, removeKeyboard } from '../uilts/base'
import { dbGet, dbSet } from '../uilts/db'
import { back, onLoad, onlyOpen, open } from '../router/routes'
import { hint, alert, showActionSheet } from '../uilts/ui'

const isLoginT = ref(true)
const isSubmit = ref<boolean>(false)
const showPassword = ref<boolean>(false)
const codeKey = ref<string>('')
const menu = ref<number>(3)
const menuPlaceholder = ref<string>(t('pageRegister.erTel'))

const local = computed(() => i18n.global.locale)

const localMessages = computed(() => i18n.global.messages[local.value].pageRegister)

let username = ref<string>(''),
  password = ref<string>(''),
  verifyPassword = ref<string>(''),
  invite_code = ref<string>(inviteCode.value),
  phone_number = ref<string>(''),
  code = ref<string>('')

const isLogin = ref<number>(0)
const codeValueGet = (): string => randomString(16)
const codeValue = ref<string>(codeValueGet())
const codeText = ref<string>('')

const countdown = ref<number>(60)
const areaCode = ref<string>('+55')
const textlength = ref<number>(64)

watch(username, (_newValue, _oldValue) => {
  verifyFrom()
})

watch(password, (_newValue, _oldValue) => {
  verifyFrom()
})

watch(code, (_newValue, _oldValue) => {
  verifyFrom()
})

const verifyFrom = () => {
  if (username.value && password.value) {
    if (
      (menu.value != 2 && config.value.mobile_register == '1') ||
      (menu.value == 2 && config.value.email_register == '1')
    ) {
      if (code.value) isLoginT.value = false
    } else {
      isLoginT.value = false
    }
  } else {
    isLoginT.value = true
  }
}

const reCode = (): string =>
  (codeKey.value =
    import.meta.env.VITE_APP_BAES_URL + '/api/public/captcha?code_value=' + (codeValue.value = codeValueGet()))
// #ifdef APP-PLUS
// let systemInfosTel = undefined
// #endif
const switchMenu = (e: number) => {
  username.value = ''
  password.value = ''
  verifyPassword.value = ''
  code.value = ''
  menu.value = e
  switch (e) {
    case 1:
      textlength.value = 12
      menuPlaceholder.value = t('pageRegister.er1')
      break
    case 2:
      textlength.value = 64
      menuPlaceholder.value = t('pageRegister.ereml')
      break
    case 3:
      textlength.value = 20
      menuPlaceholder.value = t('pageRegister.erTel')
      break
  }
}

//获取用户信息
const getInfo = () => {
  '/api/user/getInfo'
    .GET<GetInfo>(null, {
      Authorization: async () => await dbGet('token'),
    })
    .then(async (ret) => {
      await dbSet('user', ret)
      alert({
        title: t('ui.uniShowModalTitle'),
        showCancel: false,
        confirmText: t('ui.uniShowModalConfirmText'),
        content: t('pageRegister.ok'),
      }).finally(async () => {
        await back(-1)
        await onlyOpen('/turntable-alert', { title: '' })
      })
    })
}
const array: string[] = []
const getQh = () => {
  showActionSheet(array).then((ret) => {
    areaCode.value = array[ret.tapIndex]
  })
}

const getAreaCode = () => {
  '/api/public/getCountryList'.GET<GetCountryList>().then((ret) => {
    ret.forEach((v) => {
      array.push(v.countryCode)
    })
  })
}
const isEmail = (s: string) => {
  // /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s)
}
let Interval: NodeJS.Timeout
let isCode = false
const sendSms = () => {
  if (isCode) return
  let sendNUmber = ''
  if (menu.value == 1) {
    if (!phone_number.value) return hint(t('pageRegister.erV'))
    sendNUmber = areaCode.value.substring(1) + phone_number.value
  }
  if (menu.value == 2) {
    if (!isEmail(username.value)) return hint(t('pageRegister.ere'))
    sendNUmber = username.value
  }
  if (menu.value == 3) {
    if (!username.value) return hint(t('pageRegister.erV'))
    sendNUmber = username.value
  }

  isCode = true
  countdown.value = 60
  if (menu.value == 2) {
    '/api/public/sendEmailCode'
      .POST<SendEmailCode>({
        code_value: codeValue.value,
        email: sendNUmber,
      })
      .then((_ret) => {
        hint(t('pageRegister.erCodeOk'))
        Interval = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--
            codeText.value = countdown.value + 's'
          } else {
            codeText.value = t('pageRegister.erCode2')
            isCode = false
            clearInterval(Interval)
          }
        }, 1000)
      })
      .catch(() => {
        isCode = false
      })
  } else {
    '/api/public/sendSms'
      .POST<SendSms>({
        code_value: codeValue.value,
        phone_number: sendNUmber,
        area_code: areaCode.value.substring(1),
      })
      .then((_ret) => {
        hint(t('pageRegister.erCodeOk'))
        Interval = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--
            codeText.value = countdown.value + 's'
          } else {
            // codeText.value = i18n.global.messages[local.value].pageRegister.erCode2
            codeText.value = localMessages.value.erCode2

            isCode = false
            clearInterval(Interval)
          }
        }, 1000)
      })
      .catch(() => {
        isCode = false
      })
  }
}

const accoRegister = () => {
  if (!username.value || username.value.length < 8) return hint(t('pageRegister.er1'))
  if (!password.value || password.value.length < 6) return hint(t('pageRegister.er2'))
  // if (password.value != verifyPassword.value) return hint(t('pageRegister.noPass'))
  if (!phone_number.value) return hint(t('pageRegister.erV'))
  isSubmit.value = true
  // 注册
  let source = 'WAP'
  let app_version = undefined
  let visit_link = null
  // #ifdef APP-PLUS
  // source = "APP"
  // app_version = systemInfosTel.appVersionCode;
  // #endif
  // #ifdef H5
  if (isPc.value) source = 'WEB'
  visit_link = window.location.href
  // #endif
  '/api/public/register'
    .POST<Register>({
      username: username.value,
      password: password.value,
      invite_code: invite_code.value || appData.invite_code,
      code: code.value,
      source: source as Register['request']['source'],
      code_value: codeValue.value,
      phone_number: areaCode.value.substring(1) + phone_number.value,
      app_version: app_version,
      visit_link: visit_link,
    })
    .then(async (data) => {
      password.value = ''
      await dbSet('token', 'Bearer ' + data.token)
      restMoney.value = !restMoney.value
      await dbSet('usernameLogin', username.value)
      //
      // 埋点
      // kwaiq.instance(localStorage.getItem("kwaiq")).track('completeRegistration')
      // dataLayer.push({ 'event': 'registerSuccess' });

      // #ifdef H5
      try {
        dbGet('kwaiq').then((kwaiqId) => {
          kwaiq.instance(kwaiqId).track('completeRegistration')
        })
        dataLayer.push({ event: 'registerSuccess' })
      } catch (error) {}
      // #endif
      //
      getInfo()
    })
    .finally(() => {
      isSubmit.value = false
    })
}

const telRegister = () => {
  if (!username.value) return hint(t('pageRegister.erV'))

  if (!password.value || password.value.length < 6) return hint(t('pageRegister.er2'))
  // if (password.value != verifyPassword.value) return hint(t('pageRegister.noPass'))
  isSubmit.value = true
  // 注册
  let source = 'WAP'
  let app_version = undefined
  let visit_link = undefined
  // #ifdef APP-PLUS
  // source = "APP"
  // app_version = undefined;
  // #endif
  // #ifdef H5
  if (isPc.value) source = 'WEB'
  visit_link = window.location.href
  // #endif
  '/api/public/register_mobile'
    .POST<RegisterMobile>({
      phone_number: username.value,
      password: password.value,
      invite_code: invite_code.value || appData.invite_code,
      code: code.value,
      source: source as RegisterMobile['request']['source'],
      code_value: codeValue.value,
      visit_link: visit_link,
      app_version: app_version,
      area_code: areaCode.value.substring(1),
    })
    .then(async (data) => {
      password.value = ''
      await dbSet('token', 'Bearer ' + data.token)
      restMoney.value = !restMoney.value
      await dbSet('usernameLogin', username.value)
      //
      // 埋点
      // #ifdef H5
      try {
        dbGet('kwaiq').then((kwaiqId) => {
          kwaiq.instance(kwaiqId).track('completeRegistration')
        })
        dataLayer.push({ event: 'registerSuccess' })
      } catch (error) {}
      // #endif
      //
      getInfo()
    })
    .finally(() => {
      isSubmit.value = false
    })
}
const emilRegister = () => {
  if (!isEmail(username.value)) return hint(t('pageRegister.ere'))

  if (!password.value || password.value.length < 6) return hint(t('pageRegister.er2'))
  // if (password.value != verifyPassword.value) return hint(t('pageRegister.noPass'))

  isSubmit.value = true
  // 注册
  let source = 'WAP'
  let app_version = undefined
  let visit_link = undefined
  // #ifdef APP-PLUS
  // source = "APP"
  // app_version = systemInfosTel.appVersionCode;
  // #endif
  // #ifdef H5
  if (isPc.value) source = 'WEB'
  visit_link = window.location.href
  // #endif
  '/api/public/register_email'
    .POST<RegisterEmail>({
      email: username.value,
      password: password.value,
      invite_code: invite_code.value || appData.invite_code,
      code: code.value,
      source: source as RegisterMobile['request']['source'],
      code_value: codeValue.value,
      visit_link: visit_link,
      app_version: app_version,
    })
    .then(async (data) => {
      password.value = ''
      await dbSet('token', 'Bearer ' + data.token)
      restMoney.value = !restMoney.value
      await dbSet('usernameLogin', username.value)
      //
      // 埋点
      // #ifdef H5
      try {
        dbGet('kwaiq').then((kwaiqId) => {
          kwaiq.instance(kwaiqId).track('completeRegistration')
        })
        dataLayer.push({ event: 'registerSuccess' })
      } catch (error) {}
      // #endif
      //
      getInfo()
    })
    .finally(() => {
      isSubmit.value = false
    })
}

const submit = () => {
  // 埋点
  // dataLayer.push({ 'event': 'registerClick' });
  // kwaiq.instance(localStorage.getItem("kwaiq")).track('contact')
  // #ifdef H5
  try {
    dbGet('kwaiq').then((kwaiqId) => {
      kwaiq.instance(kwaiqId).track('contact')
    })
    dataLayer.push({ event: 'registerClick' })
  } catch (error) {}
  // #endif
  //
  if (isSubmit.value) return

  switch (menu.value) {
    case 1:
      accoRegister()
      break
    case 2:
      emilRegister()
      break
    case 3:
      telRegister()
      break
  }
}
const openLogin = () => {
  if (isLogin.value) {
    back(1)
  } else {
    onlyOpen('/login')
  }
}

let keyboardKey: string = ''
onUnmounted(() => {
  removeKeyboard(keyboardKey)
})
onLoad(() => {
  username.value = ''
  //验证码
  reCode()
  getAreaCode()
  keyboardKey = bindKeyboard('Enter', submit)
})

//
watch(local, (name) => {
  const { pageRegister } = i18n.global.messages[name]

  switch (menu.value) {
    // case 1: {
    //   menuPlaceholder.value = pageRegister.er1
    //   break
    // }
    case 2: {
      menuPlaceholder.value = pageRegister.ereml
      break
    }
    case 3: {
      menuPlaceholder.value = pageRegister.erTel
      break
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.area-code-btn {
  color: #868686;
}

.code-btn {
  white-space: nowrap;
}

.title-menu {
  display: flex;
  justify-content: center;
  color: #c1c1c1;
  .title-menu-title {
    padding: 1rem;
  }
  .title-select {
    color: #ffffff;
  }
}

.bg {
  width: 100%;
  img {
    width: 100%;
    height: auto;
  }
}

.iconnoeyes {
  font-size: 0.8625rem;
  color: #000;

  &::before {
    content: '\e65f';
  }
}

.iconeyes {
  font-size: 0.8625rem;
  color: #000;

  &::before {
    content: '\e660';
  }
}

.ccc {
  height: inherit;
  display: flex;
  align-items: center;
}

.tips {
  color: #ff007a;
  font-family: PingFang SC;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 0.625rem;
}

.banner-box,
.content {
  box-sizing: border-box;
  padding: 2rem 1rem;
  color: #fff;
  background-color: rgb(31, 31, 31);
  min-height: 100vh;
}

.banner-box {
  position: relative;
  font-size: 1.0625rem;
  font-weight: 700;
  text-align: center;
  padding: 0 0.9375rem;
  height: 8.625rem;

  .banner {
    width: 100%;
    height: auto;
  }

  .txt {
    position: absolute;
    width: 60%;
    top: 55%;
    right: 0;

    text {
      color: #2ae035;
    }

    view {
      font-size: 0.7813rem;
      color: #9ba6b3;
      font-weight: normal;
    }
  }
}

.banner {
  display: block;
  margin: 0 auto;
  // width: 16.7500rem;
  // min-height: 12rem;
  margin-bottom: -1.5625rem;
}

.content {
  // padding: 0.9375rem;

  @include pc {
    // padding: 40px;
  }
}

.title {
  font-size: 1.2rem;
  font-weight: 700;
  padding-bottom: 0.625rem;
  text-align: center;
  color: #fcde26;
}

.input-card {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  box-sizing: border-box;
  margin-top: 1.25rem;
  background-color: #494949;

  // border: 1px solid #231d4e;
  border-radius: 0.25rem;
  padding: 0 0.625rem;
  height: 3.5rem;

  @include pc {
    height: 60px;
    font-size: 16px;
    border-radius: 8px;
    margin-top: 24px;
  }

  &:first-child {
    margin-top: 0;
  }

  .left-icon {
    width: 1.25rem;
    height: 1.25rem;

    @include pc {
      width: 24px;
      height: 24px;
    }
  }
}

input {
  height: 2.5rem;
  width: 100%;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding-left: 0.625rem;
  // color: #868686;

  @include pc {
    height: 60px;
    font-size: 16px;
    border-radius: 8px;
  }
}

input::-webkit-input-placeholder {
  color: #868686;
  font-size: 0.7813rem;
  background-color: transparent !important;

  @include pc {
    font-size: 16px;
    color: #5b6da1;
  }
}

.btn2 {
  @include button(#2ae035);
  height: 3rem;
  border-radius: 0.25rem;
  background: #009d81;
  opacity: 0.4;
  margin-top: 2.5rem;
  font-size: 0.865rem;

  @include pc {
    height: 50px;
    font-size: 18px;
    margin-top: 32px;
  }

  &.btn {
    opacity: 1;
  }
}

.input-box {
  position: relative;
  width: calc(100% - 1.25rem);

  .icon {
    position: absolute;
    right: 0;
    top: 50%;
    width: 0.9375rem;
    height: 2.375rem;
    fill: #b5ebff;
    transform: translateY(-50%);
  }
}

.input-box-flex {
  display: flex;
  align-items: center;
  width: calc(100% - 0.25rem);

  .code-input {
    width: calc(100% - 5.5rem);
  }

  .code-img {
    display: block;
    width: 5.5rem;
  }
}

.forgot {
  font-size: 0.7813rem;
  margin: 1.25rem 0;
  text-align: right;
}

.create-account {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-top: 1rem;
  font-size: 0.625rem;

  @include pc {
    margin-top: 24px;
    font-size: 16px;
  }

  text {
    color: #fff;
  }

  .create-account-left {
    display: flex;
    align-items: center;

    img {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.625rem;

      @include pc {
        width: 24px;
        height: 24px;
      }
    }
  }

  .create-account-right {
    .x-btn {
      color: #009d80;
    }
  }
}

.login-directly {
  @extend %flex-center;
  text-align: center;
  font-size: 12px;
  color: #ddd;
  margin: 0.5rem 0 1.25rem;

  @include pc {
    font-size: 14px;
  }

  text {
    color: var(--MENU, #666);
  }

  view {
    margin: 0 0.625rem;
  }

  &::before,
  &::after {
    content: '';
    flex: 1;
    display: block;
    height: 1px;
    background-color: #666;
  }
}

.icons {
  @extend %flex-center;
  justify-content: center;

  .gg-btn {
    margin-top: 0.75rem;
    img {
      width: 1.75rem;
      height: 1.75rem;
      margin-right: 1rem;
    }
    background-color: #3f6bb3;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 0.75rem;
    min-width: 14rem;
    height: 2.8rem;
    border-radius: 0.25rem;
  }
}

[class*='icon-'] {
  width: 3.4375rem;
  height: 2.625rem;
  // border: 1px solid #A6B2C0;
  border-radius: 50%;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 2.5rem;

  @include pc {
    height: 48px;
    width: 48px;
  }
}

@for $i from 1 through 4 {
  .icon-#{$i} {
    background-image: url(@/assets/new/login/login-icon#{$i}.png);
  }
}
</style>
