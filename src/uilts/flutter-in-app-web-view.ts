import { reactive } from "vue";
import { cookieDb } from "./db";
import { hint,alert } from "./ui";

let flutter_inappwebview_state = false;

/**
 * 获取的数据  flutter ==> web
 * `{key1:value1,key2:value2,...}`
 */
const flutterGetEventName = 'cookieGet';
/**
 * 发送的数据  web ==> flutter
 * `{key:'key',value:'value'}`
 */
const flutterSetEventName = 'cookieSet';
/**
 * 发送的数据  web ==> flutter
 * `{key:'key'}`
 */
const flutterDeleteEventName = 'cookieDelete';

/**
 * 通信flutter 只发送给flutter数据
 */

const flutterCommunicateName = 'variableSet';

const flutterCommunicateData:FlutterCommunicate = {
    returnKey:0
};
export const flutterCommunicate = reactive(new Proxy<FlutterCommunicate>(flutterCommunicateData, {
	get<K extends keyof FlutterCommunicate>(target:FlutterCommunicate, prop:K) {
		return Reflect.get(target, prop);
	},
	set<K extends keyof FlutterCommunicate>(target:FlutterCommunicate, prop:K, value: FlutterCommunicate[K]) {
		flutterCommunicateData[prop] = value;
        flutterCommunicateSet();
		return Reflect.set(target, prop, value);
	}
}));

const flutterCommunicateSet = () => {
    if(typeof window != 'undefined'){
        try {
            if(flutter_inappwebview_state){
                window.flutter_inappwebview.callHandler(flutterCommunicateName, JSON.stringify(flutterCommunicate));
            }
        } catch (error) {
            hint(error as string)
        }
    }
}

const flutterGet = (callback: (data:string) => void) => {
    if(typeof window != 'undefined'){
        try {
            window.flutter_inappwebview.callHandler(flutterGetEventName).then(function(result: any) {
                callback(result);
            });
        } catch (error) {
            hint(error as string)
        }
    }
}
const flutterSet = (key:string,value:any) => {
    if(typeof window != 'undefined'){
        try {
            window.flutter_inappwebview.callHandler(flutterSetEventName, JSON.stringify({key,value}));
        } catch (error) {
            hint(error as string)
        }
    }
}
const flutterDelete = (key:string) => {
    if(typeof window != 'undefined'){
        try {
            window.flutter_inappwebview.callHandler(flutterDeleteEventName,JSON.stringify({key}));
        } catch (error) {
            hint(error as string)
        }
    }
}

export const appCookieInit = () => {
    if(typeof window != 'undefined'){
        flutterInAppWebViewPlatformReady(function() {
            flutter_inappwebview_state = true;
            flutterGet((ret) => {
                let data = JSON.parse(ret);
                for(let k in data){
                    cookieDb[k as keyof DBModels] = data[k];
                }
            });
            appCookieSet();
            appCookieDelete();
            flutterCommunicateSet();
        })
    }
}
let setKeysValues:Array<{key:string,value:any}> = [];
export const appCookieSet = (key?:string,value?:any) => {
    if(!flutter_inappwebview_state && key){
        setKeysValues.push({key,value});
        return
    }
    if(!setKeysValues.length && key){
        flutterSet(key,value);
        return
    }
    for(let obj of setKeysValues){
        flutterSet(obj.key,obj.value);
    }
    setKeysValues.length = 0;
}

let deleteKeys:Array<string> = [];
export const appCookieDelete = (key?:string) => {
    if(!flutter_inappwebview_state && key){
        deleteKeys.push(key);
        return
    }
    if(!deleteKeys.length && key){
        flutterDelete(key);
        return
    }
    for(let key of deleteKeys){
        flutterDelete(key);
    }
    deleteKeys.length = 0;
}
