

interface AnyObject {
    [key: string]: any;
}
  
type KVInfer<T> = { [K in keyof T]: T[K] };

type Void<T> = T | undefined | null;

type WindowType = "left" | "right";

type WindowStyle = Partial<Record<WindowType, {
    target:string;
    openWidth:string;
    closeWidth:string;
    openHeight?:string;
    closeHeight?:string;
    isOpen:boolean
}>>

interface PageCallBack<T> {
	(param:T):any
}



interface AlertParams {
    title?:string | (() => VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>[]);
    content:string | (() => VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>[]);
    cancelText?:string;
    confirmText?:string;
    showCancel?:boolean;
}