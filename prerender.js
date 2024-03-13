import path from "path";
import fs from "fs";
import manifest from "./dist/static/ssr-manifest.json" assert { type: "json" };
import { render } from "./dist/server/entry-server.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const toAbsolute = p => path.resolve(__dirname,p);

const template = fs.readFileSync(toAbsolute('./dist/static/index.html'), 'utf-8');

const routesToPrender = fs
.readdirSync(toAbsolute('./src/pages'))
.map(file => {
    const name = file.replace(/\.vue$/,'').toLocaleLowerCase();
    return name === 'index' ? '/' : `/${name}`;
})

;(async () => {
    for(let url of routesToPrender){
        const appHtml = await render(url,manifest);
        const html = template.replace('<!--app-ssr-->',appHtml);
        const filePath = `./dist/static${url === '/' ? '/index' : url}.html`;
        fs.writeFileSync(toAbsolute(filePath),html)
    }
    fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()