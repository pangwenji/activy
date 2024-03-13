/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BAES_URL:string;
    readonly VITE_APP_WS_URL:string;
    readonly VITE_APP_GAME_URL:string;
    readonly VITE_APP_AES_KEY:string;
    readonly VITE_APP_DEVELOPMENT:"1" | "0";
    readonly VITE_APP_LANGUAGE:"en_US" | "es_ES" | "ja_JP" | "pt_BR" | "th_TH" | "vi_VN" | "zh_CN";
    readonly VITE_APP_BAES_ROUTER:string;
}
interface ImportMeta {
    readonly env:ImportMetaEnv;
}
