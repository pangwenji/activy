<template>
	<div class="block-btn">
		<div class="block-btn-content">
			<div class="slot"><slot></slot></div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
  colors: {
    type: Array,
    default:[]
  }
});
</script>

<style lang="scss" scoped>
@import '../scss/public.scss';

    .block-btn{
		--c1:#626fff;
		--c2:#b4c9ff;
		--c3:#97b9ff;
		--c4:#ffffff;
		--c5:#97b9ff;
		--c6:#b4c9ff;
		--c7:#626fff;

		--c8:rgba(90,136,255,0.30);


		--c9:#4b42e9;
		--c10:#7368ff;
		--c11:#5f6fff;
		--c12:#7084ff;


		--c13:#ffffff;


		--c14:#90ffff;


		

        display:block;
		min-width: 120px;
		height: 30px;
		background: linear-gradient(270deg,var(--c1) 0%, var(--c2) 8%, var(--c3) 15%, var(--c4) 53%, var(--c5) 84%, var(--c6) 90%, var(--c7));
		border-radius: 6px;
		box-shadow: 0px 4px 20px 0px var(--c8);
		transform: skew(-8deg, 0deg) translateX(4px);
		
		color:#FFF;
		font-weight: 600;
		text-shadow: 0px 1px 0px var(--c9); 
		font-size:12px;
		cursor: pointer;
		.block-btn-content{
			display:flex;
			align-items:center;
			justify-content:center;
			width: 100%;
			height:92%;
			background: linear-gradient(180deg,var(--c10), var(--c11) 63%, var(--c12) 100%);
			// border: 1px solid #bae2ff;
			// border-image: linear-gradient(180deg, #b7f2ff, #cae9ff 47%, #bae2ff 100%) 1 1;
			border-radius: inherit;
			box-shadow: 0px 0px 10px 0px var(--c13) inset;
			position: relative;
			// overflow:hidden;

			&::before{
				content:'';
				display:block;
				background:radial-gradient(ellipse at top, var(--c14), transparent 70%);
				background-size:100%;
				position: absolute;
				color:transparent;
				left:0;
				right:0;
				top:0;
				height:100%;
				z-index:calc(var(--I1) + 0);
			}
		}
		.slot{
			transform: skew(8deg, 0deg);
			position: relative;
			z-index:calc(var(--I1) + 0);
			display:flex;
			align-items:center;
			justify-content: center;
			width:100%;
			height:100%;
		}
    }
</style>