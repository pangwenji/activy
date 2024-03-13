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

const languages = fs
.readdirSync(toAbsolute('src/locale'))
.map(file => file.replace(/\.json$/,''))

writeFile(toAbsolute('src/@types/vite-env.d.ts'),`/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BAES_URL:string;
    readonly VITE_APP_WS_URL:string;
    readonly VITE_APP_GAME_URL:string;
    readonly VITE_APP_AES_KEY:string;
    readonly VITE_APP_DEVELOPMENT:"1" | "0";
    readonly VITE_APP_LANGUAGE:${languages.map(k => `"${k}"`).join(' | ')};
    readonly VITE_APP_BAES_ROUTER:string;
}
interface ImportMeta {
    readonly env:ImportMetaEnv;
}
`)

writeFile(toAbsolute('src/uilts/i18n.ts'),`
${languages.map(k => `import * as ${k} from "../locale/${k}.json";`).join('\n')}
import { createI18n } from 'vue-i18n';
const i18n = createI18n({
	// legacy: false,
	fallbackRoot:true,
	globalInjection:true,
	locale: import.meta.env.VITE_APP_LANGUAGE || 'pt_BR',
	messages:{
        ${languages.map(e => `"${e}":${e}`).join(',\n')}
    },
})

export const t = i18n.global.t;

export default i18n

`)
