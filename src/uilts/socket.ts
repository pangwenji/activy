import { reactive } from 'vue';
import { dbGet, addListener, removeListener, dbDelete } from './db';
import { t } from './i18n';
import { back } from '../router/routes';
import { alert } from '../uilts/ui';
import { notification } from './base';
import logo from '@/assets/logo.png';
import { noticeArray } from './async.var';


const WS_URL = import.meta.env.VITE_APP_WS_URL

let soket: WebSocket;
let interval: NodeJS.Timeout;

const sendList: Array<string> = [];



interface SoketData {
	/**
	 * 系统公告
	 */
	get_system_notice: boolean,
	/**
	 * 最新下注
	 */
	get_game_bet_recent: Array<any>,
	/**
	 * 豪客赛最新下注
	 */
	get_hks_recent: Array<any>,
	/**
	 * 最新胜利
	 */
	get_win_recent: Array<any>,
	/**
	 * 异地登录
	*/
	other_places_login: number,
	/**
	 * 是否有新消息
	*/
	new_user_message : number ,
	/** 活动可领取数量 */
	activity_receive_count: {
		activity_count: number;
		invite_count: number;
		is_today_sign: number;
	}
}
const soketData = reactive<SoketData>({
	/**
	 * 系统公告
	 */
	get_system_notice: false,
	/**
	 * 最新下注
	 */
	get_game_bet_recent: [],
	/**
	 * 豪客赛最新下注
	 */
	get_hks_recent: [],
	/**
	 * 最新胜利
	 */
	get_win_recent: [],
	/**
	 * 异地登录
	*/
	other_places_login: 0,
	/**
	 * 是否有新消息
	*/
	new_user_message : 0 ,
	activity_receive_count: {
		activity_count: 0,
		invite_count: 0,
		is_today_sign: 1,
	}
})

type SDATA = Omit<Omit<SoketData, "get_system_notice">, "other_places_login" | "new_user_message" | "activity_receive_count">;

const max100 = <K extends keyof SDATA>(key: K, value?: Array<any>) => {
	if(value){
		if (soketData[key].length >= 100) {
			soketData[key].splice(soketData[key].length - value.length)
		}
		soketData[key] = value.concat(soketData[key]);
	}
}

let timer: NodeJS.Timeout;
const listenerToken = (type: ListenerType, token?: string) => {
	closeSocket(() => {
		try {
			soket = new WebSocket(type === 'set' ? (WS_URL + '?token=' + token) : WS_URL);
			interval = setInterval(() => {
				soket.send('ping')
			}, 5000)
			sendList.forEach(data => {
				sendMessage(data)
			})
			sendList.length = 0;
		} catch (error) {
			clearTimeout(timer)
			timer = setTimeout(() => {
				closeSocket(webSoketInit);
			}, 5000)
		}
		soket.onopen = (_event) => {
			if (soketData.get_game_bet_recent.length === 0) {
				sendMessage(JSON.stringify({
					event: 'get_game_bet_recent'
				}))
			}
			if (soketData.get_hks_recent.length === 0) {
				sendMessage(JSON.stringify({
					event: 'get_hks_recent'
				}))
			}
			if (soketData.get_win_recent.length === 0) {
				sendMessage(JSON.stringify({
					event: 'get_win_recent'
				}))
			}
			sendMessage(JSON.stringify({
				event: 'new_user_message'
			}))
		}
		soket.addEventListener("error", function (_event) {
			clearTimeout(timer)
			timer = setTimeout(() => {
				closeSocket(webSoketInit);
			}, 5000)
		});
		soket.onclose = function (event) {
			if (event.code !== 1000) {
				clearTimeout(timer)
				timer = setTimeout(() => {
					closeSocket(webSoketInit);
				}, 5000)
			}
		};

		soket.addEventListener("message", function (res) {
			
			if (res.data == 'Opened' || res.data == 'pong') return
			let resJson: {
				event: string,
				data: Array<any>
			} = JSON.parse(res.data)
			if ('get_system_notice' === resJson.event) {
				soketData.get_system_notice = true;
				return
			}
			if ('other_places_login' === resJson.event) {
				// soketData.other_places_login = 1;
				dbDelete('user');
				dbDelete('token');
				alert({
					title: t('ui.uniShowModalTitle'),
					content: t('ui.otherPlacesLogin'),
					showCancel: false,
				}).then((_e) => {
					back(-1)
				})
				return
			}
			if ('new_user_message' === resJson.event) {
				soketData.new_user_message = resJson.data as unknown as number;
				return
			}
			//埋点
			if('recharge_event' === resJson.event) {
				let resData :{ current_recharge_num: number } = resJson.data as unknown as { current_recharge_num: number }
				
				if(resData.current_recharge_num  === 1){
					// dataLayer.push({ 'event': 'first_recharge' });
					// kwaiq.instance(localStorage.getItem("kwaiq")).track('contentView')
					// #ifdef H5
					try {
						dbGet('kwaiq').then(kwaiqId => {
							kwaiq.instance(kwaiqId).track('contentView')
						})
						dataLayer.push({'event':'first_recharge'});
					} catch (error) {
									
					}
					// #endif
				}
				if(resData.current_recharge_num > 1){
					// dataLayer.push({ 'event': 'again_recharge' });
					// kwaiq.instance(localStorage.getItem("kwaiq")).track('placeOrder')
					// #ifdef H5
					try {
						dbGet('kwaiq').then(kwaiqId => {
							kwaiq.instance(kwaiqId).track('placeOrder')
						})
						dataLayer.push({'event':'again_recharge'});
					} catch (error) {
									
					}
					// #endif
				}
				return
			}
			if('activity_receive_count' === resJson.event){
				soketData.activity_receive_count = resJson.data as unknown as {
					activity_count: number;
					invite_count: number;
					is_today_sign: number;
				};
				return
			}
			if (resJson.event in soketData && Array.isArray(resJson.data)) {
				if('get_win_recent' === resJson.event){
					resJson.data.forEach(v => {
						noticeArray.value.push(t('socketPage.t1')+v.game_user+t('socketPage.t2')+v.game_name+t('socketPage.t3')+v.game_unit+v.game_profit)
					})
					
				}
				max100(resJson.event as keyof SDATA, resJson.data)
			}
		});
	});
}

const webSoketInit = () => {
	// notification('通知',{
	// 	body: 'body',
	// 	// icon: logo,
	// 	image:logo,
	// });
	addListener('token', listenerToken)
	dbGet('token').then(token => {
		listenerToken('set', token)
	}).catch(() => {
		listenerToken('delete')
	})
}

const sendMessage = (data: string) => {
	if (soket) {
		soket.send(data);
	} else {
		sendList.push(data);
		webSoketInit();
	}
}
const closeSocket = (fn?: Function) => {
	removeListener('token', listenerToken);
	interval && clearInterval(interval);
	if (soket) {
		soket.close(1000)
		fn && fn();
	} else {
		fn && fn();
	}
};


export {
	closeSocket, sendMessage, soketData, webSoketInit
};