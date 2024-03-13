<template>
		<page>
			<view class="title">
				<view class="name">Chat</view>
				<view class="right">
					<view class="rule-btn">
						<public-svg class="icon" icon="icon_Inform"></public-svg>
					</view>
					<view class="rule-btn" @click="changeWindow('right')">
						<public-svg class="icon" icon="icon_Close"></public-svg>
					</view>
				</view>
			</view>
			
			<scroll-view class="msg-list-box" :scroll-y="true" :scroll-top="10000" :show-scrollbar="true">
				<view class="msg-card">
					<view class="msg-view">
						<view class="msg-head right">
							<img src="@/assets/user/user.png" mode="" />
							<text class="vip-num">V0</text>
						</view>
						<view class="msg-content">
							<view class="msg-content-top">
								<text class="msg-content-name right">Nuqnbbyvah</text>
								<text class="msg-content-time">2023/7/5 23:16:11</text>
							</view>
							<view class="msg-content-text">
								I m angery
								sd ssssssss sd  sadsad sad asd sadsa d asd asdas d sad asdasd
							</view>
						</view>
					</view>
					
					<view class="msg-view" v-for="i in 2" :key="i">
						<view class="msg-head right">
							<img src="@/assets/user/user.png" mode="" />
							<text class="vip-num">V0</text>
						</view>
						<view class="msg-content">
							<view class="msg-content-top">
								<text class="msg-content-name right">Nuqnbbyvah</text>
								<text class="msg-content-time">2023/7/5 23:16:11</text>
							</view>
							<view class="msg-content-red" @click="redShow = true">
								<view class="msg-content-red-top">
									<img src="@/assets/red/red-cion.png" mode="" />
									<text>{{$t('pageChatSingle.redgxfc')}}</text>
								</view>
								<view class="msg-content-red-bottom">{{$t('pageChatSingle.memberEedEnvelope')}}</view>
							</view>
						</view>
					</view>
					
					<view class="msg-view">
						<view class="msg-head right">
							<img src="@/assets/user/user.png" mode="" />
							<text class="vip-num">V0</text>
						</view>
						<view class="msg-content">
							<view class="msg-content-top">
								<text class="msg-content-name right">Nuqnbbyvah</text>
								<text class="msg-content-time">2023/7/5 23:16:11</text>
							</view>
							<view class="msg-content-text">
								<view class="red-packet-msg">
									<view class="red-packet-card">
										<view class="red-icon">
											<img src="@/assets/chat/red.png" mode="" />
										</view>
										<view class="red-content">
											<text class="red-remark">CHECK MY SPIN BONUS!</text>
											<view class="red-money">+$12.99</view>
										</view>
									</view>
									
									<button class="bootom-y">Spin Now!</button>
								</view>
							</view>
						</view>
					</view>
					
				</view>
			</scroll-view>
			
			
			<view class="input-msg-card">
				
				<view class="msg-input">
					<view class="msg-input-view">
						<input type="text" :placeholder="$t('pageChatSingle.enter')">
					</view>
					<view class="msg-input-icon">
						<img src="@/assets/chat/x.png" mode="" />
					</view>
				</view>
				
				<view class="tool-view">
					
					<view class="tool-eg" @click="$back(-2)">
						{{$t('pageChatSingle.playGame')}}
						<img src="@/assets/icon/right-bottom.png" mode="" />
					</view>
					
					<view class="tool-eg" @click="$open('/share')">
						{{$t('pageChatSingle.share')}}
						<img src="@/assets/icon/right-bottom.png" mode="" />
					</view>
					
					<view class="tool-list">
						
						<img class="red" @click="$open('/send-red')" src="@/assets/chat/h.png" mode="" />
						
						<img class="jiang" @click="rewardShow = true" src="@/assets/chat/jiang.png" mode="" />
						
					</view>
					
				</view>
				
				<!-- <view class="emoji-view">
					<view class="emoji-team" v-show="i==0" v-for="v,i in emojiData">
						<text v-for="vv in v">{{vv}}</text>
					</view>
				</view> -->
				
			</view>

			<view class="reward-list" v-show='rewardShow'>
				
				<img class="clone-button" @click="rewardShow = false" src="@/assets/icon/close-bottom.png" mode="" />
				
				<view class="reward-list-title">{{$t('pageChatSingle.todayBigWinner')}}</view>
				
				<view class="reward-list-team">
					<img class="reward-level" src="@/assets/chat/j.png" mode="" />
					<img class="reward-head" src="@/assets/user/user.png" mode="" />
					<text class="reward-name">Shinery 1</text>
					<view class="reward-money">$46,632,399.15</view>
				</view>
				
				<view class="reward-list-team">
					<img class="reward-level" src="@/assets/chat/y.png" mode="" />
					<img class="reward-head" src="@/assets/user/user.png" mode="" />
					<text class="reward-name">Shinery 1</text>
					<view class="reward-money">$46,632,399.15</view>
				</view>
				
				<view class="reward-list-team">
					<img class="reward-level" src="@/assets/chat/t.png" mode="" />
					<img class="reward-head" src="@/assets/user/user.png" mode="" />
					<text class="reward-name">Shinery 1</text>
					<view class="reward-money">$46,632,399.15</view>
				</view>
				
			</view>
			
			<view class="red-card" v-show="redShow === true" @click="redShow = false">
				<view class="red-content">
					<view class="red-user">
						<img class="red-user-icon" src="@/assets/user/user.png" mode="" />
						<text>{{'Aehjtuy' + $t('pageChatSingle.issueRed')}}</text>
					</view>
					<view class="red-int">
						{{$t('pageChatSingle.redgxfc')}}
					</view>-
				</view>
				
				<view class="open" @click.stop="$open('/open-red')">{{$t('pageChatSingle.open')}}</view>
			</view>
		</page>
	
