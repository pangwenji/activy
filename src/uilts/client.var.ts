import { isPc, isPwa, locationHash, locationHref, locationOrigin, platform } from "./async.var";


export const clientInit = () => {
    let u = navigator.userAgent;
    let agent = u.toLowerCase();
    if (/windows/.test(agent)) {
        platform.value = 'windows pc';
    } else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
        platform.value = 'iphone';
    } else if (/ipad/.test(agent) && /mobile/.test(agent)) {
        platform.value = 'ipad';
    } else if (/android/.test(agent) && /mobile/.test(agent)) {
        platform.value = 'android';
    } else if (/linux/.test(agent)) {
        platform.value = 'linux pc';
    } else if (/mac/.test(agent)) {
        platform.value = 'mac';
    } else {
        platform.value = 'other';
    }
    
    isPwa.value = ["fullscreen", "standalone", "minimal-ui"].some((displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches);
    
    isPc.value = (document.documentElement.clientWidth > 9999);

    locationHref.value = location.href;
    locationOrigin.value = location.origin;
    locationHash.value = location.hash;

    // if(isPc.value){
    //     let w = document.documentElement.clientWidth;
    //     document.body.style.width = '1920px';
    //     document.body.style.transform = 'scale('+(w / 1920)+')';
    //     document.body.style.transformOrigin = 'left top';
    //     document.body.style.height = 'auto';
        
    // }else{
    //     document.body.style.width = '';
    //     document.body.style.transform = '';
    //     document.body.style.transformOrigin = '';
    //     document.body.style.height = '';
    // }
}