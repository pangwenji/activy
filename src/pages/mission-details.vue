<template>
    <page :show-scrollbar="true" :mouse-wheel="true" :head-box="isPc ? ['content', 'right'] : undefined">

		<div class="body page-pading">
			<div class="title">
				<span>{{ $t('pageActivityNew.cydhd') }}</span>
				<!-- <img class="icon-help" src="@/assets/new/mission-details/help.png" /> -->
				<div class="help-details pc">{{ $t('pageActivityNew.smdetails') }}</div>
			</div>
			<div class="title2">
				{{ $t('pageActivityNew.yxlx') }}
			</div>
			<div class="tab-btns">
				<div class="tab-btn" 
                v-for="item,index in datas" :class="{
                    active:typesIndex === index
                }"
                @click="typesIndex = index;firmIndex = 0"
                >
					{{ item.name }}
				</div>
			</div>

			<div class="title2">
				{{ $t('pageActivityNew.yxcs') }}
			</div>
            
			<div class="tab-btns" v-if="datas[typesIndex]">
				<div class="tab-btn" 
                v-for="item,index in datas[typesIndex].platform_data" :class="{
                    active:firmIndex === index
                }"
                @click="firmIndex = index;gamesIndex = -1"
                >
					{{ item.name }}
				</div>
			</div>

            
			<div class="title2">
				{{ $t('pageActivityNew.yxmc') }}
			</div>
			<div class="tab-btns" v-if="datas[typesIndex] && datas[typesIndex].platform_data[firmIndex]">
				<div class="tab-btn game-btn" 
                v-for="item,index in datas[typesIndex].platform_data[firmIndex].game_data" :class="{
                    active:gamesIndex === index
                }"
                @click="gamesIndex = index;loginGame(item)"
                >
					{{ item.name }}
				</div>
			</div>
			<div class="title3">
				{{ $t('pageActivityNew.cyysdyj') }}
			</div>
            

		</div>
</page>
</template>

<script setup lang="ts">
	// import ScrollView from "../components/scroll-view.vue";
	import Page from '../components/page.vue';
	import { ref } from "vue"
	import { dbGet } from "../uilts/db";
	import { isPc, locationOrigin, lodingPages } from "../uilts/async.var";
	import { onLoad, open } from '../router/routes';
    // 类型
    const typesIndex = ref(0);
    // 厂商
    const firmIndex = ref(0);
    // 游戏
    const gamesIndex = ref(-1);

    const datas = ref<Array<GetActivityDetail['response']>>([]);


	//登录游戏
	const loginGame = (item:GetActivityDetail['response']['platform_data'][number]['game_data'][number]) => {
		lodingPages.value = true;
		// #ifdef H5
		try {
			dbGet('kwaiq').then(kwaiqId => {
				kwaiq.instance(kwaiqId).track('buttonClick')
			})
			dataLayer.push({'event':'clickGame'});
		} catch (error) {
			
		}
		// #endif
		dbGet('user').then(_user => {
			return '/api/game/login'.POST<GameLogin>({
				game_id: item.game_id,
				game_company_code: item.game_company_code,
				home_url: locationOrigin.value
			}, {
				Authorization: async () => await dbGet('token')
			}).then(ret => {
				'/api/game/addRecordGame'.POST<AddRecordGame>({
					gid: item.game_id
				}, { Authorization: async () => await dbGet('token') })

				// #ifdef H5
				try {
					dbGet('kwaiq').then(kwaiqId => {
						kwaiq.instance(kwaiqId).track('contentView')
					})
					dataLayer.push({'event':'enterGame'});
				} catch (error) {
					
				}
				// #endif

				return open('/customer-service', /^https?/.test(ret.url) ? { url: ret.url } : {html:ret.url})
			})
		}).finally(() => {
			lodingPages.value = false;
		});
	}
	onLoad<PageData['/mission-details']>((data) => {
		return "/api/activity/getActivityDetail".GET<GetActivityDetail>(data, {
			Authorization: async () => await dbGet('token')
		}).then(ret => {
			datas.value = [ret];
		});
	})
</script>

<style lang="scss" scoped>

@import '../scss/public.scss';

.body {
    // padding: 0.75rem;
    background: #16122F;

    @include pc {
        // padding: 0 36px 36px;
    }
}

.flex{
	display:flex;
	align-items:center;
}

.tab-btns{
	display: grid;
    
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 0.5rem;
    grid-row-gap:0.5rem;
    
	color:#5B6DA1;
	font-size: 0.75rem;
	gap: 0.3125rem;
	margin-bottom:0.75rem;
	margin-top:0.25rem;
	.tab-btns{
		margin:0;
	}
	.tab-btn{
		flex:1;
		display: flex;
		padding: 0.25rem;
		justify-content: center;
		align-items: center;
		border-radius: 0.25rem;
		border: 1px solid rgba(73, 70, 118, 0.50);
		background: rgba(32, 30, 71, 0.32);
		&.active{
			color:#0FF;
			font-size: 0.75rem;
			background: #2E2C5E;
		}
	}
	@include pc {
		grid-column-gap: 16px;
		grid-row-gap:16px;
		.tab-btn{
			min-height:36px;
			font-size: 14px;
			box-sizing:border-box;
			border-radius: 8px;
			padding:5px 30px;
			&.active{
				font-size: 14px;
				background: #2E2C5E;
				border: 1px solid #2E2C5E;
			}
		}
		.game-btn{
			border-radius: 50px;
		}
	}
}

.title,.title2{
	color: #8E90CD;
	font-size: 0.875rem;
	display:flex;
	align-items: center;
	justify-content:space-between;
	line-height: 1.25rem;
	margin-bottom:0.75rem;
	position: relative;
	@include pc {
		justify-content: flex-start;
		font-size: 16px;
		gap: 8px;
		margin-bottom:16px;
		.help-details{
			display:none;
			width: 356px;
			border-radius: 16px;
			padding: 16px;
			font-size: 14px;
			background:#201E47;
			box-sizing:border-box;
			position: absolute;
			top:100%;
			margin-top:12px;
			z-index:var(--I1);
		}
	}
}
.title2{
	font-size: 0.75rem;
	margin-bottom:0;
	@include pc {
		font-size: 16px;
		margin-bottom:16px;
		margin-top:24px;
	}
}
.title3{
	color: #8E90CD;
	font-size: 0.625rem;
	@include pc {
		font-size: 14px;
		margin-top:24px;
	}
}
.icon-help{
	display:block;
	width: 1.25rem;
	height: 1.25rem;
	cursor: pointer;
	@include pc {
		width: 20px;
		height: 20px;
		&:hover~.help-details{
			display:block;
		}
	}

}


</style>