</template>

<script setup lang="ts">

import ScrollView from "../components/scroll-view.vue";
import Page from '../components/page.vue'
import PublicSvg from '../components/public-svg.vue'
	import { ref,onMounted } from 'vue';
import { changeWindow } from '../router/routes';
	// const emojiData = reactive([])
	// const page = Math.ceil(emoji.length/21);
	// for (let i = 0; i < page; i++) {
	// 	emojiData[i] = [];
	// 	for (let k = 0; k < 21; k++) {
	// 		emoji[i*21+k]?emojiData[i].push(
	// 		emoji[i*21+k]
	// 		):''
	// 	}
	// }

	const rewardShow = ref(false);
	const redShow = ref(false);

	onMounted(() => {
		
	})
	
	// open('/chatRule')
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';
	page,.content{
		height:100%;
		box-sizing:border-box;
		background-color: #1e2024;
		display:flex;
		flex-direction: column;
	}
	.content{
		position:assets;
	}
	.title{
		padding:0 0.6250rem;
		height:$content-height;
		display:none;
		align-items:center;
		justify-content:space-between;
		color:#FFF;
		font-weight: 600;
		font-size:1.1875rem;
	}
	.right{
		display:flex;
		align-items:center;
		justify-content:space-between;
		.icon{
			width:1.2500rem;
			height:1.2500rem;
			fill:#67707B;
		}
		.rule-btn{
			width:2.0000rem;
			height:2.0000rem;
			cursor: pointer;
			@extend %flex-center;
			&:active .icon{
				fill:#FFF;
			}
		}
	}
	
	.msg-list-box{
		width:100%;
		height:calc(100% - 3.1250rem - $content-height - var(--window-bottom));
		scrollbar-width: 0;
		scrollbar-color: transparent transparent;
	}
	@media (min-width: 9999px){
		.msg-list-box{
			width:100%;
			height:calc(100% - 6.2500rem - $content-height);
		}
		.title{
			display:flex;
		}
		.content{
			position:fixed;
			top:0;
		}
	}
	
	.msg-view{
		padding: 0.9375rem 0.9375rem 0.6250rem;
		display: flex;
		&:active{
			filter:hue-rotate(341deg);
		}
		.msg-head{
			width: 1.5938rem;
			position: relative;
			img{
				width: 1.5625rem;
				height: 1.5625rem;
				border-radius: 50%;
			}
			.vip-num{
				position: absolute;
				top: 1.2500rem;
				left: 0;
				width: 1.5625rem;
				height: 0.9375rem;
				background-color: #b1caeb;
				color: #000;
				font-size: 0.5000rem !important;
				font-weight: bold;
				text-align: center;
				line-height: 0.9375rem;
				border-radius: 0.2188rem;
			}
		}
		
		.msg-content{
			width: 100%;
			.msg-content-top{
				font-size: 0.7813rem;
				color: #A2B2C1;
				// .msg-content-name{
					
				// }
				// .msg-content-time{
					
				// }
			}
			.msg-content-text{
				margin-top: 0.4688rem;
				background-color: #24262A;
				border-radius: 0.2188rem;
				width: calc(100% - 1.2500rem);
				// height: ;
				padding: 0.6250rem;
				color: #A2B2C1;
				font-size: 0.7813rem;
			}
			.msg-content-red{
				margin-top: 0.4688rem;
				margin-left: 0.3125rem;
				background-color: #D59148;
				border-radius: 0.1084rem;
				width: 12.5000rem;
				padding: 0 0.6250rem;
				color: #FFFFFF;
				font-size: 0.7813rem;
				position: relative;
				.msg-content-red-top{
					display: flex;
					
					img{
						width: 1.9063rem;
						height: 2.3750rem;
						margin-top: 0.7500rem;
					}
					text{
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 1.0313rem;
						line-height: 3.8438rem;
						margin-left: 1.1563rem;
					}
				}
				.msg-content-red-bottom{
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					border-top: 0.0313rem solid #D99D5A;
					line-height: 1.4688rem;
					height: 1.4688rem;
					font-size: 0.7813rem;
				}
			}
			
			.msg-content-red::before {
			  content: "";
			  position: absolute;
			  top: 0.3125rem;
			  left: -0.5625rem;
			  border-width: 0.6250rem;
			  height: 0.0000rem;
			  border-style: solid;
			  border-width: 0.3125rem;
			  border-color: transparent #D59148 transparent transparent ;
			}
		}
		
		.right{
			margin-right: 0.3125rem;
		}
		
		.left{
			margin-left: 0.3125rem;
		}
		
		.t-left{
			text-align: right;
		}
	}
	
	.bootom-y{
		width: 5.8438rem;
		height: 2.2188rem;
		background-color: #2AE035;
		color: #000000;
		font-size: 0.7813rem;
		line-height: 2.2188rem;
		border-radius: 0.1250rem;
		margin-top: 0.6250rem;
		font-weight: bold;
		margin-left: 0.0000rem;
	}
	
	.red-packet-card{
		width: 100%;
		display: flex;
		background-color: #1C1E22;
		border-radius: 0.1087rem;
		padding: 0.7813rem 0;
		.red-icon{
			margin-left: 0.6250rem;
			img{
				width: 2.4875rem;
				height: 2.1688rem;
			}
		}
		.red-content{
			width: 100%;
			
			margin-left: 0.6250rem;
			margin-right: 0.6250rem;
			.red-remark{
				font-size: 0.7813rem;
				color: #FFFFFF;
			}
			.red-money{
				margin-top: 0.3125rem;
				height: 1.3125rem;
				line-height: 1.3125rem;
				background-color: #31343a;
				font-weight: bold;
				color: #2AE035;
				text-align: center;
				border-radius: 0.1087rem;
			}
		}
	}

	.input-msg-card{
		height: 6.2500rem;
		box-sizing: content-box;
		width: 100%;
		padding-bottom:var(--window-bottom);
		background-color: #212126;
		
		.msg-input{
			margin-top: 0.6250rem;
			margin-left: 0.6250rem;
			margin-right: 0.6250rem;
			display: flex;
			background: #1c1e22;
			height: 2.3000rem;
			line-height: 2.3000rem;
			border-radius: 0.1084rem;
			.msg-input-view{
				margin-left: 0.6875rem;
				margin-right: 0.6875rem;
				width: 100%;
				input{
					height: 2.3000rem;
					line-height: 2.3000rem;
					width: 100%;
					color: #9BA6B3;
				}
			}
			.msg-input-icon{
				margin-left: auto;
				img{
					
					width: 1.0000rem;
					height: 1.0000rem;
					margin-right: 0.6250rem;
					margin-top: 0.6563rem;
				}
			}
		}
	}
	@media (min-width: 800px){
		.input-msg-card{
			padding-bottom:0;
		}
	}
	.tool-view{
		margin-left: 0.7813rem;
		margin-right: 0.7813rem;
		margin-top: 0.6250rem;
		display: flex;
		.tool-eg{
			margin-right: 0.3125rem;
			display: flex;
			width: 8.2813rem;
			height: 1.7188rem;
			line-height: 1.7188rem;
			background-color: #282A2F;
			text-indent: 0.7813rem;
			color: #9BA6B3;
			font-size: 0.7813rem;
			border-radius: 0.1084rem;
			img{
				width: 0.4063rem;
				height: 0.7188rem;
				margin-left: auto;
				margin-top: 0.5000rem;
				margin-right: 0.4688rem;
			}
		}
		
		.tool-list{
			margin-left: auto;
			.red{
				width: 0.7813rem;
				height: 0.9375rem;
				margin-top: 0.3750rem;
			}
			.jiang{
				margin-left: 1.5625rem;
				width: 1.0625rem;
				height: 1.0313rem;
				margin-top: 0.3438rem;
			}
		}
	}
	
	.emoji-view{
		margin: 0.7813rem;
		padding: 0.6250rem 0;
		font-size: 1.5625rem;
		// .emoji-team{
			
		// }
	}
	
	.reward-list{
		margin-left: 0.7813rem;
		margin-right: 0.7813rem;
		width: calc(100% - 1.5625rem);
		position: absolute;
		bottom: 6.8750rem;
		padding-bottom: env(safe-area-inset-bottom);
		padding-bottom: constant(safe-area-inset-bottom);
		background-color: #25272B;
		.clone-button{
			position: absolute;
			width: 0.8125rem;
			height: 0.8125rem;
			right: 0.6875rem;
			top:1.0000rem;
		}
		.reward-list-title{
			text-align: center;
			margin-top: 0.9375rem;
			margin-bottom: 0.9375rem;
			font-size: 0.6509rem;
			font-family: Source Han Sans SC, Source Han Sans SC-Bold;
			font-weight: 700;
			color: #FFFFFF;
		}
		.reward-list-team{
			margin-left: 0.6250rem;
			margin-bottom: 0.6250rem;
			margin-right: 0.6250rem;
			display: flex;
			.reward-level{
				width: 0.9688rem;
				height: 1.1250rem;
				margin-top: 0.2813rem;
			}
			.reward-head{
				margin-left: 0.5313rem;
				width: 1.3125rem;
				height: 1.3125rem;
				margin-top: 0.1563rem;
			}
			.reward-name{
				height: 1.6875rem;
				line-height: 1.6875rem;
				margin-left: 0.6875rem;
				font-size: 0.6509rem;
				font-family: Source Han Sans SC, Source Han Sans SC-Bold;
				font-weight: 700;
				color: #FFFFFF;
			}
			.reward-money{
				width: 8.1250rem;
				height: 1.6875rem;
				line-height: 1.6875rem;
				text-align: center;
				background-color: #25272b;
				border-radius: 0.1084rem;
				font-size: 0.6509rem;
				font-family: Source Han Sans SC, Source Han Sans SC-Bold;
				font-weight: 700;
				color: #2AE035;
				margin-left: auto;
				margin-right: 0;
				background-color: #1C1E22;
				border-radius: 0.1084rem;
			}
		}
	}
	
	.red-card{
		width: 18.7500rem;
		height: 31.0313rem;
		background-image: url(@/assets/red/red-background.png);
		background-size: 100%;
		background-repeat: no-repeat;
		position: fixed;
		top: 6.2500rem;
		left: 50%;
		transform: translateX(-50%);
		.open{
			width: 6.7500rem;
			height: 6.7500rem;
			background-color: #e6cea0;
			border-radius: 50%;
			line-height: 6.7500rem;
			text-align: center;
			font-size: 1.2969rem;
			font-weight: 700;
			color: #4C4A45;
			position: absolute;
			bottom: 3.2813rem;
				
			left:50%;
			transform: translateX(-50%);
		}
		.red-user{
			display: flex;
			justify-content: center;
			margin-top: 5.0000rem;
			.red-user-icon{
				width: 2.1563rem;
				height: 2.1563rem;
				// display: none;
			}
			text{
				margin-left: 0.2500rem;
				display: block;
				height: 2.1563rem;
				line-height: 2.1563rem;
				color: #FAE3B7;
				font-size: 1.0313rem;
			}
		}
		.red-int{
			line-height: 2.1563rem;
			color: #FAE3B7;
			font-size: 1.0313rem;
			text-align: center;
			padding: 0 1.8750rem;
		}
	}
</style>
