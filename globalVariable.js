import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const toAbsolute = p => path.resolve(__dirname,p);

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
        fs.writeFile(url, data,'utf8', (err) => {
            if(err){
                reject(err);
            }else{
                resolve();
            }
        })
    })
}
;(async function(){
    let content = await readFile(toAbsolute('./dist/server/entry-server.js'))
    await writeFile(toAbsolute('./dist/server/entry-server.js'),
    'var isMobileDevice = false;\n' +
    'var isMedia = false;\n' +
    'var MediaName = "other";\n' +
    content
    )
})()