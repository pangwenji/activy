<template>
	<view class="btn" v-if="isPc && !isDown" @click="addToHomeScreen()">
		<slot></slot>
	</view>
	<a class="btn" v-else-if="isDown && !isPwa && (platform === 'ios' ? iosUrl : androidUrl)" download
		:href="platform === 'ios' ? iosUrl : androidUrl" @click="downStatistics()">
		<slot></slot>
	</a>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { androidUrl, deferredPrompt, iosUrl, isDown, isPc, isPwa, locationOrigin, platform } from '../uilts/async.var';

// const iosUrl = ref('');
// const androidUrl = ref('');
const downStatistics = () => {
	"/api/public/downLoadRecord".POST<Statistics>({
		version: '',
		download_url: locationOrigin.value,
		source: isPwa.value ? 'PWA' : 'WEB',
		app_url: platform.value === 'ios' ? iosUrl.value : androidUrl.value
	})
}

onMounted(() => {
	if (!androidUrl.value || !iosUrl.value) {
		"/api/public/getAppLeastVersion".GET<GetAppLeastVersion>().then(ret => {
			androidUrl.value = ret.android.url;
			iosUrl.value = ret.ios.url;
			if (!isPc.value) {
				if (platform.value === 'ios') {
					isDown.value = iosUrl.value ? true : false
				} else {
					isDown.value = androidUrl.value ? true : false
				}
			}
		})
	}
	
	if (!isPc.value) {
		if (platform.value === 'ios') {
			isDown.value = iosUrl.value ? true : false
		} else {
			isDown.value = androidUrl.value ? true : false
		}
	}

})

const addToHomeScreen = () => {
	if(deferredPrompt.value){
		deferredPrompt.value.prompt();
		deferredPrompt.value.userChoice.then(function (choiceResult: { outcome: string; }) {
			if (choiceResult.outcome === 'accepted') {

			} else {

			}
			deferredPrompt.value = null;
		});
	}else{
		const link = document.createElement('a');
		link.href = androidUrl.value;
		link.setAttribute('download','');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}
</script>

<style lang="scss" scoped>
.btn {
	text-decoration: none;
}
</style>