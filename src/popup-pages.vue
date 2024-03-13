<script setup lang="ts">
import { ref } from "vue";
import { back, noKeepAlivePage } from "./router/routes";
import { bindKeyboard, removeKeyboard } from "./uilts/base";
import { isPc } from "./uilts/async.var";
let keyboardKey = ref('');

const routerMounted = () => {
    keyboardKey.value = bindKeyboard("Escape", () => {
        back();
    })
}

</script>

<template>
    <router-view v-slot="{ Component, route }" name="modal">
        <transition name='opacity'>
            <keep-alive :exclude="noKeepAlivePage">
                <div v-if="(Component && isPc) || route.meta.mobilePopupStyle"
                 class="mask" @click="route.meta.popupBack ? $back() : () => {}"></div>
            </keep-alive>
        </transition>
        <transition v-bind="route.meta.transition">
			
			<keep-alive :exclude="noKeepAlivePage">
                <component :style="isPc ? (route.meta.popupStyle || {
                    height: '78vh',
                    width: '375px'
                }) : (route.meta.mobilePopupStyle || {
                    height: 'calc(100% - var(--download-height))',
                    width: '100%',
                    top:'var(--download-height)'
                })" :is="Component" @vue:mounted="routerMounted" @vue:unmounted="removeKeyboard(keyboardKey)" />
            </keep-alive>
        </transition>
    </router-view>
</template>


<style lang="scss" scoped>
.mask.hidden {
    opacity: 0;
    pointer-events: none;
}
</style>