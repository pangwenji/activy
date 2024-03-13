// import CryptoJS from 'crypto-js';
import { randomString } from './base';
// import utf8 from 'utf8';
import base64 from 'base-64';
import AES from 'crypto-js/aes'
import EncUtf8 from 'crypto-js/enc-utf8'
import EncHex from 'crypto-js/enc-hex'
import EncBase64 from 'crypto-js/enc-base64'
import Pkcs7 from 'crypto-js/pad-pkcs7'
import ModeCbc from 'crypto-js/mode-cfb'
    

const key = EncUtf8.parse(Function('return ' + import.meta.env.VITE_APP_AES_KEY)());  //十六位十六进制数作为密钥
// const key = EncUtf8.parse('a1b2c3d4e5f6g7h8');  //十六位十六进制数作为密钥

//解密方法
export const decrypt = (word:string) => {
    try {
        let wstr = base64.decode(word);
        let ivStr = wstr.slice(0,16);
        let iv = EncUtf8.parse(ivStr);
        let encryptedHexStr = EncHex.parse(wstr.slice(16));
        let srcs = EncBase64.stringify(encryptedHexStr);
        let decrypt = AES.decrypt(srcs, key, { iv: iv, mode: ModeCbc, padding: Pkcs7 });
        let decryptedStr = decrypt.toString(EncUtf8);
        return decryptedStr.toString();
    } catch (error) {
        throw '无法解码'
    }
}

//加密方法
export const encrypt = (word:string) => {
    let ivStr = randomString(16).toUpperCase();
    let iv = EncUtf8.parse(ivStr);
    let srcs = EncUtf8.parse(word);
    let encrypted = AES.encrypt(srcs, key, { iv: iv, mode: ModeCbc, padding: Pkcs7 });
    return base64.encode(ivStr + encrypted.ciphertext.toString());
}

  