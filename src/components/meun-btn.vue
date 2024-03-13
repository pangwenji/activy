<template>
	<div class="meun-btn">
        <div class="meun-btn-style">
            <div class="meun-content">
            <slot></slot>
        </div>
        </div>
	</div>
</template>

<script setup lang="ts">
</script>
<style>
.meun-content .icon{
    width:1.25rem;
    height:1.25rem;
    margin-right:0.62rem;
}
@media (min-width: 9999px){
	.meun-content .icon{
        width:28px;
        height:28px;
        margin-right:20px;
    }
}
</style>
<style lang="scss" scoped>
.meun-btn{
    height:inherit;
}
    .meun-btn + .meun-btn{
        margin-top:1.13rem;
    }
    .meun-btn-style{
		$skew-deg:8deg;
        display:block;
		background: linear-gradient(180deg,#2F2C61, #3C3789);
		border-radius: 6px;
        fill: radial-gradient(70.67% 70.18% at 56.72% 138.26%, rgba(255, 251, 251, 0.20) 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(180deg, #2F2C61 0%, #3C3789 100%);
        stroke-width: 2px;
        stroke: #312E63;
		transform: skew(-$skew-deg, 0deg) translateX(4px);
        height:inherit;
		color:#FFF;
		font-weight: 600;
		text-shadow: 0px 1px 0px  #4b42e9; 
		font-size:inherit;
		cursor: pointer;
        padding:0 1.25rem;
        margin-right:0.25rem;
		.meun-content{
            display:flex;
            align-items:center;
            height:inherit;
            min-height: 3.125rem;
            color: var(--MENU, #8E90CD);
            text-shadow: 0px 1.3669354915618896px 0px #000;
            font-family: PingFang SC;
            font-size: inherit;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
			transform: skew($skew-deg, 0deg); 
            background:url(@/assets/new/components/meun-btn-right-icon.png) no-repeat right center;
            background-size:1.25rem;
		}
    }

    @media (min-width: 9999px){
        .meun-btn-style{
            padding:0 12px;
		    border-radius: 12px;
            .meun-content{
                background-size:28px;
            }
        }
        .meun-btn + .meun-btn{
            margin-top:36px;
        }
    }
</style>