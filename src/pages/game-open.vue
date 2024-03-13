<template>
  <page :show-header="false">
    <div class="body" @click.stop="$back()">
      <div class="body-bottom" @click.stop="">
        <img class="game-image" :src="gameIteam.img" alt="" />
        <div class="gameInfo">
          <div class="name">{{ gameIteam.name }}</div>
          <div class="btn">
            <public-loading v-if="loadingNew"></public-loading>
            <!-- <span>Demo</span> -->
            <span class="mode" v-else @click.stop="loginGame({ id: gameIteam.id, game_company_code: gameIteam.code })">
              {{ $t('pageGame.play') }}
            </span>
          </div>
        </div>
        <public-svg class="icon iconbutton" icon="icon_Close" @click.stop="$back()"></public-svg>
      </div>
    </div>
  </page>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import Page from '../components/page.vue'
import PublicLoading from '../components/public-loading.vue'
import PublicSvg from '../components/public-svg.vue'
import { open, onLoad, onShow } from '../router/routes'
import { isCollectApi, locationOrigin, lodingPages } from '../uilts/async.var'
import { dbGet } from '../uilts/db'

const gameIteam = ref<{
  img: string
  name: string
  id: number
  code: string
}>({
  img: '',
  name: '',
  id: 0,
  code: '',
})
const loadingNew = ref(false)
//登录游戏
const loginGame = async (item: { id: number; game_company_code: string }) => {
  if (loadingNew.value) return

  loadingNew.value = true
  lodingPages.value = true
  // #ifdef H5
  try {
    dbGet('kwaiq').then((kwaiqId) => {
      kwaiq.instance(kwaiqId).track('buttonClick')
    })
    dataLayer.push({ event: 'clickGame' })
  } catch (e) {
    console.log(e)
  }
  // #endif
  try {
    const token = await dbGet('token').catch(async (e) => {
      console.log(e)
      await open('/login')
    })
    const ret = await '/api/game/login'.POST<GameLogin>(
      {
        game_id: item.id,
        game_company_code: item.game_company_code,
        home_url: locationOrigin.value,
      },
      {
        Authorization: token,
      },
    )

    await '/api/game/addRecordGame'.POST<AddRecordGame>(
      { gid: item.id },
      { Authorization: async () => await dbGet('token') },
    )

    // #ifdef H5
    try {
      isCollectApi.value = !isCollectApi.value
      dbGet('kwaiq').then((kwaiqId) => {
        kwaiq.instance(kwaiqId).track('contentView')
      })
      dataLayer.push({ event: 'enterGame' })
    } catch (error) {
      console.log(error)
    }
    // #endif

    await open(
      '/customer-service',
      /^https?/.test(ret.url) ? { url: ret.url, id: item.id } : { html: ret.url, id: item.id },
    )
  } catch (e) {
    console.log(e)
    lodingPages.value = false
    loadingNew.value = false
  } finally {
    setTimeout(() => {
      lodingPages.value = false
      loadingNew.value = false
    }, 1000)
  }
}

onUnmounted(() => {})

onLoad<PageData['/game-open']>((e) => {
  gameIteam.value = e
})
onShow<PageData['/game-open']>((e) => {
  gameIteam.value = e
})
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
@import '@/assets/font/font.css';
.body {
  width: 100%;
  height: 100vh;
}
.body-bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 0.9rem 1.06875rem;
  background-color: white;
  // min-height: 30vh;
  position: fixed;
  bottom: 0;
  background: rgb(28, 28, 28);
  display: flex;
  font-weight: 700;

  .iconbutton {
    color: rgb(255, 255, 255);
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    fill: rgb(255, 255, 255);
    right: 1.06875rem;
    top: 0.9rem;

    &::before {
      content: '\e6a7';
    }
  }

  .game-image {
    width: 6.24375rem;
    border-radius: 0.5625rem;
  }

  .gameInfo {
    color: rgb(255, 255, 255);
    font-size: 1.125rem;
    margin: 1.125rem 0px 0px 0.95625rem;
  }

  .name {
    height: 3.375rem;
  }

  .btn {
    display: flex;
    font-size: 0.84375rem;
    font-family: Arial;
    width: 12.375rem;
    justify-content: space-around;

    span {
      display: block;
      width: 5.00625rem;
      height: 2.19375rem;
      background-color: #009d80;
      text-align: center;
      line-height: 2.19375rem;
      border-radius: 0.28125rem;
    }

    &:active {
      transform: scale(0.8);
      span {
        // background-color: ;
      }
    }
  }
}
</style>
