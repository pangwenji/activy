import { createSSRApp,defineComponent } from 'vue';
import App from './App.vue';
import i18n from './uilts/i18n';
import ui from './uilts/ui';
// import './uilts/request';
import {dbGet,addListener} from './uilts/db';

import { router,open,back,changeWindow,onlyOpen } from './router/routes';
import { copy } from './uilts/base';
import lazyPlugin from 'vue3-lazy'

import errorIcon from '@/assets/logoyouxi.png'


export const app = createSSRApp(App);


if(!import.meta.env.VITE_APP_LANGUAGE){
	dbGet('language').then(name => {
		i18n.global.locale = import.meta.env.VITE_APP_LANGUAGE || name;
	}).catch(() => {
		i18n.global.locale = import.meta.env.VITE_APP_LANGUAGE || 'pt_BR';
	})
	
	addListener('language',(type,name) => {
		if(type === 'set'){
			i18n.global.locale = import.meta.env.VITE_APP_LANGUAGE || name;
		}
	})
}




const tags = [
	'page-content',
	'page-view',
	'view',
]
app.config.compilerOptions.isCustomElement = (tag) => tags.includes(tag);

app.mixin(defineComponent({
    methods: {
        $open:open,
        $back:back,
		$onlyOpen:onlyOpen,
        $copy:copy,
        $changeWindow:changeWindow
    },
}))


app.use(lazyPlugin, {
	loading: errorIcon, // 图片加载时默认图片
	error: errorIcon// 图片加载失败时默认图片
});

app.use(ui);

app.use(router);

app.use(i18n);

