<template>
	<page close-location="right" title-bg-color="var(--body-background-color)">

		<div class="body page-pading">
			<div class="title">
				{{ $t('pageActivityNew.smdetails') }}
			</div>
		</div>
</page>
</template>

<script setup lang="ts">
	import Page from '../components/page.vue';
</script>

<style lang="scss" scoped>

.body{
	// padding:0.75rem;
	background:#16122F;
}
.title,.title2{
	color: #8E90CD;
	font-size: 0.875rem;
	display:flex;
	align-items: center;
	justify-content:space-between;
	line-height: 1.25rem;
	margin-bottom:0.75rem;
}


</style>