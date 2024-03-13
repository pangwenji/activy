<template>
	<page>
		<div class="page-pading">
			<text class="tips">
				{{ $t('pageMenuSignRule.r1') }}

			</text>
			<text class="tips">
				{{ $t('pageMenuSignRule.r2') }}

			</text>
			<text class="tips">
				{{ $t('pageMenuSignRule.r3') }}

			</text>
			<text class="tips">
				{{ $t('pageMenuSignRule.r4') }}

			</text>
			<text class="tips">
				{{ $t('pageMenuSignRule.r5') }}

			</text>
			<text class="tips">
				{{ $t('pageMenuSignRule.r6') }}

			</text>
		</div>

	</page>
</template>

<script setup lang="ts">
import Page from "../components/page.vue"
</script>

<style lang="scss" scoped>
.container {
	border-top: 0.0313rem solid #2C2F34;
	// padding-top: 0.6250rem;
}

.tips {
	display: block;
	font-size: 0.7813rem;
	color: #808185;
	padding: 0 0 0.6250rem;

	.tips-title {
		display: block;
	}
}
</style>
