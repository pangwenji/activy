<template>
	<div class="ui-hint" v-if="isPc">
		<div class="ui-pad">
			<div class="hint-content">
				{{ msg }}
			</div>
			<div class="hint-time">
				<svg viewBox="25 25 50 50">
					<circle cx="50" cy="50" r="20" fill="none" stroke-width="8" pathLength="1" stroke-dashoffset="0px"
						stroke-dasharray="0.01px 1px">
						<animate attributeName="stroke-dasharray" from="1px 1px" to="0.01px 1px" dur="3s" begin="0s"
							fill="freeze" />
					</circle>
				</svg>
			</div>
		</div>
	</div>
	<div v-else class="ui-toast">
		<div class="toast-text">{{ msg }}</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { isPc } from '../uilts/async.var';
defineProps<{
	msg: string;
}>();
</script>

<style lang="scss" scoped>
@import "../scss/public.scss";
.ui-toast {
	position: fixed;
	z-index: calc(var(--I4) + 1);
	bottom: 20%;
	left: 50%;
	transform: translate(-50%, 0);
	text-align: center;
	max-width: 80%;

	.toast-text {
		display: inline-block;
		vertical-align: middle;
		color: #ffffff;
		background-color: #1B1A21;
		padding: 10px 20px;
		border-radius: 1.5625rem;
		font-size: 0.75rem;
		text-align: center;
		max-width: 100%;
		word-break: break-all;
		white-space: normal;
		box-shadow: 0px 1.5000rem 1.7937rem 0px rgba(0, 0, 0, 0.42);
	}
}

.ui-hint {
	padding: 0.6250rem;

	.ui-pad {
		padding: 0.9375rem;
		background-color: #31343c;
		border-radius: 0.2500rem;
		box-shadow: 0 0.1250rem 0.3125rem #0003;
		padding-right: 2.5000rem;
		color: #dfe3e6;
		font-size: 0.8750rem;
		position: relative;

		@include pc {
			border-radius: 8px;
			background: linear-gradient(90deg, #008585 0.16%, #FF92FF 99.84%);
		}
	}

	.hint-content {
		width: 100%;
		color: #dfe3e6;
		word-break: break-word;
	}

	.hint-time {
		position: absolute;
		top: 50%;
		right: 1.1250rem;
		width: 1.3750rem;
		height: 1.3750rem;
		margin-top: -0.6875rem;
		border-radius: 50%;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		background-color: rgba(30, 32, 36, .5);

		svg {
			width: 0.9375rem;
			height: 0.9375rem;
			transform: rotate(90deg) scaleX(-1);

			circle {
				stroke: #3BC117;
			}
		}
	}
}
</style>