import { App } from "vue";
import { androidUrl, deferredPrompt, iosUrl, isIOS, isPwa, locationOrigin } from "./async.var";
import { t } from "./i18n";
import { hint } from "./ui";

interface TimeInterface {
	[k : string] : number,
}
type year = 'yyyy-MM-dd';
type time = 'hh:mm:ss';
export type Fmt = year | time | `${year} ${time}`;
export const format = (date : Date, fmt : Fmt | string) : string => {
	let o : TimeInterface = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S": date.getMilliseconds()
	}, str : string = fmt.toString();
	if (/(y+)/.test(fmt)) {
		str = str.replace(/(y+)/, (_, p1) => date.getFullYear().toString().substring(4 - p1.length));
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(str)) {
			str = str.replace(new RegExp("(" + k + ")"), (_, p1) => {
				return p1.length === 1 ? String(o[k]) : ("00" + o[k]).toString().substring(String(o[k]).length); 
			});
		}
	}
	return str;
};



export const randomString = (length : number) : string => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}

export const randomHabitString = (characters : string, length : number) : string => {
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}

export const lang = import.meta.env.VITE_APP_LANGUAGE || 'pt_BR'

export let tab = 'index'

export const copy = (text:string,hintString?:string) => {
	if (typeof window === 'undefined') {
		return
	}
	if (navigator.clipboard) {
		// clipboard api 复制
		navigator.clipboard.writeText(text);
	} else {
		let textarea = document.createElement('textarea');
		document.body.appendChild(textarea);
		// 隐藏此输入框
		textarea.style.position = 'fixed';
		textarea.style.clip = 'rect(0 0 0 0)';
		textarea.style.top = '10px';
		// 赋值
		textarea.value = text;
		// 选中
		textarea.select();
		// 复制
		document.execCommand('copy', true);
		// 移除输入框
		document.body.removeChild(textarea);
	}
	hint(hintString || t('pageCofferPass.copy'))
}



interface KeyboardListener {
	[k:string]:{
		keydown(event ?: KeyboardEvent):void;
		keyup(event ?: KeyboardEvent):void;
	}
}

const keyboardListener:KeyboardListener = {};

export const bindKeyboard = (eventKey:string,fn:(event?:KeyboardEvent) => void) : string => {
	let isPress = false;
	const key:string = randomString(32);
	keyboardListener[key] = {
		keydown(event ?: KeyboardEvent) {
			if (!event || event.key === eventKey) {
				isPress = true;
			}
		},
		keyup(event ?: KeyboardEvent){
			if ((!event || event.key === eventKey) && isPress) {
				fn();
				isPress = false;
			}
		},
	}
	document.addEventListener('keydown', keyboardListener[key].keydown);
	document.addEventListener('keyup', keyboardListener[key].keyup);
	return key;
}

export const removeKeyboard = (key:string) : void => {
	if(key && keyboardListener[key]){
		document.removeEventListener('keydown', keyboardListener[key].keydown);
		document.removeEventListener('keyup', keyboardListener[key].keyup);
	}
}



export const downStatistics = () => {
	"/api/public/downLoadRecord".POST<Statistics>({
		version: '',
		download_url: locationOrigin.value,
		source: isPwa.value ? 'PWA' : 'WEB',
		app_url: isIOS.value ? iosUrl.value : androidUrl.value
	})
}

export const addToHomeScreen = () => {
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
export const notification = async (title:string,options?:NotificationOptions) => {
	if(Notification.permission !== 'granted'){
		await Notification.requestPermission();
	}
	if(Notification.permission === 'granted'){
		const notf = new Notification(title,options);
		notf.addEventListener('click',() => {
			// console.log('点了通知')
		})
	}
}
export const isAsyncFunction = (fn:any) => fn[Symbol.toStringTag] === 'AsyncFunction';

export const getRandomInt = (start:number,end:number) => Math.floor(Math.random() * end) + start;


export const hiddenNumbers = (n:string | number) => {
	let s = n.toString();
	if(s.length > 4){
		return `**** **** **** ${s[s.length - 4]}${s[s.length - 3]}${s[s.length - 2]}${s[s.length - 1]}`
	}else{
		return s;
	}
}

export const registerDirectives = (app: App) => {
    app.directive('click-outside', {
      mounted (el: any, bindings: any) {
        el.handler = function (e: any) {
          if (!el.contains(e.target)) {
            bindings.value(e)
          }
        }
        document.addEventListener('click', el.handler, true)
      },
      unmounted (el: any) {
        document.removeEventListener('click', el.handler)
      }
    })
  }

