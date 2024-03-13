<template>
  <div class="public-game">
    <div class="slot-item">
      <div
        class="game-image"
        :class="{ 'game-nav': noShowPlay !== true }"
        @click="noShowPlay !== true ? loginGame(item) : ''"
      >
        <!-- <img class="game_company_image h5" :src="item.game_company_image" alt=""> -->
        <public-image class="public-image" :src="item.image"></public-image>
      </div>
      <!-- <div class="game-name">

				<span class="ellipsis2">{{ item.name }}</span>
				<div class="collect-icon xx-btn" @click.stop="collect(item)">
					<img v-if="!isCollect" src="@/assets/new/game/is_ck.png" alt="">
					<img v-else src="@/assets/new/game/no_ck.png" alt="">
				</div>
			</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import PublicImage from '../components/public-image.vue'
import { defineProps, defineEmits, ref } from 'vue'
import { dbGet } from '../uilts/db'
import { t } from '../uilts/i18n'
import { hint } from '../uilts/ui'
import { open } from '../router/routes'
import { locationOrigin, lodingPages, isCollectApi } from '../uilts/async.var'
const prop = defineProps<{
  item: Games
  isCollectList?: boolean
  noRefresh?: boolean
  noShowPlay?: boolean
}>()
const emit = defineEmits(['delGame', 'collectGame'])
const isCollect = ref(prop.item.is_collect === 1)
const collect = (item: Games) => {
  if (!isCollect.value) {
    '/api/game/collectGame'
      .POST<CollectGame>(
        {
          gid: item.id,
        },
        {
          Authorization: async () => await dbGet('token'),
        },
      )
      .then((_ret) => {
        hint(t('pageIndex.collect'))
        isCollectApi.value = !isCollectApi.value
        isCollect.value = true
        emit('collectGame', item.id)
        if (!prop.noRefresh) {
          // uni.$emit('collectGame')
        }
      })
  } else {
    '/api/game/delGame'
      .POST<DelGame>(
        {
          game_id: item.id,
        },
        {
          Authorization: async () => await dbGet('token'),
        },
      )
      .then((_ret) => {
        hint(t('pageIndex.delCollect'))
        isCollectApi.value = !isCollectApi.value
        if (!prop.isCollectList) isCollect.value = false
        emit('delGame', item.id)
        emit('collectGame', item.id)
        if (!prop.noRefresh) {
          // uni.$emit('collectGame')
        }
      })
  }
}
//登录游戏
const loginGame = (item: Games) => {
  lodingPages.value = true
  // #ifdef H5
  try {
    dbGet('kwaiq').then((kwaiqId) => {
      kwaiq.instance(kwaiqId).track('buttonClick')
    })
    dataLayer.push({ event: 'clickGame' })
  } catch (error) {}
  // #endif
  dbGet('token')
    .then((_user) => {
      open('/game-open', {
        id: item.id,
        code: item.game_company_code,
        name: item.name,
        img: item.image,
      })
      // '/api/game/login'.POST<GameLogin>({
      // 	game_id: item.id,
      // 	game_company_code: item.game_company_code,
      // 	home_url: locationOrigin.value
      // }, {
      // 	Authorization: async () => await dbGet('token')
      // }).then(ret => {
      // 	'/api/game/addRecordGame'.POST<AddRecordGame>({
      // 		gid: item.id
      // 	}, { Authorization: async () => await dbGet('token') })

      // 	// #ifdef H5
      // 	try {
      // 		isCollectApi.value = !isCollectApi.value
      // 		dbGet('kwaiq').then(kwaiqId => {
      // 			kwaiq.instance(kwaiqId).track('contentView')
      // 		})
      // 		dataLayer.push({ 'event': 'enterGame' });
      // 	} catch (error) {

      // 	}
      // 	// #endif

      // 	return open('/customer-service', /^https?/.test(ret.url) ? { url: ret.url , id:item.id } : { html: ret.url,id:item.id })
      // })
    })
    .catch(() => {
      open('/login')
    })
    .finally(() => {
      lodingPages.value = false
    })
}
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.login-card {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

.game-name {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include h5 {
    color: var(--MENU, #8e90cd);
    /* PingFang/Medium 28 */
    font-family: PingFang SC;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    padding: 0 0.625rem;
    height: 2.5rem;
  }

  @include pc {
    padding: 0 20px 0 24px;
    color: #908fa2;
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
    height: 52px;
    /* 114.286% */
  }

  span {
    width: calc(100% - 1.625rem);
    overflow: hidden;
  }

  .ellipsis2 {
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .collect-icon {
    @include h5 {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: #ffffff;
    }

    @include pc {
      width: 18px;
      height: 18px;
    }

    display: flex;

    justify-content: center;
    align-items: center;

    img {
      @include h5 {
        width: 0.625rem;
        height: 0.625rem;
      }

      @include pc {
        width: 18px;
        height: 18px;
      }
    }
  }
}

.public-game {
  // max-width:12.5000rem;
  @include h5 {
    // margin-bottom: 0.75rem;
    margin: 0.3125rem 0;
  }
  @include pc {
    // margin-bottom: 16px;
    margin: 0.3125rem 0;
  }
}

.public-image {
  width: inherit;
  border-radius: 0.5rem;
}

.slot-item {
  width: 100%;
  // background-color: #201E47;
  border-radius: 0.5rem;
  // margin-bottom:0.8125rem;
  overflow: hidden;

  @include pc {
    border-radius: 24px;
    background-color: #1d1a3f;
  }

  .game-nav {
    width: 100%;
    border-radius: 0.5rem;
    // min-height: 9.3750rem;
    transform: scale(1);
    filter: blur(0px);
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    cursor: pointer;

    //&:hover {
    //  // filter: blur(2px);
    //  transform: scale(1.1);
    //}
    //
    //&:hover:before {
    //  content: '';
    //  backdrop-filter: blur(2px);
    //  border-radius: 0.5rem;
    //  position: absolute;
    //  top: 0;
    //  left: 0;
    //  width: 100%;
    //  height: 100%;
    //  background-color: rgba(0, 0, 0, 0.5);
    //  background-image: url(@/assets/new/game/pay.png);
    //  background-repeat: no-repeat;
    //  background-size: 40%;
    //  background-position: 50%;
    //  z-index: calc(var(--I1) + 0);
    //}
  }

  .game-image {
    width: 100%;
    height: auto;
    background-position: center center;
    // background-color: #111415;
    background-size: cover;
    border-radius: 0.5rem;
    overflow: hidden;
    // aspect-ratio: 1;
    // height:10.0000rem;
    position: relative;
    .game_company_image {
      position: absolute;
      top: 0.44rem;
      left: 50%;
      transform: translateX(-50%);
      width: auto;
      height: 1.2rem;
    }
  }

  .datas {
    padding: 0 0.3125rem 0rem;
  }

  .name {
    font-size: 0.7813rem;
    color: #9ba6b3;
    min-height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text {
      width: 7.5rem;
    }
  }

  .colect-btn {
    width: 1.4375rem;
    height: 1.4375rem;

    .icon {
      width: 100%;
      height: 100%;
      fill: #67707b;

      &:active {
        fill: #fff;
      }
    }
  }

  .icon-btn {
    width: 1.125rem;
    height: 1.125rem;
    background: url(@/assets/index/collect.png) no-repeat center center;
    background-size: 100%;
  }

  .icon-btn-show {
    width: 1.125rem;
    height: 1.125rem;
    background: url(@/assets/index/collect-on.png) no-repeat center center;
    background-size: 100%;
  }

  .btn {
    // @include button(#2AE035);
    // @include button(#2D3035);
    // @include button-color(#2D3035);
    @extend %flex-center;
    background: #2d3035;
    width: 5rem;
    height: 1.875rem;
    font-size: 0.75rem;
    border-radius: 0.125rem;
    font-weight: normal;
    color: #fff;

    &:active {
      background-color: #25c52d;
      // color:#2D3035;
    }
  }
}

@media (min-width: 9999px) {
  .slot-item {
    .game-nav {
      &:hover {
        // backdrop-filter: blur(2px);
        transform: scale(1.1);
      }

      &:hover:before {
        content: '';
        backdrop-filter: blur(2px);
        border-radius: 0.4688rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        background-image: url(@/assets/new/game/pay.png);
        background-repeat: no-repeat;
        background-size: 40%;
        background-position: 50%;
        z-index: calc(var(--I1) + 0);
      }
    }
  }
}
</style>
