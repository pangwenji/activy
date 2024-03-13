let gtmIsInit = false;
export const gtmInit = (i: string) => {
    if(gtmIsInit){
        return;
    }
    // console.log('gtm => ' + i);
    gtmIsInit = true;
    let w = window, d = document,s = 'script',l = 'dataLayer';
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0] as HTMLElement,
        j = d.createElement(s) as HTMLScriptElement,
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode?.insertBefore(j, f);
}
let kwaiqIsInit = false;

export const kwaiqInit = (id: string) => {
    if(kwaiqIsInit){
        return;
    }
    // console.log('kwaiq => ' + id);
    kwaiqIsInit = true;
    kwaiq.load(id);
    kwaiq.page();
}