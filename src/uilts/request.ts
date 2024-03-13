import axios from 'axios'
import { hint } from './ui'
import { t } from './i18n'
import { addListener, dbDelete, dbGet } from './db'
import { lang } from './base'
import { decrypt, encrypt } from './crypto'
import { appData, rootQuery } from './async.var'
import { back, open } from '../router/routes'

Promise.prototype.abort = function () {}

const errorHideHintList = [import.meta.env.VITE_APP_BAES_URL + '/api/activity/checkWhetherRainOfMoney']

axios.interceptors.request.use((config) => {
  if (!/^https?:/.test(config.url!)) {
    config.url = import.meta.env.VITE_APP_BAES_URL + config.url
  }
  return config
})

const getValue = async (it: AnyObject) => {
  it = it instanceof Promise ? await it : typeof it === 'function' ? await it() : it
  if (typeof it === 'object' && it) {
    for (let k in it) {
      it[k] = await getValue(it[k])
    }
  }
  return it
}

const filterObj = (obj?: AnyObject): AnyObject | undefined => {
  if (obj) {
    for (let k in obj) {
      if (obj[k] === undefined) {
        delete obj[k]
      } else if (typeof obj[k] === 'object' && obj[k]) {
        obj[k] = filterObj(obj[k])
      }
    }
    return obj
  }
}

