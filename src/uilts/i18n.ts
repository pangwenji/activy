
// import * as en_US from "../locale/en_US.json";
// import * as es_ES from "../locale/es_ES.json";
// import * as ja_JP from "../locale/ja_JP.json";
import * as pt_BR from "../locale/pt_BR.json";
// import * as th_TH from "../locale/th_TH.json";
// import * as vi_VN from "../locale/vi_VN.json";
import * as zh_CN from "../locale/zh_CN.json";
import { createI18n } from 'vue-i18n';
const i18n = createI18n({
	// legacy: false,
	fallbackRoot:true,
	globalInjection:true,
	locale: import.meta.env.VITE_APP_LANGUAGE || 'pt_BR',
	messages:{
        // "en_US":en_US,
// "es_ES":es_ES,
// "ja_JP":ja_JP,
"pt_BR":pt_BR,
// "th_TH":th_TH,
// "vi_VN":vi_VN,
"zh_CN":zh_CN
    },
})

export const t = i18n.global.t;

export default i18n

