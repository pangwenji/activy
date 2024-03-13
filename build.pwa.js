import path from 'path'
import fs from 'fs'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const toAbsolute = (p) => path.resolve(__dirname, p)

const getFileContent = (src) => {
  return new Promise((resolve, reject) => {
    fs.readFile(src, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.toString())
      }
    })
  })
}

const setFileContent = (src, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(src, content, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

let sid = `s${new Date().getTime()}`
let initStr = (mainJsPath) => `<script id="${sid}" type="text/javascript">
;(function(){
    var div = document.createElement('div');
    div.className = 'startup-diagram';
    div.style = \`
        overflow:hidden;
        background:#16122F;
        align-items:center;
        z-index:44444;
        position:fixed;
        display: flex;
        flex-direction: column;
        left:0;
        right:0;
        bottom:0;
        top:0;
        margin:0;
        justify-content:center;
        z-index:42782442;
    \`;
    div.innerHTML = \`
        <img src="data:image/png;base64,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" alt="PGNEW">
        <p>Pursue the extraordinary and make life no longer ordinary!</p>
        <svg viewBox="0 0 84 24" fill="#007aff">
            <circle cx="18" cy="12" r="6"></circle>
            <circle cx="18" cy="12" r="6"></circle>
            <circle cx="42" cy="12" r="6"></circle>
            <circle cx="66" cy="12" r="6"></circle>
        </svg>
        \`;


        
    function init(){
        // var main = document.createElement('script');
        // main.src = "${mainJsPath}";
        // document.body.append(main);
        var s = document.getElementById('${sid}');
        s.parentNode.removeChild(s)
    }
    function registerServiceWorker(){
        try {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js?t=${new Date().getTime()}',{scope: '/'}).then(function (registration){
                    // let serviceWorker;
                     if (registration.installing) {
                        console.log('registration.installing',registration)
                        // serviceWorker = registration.installing;
                    } else if (registration.waiting) {
                        console.log('registration.waiting', registration)
                        // serviceWorker = registration.waiting;
                    } else if (registration.active) {
                        console.log(registration.active,registration)
                        init();
                    }
                }).catch(function (err){
                    console.log('serviceWorker err' ,err)
                    init();
                })
                navigator.serviceWorker.addEventListener("statechange", (e) => {
                  console.log(e)
                    if ('activated' === e.target.state) {
                        init();
                    }
                });
            }
        } catch (error) {
        console.log('error')
            init();
        }
    }
    window.closeStartup = function(){
        document.body.removeChild(div);
        delete window.closeStartup;
    }
    window.addEventListener('DOMContentLoaded', (event) => {
        if(["fullscreen", "standalone", "minimal-ui"].some((displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches)){
            document.body.append(div);
            registerServiceWorker();
        }else{
            init();
        }
    });
})()
</script>
`
const deep = (dir) => {
  let list = []
  fs.readdirSync(toAbsolute(dir)).forEach((file) => {
    const itemPath = toAbsolute(`${dir}/${file}`)
    const isDir = fs.statSync(itemPath).isDirectory()
    if (isDir) {
      deep(toAbsolute(`${dir}/${file}`)).forEach((item) => {
        list.push(toAbsolute(`${item}`))
      })
    } else {
      list.push(toAbsolute(`${dir}/${file}`))
    }
  })
  return list
}

const assets = fs
  .readdirSync(toAbsolute('./dist/client/assets/'))
  // .filter((e) => /\.js$/.test(e))
  .map((e) => '/assets/' + e)
console.log('开始构建PWA')
const rooPage = toAbsolute('./dist/client/index.html')
const swjsPath = toAbsolute('./dist/client/sw.js')

getFileContent(rooPage).then(async (template) => {
  let reg = /<script[^>]+src=["']\/assets\/index\-([^\.]+).js["'][^>]*>/g
  let version = Array.from(reg[Symbol.matchAll](template), (x) => x[1])[0]
  let cot = template.replace(
    reg,
    `<script type="module" crossorigin src="/assets/index-${version}.js"></script>`,
  )
  await setFileContent(rooPage, cot.replace('<!--script-->', initStr('/assets/index-' + version + '.js')))
  getFileContent(swjsPath).then((swJsContent) => {
    setFileContent(swjsPath, swJsContent.replace('/*files*/', JSON.stringify(assets))).then((r) => {
      console.log('构建完成')
    })
  })
})
