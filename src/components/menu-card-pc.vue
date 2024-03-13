<template>
	<div class="card-pc">
		<div class="menu-pc" :class="{ 'selected': selected , 'selectedX':selectedX , 'shou' :shou}">
			<div class="menu-pc-left">
				<img class="left-icon" :src="src" alt="">
				<img class="left-icon-h" :src="srcIcon" alt="">
				<span>{{ name }}</span>
			</div>
			<div class="menu-pc-right">
				<div class="num" v-if="num"><span>{{ num }}</span></div>
				<public-svg v-else class="right-icon" :class="{ 'selectedX': selectedX ,'selected': selected }" icon="icon_Arrow"></public-svg>
			</div>
		</div>
		<div class="team-card">
			<slot name="team"></slot>
		</div>
		
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import PublicSvg from '../components/public-svg.vue';

defineProps<{
	name: string;
	src: string;
	srcIcon?:string;
	num?: number,
	selected?: boolean,
	selectedX?:boolean,
	sonList?: Array<{ isSelected: boolean, name: string, icon: string, icon_click: string, url: string }>,
	shou?: boolean
}>()

</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

.card-pc {
	.left-icon-h{
		display: none;
	}

	&:hover{
		.left-icon{
			display: none;
		}
		.left-icon-h{
			display: inline-block;
		}
	}

	.menu-pc {
		margin-top: 8px;
		display: flex;
		justify-content: space-between;
		height: 48px;
		padding: 0 16px;
		align-items: center;
		border-radius: 10px;
		border: 0.0631rem solid #312E63;
		background: #2E2C5E;
		transform: skew(-5deg);

		&:hover {
			background: radial-gradient(70.67% 70.18% at 56.72% 138.26%, rgba(255, 251, 251, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(180deg, #2F2C61 0%, #3C3789 100%);
			.menu-pc-left {
				span {
					color: #0FF;
				}
			}
		}

		&.selected {
			background: radial-gradient(70.67% 70.18% at 56.72% 138.26%, rgba(255, 251, 251, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(180deg, #2F2C61 0%, #3C3789 100%);

			.menu-pc-left {
				span {
					color: #0FF;
				}
			}

			
		}

		&.shou{
			&~.team-card{
				height: auto;
			}
		}

		.menu-pc-left {
			transform: skew(5deg);
			display: flex;
			align-items: center;

			img {
				width: 28px;
				height: 28px;
			}

			span {
				color: #8E90CD;
				text-shadow: 0px 1px 0px #000;
				font-family: PingFang SC;
				font-size: 14px;
				font-style: normal;
				font-weight: 600;
				line-height: normal;

				&.selected {
					color: #0FF;
				}
			}
		}

		.menu-pc-right {
			transform: skew(5deg);

			.right-icon {
				width: 18px;
				height: 18px;
				fill: #6B68A7;

				&.selected {
					fill: #0FF;
				}

				&.selectedX {
					transform: rotate(270deg);
				}
			}

			.num {
				// width: 100px;
				transform: skew(-5deg);
				height: 22px;
				width: 22px;
				// padding: 0 8px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 4px;
				border: 1px solid #9B92FF;
				background: linear-gradient(180deg, #7A6CFF 4.17%, #5B4FF7 100%);
				box-shadow: 0px 1px 2px 0px #1E2151;

				span {
					color: #FFF;
					text-align: center;
					font-family: Montserrat;
					font-size: 12px;
					font-style: normal;
					font-weight: 600;
					line-height: normal;
					transform: skew(5deg);
				}
			}
		}
	}

	.team-card{
		height: 0;
		overflow: hidden;
	}
	.menu-pc-team {
		display: flex;
		align-items: center;
		height: 48px;
		background-color: #1F1C3E;
		padding-left: 52px;
		border-radius: 8px;
		margin-top: 4px;

		img {
			width: 20px;
			height: 20px;
			margin-right: 8px;
		}

		span {
			color: #8E90CD;
			font-family: PingFang SC;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
		}

		&:hover {
			span {
				color: #FAF;
			}

			background: radial-gradient(70.67% 70.18% at 56.72% 138.26%, rgba(255, 251, 251, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%),
			linear-gradient(180deg, #2F2C61 0%, #3C3789 100%);
		}

		&.selected {
			span {
				color: #FAF;
			}

			background: radial-gradient(70.67% 70.18% at 56.72% 138.26%, rgba(255, 251, 251, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%),
			linear-gradient(180deg, #2F2C61 0%, #3C3789 100%);
		}
	}
}</style>