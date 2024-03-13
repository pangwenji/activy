import { app } from './app.js'
import { router } from './router/routes'
import { nodejsCookie,dbGet,dbSet } from './uilts/db'

import { t } from './uilts/i18n';
import config from './router/config'

import { renderToString } from 'vue/server-renderer';

import { isPc,isPwa,platform,isFirstOpenApp,publicHeadIsShow } from './uilts/async.var';




export async function render(url,globalVariable,cookieObj){
    if(cookieObj){
        nodejsCookie.getCookie = (key) => {
            return cookieObj.getCookie(key)
        }
        nodejsCookie.setCookie = (key,value) => {
            cookieObj.setCookie(key,value)
        }
        nodejsCookie.deleteCookie = (key) => {
            cookieObj.setCookie(key,'; expires=Thu, 01 Jan 1970 00:00:00 GMT')
        }
    }
    if(globalVariable){
        isPc.value = !globalVariable.isMobileDevice;
        isPwa.value = globalVariable.isMedia;
        platform.value = globalVariable.MediaName;
    }
    isFirstOpenApp.value = true;
    publicHeadIsShow.value = true;
    try {
        await dbSet('user',await dbGet('user'))
    } catch (error) {
        
    }
    try {
        await dbSet('token',await dbGet('token'))
    } catch (error) {
        
    }
    try {
        await dbSet('language',await dbGet('language'))
    } catch (error) {
        
    }
    try {
        await dbSet('init',await dbGet('init'))
    } catch (error) {
        
    }
    try {
        await dbSet('msg',await dbGet('msg'))
    } catch (error) {
        
    }
    try {
        await dbSet('unit',await dbGet('unit'))
    } catch (error) {
        
    }
    try {
        await dbSet('moneyCode',await dbGet('moneyCode'))
    } catch (error) {
        
    }
    try {
        await dbSet('usernameLogin',await dbGet('usernameLogin'))
    } catch (error) {
        
    }
    const ctx = {};
    let title = 'PGNEW';
    if(config[globalVariable.title] && config[globalVariable.title].title){
        try {
            title = t(config[globalVariable.title].title);
        } catch (error) {
            title = 'PGNEW';
        }
    }
    await router.push(url);
    await router.isReady();
    const appHtml = await renderToString(app,ctx);
    return { 
        appHtml,
        ctx,
        title
    };
}