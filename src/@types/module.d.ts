import vue from 'vue'

import * as zhHans from '../locale/zh-Hans.json'
import * as ptBR from '../locale/pt_BR.json'
import type { RouterKeys, OpenDatas, RConfig } from './router.config';


import type { ComponentPublicInstance } from 'vue'

import type { TransitionProps } from '@vue/runtime-dom'



import 'vue-router';



const messages = {
	// en,
	'zh_CN':zhHans,
	'pt_BR':ptBR
}

declare module 'vue-router' {
  interface RouteMeta extends RConfig {
    
  }
 }


declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      /**打开新路由 */
      $open: <A extends RouterKeys>(...arg:OpenDatas<A>) => Promise<void>;
      /**替换当前路由 */
      $onlyOpen: <A extends RouterKeys>(...arg:OpenDatas<A>) => Promise<void>;
      /**返回上一个路由 */
      $back: (e?:number) => void;
      $changeWindow:(t:WindowType) => void;
      $alert:(options:AlertParams) => Promise<void>;
      $fireworks:(event:Event) => void;
      $hint:(msg:string) => void;
      $copy:(msg:string) => void;
      $t: VueI18nTranslation<Messages, Locales, RemoveIndexSignature<{
          [K in keyof DefineLocaleMessage]: DefineLocaleMessage[K];
      }>>
    }
  }