const request = function <A extends Api>(
  url: string,
  method: Method,
  data?: RQType<A>,
  header?: HeaderstType<A>,
): Promise<RPType<A>> {
  const controller = new AbortController()
  const pro = new Promise<RPType<A>>(async (success, fail) => {
    let headers: any
    let datas: any
    headers = await getValue(header || {})
    datas = await getValue(data || {})
    try {
      // console.log(await dbGet('language'))

      headers['Accept-Language'] = (await dbGet('language')) || import.meta.env.VITE_APP_LANGUAGE
    } catch (e) {
      headers['Accept-Language'] = lang
    }
    // if(appData.development){
    // 	headers['Accept-Development'] = appData.development;
    // }
    if (method === 'GET') {
      let d = new Date()
      let time = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:00`
      // console.log(time);

      const timestamp = new Date(time).getTime() / 1000
      datas['timestamp'] = Math.floor(timestamp)
    }

    // document.body.style.cursor = 'progress';
    let options: {
      signal: AbortSignal
      data?: AnyObject
      params?: AnyObject
      method: string
      url: string
      headers?: AnyObject
    } = {
      method: method.toLocaleLowerCase(),
      url: url,
      headers: filterObj(headers),
      signal: controller.signal,
    }

    if("POST" === method){
			let d = {...rootQuery.value,...datas};
			options.data = appData.development ? filterObj(d) : {
				iv:encrypt(JSON.stringify(filterObj(d)))
			};
		}else{
			let d = {...rootQuery.value,...datas};
			options.params = appData.development ? filterObj(d) : {
				iv:encrypt(JSON.stringify(filterObj(d)))
			};
		}
    axios(options)
      .then(async (args) => {
        try {
          let rdata: ResponseData<A> = appData.development
            ? args.data
            : JSON.parse((args.data && decrypt(args.data['iv'])) || '{}')
          if (args.status === 200 && rdata.code === 200) {
            success(rdata.data)
          } else {
            if (args.status === 502) {
              hint(t('ui.network'))
            } else {
              // 红包雨活动没开始 不需要弹窗
              if (!errorHideHintList.includes(args.config.url as string)) {
                hint((rdata.message || args.status).toString())
              }

              if (args.status === 1001) {
                await dbDelete('user')
                await dbDelete('token')
              }
            }
            fail(rdata.message || args.status)
          }
        } catch (e) {
          fail(e)
        }
      })
      .catch(async (err) => {
        try {
          if (err.response.data.code === 401 || err.response.data.code === 1001) {
            await dbDelete('user')
            await dbDelete('token')
          }
          if (err.response && err.response.data && err.response.data.message) {
            fail(err.response.data.message)
            hint(err.response.data.message)
          } else {
            // hint(t('ui.network'));
            // hint(typeof err === 'object' ? JSON.stringify(err) + url : err + url);
            fail(typeof err === 'object' ? JSON.stringify(err) : err)
          }
        } catch (error) {
          fail(error)
        }
      })
  })
  pro.abort = () => controller.abort()
  return pro
}

String.prototype.GET = function <A extends Api>(...args: DataOrHeader<Data<A>>) {
  return request<A>(this as string, 'GET', args[0] as RQType<A>, args[1] as HeaderstType<A>)
}
Object.defineProperty(String.prototype, 'GET', {
  writable: false,
  configurable: false,
  enumerable: false,
})

String.prototype.POST = function <A extends Api>(...args: DataOrHeader<Data<A>>) {
  return request<A>(this as string, 'POST', args[0] as RQType<A>, args[1] as HeaderstType<A>)
}
Object.defineProperty(String.prototype, 'POST', {
  writable: false,
  configurable: false,
  enumerable: false,
})

String.prototype.OPTIONS = function <A extends Api>(...args: DataOrHeader<Data<A>>) {
  return request<A>(this as string, 'OPTIONS', args[0] as RQType<A>, args[1] as HeaderstType<A>)
}
Object.defineProperty(String.prototype, 'OPTIONS', {
  writable: false,
  configurable: false,
  enumerable: false,
})

String.prototype.HEAD = function <A extends Api>(...args: DataOrHeader<Data<A>>) {
  return request<A>(this as string, 'HEAD', args[0] as RQType<A>, args[1] as HeaderstType<A>)
}
Object.defineProperty(String.prototype, 'HEAD', {
  writable: false,
  configurable: false,
  enumerable: false,
})
String.prototype.PUT = function <A extends Api>(...args: DataOrHeader<Data<A>>) {
  return request<A>(this as string, 'PUT', args[0] as RQType<A>, args[1] as HeaderstType<A>)
}
Object.defineProperty(String.prototype, 'PUT', {
  writable: false,
  configurable: false,
  enumerable: false,
})
String.prototype.DELETE = function <A extends Api>(...args: DataOrHeader<Data<A>>) {
  return request<A>(this as string, 'DELETE', args[0] as RQType<A>, args[1] as HeaderstType<A>)
}
Object.defineProperty(String.prototype, 'DELETE', {
  writable: false,
  configurable: false,
  enumerable: false,
})
String.prototype.TRACE = function <A extends Api>(...args: DataOrHeader<Data<A>>) {
  return request<A>(this as string, 'TRACE', args[0] as RQType<A>, args[1] as HeaderstType<A>)
}
Object.defineProperty(String.prototype, 'TRACE', {
  writable: false,
  configurable: false,
  enumerable: false,
})
String.prototype.CONNECT = function <A extends Api>(...args: DataOrHeader<Data<A>>) {
  return request<A>(this as string, 'CONNECT', args[0] as RQType<A>, args[1] as HeaderstType<A>)
}

Object.defineProperty(String.prototype, 'CONNECT', {
  writable: false,
  configurable: false,
  enumerable: false,
})
String.prototype.UP = function (file: File, data?: AnyObject) {
  const formData = new FormData()
  if (data) {
    for (let key in data) {
      formData.append(key, data[key])
    }
  }
  formData.append('file', file)
  return axios({
    url: this as string,
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

Object.defineProperty(String.prototype, 'UP', {
  writable: false,
  configurable: false,
  enumerable: false,
})
String.prototype.VERSION = async function () {
  return await (
    await window.fetch(window.location.origin + (this as string) + (import.meta.env.VITE_APP_BAES_ROUTER || ''), {
      credentials: 'omit',
    })
  ).text()
}

Object.defineProperty(String.prototype, 'VERSION', {
  writable: false,
  configurable: false,
  enumerable: false,
})

export { request }
