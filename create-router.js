import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const toAbsolute = p => path.resolve(__dirname,p);

const deep = (dir) => {
    let list = [];
    fs
    .readdirSync(toAbsolute(dir))
    .forEach(file => {
        const itemPath = toAbsolute(`${dir}/${file}`);
        const isDir = fs.statSync(itemPath).isDirectory();
        if(isDir){
            deep(toAbsolute(`${dir}/${file}`)).forEach(item => {
                list.push(toAbsolute(`${item}`))
            })
        }else{
            list.push(toAbsolute(`${dir}/${file}`))
        }
    });
    return list;
}


const readFile = (url) => {
    return new Promise((resolve, reject) => {
        fs.readFile(url, (err, data) => {
            if(err){
                reject(err);
            }else{
                resolve(data.toLocaleString());
            }
        })
    })
}

const writeFile = (url, data,) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(url, data, (err) => {
            if(err){
                reject(err);
            }else{
                resolve();
            }
        })
    })
}

const routes = fs
.readdirSync(toAbsolute('src/pages'))
.map(file => {
    const name = file.replace(/\.vue$/,'');
    return name === 'index' ? '/' : `/${name}`;
})

writeFile(toAbsolute('src/@types/router.config.d.ts'),`
import type { TransitionProps } from '@vue/runtime-dom'
import type { StyleValue } from 'vue'
export type RouterKeys = ${routes.map(k => `"${k}"`).join(' | ')};
export interface RConfig {
    /**
     * 路由动画 Transition 组件属性
     */
    transition?:TransitionProps;
    /**
     * 在pc打开是否是弹窗
     */
    pcIsPopup?:boolean;
    /**
     * 页面标题
     */
    title?:string;
    /**
     * 不需要登陆？
     */
    unlogin?:boolean;
    /**
     * 弹窗样式
     */
    popupStyle?:StyleValue;
    /**
     * 在手机打开样式
    */
    mobilePopupStyle?:StyleValue;
    /**
     * 不使用缓存
     */
    noKeepAlive?:boolean;
    /**
     * 弹窗遮罩层是否可以关闭页面
     */
    popupBack?:boolean;
}
export type RouterConfigs = Partial<Record<RouterKeys, RConfig>>;

export interface RouterTabs {
    
    /**
     * tab 默认图标
     */
    icon:string;
    /**
     * tab 跳转地址
     */
    path:RouterKeys;
    /**
     * tab 选中图标
     */
    iconClick?:string;
    /**
     * tab 名称
     */
    name?:string;
}

export type HaveData<K> = [url:K,data:PageData[K]];
export type NoData<K> = [url:K];
export type OpenDatas<K> = K extends keyof PageData ? HaveData<K> : NoData<K>
`)
