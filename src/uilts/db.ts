import { reactive } from 'vue';
import { appCookieDelete, appCookieSet } from './flutter-in-app-web-view';

const datas:Partial<DBData> = {};

interface JsCookie {
	setCookie(key:string,value:string):void;
	getCookie(key:string):string;
	deleteCookie(key:string):void;
}
/**是 nodejs 环境 */
const isNodeEnv = typeof window === 'undefined';

export const nodejsCookie:JsCookie = {
	setCookie(){},
	getCookie:() => '',
	deleteCookie(){},
};
export const clientCookie:JsCookie = {
	setCookie(key:string,value:string){
		document.cookie = key + '=' + value + ';' + ' path=/';
	},
	getCookie(key:string){
		let name = key + "=";
		let ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		throw 'no-data'
	},
	deleteCookie(key:string){
		document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
	},
};


export const dbSet = <K extends keyof DBModels>(key: K, data: DBModels[K]) : Promise<DBModels[K]> => {
  return new Promise((ok,fail) => {
	try{
		(isNodeEnv ? nodejsCookie : clientCookie).setCookie(key,encodeURIComponent(JSON.stringify([data])));
		// localStorage.setItem(key,JSON.stringify([data]));
		ok(data);
		const listeners = datas[key] as Array<Listener<K>>;
		listeners && listeners.forEach(fn => {
		  fn('set',data);
		})
		appCookieSet(key,data);
	}catch(e){
		fail(e)
	}
  })
};

export const localDbSet = <K extends keyof DBModels>(key: K, data: DBModels[K]) : Promise<DBModels[K]> => {
	return new Promise((ok,fail) => {
	  try{
		//   (isNodeEnv ? nodejsCookie : clientCookie).setCookie(key,encodeURIComponent(JSON.stringify([data])));
		  localStorage.setItem(key,JSON.stringify([data]));
		  ok(data);
		  const listeners = datas[key] as Array<Listener<K>>;
		  listeners && listeners.forEach(fn => {
			fn('set',data);
		  })
	  }catch(e){
		  fail(e)
	  }
	})
  };


export const dbDelete = <K extends keyof DBModels>(key: K) : Promise<boolean> => {
	return new Promise((ok,fail) => {
		try{
			(isNodeEnv ? nodejsCookie : clientCookie).deleteCookie(key);
			// localStorage.removeItem(key);
			ok(true);
			datas[key] && datas[key]?.forEach(fn => {
				fn('delete');
			})
			appCookieDelete(key);
		}catch(e){
			fail(e)
		}
	})
};

export const dbGet = async <K extends keyof DBModels>(key: K) : Promise<DBModels[K]> => {
	return new Promise<DBModels[K]>((success,fail) => {
		try{
			let value = (isNodeEnv ? nodejsCookie : clientCookie).getCookie(key);
			// let value = localStorage.getItem(key)[0];
			
			success(JSON.parse(decodeURIComponent(value))[0]);
		}catch(e){
			fail('no-data')
		}
	})
};

export const localDbGet = async <K extends keyof DBModels>(key: K) : Promise<DBModels[K]> => {
	return new Promise<DBModels[K]>((success,fail) => {
		try{
			// let value = (isNodeEnv ? nodejsCookie : clientCookie).getCookie(key);
			let value = localStorage.getItem(key);
			if(value) success(JSON.parse(decodeURIComponent(value))[0]);
			
			fail('no-data')
		}catch(e){
			fail('no-data')
		}
	})
};

export const addListener = async <K extends keyof DBModels>(key: K, fn: Listener<K>) => {
  let arr: Listener<K>[] = datas[key] as Listener<K>[] || [];
  arr.push(fn);
  datas[key] = arr as Partial<DBData>[K];
};

export const removeListener = async <K extends keyof DBModels>(key: K,fn:Listener<K>) => {
	if(datas[key]){
		let i = (datas[key] as Listener<K>[])?.indexOf(fn) || -1;
		if(i >= 0){
			datas[key]?.splice(i,1);
		}
	}
};

const cookieData:Partial<DBModels> = {};
export const cookieDb = reactive(new Proxy<Partial<DBModels>>(cookieData, {
	get<K extends keyof DBModels>(target: Partial<DBModels>, prop:K):DBModels[K] | undefined {
		if(!target[prop]){
			try{
				let cookiev = (isNodeEnv ? nodejsCookie : clientCookie).getCookie(prop);
				if(cookiev){
					let value = JSON.parse(decodeURIComponent(cookiev));
					cookieData[prop] = value[0];
				}
			}catch(e){
			}
		}
		return Reflect.get(target, prop);
	},
	set<K extends keyof DBModels>(target: Partial<DBModels>, prop:K, value: DBModels[K]) {
		if(value){
			try{
				(isNodeEnv ? nodejsCookie : clientCookie).setCookie(prop,encodeURIComponent(JSON.stringify([value])));
				cookieData[prop] = value;
				const listeners = datas[prop] as Array<Listener<K>>;
				listeners && listeners.forEach(fn => {
					fn('set',cookieData[prop]);
				})
				appCookieSet(prop,value);
			}catch(e){
			}
		}
		return Reflect.set(target, prop, value);
	},
	deleteProperty<K extends keyof DBModels>(target: Partial<DBModels>, prop:K) {
		(isNodeEnv ? nodejsCookie : clientCookie).deleteCookie(prop);
		cookieData[prop] = undefined;
		datas[prop] && datas[prop]?.forEach(fn => {
			fn('delete');
		})
		appCookieDelete(prop);
		return Reflect.deleteProperty(target, prop);
	}
}));