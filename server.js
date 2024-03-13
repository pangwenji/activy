import express from "express";
import path from "path";
import fs from "fs";
import serveStatic from "serve-static";
// import colors from "colors-console";


import { createServer as createViteServer } from "vite";
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const toAbsolute = p => path.resolve(__dirname,p);


const routes = fs
.readdirSync(toAbsolute('src/pages'))
.map(file => {
    const name = file.replace(/\.vue$/,'').toLocaleLowerCase();
    return name === 'index' ? '/' : `/${name}`;
})
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

// const consoleDiv = (str) => {
//     let n = str.length;
//     let d = (new Array(n + 5)).join(' ');
//     return d + '\n  ' + str + '  \n' + d;
// }
function isMobileUserAgent(str) {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(str);
}

async function getTeleports(teleports){
    if(typeof teleports === 'string') return teleports;
    let str = '';
    for(let t of teleports){
        let th = await (Array.isArray(t) ? getTeleports(t) : t);
        str += await getTeleports(th);
    }
    return str;
}
let clientAssetsCss;

async function getCss(modules){
    let css = [];
    clientAssetsCss = clientAssetsCss || deep('./dist/client/assets').filter(p => /\.css$/.test(p));
    for (const modulePath of modules) {
        let moduleName = new RegExp(path.basename(modulePath.replace(/\.vue$/,'')));
        let cssArr = clientAssetsCss.filter(p => moduleName.test(path.basename(p)));
        for(let item of cssArr){
            css.push(await readFile(item));
        }
    }
    return `
    <style type="text/css">
      ${css.join('\n')}
    </style>
    `;
}

async function createServer(isProd = process.env.NODE_ENV === 'production') {

    const indexProd = isProd ? fs.readFileSync(toAbsolute('./dist/client/index.html'),'utf-8') : '';

    const app = express();

    let vite;
    let CONFIG = {};

    if(!isProd){
        vite = await createViteServer({
            server:{
                middlewareMode:isProd ? 'ssr' : true
            }
        })
        app.use(vite.middlewares);
    }else{
        app.use(
            serveStatic(
                toAbsolute('dis/client'),
                {
                    index:false
                }
            )
        )
        
        CONFIG = await import('./dist/server/entry-server-config.js');
    }
    if(CONFIG.VITE_APP_BAES_ROUTER){
        routes.unshift('');
    }
    let cookiePath = ('/');
    const routesCallback = async (req, res, next) => {
        const url = req.originalUrl;
        const routePathName = req._parsedUrl.pathname;
        let template;
        let render;
        try {
            if(!isProd){
                template = fs.readFileSync(
                    toAbsolute( "./index.html"),
                    "utf-8"
                );
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule("/src/entry-server.js")).render;
            }else {
                template = indexProd;
                render = (await import('./dist/server/entry-server.js')).render;
            }
            const manifest = !isProd ? (await import('./dist/static/client/ssr-manifest.json')) : '';

            let MediaName = 'other';
            var agent = req.headers['user-agent'].toLowerCase();
            if (/windows/.test(agent)) {
              MediaName = 'windows pc';
            } else if (/iphone|ipod/.test(agent) && /mobile/.test(agent)) {
              MediaName = 'iphone';
            } else if (/ipad/.test(agent) && /mobile/.test(agent)) {
              MediaName = 'ipad';
            } else if (/android/.test(agent) && /mobile/.test(agent)) {
              MediaName = 'android';
            } else if (/linux/.test(agent)) {
              MediaName = 'linux pc';
            } else if (/mac/.test(agent)) {
              MediaName = 'mac';
            }
            let version = Array.from(/<script[^>]+src=["']\/assets\/index\-([^\.]+).js["'][^>]*>/g[Symbol.matchAll](template), x => x[1])[0];
            let cookie = version ? ["version="+encodeURIComponent(JSON.stringify([version])) + ';' + ' path=' + cookiePath] : [];
            const headers = {
                "content-type":"text/html; charset=utf-8",
                "Set-Cookie":cookie
            };
            let rtitle = routePathName;
            if(req.params.data){
                rtitle = rtitle.replace('/' + req.params.data,'')
            }
            const { appHtml, ctx, title } = !isProd ? await render(url,manifest) : await render(url,{
                isMobileDevice:isMobileUserAgent(req.headers['user-agent']),
                isMedia:false,
                MediaName:MediaName,
                title:rtitle.replace(/\/$/,'')
            },{
                getCookie(key){
                    let name = key + "=";
                    let ca = req.headers.cookie.split(';');
                    for(var i=0; i<ca.length; i++) {
                        var c = ca[i].trim();
                        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
                    }
                    throw undefined
                },
                setCookie(key,value){
                    cookie.push(key + "=" + value + ';' + ' path=' + cookiePath);
                }
            });
            let html = template.replace('999999',CONFIG.VITE_CUSTOMER_SERVICE);
            html = html.replace('<!--app-ssr-->',appHtml);
            html = html.replace('<!--app-title-->',title);
            for(let key in ctx.teleports){
                html = html.replace(`<!--app-${key}-->`,ctx.teleports[key]);
            }
            ctx.__teleportBuffers.css = await getCss(ctx.modules);
            for(let key in ctx.__teleportBuffers){
                let hh = await getTeleports(ctx.__teleportBuffers[key]);
                html = html.replace(`<!--app-${key}-->`,hh);
            }
            res.status(200).set(headers).end(html);
        } catch (error) {
            // console.logerror(error)
            vite && vite.ssrFixStacktrace(error);
            res.status(500).end(error);
        }
    };
    app.get('',routesCallback);
    app.get('/',routesCallback);
    app.use(routes.map(e => ((CONFIG.VITE_APP_BAES_ROUTER || '') + e + '/:data?')),routesCallback)
    app.use(express.static(toAbsolute('./dist/client'),{
        setHeaders: (res, path, stat) => {
            // res.set('Set-Cookie', '');
            res.set('Cache-Control', 'no-store'); 
        }
    }));
    app.use((req, res, next) => {
        // 设置缓存控制头，其中 max-age 表示缓存的最大时间（这里设置为 1 小时）
        // res.set('Cache-Control', 'public, max-age=3600'); 
        res.set('Cache-Control', 'no-store'); 
        next();
    });
    if(isProd){
        app.get('/updates/app' + (CONFIG.VITE_APP_BAES_ROUTER || ''),(req, res) => {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.setHeader("content-type", 'text/plain; charset=utf-8');
            let version = Array.from(/<script[^>]+src=["']\/assets\/index\-([^\.]+).js["'][^>]*>/g[Symbol.matchAll](indexProd), x => x[1])[0];
            res.status(200).end(version || '');
        })
    }
    
    let port = Number(process.argv.slice(-1));
    port = !isNaN(port) ? port : isProd ? 80 : vite.config.server.port;
    app.listen(port);
    console.log(`🌏 http://localhost:${port}`);
}
createServer();
