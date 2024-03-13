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
let arr = deep('./src');


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


// for(let url of arr){
//     if(/(\.vue|\.css|\.scss)$/.test(url)){
//         readFile(url).then(data => {
//             let upxs = Array.from(/(\d*\.?\d+upx)/g[Symbol.matchAll](data), x => x[1]).sort((a,b) => b.length - a.length);
            
//             let utor = {};
//             for(let upx of upxs){
//                 if(!(upx in utor)){
//                     utor[upx] = 1;
//                     data = data.replace(new RegExp(upx,'g'),(Number(upx.replace('upx','')) / 32).toFixed(4) + 'rem');
//                 }
//             }
//             return writeFile(url,data);
//         }).then(ret => {
//             // console.log(`${url} ====> ok`)
//         })
//     }
// }

for(let url of arr){
    if(/(\.vue|\.css|\.scss)$/.test(url)){
        readFile(url).then(data => {
            let pxs = Array.from(/(\d*\.?\d+px)/g[Symbol.matchAll](data), x => x[1]).sort((a,b) => b.length - a.length);
            
            let utor = {};
            for(let px of pxs){
                if(!(px in utor)){
                    utor[px] = 1;
                    data = data.replace(new RegExp(px,'g'),px.replace('px','') + 'rem');
                }
            }
            return writeFile(url,data);
        }).then(ret => {
            // console.log(`${url} ====> ok`)
        })
    }
}