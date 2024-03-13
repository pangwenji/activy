interface Promise<T> {
	abort(): void;
}

declare var dataLayer:Array<{
	'gtm.start'?:number,
	event:string
}>

interface FlutterInAppWebViewPlatformReady {
	(fn:() => void):void;
}
declare var flutterInAppWebViewPlatformReady:FlutterInAppWebViewPlatformReady;

interface Kwaiq {
	alias():void;
	debug():void;
	disableCookie():void;
	enableCookie():void;
	identify():void;
	instance(id:string):Kwaiq;
	instances():void;
	load(id:string,r?:any):void;
	methods:Array<string>;
	off():void;
	on():void;
	once():void;
	page():void;
	ready():void;
	track(type:string):void;
}
declare var kwaiq:Kwaiq;

/**
 * 是否是移动设备
 */
declare var isMobileDevice: boolean;
/**
 * 是否是pwa
 */
declare var isMedia: boolean;
/**
* 设备名称
*/
declare var MediaName: string;
/**
 * 关闭pwa启动屏
 */
declare var closeStartup:() => void;
/**
 * PG游戏对象
 */
declare var PGSDK : {
	launchGame(s:string):void;
}

/**
 * 兼容
 */
declare interface NewActiveXObject{
	sendKeys(s:string):void
}
/**
 * 兼容
 */
declare interface ActiveXObject{
	new (s:string):NewActiveXObject;
}

/**
 * 兼容
 */
declare var ActiveXObject:ActiveXObject;

/**
 * 兼容
 */
declare interface HTMLElement {
	webkitRequestFullscreen(options?: FullscreenOptions): Promise<void>;
	mozRequestFullscreen(options?: FullscreenOptions): Promise<void>;
}

/**
 * 兼容
 */
declare interface HTMLIFrameElement {
	attachEvent(name: string,fn:() => void): Promise<void>;
	onload():void;
}
/**
 * 兼容
 */
declare interface EventTarget {
	scrollingElement:{
		scrollTop:number
	}
}
 
declare interface Location {
	reload(b?:boolean):void
}

declare interface Window {
	[k:string]:any
}

declare interface String {
	OPTIONS<A extends Api>(...args:DataOrHeader<Data<A>>):Promise<RPType<A>>;
	/**
	 * axios.get请求
	 */
	GET<A extends Api>(...args:DataOrHeader<Data<A>>):Promise<RPType<A>>;
	HEAD<A extends Api>(...args:DataOrHeader<Data<A>>):Promise<RPType<A>>;
	/**
	 * axios.post请求
	 */
	POST<A extends Api>(...args:DataOrHeader<Data<A>>):Promise<RPType<A>>;
	PUT<A extends Api>(...args:DataOrHeader<Data<A>>):Promise<RPType<A>>;
	DELETE<A extends Api>(...args:DataOrHeader<Data<A>>):Promise<RPType<A>>;
	TRACE<A extends Api>(...args:DataOrHeader<Data<A>>):Promise<RPType<A>>;
	CONNECT<A extends Api>(...args:DataOrHeader<Data<A>>):Promise<RPType<A>>;
	UP<T>(file:File,data?:AnyObject):Promise<T>;
	VERSION():Promise<string>;
	
	
}
