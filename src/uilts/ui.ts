import { createVNode, Plugin, createApp, h } from 'vue';
import UiModalVue from '../components/ui-modal.vue';
import UiHint from '../components/ui-hint.vue';
import UiActionSheet from '../components/ui-action-sheet.vue';
import UiFireworks from '../components/ui-fireworks.vue';


import type { Component, ComponentOptions, MethodOptions } from 'vue';

import { t } from './i18n';

export const showActionSheet = async <C>(buttons:Array<any>,component?:Component<C>,computedOptions?:ComponentOptions<C>) : Promise<{ tapIndex:number; }> => {
    return new Promise<{ tapIndex:number; }>((ok, _close) => {
        if (typeof window === 'undefined') {
            return createVNode('');
        }
        let rootEl = document.querySelector('#interaction');
        const container = document.createElement('div');
        const app = createApp(
            {
                render() {
                    return h<any>(
                        component || UiActionSheet,
                        {
                            isShow:true,
                            closeAfter(){
                                app.unmount();
                                container.remove();
                            },
                            selectOk: function(data: { selectedIndex: number; }){
                                ok({tapIndex:data.selectedIndex})
                            },
                            buttons:typeof buttons[0] != 'string' ? buttons : buttons.map(txt => ({
                                text: txt,
                                color: false,
                                bold: false,
                                disable: false,
                                label: false,
                                handle: function(data: { selectedIndex: number; }){
                                    ok({tapIndex:data.selectedIndex})
                                }
                            })),
                            ...computedOptions,
                        }
                    );
                }
            }
        );
        rootEl?.appendChild(container);
        app.mount(container);
    })
};

export const hint = (msg: string):Promise<void> =>  {
    return new Promise<void>((ok, close) => {
        if (typeof window === 'undefined') {
            return close();
        }
        let rootEl = document.querySelector('#interaction');
        const container = document.createElement('div');
        container.className = "ui-hint-root";
        const app = createApp(
            {
                render() {
                    setTimeout(() => {
                        app.unmount();
                        container.remove();
                        ok();
                    },3000)
                    return h<any>(
                        UiHint,
                        {
                            msg: msg
                        }
                    );
                }
            }
        );
        rootEl?.appendChild(container);
        app.mount(container);
    });
};
function getDistanceToScreen(element:HTMLElement) {
    const rect = element.getBoundingClientRect();
    const scrollLeft = document.documentElement.scrollLeft;
    const scrollTop = document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        width:rect.width,
        height:rect.height,
    };
  }
export const fireworks = (event:Event,options?:{
    money?:string;
    animationend:(e:Event) => void
}) => {
    if (typeof window === 'undefined') {
        return createVNode('');
    }

    let el = getDistanceToScreen(event.target as HTMLElement);

    let x = (event as MouseEvent).x || el.left + el.width / 2 || 0;
    let y = (event as MouseEvent).y || el.top + el.height / 2 || 0;
    // if(document.documentElement.clientWidth > 600) {
    //     x -= (document.documentElement.clientWidth - 600)/2
    // }

    if (window?.innerWidth > 600) {
        const leftPostion = (document.querySelector('#app') as HTMLElement).getBoundingClientRect().left
        x -= leftPostion
    }
    
    let rootEl = document.querySelector('#interaction') as HTMLDivElement;
    const container = document.createElement('div');
    const app = createApp(
        {
            render() {
                return h<any>(
                    UiFireworks,
                    {
                        x,
                        y,
                        money:options && options.money,
                        animationend:() => {
                            app.unmount();
                            container.remove();
                            if(options){
                                options.animationend && options.animationend(event);
                            }
                        }
                    }
                );
            }
        }
    );
    rootEl?.appendChild(container);
    app.mount(container);
};


export const alert = <C>(options: AlertParams,component?:Component<C>,computedOptions?:ComponentOptions<C>): Promise<void> => {
    return new Promise((ok, close) => {
        if (typeof window === 'undefined') {
            close();
        }
        let rootEl = document.querySelector('#interaction');
        const container = document.createElement('div');
        container.className = "ui-modal-root";
        let option:Partial<Pick<AlertParams,'title'|'content'>> = {};
        let slot:Partial<Pick<AlertParams,'title'|'content'>> = {};
        if(typeof options.title === 'string'){
            option.title = options.title;
        }else{
            slot.title = options.title;
        }
        if(typeof options.content === 'string'){
            option.content = options.content;
        }else{
            slot.content = options.content;
        }

        const app = createApp(
            {
                render() {
                    return h<any>(
                        component || UiModalVue,
                        {
                            title:option.title,
                            content:option.content,
                            showCancel:options.showCancel,
                            cancelText: options.cancelText || t('ui.uniShowModalCancelText'),
                            confirmText: options.confirmText || t('ui.uniShowModalConfirmText'),
                            onClose() {
                                app.unmount();
                                container.remove();
                                close('close');
                                document.body.style.overflow = 'auto';
                            },
                            onOk() {
                                app.unmount();
                                container.remove();
                                document.body.style.overflow = 'auto';
                                ok();
                            },
                            ...computedOptions
                        },
                        {
                            title:slot.title,
                            content:slot.content,
                        }
                    );
                }
            }
        );
        rootEl?.appendChild(container);
        app.mount(container);
        document.body.style.overflow = 'hidden';
    })
};



const AlertPlugin: Plugin = {
    install(app) {
        app.config.globalProperties.$alert = alert;
        app.config.globalProperties.$hint = hint;
        app.config.globalProperties.$showActionSheet = showActionSheet;
        app.config.globalProperties.$fireworks = fireworks;
    },
};
export default AlertPlugin;